/**
 * VslTracker — Drop into any VSL page to fire tracking events.
 *
 * Usage: <VslTracker page="ffp" />
 *
 * What it does:
 * 1. Fires Meta Pixel `ViewContent` with the specific VSL name
 * 2. Fires GA4 `view_vsl_page` event
 * 3. Logs the page view to Convex `vslPageViews` table
 * 4. Reads UTM params from URL to track attribution
 * 5. If email is in URL (from click tracking redirect), links the visit to the contact
 */
import { useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    GFP?: { track?: (event: string, data?: Record<string, unknown>) => void };
  }
}

const VSL_NAMES: Record<string, string> = {
  afp: "Athlete Fortress Program™",
  bfp: "Business Fortress Program™",
  cfp: "Christian Fortress Program™",
  ffp: "Family Fortress Program™",
  ifp: "Influencer Fortress Program™",
  mfp: "Military Fortress Program™",
  refp: "Real Estate Fortress Program™",
};

export function VslTracker({ page }: { page: string }) {
  const logPageView = useMutation(api.clickTracking.logPageView);
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source") || undefined;
    const utmMedium = params.get("utm_medium") || undefined;
    const utmCampaign = params.get("utm_campaign") || undefined;
    const utmContent = params.get("utm_content") || undefined;
    const emailFromUrl = params.get("e") || undefined;

    const productName = VSL_NAMES[page] || page.toUpperCase();

    // 1. Meta Pixel: ViewContent
    if (window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: productName,
        content_category: "VSL Page",
        content_ids: [page],
        content_type: "product",
      });
    }

    // 2. GA4 custom event
    if (window.gtag) {
      window.gtag("event", "view_vsl_page", {
        vsl_page: page,
        product_name: productName,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      });
    }

    // 3. GFP tracking layer
    if (window.GFP?.track) {
      window.GFP.track("vsl_page_view", {
        page,
        product: productName,
      });
    }

    // 4. Log to Convex
    logPageView({
      page,
      referrer: document.referrer || undefined,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      email: emailFromUrl,
    }).catch(() => { /* silent */ });
  }, [page, logPageView]);

  return null; // renders nothing
}
