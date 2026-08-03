"use client";

import { useQuiz } from "./QuizContext";

/**
 * Single-offer pricing — replaces oos_v2's three-tier PricingTiers.tsx.
 * One centered card, same value-stack items/bonus block/price as oos_v2's
 * Tier 1 (nothing invented, same $499/mo, same $8,741 total value), no
 * "Most popular"/"Best value" badge since there's only one option. The
 * scarcity line is a static honest sentence — no LocationContext/GeoPin,
 * per the anti-fabrication removal in page.tsx.
 */

const GEO_BENEFIT =
  "5-star reviews + a clean Google profile are exactly what ChatGPT and AI assistants read when recommending a business. Every review works twice.";

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

type LineItem = { text: string; sub?: string; value?: number };

const CORE_ITEMS: LineItem[] = [
  { text: "24/7 AI office — answers calls, texts & website chat", value: 3460 },
  { text: "Emergency Triage — real jobs, not tire-kickers", value: 640 },
  { text: "Instant reply + 3–5 touch follow-up", value: 580 },
  { text: "Google 5-star review engine", sub: GEO_BENEFIT, value: 390 },
  { text: "Missed-call text-back", value: 240 },
];

const BONUS_ITEMS: { text: string; value: number }[] = [
  { text: "Custom AI website + hosting", value: 2470 },
  { text: "Done-for-you build & setup", value: 961 },
];

const TOTAL_VALUE =
  CORE_ITEMS.reduce((sum, i) => sum + (i.value ?? 0), 0) + BONUS_ITEMS.reduce((sum, i) => sum + i.value, 0); // 8,741

const EXCLUSIVITY = "Once you're in, we won't take on your direct competition.";

function ItemRow({ item }: { item: LineItem }) {
  return (
    <li className="flex items-start justify-between gap-3">
      <span className="flex gap-2.5">
        <span
          aria-hidden
          className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#ffe17c]/15 text-[11px] text-[#ffe17c]"
        >
          ✓
        </span>
        <span>
          <span className="block text-sm text-white/80">{item.text}</span>
          {item.sub && <span className="mt-0.5 block text-xs text-white/45">{item.sub}</span>}
        </span>
      </span>
      {item.value != null && (
        <span className="flex-none text-xs font-bold text-white/40 line-through">{fmt(item.value)}</span>
      )}
    </li>
  );
}

function BonusBlock() {
  return (
    <div className="mt-4 rounded-xl border border-[#ffe17c]/30 bg-[#ffe17c]/[0.06] px-4 py-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#ffe17c]">Included free:</p>
      <ul className="mt-2 space-y-1.5">
        {BONUS_ITEMS.map((b) => (
          <li key={b.text} className="flex items-start justify-between gap-3 text-sm text-white/85">
            <span>🎁 {b.text}</span>
            <span className="flex-none text-xs font-bold">{fmt(b.value)} value</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-snug text-white/60">
        Already have a site? We&apos;ll rebuild it to convert — or keep yours. Your price
        doesn&apos;t change either way.
      </p>
    </div>
  );
}

export function PricingCard() {
  const { openQuiz } = useQuiz();

  return (
    <section className="bg-[#171e19] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-lg px-5">
        <h2 className="oh-display text-center text-4xl text-white sm:text-6xl">
          Everything you need. One price.
        </h2>

        <div className="oh-card mt-10 flex flex-col rounded-2xl border border-[#b7c6c2]/15 bg-[#0f1410] p-7 shadow-2xl">
          <h3 className="oh-display text-2xl text-white sm:text-3xl">The Front Office</h3>
          <ul className="mt-5 space-y-2.5">
            {CORE_ITEMS.map((item) => (
              <ItemRow key={item.text} item={item} />
            ))}
          </ul>
          <BonusBlock />
          <div className="mt-6 text-center">
            <p className="text-sm font-bold text-white/45 line-through">Total value: {fmt(TOTAL_VALUE)}</p>
            <p className="oh-display mt-2 text-4xl text-[#ffe17c]">Today: $499/mo</p>
            <p className="mt-1 text-xs font-medium text-white/70">$0 setup · cancel anytime</p>
            <p className="mt-3 text-xs font-bold text-[#ffe17c]">{EXCLUSIVITY}</p>
            <button
              type="button"
              onClick={() => openQuiz("pricing_card")}
              className="oh-display oh-card mt-5 w-full rounded-lg bg-[#ffe17c] px-6 py-4 text-lg text-[#171e19] shadow-xl hover:scale-[1.02] min-h-[52px]"
            >
              Claim your spot
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
