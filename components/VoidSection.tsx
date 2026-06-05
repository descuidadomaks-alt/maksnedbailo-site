"use client";

/**
 * VoidSection — scroll-driven perspective tunnel.
 *
 * Mental model: dots are FIXED in 3-D space and never move.
 * The CAMERA moves along the z-axis as the user scrolls through the section.
 *   Scroll down → camera moves forward → dots grow and drift outward from centre.
 *   Scroll up   → camera moves backward → bidirectional, same projection, no special handling.
 *
 * "Like standing in an elevator shaft full of fixed dots. You move. They don't."
 *
 * Removed entirely vs previous version:
 *   - AUTO_SPEED / constant animation loop
 *   - dot.z mutations inside render
 *   - recycling logic
 *   - rAF spinning every frame regardless of scroll
 *
 * Render fires only on scroll or resize (dirty flag + single scheduled rAF).
 * No Three.js — Canvas 2D.
 *
 * Used in:
 *   /new    — bridge section ("Different problem?")
 *   /ai-map — DirectProblem ("Your operation is leaking money")
 */

import { useRef, useEffect, type ReactNode, type CSSProperties } from "react";

// ── Constants ────────────────────────────────────────────────────────────────

const NUM_DOTS           = 400;
const FOCAL              = 320;
const NEAR_CLIP          = 40;    // don't render dots closer than this to camera
const DOT_BASE_RADIUS    = 2.0;   // radius when z_relative === FOCAL
const MAX_DOT_RADIUS     = 22;    // cap very close dots
const MAX_CAMERA_TRAVEL  = 1800;  // total z-distance camera travels across full scroll height

// ── Types ─────────────────────────────────────────────────────────────────────

interface Dot {
  x: number;
  y: number;
  z: number; // absolute, FIXED — never mutated after generation
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateDots(cw: number, ch: number): Dot[] {
  const dots: Dot[] = [];
  for (let i = 0; i < NUM_DOTS; i++) {
    // Bias distribution: more dots near-to-mid depth, fewer at extreme far
    const z = 80 + Math.pow(Math.random(), 0.55) * 2520;
    // Spread proportional to z so the distribution looks natural at all depths
    const spread = z * 0.75;
    dots.push({
      x: (Math.random() - 0.5) * spread * 2,
      y: (Math.random() - 0.5) * spread * (ch / cw) * 2,
      z,
    });
  }
  return dots;
}

/**
 * Returns camera z-position as a function of the section's current scroll progress.
 * scrollProgress 0 = section top at viewport bottom (just entered)
 *               1 = section bottom at viewport top (just left)
 * This is purely derived from current scroll position — bidirectional for free.
 */
function getCameraZ(sectionEl: HTMLElement): number {
  const rect      = sectionEl.getBoundingClientRect();
  const sectionH  = sectionEl.offsetHeight;
  const windowH   = window.innerHeight;
  const progress  = (windowH - rect.top) / (sectionH + windowH);
  const clamped   = Math.max(-0.1, Math.min(1.1, progress));
  return clamped * MAX_CAMERA_TRAVEL;
}

function renderFrame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  dots: Dot[],
  cameraZ: number,
): void {
  const { width: cw, height: ch } = canvas;
  ctx.clearRect(0, 0, cw, ch);

  const cx = cw / 2;
  const cy = ch / 2;

  // Compute relative z for each dot and cull non-visible
  const visible = dots
    .map(d => ({ d, rz: d.z - cameraZ }))
    .filter(({ rz }) => rz > NEAR_CLIP)
    .sort((a, b) => b.rz - a.rz); // far → near so large close dots paint on top

  for (const { d, rz } of visible) {
    const scale  = FOCAL / rz;
    const sx     = d.x * scale + cx;
    const sy     = d.y * scale + cy;
    const radius = Math.min(DOT_BASE_RADIUS * scale, MAX_DOT_RADIUS);

    if (radius < 0.25) continue;
    if (sx < -20 || sx > cw + 20 || sy < -20 || sy > ch + 20) continue;

    // Fade at extreme far (rz > 1800) and extreme near (rz approaching NEAR_CLIP)
    const farFade  = Math.min(1, (2200 - rz) / 400);
    const nearFade = Math.min(1, (rz - NEAR_CLIP) / 80);
    const opacity  = farFade * nearFade * 0.88;
    if (opacity <= 0) continue;

    ctx.beginPath();
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${opacity.toFixed(3)})`;
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

    // ── Size canvas + generate fixed dot cloud ──────────────────────────────
    const init = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
      dotsRef.current = generateDots(canvas.width, canvas.height);
    };
    init();

    // ── Dirty-flag + single-scheduled rAF ───────────────────────────────────
    let rafId: number | null = null;
    let dirty = false;

    const scheduleRender = () => {
      if (rafId !== null) return; // already scheduled
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!dirty) return;
        dirty = false;
        renderFrame(canvas, ctx, dotsRef.current, getCameraZ(section));
      });
    };

    const onScroll = () => {
      dirty = true;
      scheduleRender();
    };

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
    background: "#000000", // pure black — distinct from site's #060608
    overflow: "hidden",    // hard cut top + bottom, no border-radius, no gradient
  };

  return (
    <section ref={sectionRef} className={className} style={sectionStyle}>
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
