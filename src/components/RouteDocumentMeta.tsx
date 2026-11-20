import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEO } from "./SEO";
import { metaForPath } from "../lib/routeMeta";

const INDEXABLE = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

function setNamedMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

/**
 * Fills document title, description, canonical, and robots for routes.
 * Pages that render their own <SEO> run later and keep their more specific tags.
 */
export function RouteDocumentMeta() {
  const { pathname } = useLocation();
  const meta = metaForPath(pathname);

  useEffect(() => {
    if (meta) return;
    const path = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
    setNamedMeta("robots", INDEXABLE);
    setCanonical(`https://garnerfinancialpartners.com${path === "/" ? "/" : path}`);
  }, [meta, pathname]);

  if (!meta) return null;

  return (
    <SEO
      title={meta.title}
      description={meta.description}
      canonicalUrl={meta.canonical}
      noindex={meta.noindex}
    />
  );
}
