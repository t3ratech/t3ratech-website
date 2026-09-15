import { useEffect } from "react";
import { ArrowUpRight, Bot, Check, Terminal, ShieldCheck, Globe2 } from "lucide-react";
import { SUPPORTED_MCP_CLIENTS, chromeProduct, mcpProduct } from "../data";

export function Mcp() {
  useEffect(() => {
    document.title = "MCP Session Bridge | T3rnel Browser Tools";
  }, []);

  const Icon = mcpProduct.icon;

  return (
    <section className="store-section page-section mcp-section" aria-labelledby="mcp-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">MCP server</p>
          <h2 id="mcp-title">{mcpProduct.name}</h2>
          <p className="technology-lead">{mcpProduct.tagline}</p>
          <p className="chrome-description">{mcpProduct.description}</p>
          <p className="chrome-description">
            It pairs with the{" "}
            <a href={chromeProduct.url} target="_blank" rel="noreferrer">
              T3rnel Browser extension
            </a>
            , which gives these tools access to the browser you are already signed into.
          </p>
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
            MCP Session Bridge serves MCP over stdio to {SUPPORTED_MCP_CLIENTS}.
            It uses a dual-transport design:
          </p>
          <ul className="chrome-feature-list">
            <li>
              <ShieldCheck size={18} strokeWidth={2.2} />
              <strong>Extension mode</strong> — the bridge serves a loopback WebSocket that the T3rnel Browser extension dials out to, then executes calls against your real logged-in tabs. Pairing is a single &ldquo;Approve connection&rdquo; card in the extension's side panel on first connect, and it covers every MCP action permanently. The bridge itself is free; the Pro tools it can reach are gated by the extension's own licence. On extension or bridge builds older than 1.3.0 it still works through the legacy native-messaging host.
            </li>
            <li>
              <Globe2 size={18} strokeWidth={2.2} />
              <strong>Standalone mode (free)</strong> — launches its own headful or headless CDP browser on a persistent profile. No licence, no extension, no access to your everyday browser.
            </li>
          </ul>

          <h3>Install</h3>
          <p className="chrome-description">
            There is nothing to install — bridge 1.3.0 runs through npx. Point your MCP client at:
          </p>
          <pre className="mcp-install">
            <code>{mcpProduct.installCommand}</code>
          </pre>
          <p className="chrome-description">
            With AI/MCP automation allowed — the extension's default — the first connection is approved automatically:
            no pairing prompt, and no per-action prompts ever. Arming the approval gate in the extension's Settings is
            what brings back a one-time &ldquo;Approve connection&rdquo; card for new bridges. The old{" "}
            <code className="mcp-install-cmd">mcp-session-bridge --install</code> native-messaging flow remains only
            as a legacy fallback for extensions and bridges older than 1.3.0.
          </p>

          <h3>Configure</h3>
          <p className="chrome-description">
            Add to your MCP client config ({SUPPORTED_MCP_CLIENTS}):
          </p>
          <pre className="mcp-install">
            <code>{`{
  "mcpServers": {
    "t3rnel-session": {
      "command": "npx",
      "args": ["-y", "@t3ratech/mcp-session-bridge"],
      "env": { "T3RNEL_SESSION_MODE": "auto" }
    }
  }
}`}</code>
          </pre>

          <h3>Tools included</h3>
          <p className="chrome-description">
            The listing exposes 95 tools: 94 of the extension's 97 browser tools — three licence-maintenance tools
            stay panel-only — plus <code className="mcp-install-cmd">session_install</code>, the bridge's own setup
            tool. 14 of them also run in standalone mode, before the extension is installed.
          </p>
          <ul className="chrome-feature-list">
            <li><Check size={16} strokeWidth={2.2} /> session_health — extension health and available browser APIs</li>
            <li><Check size={16} strokeWidth={2.2} /> session_list_tabs — open tabs with ids, titles, URLs</li>
            <li><Check size={16} strokeWidth={2.2} /> session_navigate — navigate a tab to a URL</li>
            <li><Check size={16} strokeWidth={2.2} /> session_snapshot — semantic snapshot with interactive element refs</li>
            <li><Check size={16} strokeWidth={2.2} /> session_read_page — full page content of an authenticated page</li>
            <li><Check size={16} strokeWidth={2.2} /> session_click / session_fill / session_type / session_press</li>
            <li><Check size={16} strokeWidth={2.2} /> session_evaluate — run JavaScript in the page context</li>
            <li><Check size={16} strokeWidth={2.2} /> session_screenshot — visible-area screenshot, PNG or JPEG</li>
            <li><Check size={16} strokeWidth={2.2} /> session_wait — wait for load, URL, or selector</li>
          </ul>

          <h3>Why this matters</h3>
          <p className="chrome-description">
            Other MCP tools can only read public pages. MCP Session Bridge uses the T3rnel Browser extension to extract
            data from the tab the user is already logged into. Great for pulling account details into an AI workflow,
            filling forms from existing page state, and building context-aware agents without sending cookies to a cloud browser.
          </p>

          <h3>The skill</h3>
          <p className="chrome-description">{mcpProduct.skill.summary}</p>
          <p className="chrome-description">
            <a href={mcpProduct.skill.url} target="_blank" rel="noreferrer">
              {mcpProduct.skill.name}
            </a>{" "}
            is published beside the server, so the tool names and counts it quotes are
            covered by that repository's tests. It is also on{" "}
            <a href={mcpProduct.skill.registryUrl} target="_blank" rel="noreferrer">Smithery</a>.
          </p>

          <h3>Source and listings</h3>
          <p className="chrome-description">
            The bridge is source-available — the same source the npm package ships. The
            T3rnel Browser extension it connects to is closed source and ships through the
            browser stores.
          </p>
          <ul className="chrome-feature-list">
            {mcpProduct.listings.map((listing) => (
              <li key={listing.url}>
                <Check size={16} strokeWidth={2.2} />
                <a href={listing.url} target="_blank" rel="noreferrer">{listing.label}</a>
              </li>
            ))}
          </ul>

          <a
            className="button store-button chrome-button"
            href={mcpProduct.url}
            target="_blank"
            rel="noreferrer"
          >
            View on npm
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </section>
  );
}
