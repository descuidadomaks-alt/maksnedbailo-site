"use client";

import { useEffect, useState } from "react";

/**
 * Animated pointer from the hero copy toward the live Connecto widget.
 *
 * Desktop (≥1024px): a curved dashed SVG arrow, anchored to the bottom-right
 *   corner area where the widget button lives. Re-anchors on resize.
 * Mobile/tablet: subtle double-chevron bouncing downward below the CTA.
 *
 * Appears only after the widget toggle button is present in the DOM.
 */
export default function HeroArrow() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });

    // Poll until the Connecto toggle button appears, then show arrow
    const poll = setInterval(() => {
      if (document.querySelector(".connecto-toggle")) {
        setVisible(true);
        clearInterval(poll);
      }
    }, 400);

    // Fallback: show after 3s regardless
    const fallback = setTimeout(() => {
      setVisible(true);
      clearInterval(poll);
    }, 3000);

    return () => {
      window.removeEventListener("resize", check);
      clearInterval(poll);
      clearTimeout(fallback);
    };
  }, []);

  if (mobile === null || !visible) return null;

  // ── Mobile / Tablet ───────────────────────────────────────────────────────
  if (mobile) {
    return (
      <div
        aria-hidden
        className="absolute bottom-7 left-1/2 -translate-x-1/2 pointer-events-none hero-arrow-appear flex flex-col items-center gap-1"
        style={{ opacity: 0.4 }}
      >
        {[0, 1].map((i) => (
          <svg
            key={i}
            width="20"
            height="11"
            viewBox="0 0 20 11"
            fill="none"
            className="animate-bounce"
            style={{ animationDelay: `${i * 0.14}s`, opacity: 1 - i * 0.45 }}
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

  // ── Desktop ───────────────────────────────────────────────────────────────
  // Positioned near the bottom-right, curving toward where the widget sits.
  return (
    <svg
      aria-hidden
      className="absolute pointer-events-none hero-arrow-appear"
      style={{
        right: "96px",
        bottom: "52px",
        width: "230px",
        height: "150px",
        overflow: "visible",
        opacity: 0.55,
      }}
      viewBox="0 0 230 150"
      fill="none"
    >
      <defs>
        <marker
          id="hero-arrowTip"
          markerWidth="9"
          markerHeight="9"
          refX="7"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L9,3.5 L0,7 Z" fill="rgba(212,255,43,0.65)" />
        </marker>
        <filter id="hero-arrowGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* "try live →" label */}
      <text
        x="12"
        y="24"
        fill="rgba(212,255,43,0.45)"
        style={{ fontFamily: "var(--font-sora), system-ui", fontSize: "10px", fontWeight: 300, letterSpacing: "1px" }}
      >
        try live ↓
      </text>

      {/* Curved dashed path */}
      <path
        d="M 35 38 C 90 38, 190 72, 215 142"
        stroke="rgba(212,255,43,0.38)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        markerEnd="url(#hero-arrowTip)"
        filter="url(#hero-arrowGlow)"
      />
    </svg>
  );
}
