"use client";

/**
 * VoidSection — scroll-driven Y-axis parallax tunnel.
 *
 * Axis definitions:
 *   X = left–right  (horizontal spread across canvas)
 *   Y = up–down     = scroll axis  (camera moves here)
 *   Z = depth       = parallax axis (determines dot size + vertical scroll speed)
 *
 * Mental model: you are an elevator moving vertically through a shaft.
 * Dots are fixed at positions on the shaft walls at various Z distances.
 * Close dots (small Z) have strong vertical parallax — they rush past.
 * Far dots (large Z) barely move — they are deep in the shaft.
 * Camera NEVER moves in Z — no "flying into dots", no recycling needed.
 *
 * Dots: fixed grid — 8 Z layers × 13 X columns × ~25 Y rows ≈ 2,600 dots.
 * Generated once on mount, never mutated.
 * Render fires only on scroll or resize (dirty flag + single rAF).
 * Fully bidirectional: getCameraY is a pure function of scroll position.
 */

import { useRef, useEffect, type ReactNode, type CSSProperties } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────

const FOCAL           = 380;
const BASE_RADIUS     = 3.0;   // ~4px at near layer (z=280); no blobs
const NEAR_CLIP       = 35;
const MAX_OPACITY     = 0.68;  // opacity ceiling — used in formula below
const MAX_CAMERA_Y    = 100;   // camera barely drifts — mirror-corridor stillness

// Grid
const X_COLS          = 13;    // -6 to +6 horizontal columns
const X_SPACING       = 340;   // wide: only 2–3 near columns visible = sparse, readable
const X_JITTER        = 22;

// Z layers: start much further from camera — smallest dot at z=280 ≈ 4px, not a blob
const Z_LAYERS = [280, 440, 640, 880, 1160, 1500, 1900, 2400];

// Y extent: camera only travels 100 units; no need for wide Y range
const Y_START   = -200;
const Y_END     = 350;   // MAX_CAMERA_Y + generous padding
const Y_SPACING = 125;   // wider breathing room between rows
const Y_JITTER  = 12;

// ── Types ─────────────────────────────────────────────────────────────────────

interface Dot {
  x: number;
  y: number; // absolute world-Y — FIXED, never mutated
  z: number; // depth — FIXED, never mutated
}

interface VisibleDot {
  sx: number;
  sy: number;
  radius: number;
  opacity: number;
}

// ── generateDots ──────────────────────────────────────────────────────────────
// Produces a structured grid: every Z layer × X column gets dots spaced at Y_SPACING
// across the full camera travel range.  Dots are never regenerated on scroll.

function generateDots(): Dot[] {
  const dots: Dot[] = [];
  for (const z of Z_LAYERS) {
    for (let col = 0; col < X_COLS; col++) {
      const ix = col - Math.floor(X_COLS / 2); // -6 … +6
      let y = Y_START;
      while (y <= Y_END) {
        dots.push({
          x: ix * X_SPACING + (Math.random() - 0.5) * X_JITTER,
          y: y + (Math.random() - 0.5) * Y_JITTER,
          z: z + (Math.random() - 0.5) * (z * 0.06), // ≤ 6 % z jitter
        });
        y += Y_SPACING;
      }
    }
  }
  return dots;
}

// ── getCameraY ────────────────────────────────────────────────────────────────
// Pure function of current scroll position.  Bidirectional for free.

function getCameraY(sectionEl: HTMLElement): number {
  const rect     = sectionEl.getBoundingClientRect();
  const windowH  = window.innerHeight;
  const sectionH = sectionEl.offsetHeight;
  // 0 = section top at viewport top; 1 = section bottom at viewport top
  const progress = (windowH - rect.top) / (sectionH + windowH);
  const clamped  = Math.max(-0.15, Math.min(1.15, progress));
  return clamped * MAX_CAMERA_Y;
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

    // ── KEY CHANGE FROM PREVIOUS VERSION ──────────────────────────────────
    // relY = d.y - cameraY   (Y is relative to camera; X is not)
    // screenX = (d.x   / d.z) * FOCAL + cx   ← unchanged
    // screenY = (relY  / d.z) * FOCAL + cy   ← was d.y/d.z in v4 (wrong)
    const relY   = d.y - cameraY;
    const scale  = FOCAL / d.z;
    const sx     = d.x  * scale + cx;
    const sy     = relY * scale + cy;
    const radius = BASE_RADIUS * scale;

    if (radius < 0.22) continue;
    if (sx < -30 || sx > cw + 30) continue;
    if (sy < -30 || sy > ch + 30) continue;

    // Mirror-corridor opacity:
    //   nearFade — fade in from NEAR_CLIP so there's no hard pop at the threshold
    //   farFade  — fade out at extreme distance (z > 2000)
    //   nearDim  — dim the closest dots so near layer is soft, not full-white
    //   ceiling  — MAX_OPACITY so nothing blows out to pure white
    // Sanity: z=280 → nearDim=280/342≈0.82 → opacity≈0.56  (soft near dot) ✓
    //         z=640 → nearDim=1.0            → opacity≈0.68  (brightest)    ✓
    //         z=2400 → farFade=0.33          → opacity≈0.22  (barely there) ✓
    const nearFade = Math.min(1, (d.z - NEAR_CLIP) / 120);
    const farFade  = Math.min(1, (2600 - d.z) / 600);
    const nearDim  = Math.min(1, d.z / (FOCAL * 0.9));
    const opacity  = nearFade * farFade * nearDim * MAX_OPACITY;
    if (opacity <= 0) continue;

    visible.push({ sx, sy, radius, opacity });
  }

  // Draw smallest (farthest) first so large close dots paint on top
  visible.sort((a, b) => a.radius - b.radius);

  for (const v of visible) {
    ctx.beginPath();
    ctx.arc(v.sx, v.sy, Math.min(v.radius, 8), 0, Math.PI * 2); // cap 8px — no blobs
    ctx.fillStyle = `rgba(255,255,255,${v.opacity.toFixed(3)})`;
    ctx.fill();
  }
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
      dotsRef.current = generateDots(); // grid is aspect-agnostic; X_SPACING handles it
    };
    init();

    // ── Dirty-flag + single-scheduled rAF (same as v4) ───────────────────────
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

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
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
