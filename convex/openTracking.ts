/**
 * Email Open Tracking System
 *
 * When emails include a 1x1 tracking pixel:
 *   <img src="https://pleasant-gnat-404.convex.site/pixel?e=EMAIL&p=ffp&c=campaign" />
 * Loading the image records the open event and serves a 1x1 transparent GIF.
 */

import { httpAction } from "./_generated/server";
import { internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// 1x1 transparent GIF (43 bytes)
const PIXEL_GIF = new Uint8Array([
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
  0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x21,
  0xf9, 0x04, 0x01, 0x00, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00,
  0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44,
  0x01, 0x00, 0x3b,
]);

// ── HTTP Action: Serve tracking pixel ──
export const pixelHandler = httpAction(async (ctx, request) => {
  const url = new URL(request.url);
  const email = url.searchParams.get("e") || "";
  const page = url.searchParams.get("p") || "";
  const campaign = url.searchParams.get("c") || "";

  // Record the open event (non-blocking)
  if (email) {
    await ctx.runMutation(internal.openTracking.recordOpen, {
      email: email.toLowerCase().trim(),
      page: page.toLowerCase(),
      campaign: campaign || undefined,
      ip: request.headers.get("x-forwarded-for") || request.headers.get("cf-connecting-ip") || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
    });
  }

  // Return 1x1 transparent GIF
  return new Response(PIXEL_GIF, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Content-Length": PIXEL_GIF.length.toString(),
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
});

// ── Internal mutation: Record open event ──
export const recordOpen = internalMutation({
  args: {
    email: v.string(),
    page: v.string(),
    campaign: v.optional(v.string()),
    ip: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Deduplicate: only count one open per email per page per hour
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const recent = await ctx.db
      .query("emailOpens")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .filter((q) => q.gte(q.field("openedAt"), oneHourAgo))
      .collect();

    const alreadyTracked = recent.some(
      (r) => r.page === args.page
    );

    if (!alreadyTracked) {
      await ctx.db.insert("emailOpens", {
        email: args.email,
        page: args.page,
        campaign: args.campaign,
        openedAt: Date.now(),
        ip: args.ip,
        userAgent: args.userAgent,
      });
    }
  },
});

// ── Query: Get open counts by page ──
export const getOpensByPage = query({
  args: { page: v.string() },
  handler: async (ctx, args) => {
    const opens = await ctx.db
      .query("emailOpens")
      .withIndex("by_page", (q) => q.eq("page", args.page))
      .collect();
    return {
      total: opens.length,
      uniqueEmails: new Set(opens.map((o) => o.email)).size,
    };
  },
});

// ── Query: Get all open/click stats (for executive dashboard sync) ──
export const getEmailStats = query({
  args: {},
  handler: async (ctx) => {
    const opens = await ctx.db.query("emailOpens").collect();
    const clicks = await ctx.db.query("clickEvents").collect();

    // Group by page
    const stats: Record<string, { opens: number; uniqueOpens: number; clicks: number; uniqueClicks: number }> = {};

    for (const o of opens) {
      if (!stats[o.page]) stats[o.page] = { opens: 0, uniqueOpens: 0, clicks: 0, uniqueClicks: 0 };
      stats[o.page].opens++;
    }

    // Count unique opens per page
    const openEmails: Record<string, Set<string>> = {};
    for (const o of opens) {
      if (!openEmails[o.page]) openEmails[o.page] = new Set();
      openEmails[o.page].add(o.email);
    }
    for (const [page, emails] of Object.entries(openEmails)) {
      if (stats[page]) stats[page].uniqueOpens = emails.size;
    }

    for (const c of clicks) {
      if (!stats[c.page]) stats[c.page] = { opens: 0, uniqueOpens: 0, clicks: 0, uniqueClicks: 0 };
      stats[c.page].clicks++;
    }

    // Count unique clicks per page
    const clickEmails: Record<string, Set<string>> = {};
    for (const c of clicks) {
      if (!clickEmails[c.page]) clickEmails[c.page] = new Set();
      clickEmails[c.page].add(c.email);
    }
    for (const [page, emails] of Object.entries(clickEmails)) {
      if (stats[page]) stats[page].uniqueClicks = emails.size;
    }

    return stats;
  },
});
