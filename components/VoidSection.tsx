"use client";

/**
 * VoidSection — perspective tunnel effect.
 *
 * Visual: looking into an elevator shaft.  Dots sit at intersections of an
 * imaginary 3-D grid receding to a vanishing point at canvas center.
 *   • Far dots  → tiny (< 1 px radius), packed near screen center
 *   • Close dots → large (8–14 px radius), near screen edges
 *   • Size is 100 % depth-driven: radius = BASE_RADIUS * (FOCAL / z)
 *   • Scrolling pushes the viewer forward — far dots grow and drift outward
 *   • Auto-animation (constant slow forward drift) even without scrolling
 *   • Dots recycle to the back when they pass MIN_Z — no pop/flash
 *
 * Canvas 2D, no Three.js.  rAF paused by IntersectionObserver when offscreen.
 *
 * Used in:
 *   /new   — bridge section ("Different problem?")
 *   /ai-map — DirectProblem ("Your operation is leaking money")
 */

import {
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";

// ── Constants ────────────────────────────────────────────────────────────────

const FOCAL        = 350;   // focal length — controls apparent FOV
const NUM_DOTS     = 280;   // total dots in the tunnel
const MIN_Z        = 2;     // recycle threshold (dot has "passed" the viewer)
const MAX_Z        = 900;   // max depth (invisible at this distance)
const BASE_RADIUS  = 2.2;   // dot radius when z === FOCAL (reference depth)
const SPREAD       = 0.85;  // x/y spread multiplier relative to FOCAL
const AUTO_SPEED   = 0.5;   // z units/frame constant forward movement
const SCROLL_SPEED = 3.0;   // extra z units consumed per pixel of downward scroll

// ── Dot type ─────────────────────────────────────────────────────────────────

interface Dot {
  x: number; // world-space x (centered at 0)
  y: number; // world-space y (centered at 0)
  z: number; // depth (positive = away from viewer; MIN_Z → MAX_Z)
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function randomX(cw: number): number {
  return (Math.random() - 0.5) * 2 * FOCAL * SPREAD * (cw / FOCAL);
}

function randomY(cw: number, ch: number): number {
  return (Math.random() - 0.5) * 2 * FOCAL * SPREAD * (ch / FOCAL);
}

/** Non-uniform z distribution: slightly more dots at medium depth than extreme far. */
function randomZ(): number {
  return MIN_Z + Math.pow(Math.random(), 0.7) * (MAX_Z - MIN_Z);
}

function initDots(cw: number, ch: number): Dot[] {
  return Array.from({ length: NUM_DOTS }, () => ({
    x: randomX(cw),
    y: randomY(cw, ch),
    z: randomZ(),
  }));
}

// ── Component ─────────────────────────────────────────────────────────────────

interface VoidSectionProps {
  children: ReactNode;
  className?: string;
  minHeight?: string;
}

export default function VoidSection({
  children,
  className = "",
  minHeight = "70vh",
}: VoidSectionProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const dotsRef     = useRef<Dot[]>([]);
  const rafRef      = useRef<number>(0);
  const runningRef  = useRef(false);
  const scrollYRef  = useRef(0);   // last known scrollY (read in rAF, not handler)
  const prevScrollY = useRef(0);   // scrollY of previous frame

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;

    // ── Size canvas to section ───────────────────────────────────────────────
    let cw = 0, ch = 0;

    const resize = () => {
      cw = section.offsetWidth;
      ch = section.offsetHeight;
      canvas.width  = cw;
      canvas.height = ch;
      // Dots keep their world-space x/y/z — projection re-adapts automatically
    };
    resize();

    // ── Initialise dots ──────────────────────────────────────────────────────
    dotsRef.current = initDots(cw, ch);

    // ── Recycle a single dot to the back ─────────────────────────────────────
    const recycle = (dot: Dot) => {
      dot.z = MAX_Z * (0.6 + Math.random() * 0.4); // back-to-mid range
      dot.x = randomX(cw);
      dot.y = randomY(cw, ch);
    };

    // ── Draw frame ────────────────────────────────────────────────────────────
    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx || cw === 0 || ch === 0) return;

      // Scroll delta (computed here in the rAF, not in the scroll handler)
      const curScroll = scrollYRef.current;
      const scrollDelta = Math.max(0, curScroll - prevScrollY.current);
      prevScrollY.current = curScroll;

      // Advance all dots toward the viewer
      const advance = AUTO_SPEED + scrollDelta * SCROLL_SPEED;

      ctx.clearRect(0, 0, cw, ch);

      const cx = cw / 2;
      const cy = ch / 2;

      for (const dot of dotsRef.current) {
        dot.z -= advance;

        // Recycle dots that have passed the viewer
        if (dot.z < MIN_Z) {
          recycle(dot);
        }

        const scale  = FOCAL / dot.z;
        const sx     = dot.x * scale + cx;
        const sy     = dot.y * scale + cy;
        const radius = BASE_RADIUS * scale;

        // Skip invisible dots
        if (radius < 0.3) continue;
        if (sx < -20 || sx > cw + 20 || sy < -20 || sy > ch + 20) continue;

        // Opacity: bright when close (small z), faint when far (large z)
        const opacity = Math.pow(1 - dot.z / MAX_Z, 1.4) * 0.92;

        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity.toFixed(3)})`;
        ctx.fill();
      }
    };

    // ── rAF loop ─────────────────────────────────────────────────────────────
    const loop = () => {
      if (!runningRef.current) return;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    // ── IntersectionObserver — pause when offscreen ───────────────────────────
    const io = new IntersectionObserver(
      ([entry]) => {
        runningRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          prevScrollY.current = window.scrollY; // reset delta on re-entry
          rafRef.current = requestAnimationFrame(loop);
        } else {
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0 }
    );
    io.observe(section);

    // ── Passive scroll listener — update ref only; delta computed in rAF ─────
    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      resize();
      // Dots' world-space coords stay; perspective projection adapts naturally
    };
    window.addEventListener("resize", onResize, { passive: true });

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const sectionStyle: CSSProperties = {
    position: "relative",
    minHeight,
    background: "#000000", // pure black — contrast vs site's #060608 dark gray
    overflow: "hidden",    // hard cut top + bottom edges — no radius, no gradient
  };

  return (
    <section ref={sectionRef} className={className} style={sectionStyle}>
      {/* Canvas lives at z-index 0, fills the section completely */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Content floats above canvas */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight,
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </section>
  );
}
