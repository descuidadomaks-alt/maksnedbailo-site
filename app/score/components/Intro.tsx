"use client";

/** /score — intro screen. */
export default function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="quiz-step max-w-xl mx-auto text-center">
      <p
        className="font-label text-accent/70 mb-6"
        style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
      >
        Free · 2 minutes
      </p>
      <h1
        className="font-playfair font-normal text-fg mb-5"
        style={{ fontSize: "clamp(34px, 6vw, 60px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
      >
        The Bottleneck Score
      </h1>
      <p
        className="font-sora font-light text-fg/45 mb-10 mx-auto"
        style={{ fontSize: "16px", lineHeight: 1.65, maxWidth: "42ch" }}
      >
        8 questions. 2 minutes. Find out what being the bottleneck is costing you per
        month — before you spend a cent fixing it.
      </p>
      <button
        onClick={onStart}
        className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.22)]"
        style={{ fontSize: "15px", padding: "18px 40px", minHeight: "58px", letterSpacing: "-0.01em" }}
      >
        Start
        <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>
          →
        </span>
      </button>
      <p className="font-sora font-light text-fg/28 mt-5" style={{ fontSize: "12px" }}>
        Free. No call. No obligation.
      </p>
    </div>
  );
}
