import { httpAction } from "./_generated/server";
import { v } from "convex/values";
import { query, internalMutation, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

declare const process: { env: Record<string, string | undefined> };

const VIKTOR_API_URL = process.env.VIKTOR_SPACES_API_URL!;
const PROJECT_NAME = process.env.VIKTOR_SPACES_PROJECT_NAME!;
const PROJECT_SECRET = process.env.VIKTOR_SPACES_PROJECT_SECRET!;

// ── Portal Links & Knowledge Base ──────────────────────────────────────────────
const ASHLEY_KNOWLEDGE = `
PORTALS:
- Family Fortress (FFP): https://ffp.garnerfinancialpartners.com
- Business Fortress (BFP): https://bfp.garnerfinancialpartners.com
- Military Fortress (MFP): https://mfp.garnerfinancialpartners.com
- Wealth U: https://wealth.garnerfinancialpartners.com
- Athlete U: https://athlete.garnerfinancialpartners.com
- Christian U: https://christian.garnerfinancialpartners.com
- Social Media U: https://social.garnerfinancialpartners.com
- Veterans U: https://veterans.garnerfinancialpartners.com
- Business U: https://business.garnerfinancialpartners.com
- Agent/Producer Portal: https://agent.garnerfinancialpartners.com

WEBSITE: https://garnerfinancialpartners.com
SCHEDULING: https://calendly.com/ezachgarner

KEY FEATURES IN ALL PORTALS:
- Video curriculum (education modules)
- Trust document generation
- Credit repair tools
- ID protection
- Insurance setup
- Social media content library
- Affiliate program
- Appointment booking with a GFP representative

ABOUT GFP:
Garner Financial Partners provides world-class education platforms designed to empower athletes, individuals, families of faith, veterans and those seeking to build their own Financial Fortress. GFP is NOT wealth management or financial advisory - it's financial education.
`.trim();

const ASHLEY_SYSTEM_PROMPT = `You are Ashley, the friendly and professional support assistant at Garner Financial Partners (GFP). You help portal users via text message.

RULES:
- Keep replies SHORT (under 300 chars when possible, never over 450)
- Be warm, helpful, and use a friendly tone
- NEVER use em dashes
- Use first name basis
- If someone needs help logging in, send them the link to their portal
- If someone wants to schedule a call/meeting, share the Calendly link
- If you can't help with something, say you'll connect them with the team and that someone will follow up shortly
- Don't make up information you don't know
- Sign off texts with "- Ashley" on the first message only
- Do NOT include "Garner Financial Partners" header in every text

${ASHLEY_KNOWLEDGE}`;

// ── Conversation Storage ───────────────────────────────────────────────────────

export const getConversation = query({
  args: { phone: v.string() },
  returns: v.union(
    v.object({
      _id: v.id("smsConversations"),
      _creationTime: v.number(),
      phone: v.string(),
      messages: v.array(
        v.object({
          role: v.union(v.literal("user"), v.literal("ashley")),
          body: v.string(),
          timestamp: v.number(),
        })
      ),
      lastActivity: v.number(),
      escalated: v.boolean(),
    }),
    v.null()
  ),
  handler: async (ctx, { phone }) => {
    return await ctx.db
      .query("smsConversations")
      .withIndex("by_phone", (q) => q.eq("phone", phone))
      .first();
  },
});

export const upsertMessage = internalMutation({
  args: {
    phone: v.string(),
    role: v.union(v.literal("user"), v.literal("ashley")),
    body: v.string(),
  },
  handler: async (ctx, { phone, role, body }) => {
    const existing = await ctx.db
      .query("smsConversations")
      .withIndex("by_phone", (q) => q.eq("phone", phone))
      .first();

    const msg = { role, body, timestamp: Date.now() };

    if (existing) {
      // Keep last 20 messages for context window
      const messages = [...existing.messages, msg].slice(-20);
      await ctx.db.patch(existing._id, {
        messages,
        lastActivity: Date.now(),
      });
    } else {
      await ctx.db.insert("smsConversations", {
        phone,
        messages: [msg],
        lastActivity: Date.now(),
        escalated: false,
      });
    }
  },
});

// ── AI Response Generation ─────────────────────────────────────────────────────

async function callViktorTool<T>(role: string, args: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${VIKTOR_API_URL}/api/viktor-spaces/tools/call`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_name: PROJECT_NAME,
      project_secret: PROJECT_SECRET,
      role,
      arguments: args,
    }),
  });

  if (!response.ok) {
    throw new Error(`Tool HTTP ${response.status}: ${await response.text()}`);
  }

  const json = await response.json();
  if (!json.success) {
    throw new Error(json.error ?? "Tool call failed");
  }
  return json.result as T;
}

export const generateAshleyResponse = internalAction({
  args: {
    phone: v.string(),
    incomingMessage: v.string(),
  },
  returns: v.string(),
  handler: async (ctx, { phone, incomingMessage }) => {
    // Get conversation history
    const convo = await ctx.runQuery(
      // @ts-expect-error internal query
      "smsWebhook:getConversation",
      { phone }
    );

    // Build conversation context
    let history = "";
    if (convo?.messages) {
      const recent = convo.messages.slice(-6); // last 6 messages for context
      history = recent
        .map((m: { role: string; body: string }) =>
          `${m.role === "user" ? "User" : "Ashley"}: ${m.body}`
        )
        .join("\n");
    }

    const prompt = `${ASHLEY_SYSTEM_PROMPT}

CONVERSATION HISTORY:
${history || "(new conversation)"}

User just texted: "${incomingMessage}"

Reply as Ashley in a SHORT text message (under 300 chars). Be helpful and friendly. If this is a greeting or first message, welcome them and ask how you can help.`;

    try {
      const result = await callViktorTool<{ search_response: string }>(
        "quick_ai_search",
        { search_question: prompt }
      );
      // Clean up the response - remove any quotes or extra formatting
      let reply = result.search_response.trim();
      // Remove surrounding quotes if present
      if (reply.startsWith('"') && reply.endsWith('"')) {
        reply = reply.slice(1, -1);
      }
      // Truncate if too long for SMS
      if (reply.length > 450) {
        reply = reply.substring(0, 447) + "...";
      }
      return reply;
    } catch (error) {
      console.error("AI response error:", error);
      return "Hi! Thanks for reaching out to Garner Financial Partners. Let me connect you with our team - someone will follow up shortly. - Ashley";
    }
  },
});

// ── SMS Sending via GoHighLevel ─────────────────────────────────────────────────

const GHL_PIT = process.env.GHL_PIT || "pit-63812b8f-0a9b-4fcf-9659-8a7591f59a54";
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || "X3wPZkYJBsP9at86EkcU";
const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_HEADERS = {
  Authorization: `Bearer ${GHL_PIT}`,
  "Content-Type": "application/json",
  Version: "2021-07-28",
  "User-Agent": "Viktor/1.0",
};

/** Find or create a GHL contact by phone number, return contactId */
async function getOrCreateGhlContact(phone: string): Promise<string | null> {
  try {
    // Search for existing contact
    const searchResp = await fetch(`${GHL_BASE}/contacts/search`, {
      method: "POST",
      headers: GHL_HEADERS,
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        filters: [{ field: "phone", operator: "eq", value: phone }],
        page: 1,
        pageLimit: 1,
      }),
    });

    if (searchResp.ok) {
      const searchData = await searchResp.json();
      const contacts = searchData.contacts || [];
      if (contacts.length > 0) {
        return contacts[0].id;
      }
    }

    // Contact not found — create one
    const createResp = await fetch(`${GHL_BASE}/contacts/`, {
      method: "POST",
      headers: GHL_HEADERS,
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        phone,
        tags: ["ashley-sms-bot"],
        source: "Ashley AI Bot",
      }),
    });

    if (createResp.ok) {
      const created = await createResp.json();
      const contactId = created.contact?.id;
      if (contactId) {
        console.log(`Created GHL contact ${contactId} for ${phone}`);
        return contactId;
      }
    }

    console.error("Failed to create GHL contact for", phone);
    return null;
  } catch (error) {
    console.error("GHL contact lookup error:", error);
    return null;
  }
}

/** Send SMS via GHL Conversations API */
async function sendSms(to: string, body: string): Promise<boolean> {
  try {
    const contactId = await getOrCreateGhlContact(to);
    if (!contactId) {
      console.error(`Cannot send SMS: no GHL contact for ${to}`);
      return false;
    }

    const response = await fetch(`${GHL_BASE}/conversations/messages`, {
      method: "POST",
      headers: GHL_HEADERS,
      body: JSON.stringify({
        type: "SMS",
        contactId,
        message: body,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`SMS sent via GHL to ${to}, msgId: ${result.messageId}`);
      return true;
    } else {
      const errText = await response.text();
      console.error(`GHL SMS error: ${response.status} ${errText}`);
      return false;
    }
  } catch (error) {
    console.error("SMS send error:", error);
    return false;
  }
}

// ── Process Inbound SMS (action that orchestrates everything) ──────────────────

export const processInboundSms = internalAction({
  args: {
    from: v.string(),
    body: v.string(),
  },
  handler: async (ctx, { from, body }) => {
    // 1. Store the incoming message
    await ctx.runMutation(internal.smsWebhook.upsertMessage, {
      phone: from,
      role: "user",
      body,
    });

    // 2. Generate Ashley's AI response
    const reply = await ctx.runAction(internal.smsWebhook.generateAshleyResponse, {
      phone: from,
      incomingMessage: body,
    });

    // 3. Send the reply via Twilio
    const sent = await sendSms(from, reply);

    // 4. Store Ashley's response
    if (sent) {
      await ctx.runMutation(internal.smsWebhook.upsertMessage, {
        phone: from,
        role: "ashley",
        body: reply,
      });
    }

    console.log(`SMS flow complete: ${from} → "${body}" | Ashley → "${reply}" | Sent: ${sent}`);
  },
});

// ── HTTP Webhook Handler ───────────────────────────────────────────────────────

export const smsWebhookHandler = httpAction(async (ctx, request) => {
  try {
    // Twilio sends form-urlencoded POST
    const formText = await request.text();
    const params = new URLSearchParams(formText);

    const from = params.get("From") || "";
    const body = params.get("Body") || "";
    const messageSid = params.get("MessageSid") || "";

    console.log(`Inbound SMS from ${from}: "${body}" (SID: ${messageSid})`);

    if (!from || !body.trim()) {
      // Return empty TwiML so Twilio doesn't retry
      return new Response(
        '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
        { status: 200, headers: { "Content-Type": "text/xml" } }
      );
    }

    // Schedule the async processing (AI response + reply)
    await ctx.runAction(internal.smsWebhook.processInboundSms, {
      from,
      body: body.trim(),
    });

    // Return empty TwiML - we handle the reply via Twilio REST API
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      { status: 200, headers: { "Content-Type": "text/xml" } }
    );
  } catch (error) {
    console.error("SMS webhook error:", error);
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      { status: 200, headers: { "Content-Type": "text/xml" } }
    );
  }
});
