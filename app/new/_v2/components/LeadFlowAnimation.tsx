"use client";

import type { V2Copy } from "../lib/copy";

/**
 * Hero animation — the whole pitch without a word of reading.
 *
 * Two lanes fed by the same stream of enquiries. In the top lane the dots
 * decay and drop out of the track one by one (leads dying in a queue); only
 * a couple survive. In the bottom lane every dot gets an instant accent
 * pulse and arrives. The counters on the right settle on the outcome.
 *
 * Pure CSS keyframes on a `v3-`-prefixed, component-scoped <style> block —
 * no globals.css edit, no JS ticker, no layout thrash. Honours
 * prefers-reduced-motion by freezing every dot at its resting position so
 * the diagram still reads as a static before/after.
 */

const LANE_DOTS = 7;
const CYCLE = 7; // seconds — one full pass of the stream

/** Fraction of the lane each "by hand" dot survives before it drops out. */
const DECAY_AT = [0.34, 0.52, 1, 0.42, 0.7, 1, 0.28];

export default function LeadFlowAnimation({ d }: { d: V2Copy["hero"]["anim"] }) {
  return (
    <div className="v3-flow w-full max-w-2xl mx-auto">
      <style>{`
        @keyframes v3-travel {
          0%   { left: 0%;   opacity: 0; }
          4%   { opacity: 1; }
          100% { left: 100%; opacity: 1; }
        }
        @keyframes v3-travel-die {
          0%   { left: 0%; opacity: 0; transform: translate(-50%,-50%) scale(1); }
          4%   { opacity: 1; }
          100% { left: 100%; opacity: 0; transform: translate(-50%, 26px) scale(0.5); }
        }
        @keyframes v3-pulse-ring {
          0%, 100% { transform: translate(-50%,-50%) scale(1);   opacity: 0.35; }
          50%      { transform: translate(-50%,-50%) scale(1.9); opacity: 0; }
        }
        @keyframes v3-tally {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
        .v3-dot {
          position: absolute;
          top: 50%;
          width: 9px; height: 9px;
          border-radius: 999px;
          transform: translate(-50%,-50%);
          will-change: left, opacity, transform;
        }
        .v3-lane-track {
          position: absolute;
          left: 0; right: 0; top: 50%;
          height: 1px;
          transform: translateY(-50%);
        }
        @media (prefers-reduced-motion: reduce) {
          .v3-dot { animation: none !important; }
          .v3-flow .v3-tally { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* Source label */}
      <p
        className="font-label text-fg/40 text-center mb-4"
        style={{ fontSize: "9px", letterSpacing: "2.2px", textTransform: "uppercase" }}
      >
        {d.sourceLabel}
      </p>

      <div className="flex flex-col gap-2.5">
        {/* ── Lane 1: by hand ── */}
        <div
          className="relative rounded-xl flex items-center"
          style={{
            height: "62px",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.012)",
            paddingLeft: "88px",
            paddingRight: "74px",
          }}
        >
          <span
            className="font-label absolute text-fg/45"
            style={{ left: "14px", fontSize: "9px", letterSpacing: "1.4px", textTransform: "uppercase" }}
          >
            {d.todayLabel}
          </span>

          <div className="relative w-full" style={{ height: "100%" }}>
            <span
              className="v3-lane-track"
              aria-hidden
              style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.09), rgba(248,113,113,0.14))" }}
            />
            {Array.from({ length: LANE_DOTS }, (_, i) => {
              const dies = DECAY_AT[i] < 1;
              return (
                <span
                  key={i}
                  aria-hidden
                  className="v3-dot"
                  style={{
                    background: dies ? "rgba(248,113,113,0.85)" : "rgba(240,236,230,0.55)",
                    animation: `${dies ? "v3-travel-die" : "v3-travel"} ${CYCLE * (dies ? DECAY_AT[i] : 1)}s linear ${(i * CYCLE) / LANE_DOTS}s infinite`,
                  }}
                />
              );
            })}
          </div>

          <span
            className="font-label absolute"
            style={{
              right: "14px",
              fontSize: "11px",
              letterSpacing: "0.5px",
              color: "rgba(248,113,113,0.8)",
            }}
          >
            5/7 {d.todayResult}
          </span>
        </div>

        {/* ── Lane 2: with a system ── */}
        <div
          className="relative rounded-xl flex items-center"
          style={{
            height: "62px",
            border: "1px solid rgba(212,255,43,0.18)",
            background: "rgba(212,255,43,0.028)",
            paddingLeft: "88px",
            paddingRight: "74px",
          }}
        >
          <span
            className="font-label absolute text-accent/70"
            style={{ left: "14px", fontSize: "9px", letterSpacing: "1.4px", textTransform: "uppercase" }}
          >
            {d.systemLabel}
          </span>

          <div className="relative w-full" style={{ height: "100%" }}>
            <span
              className="v3-lane-track"
              aria-hidden
              style={{ background: "linear-gradient(90deg, rgba(212,255,43,0.18), rgba(212,255,43,0.42))" }}
            />
            {Array.from({ length: LANE_DOTS }, (_, i) => (
              <span key={i} aria-hidden>
                {/* answered-instantly pulse ring */}
                <span
                  className="v3-dot"
                  style={{
                    left: "6%",
                    width: "13px",
                    height: "13px",
                    border: "1px solid rgba(212,255,43,0.8)",
                    animation: `v3-pulse-ring 1.1s ease-out ${(i * CYCLE) / LANE_DOTS + 0.25}s infinite`,
                  }}
                />
                <span
                  className="v3-dot"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 10px rgba(212,255,43,0.5)",
                    animation: `v3-travel ${CYCLE}s linear ${(i * CYCLE) / LANE_DOTS}s infinite`,
                  }}
                />
              </span>
            ))}
          </div>

          <span
            className="v3-tally font-label absolute text-accent"
            style={{
              right: "14px",
              fontSize: "11px",
              letterSpacing: "0.5px",
              animation: "v3-tally 3s ease-in-out infinite",
            }}
          >
            7/7 {d.systemResult}
          </span>
        </div>
      </div>

      <p className="text-center mt-4 font-sora font-light text-fg/45" style={{ fontSize: "12.5px" }}>
        {d.caption}
      </p>
    </div>
  );
}
