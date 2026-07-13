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
 * LAUNCH REQUIREMENT — exactly one viewport, mobile priority. Unlike
 * oh4–oh6 (content-sized, deliberately let section 2 peek), this is the
 * launch route: the section is pinned to `h-[100svh]` (svh, not vh, so the
 * mobile URL bar doesn't cause a phantom scroll) with `overflow-hidden` as a
 * hard backstop, and its content is vertically centered in the space left
 * under the fixed h-20 Nav (`pt-20` on the section + `flex-1
 * justify-center` on the content wrapper). Every size/gap below is tuned so
 * the content itself — not the overflow clip — is what fits; verified at
 * 375×667 and 390×844 with zero cut-off and zero visibility of section 2
 * before scroll. `sm:`/`lg:` restore full comfortable sizing on
 * tablet/desktop, which have height to spare.
 */
export function Hero() {
  const { openQuiz } = useQuiz();
  const scarcityLine = useScarcityLine();

  return (
    <section
      id="top"
      className="oh-grid-bg relative flex h-[100svh] flex-col overflow-hidden bg-white pt-20"
    >
      {/* soft fade so the grid doesn't fight the copy */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-3 text-center sm:py-6">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 text-[9px] font-bold uppercase leading-tight tracking-[0.12em] text-[#171e19]/70 sm:text-xs sm:tracking-[0.2em]"
        >
          <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#ffe17c] sm:h-2 sm:w-2" />
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
          className="oh-display mx-auto mt-2 max-w-4xl text-[clamp(1.625rem,8vw,3rem)] leading-[0.95] text-[#171e19] sm:mt-4 sm:text-7xl sm:leading-[0.9] lg:text-8xl"
        >
          Your entire front office — <Highlight>handled</Highlight>
          <Dot />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-2 max-w-xl text-sm font-semibold leading-snug text-[#171e19] sm:mt-4 sm:text-xl"
        >
          Every lead answered. Every appointment booked. Every customer followed up.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mx-auto mt-1.5 max-w-xl text-xs leading-snug text-[#171e19]/70 sm:mt-3 sm:text-lg sm:leading-normal"
        >
          Calls, texts, website leads, scheduling, follow-up, and reviews — one custom AI
          operating system runs it all. Managed by real people. Nothing to learn. Nobody to
          hire.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mx-auto mt-2 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-[#171e19]/15 bg-[#f8f9fa] px-3 py-1 text-[10px] font-bold text-[#171e19] sm:mt-6 sm:px-4 sm:py-2 sm:text-sm"
        >
          {PRICE} <span className="text-[#171e19]/30">·</span> {SETUP}{" "}
          <span className="text-[#171e19]/30">·</span> {TERMS.replace("No contract · ", "")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-3 sm:mt-6"
        >
          <button
            type="button"
            onClick={openQuiz}
            className="oh-display oh-card inline-block rounded-lg bg-[#ffe17c] px-6 py-2.5 text-base text-[#171e19] shadow-xl hover:scale-105 min-h-[44px] sm:px-8 sm:py-4 sm:text-2xl sm:min-h-[56px]"
          >
            Watch it book a real job
          </button>
          <p className="mt-1.5 text-[10px] text-[#171e19]/60 sm:mt-3 sm:text-sm">
            See it answer and book a real lead — live.
          </p>
          {/* honest scarcity seed — the specific close lives in FinalCTA */}
          <p className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-bold text-[#171e19]/80 sm:mt-3 sm:text-sm">
            <GeoPin />
            {scarcityLine}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
