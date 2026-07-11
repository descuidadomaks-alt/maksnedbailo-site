"use client";

import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { useScarcityLine } from "./LocationContext";
import { Highlight } from "./Highlight";
import { Dot } from "./Dot";
import { GeoPin } from "./GeoPin";
import { PRICE, SETUP, TERMS } from "../lib/config";

/**
 * Hero on the 40px grid background. No chat animation here — the real video
 * in the section right below does that job now. One job: get the tap on the
 * CTA, which scrolls straight to the video + form section.
 *
 * MOBILE SIZING: the section is CONTENT-sized (no forced min-h-[100svh]).
 * Forcing full-viewport + justify-center left the short copy floating in a
 * big empty band on tall phones; content-sizing means the hero is exactly as
 * tall as it needs to be, fits snugly on any common phone, and lets the next
 * section peek instead of wasting a screen of whitespace. The headline stays
 * at full display size — `clamp(2.25rem,11.5vw,3rem)` lands ~43–48px on
 * phones (matching the other section titles) rather than shrinking, and
 * `sm:`/`lg:` restore the tablet+desktop scale. Body text is kept at readable
 * sizes; only the vertical gaps are trimmed on mobile.
 *
 * oh3 keeps oh2's promise: this base does NOT run ads — it answers and books
 * the contractor's EXISTING calls/texts/forms.
 */
export function Hero() {
  const { openQuiz } = useQuiz();
  const scarcityLine = useScarcityLine();

  return (
    <section
      id="top"
      className="oh-grid-bg relative overflow-hidden bg-white pt-24 pb-5 sm:pt-36 sm:pb-24"
    >
      {/* soft fade so the grid doesn't fight the copy */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white" />

      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#171e19]/70 sm:text-xs sm:tracking-[0.2em]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffe17c] sm:h-2 sm:w-2" />
          The AI operating system that runs your entire business
        </motion.span>

        {/*
          Alternate headlines — swap in if this one underperforms:
          B: EVERY CALL ANSWERED. EVERY JOB BOOKED. NOBODY NEW TO HIRE.
          C: STOP RUNNING THE OFFICE FROM YOUR TRUCK.
        */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="oh-display mx-auto mt-4 max-w-4xl text-[clamp(2.25rem,11.5vw,3rem)] text-[#171e19] sm:mt-6 sm:text-7xl lg:text-8xl"
        >
          Your entire front office — <Highlight>handled</Highlight>
          <Dot />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto mt-4 max-w-xl text-base leading-snug text-[#171e19]/70 sm:mt-6 sm:text-lg sm:leading-normal"
        >
          Calls, texts, follow-up, booking, reviews — one operating system runs it all, so
          nothing falls through the cracks. Powered by AI, managed by real people. Nothing
          to learn, nobody to hire.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mx-auto mt-4 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-[#171e19]/15 bg-[#f8f9fa] px-4 py-1.5 text-xs font-bold text-[#171e19] sm:py-2 sm:text-sm"
        >
          {PRICE} <span className="text-[#171e19]/30">·</span> {SETUP}{" "}
          <span className="text-[#171e19]/30">·</span> {TERMS.replace("No contract · ", "")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-6 sm:mt-10"
        >
          <button
            type="button"
            onClick={openQuiz}
            className="oh-display oh-card inline-block rounded-lg bg-[#ffe17c] px-7 py-4 text-lg text-[#171e19] shadow-xl hover:scale-105 min-h-[52px] sm:px-8 sm:text-2xl sm:min-h-[56px]"
          >
            Watch it book a real job
          </button>
          <p className="mt-2 text-xs text-[#171e19]/60 sm:mt-4 sm:text-sm">
            See it answer and book a real lead — live.
          </p>
          {/* honest scarcity seed — the specific close lives in FinalCTA */}
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#171e19]/80 sm:mt-3 sm:text-sm">
            <GeoPin />
            {scarcityLine}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
