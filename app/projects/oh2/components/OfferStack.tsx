"use client";

import { useGate } from "./GateContext";
import { PRICE, SETUP, TERMS } from "../lib/config";

/**
 * New centerpiece section — the value stack. Hormozi-style: anchor a big
 * stacked value, then reveal the real price underneath it. High-contrast
 * card on a dark band so it reads as the "wait, that's it?" moment.
 */

const ROWS = [
  { item: "Custom AI-built website + hosting", value: "$2,500 value" },
  {
    item: "24/7 AI voice + chat receptionist (answers, qualifies, books)",
    value: "replaces a $3,500/mo receptionist",
  },
  { item: "Emergency Triage — books real jobs, filters tire-kickers", value: "$500/mo value" },
  { item: "Instant response + 3–5 touch follow-up (kills no-shows)", value: "$400/mo value" },
  { item: "Google 5-star review engine", value: "$300/mo value" },
  { item: "Missed-call text-back", value: "$200/mo value" },
  { item: "Done-for-you setup, live in 48 hours", value: "$1,000 value" },
];

export function OfferStack() {
  const { openGate } = useGate();

  return (
    <section className="bg-[#171e19] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="oh-display text-center text-5xl text-white sm:text-7xl">
          Add it all up.
        </h2>

        <div className="oh-card mt-10 overflow-hidden rounded-2xl border border-[#b7c6c2]/15 bg-[#0f1410] shadow-2xl">
          <ul>
            {ROWS.map((row, i) => (
              <li
                key={row.item}
                className={`flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 ${
                  i !== ROWS.length - 1 ? "border-b border-[#b7c6c2]/10" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#ffe17c]/15 text-xs text-[#ffe17c]">
                    ✓
                  </span>
                  <span className="text-sm text-white/90 sm:text-base">{row.item}</span>
                </div>
                <span className="flex-none pl-9 text-xs font-bold uppercase tracking-wide text-[#ffe17c] sm:pl-0 sm:text-right sm:text-sm">
                  {row.value}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t-2 border-dashed border-[#b7c6c2]/20 bg-[#171e19] px-5 py-8 text-center sm:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">
              Total value: $4,000+/mo
            </p>
            <p className="oh-display mt-3 text-5xl text-[#ffe17c] sm:text-6xl">
              You pay: {PRICE}
            </p>
            <p className="mt-2 text-base font-bold text-white/80">
              {SETUP} · {TERMS.replace("No contract · ", "")}
            </p>
            <p className="mx-auto mt-5 max-w-md text-sm text-white/55">
              Other agencies charge $500–$1,500 just to switch it on. We charge nothing for
              setup — we&apos;d rather earn your business every single month.
            </p>

            <button
              type="button"
              onClick={openGate}
              className="oh-display oh-card mt-7 inline-block rounded-lg bg-[#ffe17c] px-8 py-4 text-xl text-[#171e19] shadow-xl hover:scale-105 min-h-[56px]"
            >
              Claim your spot
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
