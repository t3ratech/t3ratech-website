import { useEffect } from "react";
import { Check } from "lucide-react";
import { t3rnelDocumentIntelligenceProduct } from "../data";

export function DocumentIntelligence() {
  useEffect(() => {
    document.title = "T3rnel Document Intelligence | T3raTech";
  }, []);

  const Icon = t3rnelDocumentIntelligenceProduct.icon;

  return (
    <section className="store-section page-section mcp-section" aria-labelledby="document-intelligence-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">MCP server</p>
          <h2 id="document-intelligence-title">{t3rnelDocumentIntelligenceProduct.name}</h2>
          <p className="technology-lead">{t3rnelDocumentIntelligenceProduct.tagline}</p>
          <p className="chrome-description">{t3rnelDocumentIntelligenceProduct.description}</p>
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
            T3rnel Document Intelligence is a Cloudflare-hosted Streamable HTTP MCP server.
            Send a receipt or invoice image or PDF and the server returns structured,
            evidence-backed fields — amounts, dates, vendors, line items, tax and categories —
            with the source document and confidence preserved.
          </p>
          <ul className="chrome-feature-list">
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>extract_receipt</strong> — pull vendor, date, total, tax, payment method and line items from a receipt.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>extract_invoice</strong> — pull invoice number, due date, supplier, buyer, line items, tax and banking details.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>categorize_expense</strong> — classify a document against a chart of accounts with an evidence-backed reason.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>validate_document</strong> — check totals, currency consistency, required fields and flag anomalies.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>extract_batch</strong> — process multiple receipts or invoices in one call and return a consolidated result.
            </li>
          </ul>

          <h3>Storage, dashboard and quotas</h3>
          <p className="chrome-description">
            Uploaded documents and extracted records are stored in Cloudflare R2. A D1 database
            tracks tenant quota, call history, storage use and per-document lineage. A web dashboard
            shows current usage, remaining quota, storage growth and audit logs.
          </p>
          <ul className="chrome-feature-list">
            <li><Check size={16} strokeWidth={2.2} /> R2 object storage for uploaded and processed documents</li>
            <li><Check size={16} strokeWidth={2.2} /> D1 quota, call and storage tracking per tenant</li>
            <li><Check size={16} strokeWidth={2.2} /> Dashboard with usage, remaining quota and audit log</li>
          </ul>

          <h3>Free tier limits</h3>
          <ul className="chrome-feature-list">
            <li><Check size={16} strokeWidth={2.2} /> 25 document pages per calendar month</li>
            <li><Check size={16} strokeWidth={2.2} /> 5 MB maximum uploaded document size</li>
            <li><Check size={16} strokeWidth={2.2} /> 90-day retention for extracted records</li>
          </ul>

          <h3>Configure</h3>
          <p className="chrome-description">
            The server is published as a remote Streamable HTTP MCP server. Add it to your MCP client:
          </p>
          <pre className="mcp-install">
            <code>{`{
  "mcpServers": {
    "t3rnel-document-intelligence": {
      "type": "http",
      "url": "https://t3rnel-document-intelligence.t3ratech.workers.dev/mcp",
      "headers": {
        "Authorization": "Bearer \${T3RNEL_DOCUMENT_INTELLIGENCE_CREDENTIAL}"
      }
    }
  }
}`}</code>
          </pre>

          <h3>Health check</h3>
          <p className="chrome-description">
            Test connectivity and credentials before configuring your client:
          </p>
          <pre className="mcp-install">
            <code>{t3rnelDocumentIntelligenceProduct.installCommand}</code>
          </pre>

          <h3>How extraction is grounded</h3>
          <p className="chrome-description">
            The server treats document content as data, not instructions. It uses vision-capable
            models and structured-output parsing to return typed fields, confidence scores and the
            page regions that support each value. Missing or uncertain fields stay empty; anomalies
            are surfaced for review rather than silently corrected.
          </p>

          <h3>Privacy and governance</h3>
          <p className="chrome-description">
            Bearer credentials, raw uploads and extracted records are scoped to the tenant. Uploaded
            documents and result records can be deleted while retaining anonymised audit hashes. Quota
            and storage counts are updated after every call and visible in the dashboard.
          </p>

          <h3>Source and listings</h3>
          <ul className="chrome-features">
            {t3rnelDocumentIntelligenceProduct.listings.map((listing) => (
              <li key={listing.url}>
                <Check size={16} strokeWidth={2.2} />
                <a href={listing.url} target="_blank" rel="noreferrer">{listing.label}</a>
              </li>
            ))}
          </ul>

          <h3>Skill</h3>
          <p className="chrome-description">
            {t3rnelDocumentIntelligenceProduct.skill.summary} The{" "}
            <a href={t3rnelDocumentIntelligenceProduct.skill.url} target="_blank" rel="noreferrer">
              {t3rnelDocumentIntelligenceProduct.skill.name}
            </a>{" "}
            skill is published beside the server so the tool names and limits it quotes are covered by
            the repository tests.
          </p>

          <a
            className="button store-button chrome-button"
            href={t3rnelDocumentIntelligenceProduct.url}
            target="_blank"
            rel="noreferrer"
          >
            Open server
          </a>
        </div>
      </div>
    </section>
  );
}
