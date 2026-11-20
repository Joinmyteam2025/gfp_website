import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const submit = mutation({
  args: {
    firstName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    smsConsent: v.boolean(),
    source: v.string(),
    contentName: v.string(),
    path: v.string(),
  },
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx, args) => {
    const firstName = args.firstName.trim();
    const email = args.email.trim().toLowerCase();
    if (!firstName || firstName.length > 80) {
      throw new Error("Please enter your first name.");
    }
    if (!email.includes("@") || email.length > 200) {
      throw new Error("Please enter a valid email address.");
    }
    const phone = args.phone?.trim();
    if (phone && phone.length > 30) {
      throw new Error("Please enter a valid phone number.");
    }

    await ctx.db.insert("freeAccessLeads", {
      firstName,
      email,
      phone: phone || undefined,
      smsConsent: Boolean(phone) && args.smsConsent,
      source: args.source.slice(0, 80),
      contentName: args.contentName.slice(0, 160),
      path: args.path.slice(0, 120),
      createdAt: Date.now(),
    });

    return { success: true };
  },
});
