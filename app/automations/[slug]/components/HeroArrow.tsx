"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated arrow from hero copy → live Connecto widget.
 *
 * Desktop (≥1024px):
 *   - position: fixed SVG covering the viewport; coordinates are in screen space.
 *   - Recomputes on every scroll / resize frame via rAF.
 *   - Fades out smoothly as the hero scrolls off-screen.
 *
 * Mobile (<1024px):
 *   - Two stacked bouncing chevrons below the CTA.
 */
export default function HeroArrow() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathElRef = useRef<SVGPathElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 1024);
    checkSize();
    window.addEventListener("resize", checkSize, { passive: true });
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Desktop — live path tracking
  useEffect(() => {
    if (isMobile !== false) return; // only runs on desktop

    function draw() {
      const svg = svgRef.current;
      const pathEl = pathElRef.current;
      if (!svg || !pathEl) return;

      const hero = document.querySelector("[data-hero]") as HTMLElement | null;
      const widget = document.querySelector(".connecto-toggle") as HTMLElement | null;

      if (!hero || !widget) {
        svg.style.opacity = "0";
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const widgetRect = widget.getBoundingClientRect();
      const vh = window.innerHeight;

      // How much of the hero is still visible — drives opacity
      const heroBottom = Math.min(heroRect.bottom, vh);
      const heroTop = Math.max(heroRect.top, 0);
      const ratio = Math.max(0, (heroBottom - heroTop) / heroRect.height);
      const targetOpacity = ratio > 0.05 ? Math.min(ratio * 0.65, 0.55) : 0;
      svg.style.opacity = String(targetOpacity);

      if (targetOpacity === 0) return;

      // Start: right-center of the hero, roughly where the CTA button is
      const startX = heroRect.left + heroRect.width * 0.63;
      const startY = Math.min(
        heroRect.top + heroRect.height * 0.68,
        vh - 80
      );

      // End: center of the widget toggle button
      const endX = widgetRect.left + widgetRect.width / 2;
      const endY = widgetRect.top + widgetRect.height / 2;

      // Cubic bezier — gentle S-curve toward widget
      const dx = endX - startX;
      const dy = endY - startY;
      const cp1x = startX + dx * 0.15;
      const cp1y = startY + dy * 0.05 - 30;
      const cp2x = startX + dx * 0.72;
      const cp2y = endY - Math.abs(dy) * 0.18;

      pathEl.setAttribute(
        "d",
        `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`
      );
    }

    function onFrame() {
      draw();
      rafRef.current = requestAnimationFrame(onFrame);
    }

    // Poll until widget is present, then start drawing
    const poll = setInterval(() => {
      if (document.querySelector(".connecto-toggle")) {
        clearInterval(poll);
        rafRef.current = requestAnimationFrame(onFrame);
      }
    }, 350);

    // Fallback: start anyway after 3s
    const fallback = setTimeout(() => {
      clearInterval(poll);
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(onFrame);
      }
    }, 3000);

    return () => {
      clearInterval(poll);
      clearTimeout(fallback);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  // Mobile — show after short delay
  useEffect(() => {
    if (isMobile !== true) return;
    const t = setTimeout(() => setShowMobile(true), 1800);
    return () => clearTimeout(t);
  }, [isMobile]);

  // ── Mobile chevrons ────────────────────────────────────────────────────────
  if (isMobile === true) {
    if (!showMobile) return null;
    return (
      <div
        aria-hidden
        className="absolute bottom-7 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-1 hero-arrow-appear"
        style={{ opacity: 0.38 }}
      >
        {[0, 1].map((i) => (
          <svg
            key={i}
            width="20"
            height="11"
            viewBox="0 0 20 11"
            fill="none"
            className="animate-bounce"
            style={{ animationDelay: `${i * 0.13}s`, opacity: 1 - i * 0.45 }}
          >
            <path
              d="M1 1L10 10L19 1"
              stroke="#D4FF2B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>
    );
  }

  // ── Desktop — fixed-position SVG ───────────────────────────────────────────
  if (isMobile !== false) return null; // not yet measured

  return (
    <svg
      ref={svgRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 30,
        overflow: "visible",
        opacity: 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <defs>
        <marker
          id="ha-tip"
          markerWidth="9"
          markerHeight="9"
          refX="7"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L9,3.5 L0,7 Z" fill="rgba(212,255,43,0.6)" />
        </marker>
        <filter id="ha-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Animated dash offset for a "drawing" effect */}
        <style>{`
          .ha-path {
            stroke-dasharray: 7 5;
            animation: ha-dash 1.8s linear infinite;
          }
          @keyframes ha-dash {
            to { stroke-dashoffset: -48; }
          }
        `}</style>
      </defs>

      {/* Label */}
      <text
        id="ha-label"
        fill="rgba(212,255,43,0.42)"
        style={{
          fontFamily: "var(--font-sora), system-ui",
          fontSize: "10px",
          fontWeight: 300,
          letterSpacing: "1.5px",
        }}
      >
        try live ↓
      </text>

      {/* Curved path */}
      <path
        ref={pathElRef}
        className="ha-path"
        stroke="rgba(212,255,43,0.38)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#ha-tip)"
        filter="url(#ha-glow)"
      />
    </svg>
  );
}
