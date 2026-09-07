/**
 * Look at the page, at the sizes a reader uses.
 *
 * A layout change verified by reading CSS is a layout change nobody has seen. Every
 * defect this found was invisible in the stylesheet and obvious in the browser: a grid
 * that filled its columns in source order so the copy took the wide one and lay back over
 * the mesh; cards that reported `display: grid` while inside a hidden parent; a socials
 * row pinned by a rule from another breakpoint; and `top: 88px` left on an element that
 * had stopped being absolutely positioned, which shifted it out of the box the layout had
 * reserved and let the next section start 88px early, on top of it.
 *
 * That last one is the general lesson: an offset outlives the positioning it belonged to,
 * and it stops placing the element and starts displacing it — silently, because nothing
 * else moves.
 *
 *   npm run build && npm run preview -- --port 5199 &
 *   node scripts/verify-layout.mjs
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const out = "/tmp/site-shots";
mkdirSync(out, { recursive: true });
const profile = mkdtempSync(join(tmpdir(), "t3rnel-shot-"));
const PORT = 9611;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = spawn("/usr/bin/brave-browser", [
  `--user-data-dir=${profile}`, `--remote-debugging-port=${PORT}`,
  "--no-first-run", "--no-default-browser-check", "--disable-background-networking",
  "--window-size=1440,900", "http://127.0.0.1:5199/",
], { stdio: "ignore", detached: true });

const stop = () => { try { process.kill(-browser.pid, "SIGKILL"); } catch {} try { rmSync(profile, { recursive: true, force: true }); } catch {} };
process.on("exit", stop);

async function cdp(url) {
  const socket = new WebSocket(url);
  await new Promise((ok, bad) => { socket.onopen = ok; socket.onerror = bad; });
  let id = 0; const pending = new Map();
  socket.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
  return { send: (method, params = {}) => new Promise((ok) => { const n = ++id; pending.set(n, ok); socket.send(JSON.stringify({ id: n, method, params })); }), close: () => socket.close() };
}

let target = null;
for (let i = 0; i < 40 && !target; i++) {
  await sleep(500);
  try { target = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === "page" && t.url.includes("5199")); } catch {}
}
if (!target) { console.log("no page target"); stop(); process.exit(1); }

const page = await cdp(target.webSocketDebuggerUrl);
await page.send("Page.enable");

for (const [name, width, height] of [["desktop", 1440, 900], ["laptop", 1180, 800], ["mobile", 390, 844]]) {
  await page.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 500 });
  await page.send("Page.navigate", { url: "http://127.0.0.1:5199/" });
  await sleep(2600);
  const shot = await page.send("Page.captureScreenshot", { format: "png" });
  writeFileSync(join(out, `${name}.png`), Buffer.from(shot.result.data, "base64"));

  const probe = await page.send("Runtime.evaluate", {
    expression: `(() => {
      const hero = document.querySelector('.constellation-hero');
      const copy = document.querySelector('.constellation-hero-content');
      const mesh = document.querySelector('.constellation');
      const cards = document.querySelector('.constellation-cards');
      const r = (el) => el ? el.getBoundingClientRect() : null;
      const c = r(copy), m = r(mesh);
      return JSON.stringify({
        heroCols: hero ? getComputedStyle(hero).gridTemplateColumns : null,
        copyRight: c ? Math.round(c.right) : null,
        meshLeft: m ? Math.round(m.left) : null,
        overlaps: c && m ? c.right > m.left + 1 : null,
        meshVisible: mesh ? getComputedStyle(mesh).display !== 'none' : null,
        cardsVisible: cards ? getComputedStyle(cards).display !== 'none' : null,
        cardCount: cards ? cards.children.length : 0,
        heroDisplay: (() => { const h = document.querySelector('.constellation-hero'); return h ? getComputedStyle(h).display : null; })(),
        heroChildren: [...(document.querySelector('.constellation-hero')?.children ?? [])].map((c) => ({ cls: c.className.toString().split(' ')[0], order: getComputedStyle(c).order, pos: getComputedStyle(c).position })),
        boxes: (() => {
          const g = (sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height) }; };
          const hero = document.querySelector('.constellation-hero'); const cs = hero ? getComputedStyle(hero) : null;
          return { hero: g('.constellation-hero'), heroPos: cs ? cs.position : null, heroDisp: cs ? cs.display : null, content: g('.constellation-hero-content'), contentPos: (() => { const e=document.querySelector('.constellation-hero-content'); const c=e?getComputedStyle(e):null; return c ? c.position + ' top:' + c.top + ' order:' + c.order : null; })(), socials: g('.constellation-socials'), cards: g('.constellation-cards'), mesh: g('.constellation') };
        })(),
        socials: (() => {
          const el = document.querySelector('.constellation-socials');
          if (!el) return null;
          const cs = getComputedStyle(el);
          const b = el.getBoundingClientRect();
          // Measure against the paragraph, not the column that contains both: a child is
          // always inside its parent's box, so comparing to the container reports an
          // overlap that is simply nesting.
          const para = document.querySelector('.constellation-hero-copy');
          const pb = para ? para.getBoundingClientRect() : null;
          return { position: cs.position, top: Math.round(b.top), paraBottom: pb ? Math.round(pb.bottom) : null,
                   overlapsCopy: pb ? b.top < pb.bottom - 1 : null };
        })(),
      });
    })()`, returnByValue: true,
  });
  console.log(name.padEnd(8), probe.result.result.value);
}
page.close();
stop();
