import { useEffect } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { wavepayProduct } from "../data";

export function WavePay() {
  useEffect(() => {
    document.title = "WavePay — Merchant payments | T3raTech";
  }, []);

  const Icon = wavepayProduct.icon;

  return (
    <section className="store-section page-section mcp-section" aria-labelledby="wavepay-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">Payment gateway</p>
          <h2 id="wavepay-title">{wavepayProduct.name}</h2>
          <p className="technology-lead">{wavepayProduct.tagline}</p>
          <p className="chrome-description">{wavepayProduct.description}</p>
        </div>

        <div className="chrome-card mcp-card">
          <div className="store-card-top">
            <span className="store-icon chrome-icon">
              <Icon size={32} strokeWidth={2} />
            </span>
            <span className="store-badge">Live</span>
          </div>

          <h3>What it settles</h3>
          <ul className="chrome-feature-list">
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>PayNow</strong> — EcoCash, OneMoney, InnBucks, ZimSwitch and cards on the
              rail Zimbabwe actually uses.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>PayPal</strong> — Visa, Mastercard, Amex and PayPal balance for buyers
              outside the local rails.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Crypto</strong> — wallet destinations recorded per merchant for BTC,
              ETH and USDT payout lanes.
            </li>
          </ul>

          <h3>For the merchant</h3>
          <ul className="chrome-feature-list">
            <li>
              <Check size={18} strokeWidth={2.2} />
              Self-serve registration and an <code>mk_live_</code> key — no waiting for a manual review.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              Merchant portal: keys, sites, signed webhooks, payout wallets, usage and a
              payments ledger.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              Tiered by volume — Free (25 payments/mo), Basic (250), Pro (2,500) — upgrade
              through the same gateway.
            </li>
          </ul>

          <h3>For the agent</h3>
          <ul className="chrome-feature-list">
            <li><Check size={16} strokeWidth={2.2} /> Streamable HTTP MCP at /mcp — register, key, checkout, poll, as tools</li>
            <li><Check size={16} strokeWidth={2.2} /> Agent-readable <a className="text-link" href="https://wavepay.t3ratech.co.zw/skill.md" target="_blank" rel="noreferrer">skill.md</a> and <code>llms.txt</code> on the public site</li>
            <li><Check size={16} strokeWidth={2.2} /> Published to the official MCP registry as <code>io.github.t3ratech/wavepay</code></li>
          </ul>

          <h3>Connect</h3>
          <pre className="mcp-install">
            <code>{`{
  "mcpServers": {
    "wavepay": {
      "type": "http",
      "url": "https://wavepay.t3ratech.co.zw/mcp"
    }
  }
}`}</code>
          </pre>

          <h3>Source and listings</h3>
          <ul className="chrome-feature-list">
            {wavepayProduct.listings.map((listing) => (
              <li key={listing.url}>
                <Check size={16} strokeWidth={2.2} />
                <a className="text-link" href={listing.url} target="_blank" rel="noreferrer">
                  {listing.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="chrome-description">
            <a className="text-link" href={wavepayProduct.url} target="_blank" rel="noreferrer">
              Open wavepay.t3ratech.co.zw <ArrowUpRight size={14} style={{ verticalAlign: "middle" }} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
