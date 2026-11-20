import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: Record<string, unknown>;
  /** Private routes must not be indexed. */
  noindex?: boolean;
}

/**
 * SEO component — sets document title, meta tags, and JSON-LD structured data.
 * Works in React SPA without any external packages.
 */
export function SEO({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = "https://garnerfinancialpartners.com/og-image.png",
  ogType = "website",
  structuredData,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper to set meta tags
    const setMeta = (attr: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("name", "description", description);
    setMeta(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    if (keywords.length > 0) {
      setMeta("name", "keywords", keywords.join(", "));
    }

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", "Garner Financial Partners");

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // Canonical URL
    if (canonicalUrl) {
      setMeta("property", "og:url", canonicalUrl);
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalUrl);
    }

    // JSON-LD Structured Data
    if (structuredData) {
      const existingScript = document.querySelector('script[data-seo-jsonld]');
      if (existingScript) existingScript.remove();
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      const jsonLd = document.querySelector('script[data-seo-jsonld]');
      if (jsonLd) jsonLd.remove();
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, structuredData, noindex]);

  return null;
}

// Pre-built structured data helpers
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Garner Financial Partners",
    url: "https://garnerfinancialpartners.com",
    logo: "https://garnerfinancialpartners.com/og-image.png",
    description:
      "Financial education, strategic vision, and real implementation tools. Fortress Programs and U™ education portals for athletes, veterans, entrepreneurs, creators, and families.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boise",
      addressRegion: "ID",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-520-462-6447",
      contactType: "customer service",
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=276177995575935",
    ],
  };
}

export function courseSchema(name: string, description: string, url: string, provider = "Garner Financial Partners") {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: provider,
      url: "https://garnerfinancialpartners.com",
    },
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function webPageSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "Garner Financial Partners",
      url: "https://garnerfinancialpartners.com",
    },
  };
}
