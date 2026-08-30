import { useEffect } from "react";
import { ArrowUpRight, Check, Target } from "lucide-react";
import { t3rnelIntelligenceProduct } from "../data";

export function T3rnelIntelligence() {
  useEffect(() => {
    document.title = "T3rnel Intelligence MCP | T3raTech";
  }, []);

  const Icon = t3rnelIntelligenceProduct.icon;

  return (
    <section className="store-section page-section mcp-section" aria-labelledby="t3rnel-intelligence-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">MCP server</p>
          <h2 id="t3rnel-intelligence-title">{t3rnelIntelligenceProduct.name}</h2>
          <p className="technology-lead">{t3rnelIntelligenceProduct.tagline}</p>
          <p className="chrome-description">{t3rnelIntelligenceProduct.description}</p>
        </div>

        <div className="chrome-card mcp-card">
          <div className="store-card-top">
            <span className="store-icon chrome-icon">
              <Icon size={32} strokeWidth={2} />
            </span>
            <span className="store-badge">MCP Server</span>
          </div>

          <h3>What it does</h3>
          <p className="chrome-description">
            T3rnel Intelligence MCP is a Cloudflare-hosted Streamable HTTP MCP server. An
            AI client supplies an ideal-customer profile and optional industry, country,
            company size, technologies, keywords, or buying signals; the server returns a
            small, evidence-backed set of company leads with fit scores, source links,
            confidence, and a recommended outreach angle.
          </p>
          <ul className="chrome-feature-list">
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>find_leads</strong> — discover and qualify up to five company prospects per call.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>research_company</strong> — research one named company and current buying signals.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>score_leads</strong> — apply an auditable 100-point ICP rubric.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>generate_report</strong> — return citation-preserving Markdown and JSON.
            </li>
          </ul>

          <h3>Free tier limits</h3>
          <ul className="chrome-feature-list">
            <li><Check size={16} strokeWidth={2.2} /> 3 find_leads calls per calendar month</li>
            <li><Check size={16} strokeWidth={2.2} /> 30 research_company, score_leads, and generate_report calls per calendar month</li>
            <li><Check size={16} strokeWidth={2.2} /> 1–5 leads returned per find_leads call</li>
          </ul>

          <h3>Configure</h3>
          <p className="chrome-description">
            The server is published as a remote Streamable HTTP MCP server. Add it to your MCP client:
          </p>
          <pre className="mcp-install">
            <code>{`{
  "mcpServers": {
    "t3rnel-intelligence": {
      "type": "http",
      "url": "https://YOUR_WORKER_HOST/mcp",
      "headers": {
        "Authorization": "Bearer \${T3RNEL_INTELLIGENCE_API_TOKEN}"
      }
    }
  }
}`}</code>
          </pre>

          <h3>How the research is grounded</h3>
          <p className="chrome-description">
            The server uses SerpApi and Tavily as its default search providers (Brave is optional).
            It deduplicates by company domain, ranks candidates with cheap evidence scoring, and
            qualifies a shortlist through Workers AI structured output. Every returned claim carries
            a source URL, provider, collection time, and confidence. Missing values stay empty.
          </p>

          <h3>Privacy and governance</h3>
          <p className="chrome-description">
            Bearer tokens, provider keys, raw IP addresses, and raw suppression values are not stored
            in D1, KV, logs, or model prompts. Lead records expire after 90 days. Authenticated users
            can suppress a company name, company domain, email, or profile URL and delete retained
            tenant data while preserving suppression hashes and deletion evidence.
          </p>

          <h3>Source and listings</h3>
          <p className="chrome-description">
            The server is part of the t3rnel repository and is source-available under its own
            proprietary licence.
          </p>
          <ul className="chrome-features">
            {t3rnelIntelligenceProduct.listings.map((listing) => (
              <li key={listing.url}>
                <Check size={16} strokeWidth={2.2} />
                <a href={listing.url} target="_blank" rel="noreferrer">{listing.label}</a>
              </li>
            ))}
          </ul>

          <a
            className="button store-button chrome-button"
            href={t3rnelIntelligenceProduct.url}
            target="_blank"
            rel="noreferrer"
          >
            View source
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </section>
  );
}
