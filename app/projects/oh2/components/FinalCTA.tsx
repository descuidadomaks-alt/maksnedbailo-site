"use client";

import { useGate } from "./GateContext";

/**
 * Final section — 30-day risk-free refund close on the yellow band, with a
 * faint giant Anton overlay behind. No time-bound go-live claim. CTA opens
 * the booking form.
 */
export function FinalCTA() {
  const { openGate } = useGate();

  return (
    <section className="relative overflow-hidden bg-[#ffe17c] py-20 sm:py-28">
      {/* faint oversized overlay */}
      <span
        aria-hidden
        className="oh-display pointer-events-none absolute inset-0 flex items-center justify-center text-[24vw] leading-none text-[#171e19]/10"
      >
        RISK-FREE
      </span>

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <h2 className="oh-display text-5xl leading-[0.9] text-[#171e19] sm:text-7xl lg:text-8xl">
          Try it risk-free for 30 days.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-xl text-[#171e19]/80 sm:text-2xl">
          Not happy for any reason in your first 30 days? We refund every cent — and you keep
          your website. $0 setup. No contract. Cancel anytime.
        </p>

        <p className="mx-auto mt-5 max-w-xl text-sm font-medium text-[#171e19]/70">
          We take a limited number of businesses per area — you&apos;re never up against our
          own clients.
        </p>

        <button
          type="button"
          onClick={openGate}
          className="oh-display oh-card mt-9 inline-block rounded-lg bg-[#171e19] px-8 py-5 text-xl text-white shadow-xl hover:scale-105 sm:text-2xl min-h-[56px]"
        >
          Book your free call
        </button>
      </div>
    </section>
  );
}
