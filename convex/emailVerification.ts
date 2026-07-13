"use node";
declare const process: { env: Record<string, string | undefined> };

import { action } from "./_generated/server";
import { v } from "convex/values";

/* ═══════════════════════════════════════════════════════════
   NEVERBOUNCE EMAIL VERIFICATION
   Real-time email verification at signup. Blocks invalid,
   disposable, and undeliverable addresses before they enter
   the system.
   ═══════════════════════════════════════════════════════════ */

export const verifyEmail = action({
  args: { email: v.string() },
  handler: async (_ctx, { email }): Promise<{
    ok: boolean;
    result: string;
    message: string;
  }> => {
    const apiKey = process.env.NEVERBOUNCE_API_KEY;

    // If no API key configured, allow signup (fail-open)
    if (!apiKey) {
      console.warn("[NeverBounce] No API key configured — skipping verification");
      return { ok: true, result: "skipped", message: "" };
    }

    try {
      const response = await fetch(
        `https://api.neverbounce.com/v4/single/check`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key: apiKey,
            email: email.trim().toLowerCase(),
            timeout: 10,
          }),
        }
      );

      if (!response.ok) {
        console.error(`[NeverBounce] HTTP ${response.status}`);
        // Fail-open: don't block signups if NeverBounce is down
        return { ok: true, result: "error", message: "" };
      }

      const data = await response.json();

      if (data.status !== "success") {
        console.error(`[NeverBounce] API error: ${data.message || data.status}`);
        return { ok: true, result: "error", message: "" };
      }

      const result = data.result as string;

      console.log(`[NeverBounce] ${email} → ${result}`);

      switch (result) {
        case "valid":
          return { ok: true, result: "valid", message: "" };

        case "invalid":
          return {
            ok: false,
            result: "invalid",
            message: "This email address doesn't exist or can't receive mail. Please use a valid email.",
          };

        case "disposable":
          return {
            ok: false,
            result: "disposable",
            message: "Temporary/disposable emails are not allowed. Please use your real email address.",
          };

        case "catchall":
          // Catchall domains accept everything — allow but flag
          return { ok: true, result: "catchall", message: "" };

        case "unknown":
          // Can't verify — allow but flag
          return { ok: true, result: "unknown", message: "" };

        default:
          return { ok: true, result, message: "" };
      }
    } catch (err: any) {
      console.error(`[NeverBounce] Exception: ${err.message}`);
      // Fail-open
      return { ok: true, result: "error", message: "" };
    }
  },
});
