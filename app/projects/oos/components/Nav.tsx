"use client";

import { BRAND } from "../lib/config";
import { useQuiz } from "./QuizContext";
import { ClockMark } from "./ClockMark";

/**
 * Sticky nav, h-20, white/90 blur. Mark + wordmark left (yellow period), one
 * pill CTA right that opens the quiz. No other links on mobile — keep the
 * thumb on one job.
 *
 * `sticky` (not `fixed`) on purpose: TradesBar sits right above this in
 * normal document flow, so on first paint the two stack (bar, then nav)
 * exactly like static content. As the page scrolls, the bar scrolls away
 * while this sticks to the top the instant its natural position reaches
 * y:0 — pure CSS, no scroll listener, no layout jump. Hero.tsx's height
 * math depends on this staying h-20 (80px).
 */
export function Nav() {
  const { openQuiz } = useQuiz();

  return (
    <header className="sticky inset-x-0 top-0 z-50 h-20 border-b border-[#171e19]/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5">
        <a href="#top" className="inline-flex items-center gap-2">
          <ClockMark className="h-7 w-7 sm:h-8 sm:w-8" />
          <span className="oh-display text-2xl tracking-tight text-[#171e19] sm:text-3xl">
            {BRAND.replace(/\.$/, "")}
            <span className="text-[#ffe17c]">.</span>
          </span>
        </a>

        <button
          type="button"
          onClick={openQuiz}
          className="oh-card rounded-full bg-[#171e19] px-5 py-2.5 text-sm font-medium text-white hover:scale-105 sm:px-6 sm:text-base min-h-[44px]"
        >
          See The Demo
        </button>
      </div>
    </header>
  );
}
