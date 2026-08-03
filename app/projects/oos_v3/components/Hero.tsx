"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { useScarcityLine } from "./LocationContext";
import { Highlight } from "./Highlight";
import { Dot } from "./Dot";
import { GeoPin } from "./GeoPin";
import { SETUP, TERMS, VIDEO_SRC, VIDEO_POSTER } from "../lib/config";
import { track } from "../lib/track";
import { DeliverablesRow } from "./DeliverablesRow";

/**
 * Hero + demo video, merged into one section — the mobile-first fold
 * requirement (390px width, no scroll) needs headline, one supporting
 * line, the video, and the primary CTA all visible together, which the
 * original oos build never has to do (its Hero and VideoForm are two
 * separate near-full-viewport sections). Everything below the CTA
 * (eyebrow badge, the video section's own heading/body, the longer body
 * paragraph, the $0-setup chip) is copy pulled straight from the live
 * page's Hero/VideoForm sections, just reordered to sit after the
 * fold-critical block instead of before/inside it — no copy was cut.
 *
 * Video gating logic matches app/projects/oos/components/VideoForm.tsx:
 * poster + play button pre-quiz, autoplay + native controls once
 * `unlocked` flips true from ANY CTA on the page.
 */
export function Hero() {
  const { openQuiz, unlocked } = useQuiz();
  const scarcityLine = useScarcityLine();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasAutoplayed = useRef(false);
  const hasFiredPlay = useRef(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (!unlocked || hasAutoplayed.current) return;
    hasAutoplayed.current = true;
    videoRef.current?.play().catch(() => {
      // Autoplay can still be blocked in some conditions — native controls
      // are visible once unlocked, so the visitor can just press play.
    });
  }, [unlocked]);

  return (
    <section id="top" className="oh-grid-bg relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white" />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-5 pb-8 pt-5 text-center sm:gap-5 sm:pb-16 sm:pt-10">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="hidden items-center gap-2 text-xs font-bold uppercase leading-tight tracking-[0.2em] text-[#171e19]/70 sm:inline-flex"
        >
          <span className="h-2 w-2 flex-none rounded-full bg-[#ffe17c]" />
          The AI operating system that runs your entire business
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="oh-display max-w-2xl text-[clamp(1.5rem,7.2vw,2.75rem)] text-[#171e19] sm:text-6xl"
          style={{ lineHeight: 1.14 }}
        >
          The job goes to whoever answers first. Right now that&apos;s <Highlight>not you</Highlight>
          <Dot />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl text-sm font-semibold leading-snug text-[#171e19] sm:text-lg"
        >
          Every lead answered. Every appointment booked. Every customer followed up.
        </motion.p>

        <motion.div
          id="demo"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#171e19]/10 bg-[#171e19] shadow-2xl"
          style={{ aspectRatio: "16 / 9" }}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            controls={unlocked}
            playsInline
            preload="metadata"
            onPlay={() => {
              if (hasFiredPlay.current) return;
              hasFiredPlay.current = true;
              track("demo_play", {});
            }}
            className="h-full w-full object-cover"
          />

          {!unlocked && (
            <button
              type="button"
              onClick={() => openQuiz("video_play_button")}
              aria-label="Play the demo"
              className="group absolute inset-0 flex items-center justify-center"
            >
              <span className="absolute inset-0 bg-[#171e19]/25 transition-colors group-hover:bg-[#171e19]/15" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
                <svg viewBox="0 0 24 24" fill="#171e19" aria-hidden className="ml-1 h-7 w-7 sm:h-8 sm:w-8">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <button
            type="button"
            onClick={() => openQuiz("hero_primary")}
            className="oh-display oh-card inline-block w-full rounded-lg bg-[#ffe17c] px-6 py-3.5 text-lg text-[#171e19] shadow-xl hover:scale-[1.02] min-h-[52px] sm:w-auto sm:px-8 sm:py-3 sm:text-xl"
          >
            Watch it book a real job
          </button>
          <p className="mt-2 text-xs text-[#171e19]/60 sm:text-sm">
            See it answer and book a real lead — live.
          </p>
        </motion.div>

        {unlocked && (
          <div className="w-full max-w-sm rounded-xl border border-[#171e19]/10 bg-[#ffe17c]/15 px-5 py-4 text-center">
            {!waiting ? (
              <>
                <p className="oh-display text-xl text-[#171e19]">
                  You&apos;re on the list<Dot />
                </p>
                <p className="mt-1.5 text-sm text-[#171e19]/70">We&apos;ll reach out shortly.</p>
                <button
                  type="button"
                  onClick={() => setWaiting(true)}
                  className="mt-2 text-xs font-medium text-[#171e19]/60 underline underline-offset-4"
                >
                  Got it
                </button>
              </>
            ) : (
              <p className="text-sm text-[#171e19]/70">Thanks — talk soon.</p>
            )}
          </div>
        )}

        <p className="mx-auto inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-[#171e19]/15 bg-[#f8f9fa] px-3 py-1 text-[10px] font-bold text-[#171e19] sm:px-4 sm:py-2 sm:text-sm">
          {SETUP} <span className="text-[#171e19]/30">·</span> {TERMS.replace("No contract · ", "")}
        </p>

        <p className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#171e19]/80 sm:text-sm">
          <GeoPin />
          {scarcityLine}
        </p>

        <div className="mt-2 max-w-xl border-t border-[#171e19]/10 pt-6 sm:mt-4">
          <h2 className="oh-display text-2xl text-[#171e19] sm:text-4xl">
            Watch it book a real job<Dot />
          </h2>
          <p className="mt-3 text-sm text-[#171e19]/70 sm:text-base">
            A real call, answered, qualified, and booked — while the owner keeps working. And
            the call is just one piece — your demo walks the whole system.
          </p>
          <p className="mt-4 text-xs leading-snug text-[#171e19]/70 sm:text-base sm:leading-normal">
            Calls, texts, website leads, scheduling, follow-up, and reviews — one custom AI
            operating system runs it all. Managed by real people. Nothing to learn. Nobody to
            hire.
          </p>
          <DeliverablesRow />
        </div>
      </div>
    </section>
  );
}
