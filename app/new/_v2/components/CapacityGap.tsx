"use client";

import type { V2Copy } from "../lib/copy";

const CAPACITY = 20;
const WON = 6;

/**
 * Sell-tier visual, compact — twenty slots you could fill this week, six
 * actually filled. The unfilled remainder is hatched red so the loss reads
 * as wasted capacity rather than missing demand.
 */
export default function CapacityGap({ d }: { d: V2Copy["fix"]["capacityGap"] }) {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <span className="font-sora font-light text-fg/55" style={{ fontSize: "11.5px" }}>{d.capacityLabel}</span>
        <span className="font-label text-fg/55" style={{ fontSize: "11.5px" }}>{CAPACITY}</span>
      </div>

      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(10, 1fr)` }}>
        {Array.from({ length: CAPACITY }, (_, i) => (
          <span
            key={i}
            style={{
              height: "16px",
              borderRadius: "3px",
              background: i < WON ? "var(--accent)" : "transparent",
              border: i < WON ? "none" : "1px solid rgba(248,113,113,0.28)",
              backgroundImage:
                i < WON
                  ? undefined
                  : "repeating-linear-gradient(135deg, rgba(248,113,113,0.2) 0px, rgba(248,113,113,0.2) 2px, transparent 2px, transparent 6px)",
            }}
          />
        ))}
      </div>

      <div className="flex items-baseline justify-between">
        <span className="font-sora font-light text-accent" style={{ fontSize: "11.5px" }}>{d.wonLabel}</span>
        <span className="font-label text-accent" style={{ fontSize: "11.5px" }}>{WON}</span>
      </div>

      <p className="font-sora font-light" style={{ fontSize: "11.5px", color: "rgba(248,113,113,0.7)" }}>
        {CAPACITY - WON} {d.gapLabel}
      </p>
    </div>
  );
}
