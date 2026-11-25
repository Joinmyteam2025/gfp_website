type Fbq = (event: string, name: string, params?: Record<string, unknown>) => void;

function readFbq(): Fbq | null {
  if (typeof window === "undefined") return null;
  const fbq = (window as Window & { fbq?: unknown }).fbq;
  if (typeof fbq !== "function") return null;
  return fbq as Fbq;
}

/**
 * Standard Meta Lead, plus the existing FreeAccessOptIn custom event on
 * free-access opt-ins. Both calls are no-ops when the pixel is absent.
 */
export function trackFunnelLead(
  contentName: string,
  options?: { freeAccess?: boolean },
) {
  const fbq = readFbq();
  if (!fbq) return;
  if (options?.freeAccess) {
    try {
      fbq("trackCustom", "FreeAccessOptIn");
    } catch {
      /* pixel blocked */
    }
  }
  try {
    fbq("track", "Lead", {
      content_name: contentName,
      content_category: "Bundle Offer",
    });
  } catch {
    /* pixel blocked */
  }
}
