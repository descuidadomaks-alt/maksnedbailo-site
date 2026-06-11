"use client";

import type { Tier } from "../lib/quiz";

const TIER_COLORS: Record<Tier, string> = {
  Contained: "#4ADE80",
  Leaking: "#D4FF2B",
  Hemorrhaging: "#FF6B5B",
};

/** Visual position of the score (0–21) along the Contained → Leaking → Hemorrhaging spectrum. */
export default function TierGauge({ score, tier }: { score: number; tier: Tier }) {
  const pct = Math.min(100, Math.max(0, (score / 21) * 100));
  const color = TIER_COLORS[tier];

  return (
    <div className="mx-auto mb-6" style={{ maxWidth: "300px" }}>
      <div className="relative h-1.5 rounded-full overflow-hidden flex" aria-hidden>
        <div className="h-full" style={{ width: "32%", background: "rgba(74,222,128,0.18)" }} />
        <div className="h-full" style={{ width: "32%", background: "rgba(212,255,43,0.18)" }} />
        <div className="h-full" style={{ width: "36%", background: "rgba(255,107,91,0.18)" }} />
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ease-out"
          style={{ left: `calc(${pct}% - 4px)`, width: "8px", height: "8px", background: color, boxShadow: `0 0 10px ${color}` }}
        />
      </div>
      <div
        className="flex justify-between mt-2.5 font-label text-fg/24"
        style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase" }}
      >
        <span>Contained</span>
        <span>Leaking</span>
        <span>Hemorrhaging</span>
      </div>
    </div>
  );
}
