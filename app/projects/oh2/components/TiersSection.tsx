"use client";

import { useGate } from "./GateContext";
import { PRICE, SETUP } from "../lib/config";

/**
 * "Pick your lane" — tiered pricing, placed after the value stack and before
 * the final CTA. This is NOT three equal choices: the $499 AI Front Desk is
 * the visual hero ("Start here"), and the higher tiers exist to anchor it and
 * show the growth path. Every CTA opens the SAME gated booking form — there is
 * no per-tier checkout.
 *
 * The guarantee strategy lives here: the front desk carries an honest,
 * fully-deliverable speed guarantee (we control response time), while the
 * "booked jobs in 30 days" outcome guarantee sits on the Lead Gen tier — the
 * only tier that includes ads, so it's the only tier where we control lead
 * volume and can actually honor it.
 *
 * Zero-CLS: no animation here; uniform min-height + items-stretch lock the
 * cards to equal heights, CTAs pinned to the bottom so they align.
 */

type Tier = {
  name: string;
  price: string;
  priceNote?: string;
  badge?: string;
  desc: string;
  guarantee?: string;
  hero?: boolean;
  dark?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "AI Front Desk",
    price: PRICE,
    priceNote: SETUP,
    badge: "Start here",
    desc:
      "Everything you just saw. Your AI answers, qualifies, and books every lead. Never miss a call again.",
    guarantee: "Answered in 60 seconds or that month's free.",
    hero: true,
  },
  {
    name: "Front Desk + Lead Gen",
    price: "From $1,000/mo",
    priceNote: "+ ad spend",
    desc:
      "We bring the customers too — Facebook ads, a landing page, and a bigger AI team on every channel.",
    guarantee: "Booked jobs in 30 days or you don't pay.",
  },
  {
    name: "Total Domination",
    price: "Custom",
    desc:
      "Everything, plus SEO and AI search — so you show up first on Google AND in ChatGPT across your whole service area.",
    dark: true,
  },
];

export function TiersSection() {
  const { openGate } = useGate();

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="oh-display text-center text-5xl text-[#171e19] sm:text-7xl">
          Pick your lane.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-[#171e19]/70">
          Start with the front desk. Add leads and visibility when you&apos;re ready.
        </p>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
          {TIERS.map((t) => {
            const dark = t.dark;
            return (
              <div
                key={t.name}
                className={`oh-card relative flex min-h-[440px] flex-col rounded-2xl p-7 ${
                  t.hero
                    ? "border-2 border-[#ffe17c] bg-white shadow-2xl"
                    : dark
                    ? "border border-[#b7c6c2]/10 bg-[#171e19] text-white shadow-xl"
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

                <div className="mt-4 flex flex-wrap items-baseline gap-x-2">
                  <span
                    className={`oh-display text-4xl ${
                      t.hero ? "text-[#171e19]" : dark ? "text-[#ffe17c]" : "text-[#171e19]"
                    }`}
                  >
                    {t.price}
                  </span>
                  {t.priceNote && (
                    <span className={`text-sm font-bold ${dark ? "text-white/60" : "text-[#171e19]/55"}`}>
                      {t.priceNote}
                    </span>
                  )}
                </div>

                <p className={`mt-4 text-base ${dark ? "text-white/75" : "text-[#171e19]/70"}`}>
                  {t.desc}
                </p>

                {t.guarantee && (
                  <p
                    className={`mt-4 inline-flex items-start gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                      t.hero
                        ? "bg-[#ffe17c]/20 text-[#171e19]"
                        : "bg-[#171e19]/5 text-[#171e19]/80"
                    }`}
                  >
                    <span aria-hidden className="text-[#171e19]">✓</span> {t.guarantee}
                  </p>
                )}

                <button
                  type="button"
                  onClick={openGate}
                  className={`oh-display oh-card mt-auto w-full rounded-lg px-6 py-4 text-lg shadow-lg hover:scale-[1.02] min-h-[52px] ${
                    t.hero
                      ? "bg-[#ffe17c] text-[#171e19]"
                      : dark
                      ? "bg-[#ffe17c] text-[#171e19]"
                      : "border border-[#171e19] bg-transparent text-[#171e19]"
                  }`}
                >
                  Book your free call
                </button>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-xl text-center text-sm text-[#171e19]/50">
          Not sure which lane? Book the free call — we&apos;ll point you to the right one.
        </p>
      </div>
    </section>
  );
}
