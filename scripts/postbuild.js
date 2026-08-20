import { copyFileSync, existsSync } from "node:fs";
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
