/* eslint-disable @typescript-eslint/no-explicit-any */
declare const process: { env: Record<string, string | undefined> };

/**
 * Email Click Tracking System
 *
 * When outreach emails link to `/track?e=EMAIL&p=ffp&c=campaign`:
 * 1. Logs the click in `clickEvents` table
 * 2. Tags the contact in GHL with `clicked_{page}` (async, non-blocking)
 * 3. Redirects to the actual VSL page (e.g. /ffp)
 *
 * Also provides a mutation for logging VSL page views from the frontend.
 */

import { httpAction } from "./_generated/server";
import { v } from "convex/values";
import { mutation, internalAction, query, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

// ── Valid VSL pages ──
const VALID_PAGES = ["afp", "bfp", "cfp", "ffp", "ifp", "mfp", "refp"];

// ── HTTP Action: Track click & redirect ──
export const trackClickHandler = httpAction(async (ctx, request) => {
  const url = new URL(request.url);
  const email = url.searchParams.get("e") || "";
  const page = url.searchParams.get("p") || "ffp";
  const campaign = url.searchParams.get("c") || "";
  const contactId = url.searchParams.get("cid") || "";

  const normalizedPage = page.toLowerCase();
  const targetPage = VALID_PAGES.includes(normalizedPage) ? normalizedPage : "ffp";

  // Record the click event
  if (email) {
    await ctx.runMutation(internal.clickTracking.recordClick, {
      email: email.toLowerCase().trim(),
      contactId: contactId || undefined,
      page: targetPage,
      campaign: campaign || undefined,
      ip: request.headers.get("x-forwarded-for") || request.headers.get("cf-connecting-ip") || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
    });

    // Tag in GHL asynchronously (don't block redirect)
    ctx.runAction(internal.clickTracking.tagContactInGHL, {
      email: email.toLowerCase().trim(),
      contactId: contactId || undefined,
      page: targetPage,
    }).catch(() => { /* non-blocking */ });
  }

  // 302 redirect to the VSL page with UTM params preserved
  const redirectUrl = new URL(`https://garnerfinancialpartners.com/${targetPage}`);
  if (campaign) redirectUrl.searchParams.set("utm_source", "email");
  if (campaign) redirectUrl.searchParams.set("utm_campaign", campaign);
  redirectUrl.searchParams.set("utm_medium", "email");
  redirectUrl.searchParams.set("utm_content", `clicked_${targetPage}`);

  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl.toString(),
      "Cache-Control": "no-cache, no-store",
    },
  });
});

// ── Internal mutation: Record click in database ──
export const recordClick = internalMutation({
  args: {
    email: v.string(),
    contactId: v.optional(v.string()),
    page: v.string(),
    campaign: v.optional(v.string()),
    ip: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("clickEvents", {
      email: args.email,
      contactId: args.contactId,
      page: args.page,
      campaign: args.campaign,
      clickedAt: Date.now(),
      ip: args.ip,
      userAgent: args.userAgent,
      ghlTagged: false,
    });
  },
});

// ── Internal action: Tag contact in GHL with clicked_page ──
export const tagContactInGHL = internalAction({
  args: {
    email: v.string(),
    contactId: v.optional(v.string()),
    page: v.string(),
  },
  handler: async (ctx, args) => {
    const GHL_API = "https://services.leadconnectorhq.com";
    const PIT = process.env.GHL_PIT;
    const LOCATION_ID = process.env.GHL_LOCATION_ID;

    if (!PIT || !LOCATION_ID) {
      console.error("GHL credentials not configured");
      return;
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${PIT}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
      "User-Agent": "Viktor/1.0",
    };

    const tag = `clicked_${args.page}`;

    try {
      let contactId = args.contactId;

      // If no contactId, look up by email
      if (!contactId) {
        const searchRes = await fetch(
          `${GHL_API}/contacts/search/duplicate?locationId=${LOCATION_ID}&email=${encodeURIComponent(args.email)}`,
          { headers }
        );
        if (searchRes.ok) {
          const data = await searchRes.json();
          const contact = data.contact;
          if (contact?.id) {
            contactId = contact.id;
          }
        }
      }

      if (!contactId) {
        console.log(`No GHL contact found for ${args.email}`);
        return;
      }

      // Add the tag
      const tagRes = await fetch(`${GHL_API}/contacts/${contactId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          tags: [tag, "email_clicker", `vsl_visitor_${args.page}`],
        }),
      });

      if (tagRes.ok) {
        console.log(`Tagged ${args.email} with ${tag} in GHL`);
        // Mark as tagged in DB
        await ctx.runMutation(internal.clickTracking.markGhlTagged, {
          email: args.email,
          page: args.page,
        });
      } else {
        console.error(`GHL tag failed: ${tagRes.status}`);
      }
    } catch (err) {
      console.error("GHL tagging error:", err);
    }
  },
});

// ── Internal mutation: Mark click as GHL-tagged ──
export const markGhlTagged = internalMutation({
  args: { email: v.string(), page: v.string() },
  handler: async (ctx, args) => {
    const events = await ctx.db
      .query("clickEvents")
      .withIndex("by_email_page", (q) =>
        q.eq("email", args.email).eq("page", args.page)
      )
      .collect();

    for (const event of events) {
      if (!event.ghlTagged) {
        await ctx.db.patch(event._id, { ghlTagged: true });
      }
    }
  },
});

// ── Mutation: Log VSL page view from frontend ──
export const logPageView = mutation({
  args: {
    page: v.string(),
    referrer: v.optional(v.string()),
    utmSource: v.optional(v.string()),
    utmMedium: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
    utmContent: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("vslPageViews", {
      page: args.page,
      timestamp: Date.now(),
      referrer: args.referrer,
      utmSource: args.utmSource,
      utmMedium: args.utmMedium,
      utmCampaign: args.utmCampaign,
      utmContent: args.utmContent,
      email: args.email,
    });
  },
});

// ── Query: Get click events for a page (used by executive dashboard) ──
export const getClicksByPage = query({
  args: { page: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("clickEvents")
      .withIndex("by_page", (q) => q.eq("page", args.page))
      .order("desc")
      .take(200);
  },
});

// ── Query: Get all click events (last N) ──
export const getRecentClicks = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("clickEvents")
      .withIndex("by_clickedAt")
      .order("desc")
      .take(args.limit ?? 100);
  },
});
