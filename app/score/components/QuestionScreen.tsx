"use client";

import { useEffect, useState } from "react";
import { QUESTIONS } from "../lib/quiz";
import { ANSWER_REACTIONS } from "../lib/reactions";

const REACTION_DELAY_MS = 850;

/** /score — single question screen. Tap or press 1–4 to answer. */
export default function QuestionScreen({
  index,
  onSelect,
  onBack,
}: {
  index: number;
  onSelect: (value: number) => void;
  onBack: () => void;
}) {
  const q = QUESTIONS[index];
  const [selected, setSelected] = useState<number | null>(null);

  function choose(i: number) {
    if (selected !== null) return;
    setSelected(i);
    window.setTimeout(() => onSelect(i), REACTION_DELAY_MS);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const n = Number(e.key);
      if (n >= 1 && n <= 4) choose(n - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className="quiz-step max-w-xl w-full mx-auto">
      <h2
        className="font-playfair font-normal text-fg mb-6 md:mb-8"
        style={{ fontSize: "clamp(20px, 3.2vw, 36px)", lineHeight: 1.25, letterSpacing: "-0.015em" }}
      >
        {q.question}
      </h2>
      <div className="flex flex-col gap-2.5">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isDimmed = selected !== null && !isSelected;
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={selected !== null}
              className={`group flex items-center gap-4 text-left rounded-xl border transition-all duration-200 ${
                isSelected
                  ? "border-accent/45 bg-accent/[0.07]"
                  : "border-white/[0.07] bg-white/[0.015] hover:border-accent/35 hover:bg-accent/[0.05]"
              }`}
              style={{ padding: "14px 20px", opacity: isDimmed ? 0.35 : 1 }}
            >
              <span
                className={`font-label shrink-0 flex items-center justify-center rounded-md border transition-colors duration-200 ${
                  isSelected
                    ? "text-accent border-accent/40"
                    : "text-fg/30 border-white/10 group-hover:text-accent group-hover:border-accent/40"
                }`}
                style={{ fontSize: "11px", width: "26px", height: "26px" }}
              >
                {i + 1}
              </span>
              <span
                className={`font-sora font-light ${isSelected ? "text-fg" : "text-fg/75 group-hover:text-fg"}`}
                style={{ fontSize: "15px", lineHeight: 1.45 }}
              >
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reaction (after a choice) or Back link — same slot, fixed min-height to avoid layout shift */}
      <div className="mt-5 text-center" style={{ minHeight: "20px" }}>
        {selected !== null ? (
          <p className="quiz-reaction font-sora font-light italic text-accent/65" style={{ fontSize: "13px" }}>
            {ANSWER_REACTIONS[index][selected]}
          </p>
        ) : index > 0 ? (
          <button
            onClick={onBack}
            className="font-sora text-fg/30 hover:text-fg/60 transition-colors duration-200"
            style={{ fontSize: "13px" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M19 12H6M12 5l-7 7 7 7" /></svg> Back
          </button>
        ) : null}
      </div>
    </div>
  );
}
