"use client";

/** Fixed progress bar + back button + step counter — shown during Q1–Q8. */
export default function QuizProgress({
  current,
  total,
  onBack,
}: {
  current: number;
  total: number;
  onBack: () => void;
}) {
  const pct = ((current + 1) / total) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-[3px] bg-white/[0.06]" aria-hidden>
        <div
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="max-w-xl mx-auto px-6 pt-5 flex items-center justify-between">
        {current > 0 ? (
          <button
            onClick={onBack}
            className="font-sora text-fg/35 hover:text-fg/70 transition-colors duration-200"
            style={{ fontSize: "13px" }}
          >
            ← Back
          </button>
        ) : (
          <span aria-hidden />
        )}
        <span className="font-label text-fg/30" style={{ fontSize: "11px", letterSpacing: "2px" }}>
          {current + 1} / {total}
        </span>
      </div>
    </div>
  );
}
