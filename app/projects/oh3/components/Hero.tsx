"use client";

import { motion } from "framer-motion";
import { useGate } from "./GateContext";
import { Highlight } from "./Highlight";
import { Dot } from "./Dot";
import { PRICE, SETUP, TERMS } from "../lib/config";

/**
 * Hero on the 40px grid background. No chat animation here — the real video
 * in the section right below does that job now. One job: get the tap on the
 * CTA, which scrolls straight to the video + form section.
 *
 * MOBILE VIEWPORT FIT (oh3-only requirement): at 375×667 and 390×844 this
 * section must show everything — badge, headline, subhead, price chip, CTA,
 * microcopy — with zero scroll. `min-h-[100svh]` (svh, not vh, so mobile
 * browser URL bars don't cause a sliver of overflow) + `flex flex-col
 * justify-center` centers the whole stack vertically; `pt-20` clears the
 * fixed h-20 nav so the badge never sits under it. The headline uses a
 * clamp() so it scales down on narrow/short phones instead of wrapping to
 * 5+ lines — `sm:text-*` overrides restore the full display scale on tablet+
 * where there's no one-screen constraint. Every gap is tightened for mobile
 * (`sm:` prefixes restore the original breathing room on larger screens).
 *
 * oh3 keeps oh2's promise: this base does NOT run ads — it answers and books
 * the contractor's EXISTING calls/texts/forms.
 */
export function Hero() {
  const { scrollToDemo } = useGate();

  return (
    <section
      id="top"
      className="oh-grid-bg relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-white pt-20 pb-4 sm:min-h-0 sm:pt-36 sm:pb-10"
    >
      {/* soft fade so the grid doesn't fight the copy */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white" />

      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#171e19]/70 sm:text-xs sm:tracking-[0.2em]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffe17c] sm:h-2 sm:w-2" />
          Done-for-you AI front desk for home-service pros
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="oh-display mx-auto mt-3 max-w-4xl text-[clamp(1.5rem,7vw,2.5rem)] text-[#171e19] sm:mt-6 sm:text-7xl lg:text-8xl"
        >
          Every lead answered, qualified &amp; <Highlight>booked</Highlight> — in under 60 seconds<Dot />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto mt-2 max-w-xl text-xs leading-snug text-[#171e19]/70 sm:mt-6 sm:text-lg sm:leading-normal"
        >
          Your AI receptionist picks up every call, text, and form in seconds — qualifies
          the job and books it straight onto your calendar. 24/7, even while you&apos;re up
          on a roof. Up and running in 48 hours.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mx-auto mt-2 inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 rounded-full border border-[#171e19]/15 bg-[#f8f9fa] px-3 py-1 text-[11px] font-bold text-[#171e19] sm:mt-4 sm:px-4 sm:py-2 sm:text-sm"
        >
          {PRICE} <span className="text-[#171e19]/30">·</span> {SETUP}{" "}
          <span className="text-[#171e19]/30">·</span> {TERMS.replace("No contract · ", "")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-4 sm:mt-10"
        >
          <button
            type="button"
            onClick={scrollToDemo}
            className="oh-display oh-card inline-block rounded-lg bg-[#ffe17c] px-6 py-3 text-base text-[#171e19] shadow-xl hover:scale-105 min-h-[48px] sm:px-8 sm:py-4 sm:text-2xl sm:min-h-[56px]"
          >
            Watch it book a real job
          </button>
          <p className="mt-1.5 text-[11px] text-[#171e19]/60 sm:mt-4 sm:text-sm">
            See it answer and book a real lead — live.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
