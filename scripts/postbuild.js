import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
const index = join(dist, "index.html");
const notFound = join(dist, "404.html");

if (!existsSync(index)) {
  console.error("[postbuild] dist/index.html not found");
  process.exit(1);
}

copyFileSync(index, notFound);
console.log("[postbuild] dist/404.html created for SPA/GitHub Pages fallback");

// Prerender per-route meta: GitHub Pages serves dist/<route>/index.html for
// clean URLs, so each public page gets crawler-visible title, description,
// canonical and social tags instead of the shared SPA defaults.
const SITE = "https://t3ratech.co.zw";
const IMAGE = `${SITE}/assets/t3ratech-tt-logo-visible.png`;
const routes = JSON.parse(readFileSync(join(process.cwd(), "seo-routes.json"), "utf8"));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function setTag(html, attr, key, content) {
  const re = new RegExp(`<meta\\s+${attr}="${key}"[^>]*content="[^"]*"[^>]*/?>`, "i");
  const tag = `<meta ${attr}="${key}" content="${esc(content)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

const base = readFileSync(index, "utf8");
let count = 0;
for (const [route, meta] of Object.entries(routes)) {
  if (route === "/") continue; // dist/index.html already carries home meta
  const url = `${SITE}${route}`;
  let html = base;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${esc(url)}" />`);
  html = setTag(html, "name", "description", meta.description);
  html = setTag(html, "name", "keywords", meta.keywords);
  html = setTag(html, "property", "og:title", meta.title);
  html = setTag(html, "property", "og:description", meta.description);
  html = setTag(html, "property", "og:url", url);
  html = setTag(html, "property", "og:image", IMAGE);
  html = setTag(html, "property", "og:image:secure_url", IMAGE);
  html = setTag(html, "name", "twitter:title", meta.title);
  html = setTag(html, "name", "twitter:description", meta.description);
  html = setTag(html, "name", "twitter:image", IMAGE);
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  count++;
}
console.log(`[postbuild] prerendered meta for ${count} routes`);
