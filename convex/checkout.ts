import { v } from "convex/values";
import { mutation, internalAction, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";

declare const process: { env: Record<string, string | undefined> };

const VIKTOR_API_URL = process.env.VIKTOR_SPACES_API_URL!;
const PROJECT_NAME = process.env.VIKTOR_SPACES_PROJECT_NAME!;
const PROJECT_SECRET = process.env.VIKTOR_SPACES_PROJECT_SECRET!;

/* ─── Viktor Tool Helper ─── */
async function callTool<T>(role: string, args: Record<string, unknown> = {}): Promise<T> {
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
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  const json = await response.json();
  if (!json.success) {
    throw new Error(json.error ?? "Tool call failed");
  }
  return json.result as T;
}

/* ─── Product Config ─── */
const PRODUCT_CONFIG: Record<string, {
  displayName: string;
  sheetTab: string;
  portalUrl: string;
  productId: string;
}> = {
  ffp: {
    displayName: "FFP™",
    sheetTab: "FFP™ Buyers",
    portalUrl: "portal.garnerfinancialpartners.com",
    productId: "prod_UKThFKfIkEle0a",
  },
  bfp: {
    displayName: "BFP™",
    sheetTab: "BFP™ Buyers",
    portalUrl: "business.garnerfinancialpartners.com",
    productId: "", // Will be set after Stripe product creation
  },
  mfp: {
    displayName: "MFP™",
    sheetTab: "MFP™ Buyers",
    portalUrl: "veterans.garnerfinancialpartners.com",
    productId: "",
  },
  afp: {
    displayName: "AFP™",
    sheetTab: "AFP™ Buyers",
    portalUrl: "athlete.garnerfinancialpartners.com",
    productId: "",
  },
  ifp: {
    displayName: "IFP™",
    sheetTab: "IFP™ Buyers",
    portalUrl: "socialmedia.garnerfinancialpartners.com",
    productId: "",
  },
  refp: {
    displayName: "REFP™",
    sheetTab: "REFP™ Buyers",
    portalUrl: "realestate.garnerfinancialpartners.com",
    productId: "prod_Uh0L7UO8zzOCI0",
  },
};

const GOOGLE_SHEET_ID = "1JvIH6_4lXSklej5cHeerwtsFz_jLWk_bQ_n2hqQlTcc";
const SLACK_CHANNEL_ID = "C0AUNPHP4H1"; // #fp_buyers
const GDRIVE_CLIENTS_FOLDER_ID = "1BTSOl4UlDpOEGMkzfG5QsVjPaXMZiNcD"; // My Drive > GFP > Clients

/* ─── Process Order (called from frontend) ─── */
export const processOrder = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    zipCode: v.optional(v.string()),
    product: v.string(),
    productName: v.string(),
    price: v.number(),
    portalUrl: v.string(),
    stripeSessionId: v.optional(v.string()),
    isDemo: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const now = new Date();
    const salesDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

    // Create the order record
    const orderId = await ctx.db.insert("orders", {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      city: args.city || "",
      state: args.state || "",
      zipCode: args.zipCode || "",
      product: args.product,
      productName: args.productName,
      price: args.price,
      portalUrl: args.portalUrl,
      stripeSessionId: args.stripeSessionId,
      paymentStatus: args.isDemo ? "demo" : "completed",
      emailSent: false,
      smsSent: false,
      slackNotified: false,
      sheetUpdated: false,
      portalCreated: false,
      salesDate,
    });

    // Schedule the post-purchase processing action
    await ctx.scheduler.runAfter(0, internal.checkout.runPostPurchase, {
      orderId,
    });

    return orderId;
  },
});

/* ─── Internal: Update order status flags ─── */
export const updateOrderStatus = internalMutation({
  args: {
    orderId: v.id("orders"),
    emailSent: v.optional(v.boolean()),
    smsSent: v.optional(v.boolean()),
    slackNotified: v.optional(v.boolean()),
    sheetUpdated: v.optional(v.boolean()),
    portalCreated: v.optional(v.boolean()),
    driveFolderCreated: v.optional(v.boolean()),
    driveFolderId: v.optional(v.string()),
  },
  handler: async (ctx, { orderId, ...updates }) => {
    const cleanUpdates: Record<string, boolean | string> = {};
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) cleanUpdates[key] = value;
    }
    if (Object.keys(cleanUpdates).length > 0) {
      await ctx.db.patch(orderId, cleanUpdates);
    }
  },
});

/* ─── Post-Purchase Processing Action ─── */
export const runPostPurchase = internalAction({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    // Get the order
    const order = await ctx.runQuery(internal.checkout.getOrder, { orderId });
    if (!order) {
      console.error("Order not found:", orderId);
      return;
    }

    const config = PRODUCT_CONFIG[order.product] || PRODUCT_CONFIG.ffp;

    // 1. Send email receipt
    try {
      await callTool("coworker_send_email", {
        to: [order.email],
        subject: `Welcome to the ${order.productName} - Your Receipt`,
        body: `
Hi ${order.firstName},

Thank you for joining the ${order.productName}! 🎉

Here's your receipt:
━━━━━━━━━━━━━━━━━━━━━━━
Product: ${order.productName}
Amount: $${order.price}
Date: ${order.salesDate}
Status: ${order.paymentStatus === "demo" ? "Demo" : "Paid"}
━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEPS:
1. Access your portal: https://${config.portalUrl}
2. Complete the onboarding questionnaire (takes ~15 min)
3. Our team will begin building your fortress within 7 days

Your portal login credentials will be sent in a separate email.

If you have any questions, reply to this email or call us at (480) 333-9913.

Welcome to the family,
Garner Financial Partners

━━━━━━━━━━━━━━━━━━━━━━━
Garner Financial Partners
garnerfinancialpartners.com
(480) 333-9913
`,
      });
      await ctx.runMutation(internal.checkout.updateOrderStatus, { orderId, emailSent: true });
      console.log("✅ Email receipt sent to", order.email);
    } catch (error) {
      console.error("❌ Email send failed:", error);
    }

    // 2. Update Google Sheet
    try {
      const csvRow = [
        order.firstName,
        order.lastName,
        order.email,
        order.phone,
        order.city || "",
        order.state || "",
        order.zipCode || "",
        config.displayName,
        `$${order.price}`,
        config.productId,
        order.salesDate,
        "Pending",
        "",   // Rep Assigned
        "",   // Rep ID
        "",   // Lead Inside CRM
      ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(",");

      await callTool("gdrive_google_sheets_write", {
        unified_uri: GOOGLE_SHEET_ID,
        values_csv: csvRow,
        sheet_name: config.sheetTab,
      });
      await ctx.runMutation(internal.checkout.updateOrderStatus, { orderId, sheetUpdated: true });
      console.log("✅ Google Sheet updated:", config.sheetTab);
    } catch (error) {
      console.error("❌ Google Sheet update failed:", error);
    }

    // 3. Send Slack notification to #fp_buyers
    try {
      await callTool("coworker_send_slack_message", {
        channel_id: SLACK_CHANNEL_ID,
        text: `🏰 *New ${config.displayName} Buyer!*\n\n• *Name:* ${order.firstName} ${order.lastName}\n• *Email:* ${order.email}\n• *Phone:* ${order.phone}\n• *Product:* ${order.productName}\n• *Revenue:* $${order.price}\n• *Rep Assigned:* -\n• *Date:* ${order.salesDate}${order.paymentStatus === "demo" ? "\n\n⚠️ _Demo order - no payment charged_" : ""}`,
      });
      await ctx.runMutation(internal.checkout.updateOrderStatus, { orderId, slackNotified: true });
      console.log("✅ Slack notification sent to #fp_buyers");
    } catch (error) {
      console.error("❌ Slack notification failed:", error);
    }

    // 4. Create Google Drive folder for client
    try {
      const productTag = order.product.toUpperCase(); // FFP, BFP, MFP
      const folderName = `${order.firstName} ${order.lastName} | ${productTag}`;
      
      const folderResult = await callTool<{ content?: string }>("gdrive_create_folder", {
        name: folderName,
        parent_path: GDRIVE_CLIENTS_FOLDER_ID,
      });
      
      // Extract folder ID from the response
      let folderId = "";
      if (folderResult && folderResult.content) {
        const idMatch = String(folderResult.content).match(/id:\s*([a-zA-Z0-9_-]+)/);
        if (idMatch) folderId = idMatch[1];
      }
      
      if (folderId) {
        await ctx.runMutation(internal.checkout.updateOrderStatus, { 
          orderId, 
          driveFolderCreated: true,
          driveFolderId: folderId,
        });
        console.log("✅ Google Drive folder created:", folderName, "ID:", folderId);
      } else {
        await ctx.runMutation(internal.checkout.updateOrderStatus, { orderId, driveFolderCreated: true });
        console.log("✅ Google Drive folder created:", folderName, "(ID not parsed)");
      }
    } catch (error) {
      console.error("❌ Google Drive folder creation failed:", error);
    }

    // 5. SMS receipt (via GoHighLevel)
    try {
      if (order.phone) {
        let phone = order.phone.replace(/[^+\d]/g, "");
        if (!phone.startsWith("+")) phone = "+1" + phone;

        const GHL_PIT = process.env.GHL_PIT || "pit-63812b8f-0a9b-4fcf-9659-8a7591f59a54";
        const GHL_LOCATION = process.env.GHL_LOCATION_ID || "X3wPZkYJBsP9at86EkcU";
        const ghlHeaders = {
          Authorization: `Bearer ${GHL_PIT}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
          "User-Agent": "Viktor/1.0",
        };

        // Find or create GHL contact
        let contactId: string | null = null;
        const searchResp = await fetch("https://services.leadconnectorhq.com/contacts/search", {
          method: "POST",
          headers: ghlHeaders,
          body: JSON.stringify({
            locationId: GHL_LOCATION,
            filters: [{ field: "phone", operator: "eq", value: phone }],
            page: 1, pageLimit: 1,
          }),
        });
        if (searchResp.ok) {
          const sd = await searchResp.json();
          if (sd.contacts?.length > 0) contactId = sd.contacts[0].id;
        }
        if (!contactId) {
          const createResp = await fetch("https://services.leadconnectorhq.com/contacts/", {
            method: "POST",
            headers: ghlHeaders,
            body: JSON.stringify({
              locationId: GHL_LOCATION,
              firstName: order.firstName,
              lastName: order.lastName,
              email: order.email,
              phone,
              tags: [order.product, "purchase"],
              source: "Website Purchase",
            }),
          });
          if (createResp.ok) {
            const cd = await createResp.json();
            contactId = cd.contact?.id;
          }
        }

        if (contactId) {
          const smsBody = `🎉 Thank you ${order.firstName}! Your ${config.displayName} purchase ($${order.price}) is confirmed.\n\nAccess your portal at ${config.portalUrl}. Check your email for login details.\n\nQuestions? Reply here or call (520) 462-6447.\n\n- Garner Financial Partners`;

          await fetch("https://services.leadconnectorhq.com/conversations/messages", {
            method: "POST",
            headers: ghlHeaders,
            body: JSON.stringify({ type: "SMS", contactId, message: smsBody }),
          });

          await ctx.runMutation(internal.checkout.updateOrderStatus, { orderId, smsSent: true });
          console.log("✅ SMS purchase confirmation sent via GHL to", phone);
        } else {
          console.error("❌ SMS receipt: Could not find/create GHL contact for", phone);
        }
      }
    } catch (error) {
      console.error("❌ SMS receipt failed:", error);
    }

    // 6. Portal account creation
    // TODO: Phase 2 - create account in respective portal Convex app
    console.log("⏳ Portal account: TODO - Phase 2");
  },
});

/* ─── Internal: Get order (for actions) ─── */
export const getOrder = internalQuery({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    return await ctx.db.get(orderId);
  },
});
