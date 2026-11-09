import { useEffect } from "react";

/**
 * Per-page SEO tags. Put one on every page component:
 *
 *   <Seo title="Pricing | Acme" description="Plans and pricing for Acme…" />
 *
 * Search engines and AI crawlers read the rendered <head>, so every route needs its OWN title and
 * description — otherwise every page shows up in search with the homepage's text.
 * It updates the tags already in <head> (including the ones in index.html) instead of adding
 * duplicates, so there is always exactly one of each.
 */
type SeoProps = {
  title: string;
  description?: string;
  /** Absolute URL of the share image (og:image). */
  image?: string;
  /** Keep this page out of search results (login, account, dashboard, checkout…). */
  noindex?: boolean;
};

function setMeta(attr: "name" | "property", key: string, content: string | undefined) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function Seo({ title, description, image, noindex }: SeoProps) {
  useEffect(() => {
    const url = window.location.origin + window.location.pathname;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", "website");
    if (image) setMeta("property", "og:image", image);
    setMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "robots", noindex ? "noindex" : undefined);
  }, [title, description, image, noindex]);
  return null;
}

export default Seo;
