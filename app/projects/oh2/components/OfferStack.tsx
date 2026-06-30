"use client";

import { useGate } from "./GateContext";
import { PRICE } from "../lib/config";

/**
 * Value stack. Hormozi-style: total the value, strike it, reveal the real
 * price. Two-column ledger (feature left, value right-aligned + tabular) so
 * the "$8,741 → $499" contrast lands. Values are exact/non-round on purpose —
 * round numbers read as made-up.
 *
 * ROWS must sum to TOTAL. If you edit a value, update TOTAL to match.
 */

const ROWS: { item: string; value: number }[] = [
  { item: "Custom AI website + hosting", value: 2470 },
  { item: "24/7 AI receptionist (voice + chat)", value: 3460 },
  { item: "Emergency Triage — real jobs, not tire-kickers", value: 640 },
  { item: "Instant reply + 3–5 touch follow-up", value: 580 },
  { item: "Google 5-star review engine", value: 390 },
  { item: "Missed-call text-back", value: 240 },
  { item: "Done-for-you build & onboarding", value: 961 },
];

const TOTAL = ROWS.reduce((sum, r) => sum + r.value, 0); // 8741
const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

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
                className={`flex items-baseline justify-between gap-4 px-5 py-4 sm:px-8 ${
                  i !== ROWS.length - 1 ? "border-b border-[#b7c6c2]/10" : ""
                }`}
              >
                <span className="line-clamp-2 text-sm font-medium text-white/90 sm:text-base">
                  {row.item}
                </span>
                <span className="flex-none tabular-nums text-base font-bold text-[#ffe17c] sm:text-lg">
                  {fmt(row.value)}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t-2 border-dashed border-[#b7c6c2]/20 bg-[#171e19] px-5 py-8 text-center sm:px-8">
            <p className="text-base font-bold text-white/45 line-through sm:text-lg">
              Total value: {fmt(TOTAL)}
            </p>
            <p className="oh-display mt-3 text-5xl text-[#ffe17c] sm:text-6xl">
              Today: {PRICE}
            </p>
            <p className="mt-2 text-sm font-medium text-white/70">
              $0 setup · cancel anytime
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
