import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  // SMS conversation tracking for Ashley support bot
  smsConversations: defineTable({
    phone: v.string(), // E.164 format
    messages: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("ashley")),
        body: v.string(),
        timestamp: v.number(),
      })
    ),
    lastActivity: v.number(),
    escalated: v.boolean(), // if escalated to human
  })
    .index("by_phone", ["phone"])
    .index("by_lastActivity", ["lastActivity"]),
  orders: defineTable({
    // Buyer info
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    zipCode: v.optional(v.string()),
    // Product info
    product: v.string(), // "ffp" | "bfp" | "mfp"
    productName: v.string(),
    price: v.number(),
    portalUrl: v.string(),
    // Payment info
    stripeSessionId: v.optional(v.string()),
    paymentStatus: v.string(), // "pending" | "completed" | "demo"
    // Processing status
    emailSent: v.boolean(),
    smsSent: v.boolean(),
    slackNotified: v.boolean(),
    sheetUpdated: v.boolean(),
    portalCreated: v.boolean(),
    driveFolderCreated: v.optional(v.boolean()),
    driveFolderId: v.optional(v.string()),
    // Meta
    salesDate: v.string(),
    repAssigned: v.optional(v.string()),
    repId: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_product", ["product"])
    .index("by_stripe_session", ["stripeSessionId"]),
  // Recruit lead submissions from /join landing page
  recruitLeads: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.string(),
    state: v.string(),
    isLicensed: v.boolean(),
    yearsLicensed: v.optional(v.string()), // "less-than-1" | "1-3" | "3-5" | "5-10" | "10+"
    agentType: v.optional(v.string()), // "captive" | "independent"
    ghlContactId: v.optional(v.string()),
    ghlPushed: v.boolean(),
    utmSource: v.optional(v.string()),
    utmMedium: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
    utmContent: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_phone", ["phone"]),
  // Site-wide key-value settings (video URLs, feature flags, etc.)
  siteSettings: defineTable({
    key: v.string(),
    value: v.string(),
  }),

  // ── Email Open Tracking ──
  // Records every email open (tracking pixel load)
  emailOpens: defineTable({
    email: v.string(),            // contact email
    page: v.string(),             // which campaign/page the email was for
    campaign: v.optional(v.string()),
    openedAt: v.number(),         // timestamp
    ip: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_page", ["page"])
    .index("by_openedAt", ["openedAt"]),

  // ── Email Click Tracking ──
  // Records every email-link click so we can identify who visited which VSL page
  clickEvents: defineTable({
    email: v.string(),            // contact email
    contactId: v.optional(v.string()), // GHL contact ID if available
    page: v.string(),             // "afp" | "bfp" | "cfp" | "ffp" | "ifp" | "mfp" | "refp"
    campaign: v.optional(v.string()), // email campaign source
    clickedAt: v.number(),        // timestamp
    ip: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    ghlTagged: v.boolean(),       // whether we tagged them in GHL
  })
    .index("by_email", ["email"])
    .index("by_page", ["page"])
    .index("by_email_page", ["email", "page"])
    .index("by_clickedAt", ["clickedAt"]),

  // ── Appointments (custom booking page) ──
  appointments: defineTable({
    clientName: v.string(),
    clientEmail: v.string(),
    clientPhone: v.string(),
    date: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    startTimestamp: v.number(),
    endTimestamp: v.number(),
    googleEventId: v.optional(v.string()),
    smsConsent: v.boolean(),
    notes: v.optional(v.string()),
    status: v.union(v.literal("confirmed"), v.literal("cancelled"), v.literal("completed"), v.literal("no_show")),
    ghlContactId: v.optional(v.string()),
    leadConfirmed: v.optional(v.boolean()),
    remindersSent: v.optional(v.array(v.string())),
    source: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_date", ["date"])
    .index("by_email", ["clientEmail"])
    .index("by_status", ["status"])
    .index("by_startTimestamp", ["startTimestamp"]),

  // ── VSL Page Views (anonymous until identified) ──
  vslPageViews: defineTable({
    page: v.string(),             // "afp" | "bfp" etc.
    timestamp: v.number(),
    referrer: v.optional(v.string()),
    utmSource: v.optional(v.string()),
    utmMedium: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
    utmContent: v.optional(v.string()),
    // If we can link to a click event
    email: v.optional(v.string()),
  })
    .index("by_page", ["page"])
    .index("by_timestamp", ["timestamp"]),
});

export default schema;
