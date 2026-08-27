/**
 * The site builds, and every link in it goes somewhere.
 *
 * `src/Layout.tsx` was deleted while `src/App.tsx` still imported it, and the whole site
 * stopped building — `Cannot find module './Layout'`. Nothing here ran before a person
 * tried the build by hand, so the first report of it was a broken deploy.
 *
 * These cases are the cheap guards for that class of failure: a module that is imported
 * and not there, a route that renders a component nobody imported, and an internal link
 * that points at a path the router does not serve. Each one fails the moment the mistake
 * is made rather than at deploy time, and none of them needs a browser or a DOM.
 */
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const srcDir = path.join(root, "src");

/** Every source file under `src`, recursively. */
function sourceFiles(dir = srcDir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...sourceFiles(full));
    else if (/\.(tsx?|jsx?)$/.test(entry)) out.push(full);
  }
  return out;
}

/** The file a relative specifier resolves to, or null when nothing is there. */
function resolveRelative(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    base,
    `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.jsx`, `${base}.json`,
    path.join(base, "index.ts"), path.join(base, "index.tsx"),
    path.join(base, "index.js"), path.join(base, "index.jsx"),
  ];
  return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile()) ?? null;
}

describe("the site's own modules", () => {
  test("every relative import resolves to a file that exists", () => {
    const missing = [];
    for (const file of sourceFiles()) {
      const text = readFileSync(file, "utf8");
      const specifiers = [
        ...text.matchAll(/(?:import|export)[^"']*?from\s*["'](\.[^"']+)["']/g),
        ...text.matchAll(/import\s*\(\s*["'](\.[^"']+)["']\s*\)/g),
        ...text.matchAll(/^\s*import\s+["'](\.[^"']+)["']/gm),
      ].map((match) => match[1]);

      for (const specifier of specifiers) {
        if (resolveRelative(file, specifier)) continue;
        missing.push(`${path.relative(root, file)} imports "${specifier}", which is not on disk`);
      }
    }
    assert.deepEqual(missing, [], missing.join("\n"));
  });
});

describe("routes and links", () => {
  const appPath = path.join(srcDir, "App.tsx");
  const app = readFileSync(appPath, "utf8");

  /** Every component named in a `element={<Name />}` position. */
  const routed = [...app.matchAll(/element=\{<([A-Z][A-Za-z0-9_]*)\s*\/?>/g)].map((m) => m[1]);
  /** Every route path the router declares, normalised to a leading slash. */
  const declared = new Set(
    [...app.matchAll(/<Route\s+path="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((p) => p !== "*")
      .map((p) => (p.startsWith("/") ? p : `/${p}`))
  );
  declared.add("/");

  test("every routed component is imported", () => {
    const imported = new Set(
      [...app.matchAll(/import\s*\{([^}]+)\}\s*from/g)]
        .flatMap((m) => m[1].split(",").map((name) => name.trim().split(/\s+as\s+/).pop()))
    );
    const orphans = routed.filter((name) => !imported.has(name));
    assert.deepEqual(orphans, [], `routed but never imported: ${orphans.join(", ")}`);
  });

  test("the router declares more than one page", () => {
    // A guard against a regex that silently stops matching after a refactor.
    assert.ok(declared.size > 2, `only found routes: ${[...declared].join(", ")}`);
    assert.ok(routed.length > 2, `only found routed components: ${routed.join(", ")}`);
  });

  test("every internal link points at a route the router serves", () => {
    const broken = [];
    for (const file of sourceFiles()) {
      const text = readFileSync(file, "utf8");
      const internal = [
        ...text.matchAll(/\bto="(\/[^"#?]*)"/g),
        // A raw `href` to an internal path reloads the whole bundle instead of routing,
        // and on a static host it only works because of a 404 fallback. Both are caught.
        ...text.matchAll(/\bhref="(\/[^"#?]*)"/g),
      ].map((m) => m[1]);

      for (const link of internal) {
        const normalised = link.length > 1 && link.endsWith("/") ? link.slice(0, -1) : link;
        if (declared.has(normalised)) continue;
        broken.push(`${path.relative(root, file)} links to "${link}", which is not a route`);
      }
    }
    assert.deepEqual(broken, [], broken.join("\n"));
  });
});

describe("the client list is stated once", () => {
  test("no file hand-types the MCP client list beside the shared constant", () => {
    const data = readFileSync(path.join(srcDir, "data.ts"), "utf8");
    assert.match(data, /export const SUPPORTED_MCP_CLIENTS/, "data.ts must own the list");

    // The names drift the moment two copies exist, and a stale client list on a product
    // page is the metadata inconsistency a store flags.
    const offenders = sourceFiles()
      .filter((file) => path.basename(file) !== "data.ts")
      .filter((file) => /Claude Code\/Desktop, Cursor/.test(readFileSync(file, "utf8")))
      .map((file) => path.relative(root, file));
    assert.deepEqual(offenders, [], `hand-typed copies of the client list: ${offenders.join(", ")}`);
  });
});
