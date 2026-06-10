"use client";

import { useEffect } from "react";
import { QUESTIONS } from "../lib/quiz";

/** /score — single question screen. Tap or press 1–4 to answer. */
export default function QuestionScreen({
  index,
  onSelect,
}: {
  index: number;
  onSelect: (value: number) => void;
}) {
  const q = QUESTIONS[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const n = Number(e.key);
      if (n >= 1 && n <= 4) onSelect(n - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSelect]);

  return (
    <div className="quiz-step max-w-xl w-full mx-auto">
      <h2
        className="font-playfair font-normal text-fg mb-9"
        style={{ fontSize: "clamp(22px, 3.4vw, 36px)", lineHeight: 1.25, letterSpacing: "-0.015em" }}
      >
        {q.question}
      </h2>
      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className="group flex items-center gap-4 text-left rounded-xl border border-white/[0.07] bg-white/[0.015] hover:border-accent/35 hover:bg-accent/[0.05] transition-all duration-200"
            style={{ padding: "16px 20px" }}
          >
            <span
              className="font-label shrink-0 flex items-center justify-center rounded-md text-fg/30 group-hover:text-accent group-hover:border-accent/40 border border-white/10 transition-colors duration-200"
              style={{ fontSize: "11px", width: "26px", height: "26px" }}
            >
              {i + 1}
            </span>
            <span className="font-sora font-light text-fg/75 group-hover:text-fg" style={{ fontSize: "15px", lineHeight: 1.45 }}>
              {opt}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
