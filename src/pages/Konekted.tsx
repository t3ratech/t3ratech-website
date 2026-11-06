import { useEffect } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const SITE = "https://konekted.t3ratech.co.zw";

export function Konekted() {
  useEffect(() => {
    document.title = "Konekted — Zimbabwe's super-app | T3raTech";
  }, []);

  return (
    <section className="store-section page-section mcp-section" aria-labelledby="konekted-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">Marketplace and services</p>
          <h2 id="konekted-title">Konekted</h2>
          <p className="technology-lead">Zimbabwe&apos;s super-app: find a service, compare bids, browse what is for sale.</p>
          <p className="chrome-description">
            Konekted puts on-demand services, jobs, deliveries, property, vehicles, gadgets, shop products,
            events, a business directory and classifieds in one place. It reaches people through a public
            website, Flutter apps for customers and providers, an administration console and an official
            WhatsApp Business channel, all running on one Rust platform on Cloudflare Workers.
          </p>
        </div>

        <div className="chrome-card mcp-card">
          <h3>What you can do</h3>
          <ul className="chrome-feature-list">
            <li><Check size={18} strokeWidth={2.2} /> Request a service and compare the bids providers send, then accept the one you want.</li>
            <li><Check size={18} strokeWidth={2.2} /> Browse news, jobs, events, the business directory, classifieds, property, shop products and vehicles, each searchable by category, place and price.</li>
            <li><Check size={18} strokeWidth={2.2} /> Providers set up a profile, bid on open jobs, complete them and collect ratings.</li>
            <li><Check size={18} strokeWidth={2.2} /> Use the same menus from WhatsApp or USSD, with no data needed for USSD.</li>
          </ul>

          <h3>Built on</h3>
          <ul className="chrome-feature-list">
            <li><Check size={18} strokeWidth={2.2} /> Rust Workers over a shared domain model, with Neon PostgreSQL for the data.</li>
            <li><Check size={18} strokeWidth={2.2} /> Payments through <a className="text-link" href="/wavepay">WavePay</a>.</li>
            <li><Check size={18} strokeWidth={2.2} /> Places shown as suburb and city or town, never as coordinates.</li>
          </ul>

          <p className="chrome-description">
            <a className="text-link" href={SITE} target="_blank" rel="noreferrer">
              Open konekted.t3ratech.co.zw <ArrowUpRight size={14} style={{ verticalAlign: "middle" }} />
            </a>{" "}
            ·{" "}
            <a className="text-link" href={`${SITE}/services`} target="_blank" rel="noreferrer">Services</a>
            {" "}·{" "}
            <a className="text-link" href={`${SITE}/developers`} target="_blank" rel="noreferrer">For developers and agents</a>
          </p>
        </div>
      </div>
    </section>
  );
}
