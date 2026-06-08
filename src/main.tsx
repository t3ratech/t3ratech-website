import React from "react";
import ReactDOM from "react-dom/client";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Cloud,
  Database,
  Globe2,
  Lock,
  MessageSquareText,
  Network,
  Server,
  ShieldCheck,
  Vote,
} from "lucide-react";
import "./styles.css";

type Product = {
  name: string;
  eyebrow: string;
  status: string;
  summary: string;
  detail: string;
  points: string[];
  accent: "green" | "red" | "gold";
  image?: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

const products: Product[] = [
  {
    name: "Bantora",
    eyebrow: "Civic signal",
    status: "Launch track 01",
    summary: "A Pan-African polling, consensus, and civic engagement platform.",
    detail:
      "Bantora turns ideas, votes, and regional conversations into a clearer signal of what communities want to see built.",
    points: [
      "Ideas, polls, voting, and traceable public sentiment",
      "African-first registration, language, and regional scope",
      "AI-assisted idea grouping for higher-quality polls",
    ],
    accent: "green",
    icon: Vote,
  },
  {
    name: "Connekt",
    eyebrow: "Digital ecosystem",
    status: "Launch track 02",
    summary: "A modular superapp foundation for services, listings, commerce, and communication.",
    detail:
      "Connekt brings everyday discovery and transactions into one Zimbabwe-first platform, starting with focused modules before widening the ecosystem.",
    points: [
      "Services, vehicles, classifieds, and directory modules",
      "Messaging, payments, chat, notifications, and admin control",
      "Designed to grow by enabling modules as demand proves itself",
    ],
    accent: "red",
    image: "/assets/connekt-launch.jpeg",
    icon: Network,
  },
  {
    name: "T3rnel",
    eyebrow: "Agent operating system",
    status: "Next addition",
    summary: "A Rust-cored agent OS for building, testing, reviewing, and shipping software.",
    detail:
      "T3rnel is the automation layer for serious delivery work: watch every file edit, terminal run, review, and approval as agents move a project forward.",
    points: [
      "Autonomous coding workflows with human approval",
      "IDE, web, TUI, and future mobile surfaces",
      "Low-idle Rust core with model-provider fallbacks",
    ],
    accent: "gold",
    image: "/assets/t3rnel-logo.png",
    icon: Bot,
  },
];

const launchSteps = [
  {
    label: "Now",
    title: "Company website",
    body: "A public front door for the three launch products, served as a static Cloud Run container.",
  },
  {
    label: "Wave 1",
    title: "Bantora + Connekt",
    body: "Launch the two public platforms first, sharing managed infrastructure where it is safe.",
  },
  {
    label: "Wave 2",
    title: "T3rnel core",
    body: "Add the agent OS API and public surfaces after the first services are stable.",
  },
];

function App() {
  return (
    <>
      <header className="site-header" aria-label="Primary">
        <a className="brand" href="#top" aria-label="T3raTech home">
          <span className="brand-mark">T3</span>
          <span>T3raTech</span>
        </a>
        <nav className="nav-links">
          <a href="#products">Products</a>
          <a href="#mission">Mission</a>
          <a href="#cloud-run">Cloud Run</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="kicker">Build in Africa, for Africa</p>
            <h1 id="hero-title">T3raTech Solutions</h1>
            <p className="hero-copy">
              A Zimbabwean software company launching practical, transformative platforms for civic voice,
              digital ecosystems, and agentic software delivery.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#products">
                <ArrowDown size={18} strokeWidth={2.2} />
                Explore launches
              </a>
              <a className="button secondary" href="#cloud-run">
                <Cloud size={18} strokeWidth={2.2} />
                Deployment path
              </a>
            </div>
          </div>
        </section>

        <section className="mission-strip" id="mission" aria-label="Company mission">
          <div className="section-inner mission-grid">
            <div>
              <p className="section-label">Company focus</p>
              <h2>World-class software shaped around African realities.</h2>
            </div>
            <p>
              T3raTech Solutions focuses on software development, technology consulting, strategic
              partnerships, and R&D. This first public launch concentrates that mission into three products:
              Bantora, Connekt, and T3rnel.
            </p>
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-inner">
            <div className="section-heading">
              <p className="section-label">Three-product launch</p>
              <h2>One company, three launch bets.</h2>
            </div>

            <div className="product-grid">
              {products.map((product) => {
                const Icon = product.icon;
                return (
                  <article className={`product-card ${product.accent}`} key={product.name}>
                    <div className="product-topline">
                      <span>{product.status}</span>
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

        <section className="launch-section" aria-labelledby="launch-title">
          <div className="section-inner launch-grid">
            <div>
              <p className="section-label">Launch order</p>
              <h2 id="launch-title">Start narrow, prove the stack, then add T3rnel.</h2>
            </div>
            <div className="launch-rows">
              {launchSteps.map((step) => (
                <article className="launch-row" key={step.label}>
                  <span>{step.label}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cloud-section" id="cloud-run" aria-labelledby="cloud-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="section-label">Cloud Run strategy</p>
              <h2 id="cloud-title">Stateless services on Cloud Run, managed state beside them.</h2>
            </div>
            <div className="cloud-grid">
              <article>
                <Server size={26} strokeWidth={2} />
                <h3>Containers</h3>
                <p>Website, Bantora web/API, Connekt service containers, and T3rnel API run as Cloud Run services.</p>
              </article>
              <article>
                <Database size={26} strokeWidth={2} />
                <h3>State</h3>
                <p>Use Cloud SQL for Postgres, Memorystore for Redis, Cloud Storage for objects, and managed messaging where needed.</p>
              </article>
              <article>
                <ShieldCheck size={26} strokeWidth={2} />
                <h3>Control</h3>
                <p>Keep internal services private, expose only public frontends/APIs, and keep secrets in Secret Manager.</p>
              </article>
              <article>
                <Lock size={26} strokeWidth={2} />
                <h3>Cost guardrails</h3>
                <p>Use minimum instances sparingly, cap maximum instances, and let low-traffic services scale to zero.</p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-inner footer-grid">
          <div>
            <a className="brand footer-brand" href="#top" aria-label="T3raTech home">
              <span className="brand-mark">T3</span>
              <span>T3raTech Solutions</span>
            </a>
            <p>Patriotism. Excellence. Innovation. Partnership.</p>
          </div>
          <div className="footer-links">
            <a href="mailto:t3ratech.dev@gmail.com">
              <MessageSquareText size={18} strokeWidth={2.1} />
              t3ratech.dev@gmail.com
            </a>
            <a href="https://www.t3ratech.co.zw" target="_blank" rel="noreferrer">
              <Globe2 size={18} strokeWidth={2.1} />
              www.t3ratech.co.zw
            </a>
            <a href="#products">
              <ArrowUpRight size={18} strokeWidth={2.1} />
              View products
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
