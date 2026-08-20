import { useEffect } from "react";
import { ArrowUpRight, Monitor } from "lucide-react";
import { chromeProduct } from "../data";

export function ChromeWebstore() {
  useEffect(() => {
    document.title = "Chrome Webstore | T3rnel Browser";
  }, []);

  const Icon = chromeProduct.icon;

  return (
    <section className="store-section page-section" aria-labelledby="chrome-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">Browser tools</p>
          <h2 id="chrome-title">Chrome Webstore</h2>
          <p className="technology-lead">
            Browser extensions that let your AI assistant see, read, and act on the web pages you care about.
          </p>
        </div>

        <div className="chrome-card">
          <div className="store-card-top">
            <span className="store-icon chrome-icon">
              <Icon size={32} strokeWidth={2} />
            </span>
            <span className="store-badge">Extension</span>
          </div>
          <h3>{chromeProduct.name}</h3>
          <p className="chrome-tagline">{chromeProduct.tagline}</p>
          <p className="chrome-description">{chromeProduct.description}</p>
          <a
            className="button store-button chrome-button"
            href={chromeProduct.url}
            target="_blank"
            rel="noreferrer"
          >
            Install from Chrome Webstore
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </section>
  );
}
