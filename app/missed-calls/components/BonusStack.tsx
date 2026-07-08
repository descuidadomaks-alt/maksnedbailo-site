import { BONUSES, BONUS_TOTAL, PRICE_PILOT } from "../lib/config";
import { Dot } from "./Dot";

const fmt = (n: number) => `£${n.toLocaleString("en-GB")}`;

/** Bonus ledger — same "add it up, strike it, reveal the price" pattern as the oh-family OfferStack. */
export function BonusStack() {
  return (
    <section className="bg-[#171e19] px-5 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="oh-display text-center text-4xl sm:text-6xl">
          What&apos;s included<Dot white />
        </h2>

        <div className="oh-card mt-10 overflow-hidden rounded-2xl border border-[#b7c6c2]/15 bg-[#0f1410] shadow-2xl">
          <ul>
            {BONUSES.map((b, i) => (
              <li
                key={b.name}
                className={`flex items-start justify-between gap-4 px-5 py-4 sm:px-8 ${
                  i !== BONUSES.length - 1 ? "border-b border-[#b7c6c2]/10" : ""
                }`}
              >
                <span>
                  <span className="block text-sm font-medium text-white/90 sm:text-base">
                    {b.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-white/45">{b.note}</span>
                </span>
                <span className="flex-none tabular-nums text-base font-bold text-[#ffe17c] sm:text-lg">
                  {fmt(b.value)}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t-2 border-dashed border-[#b7c6c2]/20 bg-[#171e19] px-5 py-8 text-center sm:px-8">
            <p className="text-base font-bold text-white/45 line-through sm:text-lg">
              Bonus value: {fmt(BONUS_TOTAL)}
            </p>
            <p className="mt-2 text-sm text-white/60">
              Included free with the {PRICE_PILOT} pilot — not sold separately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
