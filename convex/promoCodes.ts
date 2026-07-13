"use node";
declare const process: { env: Record<string, string | undefined> };

import { action } from "./_generated/server";
import { v } from "convex/values";

/* ═══════════════════════════════════════════════════════════
   PROMO CODE SYSTEM
   ───────────────────────────────────────────────────────────
   Master bypass codes give 100% off (skip Stripe entirely).
   Future: producer-created codes with custom discounts.
   ═══════════════════════════════════════════════════════════ */

// Master bypass codes - 100% off, skip Stripe
const MASTER_BYPASS_CODES: Record<string, { label: string; discountPercent: number }> = {
  GFPVIP: { label: "GFP VIP Access", discountPercent: 100 },
  FORTRESS: { label: "Fortress Demo", discountPercent: 100 },
};

export const validatePromoCode = action({
  args: { code: v.string() },
  returns: v.object({
    valid: v.boolean(),
    discountPercent: v.number(),
    label: v.string(),
    isBypass: v.boolean(),
  }),
  handler: async (_ctx, { code }) => {
    const normalized = code.trim().toUpperCase();
    const master = MASTER_BYPASS_CODES[normalized];
    if (master) {
      return {
        valid: true,
        discountPercent: master.discountPercent,
        label: master.label,
        isBypass: true,
      };
    }
    return { valid: false, discountPercent: 0, label: "Invalid code", isBypass: false };
  },
});

/**
 * Bypass product purchase - processes order as "demo" without Stripe.
 * Only works with valid master bypass codes.
 */
export const bypassProductPurchase = action({
  args: {
    code: v.string(),
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
  },
  returns: v.object({ success: v.boolean(), message: v.string() }),
  handler: async (ctx, args) => {
    const normalized = args.code.trim().toUpperCase();
    if (!MASTER_BYPASS_CODES[normalized]) {
      return { success: false, message: "Invalid promo code" };
    }

    // Process order as demo (no payment)
    try {
      await ctx.runMutation("checkout:processOrder" as any, {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        phone: args.phone,
        city: args.city,
        state: args.state,
        zipCode: args.zipCode,
        product: args.product,
        productName: args.productName,
        price: args.price,
        portalUrl: args.portalUrl,
        stripeSessionId: `promo_${normalized}_${Date.now()}`,
        isDemo: true,
      });
      return { success: true, message: "Order processed with promo code!" };
    } catch (e: any) {
      return { success: false, message: e.message || "Failed to apply promo code" };
    }
  },
});
