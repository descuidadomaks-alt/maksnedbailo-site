import { formatMoney, formatWindowRange } from "../lib/format";
import { FLAG_DATA, FLAG_OK, FLAG_ORDER_NOW, FLAG_ORDER_SOON } from "../lib/forecast";
import type { ForecastResult } from "../lib/types";

function Card({ label, value, dark }: { label: string; value: string; dark?: boolean }) {
  return (
    <div
      className={`border p-4 ${
        dark
          ? "border-[var(--reorder-ink)] bg-[var(--reorder-ink)] text-white"
          : "border-[var(--reorder-border)] bg-[var(--reorder-surface)]"
      }`}
    >
      <p
        className={`text-[10px] uppercase tracking-[0.16em] ${
          dark ? "text-[var(--reorder-accent)]" : "text-[var(--reorder-fg-muted)]"
        }`}
      >
        {label}
      </p>
      <p className="reorder-display mt-1.5 text-3xl">{value}</p>
    </div>
  );
}

export function SummaryCards({ result }: { result: ForecastResult }) {
  const counts = new Map<string, number>();
  for (const r of result.rows) counts.set(r.flag, (counts.get(r.flag) ?? 0) + 1);

  return (
    <div className="mx-auto mt-6 max-w-5xl px-5">
      <div className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
        <Card label="Період даних" value={`${result.windowDays} дн.`} />
        <Card label="Збіглося SKU" value={String(result.matchedCount)} />
        <Card label="Лише продажі" value={String(result.ordersOnlyCount)} />
        <Card label="Лише товари" value={String(result.productsOnlyCount)} />
        <Card label="Замовити зараз" value={String(counts.get(FLAG_ORDER_NOW) ?? 0)} />
        <Card
          label="Капітал під ризиком"
          value={`€${formatMoney(result.capitalAtRisk)}`}
          dark={result.capitalAtRisk > 0}
        />
      </div>
      <p className="mt-3 text-center text-[11px] uppercase tracking-[0.14em] text-[var(--reorder-fg-muted)]">
        {formatWindowRange(result.dateMin, result.dateMax)} · {counts.get(FLAG_ORDER_SOON) ?? 0} скоро ·{" "}
        {counts.get(FLAG_OK) ?? 0} гаразд · {counts.get(FLAG_DATA) ?? 0} без даних
      </p>
    </div>
  );
}
