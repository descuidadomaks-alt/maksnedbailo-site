import { computeInsights } from "../lib/insights";
import type { ForecastConfig, ForecastResult, InsightTone } from "../lib/types";

const TONE_STYLE: Record<InsightTone, { bar: string; kicker: string; kickerText: string }> = {
  risk: { bar: "bg-red-500", kicker: "text-red-600", kickerText: "Ризик" },
  cash: { bar: "bg-[var(--reorder-accent-deep)]", kicker: "text-[var(--reorder-accent-deep)]", kickerText: "Капітал" },
  info: { bar: "bg-[var(--reorder-taupe)]", kicker: "text-[var(--reorder-fg-muted)]", kickerText: "Зверніть увагу" },
};

export function InsightsPanel({
  result,
  config,
}: {
  result: ForecastResult;
  config: ForecastConfig;
}) {
  const insights = computeInsights(result, config);
  if (insights.length === 0) return null;

  return (
    <div className="mx-auto mt-8 max-w-5xl px-5">
      <p className="reorder-display mb-4 text-xl text-[var(--reorder-fg)] sm:text-2xl">
        Що це означає
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {insights.map((ins, i) => {
          const t = TONE_STYLE[ins.tone];
          return (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl border border-[var(--reorder-border)] bg-[var(--reorder-surface)] p-5 pl-6"
            >
              <span className={`absolute inset-y-0 left-0 w-1.5 ${t.bar}`} />
              <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${t.kicker}`}>
                {t.kickerText}
              </p>
              <p className="mt-1.5 text-base font-semibold leading-snug">{ins.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--reorder-fg-muted)]">{ins.body}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] text-[var(--reorder-fg-muted)]">
        Висновки розраховані з ваших даних — без вигаданих цифр.
      </p>
    </div>
  );
}
