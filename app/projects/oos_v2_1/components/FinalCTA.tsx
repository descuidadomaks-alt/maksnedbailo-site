"use client";

import { useQuiz } from "./QuizContext";
import { Dot } from "./Dot";

const EXCLUSIVITY = "Once you're in, we won't take on your direct competition.";

/**
 * Final risk-free-guarantee close — forked from oos_v2's FinalCTA.tsx.
 * Only change: a static exclusivity line instead of useScarcityLine() —
 * no LocationContext/geo-IP lookup in this page at all.
 */
export function FinalCTA() {
  const { openQuiz } = useQuiz();

  return (
    <section className="relative overflow-hidden bg-[#ffe17c] py-20 sm:py-28">
      <span
        aria-hidden
        className="oh-display pointer-events-none absolute inset-0 flex items-center justify-center text-[24vw] leading-none text-[#171e19]/10"
      >
        RISK-FREE
      </span>

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <h2 className="oh-display text-5xl leading-[0.9] text-[#171e19] sm:text-7xl lg:text-8xl">
          Try it risk-free for 30 days<Dot white />
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-xl text-[#171e19]/80 sm:text-2xl">
          Not happy for any reason in your first 30 days? We refund every cent — no questions
          asked. $0 setup. No contract. Cancel anytime.
        </p>

        <p className="mx-auto mt-5 max-w-xl text-sm font-medium text-[#171e19]/80">{EXCLUSIVITY}</p>

        <button
          type="button"
          onClick={() => openQuiz("final_cta")}
          className="oh-display oh-card mt-9 inline-block rounded-lg bg-[#171e19] px-8 py-5 text-xl text-white shadow-xl hover:scale-105 sm:text-2xl min-h-[56px]"
        >
          Book your free call
        </button>
      </div>
    </section>
  );
}
