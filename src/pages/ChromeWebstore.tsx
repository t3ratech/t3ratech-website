import { useEffect } from "react";
import { ArrowUpRight, Check, Globe2 } from "lucide-react";
import { chromeProduct } from "../data";

export function ChromeWebstore() {
  useEffect(() => {
    document.title = "Chrome Webstore | T3rnel Browser";
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
            <span className="store-badge">Chrome Extension</span>
          </div>

          <h3>What you get</h3>
          <p className="chrome-description">
            T3rnel Browser is a Chrome extension with 84 tools and no backend servers. It gives you developer tools
            you can talk to, and an agent runway you can trust.
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
            Everything it saves is stored locally in your browser. Payment goes through PayNow; we never see payment details.
          </p>

          <div className="chrome-actions">
            <a
              className="button store-button chrome-button"
              href={chromeProduct.url}
              target="_blank"
              rel="noreferrer"
            >
              Install from Chrome Webstore
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </a>
            <a
              className="button chrome-button-secondary"
              href="https://t3ratech.github.io/t3rnel-browser-plugin/"
              target="_blank"
              rel="noreferrer"
            >
              <Globe2 size={16} strokeWidth={2.2} />
              Product site
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
