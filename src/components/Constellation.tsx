import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  constellationNodes,
  nodeById,
  primaryNodeIds,
  type ConstellationNode,
} from "../constellationData";
import type { RobotTarget } from "./RobotSentinel";

/**
 * The homepage constellation.
 *
 * - Primary nodes (products/community/shop/nfts) are colored, interactive,
 *   and show popups on hover.
 * - Keyword nodes are dim green dots that brighten when a connected primary
 *   is hovered.
 * - Hovering a primary node draws tentacle lines to its connections.
 * - MCP Session Bridge shows a popup too, with install and listing links.
 * - Reports the hovered node's screen position to the parent so the
 *   RobotSentinel can track it.
 */
export function Constellation({
  onHoverChange,
}: {
  onHoverChange: (target: RobotTarget) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hoveredNode = hoveredId ? nodeById.get(hoveredId) ?? null : null;

  // Set of node ids that are connected to the hovered node (for highlighting)
  const connectedIds = useMemo(() => {
    if (!hoveredNode) return new Set<string>();
    return new Set(hoveredNode.connections);
  }, [hoveredNode]);

  // Edges to draw when a node is hovered
  const activeEdges = useMemo(() => {
    if (!hoveredNode) return [];
    return hoveredNode.connections
      .map((targetId) => {
        const target = nodeById.get(targetId);
        if (!target) return null;
        return { from: hoveredNode, to: target };
      })
      .filter((e): e is { from: ConstellationNode; to: ConstellationNode } => e !== null);
  }, [hoveredNode]);

  const handleNodeEnter = useCallback(
    (node: ConstellationNode) => {
      setHoveredId(node.id);
      // Report screen position to robot
      const el = document.getElementById(`node-${node.id}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        onHoverChange({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          label: node.label,
          color: node.color ?? "#19a866",
        });
      }
    },
    [onHoverChange],
  );

  const handleNodeLeave = useCallback(() => {
    setHoveredId(null);
    onHoverChange(null);
  }, [onHoverChange]);

  // For touch devices: tap to toggle hover
  const handleNodeClick = useCallback(
    (node: ConstellationNode) => {
      if (hoveredId === node.id) {
        handleNodeLeave();
      } else {
        handleNodeEnter(node);
      }
    },
    [hoveredId, handleNodeEnter, handleNodeLeave],
  );

  useEffect(() => {
    if (!hoveredId) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !document.getElementById(`node-${hoveredId}`)?.contains(event.target)) {
        handleNodeLeave();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [hoveredId, handleNodeLeave]);

  return (
    <div className="constellation" ref={containerRef}>
      {/* SVG layer for edges — uses vector-effect:non-scaling-stroke so lines
          stay 1.5px regardless of the viewBox stretch */}
      <svg className="constellation-edges" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* faint base edges between primary nodes */}
        <g className="base-edges" stroke="#19a866" strokeOpacity="0.1">
          {primaryNodeIds.map((id, i) =>
            primaryNodeIds.slice(i + 1).map((id2) => {
              const a = nodeById.get(id);
              const b = nodeById.get(id2);
              if (!a || !b) return null;
              return (
                <line
                  key={`${id}-${id2}`}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              );
            }),
          )}
        </g>
        {/* active tentacle edges */}
        {activeEdges.map((edge) => (
          <line
            key={`${edge.from.id}-${edge.to.id}`}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            stroke={edge.from.color ?? "#19a866"}
            strokeWidth="2.5"
            strokeOpacity="0.95"
            strokeLinecap="round"
            className="tentacle-edge"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Node layer */}
      <div className="constellation-nodes">
        {constellationNodes.map((node) => {
          const isPrimary = node.kind !== "keyword";
          const isHovered = node.id === hoveredId;
          const isConnected = connectedIds.has(node.id);
          const isDimmed = hoveredId !== null && !isHovered && !isConnected;

          return (
            <div
              key={node.id}
              id={`node-${node.id}`}
              className={`constellation-node ${node.kind} ${
                isHovered ? "hovered" : ""
              } ${isConnected ? "connected" : ""} ${isDimmed ? "dimmed" : ""}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                "--node-color": node.color ?? "var(--green)",
              } as React.CSSProperties}
              onPointerEnter={(event) => event.pointerType === "mouse" && isPrimary && handleNodeEnter(node)}
              onPointerLeave={(event) =>
                event.pointerType === "mouse" &&
                isPrimary &&
                !(event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) &&
                handleNodeLeave()
              }
              onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && handleNodeLeave()}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.stopPropagation();
                  handleNodeLeave();
                  event.currentTarget.querySelector("button")?.focus();
                }
              }}
            >
              {isPrimary ? (
                <button
                  className="node-trigger"
                  id={`trigger-${node.id}`}
                  type="button"
                  aria-expanded={node.hasPopup ? isHovered : undefined}
                  aria-controls={node.hasPopup ? `popup-${node.id}` : undefined}
                  onClick={(event) => {
                    if (event.detail === 0 || window.matchMedia("(hover: none)").matches) handleNodeClick(node);
                    else handleNodeEnter(node);
                  }}
                >
                  <span className="node-dot" aria-hidden="true" />
                  <span className="node-label">{node.label}</span>
                </button>
              ) : (
                <>
                  <span className="node-dot" />
                  <span className="node-label">{node.label}</span>
                </>
              )}
              {node.hasPopup && node.popup && isHovered && (
                <div
                  /*
                   * Popups open to the left of their node by default, which walks a
                   * popup on a left-hand node straight across the divider and over the
                   * brand column. A node in the left third opens to its right instead,
                   * so the panel stays inside the mesh it belongs to.
                   */
                  className={`node-popup ${node.x < 34 ? "opens-right" : ""} ${node.y < 40 ? "opens-below" : ""} ${node.x >= 34 && node.x < 66 ? "centered" : ""}`}
                  id={`popup-${node.id}`}
                  role="region"
                  aria-labelledby={`trigger-${node.id}`}
                  style={{ "--popup-color": node.color } as React.CSSProperties}
                >
                  <div className="popup-title">{node.popup.title}</div>
                  <div className="popup-tagline">{node.popup.tagline}</div>
                  <div className="popup-desc">{node.popup.description}</div>
                  {node.popup.link && (
                    <a
                      href={node.popup.link.url}
                      target={node.popup.link.url.startsWith("/") ? undefined : "_blank"}
                      rel={node.popup.link.url.startsWith("/") ? undefined : "noreferrer"}
                      className="popup-link"
                    >
                      {node.popup.link.label} →
                    </a>
                  )}
                  {node.popup.links && node.popup.links.length > 0 && (
                    <div className="popup-stores">
                      {node.popup.links.map((store) => (
                        <a
                          key={store.url}
                          href={store.url}
                          target="_blank"
                          rel="noreferrer"
                          className="popup-store"
                        >
                          {store.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/*
        The same products, on a screen with no hover.

        A constellation is a hover surface: on a phone there is no pointer, the nodes are
        too small to hit, and a tentacle drawn to a node nobody can reach is decoration.
        So the small-screen layout drops the mesh entirely and renders what the popups say
        as cards that are already open — the information the hover was there to reveal,
        without the interaction that cannot happen.
      */}
      <div className="constellation-cards">
        {constellationNodes
          .filter((node) => node.hasPopup && node.popup)
          .map((node) => (
            <article
              key={node.id}
              className="constellation-card"
              style={{ "--popup-color": node.color } as React.CSSProperties}
            >
              <h3>{node.popup!.title}</h3>
              <p className="constellation-card-tagline">{node.popup!.tagline}</p>
              <p className="constellation-card-desc">{node.popup!.description}</p>
              {node.popup!.link && (
                <a
                  href={node.popup!.link.url}
                  target={node.popup!.link.url.startsWith("/") ? undefined : "_blank"}
                  rel={node.popup!.link.url.startsWith("/") ? undefined : "noreferrer"}
                  className="popup-link"
                >
                  {node.popup!.link.label} →
                </a>
              )}
              {node.popup!.links && node.popup!.links.length > 0 && (
                <div className="popup-stores">
                  {node.popup!.links.map((store) => (
                    <a key={store.url} href={store.url} target="_blank" rel="noreferrer" className="popup-store">
                      {store.label}
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
      </div>
    </div>
  );
}
