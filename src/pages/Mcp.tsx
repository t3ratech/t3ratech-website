import { useEffect } from "react";
import { ArrowUpRight, Bot, Check, Terminal, ShieldCheck, Globe2 } from "lucide-react";
import { mcpProduct } from "../data";

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
            MCP Session Bridge serves MCP over stdio to Claude Desktop, Cursor, Windsurf, and any MCP client.
            It uses a dual-transport design:
          </p>
          <ul className="chrome-feature-list">
            <li>
              <ShieldCheck size={18} strokeWidth={2.2} />
              <strong>Extension mode (paid)</strong> — forwards calls over a local, owner-only relay socket to a native messaging host that Chrome spawns, then to the T3rnel Browser extension, which executes them against your real logged-in tabs.
            </li>
            <li>
              <Globe2 size={18} strokeWidth={2.2} />
              <strong>Standalone mode (free)</strong> — launches its own headful or headless CDP browser on a persistent profile. No licence, no extension, no access to your everyday browser.
            </li>
          </ul>

          <h3>Install</h3>
          <pre className="mcp-install">
            <code>{mcpProduct.installCommand}</code>
          </pre>
          <p className="chrome-description">
            Then run <code>mcp-session-bridge --install</code> to register the native-messaging host for Chrome, Chromium, Brave, and Edge.
          </p>

          <h3>Configure</h3>
          <p className="chrome-description">
            Add to your MCP client config (Claude Desktop, Cursor, Windsurf, or any MCP settings):
          </p>
          <pre className="mcp-install">
            <code>{`{
  "mcpServers": {
    "t3rnel-session": {
      "command": "mcp-session-bridge",
      "env": { "T3RNEL_SESSION_MODE": "auto" }
    }
  }
}`}</code>
          </pre>

          <h3>Tools included</h3>
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
            Other MCP tools can only read public pages. MCP Session Bridge uses the T3rnel Chrome extension to extract
            data from the tab the user is already logged into. Great for pulling account details into an AI workflow,
            filling forms from existing page state, and building context-aware agents without sending cookies to a cloud browser.
          </p>

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
