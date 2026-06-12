"use client";

/**
 * ElevatorField — shared particle canvas spanning the Belief ("prison"),
 * Mechanism, and Bottleneck Map sections.
 *
 * Same X/Z-fixed, camera-moves-in-Y projection model as
 * components/VoidSection.tsx, but:
 *  - the canvas is `position: sticky` (pinned to the viewport) for the full
 *    height of `children`, instead of being sized to one ~70vh section —
 *    so the field reads as ONE continuous shaft behind all three sections
 *  - more, closer-spaced floor planes -> a new floor crosses the camera
 *    every ~8% of scroll, so there's no empty/void stretch mid-scroll
 *  - ~2.7x the z-depth layers (11 -> 30) for a denser field
 */

import { useRef, useEffect, type ReactNode, type CSSProperties } from "react";

const FOCAL       = 380;
const BASE_RADIUS = 1.8;
const NEAR_CLIP   = 40;

// 12 floor planes, 100 world-units apart — the camera (see CAMERA_Y_*)
// travels exactly this span, so floors keep crossing it throughout the
// whole scroll range instead of leaving a void in the middle.
const PLANES_Y = Array.from({ length: 12 }, (_, i) => 40 + i * 100);

const X_COLS    = 13;
const X_SPACING = 175;
const X_JITTER  = 14;
// Shift the whole grid half a column off the camera axis: instead of looking
// straight down a dot column (a "wall" of stacked dots dead-center), the
// vanishing axis falls BETWEEN two columns — two parallel dot lines flank the
// center and the field reads as a tunnel you're inside of, not a face-on grid.
const X_OFFSET  = X_SPACING / 2;

// ~2.7x the depth layers of the single-section field (11 -> 30), geometric
// progression so near layers stay sparse and far layers stay dense.
const Z_DEPTHS_DESKTOP = Array.from({ length: 30 }, (_, i) => 90 * Math.pow(2300 / 90, i / 29));
// Mobile gets ~47% of the desktop depth layers (same near/far bounds, fewer
// steps between) — keeps the field readable without the per-frame cost of
// 30 layers x 13 columns x 12 planes on phone GPUs.
const Z_DEPTHS_MOBILE = Array.from({ length: 14 }, (_, i) => 90 * Math.pow(2300 / 90, i / 13));
const Z_JITTER = 0.07;

const MOBILE_BREAKPOINT = 768;

const CAMERA_Y_START = PLANES_Y[0] - 60;
const CAMERA_Y_END   = PLANES_Y[PLANES_Y.length - 1] + 60;

interface Dot {
  x: number;
  y: number;
  z: number;
}

interface VisibleDot {
  sx: number;
  sy: number;
  radius: number;
  opacity: number;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateDots(mobile: boolean): Dot[] {
  const rng = mulberry32(0x5eed1e55);
  const dots: Dot[] = [];
  const depths = mobile ? Z_DEPTHS_MOBILE : Z_DEPTHS_DESKTOP;
  for (const planeY of PLANES_Y) {
    for (const z of depths) {
      for (let col = 0; col < X_COLS; col++) {
        const ix = col - Math.floor(X_COLS / 2);
        dots.push({
          x: ix * X_SPACING + X_OFFSET + (rng() - 0.5) * X_JITTER,
          y: planeY + (rng() - 0.5) * 4,
          z: z * (1 + Z_JITTER * (rng() - 0.5)),
        });
      }
    }
  }
  return dots;
}

// getCameraY — progress is how far the wrapper has scrolled through its
// sticky range: 0 when its top reaches the viewport top, 1 when its bottom
// reaches the viewport bottom. cameraSpan scales how much of the full
// camera travel that progress maps to — short wrappers (e.g. the FAQ ->
// footer field) use a small span so the dots drift instead of racing.
function getCameraY(wrapperEl: HTMLElement, cameraSpan: number, cameraOffset: number): number {
  const rect = wrapperEl.getBoundingClientRect();
  const windowH = window.innerHeight;
  const scrollable = rect.height - windowH;
  const progress = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;
  return CAMERA_Y_START + (cameraOffset + progress * cameraSpan) * (CAMERA_Y_END - CAMERA_Y_START);
}

function renderFrame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  dots: Dot[],
  cameraY: number,
): void {
  const cw = canvas.width;
  const ch = canvas.height;
  ctx.clearRect(0, 0, cw, ch);

  const cx = cw / 2;
  const cy = ch / 2;

  const visible: VisibleDot[] = [];

  for (const d of dots) {
    if (d.z < NEAR_CLIP) continue;

    const relY   = d.y - cameraY;
    const scale  = FOCAL / d.z;
    const sx     = d.x  * scale + cx;
    const sy     = relY * scale + cy;
    const radius = BASE_RADIUS * scale;

    if (radius < 0.22) continue;
    if (sx < -30 || sx > cw + 30) continue;
    if (sy < -30 || sy > ch + 30) continue;

    const farFade  = Math.min(1, Math.max(0, (2600 - d.z) / 700));
    const nearFade = Math.min(1, Math.max(0, (d.z - NEAR_CLIP) / 120));
    const opacity  = farFade * nearFade * 0.78;
    if (opacity <= 0) continue;

    visible.push({ sx, sy, radius, opacity });
  }

  visible.sort((a, b) => a.radius - b.radius);

  for (const v of visible) {
    ctx.beginPath();
    ctx.arc(v.sx, v.sy, Math.min(v.radius, 8), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${v.opacity.toFixed(3)})`;
    ctx.fill();
  }
}

interface ElevatorFieldProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the full camera travel mapped to this wrapper's scroll
   *  range (default 1). Use a small value for short wrappers. */
  cameraSpan?: number;
  /** Where in the shaft the camera starts, as a fraction of the full travel
   *  (default 0 = top). ~0.45 starts mid-shaft with floors above AND below. */
  cameraOffset?: number;
  /** Clip the 100vh sticky canvas to the wrapper's own bounds — use for
   *  single-section fields so dots never bleed into neighbouring sections. */
  clip?: boolean;
}

export default function ElevatorField({
  children,
  className = "",
  cameraSpan = 1,
  cameraOffset = 0,
  clip = false,
}: ElevatorFieldProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const dotsRef    = useRef<Dot[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas  = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    if (dotsRef.current.length === 0) {
      dotsRef.current = generateDots(window.innerWidth < MOBILE_BREAKPOINT);
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const AMBIENT_AMPLITUDE = 8;
    const AMBIENT_PERIOD    = 9000;
    const startTime = performance.now();

    const computeCameraY = () => {
      const cameraY = getCameraY(wrapper, cameraSpan, cameraOffset);
      if (prefersReducedMotion) return cameraY;
      const t = performance.now() - startTime;
      return cameraY + Math.sin((t / AMBIENT_PERIOD) * Math.PI * 2) * AMBIENT_AMPLITUDE;
    };

    const render = () => renderFrame(canvas, ctx, dotsRef.current, computeCameraY());

    let rafId: number | null = null;
    let dirty = false;
    let ambientActive = false;

    const scheduleRender = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (ambientActive) {
          render();
          scheduleRender();
          return;
        }
        if (!dirty) return;
        dirty = false;
        render();
      });
    };

    const onScroll = () => { dirty = true; scheduleRender(); };

    // Mobile browsers fire `resize` when the URL bar shows/hides (height
    // only) — re-measuring then is wasted work and can cause a visible
    // jump. Only react when the width actually changes.
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      resizeCanvas();
      dirty = true;
      scheduleRender();
    };

    render();
    dirty = true;
    scheduleRender();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!prefersReducedMotion) ambientActive = entry?.isIntersecting ?? false;
        dirty = true;
        scheduleRender();
      },
      { rootMargin: "0px" }
    );
    io.observe(wrapper);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      io.disconnect();
      ambientActive = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [cameraSpan, cameraOffset]);

  // Matches the page background — the Belief and sample-map sections inside
  // paint solid var(--bg) over the canvas, so the dots only show through the
  // (transparent) Mechanism section in between. The dots still exist behind
  // the solid sections — the shaft is continuous, just occluded.
  const wrapperStyle: CSSProperties = {
    position: "relative",
    background: "var(--bg)",
    ...(clip ? { overflow: "hidden" } : null),
  };

  const canvasStyle: CSSProperties = {
    display: "block",
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    pointerEvents: "none",
    zIndex: 0,
  };

  return (
    <div ref={wrapperRef} className={className} style={wrapperStyle}>
      <canvas ref={canvasRef} aria-hidden className="elevator-canvas" style={canvasStyle} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
