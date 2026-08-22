import { useEffect } from "react";
import { ArrowUpRight, Globe2, ShoppingBag } from "lucide-react";
import { gumroadProducts } from "../data";

export function GumroadProducts() {
  useEffect(() => {
    document.title = "Gumroad Products | T3raTech";
  }, []);

  return (
    <section className="store-section page-section" aria-labelledby="gumroad-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">Digital products</p>
          <h2 id="gumroad-title">Gumroad Shop</h2>
          <p className="technology-lead">
            Documentation packs, agent team bundles, reports and courses built by the T3rnel revenue pipeline. Every listing has a clear price and a deliverable attached.
          </p>
          <a
            className="button store-hero-button"
            href="https://t3rnel.gumroad.com/"
            target="_blank"
            rel="noreferrer"
          >
            <Globe2 size={18} strokeWidth={2.2} />
            Visit the full shop
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </a>
        </div>

        <div className="store-grid">
          {gumroadProducts.map((product) => (
            <article className="store-card" key={product.url}>
              <div className="store-card-top">
                <span className="store-icon">
                  <ShoppingBag size={22} strokeWidth={2} />
                </span>
                <span className="store-price">{product.price_usd === 0 ? "$0+" : `$${product.price_usd.toFixed(2)}`}</span>
              </div>
              <h3>{product.name}</h3>
              <p className="store-summary">{product.summary}</p>
              <a
                className="button store-button"
                href={product.url}
                target="_blank"
                rel="noreferrer"
              >
                Buy on Gumroad
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
