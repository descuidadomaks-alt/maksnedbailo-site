"use client";

import { BRAND } from "../lib/config";
import { useQuiz } from "./QuizContext";
import { ClockMark } from "./ClockMark";

/**
 * Sticky nav — forked from app/projects/oos/components/Nav.tsx unchanged
 * except the CTA now tags its openQuiz() call with a source for quiz_open
 * tracking. Logo scrolls to #top only, never opens the quiz.
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
          onClick={() => openQuiz("nav")}
          className="oh-card rounded-full bg-[#171e19] px-5 py-2.5 text-sm font-medium text-white hover:scale-105 sm:px-6 sm:text-base min-h-[44px]"
        >
          See The Demo
        </button>
      </div>
    </header>
  );
}
