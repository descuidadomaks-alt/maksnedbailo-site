"use client";

import { useQuiz } from "./QuizContext";
import { useScarcityLine } from "./LocationContext";
import { GeoPin } from "./GeoPin";

/**
 * "Pick your lane" — replaces OfferPricingMorph.tsx. The scroll-morph
 * animation is gone entirely (no framer-motion, no whileInView, nothing
 * for prefers-reduced-motion to gate): the itemized value stack now just
 * lives as Tier 1's static card content, which is what let all three
 * cards become equal width/height in the first place.
 *
 * Tier 1's "Custom AI website + hosting" and "Done-for-you build &
 * onboarding" moved out of the main item list into a dedicated bonus
 * block (still counted in the total — nothing removed, only regrouped).
 * That drop from 7 main items to 5 is what balances Tier 1 against Tier
 * 2's 6 and Tier 3's 3 without needing to condense anything further.
 *
 * Total-value figures escalate tier over tier (Tier 2 = Tier 1's total +
 * Tier 2's own valued items; Tier 3 = Tier 2's total + Tier 3's own valued
 * items) — computed below from the same per-item values already in the
 * copy, not hardcoded, so editing an item's value keeps every total in
 * sync. Items with no stated value (e.g. "You cover your ad spend") are
 * listed without a number and excluded from every sum, per the
 * anti-fabrication rule — nothing here invents a dollar figure.
 */

const GEO_BENEFIT =
  "5-star reviews + a clean Google profile are exactly what ChatGPT and AI assistants read when recommending a business. Every review works twice.";

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

type LineItem = { text: string; sub?: string; value?: number };

const TIER1_ITEMS: LineItem[] = [
  { text: "24/7 AI office — answers calls, texts & website chat", value: 3460 },
  { text: "Emergency Triage — real jobs, not tire-kickers", value: 640 },
  { text: "Instant reply + 3–5 touch follow-up", value: 580 },
  { text: "Google 5-star review engine", sub: GEO_BENEFIT, value: 390 },
  { text: "Missed-call text-back", value: 240 },
];

const TIER1_BONUS_ITEMS: { text: string; value: number }[] = [
  { text: "Custom AI website + hosting", value: 2470 },
  { text: "Done-for-you build & setup", value: 961 },
];

const TIER2_ITEMS: LineItem[] = [
  { text: "Facebook ad campaigns — we build and run them", value: 650 },
  { text: "A high-converting landing page", value: 780 },
  { text: "AI office on your site, socials + SMS", value: 540 },
  { text: "Premium voice agent (tuned, higher call volume)", value: 420 },
  { text: "Advanced follow-up + re-engagement", value: 310 },
  { text: "You cover your ad spend" },
];

const TIER3_ITEMS: LineItem[] = [
  { text: "Your starter ad budget — included (no separate ad bill)" },
  { text: "Priority support", value: 200 },
  { text: "Monthly optimization call", value: 350 },
];

const sumValues = (items: LineItem[]) => items.reduce((sum, i) => sum + (i.value ?? 0), 0);

const TIER1_TOTAL = sumValues(TIER1_ITEMS) + sumValues(TIER1_BONUS_ITEMS); // 8,741
const TIER2_TOTAL = TIER1_TOTAL + sumValues(TIER2_ITEMS); // 11,441
const TIER3_TOTAL = TIER2_TOTAL + sumValues(TIER3_ITEMS); // 11,991

type Variant = "plain" | "highlight" | "dark";

function ItemRow({ item, dark }: { item: LineItem; dark: boolean }) {
  return (
    <li className="flex items-start justify-between gap-3">
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
          <span className={`block text-sm ${dark ? "text-white/80" : "text-[#171e19]/75"}`}>{item.text}</span>
          {item.sub && (
            <span className={`mt-0.5 block text-xs ${dark ? "text-white/45" : "text-[#171e19]/45"}`}>{item.sub}</span>
          )}
        </span>
      </span>
      {item.value != null && (
        <span className={`flex-none text-xs font-bold line-through ${dark ? "text-white/40" : "text-[#171e19]/40"}`}>
          {fmt(item.value)}
        </span>
      )}
    </li>
  );
}

function BonusBlock({ dark }: { dark: boolean }) {
  return (
    <div
      className={`mt-4 rounded-xl border px-4 py-4 ${
        dark ? "border-[#ffe17c]/30 bg-[#ffe17c]/[0.06]" : "border-[#ffe17c]/40 bg-[#ffe17c]/10"
      }`}
    >
      <p className={`text-xs font-bold uppercase tracking-wide ${dark ? "text-[#ffe17c]" : "text-[#171e19]"}`}>
        Included free:
      </p>
      <ul className="mt-2 space-y-1.5">
        {TIER1_BONUS_ITEMS.map((b) => (
          <li key={b.text} className={`flex items-baseline justify-between gap-2 text-sm ${dark ? "text-white/85" : "text-[#171e19]/85"}`}>
            <span>🎁 {b.text}</span>
            <span className="flex-none text-xs font-bold">— {fmt(b.value)} value</span>
          </li>
        ))}
      </ul>
      <p className={`mt-3 text-xs leading-snug ${dark ? "text-white/60" : "text-[#171e19]/60"}`}>
        Already have a site? We&apos;ll rebuild it to convert — or keep yours. Your price
        doesn&apos;t change either way.
      </p>
    </div>
  );
}

function cardClasses(variant: Variant) {
  if (variant === "dark") return "border border-[#b7c6c2]/10 bg-[#171e19] text-white shadow-2xl";
  if (variant === "highlight") return "border-2 border-[#ffe17c] bg-[#fffdf5] text-[#171e19] shadow-2xl";
  return "border border-[#b7c6c2]/15 bg-[#0f1410] text-white shadow-2xl";
}

export function PricingTiers() {
  const { openQuiz } = useQuiz();
  const scarcityLine = useScarcityLine();

  return (
    <section className="bg-[#171e19] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="oh-display text-center text-5xl text-white sm:text-7xl">Pick your lane.</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-white/60">
          One operating system. Start with the front office, add leads and visibility as you
          scale.
        </p>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
          {/* Tier 1 */}
          <div className={`oh-card relative flex min-h-[640px] flex-col rounded-2xl p-7 ${cardClasses("plain")}`}>
            <h3 className="oh-display text-2xl text-white sm:text-3xl">The Front Office</h3>
            <ul className="mt-5 space-y-2.5">
              {TIER1_ITEMS.map((item) => (
                <ItemRow key={item.text} item={item} dark />
              ))}
            </ul>
            <BonusBlock dark />
            <div className="mt-auto pt-6 text-center">
              <p className="text-sm font-bold text-white/45 line-through">Total value: {fmt(TIER1_TOTAL)}</p>
              <p className="oh-display mt-2 text-3xl text-[#ffe17c]">Today: $499/mo</p>
              <p className="mt-1 text-xs font-medium text-white/70">$0 setup</p>
              <p className="mx-auto mt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-[#ffe17c]">
                <GeoPin />
                {scarcityLine}
              </p>
              <button
                type="button"
                onClick={() => openQuiz("tier_1")}
                className="oh-display oh-card mt-5 w-full rounded-lg bg-[#ffe17c] px-6 py-4 text-lg text-[#171e19] shadow-xl hover:scale-[1.02] min-h-[52px]"
              >
                Claim your spot
              </button>
            </div>
          </div>

          {/* Tier 2 */}
          <div className={`oh-card relative flex min-h-[640px] flex-col rounded-2xl p-7 ${cardClasses("highlight")}`}>
            <span className="absolute -top-3 left-7 rounded-full bg-[#ffe17c] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#171e19] shadow">
              Most popular
            </span>
            <h3 className="oh-display text-2xl text-[#171e19] sm:text-3xl">Front Office + Leads</h3>
            <p className="oh-display mt-4 rounded-lg bg-[#171e19] px-3 py-2 text-center text-sm tracking-wide text-[#ffe17c]">
              EVERYTHING IN THE FRONT OFFICE, PLUS:
            </p>
            <ul className="mt-4 space-y-2.5">
              {TIER2_ITEMS.map((item) => (
                <ItemRow key={item.text} item={item} dark={false} />
              ))}
            </ul>
            <div className="mt-auto pt-6 text-center">
              <p className="text-sm font-bold text-[#171e19]/45 line-through">Total value: {fmt(TIER2_TOTAL)}</p>
              <p className="oh-display mt-2 text-3xl text-[#171e19]">Today: $999/mo</p>
              <p className="mt-1 text-xs font-medium text-[#171e19]/55">$0 setup</p>
              <button
                type="button"
                onClick={() => openQuiz("tier_2")}
                className="oh-display oh-card mt-5 w-full rounded-lg bg-[#ffe17c] px-6 py-4 text-lg text-[#171e19] shadow-lg hover:scale-[1.02] min-h-[52px]"
              >
                Book your free call
              </button>
            </div>
          </div>

          {/* Tier 3 */}
          <div className={`oh-card relative flex min-h-[640px] flex-col rounded-2xl p-7 ${cardClasses("dark")}`}>
            <span className="absolute -top-3 left-7 rounded-full bg-[#ffe17c] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#171e19] shadow">
              Best value
            </span>
            <h3 className="oh-display text-2xl text-white sm:text-3xl">The Full Engine</h3>
            <p className="oh-display mt-4 rounded-lg bg-[#ffe17c]/15 px-3 py-2 text-center text-sm tracking-wide text-[#ffe17c]">
              EVERYTHING IN FRONT OFFICE + LEADS, PLUS:
            </p>
            <ul className="mt-4 space-y-2.5">
              {TIER3_ITEMS.map((item) => (
                <ItemRow key={item.text} item={item} dark />
              ))}
            </ul>
            <div className="mt-auto pt-6 text-center">
              <p className="text-sm font-bold text-white/45 line-through">Total value: {fmt(TIER3_TOTAL)}</p>
              <p className="oh-display mt-2 text-3xl text-[#ffe17c]">Today: $1,489/mo</p>
              <p className="mt-1 text-xs font-medium text-white/70">$0 setup</p>
              <button
                type="button"
                onClick={() => openQuiz("tier_3")}
                className="oh-display oh-card mt-5 w-full rounded-lg bg-[#ffe17c] px-6 py-4 text-lg text-[#171e19] shadow-lg hover:scale-[1.02] min-h-[52px]"
              >
                Book your free call
              </button>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-white/50">
          Not sure which lane? Book the free call — we&apos;ll tell you straight which one fits,
          even if it&apos;s the cheapest.
        </p>
      </div>
    </section>
  );
}
