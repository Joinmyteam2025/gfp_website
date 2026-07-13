import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { vapiWebhook } from "./vapiWebhook";
import { smsWebhookHandler } from "./smsWebhook";
import { trackClickHandler } from "./clickTracking";
import { pixelHandler } from "./openTracking";

const http = httpRouter();
auth.addHttpRoutes(http);

// Email click tracking — redirects to VSL page while tagging contact in GHL
http.route({
  path: "/track",
  method: "GET",
  handler: trackClickHandler,
});

// Email open tracking — serves 1x1 transparent pixel and records open event
// Usage in emails: <img src="https://pleasant-gnat-404.convex.site/pixel?e=EMAIL&p=ffp&c=campaign" />
http.route({
  path: "/pixel",
  method: "GET",
  handler: pixelHandler,
});

// Vapi AI assistant webhook - handles tool calls (SMS, etc.)
http.route({
  path: "/vapi-webhook",
  method: "POST",
  handler: vapiWebhook,
});

// Twilio inbound SMS webhook - Ashley SMS support bot (legacy, kept for backwards compat)
http.route({
  path: "/sms-webhook",
  method: "POST",
  handler: smsWebhookHandler,
});

// GHL inbound SMS webhook - Ashley SMS support bot via GoHighLevel
http.route({
  path: "/ghl-sms-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      // GHL sends: { type, locationId, contactId, body, phone, ... }
      const phone = body.phone || body.from || "";
      const message = body.body || body.message || "";

      if (!phone || !message.trim()) {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      console.log(`GHL Inbound SMS from ${phone}: "${message}"`);

      // Process via Ashley AI bot
      await ctx.runAction(internal.smsWebhook.processInboundSms, {
        from: phone,
        body: message.trim(),
      });

      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("GHL SMS webhook error:", error);
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

export default http;
