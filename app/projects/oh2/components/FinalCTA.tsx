"use client";

import { useGate } from "./GateContext";

/**
 * Final section — book-a-call close on the yellow band, with a faint giant
 * Anton overlay behind. No time-bound guarantee (nothing is deployed yet, so
 * we don't promise a go-live window anywhere). CTA opens the booking form.
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
        BOOKED
      </span>

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <h2 className="oh-display text-5xl leading-[0.9] text-[#171e19] sm:text-7xl lg:text-8xl">
          See it working for your business.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-xl text-[#171e19]/80 sm:text-2xl">
          Book a free 15-minute call. We&apos;ll show you exactly how it&apos;d run for you —
          and we&apos;ll tell you straight if it&apos;s not a fit. $0 setup. No contract.
          Cancel anytime.
        </p>

        <p className="mx-auto mt-5 max-w-xl text-sm font-medium text-[#171e19]/70">
          We onboard a limited number of businesses per area — so you&apos;re never up
          against our own clients.
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
