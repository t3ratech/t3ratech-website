import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Bot, Check } from "lucide-react";
import { chromeProduct, mcpProduct } from "../data";

export function ChromeWebstore() {
  useEffect(() => {
    document.title = "Install | T3rnel Browser";
  }, []);

  const Icon = chromeProduct.icon;

  return (
    <section className="store-section page-section chrome-section" aria-labelledby="chrome-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">Browser tools</p>
          <h2 id="chrome-title">T3rnel Browser</h2>
          <p className="technology-lead">{chromeProduct.tagline}</p>
          <p className="chrome-description">{chromeProduct.description}</p>
        </div>

        <div className="chrome-card">
          <div className="store-card-top">
            <span className="store-icon chrome-icon">
              <Icon size={32} strokeWidth={2} />
            </span>
            <span className="store-badge">Browser Extension</span>
          </div>

          <h3>What you get</h3>
          <p className="chrome-description">
            T3rnel Browser is a browser extension with 102 tools and no backend servers. It installs on Chrome, Brave, Edge and Chromium from one package; Firefox and Opera are partly supported. It gives you developer tools
            you can talk to, and an agent runway you can trust. Pair it with the{" "}
            <a href={mcpProduct.url} target="_blank" rel="noreferrer">
              free MCP Session Bridge
            </a>{" "}
            and any MCP client can drive the browser you are already signed into.
          </p>

          <ul className="chrome-feature-list">
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>CSS inspection</strong> — hover any element and get real, clean, copyable CSS with the units the author actually wrote.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Full-page screenshots</strong> — one click, the whole page, stitched, with sticky headers and lazy loading handled.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Markdown viewer</strong> — read .md files as documents, including the ones your agent just wrote.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Form filler</strong> — seed a form with plausible values in one call and still be able to submit it.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Colour picker</strong> — sample the rendered pixel anywhere and build palettes.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Cache tools</strong> — clear site data and hard-reload with cache bypass.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>React inspector</strong> — walk the real component tree on React pages.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Page audit and link checking</strong> — accessibility, spelling, and broken-link reports, including what could not be checked.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Record, replay and code export</strong> — click through a flow once, then get Playwright codegen you can run in CI without the extension.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Agent safety</strong> — a valve between a language model and your logged-in browser: credentials redacted, high-risk actions ask first, and a timeline you can scrub backwards.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Encrypted identity vault</strong> — per-site credentials, encrypted on your device, never written in the clear.
            </li>
          </ul>

          <h3>How it compares</h3>
          <p className="chrome-description">
            T3rnel does not beat free Google and Microsoft tools on price. It beats them on three things: a human
            can watch and stop what happens, credentials do not leak into a context window, and the agent does not
            have to re-authenticate into a fresh browser because it is already in yours. If you just need throwaway
            browser automation, Playwright MCP is excellent and free.
          </p>

          <h3>Pricing</h3>
          <div className="chrome-pricing-row">
            <div className="chrome-pricing-tier">
              <h4>Free</h4>
              <p className="chrome-price">$0</p>
              <p className="chrome-description">No account, no time limit, no nag. Genuinely useful forever.</p>
            </div>
            <div className="chrome-pricing-tier chrome-pricing-pro">
              <h4>Pro</h4>
              <p className="chrome-price">$29.99 once</p>
              <p className="chrome-description">Three activations. Licensed forever, no subscription. Every tool is in the shipped build.</p>
            </div>
          </div>

          <h3>Privacy</h3>
          <p className="chrome-description">
            The extension collects nothing: no account, no analytics, no telemetry, no error reporting, no tracking.
            Everything it saves is stored locally in your browser. Payment goes through PayNow — Visa, Mastercard, ZimSwitch, EcoCash, OneMoney, Telecash, InnBucks and O’mari — handled by T3rnel WavePay, our own gateway; we never see payment details.
          </p>

          <div className="chrome-actions">
            <a
              className="button store-button chrome-button"
              href={chromeProduct.url}
              target="_blank"
              rel="noreferrer"
            >
              Install from product site
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </a>
            {/* A second button to the same address is not a second choice. This one goes
                to the manual, which is what someone deciding whether to install wants. */}
            <a
              className="button chrome-button-secondary"
              href="https://t3ratech.github.io/t3rnel-browser-plugin/manual.html"
              target="_blank"
              rel="noreferrer"
            >
              <BookOpen size={16} strokeWidth={2.2} />
              Read the manual
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </a>
            {/* An in-app route, so it navigates rather than reloading the whole bundle. */}
            <Link className="button chrome-button-secondary" to="/mcp">
              <Bot size={16} strokeWidth={2.2} />
              MCP Session Bridge
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
