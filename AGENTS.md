## Website verification

- Stack: React 18, React Router, TypeScript and Vite; no framework migration is needed for styling changes.
- Typecheck: `npm run lint`. Production build: `npm run build`. Integrity tests: `npm test`.
- Browser regression checks: start a local dev/preview server, then run `SITE_URL=http://127.0.0.1:5201 node scripts/verify-layout.mjs`. The script checks seven viewport sizes, all nine pages, navigation, keyboard interactions and themes using a single headless browser.
- Browser checks default to `/usr/bin/brave-browser`; override with `BROWSER_BIN`. Screenshots default to `/tmp/site-shots`; override with `SHOT_DIR`.
- This workstation is memory-constrained. Run build and browser checks sequentially; `NODE_OPTIONS=--max-old-space-size=256` works for this website's build and tests. Do not stop unrelated services or browsers.
- For visual changes, preserve the existing content in `src/data.ts`, `src/constellationData.ts` and page components, along with the existing light/dark palette.
