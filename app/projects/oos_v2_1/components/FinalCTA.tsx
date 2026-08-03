"use client";

import { useQuiz } from "./QuizContext";
import { useScarcityLine } from "./LocationContext";
import { Dot } from "./Dot";

/**
 * Final risk-free-guarantee close — forked from oos_v2's FinalCTA.tsx.
 * Scarcity line is geo-derived (LocationContext), same placement as the
 * live overtimeos.com page's guarantee section. Title keeps its original
 * tight line-height explicitly (inline style, not the `leading-[0.9]`
 * Tailwind class it used to have — that class was never actually in
 * control, since the shared `.oh-display` rule in layout.tsx wins the
 * cascade tie against any same-specificity Tailwind `leading-[]` utility;
 * only an inline style reliably overrides it) — the site-wide
 * line-height standardization landed on `.oh-display` doesn't touch this
 * title, per instruction to keep it exactly as it was.
 */
export function FinalCTA() {
  const { openQuiz } = useQuiz();
  const scarcityLine = useScarcityLine();

  return (
    <section className="relative overflow-hidden bg-[#ffe17c] py-20 sm:py-28">
      <span
        aria-hidden
        className="oh-display pointer-events-none absolute inset-0 flex items-center justify-center text-[24vw] leading-none text-[#171e19]/10"
      >
        RISK-FREE
      </span>

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <h2 className="oh-display text-5xl text-[#171e19] sm:text-7xl lg:text-8xl" style={{ lineHeight: 0.9 }}>
          Try it risk-free for 30 days<Dot white />
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-xl text-[#171e19]/80 sm:text-2xl">
          Not happy for any reason in your first 30 days? We refund every cent — no questions
          asked. $0 setup. No contract. Cancel anytime.
        </p>

        <p className="mx-auto mt-5 max-w-xl text-sm font-medium text-[#171e19]/80">{scarcityLine}</p>

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
