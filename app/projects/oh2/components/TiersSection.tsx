"use client";

import { useGate } from "./GateContext";

/**
 * "Pick your lane" — tiered pricing after the value stack, before the final
 * close. Not three equal choices: each tier shows its full inclusion list,
 * and the higher tiers use an "Everything in [previous], plus:" pattern so the
 * deltas are obvious. Card 2 is the highlighted "Most popular"; Card 3 is the
 * dark premium "Best value" anchor. Every CTA opens the SAME booking form —
 * no per-tier checkout.
 *
 * Zero-CLS: no animation; uniform min-height + items-stretch lock equal card
 * heights, CTAs pinned to the bottom so they align across all three.
 */

type Variant = "plain" | "highlight" | "dark";

type Tier = {
  name: string;
  price: string;
  priceNote: string;
  badge?: string;
  intro?: string;
  items: string[];
  guarantee?: string;
  variant: Variant;
};

const TIERS: Tier[] = [
  {
    name: "AI Front Desk",
    price: "$499/mo",
    priceNote: "$0 setup",
    variant: "plain",
    items: [
      "Custom AI website + hosting",
      "24/7 AI receptionist (voice + chat) — answers, qualifies, books",
      "Emergency Triage — books real jobs, filters tire-kickers",
      "Instant reply + 3–5 touch follow-up",
      "Google 5-star review engine",
      "Missed-call text-back",
      "Leads pushed straight to your phone",
    ],
    guarantee: "Every lead answered in 60 seconds — or that month's free.",
  },
  {
    name: "Front Desk + Leads",
    price: "$999/mo",
    priceNote: "$0 setup",
    badge: "Most popular",
    variant: "highlight",
    intro: "Everything in AI Front Desk, plus:",
    items: [
      "Facebook ad campaigns — we build and run them",
      "A high-converting landing page",
      "AI on every channel (site + Instagram + Facebook + SMS)",
      "Premium voice agent (tuned, higher call volume)",
      "Advanced follow-up + re-engagement",
      "You cover your ad spend",
    ],
  },
  {
    name: "The Full Engine",
    price: "$1,489/mo",
    priceNote: "$0 setup",
    badge: "Best value",
    variant: "dark",
    intro: "Everything in Front Desk + Leads, plus:",
    items: [
      "Your starter ad budget — included (no separate ad bill)",
      "AI Smart Quotes — instant estimates from your pricing, so tire-kickers filter themselves",
      "Get found on Google AND ChatGPT (AI-search visibility)",
      "Priority support",
    ],
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
            const dark = t.variant === "dark";
            const highlight = t.variant === "highlight";
            return (
              <div
                key={t.name}
                className={`oh-card relative flex min-h-[560px] flex-col rounded-2xl p-7 ${
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

                <div className="mt-4 flex flex-wrap items-baseline gap-x-2">
                  <span className={`oh-display text-4xl ${dark ? "text-[#ffe17c]" : "text-[#171e19]"}`}>
                    {t.price}
                  </span>
                  <span className={`text-sm font-bold ${dark ? "text-white/60" : "text-[#171e19]/55"}`}>
                    {t.priceNote}
                  </span>
                </div>

                {t.intro && (
                  <p className={`mt-5 text-sm font-bold ${dark ? "text-white/80" : "text-[#171e19]/80"}`}>
                    {t.intro}
                  </p>
                )}

                <ul className={`${t.intro ? "mt-3" : "mt-5"} space-y-2.5`}>
                  {t.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span
                        aria-hidden
                        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px] ${
                          dark ? "bg-[#ffe17c]/15 text-[#ffe17c]" : "bg-[#ffe17c] text-[#171e19]"
                        }`}
                      >
                        ✓
                      </span>
                      <span className={`text-sm ${dark ? "text-white/80" : "text-[#171e19]/75"}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {t.guarantee && (
                  <p className="mt-4 inline-flex items-start gap-2 rounded-lg bg-[#ffe17c]/20 px-3 py-2 text-sm font-medium text-[#171e19]">
                    <span aria-hidden>✓</span> {t.guarantee}
                  </p>
                )}

                <button
                  type="button"
                  onClick={openGate}
                  className={`oh-display oh-card mt-auto w-full rounded-lg px-6 py-4 text-lg shadow-lg hover:scale-[1.02] min-h-[52px] ${
                    dark || highlight
                      ? "bg-[#ffe17c] text-[#171e19]"
                      : "bg-[#171e19] text-white"
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
