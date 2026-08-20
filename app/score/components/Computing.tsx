"use client";

import { useEffect, useState } from "react";

const STAGES = [
  "Reading your answers",
  "Calculating your Bottleneck Score",
  "Estimating your monthly cost",
];

const STAGE_DURATION = 750;

function Spinner() {
  return (
    <svg className="animate-spin" width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

/** /score — brief staged "computing" sequence between the soft gate and the result reveal. */
export default function Computing({ onDone }: { onDone: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }

    const timers = STAGES.map((_, i) =>
      setTimeout(() => setActiveIndex(i + 1), STAGE_DURATION * (i + 1))
    );
    timers.push(setTimeout(onDone, STAGE_DURATION * STAGES.length + 300));

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className="quiz-step max-w-md w-full mx-auto text-center">
      <p
        className="font-label text-accent/70 mb-8"
        style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
      >
        Calculating
      </p>
      <ul className="flex flex-col gap-4 mx-auto text-left" style={{ maxWidth: "300px" }}>
        {STAGES.map((label, i) => {
          const done = activeIndex > i;
          const active = activeIndex === i;
          return (
            <li
              key={label}
              className="flex items-center gap-3 font-sora transition-opacity duration-300"
              style={{ fontSize: "14px", opacity: active || done ? 1 : 0.25 }}
            >
              <span
                className="flex items-center justify-center shrink-0 rounded-full border transition-colors duration-300"
                style={{
                  width: "20px",
                  height: "20px",
                  borderColor: done ? "var(--accent)" : "rgba(255,255,255,0.15)",
                  background: done ? "var(--accent)" : "transparent",
                  color: "var(--bg)",
                }}
              >
                {done ? <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6L9 17l-5-5" /></svg></> : active ? <span className="text-fg/70"><Spinner /></span> : null}
              </span>
              <span className={done ? "text-fg/55" : "text-fg"}>{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
