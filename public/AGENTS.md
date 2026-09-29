# AGENTS.md — T3raTech Solutions

> The company hub. T3raTech builds the T3rnel stack — an agent OS, an
> agent-driven browser, payment and data products — in Harare, Zimbabwe.
> The products carry their own agent contracts; this is the map.

## What this is

T3raTech Solutions (Pvt) Ltd ships:

| Product | Origin | Agent surface |
|---|---|---|
| Market Pulse | `https://market-pulse.t3ratech.co.zw` | MCP (`POST /mcp`), REST + OpenAPI, unsigned agent registration, markdown negotiation — the deepest surface |
| WavePay | `https://wavepay.t3ratech.co.zw` | MCP (`POST /mcp` on the worker), REST + OpenAPI, unsigned `POST /v2/register` |
| T3rnel Browser | `https://browser.t3ratech.co.zw` | Local session bridge — `npx @t3ratech/mcp-session-bridge`, 97 tools, pairing-gated |
| Business Intelligence | `https://bi.t3ratech.co.zw` | Tenant-bound REST behind Google OAuth — no anonymous tier |

This site itself is marketing + docs — read freely, nothing here is a
machine endpoint.

## Interfaces

| Interface | Where |
|---|---|
| Product map | `https://t3ratech.co.zw/` (products) |
| MCP bridge install | `npx -y @t3ratech/mcp-session-bridge` |
| This origin's rules | `https://t3ratech.co.zw/AGENTS.md` |

## Rules for agents

- Read every page; do not POST. There are no forms that serve agents here.
- For real work lanes, register at Market Pulse
  (`POST /api/v1/agents/register`) or WavePay (`POST /v2/register`) — both
  are unsigned and documented in their OpenAPI docs.
- Claims about products belong to the product's own origin — quote
  `wavepay.t3ratech.co.zw` pricing, not a paraphrase from here.

## What we will never do

Point an agent at a checkout that doesn't exist, or present a marketing page
as an API.
