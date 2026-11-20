import { httpAction } from "./_generated/server";
import { requireEnv } from "./requireEnv";

declare const process: { env: Record<string, string | undefined> };

const VIKTOR_API_URL = process.env.VIKTOR_SPACES_API_URL!;
const PROJECT_NAME = process.env.VIKTOR_SPACES_PROJECT_NAME!;
const PROJECT_SECRET = process.env.VIKTOR_SPACES_PROJECT_SECRET!;

/**
 * Vapi Server Tool Webhook
 * Handles tool calls from Ashley (Vapi AI assistant) during phone calls.
 * Supports: sendTextMessage (SMS via Twilio), sendEmail (via Viktor tools)
 */
export const vapiWebhook = httpAction(async (_ctx, request) => {
  try {
    const body = await request.json();
    const message = body.message;

    if (message?.type === "tool-calls") {
      const results = [];

      for (const toolCall of message.toolCallList || []) {
        const fnName = toolCall.function?.name;
        const args = toolCall.function?.arguments || {};

        let result: string;
        if (fnName === "sendTextMessage") {
          result = await handleSendTextMessage(args);
        } else if (fnName === "sendEmailWithLink") {
          result = await handleSendEmail(args);
        } else {
          result = `Unknown tool: ${fnName}`;
        }

        results.push({ toolCallId: toolCall.id, result });
      }

      return new Response(JSON.stringify({ results }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (error: unknown) {
    console.error("Vapi webhook error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
});

/**
 * Send SMS via GoHighLevel Conversations API
 */
const GHL_BASE = "https://services.leadconnectorhq.com";

function ghlRequest() {
  return {
    locationId: requireEnv("GHL_LOCATION_ID"),
    headers: {
      Authorization: `Bearer ${requireEnv("GHL_PIT")}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
      "User-Agent": "Viktor/1.0",
    },
  };
}

async function handleSendTextMessage(args: {
  phoneNumber?: string;
  message?: string;
}): Promise<string> {
  const { phoneNumber, message } = args;
  if (!phoneNumber || !message) return "Error: phoneNumber and message are required";

  let normalizedPhone = phoneNumber.replace(/[^+\d]/g, "");
  if (!normalizedPhone.startsWith("+")) normalizedPhone = "+1" + normalizedPhone;

  const fullMessage = `Garner Financial Partners\n\n${message}`;
  const ghl = ghlRequest();

  try {
    // Step 1: Find or create GHL contact by phone
    let contactId: string | null = null;

    const searchResp = await fetch(`${GHL_BASE}/contacts/search`, {
      method: "POST",
      headers: ghl.headers,
      body: JSON.stringify({
        locationId: ghl.locationId,
        filters: [{ field: "phone", operator: "eq", value: normalizedPhone }],
        page: 1,
        pageLimit: 1,
      }),
    });

    if (searchResp.ok) {
      const searchData = await searchResp.json();
      const contacts = searchData.contacts || [];
      if (contacts.length > 0) {
        contactId = contacts[0].id;
      }
    }

    if (!contactId) {
      // Create new contact
      const createResp = await fetch(`${GHL_BASE}/contacts/`, {
        method: "POST",
        headers: ghl.headers,
        body: JSON.stringify({
          locationId: ghl.locationId,
          phone: normalizedPhone,
          tags: ["vapi-call", "ashley-bot"],
          source: "Ashley AI Voice Bot",
        }),
      });

      if (createResp.ok) {
        const created = await createResp.json();
        contactId = created.contact?.id;
      }
    }

    if (!contactId) {
      return "Error: Could not find or create contact for this phone number";
    }

    // Step 2: Send SMS via GHL conversations
    const response = await fetch(`${GHL_BASE}/conversations/messages`, {
      method: "POST",
      headers: ghl.headers,
      body: JSON.stringify({
        type: "SMS",
        contactId,
        message: fullMessage,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`SMS sent via GHL to ${normalizedPhone}, msgId: ${result.messageId}`);
      return `Text message sent successfully to ${normalizedPhone}`;
    } else {
      const errText = await response.text();
      console.error(`GHL SMS error: ${response.status} ${errText}`);
      return `Failed to send text: ${errText}`;
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("SMS error:", msg);
    return `Error sending text: ${msg}`;
  }
}

/**
 * Send email via Viktor Tools gateway
 */
async function handleSendEmail(args: {
  emailAddress?: string;
  subject?: string;
  body?: string;
}): Promise<string> {
  const { emailAddress, subject, body } = args;
  if (!emailAddress || !body) return "Error: emailAddress and body are required";

  const emailSubject = subject || "Information from Garner Financial Partners";
  
  const emailBody = `Hi there,\n\nThank you for contacting Garner Financial Partners! As discussed on our call, here is the information you requested:\n\n${body}\n\nIf you have any questions, feel free to call us back at (520) 462-6447 or reply to this email.\n\nBest regards,\nAshley\nGarner Financial Partners\nhttps://garnerfinancialpartners.com`;

  try {
    const response = await fetch(`${VIKTOR_API_URL}/api/viktor-spaces/tools/call`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_name: PROJECT_NAME,
        project_secret: PROJECT_SECRET,
        role: "coworker_send_email",
        arguments: {
          to: [emailAddress],
          subject: emailSubject,
          body: emailBody,
        },
      }),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        console.log(`Email sent to ${emailAddress}`);
        return `Email sent successfully to ${emailAddress}`;
      }
      return `Failed to send email: ${JSON.stringify(result.error || "unknown error")}`;
    }
    return `Failed to send email: HTTP ${response.status}`;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Email error:", msg);
    return `Error sending email: ${msg}`;
  }
}
