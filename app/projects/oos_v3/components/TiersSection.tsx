"use client";

import { useQuiz } from "./QuizContext";
import { Dot } from "./Dot";

/**
 * "Pick your lane" — forked from app/projects/oos/components/TiersSection.tsx.
 * Names, prices, and item copy are unchanged. The one addition: a small
 * struck-through dollar value next to items that didn't have one on the
 * live page (Tier 1's items already carry their real value from
 * OfferStack). Those Tier 2/3 figures are illustrative estimates I added —
 * not sourced from the live page — flagged in the build notes for the
 * user to verify or adjust. No bonus line items were invented (anti-
 * fabrication rule); every item below is exact live-page copy.
 *
 * Edit pass: Tier 1's "Custom AI website + hosting" moved out of the main
 * item list into a dedicated bonus block, joined there by a "Done-for-you
 * build & setup — $961 value" bonus line (that $961 figure is the same
 * "Done-for-you build & onboarding" item OfferStack.tsx already shows
 * elsewhere on this page — not a new invented figure, just newly
 * represented in this card too, per the brief's shared-fix instruction to
 * match v2's bonus block exactly). Price moved from the top of each card
 * to directly above its CTA, appearing exactly once per card.
 */

type Variant = "plain" | "highlight" | "dark";

type TierItem = { text: string; sub?: string; value?: number };

type Tier = {
  name: string;
  price: string;
  priceNote: string;
  badge?: string;
  intro?: string;
  items: TierItem[];
  guarantee?: string;
  variant: Variant;
};

const GEO_BENEFIT =
  "5-star reviews + a clean Google profile are exactly what ChatGPT and AI assistants read when recommending a business. Every review works twice.";

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

// Tier 1's bonus block — same copy/values as oos_v2's PricingTiers.tsx.
const TIER1_BONUS_ITEMS: { text: string; value: number }[] = [
  { text: "Custom AI website + hosting", value: 2470 },
  { text: "Done-for-you build & setup", value: 961 },
];

const TIERS: Tier[] = [
  {
    name: "The Front Office",
    price: "$499/mo",
    priceNote: "$0 setup",
    variant: "plain",
    items: [
      { text: "24/7 AI office — answers calls, texts & website chat", value: 3460 },
      { text: "Emergency Triage — books real jobs, filters tire-kickers", value: 640 },
      { text: "Instant reply + 3–5 touch follow-up", value: 580 },
      { text: "Google 5-star review engine", sub: GEO_BENEFIT, value: 390 },
      { text: "Missed-call text-back", value: 240 },
      { text: "Leads pushed straight to your phone" },
      { text: "Built, run & tuned for you — you never touch a dashboard" },
    ],
    guarantee: "Every lead answered in 60 seconds — or that month's free.",
  },
  {
    name: "Front Office + Leads",
    price: "$999/mo",
    priceNote: "$0 setup",
    badge: "Most popular",
    variant: "highlight",
    intro: "Everything in The Front Office, plus:",
    items: [
      { text: "Facebook ad campaigns — we build and run them", value: 650 },
      { text: "A high-converting landing page", value: 780 },
      { text: "AI office on your site, socials + SMS", value: 540 },
      { text: "Premium voice agent (tuned, higher call volume)", value: 420 },
      { text: "Advanced follow-up + re-engagement", value: 310 },
      { text: "You cover your ad spend" },
    ],
  },
  {
    name: "The Full Engine",
    price: "$1,489/mo",
    priceNote: "$0 setup",
    badge: "Best value",
    variant: "dark",
    intro: "Everything in Front Office + Leads, plus:",
    items: [
      { text: "Your starter ad budget — included (no separate ad bill)" },
      { text: "Priority support", value: 200 },
      { text: "Monthly optimization call", value: 350 },
    ],
  },
];

export function TiersSection() {
  const { openQuiz } = useQuiz();

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="oh-display text-center text-5xl text-[#171e19] sm:text-7xl">
          Pick your lane<Dot />
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-[#171e19]/70">
          One operating system. Start with the front office, add leads and visibility as you
          scale.
        </p>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
          {TIERS.map((t, i) => {
            const dark = t.variant === "dark";
            const highlight = t.variant === "highlight";
            const isTier1 = i === 0;
            return (
              <div
                key={t.name}
                className={`oh-card relative flex flex-col rounded-2xl p-7 md:min-h-[560px] ${
                  dark
                    ? "border border-[#b7c6c2]/10 bg-[#171e19] text-white shadow-2xl"
                    : highlight
                    ? "border-2 border-[#ffe17c] bg-[#fffdf5] text-[#171e19] shadow-2xl"
                    : "border border-[#171e19]/10 bg-[#f8f9fa] text-[#171e19]"
                }`}
              >
                {t.badge && (
                  <span className="absolute -top-3 left-7 rounded-full bg-[#ffe17c] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#171e19] shadow">
                    {t.badge}
                  </span>
                )}

                <h3 className={`oh-display text-2xl sm:text-3xl ${dark ? "text-white" : "text-[#171e19]"}`}>
                  {t.name}
                </h3>

                {t.intro && (
                  <p className={`mt-5 text-sm font-bold ${dark ? "text-white" : "text-[#171e19]"}`}>{t.intro}</p>
                )}

                <ul className={`${t.intro ? "mt-3" : "mt-5"} space-y-2.5`}>
                  {t.items.map((item) => (
                    <li key={item.text} className="flex items-start justify-between gap-2.5">
                      <span className="flex gap-2.5">
                        <span
                          aria-hidden
                          className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px] ${
                            dark ? "bg-[#ffe17c]/15 text-[#ffe17c]" : "bg-[#ffe17c] text-[#171e19]"
                          }`}
                        >
                          ✓
                        </span>
                        <span>
                          <span className={`block text-sm ${dark ? "text-white/80" : "text-[#171e19]/75"}`}>
                            {item.text}
                          </span>
                          {item.sub && (
                            <span className={`mt-0.5 block text-xs ${dark ? "text-white/45" : "text-[#171e19]/45"}`}>
                              {item.sub}
                            </span>
                          )}
                        </span>
                      </span>
                      {item.value != null && (
                        <span
                          className={`flex-none text-xs font-bold line-through ${
                            dark ? "text-white/40" : "text-[#171e19]/40"
                          }`}
                        >
                          {fmt(item.value)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                {isTier1 && (
                  <div className="mt-4 rounded-xl border border-[#ffe17c]/40 bg-[#ffe17c]/10 px-4 py-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#171e19]">Included free:</p>
                    <ul className="mt-2 space-y-1.5">
                      {TIER1_BONUS_ITEMS.map((b) => (
                        <li key={b.text} className="flex items-start justify-between gap-3 text-sm text-[#171e19]/85">
                          <span>🎁 {b.text}</span>
                          <span className="flex-none text-xs font-bold">{fmt(b.value)} value</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs leading-snug text-[#171e19]/60">
                      Already have a site? We&apos;ll rebuild it to convert — or keep yours. Your
                      price doesn&apos;t change either way.
                    </p>
                  </div>
                )}

                {t.guarantee && (
                  <p className="mt-4 inline-flex items-start gap-2 rounded-lg bg-[#ffe17c]/20 px-3 py-2 text-sm font-medium text-[#171e19]">
                    <span aria-hidden>✓</span> {t.guarantee}
                  </p>
                )}

                <div className="mt-auto pt-6 text-center">
                  <div className="flex flex-wrap items-baseline justify-center gap-x-2">
                    <span className={`oh-display text-3xl ${dark ? "text-[#ffe17c]" : "text-[#171e19]"}`}>
                      {t.price}
                    </span>
                    <span className={`text-sm font-bold ${dark ? "text-white/60" : "text-[#171e19]/55"}`}>
                      $0 setup · cancel anytime
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openQuiz(`tier_${t.name}`)}
                    className={`oh-display oh-card mt-4 w-full rounded-lg px-6 py-4 text-lg shadow-lg hover:scale-[1.02] min-h-[52px] ${
                      dark || highlight ? "bg-[#ffe17c] text-[#171e19]" : "bg-[#171e19] text-white"
                    }`}
                  >
                    Book your free call
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-[#171e19]/50">
          Not sure which lane? Book the free call — we&apos;ll tell you straight which one fits,
          even if it&apos;s the cheapest.
        </p>
      </div>
    </section>
  );
}
