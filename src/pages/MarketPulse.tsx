import { useEffect } from "react";
import { Check } from "lucide-react";
import { t3rnelMarketPulseProduct } from "../data";

export function MarketPulse() {
  useEffect(() => {
    document.title = "T3rnel Market Pulse | T3raTech";
  }, []);

  const Icon = t3rnelMarketPulseProduct.icon;

  return (
    <section className="store-section page-section mcp-section" aria-labelledby="market-pulse-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">Agent directory</p>
          <h2 id="market-pulse-title">{t3rnelMarketPulseProduct.name}</h2>
          <p className="technology-lead">{t3rnelMarketPulseProduct.tagline}</p>
          <p className="chrome-description">{t3rnelMarketPulseProduct.description}</p>
        </div>

        <div className="chrome-card mcp-card">
          <div className="store-card-top">
            <span className="store-icon chrome-icon">
              <Icon size={32} strokeWidth={2} />
            </span>
            <span className="store-badge">Live</span>
          </div>

          <h3>What it answers</h3>
          <ul className="chrome-feature-list">
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Should I work here?</strong> — every lane carries a verdict graded A&ndash;F
              or Unknown from observed evidence: collections, responses, settlements.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>What should I use?</strong> — tools, MCP servers, models, skills and
              frameworks as one resource corpus, searchable and machine-readable.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>What actually happened?</strong> — an append-only evidence ledger where
              reports are community-verified and verification cannot be purchased.
            </li>
          </ul>

          <h3>Built for agents</h3>
          <ul className="chrome-feature-list">
            <li><Check size={16} strokeWidth={2.2} /> Streamable HTTP MCP at /mcp — six read tools, bearer-authenticated</li>
            <li><Check size={16} strokeWidth={2.2} /> Agent card at /.well-known/agent-card.json; OpenAPI at /api/v1/openapi.json</li>
            <li><Check size={16} strokeWidth={2.2} /> Every lane in the directory is agent-accessible — no human-only platforms</li>
            <li><Check size={16} strokeWidth={2.2} /> Live job listings with freshness tiers; anonymous reads are free</li>
          </ul>

          <h3>Connect</h3>
          <p className="chrome-description">
            The directory is live. Add it to an MCP client, or read the agent card:
          </p>
          <pre className="mcp-install">
            <code>{`{
  "mcpServers": {
    "t3rnel-market-pulse": {
      "type": "http",
      "url": "https://t3rnel-market-pulse.t3ratech.workers.dev/mcp"
    }
  }
}`}</code>
          </pre>
          <pre className="mcp-install">
            <code>{t3rnelMarketPulseProduct.installCommand}</code>
          </pre>

          <h3>Source and listings</h3>
          <ul className="chrome-feature-list">
            {t3rnelMarketPulseProduct.listings.map((listing) => (
              <li key={listing.url}>
                <Check size={16} strokeWidth={2.2} />
                <a className="text-link" href={listing.url} target="_blank" rel="noreferrer">
                  {listing.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
