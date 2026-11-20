import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { requireEnv } from "./requireEnv";

declare const process: { env: Record<string, string | undefined> };

const VIKTOR_API_URL = process.env.VIKTOR_SPACES_API_URL!;
const PROJECT_NAME = process.env.VIKTOR_SPACES_PROJECT_NAME!;
const PROJECT_SECRET = process.env.VIKTOR_SPACES_PROJECT_SECRET!;

// ── Availability (mirrors Calendly "Working hours" schedule) ──
// Timezone: America/Phoenix (MST, no DST, always UTC-7)
// Days: 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu,5=Fri,6=Sat
const AVAILABILITY_WINDOWS: Record<number, Array<{ start: string; end: string }>> = {
  2: [{ start: "12:00", end: "13:00" }, { start: "18:00", end: "20:00" }], // Tuesday
  3: [{ start: "08:00", end: "09:00" }, { start: "18:00", end: "20:00" }], // Wednesday
  4: [{ start: "12:00", end: "13:00" }, { start: "18:00", end: "20:00" }], // Thursday
};

const SLOT_DURATION_MIN = 20; // 20-min slots (matches Calendly "1-on-1 with Zach")
const BOOKING_BUFFER_MIN = 60;
const MAX_DAYS_AHEAD = 30;

// ── GHL Notification Config ──
function ghlPit() {
  return requireEnv("GHL_PIT");
}
function ghlLocationId() {
  return requireEnv("GHL_LOCATION_ID");
}
const ZACH_GHL_CONTACT = "f6HcrwjJQN0GWf0Il0Ob";

// ── Helpers ──

async function callViktorTool<T>(role: string, args: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(`${VIKTOR_API_URL}/api/viktor-spaces/tools/call`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_name: PROJECT_NAME,
      project_secret: PROJECT_SECRET,
      role,
      arguments: args,
    }),
  });
  if (!response.ok) throw new Error(`Viktor tool HTTP ${response.status}: ${await response.text()}`);
  const json = await response.json();
  if (!json.success) throw new Error(json.error ?? "Viktor tool call failed");
  return json.result as T;
}

function parseTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  return { hours: h, minutes: m };
}

function mstDate(dateStr: string, time: string): Date {
  const { hours, minutes } = parseTime(time);
  return new Date(`${dateStr}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00-07:00`);
}

function generateSlots(windowStart: string, windowEnd: string): string[] {
  const slots: string[] = [];
  const start = parseTime(windowStart);
  const end = parseTime(windowEnd);
  const startMin = start.hours * 60 + start.minutes;
  const endMin = end.hours * 60 + end.minutes;
  for (let t = startMin; t + SLOT_DURATION_MIN <= endMin; t += SLOT_DURATION_MIN) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return slots;
}

function formatTime12h(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

async function notifyZach(details: {
  clientName: string; clientEmail: string; clientPhone: string;
  date: string; startTime: string; endTime: string; notes?: string;
}): Promise<void> {
  const { clientName, clientEmail, clientPhone, date, startTime, endTime, notes } = details;
  const [y, mo, d] = date.split("-").map(Number);
  const dateObj = new Date(y, mo - 1, d);
  const formattedDate = dateObj.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const formattedTime = formatTime12h(startTime) + " - " + formatTime12h(endTime) + " MST";

  // SMS via GHL
  try {
    const smsBody = `📅 New GFP Strategy Call!\nClient: ${clientName}\nPhone: ${clientPhone}\nEmail: ${clientEmail}\nDate: ${formattedDate}\nTime: ${formattedTime}${notes ? `\nNotes: ${notes}` : ""}\nSource: garnerfinancialpartners.com/book`;
    await fetch(`https://services.leadconnectorhq.com/conversations/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ghlPit()}`,
        "Version": "2021-07-28",
        "Content-Type": "application/json",
        "User-Agent": "Viktor/1.0",
      },
      body: JSON.stringify({
        type: "SMS",
        contactId: ZACH_GHL_CONTACT,
        message: smsBody,
      }),
    });
  } catch (e) { console.error("SMS notification failed:", e); }
}

// ── Get Available Slots ──

export const getAvailableSlots = action({
  args: { startDate: v.string(), endDate: v.string() },
  returns: v.array(v.object({
    date: v.string(),
    dayOfWeek: v.number(),
    slots: v.array(v.object({ startTime: v.string(), endTime: v.string(), available: v.boolean() })),
  })),
  handler: async (_ctx, { startDate, endDate }) => {
    const now = new Date();
    const bufferTime = new Date(now.getTime() + BOOKING_BUFFER_MIN * 60 * 1000);
    let busyPeriods: Array<{ start: string; end: string }> = [];
    try {
      const result = await callViktorTool<any>("pd_google_calendar_query_free_busy_calendars", {
        calendarId: ["ezachgarner@gmail.com"],
        timeMin: `${startDate}T00:00:00-07:00`,
        timeMax: `${endDate}T23:59:59-07:00`,
      });
      if (result?.calendars?.["ezachgarner@gmail.com"]?.busy) busyPeriods = result.calendars["ezachgarner@gmail.com"].busy;
      else if (result?.data?.calendars?.["ezachgarner@gmail.com"]?.busy) busyPeriods = result.data.calendars["ezachgarner@gmail.com"].busy;
    } catch (e) { console.error("Failed to fetch Google Calendar:", e); }

    const busyRanges = busyPeriods.map((b) => ({ start: new Date(b.start).getTime(), end: new Date(b.end).getTime() }));
    const maxDate = new Date(now.getTime() + MAX_DAYS_AHEAD * 24 * 60 * 60 * 1000);
    const results: Array<{ date: string; dayOfWeek: number; slots: Array<{ startTime: string; endTime: string; available: boolean }> }> = [];

    const current = new Date(`${startDate}T12:00:00-07:00`);
    const end = new Date(`${endDate}T12:00:00-07:00`);

    while (current <= end) {
      const dateStr = current.toISOString().split("T")[0];
      const dayOfWeek = current.getUTCDay();
      const windows = AVAILABILITY_WINDOWS[dayOfWeek] || [];
      const daySlots: Array<{ startTime: string; endTime: string; available: boolean }> = [];

      for (const window of windows) {
        const slotStarts = generateSlots(window.start, window.end);
        for (const slotStart of slotStarts) {
          const slotStartMs = mstDate(dateStr, slotStart).getTime();
          const endMinutes = parseTime(slotStart).hours * 60 + parseTime(slotStart).minutes + SLOT_DURATION_MIN;
          const slotEnd = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;
          const slotEndMs = mstDate(dateStr, slotEnd).getTime();
          if (slotStartMs < bufferTime.getTime() || slotStartMs > maxDate.getTime()) continue;
          const isBusy = busyRanges.some((busy) => slotStartMs < busy.end && slotEndMs > busy.start);
          daySlots.push({ startTime: slotStart, endTime: slotEnd, available: !isBusy });
        }
      }
      if (windows.length > 0) results.push({ date: dateStr, dayOfWeek, slots: daySlots });
      current.setDate(current.getDate() + 1);
    }
    return results;
  },
});

// ── Book Appointment (public — no auth required) ──

export const bookAppointment = action({
  args: {
    date: v.string(), startTime: v.string(),
    clientName: v.string(), clientEmail: v.string(), clientPhone: v.string(),
    smsConsent: v.boolean(), notes: v.optional(v.string()),
  },
  returns: v.object({ success: v.boolean(), error: v.optional(v.string()) }),
  handler: async (ctx, args): Promise<{ success: boolean; error?: string }> => {
    const { date, startTime, clientName, clientEmail, clientPhone, smsConsent, notes } = args;
    const startParsed = parseTime(startTime);
    const endMin = startParsed.hours * 60 + startParsed.minutes + SLOT_DURATION_MIN;
    const endTime = `${String(Math.floor(endMin / 60)).padStart(2, "0")}:${String(endMin % 60).padStart(2, "0")}`;
    const startTimestamp = mstDate(date, startTime).getTime();
    const endTimestamp = mstDate(date, endTime).getTime();

    // Double-check availability via Google Calendar
    try {
      const result = await callViktorTool<any>("pd_google_calendar_query_free_busy_calendars", {
        calendarId: ["ezachgarner@gmail.com"],
        timeMin: `${date}T${startTime}:00-07:00`,
        timeMax: `${date}T${endTime}:00-07:00`,
      });
      let busy: any[] = [];
      if (result?.calendars?.["ezachgarner@gmail.com"]?.busy) busy = result.calendars["ezachgarner@gmail.com"].busy;
      else if (result?.data?.calendars?.["ezachgarner@gmail.com"]?.busy) busy = result.data.calendars["ezachgarner@gmail.com"].busy;
      if (busy.length > 0) return { success: false, error: "This time slot is no longer available. Please select another time." };
    } catch (e) { console.error("Availability check failed:", e); }

    // Create Google Calendar event with Meet link
    let googleEventId: string | undefined;
    try {
      const eventResult = await callViktorTool<any>("pd_google_calendar_proxy_post", {
        url: "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        query_params: { sendUpdates: "all", conferenceDataVersion: "1" },
        json_body: {
          summary: `GFP Strategy Call - ${clientName}`,
          description: `Financial Strategy Call with ${clientName}\nEmail: ${clientEmail}\nPhone: ${clientPhone}\nSMS Consent: ${smsConsent ? "Yes" : "No"}\n${notes ? `Notes: ${notes}` : ""}`.trim(),
          start: { dateTime: `${date}T${startTime}:00`, timeZone: "America/Phoenix" },
          end: { dateTime: `${date}T${endTime}:00`, timeZone: "America/Phoenix" },
          attendees: [{ email: clientEmail, displayName: clientName }],
          conferenceData: { createRequest: { requestId: `gfp-${Date.now()}`, conferenceSolutionKey: { type: "hangoutsMeet" } } },
          reminders: { useDefault: false, overrides: [{ method: "email", minutes: 60 }, { method: "popup", minutes: 30 }] },
        },
      });
      if (eventResult?.id) googleEventId = eventResult.id;
      else if (eventResult?.data?.id) googleEventId = eventResult.data.id;
    } catch (e) { console.error("Google Calendar event creation failed:", e); }

    // Save to DB
    await ctx.runMutation(internal.appointments.saveAppointment, {
      clientName, clientEmail, clientPhone, date, startTime, endTime,
      startTimestamp, endTimestamp, googleEventId, smsConsent,
      notes, status: "confirmed" as const, createdAt: Date.now(),
    });

    // Notify Zach via SMS
    try { await notifyZach({ clientName, clientEmail, clientPhone, date, startTime, endTime, notes }); }
    catch (e) { console.error("Notification failed:", e); }

    // Create/find GHL contact for the lead & send thank you
    let ghlContactId: string | undefined;
    try {
      // Search for existing contact
      const searchRes = await fetch("https://services.leadconnectorhq.com/contacts/search", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${ghlPit()}`,
          "Version": "2021-07-28",
          "Content-Type": "application/json",
          "User-Agent": "Viktor/1.0",
        },
        body: JSON.stringify({
          locationId: ghlLocationId(),
          filters: [{ field: "email", operator: "eq", value: clientEmail }],
          page: 1, pageLimit: 1,
        }),
      });
      const searchData = await searchRes.json();
      if (searchData?.contacts?.[0]?.id) {
        ghlContactId = searchData.contacts[0].id;
      } else {
        // Create new contact
        const createRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${ghlPit()}`,
            "Version": "2021-07-28",
            "Content-Type": "application/json",
            "User-Agent": "Viktor/1.0",
          },
          body: JSON.stringify({
            locationId: ghlLocationId(),
            firstName: clientName.split(" ")[0],
            lastName: clientName.split(" ").slice(1).join(" ") || "",
            email: clientEmail,
            phone: clientPhone,
            tags: ["booked_call", "strategy_call"],
            source: "garnerfinancialpartners.com/book",
          }),
        });
        const createData = await createRes.json();
        ghlContactId = createData?.contact?.id;
      }

      // Send thank you SMS to the lead
      if (ghlContactId && smsConsent) {
        const [yr, mon, dy] = date.split("-").map(Number);
        const apptDate = new Date(yr, mon - 1, dy);
        const fDate = apptDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
        const fTime = formatTime12h(startTime);
        const thankYouMsg = `Hi ${clientName.split(" ")[0]}! 🎉 Thank you for booking your FREE Strategy Call with Zach Garner at Garner Financial Partners!\n\n📅 ${fDate} at ${fTime} MST\n📹 Google Meet (link in your email)\n\nI look forward to speaking with you! If you have any questions before our call, feel free to text back.\n\n- Zach Garner`;
        await fetch("https://services.leadconnectorhq.com/conversations/messages", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${ghlPit()}`,
            "Version": "2021-07-28",
            "Content-Type": "application/json",
            "User-Agent": "Viktor/1.0",
          },
          body: JSON.stringify({ type: "SMS", contactId: ghlContactId, message: thankYouMsg }),
        });

        // Send thank you email
        const thankYouEmail = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
<h2 style="color:#0B1D3A">Your Strategy Call is Confirmed! 🎉</h2>
<p>Hi ${clientName.split(" ")[0]},</p>
<p>Thank you for booking a <strong>FREE Strategy Call</strong> with Zach Garner at Garner Financial Partners.</p>
<div style="background:#F8F9FA;border-left:4px solid #C5963A;padding:16px;margin:20px 0;border-radius:4px">
<p style="margin:4px 0"><strong>📅 Date:</strong> ${fDate}</p>
<p style="margin:4px 0"><strong>⏰ Time:</strong> ${fTime} MST</p>
<p style="margin:4px 0"><strong>📹 Format:</strong> Google Meet (link in calendar invite)</p>
</div>
<p>I look forward to learning about your financial goals and showing you how we can help build, protect, and preserve your wealth.</p>
<p style="margin-top:20px">See you soon!<br><strong>Zach Garner</strong><br>Garner Financial Partners<br><em>Build. Protect. Preserve.</em></p>
</div>`;
        await fetch("https://services.leadconnectorhq.com/conversations/messages", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${ghlPit()}`,
            "Version": "2021-07-28",
            "Content-Type": "application/json",
            "User-Agent": "Viktor/1.0",
          },
          body: JSON.stringify({ type: "Email", contactId: ghlContactId, subject: "Your Strategy Call with Zach Garner is Confirmed! 🎉", html: thankYouEmail }),
        });
      }

      // Save GHL contact ID to the appointment
      if (ghlContactId) {
        // We'll use tags to track reminders sent
        await fetch(`https://services.leadconnectorhq.com/contacts/${ghlContactId}/tags`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${ghlPit()}`,
            "Version": "2021-07-28",
            "Content-Type": "application/json",
            "User-Agent": "Viktor/1.0",
          },
          body: JSON.stringify({ tags: ["booked_call", "strategy_call", `appt_${date}_${startTime}`] }),
        });
      }
    } catch (e) { console.error("GHL contact/thank you failed:", e); }

    return { success: true };
  },
});

// ── Internal mutation ──

export const saveAppointment = internalMutation({
  args: {
    clientName: v.string(), clientEmail: v.string(), clientPhone: v.string(),
    date: v.string(), startTime: v.string(), endTime: v.string(),
    startTimestamp: v.number(), endTimestamp: v.number(),
    googleEventId: v.optional(v.string()), smsConsent: v.boolean(),
    notes: v.optional(v.string()),
    status: v.union(v.literal("confirmed"), v.literal("cancelled"), v.literal("completed"), v.literal("no_show")),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("appointments", args);
  },
});
