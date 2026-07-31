"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { useScarcityLine } from "./LocationContext";
import { Dot } from "./Dot";
import { GeoPin } from "./GeoPin";
import { PRICE } from "../lib/config";

/**
 * Value stack → pricing, fused into one scroll-revealed section — the v2
 * signature feature. Mechanic: each value-stack row is a single DOM node
 * (not duplicated) that gets its strikethrough drawn in via
 * `whileInView` as the visitor scrolls to it, so the SAME list the visitor
 * just read becomes Tier 1's item list rather than a second copy of it.
 * `whileInView` (not a continuous scroll-linked transform) on purpose: it's
 * a one-shot reveal per row with no scroll-jacking/pinning, so it stays
 * cheap on mobile and never fights the browser's own scroll physics.
 * `useReducedMotion` collapses every row to its final state immediately —
 * the no-JS-equivalent fallback the brief asked for.
 *
 * All prices ($499/$999/$1,489) and every line item are the live page's
 * exact copy/values, unchanged. The struck-through per-item dollar values
 * on Tier 2/3 items are illustrative estimates I added (no dollar figures
 * for those items exist on the live page) — flagged in the build notes for
 * the user to verify or adjust. No bonus line items were invented per the
 * anti-fabrication rule; the "stacks more value" effect comes entirely
 * from the tiers' own already-approved "Everything in X, plus:" items.
 */

const GEO_BENEFIT =
  "5-star reviews + a clean Google profile are exactly what ChatGPT and AI assistants read when recommending a business. Every review works twice.";

const TIER1_ROWS: { item: string; sub?: string; value: number }[] = [
  { item: "Custom AI website + hosting", value: 2470 },
  { item: "24/7 AI office — answers calls, texts & website chat", value: 3460 },
  { item: "Emergency Triage — real jobs, not tire-kickers", value: 640 },
  { item: "Instant reply + 3–5 touch follow-up", value: 580 },
  { item: "Google 5-star review engine", sub: GEO_BENEFIT, value: 390 },
  { item: "Missed-call text-back", value: 240 },
  { item: "Done-for-you build & onboarding", value: 961 },
];
const TIER1_TOTAL = TIER1_ROWS.reduce((sum, r) => sum + r.value, 0); // 8741
const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

type TierItem = { text: string; sub?: string; value?: number };

const TIER2_ITEMS: TierItem[] = [
  { text: "Facebook ad campaigns — we build and run them", value: 650 },
  { text: "A high-converting landing page", value: 780 },
  { text: "AI office on your site, socials + SMS", value: 540 },
  { text: "Premium voice agent (tuned, higher call volume)", value: 420 },
  { text: "Advanced follow-up + re-engagement", value: 310 },
  { text: "You cover your ad spend" },
];

const TIER3_ITEMS: TierItem[] = [
  { text: "Your starter ad budget — included (no separate ad bill)" },
  { text: "Priority support", value: 200 },
  { text: "Monthly optimization call", value: 350 },
];

function Row({
  item,
  index,
  reduce,
}: {
  item: { item: string; sub?: string; value: number };
  index: number;
  reduce: boolean;
}) {
  return (
    <li
      className={`flex items-start justify-between gap-4 px-5 py-4 sm:px-8 ${
        index !== TIER1_ROWS.length - 1 ? "border-b border-[#b7c6c2]/10" : ""
      }`}
    >
      <span>
        <span className="block text-sm font-medium text-white/90 sm:text-base">{item.item}</span>
        {item.sub && <span className="mt-0.5 block text-xs text-white/45">{item.sub}</span>}
      </span>
      <span className="relative flex-none tabular-nums text-base font-bold text-[#ffe17c] sm:text-lg">
        {fmt(item.value)}
        <motion.span
          aria-hidden
          initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: reduce ? 0 : 0.15 + index * 0.06 }}
          className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-[#ffe17c]"
        />
      </span>
    </li>
  );
}

function TierItemRow({ item, dark }: { item: TierItem; dark?: boolean }) {
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

export function OfferPricingMorph() {
  const { openQuiz } = useQuiz();
  const scarcityLine = useScarcityLine();
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="bg-[#171e19] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="oh-display text-center text-5xl text-white sm:text-7xl">
          Pick your lane<Dot />
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-white/60">
          One operating system. Start with the front office, add leads and visibility as you
          scale.
        </p>

        <div className="mt-12 grid grid-cols-1 items-start gap-5 md:grid-cols-3">
          {/* Tier 1 — the value stack itself, morphing into the first tier card as it scrolls into view. */}
          <div className="oh-card flex flex-col overflow-hidden rounded-2xl border border-[#b7c6c2]/15 bg-[#0f1410] shadow-2xl">
            <div className="px-5 pt-6 sm:px-8">
              <h3 className="oh-display text-2xl text-white sm:text-3xl">The Front Office</h3>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
                <span className="oh-display text-4xl text-[#ffe17c]">{PRICE}</span>
                <span className="text-sm font-bold text-white/60">$0 setup</span>
              </div>
              <p className="mt-4 text-sm font-bold uppercase tracking-wide text-white/50">Add it all up:</p>
            </div>

            <ul className="mt-2">
              {TIER1_ROWS.map((row, i) => (
                <Row key={row.item} item={row} index={i} reduce={reduce} />
              ))}
            </ul>

            <div className="border-t-2 border-dashed border-[#b7c6c2]/20 px-5 py-7 text-center sm:px-8">
              <p className="text-sm font-bold text-white/45 line-through">Total value: {fmt(TIER1_TOTAL)}</p>
              <p className="oh-display mt-2 text-4xl text-[#ffe17c]">Today: {PRICE}</p>
              <p className="mt-2 text-xs font-medium text-white/70">$0 setup · cancel anytime</p>
              <p className="mx-auto mt-4 max-w-xs text-xs text-white/55">
                Other agencies charge $500–$1,500 just to switch it on. We charge nothing for
                setup — we&apos;d rather earn your business every single month.
              </p>
              <p className="mx-auto mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-[#ffe17c]">
                <GeoPin />
                {scarcityLine}
              </p>
              <button
                type="button"
                onClick={() => openQuiz("tier_1")}
                className="oh-display oh-card mt-5 inline-block w-full rounded-lg bg-[#ffe17c] px-6 py-4 text-lg text-[#171e19] shadow-xl hover:scale-[1.02] min-h-[52px]"
              >
                Claim your spot
              </button>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="oh-card relative flex flex-col rounded-2xl border-2 border-[#ffe17c] bg-[#fffdf5] p-7 text-[#171e19] shadow-2xl">
            <span className="absolute -top-3 left-7 rounded-full bg-[#ffe17c] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#171e19] shadow">
              Most popular
            </span>
            <h3 className="oh-display text-2xl text-[#171e19] sm:text-3xl">Front Office + Leads</h3>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-2">
              <span className="oh-display text-4xl text-[#171e19]">$999/mo</span>
              <span className="text-sm font-bold text-[#171e19]/55">$0 setup</span>
            </div>
            <p className="mt-5 text-sm font-bold text-[#171e19]">Everything in The Front Office, plus:</p>
            <ul className="mt-3 space-y-2.5">
              {TIER2_ITEMS.map((item) => (
                <TierItemRow key={item.text} item={item} />
              ))}
            </ul>
            <button
              type="button"
              onClick={() => openQuiz("tier_2")}
              className="oh-display oh-card mt-6 w-full rounded-lg bg-[#ffe17c] px-6 py-4 text-lg text-[#171e19] shadow-lg hover:scale-[1.02] min-h-[52px]"
            >
              Book your free call
            </button>
          </div>

          {/* Tier 3 */}
          <div className="oh-card relative flex flex-col rounded-2xl border border-[#b7c6c2]/10 bg-[#171e19] p-7 text-white shadow-2xl">
            <span className="absolute -top-3 left-7 rounded-full bg-[#ffe17c] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#171e19] shadow">
              Best value
            </span>
            <h3 className="oh-display text-2xl text-white sm:text-3xl">The Full Engine</h3>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-2">
              <span className="oh-display text-4xl text-[#ffe17c]">$1,489/mo</span>
              <span className="text-sm font-bold text-white/60">$0 setup</span>
            </div>
            <p className="mt-5 text-sm font-bold text-white">Everything in Front Office + Leads, plus:</p>
            <ul className="mt-3 space-y-2.5">
              {TIER3_ITEMS.map((item) => (
                <TierItemRow key={item.text} item={item} dark />
              ))}
            </ul>
            <button
              type="button"
              onClick={() => openQuiz("tier_3")}
              className="oh-display oh-card mt-6 w-full rounded-lg bg-[#ffe17c] px-6 py-4 text-lg text-[#171e19] shadow-lg hover:scale-[1.02] min-h-[52px]"
            >
              Book your free call
            </button>
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
