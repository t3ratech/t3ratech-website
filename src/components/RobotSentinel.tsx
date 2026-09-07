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
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const armRef = useRef<SVGGElement>(null);
  const coreRef = useRef<SVGCircleElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentTarget = useRef<RobotTarget>(null);
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
  }, [target]);

  // Mouse tracking + animation loop
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let raf = 0;
    const animate = () => {
      const robot = robotRef.current;
      if (!robot) {
        raf = requestAnimationFrame(animate);
        return;
      }

      const rect = robot.getBoundingClientRect();
      // Robot center (approximate head center for eye tracking)
      const robotCx = rect.left + rect.width * 0.5;
      const robotCy = rect.top + rect.height * 0.25; // head area

      // Determine what to look at: hovered target or mouse
      const focus = currentTarget.current ?? {
        x: mousePos.current.x,
        y: mousePos.current.y,
        label: "",
        color: "#19a866",
      };

      const dx = focus.x - robotCx;
      const dy = focus.y - robotCy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Clamp pupil offset to max 4px
      const maxOffset = 4;
      const pupilDx = dist > 0 ? (dx / dist) * maxOffset : 0;
      const pupilDy = dist > 0 ? (dy / dist) * maxOffset : 0;

      if (leftPupilRef.current) {
        leftPupilRef.current.setAttribute("cx", String(56 + pupilDx));
        leftPupilRef.current.setAttribute("cy", String(92 + pupilDy));
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.setAttribute("cx", String(104 + pupilDx));
        rightPupilRef.current.setAttribute("cy", String(92 + pupilDy));
      }

      // Arm pointing: calculate angle from shoulder to focus point
      // Shoulder is at approx robotCx, robotCy + 80 (below head)
      const shoulderX = rect.left + rect.width * 0.5;
      const shoulderY = rect.top + rect.height * 0.42;
      const armDx = focus.x - shoulderX;
      const armDy = focus.y - shoulderY;
      const angle = Math.atan2(armDy, armDx);
      // Convert to degrees, adjust so 0 = pointing right
      const angleDeg = (angle * 180) / Math.PI;

      if (armRef.current) {
        // Only raise arm when there's a target; otherwise rest
        if (currentTarget.current) {
          armRef.current.style.transform = `rotate(${angleDeg + 90}deg)`;
          armRef.current.style.opacity = "1";
        } else {
          // Resting position (arm down)
          armRef.current.style.transform = `rotate(100deg)`;
          armRef.current.style.opacity = "0.7";
        }
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="robot-sentinel" ref={robotRef} aria-hidden="true">
      <svg viewBox="0 0 160 320" width="120" height="240">
        <defs>
          <linearGradient id="rs-chrome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a423d" />
            <stop offset="50%" stopColor="#1a201d" />
            <stop offset="100%" stopColor="#0a0d0b" />
          </linearGradient>
          <linearGradient id="rs-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5a625d" />
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
            <feGaussianBlur stdDeviation="6" result="b" />
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

        {/* antenna */}
        <line x1="80" y1="44" x2="80" y2="20" stroke="#3a423d" strokeWidth="3" />
        <circle cx="80" cy="16" r="5" fill="#19a866" />
        <circle cx="80" cy="16" r="2.5" fill="#c8f5dc" />

        {/* head */}
        <path
          d="M28 52 L132 52 L140 64 L140 120 L128 132 L32 132 L20 120 L20 64 Z"
          fill="url(#rs-chrome)"
          stroke="url(#rs-edge)"
          strokeWidth="1.5"
        />
        {/* visor */}
        <path
          d="M28 70 L132 70 L136 78 L136 108 L128 116 L32 116 L24 108 L24 78 Z"
          fill="url(#rs-visor)"
          stroke="#0a0d0b"
          strokeWidth="1"
        />
        <line x1="28" y1="70" x2="132" y2="70" stroke="#19a866" strokeOpacity="0.5" strokeWidth="1" />

        {/* eyes — pupils are updated via refs */}
        <ellipse cx="56" cy="92" rx="14" ry="10" fill="#050807" />
        <ellipse cx="104" cy="92" rx="14" ry="10" fill="#050807" />
        <circle ref={leftPupilRef} cx="56" cy="92" r="6" fill="url(#rs-eye)" />
        <circle ref={rightPupilRef} cx="104" cy="92" r="6" fill="url(#rs-eye)" />
        <circle cx="54" cy="90" r="2" fill="#fff" opacity="0.9" />
        <circle cx="102" cy="90" r="2" fill="#fff" opacity="0.9" />

        {/* mouth bar */}
        <rect x="48" y="124" width="64" height="4" rx="2" fill="#050807" />
        <rect x="48" y="124" width="44" height="4" rx="2" fill="#19a866" />

        {/* neck */}
        <rect x="68" y="132" width="24" height="12" fill="url(#rs-chrome)" stroke="#2a302d" strokeWidth="1" />

        {/* torso */}
        <path
          d="M24 144 L136 144 L148 160 L148 250 L136 266 L24 266 L12 250 L12 160 Z"
          fill="url(#rs-chrome)"
          stroke="url(#rs-edge)"
          strokeWidth="1.5"
        />
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
        <rect x="26" y="164" width="108" height="86" rx="10" fill="url(#rs-plate)" stroke="#0a0d0b" strokeOpacity="0.7" strokeWidth="1" />
        {[172, 236].map((y) => (
          <line key={y} x1="34" y1={y} x2="126" y2={y} stroke="#0a0d0b" strokeOpacity="0.55" strokeWidth="1" />
        ))}

        {/* chest core */}
        <circle cx="80" cy="200" r="35" fill="#0a0f0c" stroke="#0a0d0b" strokeWidth="2" />
        <circle cx="80" cy="200" r="32" fill="url(#rs-core)" filter="url(#rs-glow)" />
        <circle
          ref={coreRef}
          cx="80"
          cy="200"
          r="32"
          fill="none"
          stroke={coreColor}
          strokeWidth="2"
          style={{ transition: "stroke 0.3s" }}
        />
        <circle
          cx="80"
          cy="200"
          r="13"
          fill={coreColor}
          fillOpacity="0.55"
          style={{ transition: "fill 0.3s" }}
        />
        <circle cx="72" cy="190" r="5" fill="#ffffff" opacity="0.14" />

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

        {/* left arm (resting) */}
        <path d="M12 160 L0 165 L0 240 L12 245" fill="url(#rs-chrome)" stroke="#2a302d" strokeWidth="1" />

        {/* right arm (points at target) — rotates from shoulder */}
        <g ref={armRef} style={{ transformOrigin: "148px 165px", transition: "transform 0.15s ease-out, opacity 0.3s" }}>
          <circle cx="148" cy="165" r="9" fill="url(#rs-chrome)" stroke="#3a423d" strokeWidth="1.5" />
          <line x1="148" y1="165" x2="148" y2="100" stroke="url(#rs-chrome)" strokeWidth="14" strokeLinecap="round" />
          <circle cx="148" cy="100" r="7" fill="url(#rs-edge)" stroke="#3a423d" strokeWidth="1.5" />
          {/* pointing finger */}
          <line x1="148" y1="100" x2="148" y2="82" stroke="#cfd6cf" strokeWidth="4" strokeLinecap="round" />
          <circle cx="148" cy="80" r="3" fill="#9be8c4" />
        </g>

        {/* legs */}
        <path d="M40 266 L36 300 L44 300 L52 266" fill="url(#rs-chrome)" stroke="#2a302d" strokeWidth="1" />
        <path d="M68 266 L92 266 L96 300 L64 300 Z" fill="url(#rs-chrome)" stroke="#2a302d" strokeWidth="1" />
        <path d="M108 266 L116 266 L124 300 L116 300 Z" fill="url(#rs-chrome)" stroke="#2a302d" strokeWidth="1" />
        <ellipse cx="40" cy="302" rx="12" ry="5" fill="#0a0d0b" />
        <ellipse cx="80" cy="302" rx="12" ry="5" fill="#0a0d0b" />
        <ellipse cx="120" cy="302" rx="12" ry="5" fill="#0a0d0b" />
      </svg>
    </div>
  );
}
