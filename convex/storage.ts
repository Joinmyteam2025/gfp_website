import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

// Store a reference to a video file for serving on the AFP page
export const saveVideoReference = mutation({
  args: {
    storageId: v.id("_storage"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Store in siteSettings or a simple key-value
    const existing = await ctx.db
      .query("siteSettings")
      .filter((q) => q.eq(q.field("key"), `video_${args.name}`))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, { value: args.storageId });
    } else {
      await ctx.db.insert("siteSettings", {
        key: `video_${args.name}`,
        value: args.storageId,
      });
    }
    return args.storageId;
  },
});

export const getVideoUrl = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const setting = await ctx.db
      .query("siteSettings")
      .filter((q) => q.eq(q.field("key"), `video_${args.name}`))
      .first();
    if (!setting) return null;
    return await ctx.storage.getUrl(setting.value as any);
  },
});
