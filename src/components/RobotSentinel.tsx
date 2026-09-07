import { useEffect, useRef, useState } from "react";

export type RobotTarget = {
  /** screen-space x,y of the thing the robot should look at / point at */
  x: number;
  y: number;
  /** short label for the chest core display */
  label: string;
  /** accent color matching the hovered node */
  color: string;
} | null;

/**
 * A fixed-position robot sentinel.
 *
 * - Eyes track the cursor (or hovered node) via pupil transforms.
 * - Right arm raises and points toward the hovered node.
 * - Chest core display shows the hovered item's label + accent color.
 * - When idle (nothing hovered), eyes follow the mouse, arm rests.
 *
 * All tracking is done via direct DOM refs + requestAnimationFrame for
 * smooth 60fps without React re-renders.
 */
export function RobotSentinel({ target }: { target: RobotTarget }) {
  const robotRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const leftPupilRef = useRef<SVGGElement>(null);
  const rightPupilRef = useRef<SVGGElement>(null);
  const armRef = useRef<SVGGElement>(null);
  const coreRef = useRef<SVGCircleElement>(null);
  const mousePos = useRef<{ x: number; y: number } | null>(null);
  const currentTarget = useRef<RobotTarget>(null);
  const scheduleRef = useRef<(() => void) | null>(null);
  const [coreLabel, setCoreLabel] = useState("STANDBY");
  const [coreColor, setCoreColor] = useState("#19a866");

  // Track target changes for the chest core
  useEffect(() => {
    currentTarget.current = target;
    if (target) {
      setCoreLabel(target.label.toUpperCase().slice(0, 20));
      setCoreColor(target.color);
    } else {
      setCoreLabel("STANDBY");
      setCoreColor("#19a866");
    }
    scheduleRef.current?.();
  }, [target]);

  // Mouse tracking + animation loop
  useEffect(() => {
    const robot = robotRef.current;
    const svg = svgRef.current;
    if (!robot || !svg) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let raf = 0;
    let lastTime = 0;
    const pose = { x: 0, y: 0, angle: 0 };
    const schedule = () => {
      if (!raf && visible && !document.hidden) {
        raf = requestAnimationFrame(animate);
      }
    };
    const animate = (time: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const matrix = svg.getScreenCTM();
      if (!matrix) return;

      // Robot center (approximate head center for eye tracking)
      const robotCx = 80;
      const robotCy = 92; // head area

      // Determine what to look at: hovered target or mouse
      const tracked = currentTarget.current ?? (motion.matches ? null : mousePos.current);
      let focus = tracked
        ? new DOMPoint(tracked.x, tracked.y).matrixTransform(matrix.inverse())
        : { x: robotCx, y: robotCy };
      focus = {
        x: Math.max(-40, Math.min(200, focus.x)),
        y: Math.max(0, Math.min(320, focus.y)),
      };
      const dx = focus.x - robotCx;
      const dy = focus.y - robotCy;
      const dist = Math.hypot(dx, dy);
      // Clamp pupil offset to max 4px
      const maxOffset = 4;
      const pupilDx = dist > 0 ? (dx / dist) * Math.min(dist / 18, maxOffset) : 0;
      const pupilDy = dist > 0 ? (dy / dist) * Math.min(dist / 18, maxOffset) : 0;

      // Arm pointing: calculate angle from shoulder to focus point
      // Shoulder is at approx robotCx, robotCy + 80 (below head)
      const shoulderX = 130;
      const shoulderY = 164;
      const armDx = focus.x - shoulderX;
      const armDy = focus.y - shoulderY;
      const angle = Math.atan2(armDy, armDx);
      // Convert to degrees, adjust so 0 = pointing right
      const angleDeg = (angle * 180) / Math.PI;
      let desiredAngle = 0;
      // Only raise arm when there's a target; otherwise rest
      if (currentTarget.current) {
        desiredAngle = angleDeg - 90;
      } else {
        // Resting position (arm down)
        desiredAngle = 0;
      }
      const angleDelta = ((desiredAngle - pose.angle + 540) % 360 + 360) % 360 - 180;
      const blend = motion.matches ? 1 : 1 - Math.exp(-Math.min(time - (lastTime || time - 16), 64) / 65);
      pose.x += (pupilDx - pose.x) * blend;
      pose.y += (pupilDy - pose.y) * blend;
      pose.angle += angleDelta * blend;
      const settled = Math.abs(pupilDx - pose.x) < 0.01
        && Math.abs(pupilDy - pose.y) < 0.01
        && Math.abs(angleDelta * (1 - blend)) < 0.1;
      if (settled) {
        pose.x = pupilDx;
        pose.y = pupilDy;
        pose.angle = desiredAngle;
      }
      leftPupilRef.current?.setAttribute("transform", `translate(${pose.x} ${pose.y})`);
      rightPupilRef.current?.setAttribute("transform", `translate(${pose.x} ${pose.y})`);
      armRef.current?.setAttribute("transform", `rotate(${pose.angle} ${shoulderX} ${shoulderY})`);
      lastTime = settled ? 0 : time;
      if (!settled) schedule();
    };
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!motion.matches && !currentTarget.current) schedule();
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      lastTime = 0;
    };
    const onVisibilityChange = () => {
      if (document.hidden) pause();
      else schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else pause();
    }, { threshold: 0.5 });
    observer.observe(robot);
    scheduleRef.current = schedule;
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    motion.addEventListener("change", schedule);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule, true);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motion.removeEventListener("change", schedule);
      observer.disconnect();
      scheduleRef.current = null;
      pause();
    };
  }, []);

  return (
    <div className="robot-sentinel" ref={robotRef} aria-hidden="true">
      <svg ref={svgRef} viewBox="-40 0 240 320" width="180" height="240">
        <defs>
          <linearGradient id="rs-chrome" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5a625d" />
            <stop offset="38%" stopColor="#3a423d" />
            <stop offset="72%" stopColor="#1a201d" />
            <stop offset="100%" stopColor="#0a0d0b" />
          </linearGradient>
          <linearGradient id="rs-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#cfd6cf" />
            <stop offset="45%" stopColor="#5a625d" />
            <stop offset="100%" stopColor="#2a302d" />
          </linearGradient>
          <radialGradient id="rs-visor" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#0a0d0b" />
            <stop offset="100%" stopColor="#050807" />
          </radialGradient>
          {/*
            The core, taken from design-concepts/26.
            A filled sphere that is lit from its own centre, not a translucent ring drawn
            on top of the torso: bright green at the middle, deep green, then almost black
            at the rim, which is what makes it read as a light source rather than a decal.
          */}
          <radialGradient id="rs-core" cx="50%" cy="42%" r="62%">
            <stop offset="0%" stopColor="#2ad48a" />
            <stop offset="60%" stopColor="#087a48" />
            <stop offset="100%" stopColor="#032a1a" />
          </radialGradient>
          <filter id="rs-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="rs-plate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2b322e" />
            <stop offset="100%" stopColor="#141917" />
          </linearGradient>
          <radialGradient id="rs-eye" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#c8f5dc" />
            <stop offset="55%" stopColor="#19a866" />
            <stop offset="100%" stopColor="#064a2c" />
          </radialGradient>
        </defs>

        <ellipse cx="80" cy="307" rx="61" ry="7" fill="#050807" opacity="0.45" />

        {/* antenna */}
        <path d="M80 46 V29 Q80 24 85 22" fill="none" stroke="url(#rs-edge)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="86" cy="20" r="6" fill="#0a0d0b" stroke="#5a625d" />
        <circle cx="86" cy="20" r="3.5" fill="#19a866" />
        <circle cx="85" cy="19" r="1.3" fill="#c8f5dc" />

        {/* neck */}
        <rect x="67" y="126" width="26" height="24" rx="8" fill="url(#rs-edge)" stroke="#2a302d" />
        <path d="M69 135 H91 M69 140 H91" stroke="#0a0d0b" strokeWidth="2" />

        {/* head */}
        <rect x="13" y="77" width="14" height="28" rx="7" fill="url(#rs-edge)" />
        <rect x="133" y="77" width="14" height="28" rx="7" fill="url(#rs-edge)" />
        <path
          d="M49 43 Q80 38 111 43 Q140 46 140 73 V104 Q140 130 114 133 Q80 138 46 133 Q20 130 20 104 V73 Q20 46 49 43 Z"
          fill="url(#rs-chrome)"
          stroke="url(#rs-edge)"
          strokeWidth="2"
        />
        <path d="M34 64 Q37 51 53 49 Q80 45 108 49" fill="none" stroke="#cfd6cf" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
        {/* visor */}
        <path
          d="M47 65 Q80 60 113 65 Q131 68 131 85 V101 Q131 117 113 120 Q80 125 47 120 Q29 117 29 101 V85 Q29 68 47 65 Z"
          fill="url(#rs-visor)"
          stroke="#0a0d0b"
          strokeWidth="3"
        />
        <path d="M39 78 Q43 70 61 70 H103" fill="none" stroke="#cfd6cf" strokeOpacity="0.13" strokeWidth="2" strokeLinecap="round" />

        {/* eyes — pupils are updated via refs */}
        <ellipse cx="56" cy="92" rx="15" ry="16" fill="#19a866" opacity="0.07" />
        <ellipse cx="104" cy="92" rx="15" ry="16" fill="#19a866" opacity="0.07" />
        <g ref={leftPupilRef}>
          <rect x="49" y="82" width="14" height="20" rx="7" fill="url(#rs-eye)" />
          <path d="M53 86 V90" stroke="#c8f5dc" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <g ref={rightPupilRef}>
          <rect x="97" y="82" width="14" height="20" rx="7" fill="url(#rs-eye)" />
          <path d="M101 86 V90" stroke="#c8f5dc" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* mouth bar */}
        <path d="M72 109 Q80 115 88 109" fill="none" stroke="#19a866" strokeWidth="2.5" strokeLinecap="round" />

        {/* legs */}
        {[58, 102].map((x) => (
          <g key={x}>
            <rect x={x - 10} y="245" width="20" height="28" rx="9" fill="url(#rs-edge)" stroke="#2a302d" />
            <circle cx={x} cy="274" r="10" fill="#0a0d0b" stroke="#5a625d" strokeWidth="2" />
            <circle cx={x} cy="274" r="4" fill="url(#rs-edge)" />
            <rect x={x - 10} y="280" width="20" height="19" rx="7" fill="url(#rs-chrome)" stroke="#5a625d" />
            <path d={`M${x - 10} 294 Q${x - 22} 294 ${x - 22} 303 Q${x - 22} 307 ${x - 17} 307 H${x + 11} Q${x + 16} 307 ${x + 15} 301 L${x + 13} 296 Q${x + 12} 292 ${x - 10} 294 Z`} fill="url(#rs-edge)" stroke="#2a302d" />
            <path d={`M${x - 18} 307 H${x + 12}`} stroke="#0a0d0b" strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}

        {/* left arm (resting) */}
        <g>
          <circle cx="30" cy="164" r="12" fill="url(#rs-edge)" stroke="#2a302d" />
          <path d="M27 173 L20 194" stroke="#0a0d0b" strokeWidth="17" strokeLinecap="round" />
          <path d="M27 173 L20 194" stroke="url(#rs-edge)" strokeWidth="13" strokeLinecap="round" />
          <circle cx="20" cy="198" r="8" fill="#1a201d" stroke="#5a625d" />
          <path d="M20 207 L23 222" stroke="url(#rs-chrome)" strokeWidth="15" strokeLinecap="round" />
          <rect x="16" y="222" width="15" height="17" rx="7" fill="url(#rs-edge)" stroke="#2a302d" />
          <path d="M24 232 V237" stroke="#0a0d0b" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* torso */}
        <path
          d="M54 146 Q80 141 106 146 Q127 149 127 170 L119 232 Q116 253 98 256 H62 Q44 253 41 232 L33 170 Q33 149 54 146 Z"
          fill="url(#rs-chrome)"
          stroke="url(#rs-edge)"
          strokeWidth="2"
        />
        <path d="M45 165 Q46 154 61 153 H99" fill="none" stroke="#cfd6cf" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
        {/*
          The abdomen.

          The torso was one flat panel with a hairline across it and a translucent disc
          floating on top, which is why it read as a shape rather than a machine. It now
          has plating: a recessed belly panel with ribs, the core seated into it, and a
          vent below. The core itself is the sphere from the concept — lit from its own
          centre and glowing — with the hovered node's colour driving a ring and an iris
          over it rather than the whole disc, so the accent reads as an indicator on a
          machine instead of a change of material.
        */}
        <path d="M56 166 H104 Q115 166 115 180 L109 231 Q108 241 98 241 H62 Q52 241 51 231 L45 180 Q45 166 56 166 Z" fill="url(#rs-plate)" stroke="#0a0d0b" strokeOpacity="0.7" />
        {[173, 230].map((y) => (
          <path key={y} d={`M53 ${y} H107`} stroke="#0a0d0b" strokeOpacity="0.55" />
        ))}

        {/* chest core */}
        <circle cx="80" cy="200" r="35" fill="#0a0f0c" stroke="#5a625d" strokeWidth="2" />
        <circle cx="80" cy="200" r="32" fill="url(#rs-core)" filter="url(#rs-glow)" />
        <circle ref={coreRef} cx="80" cy="200" r="32" fill="none" stroke={coreColor} strokeWidth="2" />
        <circle cx="80" cy="200" r="13" fill={coreColor} fillOpacity="0.55" />
        <ellipse cx="72" cy="187" rx="9" ry="5" fill="#ffffff" opacity="0.14" transform="rotate(-30 72 187)" />

        {/* vent under the core, so the belly is plating rather than a panel */}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={64 + i * 12} y="242" width="8" height="3" rx="1.5" fill="#0a0d0b" opacity="0.75" />
        ))}

        <text
          x="80"
          y="204"
          fill="#eafff4"
          fontSize="7"
          textAnchor="middle"
          fontWeight="700"
          style={{ letterSpacing: "0.04em" }}
        >
          {coreLabel}
        </text>

        {/* right arm (points at target) — rotates from shoulder */}
        <g ref={armRef}>
          <circle cx="130" cy="164" r="12" fill="url(#rs-edge)" stroke="#2a302d" strokeWidth="1.5" />
          <rect x="122" y="169" width="16" height="23" rx="8" fill="url(#rs-chrome)" stroke="#5a625d" />
          <circle cx="130" cy="194" r="8" fill="#1a201d" stroke="#5a625d" strokeWidth="1.5" />
          <circle cx="130" cy="194" r="3" fill="url(#rs-edge)" />
          <rect x="122" y="199" width="16" height="18" rx="7" fill="url(#rs-edge)" stroke="#2a302d" />
          <circle cx="130" cy="218" r="7" fill="url(#rs-chrome)" stroke="#5a625d" />
          {/* pointing finger */}
          <path d="M130 222 V231" stroke="#cfd6cf" strokeWidth="4" strokeLinecap="round" />
          <circle cx="130" cy="231" r="2.5" fill="#9be8c4" />
        </g>
      </svg>
    </div>
  );
}
