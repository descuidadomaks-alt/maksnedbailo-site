"use client";

import type { V2Copy } from "../lib/copy";

const DAYS = ["M", "T", "W", "T", "F"];
const ROWS = 8;
const TOTAL_BLOCKS = 40;
const ADMIN_BLOCKS = 19;

/**
 * Operate-tier visual, compact — one working week as a 5x8 block grid.
 * Deliberately small (blocks are a fixed 7px, not aspect-ratio driven) so
 * the whole "What we fix" section still fits a single screen; at this size
 * the shaded mass reads instantly without needing to count anything.
 */
export default function WeekGrid({ d }: { d: V2Copy["fix"]["weekGrid"] }) {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Columns are fractional, not fixed-width, so the grid fills the whole
          card the way the Sell and Serve visuals do. */}
      <div className="flex flex-col gap-1 w-full">
        <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
          {DAYS.map((day, i) => (
            <span
              key={i}
              className="font-label text-fg/35 text-center"
              style={{ fontSize: "8px", letterSpacing: "0.5px" }}
            >
              {day}
            </span>
          ))}
        </div>
        <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
          {DAYS.map((_, col) => (
            <div key={col} className="flex flex-col gap-1.5">
              {Array.from({ length: ROWS }, (_, row) => {
                const index = col * ROWS + row;
                return (
                  <span
                    key={row}
                    style={{
                      height: "8px",
                      borderRadius: "2px",
                      background: index < ADMIN_BLOCKS ? "rgba(240,236,230,0.15)" : "rgba(212,255,43,0.6)",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <span className="shrink-0 rounded-sm" style={{ width: "9px", height: "9px", background: "rgba(240,236,230,0.15)" }} />
          <span className="font-sora font-light text-fg/50" style={{ fontSize: "12px" }}>
            <span className="font-playfair text-fg/70" style={{ fontSize: "16px" }}>{ADMIN_BLOCKS}h</span> {d.adminLabel}
          </span>
        </div>
        {/* Punchline — matched in weight to the other two cards' closing lines. */}
        <div className="flex items-center gap-2.5">
          <span className="shrink-0 rounded-sm" style={{ width: "9px", height: "9px", background: "rgba(212,255,43,0.6)" }} />
          <span className="font-sora text-accent leading-[1.35]" style={{ fontSize: "16px", fontWeight: 500 }}>
            <span className="font-playfair" style={{ fontSize: "22px" }}>{TOTAL_BLOCKS - ADMIN_BLOCKS}h</span> {d.earnLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
