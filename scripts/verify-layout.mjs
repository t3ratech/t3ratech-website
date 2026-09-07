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
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const out = process.env.SHOT_DIR || "/tmp/site-shots";
const base = process.env.SITE_URL || "http://127.0.0.1:5199";
mkdirSync(out, { recursive: true });
const profile = mkdtempSync(join(tmpdir(), "t3rnel-shot-"));
const PORT = 9611;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const errors = [];
const browser = spawn(process.env.BROWSER_BIN || "/usr/bin/brave-browser", [
  `--user-data-dir=${profile}`, `--remote-debugging-port=${PORT}`,
  "--headless=new", "--disable-gpu", "--renderer-process-limit=1",
  "--no-first-run", "--no-default-browser-check", "--disable-background-networking",
  "--window-size=1440,900", `${base}/`,
], { stdio: "ignore", detached: true });

const stop = () => { try { process.kill(-browser.pid, "SIGTERM"); } catch {} };
process.on("exit", stop);
browser.on("error", (error) => errors.push(error.message));

async function cdp(url) {
  const socket = new WebSocket(url);
  await new Promise((ok, bad) => { socket.onopen = ok; socket.onerror = bad; });
  let id = 0;
  const pending = new Map();
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.method === "Runtime.exceptionThrown") errors.push(JSON.stringify(message.params.exceptionDetails));
    if (!pending.has(message.id)) return;
    const { resolve, reject, timer } = pending.get(message.id);
    clearTimeout(timer);
    pending.delete(message.id);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  };
  return {
    send: (method, params = {}) => new Promise((resolve, reject) => {
      const n = ++id;
      const timer = setTimeout(() => { pending.delete(n); reject(new Error(`CDP timeout: ${method}`)); }, 15000);
      pending.set(n, { resolve, reject, timer });
      socket.send(JSON.stringify({ id: n, method, params }));
    }),
    close: () => socket.close(),
  };
}

let page;
try {
  let target;
  for (let i = 0; i < 40 && !target; i++) {
    await sleep(250);
    try { target = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === "page" && t.url.startsWith(base)); } catch {}
  }
  assert.ok(target, `Browser did not open ${base}: ${errors.join("; ")}`);
  page = await cdp(target.webSocketDebuggerUrl);
  await page.send("Page.enable");
  await page.send("Runtime.enable");
  const evaluate = async (expression) => {
    const result = await page.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const waitFor = async (expression) => {
    for (let i = 0; i < 300; i++) {
      if (await evaluate(expression)) return;
      await sleep(100);
    }
    assert.fail(`Page did not become ready: ${expression}; ${await evaluate("JSON.stringify({url:location.href,state:document.readyState,body:document.body?.innerText.slice(0,500)})")}; ${errors.join("; ")}`);
  };
  const navigate = async (path = "/") => {
    await page.send("Page.navigate", { url: `${base}${path}` });
    await waitFor(`document.querySelector('main')?.children.length > 0 && location.pathname === ${JSON.stringify(path)}`);
    await evaluate("document.fonts.ready.then(() => true)");
    await sleep(120);
  };
  const shot = async (name, fullPage = false) => {
    const params = { format: "png", captureBeyondViewport: fullPage };
    if (fullPage) {
      const { cssContentSize } = await page.send("Page.getLayoutMetrics");
      params.clip = { x: 0, y: 0, width: cssContentSize.width, height: cssContentSize.height, scale: 1 };
    }
    const result = await page.send("Page.captureScreenshot", params);
    writeFileSync(join(out, `${name}.png`), Buffer.from(result.data, "base64"));
  };
  const key = async (key, code = key, modifiers = 0) => {
    const windowsVirtualKeyCode = { Tab: 9, Enter: 13, Escape: 27, " ": 32 }[key];
    await page.send("Input.dispatchKeyEvent", {
      type: "keyDown", key, code, modifiers, windowsVirtualKeyCode,
      text: key === "Enter" ? "\r" : key === " " ? " " : undefined,
    });
    await page.send("Input.dispatchKeyEvent", { type: "keyUp", key, code, modifiers, windowsVirtualKeyCode });
    await sleep(50);
  };
  const click = async (selector) => {
    const point = await evaluate(`(() => { const e = document.querySelector(${JSON.stringify(selector)}); e.scrollIntoView({block:'nearest'}); const r=e.getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`);
    await page.send("Input.dispatchMouseEvent", { type: "mousePressed", ...point, button: "left", clickCount: 1 });
    await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", ...point, button: "left", clickCount: 1 });
    await sleep(80);
  };
  const overflow = () => evaluate("document.documentElement.scrollWidth > innerWidth + 1");
  const routes = ["/extensions", "/mcp", "/t3rnel-intelligence", "/document-intelligence", "/skills", "/nfts", "/gumroad", "/whatsapp-groups"];

  for (const [name, width, height] of [
    ["desktop", 1440, 900], ["laptop", 1180, 800], ["tablet-landscape", 1024, 768],
    ["tablet", 768, 1024], ["mobile", 390, 844], ["small-mobile", 320, 640], ["phone-landscape", 844, 390],
  ]) {
    await page.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
    await navigate();
    assert.equal(await overflow(), false, `${name}: horizontal page overflow`);
    const layout = await evaluate(`(() => {
      const r = (s) => document.querySelector(s).getBoundingClientRect();
      const copy = r('.constellation-hero-content'), mesh = r('.constellation'), hero = r('.constellation-hero');
      const cards = r('.constellation-cards'), socials = r('.constellation-socials');
      // Measure against the paragraph, not the column that contains both: a child is
      // always inside its parent's box, so comparing to the container reports an
      // overlap that is simply nesting.
      const paragraph = r('.constellation-hero-copy');
      return { separate: innerWidth > 900 ? copy.right <= mesh.left + 1 : copy.bottom <= mesh.top + 1,
        socialsClear: socials.top >= paragraph.bottom, contained: hero.bottom >= mesh.bottom,
        cardsVisible: cards.height > 0, cardCount: document.querySelectorAll('.constellation-card').length,
        menuVisible: r('.menu-toggle').width > 0,
        headerFits: r('.brand').right < r('.header-actions').left,
        headerClear: r('.constellation-hero-content .kicker').top >= r('.site-header').bottom };
    })()`);
    assert.ok(layout.separate && layout.socialsClear && layout.contained && layout.headerFits && layout.headerClear, `${name}: ${JSON.stringify(layout)}`);
    assert.equal(layout.cardsVisible, width <= 900, `${name}: wrong constellation mode`);
    assert.equal(layout.cardCount, 6);
    assert.equal(layout.menuVisible, width < 1080, `${name}: wrong navigation mode`);
    await shot(name);
    if (name === "desktop" || name === "mobile") await shot(`${name}-full`, true);

    if (width < 1080) {
      await click(".menu-toggle");
      assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "true");
      assert.equal(await evaluate("document.querySelector('main').inert && document.querySelector('footer').inert"), true);
      await click(".nav-dropdown > button");
      assert.equal(await evaluate("document.querySelector('#product-navigation').hidden"), false);
      await shot(`${name}-menu`);
      await evaluate("document.querySelector('.menu-toggle').focus()");
      await key("Tab");
      assert.equal(await evaluate("document.activeElement.classList.contains('brand')"), true, `${name}: forward focus wrap`);
      await key("Tab", "Tab", 8);
      assert.equal(await evaluate("document.activeElement.classList.contains('menu-toggle')"), true, `${name}: backward focus wrap`);
      await key("Escape");
      assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "false");
      assert.equal(await evaluate("document.querySelector('main').inert || document.querySelector('footer').inert"), false);
      assert.equal(await evaluate("document.activeElement.classList.contains('menu-toggle')"), true);
      await click(".menu-toggle");
      await click(".nav-dropdown > button");
      await click('#product-navigation a[href="/mcp"]');
      await waitFor("location.pathname === '/mcp'");
      assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "false");
      assert.equal(await evaluate("document.documentElement.style.overflow"), "");
      await navigate();
    } else {
      await click(".nav-dropdown > button");
      await shot(`${name}-menu`);
      await key("Escape");
      assert.equal(await evaluate("document.activeElement === document.querySelector('.nav-dropdown > button')"), true);
      assert.equal(await evaluate("document.querySelector('#product-navigation').hidden"), true);
      await key("Enter");
      assert.equal(await evaluate("document.querySelector('#product-navigation').hidden"), false, "Enter opens product navigation");
      await key("Tab");
      assert.equal(await evaluate("document.activeElement.closest('#product-navigation') !== null"), true,
        await evaluate("JSON.stringify({active:document.activeElement.outerHTML, hidden:document.querySelector('#product-navigation').hidden})"));
      await key("Escape");
      await click(".nav-dropdown > button");
      await click(".constellation-hero-content h1");
      assert.equal(await evaluate("document.querySelector('#product-navigation').hidden"), true, "outside click dismisses dropdown");
    }

    if (width > 900) {
      const hoverPoint = await evaluate("(() => { document.activeElement.blur(); const r=document.querySelector('#trigger-t3rnel-browser').getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()");
      await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", ...hoverPoint });
      await waitFor("document.querySelector('#popup-t3rnel-browser') !== null");
      const popupPoint = await evaluate("(() => { const r=document.querySelector('#popup-t3rnel-browser').getBoundingClientRect(); return {x:r.left+8,y:r.top+r.height/2}; })()");
      await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", ...popupPoint });
      assert.equal(await evaluate("document.querySelector('#popup-t3rnel-browser') !== null"), true, "hover popup remains reachable");
      await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 100, y: 100 });
      await waitFor("document.querySelector('.node-popup') === null");
      for (const id of ["t3rnel-browser", "mcp-bridge", "document-intelligence", "whatsapp", "gumroad", "nfts"]) {
        await evaluate(`document.querySelector('#trigger-${id}').focus()`);
        await key("Enter");
        assert.equal(await evaluate(`document.querySelector('#trigger-${id}').getAttribute('aria-expanded')`), "true");
        await waitFor(`document.querySelector('.robot-sentinel text').textContent === document.querySelector('#trigger-${id}').innerText.trim().toUpperCase().slice(0,20)`);
        const contained = await evaluate(`(() => { const p=document.querySelector('#popup-${id}').getBoundingClientRect(); const c=document.querySelector('.constellation-hero-content').getBoundingClientRect(); return p.left >= c.right - 1 && p.right <= innerWidth && p.top >= 72 && p.bottom <= innerHeight; })()`);
        if (id === "t3rnel-browser" || !contained) await shot(`${name}-popup`);
        assert.equal(contained, true, `${name}: ${id} popup overlaps copy or viewport`);
        await key("Tab");
        assert.equal(await evaluate("document.activeElement.closest('.node-popup') !== null"), true);
        await key("Escape");
        assert.equal(await evaluate("document.querySelector('.node-popup') === null"), true);
      }
    }
    for (const route of routes) {
      await navigate(route);
      assert.equal(await overflow(), false, `${name}: ${route} overflows horizontally`);
      assert.equal(await evaluate("document.querySelectorAll('main h2').length > 0"), true, `${name}: ${route} failed to render`);
      if (["desktop", "mobile"].includes(name) && ["/extensions", "/mcp", "/nfts"].includes(route)) {
        await shot(`${name}${route.replaceAll("/", "-")}`);
      }
    }
    console.log(`${name}: homepage, menu, keyboard, ${routes.length} routes OK`);
  }

  await page.send("Emulation.setDeviceMetricsOverride", { width: 1024, height: 768, deviceScaleFactor: 1, mobile: true });
  await page.send("Emulation.setTouchEmulationEnabled", { enabled: true });
  await navigate();
  const touchPoint = await evaluate("(() => { const r=document.querySelector('#trigger-t3rnel-browser').getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()");
  for (const expanded of ["true", "false"]) {
    await page.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [touchPoint] });
    await page.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await waitFor(`document.querySelector('#trigger-t3rnel-browser').getAttribute('aria-expanded') === '${expanded}'`);
  }
  await page.send("Emulation.setTouchEmulationEnabled", { enabled: false });
  console.log("Tablet touch: tap to open and close constellation popup OK");
  await page.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await navigate();
  for (const mode of ["Dark", "Light", "Auto"]) {
    await click(`button[aria-label="${mode} mode"]`);
    assert.equal(await evaluate(`document.querySelector('button[aria-label="${mode} mode"]').getAttribute('aria-pressed')`), "true");
    if (mode !== "Auto") {
      assert.equal(await evaluate("document.documentElement.dataset.theme"), mode.toLowerCase());
      await navigate();
      assert.equal(await evaluate("document.documentElement.dataset.theme"), mode.toLowerCase());
      await shot(`${mode.toLowerCase()}-full`, true);
    }
  }
  await page.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  assert.equal(await evaluate("getComputedStyle(document.documentElement).scrollBehavior"), "auto");
  await shot("reduced-motion");
  await page.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await click(".menu-toggle");
  await page.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await waitFor("!document.querySelector('main').inert");
  assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "false", "resize closes mobile menu");
  assert.equal(await evaluate("document.querySelector('#primary-navigation').hidden"), false);
  assert.deepEqual(errors, [], "browser runtime errors");
  console.log(`Theme persistence, reduced motion, resize cleanup OK. Screenshots: ${out}`);
} finally {
  page?.close();
  stop();
  await sleep(250);
  rmSync(profile, { recursive: true, force: true });
  process.removeListener("exit", stop);
}
