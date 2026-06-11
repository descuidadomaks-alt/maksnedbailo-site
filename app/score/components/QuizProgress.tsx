"use client";

/** Minimal fixed header — thin progress bar + step counter. Shown during Q1–Q8. */
export default function QuizProgress({
  current,
  total,
}: {
  current: number;
  total: number;
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
      <div className="max-w-xl mx-auto px-6 pt-4 flex items-center justify-end">
        <span className="font-label text-fg/30" style={{ fontSize: "11px", letterSpacing: "2px" }}>
          {current + 1} / {total}
        </span>
      </div>
    </div>
  );
}
