import React from "react";
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
  Sun,
  Twitter,
  UsersRound,
  Vote,
  Workflow,
  X,
} from "lucide-react";
import gumroadProductsJson from "./data/gumroadProducts.json";

export type Product = {
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

export type CommunityGroup = {
  name: string;
  category: string;
  description: string;
  image: string;
};

export type NFTSeries = {
  name: string;
  seriesKey: string;
  tagline: string;
  description: string;
  image: string;
  openseaUrl: string;
};

export type SocialLink = {
  name: string;
  label: string;
  url: string;
  category: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

export type ThemePreference = "light" | "dark" | "auto";

export const themeStorageKey = "t3ratech-theme";
export const defaultThemePreference: ThemePreference = "auto";

export const themeOptions: Array<{
  value: ThemePreference;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}> = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "auto", label: "Auto", icon: Monitor },
];

export function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "auto";
}

export function getInitialThemePreference(): ThemePreference {
  if (typeof window === "undefined") {
    return defaultThemePreference;
  }

  const storedPreference = window.localStorage.getItem(themeStorageKey);
  return isThemePreference(storedPreference) ? storedPreference : defaultThemePreference;
}

export function resolveTheme(preference: ThemePreference, mediaQuery: MediaQueryList): Exclude<ThemePreference, "auto"> {
  if (preference === "auto") {
    return mediaQuery.matches ? "dark" : "light";
  }

  return preference;
}

export const products: Product[] = [
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

export const nftSeriesList: NFTSeries[] = [
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

export const socialLinks: SocialLink[] = [
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

export const impactPillars = [
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

export const technologyCards = [
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

export const technologyHighlights = [
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

export const values = ["Patriotism", "Excellence", "Innovation", "Partnership"];

export const scitechCommunityUrl = "https://chat.whatsapp.com/JSFpsyPF2LvHYXmZRS8Y1C";


export const scitechGroups: CommunityGroup[] = [
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


export type GumroadProduct = {
  name: string;
  url: string;
  price_usd: number;
  summary: string;
};

export const gumroadProducts: GumroadProduct[] = gumroadProductsJson;

export type ChromeProduct = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

export const chromeProduct: ChromeProduct = {
  name: "T3rnel Browser",
  tagline: "MCP browser automation for AI agents",
  description:
    "Inspect CSS, capture full-page screenshots, read Markdown, and drive any page from your AI coding assistant. All local.",
  url: "https://chromewebstore.google.com/detail/egpckhdpkoeimoekciejbmbbcackhdmd",
  icon: Monitor,
};

export type NavItem = {
  path: string;
  label: string;
};

export const navItems: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/systems", label: "Systems" },
  { path: "/whatsapp-groups", label: "WhatsApp Groups" },
  { path: "/nfts", label: "NFTs" },
  { path: "/gumroad", label: "Gumroad" },
  { path: "/chrome", label: "Chrome" },
];

export type PageLink = {
  path: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

export const exploreLinks: PageLink[] = [
  { path: "/systems", label: "Systems", description: "Bantora, Connekt, and T3rnel.", icon: Network },
  { path: "/whatsapp-groups", label: "WhatsApp Groups", description: "SciTech Zimbabwe communities.", icon: UsersRound },
  { path: "/nfts", label: "NFTs", description: "Genesis agent-art series.", icon: Palette },
  { path: "/gumroad", label: "Gumroad", description: "Agent configuration bundles and digital products.", icon: ShoppingBag },
  { path: "/chrome", label: "Chrome", description: "T3rnel Browser extension.", icon: Monitor },
];
