import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Facebook, Link2, Linkedin, Share2, Twitter, MessageCircle } from "lucide-react";
import routes from "../seo-routes.json";

const SITE = "https://t3ratech.co.zw";
const DEFAULT_IMAGE = `${SITE}/assets/t3ratech-tt-logo-visible.png`;

type RouteMeta = { title: string; description: string; keywords: string };
const ROUTE_META = routes as Record<string, RouteMeta>;

const FALLBACK: RouteMeta = ROUTE_META["/"];

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[pathname] ?? FALLBACK;
    const url = `${SITE}${pathname === "/" ? "/" : pathname}`;
    document.title = meta.title;
    upsertMeta("name", "description", meta.description);
    upsertMeta("name", "keywords", meta.keywords);
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", DEFAULT_IMAGE);
    upsertMeta("property", "og:image:secure_url", DEFAULT_IMAGE);
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);
    upsertMeta("name", "twitter:image", DEFAULT_IMAGE);
    upsertLink("canonical", url);
  }, [pathname]);

  return null;
}

export function ShareBar() {
  const { pathname } = useLocation();
  const [copied, setCopied] = useState(false);
  const meta = ROUTE_META[pathname] ?? FALLBACK;
  const url = `${SITE}${pathname === "/" ? "/" : pathname}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(meta.title);

  const targets = [
    {
      label: "Share on X",
      href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedText}`,
      Icon: Twitter,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: Facebook,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: Linkedin,
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      Icon: MessageCircle,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <div className="share-bar" aria-label="Share this page">
      <span className="share-bar-label">
        <Share2 size={15} strokeWidth={2.2} aria-hidden="true" />
        Share this page
      </span>
      {targets.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
          <Icon size={16} strokeWidth={2.1} />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" title="Copy link">
        <Link2 size={16} strokeWidth={2.1} />
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
