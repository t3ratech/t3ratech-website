import { useEffect } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const SITE = "https://sitesmith.t3ratech.co.zw";

export function Sitesmith() {
  useEffect(() => {
    document.title = "Sitesmith — Websites built before you pay | T3raTech";
  }, []);

  return (
    <section className="store-section page-section mcp-section" aria-labelledby="sitesmith-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">Websites and visibility</p>
          <h2 id="sitesmith-title">T3rnel Sitesmith</h2>
          <p className="technology-lead">Your new website, built before you pay a cent.</p>
          <p className="chrome-description">
            We study a business&apos;s current website, build a better one from the facts it already
            publishes, and show it privately. The owner decides after seeing it. Once they choose an
            option, the site is live on their own address within 3 working days, with the work that
            gets it found: directory listings, social pages, first posts and search registration.
          </p>
        </div>

        <div className="chrome-card mcp-card">
          <h3>How it works</h3>
          <ul className="chrome-feature-list">
            <li><Check size={18} strokeWidth={2.2} /> We read the business&apos;s site and check how it shows on Google, Google Maps and AI assistants.</li>
            <li><Check size={18} strokeWidth={2.2} /> We build the new site first, as a private preview hidden from search engines.</li>
            <li><Check size={18} strokeWidth={2.2} /> The owner replies with the option they want and pays the deposit on a WavePay checkout, or says no thanks and we delete it.</li>
            <li><Check size={18} strokeWidth={2.2} /> We launch on their address and run the Visibility Launch.</li>
          </ul>

          <h3>Options</h3>
          <ul className="chrome-feature-list">
            <li><Check size={18} strokeWidth={2.2} /> <strong>Essential</strong>: a professional site we keep up to date.</li>
            <li><Check size={18} strokeWidth={2.2} /> <strong>Self-Managed</strong>: the owner&apos;s team updates pages, people, news and photos.</li>
            <li><Check size={18} strokeWidth={2.2} /> <strong>Signature</strong>: the cinematic design, with photos and video the team manages.</li>
          </ul>
          <p className="chrome-description">
            US and UK prices start at $990; Zimbabwe has its own list. Payment by PayPal, USDT on BNB
            Smart Chain, or PayNow in Zimbabwe, always through WavePay.
          </p>

          <h3>Received a preview from us?</h3>
          <p className="chrome-description">
            Genuine emails come only from admin@t3ratech.co.zw. We never ask for passwords or bank
            details, and never ask you to pay anywhere but a WavePay checkout.{" "}
            <a className="text-link" href={`${SITE}/verify/`} target="_blank" rel="noreferrer">How to check</a>.
          </p>

          <p className="chrome-description">
            <a className="text-link" href={SITE} target="_blank" rel="noreferrer">
              Open sitesmith.t3ratech.co.zw <ArrowUpRight size={14} style={{ verticalAlign: "middle" }} />
            </a>{" "}
            ·{" "}
            <a className="text-link" href={`${SITE}/pricing/`} target="_blank" rel="noreferrer">Full pricing</a>
          </p>
        </div>
      </div>
    </section>
  );
}
