"use client";

import { motion } from "framer-motion";
import { useGate } from "./GateContext";
import { Highlight } from "./Highlight";
import { ChatLoop } from "./ChatLoop";
import { PRICE, SETUP, TERMS } from "../lib/config";

/**
 * Hero on the 40px grid background. One job: get the tap on WATCH THE DEMO,
 * which opens the gate form.
 *
 * oh2 fixes the promise from the original page: this base does NOT run ads —
 * it answers and books the contractor's EXISTING calls/texts/forms. No
 * "we run your ads" language anywhere here.
 */
export function Hero() {
  const { scrollToDemo } = useGate();

  return (
    <section id="top" className="oh-grid-bg relative overflow-hidden bg-white pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* soft fade so the grid doesn't fight the copy */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white" />

      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#171e19]/70 sm:text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-[#ffe17c]" />
          Done-for-you AI front desk for home-service pros
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="oh-display mx-auto mt-6 max-w-4xl text-5xl text-[#171e19] xs:text-6xl sm:text-7xl lg:text-8xl"
        >
          Every lead answered, qualified &amp; <Highlight>booked</Highlight> — in under 60 seconds.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto mt-6 max-w-xl text-lg text-[#171e19]/70"
        >
          Your AI receptionist picks up every call, text, and form in seconds — qualifies
          the job and books it straight onto your calendar. 24/7, even while you&apos;re up
          on a roof. Up and running fast.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mx-auto mt-4 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-[#171e19]/15 bg-[#f8f9fa] px-4 py-2 text-sm font-bold text-[#171e19]"
        >
          {PRICE} <span className="text-[#171e19]/30">·</span> {SETUP}{" "}
          <span className="text-[#171e19]/30">·</span> {TERMS.replace("No contract · ", "")}
        </motion.p>

        {/* Video preview — blurred behind the CTA so the visitor sees a video
            is waiting (it's the demo conversation, dimmed + blurred). Clicking
            scrolls to the visible demo video below. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-10"
        >
          <button
            type="button"
            onClick={scrollToDemo}
            aria-label="Watch the 90-second demo"
            className="oh-card group relative mx-auto block aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-[#171e19]/15 bg-[#171e19] shadow-2xl hover:scale-[1.01]"
          >
            {/* blurred demo conversation */}
            <div className="pointer-events-none absolute inset-0 scale-110 p-8 opacity-90 blur-[6px]">
              <ChatLoop />
            </div>
            {/* scrim for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171e19] via-[#171e19]/40 to-[#171e19]/30" />

            {/* play CTA on top */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe17c] pl-1 text-2xl text-[#171e19] shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                ▶
              </span>
              <span className="oh-display rounded-lg bg-[#ffe17c] px-6 py-3 text-lg text-[#171e19] shadow-xl sm:text-xl">
                Watch the 90-sec demo
              </span>
            </div>

            {/* duration pill */}
            <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
              1:30
            </span>
          </button>

          <p className="mt-4 text-sm text-[#171e19]/60">
            See it answer and book a real lead — live.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
