"use client";

import type { V2Copy } from "../lib/copy";

const CAPACITY = 20;
const WON = 6;
const GAP = CAPACITY - WON;
const WON_PERCENT = Math.round((WON / CAPACITY) * 100);

/**
 * Sell-tier visual — two bars, same track width: total enquiries you could
 * serve this week vs the ones you actually won. The unfilled gap is drawn
 * as a hatched ghost region so the loss reads as capacity, not demand.
 * Illustrative numbers — see the caption rendered by the parent row.
 */
export default function CapacityGap({ d }: { d: V2Copy["fix"]["capacityGap"] }) {
  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="font-sora font-light text-fg/55" style={{ fontSize: "12.5px" }}>
            {d.capacityLabel}
          </span>
          <span className="font-label text-fg/55" style={{ fontSize: "12px" }}>{CAPACITY}</span>
        </div>
        <div className="w-full rounded-full overflow-hidden" style={{ height: "10px", background: "rgba(255,255,255,0.06)" }}>
          <div className="h-full rounded-full" style={{ width: "100%", background: "rgba(255,255,255,0.16)" }} />
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="font-sora font-light text-fg/75" style={{ fontSize: "12.5px" }}>
            {d.wonLabel}
          </span>
          <span className="font-label text-accent" style={{ fontSize: "12px" }}>{WON}</span>
        </div>
        <div className="w-full rounded-full overflow-hidden relative" style={{ height: "10px", background: "rgba(255,255,255,0.06)" }}>
          <div
            className="h-full rounded-full absolute left-0 top-0"
            style={{ width: `${WON_PERCENT}%`, background: "var(--accent)", zIndex: 2 }}
          />
          <div
            className="h-full absolute top-0"
            style={{
              left: `${WON_PERCENT}%`,
              right: 0,
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(248,113,113,0.28) 0px, rgba(248,113,113,0.28) 3px, transparent 3px, transparent 7px)",
            }}
          />
        </div>
        <p className="font-sora font-light mt-2" style={{ fontSize: "11.5px", color: "rgba(248,113,113,0.65)" }}>
          {GAP} {d.gapLabel}
        </p>
      </div>

      <p className="font-sora font-light text-fg/62 leading-[1.6]" style={{ fontSize: "13px" }}>
        {d.note}
      </p>
    </div>
  );
}
