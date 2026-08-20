import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { products } from "../data";

export function Systems() {
  useEffect(() => {
    document.title = "Our Systems | T3raTech Solutions";
  }, []);

  return (
    <section className="products-section page-section" id="products">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">Our systems</p>
          <h2>Three systems, one operating philosophy.</h2>
        </div>

        <div className="product-grid">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <article className={`product-card ${product.accent}`} key={product.name}>
                <div className="product-topline">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <div className="product-media" aria-hidden="true">
                  {product.image ? (
                    <img src={product.image} alt="" loading="lazy" />
                  ) : (
                    <div className="poll-visual">
                      <div className="poll-bar strong" />
                      <div className="poll-bar medium" />
                      <div className="poll-bar light" />
                      <div className="poll-dot-row">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  )}
                </div>
                <p className="product-eyebrow">{product.eyebrow}</p>
                <h3>{product.name}</h3>
                <a className="product-domain" href={product.url} target="_blank" rel="noreferrer">
                  {product.domain}
                  <ArrowUpRight size={16} strokeWidth={2.2} />
                </a>
                <p className="product-summary">{product.summary}</p>
                <p className="product-detail">{product.detail}</p>
                <ul>
                  {product.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
