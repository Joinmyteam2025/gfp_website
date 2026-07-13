import { v } from "convex/values";
import { mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

declare const process: { env: Record<string, string | undefined> };

const VIKTOR_API_URL = process.env.VIKTOR_SPACES_API_URL!;
const PROJECT_NAME = process.env.VIKTOR_SPACES_PROJECT_NAME!;
const PROJECT_SECRET = process.env.VIKTOR_SPACES_PROJECT_SECRET!;

export const submit = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.string(),
    state: v.string(),
    isLicensed: v.boolean(),
    yearsLicensed: v.optional(v.string()),
    agentType: v.optional(v.string()),
    utmSource: v.optional(v.string()),
    utmMedium: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
    utmContent: v.optional(v.string()),
  },
  returns: v.id("recruitLeads"),
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("recruitLeads", {
      ...args,
      ghlPushed: false,
    });
    return id;
  },
});

export const pushToGHL = action({
  args: {
    leadId: v.id("recruitLeads"),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.string(),
    state: v.string(),
    isLicensed: v.boolean(),
    yearsLicensed: v.optional(v.string()),
    agentType: v.optional(v.string()),
    utmSource: v.optional(v.string()),
    utmMedium: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
    utmContent: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    try {
      // Build tags for GHL
      const tags: string[] = ["recruit-lead", "join-page"];
      if (args.isLicensed) tags.push("licensed");
      else tags.push("unlicensed");
      if (args.agentType) tags.push(args.agentType);
      if (args.yearsLicensed) tags.push(`exp-${args.yearsLicensed}`);
      if (args.utmSource) tags.push(`utm-${args.utmSource}`);
      if (args.utmCampaign) tags.push(`campaign-${args.utmCampaign}`);

      // Push to GHL as new contact
      const response = await fetch(`${VIKTOR_API_URL}/api/viktor-spaces/tools/call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_name: PROJECT_NAME,
          project_secret: PROJECT_SECRET,
          role: "pd_highlevel_oauth_proxy_post",
          arguments: {
            url: "https://services.leadconnectorhq.com/contacts/",
            body: {
              firstName: args.firstName,
              lastName: args.lastName,
              email: args.email,
              phone: args.phone,
              city: args.city,
              state: args.state,
              tags,
              source: "Join Page",
            },
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const contactId = data?.result?.contact?.id;
        if (contactId) {
          await ctx.runMutation(api.recruitLeads.markPushed, {
            leadId: args.leadId,
            ghlContactId: contactId,
          });
        } else {
          await ctx.runMutation(api.recruitLeads.markPushed, {
            leadId: args.leadId,
          });
        }
      }
    } catch (err) {
      console.error("Failed to push recruit lead to GHL:", err);
    }
    return null;
  },
});

export const markPushed = mutation({
  args: {
    leadId: v.id("recruitLeads"),
    ghlContactId: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.leadId, {
      ghlPushed: true,
      ...(args.ghlContactId ? { ghlContactId: args.ghlContactId } : {}),
    });
    return null;
  },
});
