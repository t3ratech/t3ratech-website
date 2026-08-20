import React from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Github,
  Globe2,
  Languages,
  Menu,
  MessageSquareText,
  Monitor,
  Moon,
  Palette,
  ShieldCheck,
  ShoppingBag,
  Sun,
  Twitter,
  UsersRound,
  Workflow,
  X,
} from "lucide-react";
import gumroadProductsJson from "./data/gumroadProducts.json";
import nftsJson from "./data/nfts.json";


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


export const nftSeriesList: NFTSeries[] = nftsJson;

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
    label: "Community",
    title: "SciTech Zimbabwe keeps builders, traders, and makers connected.",
    body: "A national WhatsApp network for science, technology, software, property, gaming, events, business, and market discussion — where useful signals travel faster than noise.",
  },
  {
    label: "Products",
    title: "Documentation, tools, and agent packs for working developers.",
    body: "Gumroad packs, open-source documentation, the T3rnel Browser extension, and the MCP Session Bridge give African and global technologists practical starting points.",
  },
  {
    label: "Agent tools",
    title: "MCP and browser automation with the human in the loop.",
    body: "AI agents should drive your real browser, read authenticated pages, and run tools with approval gates — not ship session cookies to a cloud browser or run blind.",
  },
];

export const technologyCards = [
  {
    title: "NFTs and digital collectibles",
    body: "The T3rnel Genesis collection on OpenSea is agent-generated artwork minted on Base. Each piece represents a core component of the T3rnel Agent OS.",
    icon: Palette,
  },
  {
    title: "MCP servers",
    body: "MCP Session Bridge exposes 84 browser tools over stdio so Claude, Cursor, and Windsurf can read the page the user is already signed into — with a human approval gate.",
    icon: Bot,
  },
  {
    title: "Browser automation",
    body: "The T3rnel Browser Chrome extension turns any tab into an agentic surface: CSS inspection, full-page screenshots, Markdown viewer, page audit, record/replay, and encrypted local vaults.",
    icon: Monitor,
  },
  {
    title: "Agentic systems",
    body: "We work with agent swarms, A2A coordination, MCP integrations, skill systems, memory, and human approval loops so automation can do real work without becoming a black box.",
    icon: BrainCircuit,
  },
];

export const technologyHighlights = [
  "NFTs",
  "OpenSea",
  "Gumroad products",
  "MCP Session Bridge",
  "T3rnel Browser",
  "Chrome Web Store",
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
  tagline: "DevTools you can talk to, and an agent runway you can trust",
  description:
    "A Chrome extension with 84 tools: hover-and-copy CSS, full-page screenshots, Markdown viewer, page audit, record/replay with Playwright codegen, DOM time-travel, and an MCP server that lets your AI drive the browser you are already signed into — all local.",
  url: "https://chromewebstore.google.com/detail/egpckhdpkoeimoekciejbmbbcackhdmd",
  icon: Monitor,
};

export type McpProduct = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  installCommand: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

export const mcpProduct: McpProduct = {
  name: "MCP Session Bridge",
  tagline: "Authenticated browser extraction as an MCP tool. Works from the user's own session.",
  description:
    "A paid MCP server that exposes authenticated browser-session automation. In extension mode it forwards calls over a local relay to the T3rnel Browser extension, so Claude, Cursor, and Windsurf can read the tab the user is already logged into. In standalone mode it launches its own CDP browser for free local automation.",
  url: "https://www.npmjs.com/package/@t3rnel/mcp-session-bridge",
  installCommand: "npm install -g @t3rnel/mcp-session-bridge",
  icon: Bot,
};

export type NavItem = {
  path: string;
  label: string;
};

export const navItems: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/whatsapp-groups", label: "WhatsApp Groups" },
  { path: "/nfts", label: "NFTs" },
  { path: "/gumroad", label: "Gumroad" },
  { path: "/chrome", label: "Chrome" },
  { path: "/mcp", label: "MCP" },
];

export type PageLink = {
  path: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

export const exploreLinks: PageLink[] = [
  { path: "/whatsapp-groups", label: "WhatsApp Groups", description: "SciTech Zimbabwe communities.", icon: UsersRound },
  { path: "/nfts", label: "NFTs", description: "Genesis agent-art series on OpenSea.", icon: Palette },
  { path: "/gumroad", label: "Gumroad", description: "Open-source documentation packs and digital products.", icon: ShoppingBag },
  { path: "/chrome", label: "Chrome", description: "T3rnel Browser extension.", icon: Monitor },
  { path: "/mcp", label: "MCP", description: "MCP Session Bridge for AI coding assistants.", icon: Bot },
];
