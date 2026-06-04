"use client";

/**
 * VoidSection — pure #000 background with a 3-layer Canvas 2D parallax dot field.
 * Used in two places:
 *   - /new bridge section ("Different problem?")
 *   - /ai-map DirectProblem section ("Your operation is leaking money")
 *
 * Visual contract:
 *   - Background: absolute #000 — noticeably darker than the site's #060608 dark gray.
 *   - Edges: hard horizontal cuts. No border-radius, no gradient fade.
 *   - Canvas fills 100 % of section width + height, z-index 0.
 *   - Content slot z-index 10 — renders above canvas.
 *   - Min-height 70 vh (configurable via minHeight prop).
 *
 * Dot layers:
 *   Far  — 55 dots, r 1–2.5 px,   opacity 0.12–0.25, parallax 0.08
 *   Mid  — 30 dots, r 3–6 px,     opacity 0.35–0.55, parallax 0.22
 *   Near — 14 dots, r 8–17 px,    opacity 0.65–0.85, parallax 0.42
 *
 * Performance: rAF loop runs only while section is in viewport (IntersectionObserver).
 * All listeners removed on unmount.
 */

import {
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";

interface Dot {
  xFrac: number;  // 0–1 fraction of canvas width
  yFrac: number;  // 0–1 fraction of canvas height
  r: number;
  opacity: number;
}

interface Layer {
  dots: Dot[];
  parallaxRate: number;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeDots(count: number, rMin: number, rMax: number, oMin: number, oMax: number): Dot[] {
  return Array.from({ length: count }, () => ({
    xFrac: Math.random(),
    yFrac: Math.random(),
    r: rand(rMin, rMax),
    opacity: rand(oMin, oMax),
  }));
}

const LAYER_SPECS: { count: number; rMin: number; rMax: number; oMin: number; oMax: number; rate: number }[] = [
  { count: 55, rMin: 1,   rMax: 2.5, oMin: 0.12, oMax: 0.25, rate: 0.08 },
  { count: 30, rMin: 3,   rMax: 6,   oMin: 0.35, oMax: 0.55, rate: 0.22 },
  { count: 14, rMin: 8,   rMax: 17,  oMin: 0.65, oMax: 0.85, rate: 0.42 },
];

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
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const layersRef  = useRef<Layer[]>([]);
  const rafRef     = useRef<number>(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;

    // ── Initialise layers ──────────────────────────────────────────────────
    layersRef.current = LAYER_SPECS.map(({ count, rMin, rMax, oMin, oMax, rate }) => ({
      dots: makeDots(count, rMin, rMax, oMin, oMax),
      parallaxRate: rate,
    }));

    // ── Size canvas ────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();

    // ── Draw frame ─────────────────────────────────────────────────────────
    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { width, height } = canvas;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollOffset = window.scrollY - sectionTop;

      ctx.clearRect(0, 0, width, height);

      for (const layer of layersRef.current) {
        for (const dot of layer.dots) {
          const x  = dot.xFrac * width;
          const by = dot.yFrac * height;
          const y  = by + scrollOffset * layer.parallaxRate;

          // skip dots scrolled fully out of canvas
          if (y + dot.r < 0 || y - dot.r > height) continue;

          ctx.beginPath();
          ctx.arc(x, y, dot.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${dot.opacity})`;
          ctx.fill();
        }
      }
    };

    // ── rAF loop ───────────────────────────────────────────────────────────
    const loop = () => {
      if (!runningRef.current) return;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    // ── IntersectionObserver — run only when in viewport ──────────────────
    const io = new IntersectionObserver(
      ([entry]) => {
        runningRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          rafRef.current = requestAnimationFrame(loop);
        } else {
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0 }
    );
    io.observe(section);

    // ── Passive scroll listener ────────────────────────────────────────────
    const onScroll = () => {
      // rAF loop already reads scrollY each frame; no extra work needed.
      // This listener exists only to ensure the loop is awake during scroll.
      if (runningRef.current && rafRef.current === 0) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Resize listener ────────────────────────────────────────────────────
    const onResize = () => {
      resize();
      // dot fractions stay the same; canvas just scales
    };
    window.addEventListener("resize", onResize, { passive: true });

    // ── Cleanup ────────────────────────────────────────────────────────────
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
    background: "#000000",         // pure black — not the site's #060608
    overflow: "hidden",
    // Hard-cut edges: no border-radius, no gradient. Done.
  };

  const canvasStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    pointerEvents: "none",
  };

  const contentStyle: CSSProperties = {
    position: "relative",
    zIndex: 10,
  };

  return (
    <section ref={sectionRef} className={className} style={sectionStyle}>
      <canvas ref={canvasRef} style={canvasStyle} aria-hidden />
      <div style={contentStyle}>
        {children}
      </div>
    </section>
  );
}
