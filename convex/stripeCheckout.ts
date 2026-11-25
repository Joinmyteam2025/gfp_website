"use node";
declare const process: { env: Record<string, string | undefined> };

import { action } from "./_generated/server";
import { v } from "convex/values";

/* ═══════════════════════════════════════════════════════════
   STRIPE EMBEDDED CHECKOUT — Garner Financial Partners Website
   ───────────────────────────────────────────────────────────
   Creates Stripe Checkout Sessions with ui_mode: "embedded"
   so checkout happens inside a popup modal on the site.
   ═══════════════════════════════════════════════════════════ */


/* ─── Product → Stripe Price mapping ─── */
const PRODUCT_PRICES: Record<
  string,
  {
    priceId: string;
    mode: "payment" | "subscription";
    label: string;
    amountCents: number;
    interval?: "month" | "year";
  }
> = {
  ffp: {
    priceId: "price_1TPQXlDal1LtHX1Vv4Mijk2j",
    mode: "payment",
    label: "Family Fortress Program™",
    amountCents: 29700,
  },
  afp: {
    priceId: "price_1ThbiRDal1LtHX1VzJgXNS0s",
    mode: "payment",
    label: "Athlete Fortress Program™",
    amountCents: 9700,
  },
  bfp: {
    priceId: "price_1TPQa4Dal1LtHX1VmP7BY47R",
    mode: "payment",
    label: "Business Fortress Program™",
    amountCents: 99700,
  },
  ifp: {
    priceId: "price_1ThcJqDal1LtHX1VnGLZjq1F",
    mode: "payment",
    label: "Influencer Fortress Program™",
    amountCents: 29700,
  },
  refp: {
    priceId: "price_1ThcKZDal1LtHX1VjuUCsVuJ",
    mode: "payment",
    label: "Real Estate Fortress Program™",
    amountCents: 49700,
  },
  mfp: {
    priceId: "price_1TheGfDal1LtHX1V1B6d6T0P",
    mode: "payment",
    label: "Military Fortress Program™",
    amountCents: 19700,
  },
  /* ── NexCRM monthly / annual ── */
  nexcrm: {
    priceId: "price_1TUbUpDal1LtHX1VbTnxrIOm",
    mode: "subscription",
    label: "NexCRM™",
    amountCents: 5700,
    interval: "month",
  },
  "nexcrm-annual": {
    priceId: "price_1TeS4MDal1LtHX1Vp1j0rDwI",
    mode: "subscription",
    label: "NexCRM™ (Annual)",
    amountCents: 57000,
    interval: "year",
  },
  /* ── NexSuite monthly / annual ── */
  nexsuite: {
    priceId: "price_1TUbTWDal1LtHX1V1QSMH91J",
    mode: "subscription",
    label: "NexSuite™",
    amountCents: 19700,
    interval: "month",
  },
  "nexsuite-annual": {
    priceId: "price_1TeS4MDal1LtHX1VIkQrudio",
    mode: "subscription",
    label: "NexSuite™ (Annual)",
    amountCents: 197000,
    interval: "year",
  },
  /* ── Revenue Share ── */
  "revenue-share": {
    priceId: "price_1TQJaMDal1LtHX1Vh9m6tI9N",
    mode: "subscription",
    label: "Revenue Share Growth Partnership",
    amountCents: 299700,
    interval: "month",
  },
  cfp: {
    priceId: "price_1TlDmXDal1LtHX1VaWSlfy6y",
    mode: "payment",
    label: "Christian Fortress Program™",
    amountCents: 29700,
  },
  /* ── White-Label monthly / annual ── */
  "whitelabel-nexsuite": {
    priceId: "price_1TTTlCDal1LtHX1Vc4UUrMQU",
    mode: "subscription",
    label: "White-Label NexSuite™",
    amountCents: 29700,
    interval: "month",
  },
  "whitelabel-nexsuite-annual": {
    priceId: "price_1TeS4MDal1LtHX1VHU0x3tB9",
    mode: "subscription",
    label: "White-Label NexSuite™ (Annual)",
    amountCents: 297000,
    interval: "year",
  },
};

/* ─── Done-For-You Setup one-time add-on ─── */
const DFY_SETUP_PRICE_ID = "price_1TeS4NDal1LtHX1VSw7W5SHU"; // $997 one-time

/**
 * Create an embedded checkout session — returns a client secret
 * that the frontend uses with <EmbeddedCheckout />.
 */
export const createEmbeddedCheckout = action({
  args: {
    productKey: v.string(),
    customerEmail: v.optional(v.string()),
    metadata: v.optional(v.any()),
    includeSetup: v.optional(v.boolean()),
  },
  returns: v.object({
    clientSecret: v.string(),
  }),
  handler: async (_ctx, { productKey, customerEmail, metadata, includeSetup }) => {
    const STRIPE_SK = process.env.STRIPE_SECRET_KEY?.trim();
    if (!STRIPE_SK) {
      throw new Error("Missing required environment variable: STRIPE_SECRET_KEY");
    }

    const product = PRODUCT_PRICES[productKey];
    if (!product) {
      throw new Error(`Unknown product: ${productKey}`);
    }

    const params = new URLSearchParams();
    params.append("ui_mode", "embedded");
    params.append("mode", product.mode);
    params.append("line_items[0][price]", product.priceId);
    params.append("line_items[0][quantity]", "1");

    /* ── Optional $997 Done-For-You Setup add-on ── */
    if (includeSetup) {
      params.append("line_items[1][price]", DFY_SETUP_PRICE_ID);
      params.append("line_items[1][quantity]", "1");
    }

    params.append(
      "return_url",
      `https://garnerfinancialpartners.com/checkout/success?session_id={CHECKOUT_SESSION_ID}&product=${productKey}`
    );
    params.append("allow_promotion_codes", "true");
    params.append("automatic_tax[enabled]", "true");
    params.append("billing_address_collection", "required");

    if (customerEmail) {
      params.append("customer_email", customerEmail);
    }

    // Add metadata
    params.append("metadata[product_key]", productKey);
    params.append("metadata[product_name]", product.label);
    params.append("metadata[source]", "garner-website");

    if (metadata && typeof metadata === "object") {
      for (const [k, val] of Object.entries(metadata)) {
        if (typeof val === "string") {
          params.append(`metadata[${k}]`, val);
        }
      }
    }

    // For subscriptions, also pass metadata to the subscription itself
    if (product.mode === "subscription") {
      params.append("subscription_data[metadata][product_key]", productKey);
      params.append("subscription_data[metadata][product_name]", product.label);
      params.append("subscription_data[metadata][source]", "garner-website");
    }

    const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SK}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const body = await resp.json();

    if (!resp.ok) {
      const msg = body?.error?.message || "Unknown Stripe error";
      console.error("Stripe API error:", JSON.stringify(body?.error || body));
      throw new Error(`Checkout failed: ${msg}`);
    }

    if (!body.client_secret) {
      throw new Error("No client_secret returned from Stripe");
    }

    return { clientSecret: body.client_secret };
  },
});

/**
 * Return public config for a product (so frontend can display price info).
 */
export const getProductConfig = action({
  args: { productKey: v.string() },
  returns: v.union(
    v.object({
      label: v.string(),
      amountCents: v.number(),
      mode: v.string(),
      interval: v.optional(v.string()),
    }),
    v.null()
  ),
  handler: async (_ctx, { productKey }) => {
    const product = PRODUCT_PRICES[productKey];
    if (!product) return null;
    return {
      label: product.label,
      amountCents: product.amountCents,
      mode: product.mode,
      interval: product.interval,
    };
  },
});
