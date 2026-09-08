/**
 * Constellation node definitions for the homepage.
 *
 * Primary nodes (products / community / shop / nfts) are interactive with
 * colored popups. Keyword nodes are dim green dots that brighten when a
 * connected primary node is hovered. Hovering a primary node draws tentacle
 * lines to its connected nodes.
 *
 * Product descriptions are pulled from the real data in data.ts so the
 * homepage matches t3ratech.co.zw content exactly.
 */

import {
  chromeProduct,
  mcpProduct,
  t3rnelDocumentIntelligenceProduct,
  scitechCommunityUrl,
  gumroadProducts,
  nftSeriesList,
  technologyHighlights,
} from "./data";

export type NodeKind = "product" | "community" | "shop" | "nft" | "keyword";

export type ConstellationNode = {
  id: string;
  label: string;
  /** percentage position within the constellation container, 0–100 */
  x: number;
  y: number;
  kind: NodeKind;
  /** color for primary nodes; keywords are always green */
  color?: string;
  hasPopup: boolean;
  popup?: {
    title: string;
    tagline: string;
    description: string;
    link?: { label: string; url: string };
    /**
     * Where else this product can be had.
     *
     * A single link was enough while the extension lived in one place. It is now listed
     * on four stores, and a reader who uses Firefox should not have to find that out by
     * following a link to a page about Chrome.
     */
    links?: { label: string; url: string }[];
  };
  /** ids of nodes to draw tentacle lines to on hover */
  connections: string[];
};

/* ── colors ────────────────────────────────────────────────────────────── */

export const NODE_COLORS = {
  keyword: "#19a866",
  t3rnelBrowser: "#1d6f9f",
  mcpBridge: "#cfd6cf",
  documentIntelligence: "#d49a18",
  whatsapp: "#19a866",
  gumroad: "#cf2630",
  nfts: "#9d4edd",
} as const;

/* ── primary nodes ─────────────────────────────────────────────────────── */

const primaryNodes: ConstellationNode[] = [
  {
    id: "t3rnel-browser",
    label: "T3rnel Browser",
    x: 22,
    y: 28,
    kind: "product",
    color: NODE_COLORS.t3rnelBrowser,
    hasPopup: true,
    popup: {
      title: chromeProduct.name,
      tagline: chromeProduct.tagline,
      description: chromeProduct.description,
      link: { label: "Get the extension", url: chromeProduct.url },
      links: [
        { label: "Chrome", url: "https://chromewebstore.google.com/detail/t3rnel-browser/egpckhdpkoeimoekciejbmbbcackhdmd" },
        { label: "Edge", url: "https://microsoftedge.microsoft.com/addons/detail/t3rnel-browser/dnplmolfblplbeclnglmjamppekpbcjo" },
        { label: "Firefox", url: "https://addons.mozilla.org/en-US/firefox/addon/t3rnel-browser/" },
      ],
    },
    connections: [
      "browser-automation", "web-development", "react", "typescript",
      "playwright", "screenshots", "css-inspection", "record-replay",
      "mcp-tools", "ui-automation", "react-native", "expo",
      "integration-testing", "mcp-bridge",
    ],
  },
  {
    id: "mcp-bridge",
    label: "MCP Session Bridge",
    x: 50,
    y: 20,
    kind: "product",
    color: NODE_COLORS.mcpBridge,
    hasPopup: true,
    popup: {
      title: mcpProduct.name,
      tagline: mcpProduct.tagline,
      description: mcpProduct.description,
      link: { label: "View on npm", url: mcpProduct.url },
      links: mcpProduct.listings.filter((l) => l.label !== "npm"),
    },
    connections: [
      "t3rnel-browser", "document-intelligence",
      "mcp-tools", "a2a-protocol", "agent-skills",
      "stdio-relay", "human-approval", "secure-apis",
    ],
  },
  {
    id: "document-intelligence",
    label: "Document Intelligence",
    x: 78,
    y: 28,
    kind: "product",
    color: NODE_COLORS.documentIntelligence,
    hasPopup: true,
    popup: {
      title: t3rnelDocumentIntelligenceProduct.name,
      tagline: t3rnelDocumentIntelligenceProduct.tagline,
      description: t3rnelDocumentIntelligenceProduct.description,
      link: t3rnelDocumentIntelligenceProduct.url
        ? { label: "Open the dashboard", url: t3rnelDocumentIntelligenceProduct.url }
        : undefined,
    },
    connections: [
      "r2-storage", "d1-quota", "sqlite", "audit-chains",
      "evidence-backed", "mcp-bridge", "cloud-native",
      "serverless", "ai-provider-routing",
    ],
  },
  {
    id: "whatsapp",
    label: "WhatsApp Groups",
    x: 16,
    y: 68,
    kind: "community",
    color: NODE_COLORS.whatsapp,
    hasPopup: true,
    popup: {
      title: "SciTech Zimbabwe",
      tagline: "A national WhatsApp network for builders, traders, and makers.",
      description:
        "16 communities covering science, technology, software development, jobs, " +
        "Web3, gaming, gadgets, property, events, and business — where useful signals " +
        "travel faster than noise.",
      link: { label: "Join the network", url: scitechCommunityUrl },
    },
    connections: [
      "scitech-zw", "developers", "jobs", "web3",
      "womentech", "gadget-galaxy", "motoverse",
      "property-portal", "events-plug", "business-news",
    ],
  },
  {
    id: "gumroad",
    label: "Gumroad Shop",
    x: 46,
    y: 74,
    kind: "shop",
    color: NODE_COLORS.gumroad,
    hasPopup: true,
    popup: {
      title: "Gumroad Digital Products",
      tagline: "Reports, datasets, tools, agent packs, and lead research.",
      description:
        `${gumroadProducts.length} digital products including agent skill packs, ` +
        "templates, lead research reports, and developer tools — practical starting " +
        "points for African and global technologists.",
      link: { label: "Visit the shop", url: "https://t3rnel.gumroad.com/" },
    },
    connections: [
      "agent-skills", "templates", "reports", "datasets",
      "lead-research", "test-automation", "seo",
    ],
  },
  {
    id: "nfts",
    label: "NFTs",
    x: 80,
    y: 68,
    kind: "nft",
    color: NODE_COLORS.nfts,
    hasPopup: true,
    popup: {
      title: "T3rnel Genesis Collection",
      tagline: `${nftSeriesList.length} series of agent-generated artwork minted on Base.`,
      description:
        "Each piece represents a core component of the T3rnel Agent OS. " +
        "Agent-generated digital collectibles on the Base network, listed on OpenSea.",
      link: { label: "View on OpenSea", url: "https://opensea.io/collection/t3rnel-genesis" },
    },
    connections: [
      "opensea", "base-chain", "digital-collectibles",
      "agent-generated", "knowledge-graphs",
    ],
  },
];

/* ── keyword nodes ─────────────────────────────────────────────────────── */
/* These are positioned in clusters near their parent products but also    */
/* scattered across the field. All remain dim green.                       */

// Manually positioned keyword nodes with explicit connections to parents.
const positionedKeywords: ConstellationNode[] = [
  // T3rnel Browser cluster (left area)
  { id: "browser-automation", label: "Browser automation", x: 10, y: 18, kind: "keyword", hasPopup: false, connections: [] },
  { id: "web-development", label: "Web development", x: 14, y: 40, kind: "keyword", hasPopup: false, connections: [] },
  { id: "react", label: "React", x: 30, y: 14, kind: "keyword", hasPopup: false, connections: [] },
  { id: "typescript", label: "TypeScript", x: 32, y: 38, kind: "keyword", hasPopup: false, connections: [] },
  { id: "playwright", label: "Playwright", x: 24, y: 48, kind: "keyword", hasPopup: false, connections: [] },
  { id: "screenshots", label: "Screenshots", x: 8, y: 30, kind: "keyword", hasPopup: false, connections: [] },
  { id: "css-inspection", label: "CSS inspection", x: 34, y: 22, kind: "keyword", hasPopup: false, connections: [] },
  { id: "record-replay", label: "Record / replay", x: 16, y: 50, kind: "keyword", hasPopup: false, connections: [] },
  { id: "ui-automation", label: "UI automation", x: 12, y: 46, kind: "keyword", hasPopup: false, connections: [] },
  { id: "react-native", label: "React Native", x: 26, y: 18, kind: "keyword", hasPopup: false, connections: [] },
  { id: "expo", label: "Expo", x: 18, y: 22, kind: "keyword", hasPopup: false, connections: [] },
  { id: "integration-testing", label: "Integration testing", x: 28, y: 44, kind: "keyword", hasPopup: false, connections: [] },
  { id: "patrol", label: "Patrol", x: 20, y: 36, kind: "keyword", hasPopup: false, connections: [] },

  // MCP Bridge cluster (center)
  { id: "mcp-tools", label: "MCP tools", x: 50, y: 36, kind: "keyword", hasPopup: false, connections: [] },
  { id: "a2a-protocol", label: "A2A protocol", x: 58, y: 30, kind: "keyword", hasPopup: false, connections: [] },
  { id: "agent-skills", label: "Agent skills", x: 42, y: 38, kind: "keyword", hasPopup: false, connections: [] },
  { id: "stdio-relay", label: "Stdio relay", x: 48, y: 44, kind: "keyword", hasPopup: false, connections: [] },
  { id: "human-approval", label: "Human approval gates", x: 55, y: 42, kind: "keyword", hasPopup: false, connections: [] },
  { id: "secure-apis", label: "Secure APIs", x: 46, y: 30, kind: "keyword", hasPopup: false, connections: [] },

  // Document Intelligence cluster (right area)
  { id: "r2-storage", label: "R2 storage", x: 88, y: 18, kind: "keyword", hasPopup: false, connections: [] },
  { id: "d1-quota", label: "D1 quota tracking", x: 92, y: 36, kind: "keyword", hasPopup: false, connections: [] },
  { id: "sqlite", label: "SQLite", x: 85, y: 42, kind: "keyword", hasPopup: false, connections: [] },
  { id: "audit-chains", label: "Audit chains", x: 72, y: 42, kind: "keyword", hasPopup: false, connections: [] },
  { id: "evidence-backed", label: "Evidence-backed", x: 90, y: 48, kind: "keyword", hasPopup: false, connections: [] },
  { id: "cloud-native", label: "Cloud-native APIs", x: 82, y: 36, kind: "keyword", hasPopup: false, connections: [] },
  { id: "serverless", label: "Serverless systems", x: 76, y: 48, kind: "keyword", hasPopup: false, connections: [] },
  { id: "ai-provider-routing", label: "AI provider routing", x: 86, y: 30, kind: "keyword", hasPopup: false, connections: [] },

  // WhatsApp cluster (bottom-left)
  { id: "scitech-zw", label: "SciTech Zimbabwe", x: 5, y: 58, kind: "keyword", hasPopup: false, connections: [] },
  { id: "developers", label: "Zim Developers", x: 8, y: 76, kind: "keyword", hasPopup: false, connections: [] },
  { id: "jobs", label: "SciTech Jobs", x: 22, y: 78, kind: "keyword", hasPopup: false, connections: [] },
  { id: "web3", label: "Web3 & Crypto", x: 28, y: 70, kind: "keyword", hasPopup: false, connections: [] },
  { id: "womentech", label: "WomenTech ZW", x: 5, y: 84, kind: "keyword", hasPopup: false, connections: [] },
  { id: "gadget-galaxy", label: "Gadget Galaxy", x: 24, y: 62, kind: "keyword", hasPopup: false, connections: [] },
  { id: "motoverse", label: "MotoVerse", x: 10, y: 64, kind: "keyword", hasPopup: false, connections: [] },
  { id: "property-portal", label: "Property Portal", x: 26, y: 86, kind: "keyword", hasPopup: false, connections: [] },
  { id: "events-plug", label: "Events Plug", x: 12, y: 88, kind: "keyword", hasPopup: false, connections: [] },
  { id: "business-news", label: "Business & News", x: 20, y: 72, kind: "keyword", hasPopup: false, connections: [] },

  // Gumroad cluster (bottom-center)
  { id: "templates", label: "Templates", x: 38, y: 86, kind: "keyword", hasPopup: false, connections: [] },
  { id: "reports", label: "Reports", x: 52, y: 82, kind: "keyword", hasPopup: false, connections: [] },
  { id: "datasets", label: "Datasets", x: 48, y: 88, kind: "keyword", hasPopup: false, connections: [] },
  { id: "lead-research", label: "Lead research", x: 56, y: 78, kind: "keyword", hasPopup: false, connections: [] },
  { id: "test-automation", label: "Test automation", x: 42, y: 80, kind: "keyword", hasPopup: false, connections: [] },
  { id: "seo", label: "SEO metadata", x: 54, y: 88, kind: "keyword", hasPopup: false, connections: [] },

  // NFTs cluster (bottom-right)
  { id: "opensea", label: "OpenSea", x: 88, y: 58, kind: "keyword", hasPopup: false, connections: [] },
  { id: "base-chain", label: "Base network", x: 92, y: 74, kind: "keyword", hasPopup: false, connections: [] },
  { id: "digital-collectibles", label: "Digital collectibles", x: 72, y: 78, kind: "keyword", hasPopup: false, connections: [] },
  { id: "agent-generated", label: "Agent-generated", x: 85, y: 82, kind: "keyword", hasPopup: false, connections: [] },
];

/* ── remaining tech keywords scattered across the field ────────────────── */
/* These come from technologyHighlights and aren't tied to a specific       */
/* product. They exist for keyword presence on the homepage.                */

const usedKeywordIds = new Set(positionedKeywords.map((n) => n.id));
const extraTechKeywords = technologyHighlights.filter(
  (kw) => !usedKeywordIds.has(kw.toLowerCase().replace(/[^a-z0-9]/g, "-")),
);

// Pseudo-random but deterministic positions for the extra keywords.
function scatterPositions(count: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < count; i++) {
    positions.push({
      x: 6 + rand() * 88,
      y: 8 + rand() * 84,
    });
  }
  return positions;
}

const scatteredPositions = scatterPositions(extraTechKeywords.length);
const scatteredKeywords: ConstellationNode[] = extraTechKeywords.map((kw, i) => ({
  id: kw.toLowerCase().replace(/[^a-z0-9]/g, "-"),
  label: kw,
  x: scatteredPositions[i].x,
  y: scatteredPositions[i].y,
  kind: "keyword",
  hasPopup: false,
  connections: [],
}));

/* ── export ────────────────────────────────────────────────────────────── */

export const primaryNodeIds = primaryNodes.map((n) => n.id);

// Extra tech keywords must not reuse primary node ids or existing keyword ids,
// otherwise they overwrite real product nodes in the id lookup map.
const reservedKeywordIds = new Set<string>([...primaryNodeIds, ...positionedKeywords.map((n) => n.id)]);
const dedupedScatteredKeywords = scatteredKeywords.filter((n) => !reservedKeywordIds.has(n.id));

export const constellationNodes: ConstellationNode[] = [
  ...primaryNodes,
  ...positionedKeywords,
  ...dedupedScatteredKeywords,
];

export const nodeById = new Map(constellationNodes.map((n) => [n.id, n]));
