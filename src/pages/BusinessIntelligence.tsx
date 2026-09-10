import { useEffect } from "react";
import { Check } from "lucide-react";
import { t3rnelBusinessIntelligenceProduct } from "../data";

/**
 * T3rnel Business Intelligence.
 *
 * Two things this page deliberately does not say. It does not claim the product
 * is available — it is in development, and saying otherwise to the accountants
 * and fleet owners this depends on would cost the trust the whole distribution
 * plan rests on. And it makes no fiscalisation claim: ZIMRA validation is an
 * external approval, so "ZIMRA compliant" is not ours to write until it lands.
 */
export function BusinessIntelligence() {
  useEffect(() => {
    document.title = "T3rnel Business Intelligence | T3raTech";
  }, []);

  const Icon = t3rnelBusinessIntelligenceProduct.icon;

  return (
    <section className="store-section page-section mcp-section" aria-labelledby="business-intelligence-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">Application &middot; in development</p>
          <h2 id="business-intelligence-title">{t3rnelBusinessIntelligenceProduct.name}</h2>
          <p className="technology-lead">{t3rnelBusinessIntelligenceProduct.tagline}</p>
          <p className="chrome-description">{t3rnelBusinessIntelligenceProduct.description}</p>
        </div>

        <div className="chrome-card mcp-card">
          <div className="store-card-top">
            <span className="store-icon chrome-icon">
              <Icon size={32} strokeWidth={2} />
            </span>
            <span className="store-badge">In development</span>
          </div>

          <h3>Who it is for</h3>
          <p className="chrome-description">
            Three kinds of business, one ledger. A gig driver logging fuel and repairs for a
            deduction trail. A fleet owner who needs to know which vehicles actually make money.
            A small business issuing invoices and chasing what it is owed.
          </p>

          <h3>What it does</h3>
          <ul className="chrome-feature-list">
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Scan a receipt</strong> — photograph it at the pump and the amount, supplier
              and category are extracted, with the image kept as evidence.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Capture an EcoCash SMS</strong> — the confirmation already carries the amount
              and reference, so the phone that receives money keeps the books.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>USD and ZiG together</strong> — every entry keeps the rate used, its source
              and its date, so a report can never quietly restate an old position at today&rsquo;s rate.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Works with no signal</strong> — capture offline and sync later; the server
              assigns invoice numbers so two phones can never mint the same one.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Send over WhatsApp</strong> — the invoice reaches a phone number, with a
              payment link in the same message.
            </li>
            <li>
              <Check size={18} strokeWidth={2.2} />
              <strong>Export to your accountant</strong> — Excel, CSV, Pastel, Sage, QuickBooks and
              Xero, always carrying both the original and converted amounts.
            </li>
          </ul>

          <h3>How it handles your money</h3>
          <p className="chrome-description">
            Amounts are whole cents, never decimals that drift. A figure the app cannot convert
            honestly is disclosed rather than folded into a total that looks complete. Corrections
            are recorded. Nothing is ever advertised inside an invoice or receipt &mdash; those are
            your business records, not our advertising space.
          </p>

          <p className="chrome-description">
            Built on{" "}
            <a href="/document-intelligence">T3rnel Document Intelligence</a> for extraction and
            T3rnel WavePay for billing &mdash; both of which stand alone as products in their own right.
          </p>

          <div className="store-links">
            {t3rnelBusinessIntelligenceProduct.listings.map((l) => (
              <a key={l.url} className="store-link" href={l.url} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
