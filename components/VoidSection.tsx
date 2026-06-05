"use client";

/**
 * VoidSection — two horizontal floor planes, scroll-driven Y camera.
 *
 * Architecture: dots sit in flat horizontal planes (like building floors)
 * extending in X (left-right) and Z (depth). Camera moves in Y as user scrolls.
 *
 *   X = left–right  (columns across canvas)
 *   Y = up–down     = scroll axis  (camera moves here)
 *   Z = depth       = parallax axis (dot size + how fast it drifts vertically)
 *
 * Two planes at Y=200 and Y=520. Camera timeline:
 *   progress=0%:  cameraY=-80  → above plane 1 → floor1 in lower half of screen
 *   progress=31%: cameraY=200  → AT plane 1    → maximum depth, dots at screen horizon
 *   progress=50%: cameraY=320  → BETWEEN planes → CENTER VOID (empty middle)
 *   progress=75%: cameraY=520  → AT plane 2    → maximum depth again
 *   progress=100%:cameraY=720  → below plane 2 → floor2 in upper half
 *
 * 234 dots (2 planes × 9 z-depths × 13 columns), all fixed, never mutated.
 * Render fires only on scroll or resize (dirty flag + single rAF). Bidirectional.
 */

import { useRef, useEffect, type ReactNode, type CSSProperties } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────

const FOCAL        = 380;
const BASE_RADIUS  = 1.8;  // radius at z=FOCAL; slightly larger for readability
const NEAR_CLIP    = 40;

// Five horizontal floor planes — 130 world-units apart
// Max gap between passes: 20% of scroll → near dots always on screen
const PLANES_Y = [50, 180, 310, 440, 570];

// Grid within each plane
const X_COLS    = 13;    // -6 to +6
const X_SPACING = 175;   // horizontal spread per column
const X_JITTER  = 14;

// Z depth layers per plane (11 layers — denser, more always-visible mid dots)
// Near (large, few visible, outer screen) → Far (tiny, many, converge to center)
const Z_DEPTHS = [90, 140, 210, 310, 440, 620, 840, 1100, 1420, 1800, 2300];
const Z_JITTER = 0.07;   // 7% z jitter — prevents z-fighting artefacts

// Camera travels 660 world units across full scroll
// Planes pass at ~10%, 30%, 50%, 70%, 89% of scroll progress
// Camera starts 70 below plane1 and ends 70 past plane5 — dots visible throughout
const CAMERA_Y_START = -20;  // 70 world-units below plane1 → near dots visible immediately
const CAMERA_Y_END   = 640;  // 70 world-units past plane5  → near dots visible until end

// ── Types ─────────────────────────────────────────────────────────────────────

interface Dot {
  x: number;
  y: number; // absolute world-Y — FIXED, never mutated
  z: number; // depth        — FIXED, never mutated
}

interface VisibleDot {
  sx: number;
  sy: number;
  radius: number;
  opacity: number;
}

// ── generateDots ──────────────────────────────────────────────────────────────
// Two flat planes × 9 z-depths × 13 x-columns = 234 fixed dots.

function generateDots(): Dot[] {
  const dots: Dot[] = [];
  for (const planeY of PLANES_Y) {
    for (const z of Z_DEPTHS) {
      for (let col = 0; col < X_COLS; col++) {
        const ix = col - Math.floor(X_COLS / 2); // -6 … +6
        dots.push({
          x: ix * X_SPACING + (Math.random() - 0.5) * X_JITTER,
          y: planeY + (Math.random() - 0.5) * 4,        // tiny Y jitter — plane stays flat
          z: z * (1 + Z_JITTER * (Math.random() - 0.5)), // ≤7% z jitter
        });
      }
    }
  }
  return dots;
}

// ── getCameraY ────────────────────────────────────────────────────────────────
// Pure function of scroll progress — bidirectional for free.

function getCameraY(sectionEl: HTMLElement): number {
  const rect     = sectionEl.getBoundingClientRect();
  const windowH  = window.innerHeight;
  const sectionH = sectionEl.offsetHeight;
  // PREVIEW_PX: start rendering 300px BEFORE section enters viewport.
  // Without this, progress=0 when section top hits viewport bottom — camera is
  // far below plane1 so dots project to bottom 10% of canvas (user sees top first).
  // With preview, progress is already ~20% when section peeks in → dots visible immediately.
  const PREVIEW_PX = 300;
  const progress = (windowH + PREVIEW_PX - rect.top) / (sectionH + windowH + PREVIEW_PX);
  const clamped  = Math.max(0, Math.min(1, progress));
  return CAMERA_Y_START + clamped * (CAMERA_Y_END - CAMERA_Y_START);
}

// ── renderFrame ───────────────────────────────────────────────────────────────

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

    // Projection — Y relative to camera; X and size from Z only
    const relY   = d.y - cameraY;
    const scale  = FOCAL / d.z;
    const sx     = d.x  * scale + cx;
    const sy     = relY * scale + cy;
    const radius = BASE_RADIUS * scale;

    if (radius < 0.22) continue;
    if (sx < -30 || sx > cw + 30) continue;
    if (sy < -30 || sy > ch + 30) continue;

    // Opacity — based on z-depth only (no y-based fading)
    const farFade  = Math.min(1, Math.max(0, (2600 - d.z) / 700));
    const nearFade = Math.min(1, Math.max(0, (d.z - NEAR_CLIP) / 120));
    const opacity  = farFade * nearFade * 0.78;
    if (opacity <= 0) continue;

    visible.push({ sx, sy, radius, opacity });
  }

  // Draw smallest (farthest) first so large near dots paint on top
  visible.sort((a, b) => a.radius - b.radius);

  for (const v of visible) {
    ctx.beginPath();
    ctx.arc(v.sx, v.sy, Math.min(v.radius, 8), 0, Math.PI * 2); // cap 8px — no blobs
    ctx.fillStyle = `rgba(255,255,255,${v.opacity.toFixed(3)})`;
    ctx.fill();
  }
}

// ── Component — unchanged from previous version ───────────────────────────────

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
  const dotsRef    = useRef<Dot[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Init: size canvas + generate fixed dot grid ──────────────────────────
    const init = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
      dotsRef.current = generateDots();
    };
    init();

    // ── Dirty-flag + single-scheduled rAF ────────────────────────────────────
    let rafId: number | null = null;
    let dirty = false;

    const scheduleRender = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!dirty) return;
        dirty = false;
        renderFrame(canvas, ctx, dotsRef.current, getCameraY(section));
      });
    };

    const onScroll = () => { dirty = true; scheduleRender(); };

    const onResize = () => {
      init();
      dirty = true;
      scheduleRender();
    };

    // Initial render at current scroll position
    dirty = true;
    scheduleRender();

    // IntersectionObserver with 300px rootMargin — fires a fresh render when the
    // section is within 300px of the viewport, matching the PREVIEW_PX in getCameraY.
    const io = new IntersectionObserver(
      () => { dirty = true; scheduleRender(); },
      { rootMargin: "300px 0px 0px 0px" }
    );
    io.observe(section);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const sectionStyle: CSSProperties = {
    position: "relative",
    minHeight,
    background: "#000000", // pure black — hard-cut contrast with site's #060608
    overflow: "hidden",    // hard cut top + bottom, no border-radius, no gradient
  };

  return (
    <section ref={sectionRef} className={className} style={sectionStyle}>
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
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
