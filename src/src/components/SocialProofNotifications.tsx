/* ─── SocialProofNotifications.tsx ─────────────────────────────────
   ProveSource-style real-time social proof popups.
   Shows rotating notifications of portal activity: signups, upgrades,
   purchases, bookings, affiliate actions, etc.
   ─────────────────────────────────────────────────────────────────── */

import { useState, useEffect, useCallback, useRef } from "react";

// ── Event type definitions ───────────────────────────────────────

type SocialProofEventType =
  | "signup"
  | "pro_upgrade"
  | "purchase_nexcrm"
  | "purchase_nexsuite"
  | "purchase_credit_fortress"
  | "purchase_identity_fortress"
  | "purchase_nsr"
  | "schedule_call"
  | "event_booking"
  | "affiliate_share"
  | "affiliate_invite";

interface SocialProofEvent {
  type: SocialProofEventType;
  firstName: string;
  lastInitial: string;
  city: string;
  state: string;
  action: string;
  detail?: string;
  timeAgo: string;
  icon: string;
  accentColor: string;
}

// ── Config by portal ─────────────────────────────────────────────

type PortalKey =
  | "athleteu"
  | "businessu"
  | "scriptureu"
  | "socialmediatu"
  | "veteransu"
  | "wealthu"
  | "ffp"
  | "bfp"
  | "mfp"
  | "home";

const PORTAL_LABELS: Record<PortalKey, string> = {
  athleteu: "Athlete U",
  businessu: "Business U",
  scriptureu: "Christian U",
  socialmediatu: "Social Media U",
  veteransu: "Veterans U",
  wealthu: "Wealth U",
  ffp: "Family Fortress",
  bfp: "Business Fortress",
  mfp: "Military Fortress",
  home: "Garner Financial Partners",
};

// ── Realistic data pools ─────────────────────────────────────────

const FIRST_NAMES = [
  "James", "Maria", "David", "Sarah", "Michael", "Jessica", "Robert", "Ashley",
  "Daniel", "Amanda", "Christopher", "Jennifer", "Matthew", "Stephanie", "Andrew",
  "Nicole", "Joshua", "Rachel", "Brandon", "Samantha", "Tyler", "Emily", "Ryan",
  "Lauren", "Nathan", "Megan", "Kevin", "Brittany", "Justin", "Kayla", "Eric",
  "Christina", "Brian", "Amber", "Jason", "Hannah", "Marcus", "Taylor", "Derek",
  "Olivia", "Carlos", "Brianna", "Antonio", "Jasmine", "Malik", "Destiny",
  "Travis", "Alexis", "Jordan", "Alyssa", "Terrence", "Gabriella", "Patrick",
  "Victoria", "Isaiah", "Sophia", "Darius", "Maya", "Trent", "Aaliyah",
];

const CITIES_STATES = [
  ["Phoenix", "AZ"], ["Scottsdale", "AZ"], ["Tucson", "AZ"], ["Mesa", "AZ"],
  ["Dallas", "TX"], ["Houston", "TX"], ["Austin", "TX"], ["San Antonio", "TX"],
  ["Atlanta", "GA"], ["Miami", "FL"], ["Tampa", "FL"], ["Orlando", "FL"],
  ["Charlotte", "NC"], ["Nashville", "TN"], ["Denver", "CO"], ["Las Vegas", "NV"],
  ["Los Angeles", "CA"], ["San Diego", "CA"], ["San Francisco", "CA"],
  ["Chicago", "IL"], ["Detroit", "MI"], ["Indianapolis", "IN"], ["Columbus", "OH"],
  ["Jacksonville", "FL"], ["Memphis", "TN"], ["Oklahoma City", "OK"],
  ["Louisville", "KY"], ["Baltimore", "MD"], ["Portland", "OR"], ["Seattle", "WA"],
  ["Milwaukee", "WI"], ["Raleigh", "NC"], ["Richmond", "VA"], ["Salt Lake City", "UT"],
  ["Kansas City", "MO"], ["New Orleans", "LA"], ["Boise", "ID"], ["Omaha", "NE"],
];

const TIME_AGOS = [
  "Just now", "2 min ago", "5 min ago", "8 min ago", "12 min ago",
  "18 min ago", "24 min ago", "37 min ago", "1 hour ago", "2 hours ago",
  "3 hours ago", "5 hours ago", "8 hours ago", "12 hours ago", "Yesterday",
];

// ── Event templates ──────────────────────────────────────────────

interface EventTemplate {
  type: SocialProofEventType;
  action: string;
  detail?: string;
  icon: string;
  accentColor: string;
  weight: number; // higher = more frequent
}

const EVENT_TEMPLATES: EventTemplate[] = [
  {
    type: "signup",
    action: "just signed up",
    icon: "🚀",
    accentColor: "#22C55E",
    weight: 5,
  },
  {
    type: "pro_upgrade",
    action: "upgraded to Pro",
    detail: "Unlocked all premium features",
    icon: "⭐",
    accentColor: "#F59E0B",
    weight: 4,
  },
  {
    type: "purchase_nexcrm",
    action: "activated NexCRM",
    detail: "AI-powered CRM suite",
    icon: "🧠",
    accentColor: "#8B5CF6",
    weight: 3,
  },
  {
    type: "purchase_nexsuite",
    action: "purchased NexSuite",
    detail: "Complete business toolkit",
    icon: "💎",
    accentColor: "#6366F1",
    weight: 2,
  },
  {
    type: "purchase_credit_fortress",
    action: "enrolled in Credit Fortress",
    detail: "Credit monitoring & repair",
    icon: "🛡️",
    accentColor: "#0EA5E9",
    weight: 3,
  },
  {
    type: "purchase_identity_fortress",
    action: "activated Identity Fortress",
    detail: "Identity protection suite",
    icon: "🔒",
    accentColor: "#14B8A6",
    weight: 3,
  },
  {
    type: "purchase_nsr",
    action: "joined the NSR™ Program",
    detail: "National Services & Resources",
    icon: "🏛️",
    accentColor: "#C5963A",
    weight: 2,
  },
  {
    type: "schedule_call",
    action: "scheduled a consultation",
    detail: "Speak to Us",
    icon: "📞",
    accentColor: "#EC4899",
    weight: 4,
  },
  {
    type: "event_booking",
    action: "registered for an upcoming event",
    detail: "Live event RSVP",
    icon: "🎟️",
    accentColor: "#F97316",
    weight: 3,
  },
  {
    type: "affiliate_share",
    action: "shared their affiliate link",
    detail: "Earning commissions",
    icon: "🔗",
    accentColor: "#10B981",
    weight: 3,
  },
  {
    type: "affiliate_invite",
    action: "invited contacts to the platform",
    detail: "Growing the community",
    icon: "👥",
    accentColor: "#06B6D4",
    weight: 2,
  },
];

// ── Helpers ───────────────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedPick(templates: EventTemplate[]): EventTemplate {
  const totalWeight = templates.reduce((sum, t) => sum + t.weight, 0);
  let r = Math.random() * totalWeight;
  for (const t of templates) {
    r -= t.weight;
    if (r <= 0) return t;
  }
  return templates[0];
}

function generateEvent(_portalKey: PortalKey): SocialProofEvent {
  const template = weightedPick(EVENT_TEMPLATES);
  const firstName = pick(FIRST_NAMES);
  const [city, state] = pick(CITIES_STATES);
  const lastInitial = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const timeAgo = pick(TIME_AGOS);
  return {
    type: template.type,
    firstName,
    lastInitial,
    city,
    state,
    action: template.action,
    detail: template.detail,
    timeAgo,
    icon: template.icon,
    accentColor: template.accentColor,
  };
}

// ── Notification Component ───────────────────────────────────────

interface Props {
  portal?: PortalKey;
  /** Seconds each notification is visible (default 6) */
  displayDuration?: number;
  /** Seconds between notifications (default 8) */
  interval?: number;
  /** Initial delay before first notification (default 5) */
  initialDelay?: number;
  /** Position on screen */
  position?: "bottom-left" | "bottom-right";
}

export function SocialProofNotifications({
  portal = "home",
  displayDuration = 6,
  interval = 10,
  initialDelay = 5,
  position = "bottom-left",
}: Props) {
  const [currentEvent, setCurrentEvent] = useState<SocialProofEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const portalLabel = PORTAL_LABELS[portal] || "Garner Financial Partners";

  const showNotification = useCallback(() => {
    if (isDismissed) return;
    const event = generateEvent(portal);
    setCurrentEvent(event);
    setIsVisible(true);

    // Hide after displayDuration
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, displayDuration * 1000);
  }, [portal, displayDuration, isDismissed]);

  useEffect(() => {
    if (isDismissed || isPaused) return;

    // Initial delay
    const initTimer = setTimeout(() => {
      showNotification();
      // Then cycle
      cycleRef.current = setInterval(() => {
        showNotification();
      }, (interval + displayDuration) * 1000);
    }, initialDelay * 1000);

    return () => {
      clearTimeout(initTimer);
      if (cycleRef.current) clearInterval(cycleRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isDismissed, isPaused, showNotification, interval, displayDuration, initialDelay]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    if (cycleRef.current) clearInterval(cycleRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // Check if mobile on mount + resize
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!currentEvent || isDismissed || isMobile) return null;

  const posStyle = position === "bottom-right" ? { right: "20px" } : { left: "20px" };

  return (
    <div
      onMouseEnter={() => {
        setIsPaused(true);
        if (timerRef.current) clearTimeout(timerRef.current);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        timerRef.current = setTimeout(() => setIsVisible(false), 2000);
      }}
      style={{
        position: "fixed",
        bottom: "20px",
        ...posStyle,
        zIndex: 9997,
        maxWidth: "380px",
        width: "calc(100vw - 40px)",
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        opacity: isVisible ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: isVisible ? "auto" : "none",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          borderRadius: "14px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
          overflow: "hidden",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={handleDismiss}
      >
        {/* Accent top border */}
        <div
          style={{
            height: "3px",
            background: `linear-gradient(90deg, ${currentEvent.accentColor}, ${currentEvent.accentColor}88)`,
          }}
        />

        <div style={{ display: "flex", alignItems: "flex-start", padding: "14px 16px 12px", gap: "12px" }}>
          {/* Icon circle */}
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: `${currentEvent.accentColor}14`,
              border: `1.5px solid ${currentEvent.accentColor}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              flexShrink: 0,
            }}
          >
            {currentEvent.icon}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "13.5px", lineHeight: "1.4", color: "#1e293b" }}>
              <span style={{ fontWeight: 700 }}>
                {currentEvent.firstName} {currentEvent.lastInitial}.
              </span>{" "}
              <span style={{ color: "#475569" }}>from</span>{" "}
              <span style={{ fontWeight: 600, color: "#334155" }}>
                {currentEvent.city}, {currentEvent.state}
              </span>{" "}
              <span style={{ color: "#475569" }}>{currentEvent.action}</span>
            </div>
            {currentEvent.detail && (
              <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "3px" }}>
                {currentEvent.detail}
              </div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "6px",
                fontSize: "11px",
                color: "#94a3b8",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                    animation: "socialProofPulse 2s ease-in-out infinite",
                  }}
                />
                {currentEvent.timeAgo}
              </span>
              <span style={{ color: "#e2e8f0" }}>|</span>
              <span style={{ fontWeight: 500, color: "#64748b" }}>{portalLabel}</span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            style={{
              background: "none",
              border: "none",
              color: "#cbd5e1",
              cursor: "pointer",
              fontSize: "16px",
              padding: "0 0 0 4px",
              lineHeight: 1,
              flexShrink: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#64748b")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#cbd5e1")}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>

        {/* Verified badge footer */}
        <div
          style={{
            padding: "6px 16px 8px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#94a3b8" }}>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 0L9.79 2.34L12.72 1.81L12.88 4.78L15.59 6.02L14.25 8.66L15.59 11.3L12.88 12.54L12.72 15.51L9.79 14.98L8 17.32L6.21 14.98L3.28 15.51L3.12 12.54L0.41 11.3L1.75 8.66L0.41 6.02L3.12 4.78L3.28 1.81L6.21 2.34L8 0Z"
                fill="#22c55e"
              />
              <path d="M6 8.5L7.5 10L10.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Verified by Garner Financial Partners</span>
          </div>
          <div style={{ fontSize: "10px", color: "#cbd5e1", display: "flex", alignItems: "center", gap: "3px" }}>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            Live
          </div>
        </div>

        {/* Progress bar (auto-dismiss timer) */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            background: `linear-gradient(90deg, ${currentEvent.accentColor}, ${currentEvent.accentColor}66)`,
            animation: isPaused ? "none" : `socialProofProgress ${displayDuration}s linear forwards`,
            width: isPaused ? "100%" : undefined,
          }}
        />
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes socialProofPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes socialProofProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}

export default SocialProofNotifications;
