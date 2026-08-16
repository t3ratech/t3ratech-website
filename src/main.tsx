import React from "react";
import ReactDOM from "react-dom/client";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  ExternalLink,
  Github,
  Globe2,
  Languages,
  Menu,
  MessageSquareText,
  Monitor,
  Moon,
  Network,
  Palette,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sun,
  Twitter,
  UsersRound,
  Vote,
  Workflow,
  X,
} from "lucide-react";
import "./styles.css";

type Product = {
  name: string;
  eyebrow: string;
  domain: string;
  url: string;
  summary: string;
  detail: string;
  points: string[];
  accent: "green" | "red" | "gold";
  image?: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

type CommunityGroup = {
  name: string;
  category: string;
  description: string;
  image: string;
};

type NFTSeries = {
  name: string;
  seriesKey: string;
  tagline: string;
  description: string;
  image: string;
  openseaUrl: string;
};

type SocialLink = {
  name: string;
  label: string;
  url: string;
  category: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

type ThemePreference = "light" | "dark" | "auto";

const themeStorageKey = "t3ratech-theme";
const defaultThemePreference: ThemePreference = "auto";

const themeOptions: Array<{
  value: ThemePreference;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}> = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "auto", label: "Auto", icon: Monitor },
];

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "auto";
}

function getInitialThemePreference(): ThemePreference {
  if (typeof window === "undefined") {
    return defaultThemePreference;
  }

  const storedPreference = window.localStorage.getItem(themeStorageKey);
  return isThemePreference(storedPreference) ? storedPreference : defaultThemePreference;
}

function resolveTheme(preference: ThemePreference, mediaQuery: MediaQueryList): Exclude<ThemePreference, "auto"> {
  if (preference === "auto") {
    return mediaQuery.matches ? "dark" : "light";
  }

  return preference;
}

const products: Product[] = [
  {
    name: "Bantora",
    eyebrow: "Civic signal",
    domain: "bantora.t3ratech.co.zw",
    url: "https://bantora.t3ratech.co.zw",
    summary: "A Pan-African polling, consensus, and civic engagement platform.",
    detail:
      "Bantora gives African communities a structured way to propose ideas, vote, and turn public sentiment into a traceable continental signal.",
    points: [
      "Ideas, polls, votes, and source traceability turn civic noise into a clearer public mandate",
      "African-first registration, language support, regional scopes, and country-aware participation",
      "Built for trust: one person, one vote, transparent moderation, and accountable public sentiment",
    ],
    accent: "green",
    icon: Vote,
  },
  {
    name: "Connekt",
    eyebrow: "Digital ecosystem",
    domain: "connekt.t3ratech.co.zw",
    url: "https://connekt.t3ratech.co.zw",
    summary: "A modular superapp ecosystem for services, commerce, listings, and communication.",
    detail:
      "Connekt brings everyday African economic activity into one channel-aware platform, from service bidding and payments to content, chat, jobs, events, and marketplaces.",
    points: [
      "Services, listings, jobs, events, payments, provider workflows, ratings, and communication in one ecosystem",
      "Designed around African access patterns: web, chat, WhatsApp-style flows, and modular service expansion",
      "A practical digital economy layer for informal work, discovery, trust, and local transactions",
    ],
    accent: "red",
    image: "/assets/connekt-system.jpeg",
    icon: Network,
  },
  {
    name: "T3rnel",
    eyebrow: "Agent operating system",
    domain: "t3rnel.t3ratech.co.zw",
    url: "https://t3rnel.t3ratech.co.zw",
    summary: "A Rust-cored agent OS for running specialist swarms across complex digital work.",
    detail:
      "T3rnel is more than a coding assistant: it coordinates agents for software, research, marketing, faceless video workflows, book writing, stock-market systems, and everyday operations.",
    points: [
      "Agent swarms coordinate researchers, builders, writers, market watchers, reviewers, and skill authors",
      "A Tab OS keeps workspaces like Agents, Chat, Search, Mail, News, Stocks, Skills, Inbox, and Tasks inspectable",
      "Human approval, memory, skills, audit trails, and safety rails keep broad automation under control",
    ],
    accent: "gold",
    image: "/assets/t3ratech-tt-logo-visible.png",
    icon: Bot,
  },
];

const nftSeriesList: NFTSeries[] = [
  {
    name: "Vault Warden",
    seriesKey: "Genesis Series 01",
    tagline: "Security & Guardrail Primitives",
    description:
      "Autonomous agent-generated artwork from the T3rnel Agent OS genesis series. Vault Warden represents policy enforcement and capability token security.",
    image: "/nfts/vault-warden.jpg",
    openseaUrl: "https://opensea.io/collection/t3rnel-genesis",
  },
  {
    name: "Aurora Daemon",
    seriesKey: "Genesis Series 02",
    tagline: "High-Frequency Intelligence",
    description:
      "Autonomous agent-generated artwork from the T3rnel Agent OS genesis series. Aurora Daemon embodies reactive event handling and real-time execution.",
    image: "/nfts/aurora-daemon.jpg",
    openseaUrl: "https://opensea.io/collection/t3rnel-genesis",
  },
  {
    name: "Glasswing Oracle",
    seriesKey: "Genesis Series 03",
    tagline: "Transparent Knowledge & Foresight",
    description:
      "Autonomous agent-generated artwork from the T3rnel Agent OS genesis series. Glasswing Oracle symbolizes verifiable analytical reasoning and market insight.",
    image: "/nfts/glasswing-oracle.jpg",
    openseaUrl: "https://opensea.io/collection/t3rnel-genesis",
  },
  {
    name: "Verdant Archivist",
    seriesKey: "Genesis Series 04",
    tagline: "Long-Term Memory & State",
    description:
      "Autonomous agent-generated artwork from the T3rnel Agent OS genesis series. Verdant Archivist preserves persistent knowledge graphs and long-term memory.",
    image: "/nfts/verdant-archivist.jpg",
    openseaUrl: "https://opensea.io/collection/t3rnel-genesis",
  },
  {
    name: "Tidecaller",
    seriesKey: "Genesis Series 05",
    tagline: "Stream Orchestration & Market Flow",
    description:
      "Autonomous agent-generated artwork from the T3rnel Agent OS genesis series. Tidecaller coordinates multi-channel data streams and market liquidity systems.",
    image: "/nfts/tidecaller.jpg",
    openseaUrl: "https://opensea.io/collection/t3rnel-genesis",
  },
  {
    name: "Emberwright",
    seriesKey: "Genesis Series 06",
    tagline: "Core Engine & Synthesis",
    description:
      "Autonomous agent-generated artwork from the T3rnel Agent OS genesis series. Emberwright represents low-level kernel compilation and agent synthesis.",
    image: "/nfts/emberwright.jpg",
    openseaUrl: "https://opensea.io/collection/t3rnel-genesis",
  },
];

const socialLinks: SocialLink[] = [
  {
    name: "Codester Page",
    label: "Our #Codester Page",
    url: "https://www.codester.com/t3ratech",
    category: "Software & Templates Marketplace",
    icon: ShoppingBag,
  },
  {
    name: "Gumroad Shop",
    label: "Our #Gumroad Digital Content Shop",
    url: "https://t3rnel.gumroad.com/",
    category: "Digital Products & Content",
    icon: Globe2,
  },
  {
    name: "GitHub",
    label: "Our #GitHub",
    url: "https://github.com/t3ratech",
    category: "Open Source Code & Repositories",
    icon: Github,
  },
  {
    name: "Twitter / X",
    label: "Our #Twitter / X account",
    url: "https://x.com/t3ratech",
    category: "Official Twitter / X Channel",
    icon: Twitter,
  },
  {
    name: "Reddit Page",
    label: "Our #Reddit Page",
    url: "https://www.reddit.com/user/t3ratech/",
    category: "Reddit Community & Discussions",
    icon: MessageSquareText,
  },
  {
    name: "OpenSea NFT Marketplace",
    label: "Our #OpenSea #NFT Marketplace",
    url: "https://opensea.io/collection/t3rnel-genesis",
    category: "Genesis NFT Collection",
    icon: Palette,
  },
];

const impactPillars = [
  {
    label: "Civic voice",
    title: "Bantora turns scattered ideas into structured public will.",
    body: "African-country registration, regional scopes, multilingual access, and traceable AI poll generation help communities express what they want built and why.",
  },
  {
    label: "Economic inclusion",
    title: "Connekt formalizes the everyday informal economy.",
    body: "Bidding, escrow, service ratings, provider workflows, messaging, listings, jobs, events, payments, and local discovery make opportunity easier to find and trust.",
  },
  {
    label: "Agent leverage",
    title: "T3rnel turns ambitious work into coordinated swarms.",
    body: "Agent teams can research markets, build products, produce content, write long-form material, monitor stock systems, and run operations while side effects remain visible and approval-gated.",
  },
];

const technologyCards = [
  {
    title: "Agentic systems",
    body: "We work with agent swarms, A2A coordination, MCP integrations, skill systems, memory, and human approval loops so automation can do real work without becoming a black box.",
    icon: BrainCircuit,
  },
  {
    title: "Modern product surfaces",
    body: "We build across React, React Native, Expo, Flutter Web, real-time chat, web dashboards, IDE panels, mobile surfaces, and channel-aware experiences for African access patterns.",
    icon: Languages,
  },
  {
    title: "High-performance cores",
    body: "Rust, Java 25, reactive APIs, gRPC, WebSocket streams, event-driven messaging, typed interfaces, and secure service boundaries give our systems room to scale cleanly.",
    icon: Workflow,
  },
  {
    title: "Reliability discipline",
    body: "Test automation, UI checks, integration tests, strict configuration, observability, security controls, audit trails, and fail-fast behavior help us ship robust systems.",
    icon: ShieldCheck,
  },
];

const technologyHighlights = [
  "Agent swarms",
  "A2A protocol",
  "MCP tools",
  "Rust kernels",
  "Java 25",
  "React",
  "TypeScript",
  "React Native",
  "Expo",
  "Flutter Web",
  "Spring Boot",
  "WebFlux",
  "WASM skills",
  "gRPC streams",
  "Kafka",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Terraform",
  "Infrastructure as Code",
  "OpenTelemetry",
  "Playwright",
  "Patrol",
  "Python sidecars",
  "Knowledge graphs",
  "Test automation",
  "Serverless systems",
  "Cloud-native APIs",
  "CI/CD pipelines",
  "Secret management",
  "Artifact registries",
  "Microservices",
  "Modular monoliths",
  "Event-driven design",
  "WebSocket streams",
  "SSE updates",
  "R2DBC",
  "JWT and RBAC",
  "Argon2id",
  "Capability tokens",
  "Sandboxing",
  "Audit chains",
  "Vector search",
  "LanceDB",
  "SQLite",
  "AI provider routing",
  "LLM guardrails",
  "UI automation",
  "Integration testing",
  "Observability",
  "SEO metadata",
  "Secure APIs",
];

const values = ["Patriotism", "Excellence", "Innovation", "Partnership"];

const scitechCommunityUrl = "https://chat.whatsapp.com/JSFpsyPF2LvHYXmZRS8Y1C";

const navItems = [
  { href: "#products", label: "Systems" },
  { href: "#nfts", label: "NFT Series" },
  { href: "#mission", label: "Mission" },
  { href: "#community", label: "Community" },
  { href: "#presence", label: "Presence" },
  { href: "#technology", label: "Technology" },
];

const scitechGroups: CommunityGroup[] = [
  {
    name: "Announcements",
    category: "Community updates",
    description:
      "The main broadcast lane for SciTech Zimbabwe updates, community notices, and T3raTech-led coordination.",
    image: "/assets/scitech/announcements.jpg",
  },
  {
    name: "SciTech Society",
    category: "Science and technology",
    description:
      "The general room for science, technology, innovation, opportunities, trends, useful news, and practical knowledge sharing.",
    image: "/assets/scitech/scitech-society.jpg",
  },
  {
    name: "Zim Developers",
    category: "Software development",
    description:
      "A Zimbabwean developer space for software opportunities, technical discussion, jobs, ideas, and peer support.",
    image: "/assets/scitech/zim-developers.jpg",
  },
  {
    name: "Zim Developers (2)",
    category: "Software development",
    description:
      "An additional developer room for respectful engineering discussion, software jobs, overflow conversation, and collaboration.",
    image: "/assets/scitech/zim-developers-2.jpg",
  },
  {
    name: "WomenTech Zimbabwe",
    category: "Women in technology",
    description:
      "A support network for women in technology, covering learning, mentorship, resources, events, networking, jobs, and internships.",
    image: "/assets/scitech/womentech-zimbabwe.jpg",
  },
  {
    name: "SciTech Jobs",
    category: "STEM opportunities",
    description:
      "A focused jobs room for science and technology roles, remote work, projects, part-time work, and once-off technical tasks.",
    image: "/assets/scitech/scitech-jobs.jpg",
  },
  {
    name: "Wakanda Jobs",
    category: "Work and opportunity",
    description:
      "A broader jobs community connecting employers and workers across professional services, trades, creative work, logistics, retail, and hospitality.",
    image: "/assets/scitech/wakanda-jobs.jpg",
  },
  {
    name: "Web3, Crypto & Trade Squad",
    category: "Web3 and markets",
    description:
      "A learning and discussion space for Web3, crypto, NFTs, smart contracts, market tools, trading systems, and safer peer exchange.",
    image: "/assets/scitech/web3-crypto-and-trade-squad.jpg",
  },
  {
    name: "T3raTrade Signals",
    category: "Market intelligence",
    description:
      "AI-assisted technical analysis and signal monitoring for gold, silver, synthetic indices, and market education, with clear non-advice framing.",
    image: "/assets/scitech/t3ratrade-signals.jpg",
  },
  {
    name: "Zim Gamers_Hub",
    category: "Gaming culture",
    description:
      "A home for Zimbabwean gamers to discuss releases, share tips, organize sessions, and grow local gaming culture.",
    image: "/assets/scitech/zim-gamers-hub.jpg",
  },
  {
    name: "Gadget Galaxy",
    category: "Devices and electronics",
    description:
      "A practical space for gadgets, reviews, deals, phones, laptops, cameras, gaming devices, drones, Starlink, repairs, and tech know-how.",
    image: "/assets/scitech/gadget-galaxy.jpg",
  },
  {
    name: "MotoVerse",
    category: "Mobility and vehicles",
    description:
      "A motoring network for vehicles, spares, repairs, services, imports, exports, events, trade, and legal transport information.",
    image: "/assets/scitech/motoverse.jpg",
  },
  {
    name: "Perfect Property Portal",
    category: "Real estate",
    description:
      "A Zimbabwean property space for residential, student housing, commercial property, farms, stands, rentals, offices, warehouses, and verified listings.",
    image: "/assets/scitech/perfect-property-portal.jpg",
  },
  {
    name: "The Events Plug",
    category: "Events",
    description:
      "A national events hub for music, markets, conferences, workshops, church events, competitions, sports, networking, arts, and culture.",
    image: "/assets/scitech/the-events-plug.jpg",
  },
  {
    name: "The Link Loop",
    category: "Community directory",
    description:
      "A discovery lane for productive Zimbabwean WhatsApp, Facebook, Telegram, and Discord groups, communities, channels, and public links.",
    image: "/assets/scitech/the-link-loop.jpg",
  },
  {
    name: "The Bees Knees",
    category: "Business and news",
    description:
      "A business and news room for entrepreneurs, market trends, industry insights, ideas, questions, and practical community discussion.",
    image: "/assets/scitech/the-bees-knees.jpg",
  },
];

function App() {
  const [themePreference, setThemePreference] =
    React.useState<ThemePreference>(getInitialThemePreference);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) {
      return;
    }

    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView();
    });
  }, []);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      document.documentElement.dataset.theme = resolveTheme(themePreference, mediaQuery);
      document.documentElement.dataset.themePreference = themePreference;
      window.localStorage.setItem(themeStorageKey, themePreference);
    };

    applyTheme();
    mediaQuery.addEventListener("change", applyTheme);

    return () => {
      mediaQuery.removeEventListener("change", applyTheme);
    };
  }, [themePreference]);

  React.useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`site-header ${isMobileMenuOpen ? "menu-open" : ""}`} aria-label="Primary">
        <a className="brand" href="#top" aria-label="T3raTech home">
          <span className="brand-mark" aria-hidden="true">
            <img src="/assets/t3ratech-tt-logo-visible.png" alt="" />
          </span>
          <span>T3raTech</span>
        </a>
        <div className="header-actions">
          <nav className="nav-links" id="primary-navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="theme-toggle" aria-label="Color mode">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  aria-label={`${option.label} mode`}
                  aria-pressed={themePreference === option.value}
                  className={themePreference === option.value ? "active" : undefined}
                  key={option.value}
                  onClick={() => setThemePreference(option.value)}
                  title={`${option.label} mode`}
                  type="button"
                >
                  <Icon size={17} strokeWidth={2.2} />
                </button>
              );
            })}
          </div>
          <button
            aria-controls="primary-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="menu-toggle"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            {isMobileMenuOpen ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="kicker">Build in Africa, for Africa</p>
            <h1 id="hero-title">T3raTech Solutions</h1>
            <p className="hero-copy">
              A proudly Zimbabwean and African software company building digital systems for civic voice,
              inclusive commerce, agentic software delivery, and connected technology communities.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#products">
                <ArrowDown size={18} strokeWidth={2.2} />
                Explore systems
              </a>
              <a className="button secondary" href="#presence">
                <Globe2 size={18} strokeWidth={2.2} />
                Official Channels
              </a>
            </div>
          </div>
        </section>

        <section className="products-section" id="products">
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

        <section className="nft-section" id="nfts" aria-labelledby="nft-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="section-label">Agentic Art Collection</p>
              <h2 id="nft-title">Genesis Series NFTs</h2>
              <p className="technology-lead">
                Autonomous agent-generated artwork from the T3rnel Agent OS genesis collection. Each series represents a distinct core component of our autonomous agent architecture.
              </p>
            </div>

            <div className="nft-grid">
              {nftSeriesList.map((nft) => (
                <article className="nft-card" key={nft.name}>
                  <div className="nft-media">
                    <img src={nft.image} alt={nft.name} loading="lazy" />
                  </div>
                  <div className="nft-content">
                    <span className="nft-series-key">{nft.seriesKey}</span>
                    <h3>{nft.name}</h3>
                    <p className="nft-tagline">{nft.tagline}</p>
                    <p className="nft-description">{nft.description}</p>
                    <a className="button nft-button" href={nft.openseaUrl} target="_blank" rel="noreferrer">
                      <Palette size={16} strokeWidth={2.2} />
                      View on OpenSea
                      <ArrowUpRight size={16} strokeWidth={2.2} />
                    </a>
                  </div>
                </article>
              ))}
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
              T3raTech Solutions designs, builds, and delivers practical software, technology consulting,
              strategic partnerships, and R&D. These systems translate that focus into tools for African
              civic participation, economic access, and high-trust automation.
            </p>
          </div>
        </section>

        <section className="profile-section" aria-labelledby="profile-title">
          <div className="section-inner profile-grid">
            <div>
              <p className="section-label">Mission</p>
              <h2 id="profile-title">
                We design, build, and deliver digital solutions tailored to Africa's challenges and opportunities.
              </h2>
            </div>
            <div className="profile-copy">
              <p>
                Our mission is to deliver world-class software while fostering local talent, investing in
                innovation, and forming strong strategic partnerships across the continent and beyond.
              </p>
              <p>
                Our vision is to be Africa's most trusted and innovative software development and consulting
                company, championing technology that solves real problems and uplifts communities.
              </p>
              <div className="values-list" aria-label="T3raTech values">
                {values.map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="impact-section" aria-labelledby="impact-title">
          <div className="section-inner impact-grid">
            <div>
              <p className="section-label">African problem-solving</p>
              <h2 id="impact-title">Software that meets people where the work already happens.</h2>
            </div>
            <div className="impact-rows">
              {impactPillars.map((pillar) => (
                <article className="impact-row" key={pillar.label}>
                  <span>{pillar.label}</span>
                  <div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="community-section" id="community" aria-labelledby="community-title">
          <div className="section-inner">
            <div className="community-intro">
              <div>
                <p className="section-label">SciTech Zimbabwe</p>
                <h2 id="community-title">A national WhatsApp community for Zimbabwe's science and technology people.</h2>
              </div>
              <div className="community-copy">
                <p>
                  SciTech Zimbabwe is the community layer around our work: a growing network where builders,
                  technologists, entrepreneurs, job seekers, traders, gamers, property people, event organizers,
                  and curious citizens find each other.
                </p>
                <div className="community-actions">
                  <a className="button community-button" href={scitechCommunityUrl} target="_blank" rel="noreferrer">
                    <UsersRound size={18} strokeWidth={2.2} />
                    Join SciTech Zimbabwe
                  </a>
                  <span>16 groups across tech, jobs, commerce, markets, property, events, and culture.</span>
                </div>
              </div>
            </div>

            <div className="community-feature">
              <img src="/assets/scitech/scitech-zimbabwe.jpg" alt="" loading="lazy" />
              <div>
                <p className="section-label">Community operating system</p>
                <h3>Built in the channels Zimbabweans already use.</h3>
                <p>
                  The community reflects the same T3raTech philosophy as our products: meet people where real
                  activity already happens, organize the signal, and turn scattered energy into useful networks.
                </p>
              </div>
            </div>

            <div className="community-grid">
              {scitechGroups.map((group) => (
                <article className="community-card" key={group.name}>
                  <img src={group.image} alt="" loading="lazy" />
                  <div>
                    <span>{group.category}</span>
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="presence-section" id="presence" aria-labelledby="presence-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="section-label">Connect & Explore</p>
              <h2 id="presence-title">Official Channels & Online Presence</h2>
              <p className="technology-lead">
                Reach T3raTech across our official software marketplaces, code repositories, social channels, and NFT storefronts.
              </p>
            </div>

            <div className="presence-grid">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <article className="presence-card" key={link.name}>
                    <div className="presence-icon">
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    <div className="presence-content">
                      <span className="presence-category">{link.category}</span>
                      <h3>{link.name}</h3>
                      <p className="presence-label">{link.label}</p>
                      <a className="button presence-button" href={link.url} target="_blank" rel="noreferrer">
                        Visit {link.name}
                        <ArrowUpRight size={16} strokeWidth={2.2} />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="technology-section" id="technology" aria-labelledby="technology-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="section-label">Bleeding-edge, practical engineering</p>
              <h2 id="technology-title">Advanced technology is useful only when it makes real systems safer, faster, and clearer.</h2>
              <p className="technology-lead">
                We choose tools for resilience, scale, and speed of delivery. The point is not novelty for its own
                sake; it is building systems that can serve real users, survive change, and keep moving.
              </p>
              <div className="technology-tags" aria-label="Technology highlights">
                {technologyHighlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="technology-grid">
              {technologyCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.title}>
                    <Icon size={26} strokeWidth={2} />
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-inner footer-grid">
          <div>
            <a className="brand footer-brand" href="#top" aria-label="T3raTech home">
              <span className="brand-mark" aria-hidden="true">
                <img src="/assets/t3ratech-tt-logo-visible.png" alt="" />
              </span>
              <span>T3raTech Solutions</span>
            </a>
            <p>Patriotism. Excellence. Innovation. Partnership.</p>
            <p className="footer-subtext">Developed and supported by T3raTech Solutions (Pvt) Ltd</p>
          </div>
          <div className="footer-links">
            <h4>Official Presence</h4>
            <a href="mailto:support@t3ratech.co.zw">
              <MessageSquareText size={16} strokeWidth={2.1} />
              support@t3ratech.co.zw
            </a>
            <a href="https://www.codester.com/t3ratech" target="_blank" rel="noreferrer">
              <ShoppingBag size={16} strokeWidth={2.1} />
              Codester Page
            </a>
            <a href="https://t3rnel.gumroad.com/" target="_blank" rel="noreferrer">
              <Globe2 size={16} strokeWidth={2.1} />
              Gumroad Shop
            </a>
            <a href="https://github.com/t3ratech" target="_blank" rel="noreferrer">
              <Github size={16} strokeWidth={2.1} />
              GitHub Repository
            </a>
            <a href="https://x.com/t3ratech" target="_blank" rel="noreferrer">
              <Twitter size={16} strokeWidth={2.1} />
              Twitter / X
            </a>
            <a href="https://www.reddit.com/user/t3ratech/" target="_blank" rel="noreferrer">
              <MessageSquareText size={16} strokeWidth={2.1} />
              Reddit Profile
            </a>
            <a href="https://opensea.io/collection/t3rnel-genesis" target="_blank" rel="noreferrer">
              <Palette size={16} strokeWidth={2.1} />
              OpenSea NFT Collection
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
