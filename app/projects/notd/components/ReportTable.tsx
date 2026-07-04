"use client";

import { useMemo, useState } from "react";
import { formatDays, formatPerMonth, formatQty, formatStock } from "../lib/format";
import { FLAG_DATA, FLAG_OK, FLAG_ORDER_NOW, FLAG_ORDER_SOON } from "../lib/forecast";
import { reasonFor } from "../lib/reason";
import { FlagBadge } from "./FlagBadge";
import { DownloadButton } from "./DownloadButton";
import type { Flag, ForecastConfig, ReportRow } from "../lib/types";

const FLAG_FILTERS: { flag: Flag | "all"; label: string }[] = [
  { flag: "all", label: "Усі" },
  { flag: FLAG_ORDER_NOW, label: "🔴 Зараз" },
  { flag: FLAG_ORDER_SOON, label: "🟡 Скоро" },
  { flag: FLAG_OK, label: "🟢 Достатньо" },
  { flag: FLAG_DATA, label: "⚠ Дані" },
];

/** The action number — bold rose pill only when there's something to order. */
function OrderQty({ qty }: { qty: number | null }) {
  if (qty !== null && qty > 0) {
    return (
      <span className="inline-block rounded-full bg-[var(--reorder-accent-deep)] px-2.5 py-0.5 text-sm font-semibold text-white">
        {qty}
      </span>
    );
  }
  return <span className="text-[var(--reorder-fg-muted)]">{formatQty(qty)}</span>;
}

function MobileCard({ r, reason }: { r: ReportRow; reason: string }) {
  return (
    <div className="rounded-2xl border border-[var(--reorder-border)] bg-[var(--reorder-surface)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium leading-snug">{r.name}</p>
          <p className="mt-0.5 font-mono text-[10px] text-[var(--reorder-fg-muted)]">{r.sku}</p>
        </div>
        <FlagBadge flag={r.flag} />
      </div>
      <p className="mt-2 text-xs leading-relaxed text-[var(--reorder-fg-muted)]">{reason}</p>
      <div className="mt-3 grid grid-cols-4 gap-2 border-t border-[var(--reorder-border)] pt-3 text-center">
        <Metric label="Продажі" value={formatPerMonth(r.velocity)} />
        <Metric label="Залишок" value={formatStock(r.stock_on_hand)} />
        <Metric label="Вистачить" value={dayLabel(r.days_of_cover)} />
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[var(--reorder-fg-muted)]">Замовити</p>
          <p className="mt-1">
            <OrderQty qty={r.order_qty} />
          </p>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-[var(--reorder-fg-muted)]">{label}</p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}

function dayLabel(d: number | null): string {
  const s = formatDays(d);
  return s === "—" || s === "∞" ? s : `${s} дн`;
}

export function ReportTable({
  rows,
  windowDays,
  config,
}: {
  rows: ReportRow[];
  windowDays: number;
  config: ForecastConfig;
}) {
  // Local, view-only state — must not trigger the pipeline recompute upstream.
  const [activeFlag, setActiveFlag] = useState<Flag | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (activeFlag !== "all" && r.flag !== activeFlag) return false;
      if (q && !r.sku.toLowerCase().includes(q) && !r.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, activeFlag, search]);

  return (
    <div className="mx-auto mt-6 max-w-5xl px-5 pb-20">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {FLAG_FILTERS.map((f) => (
            <button
              key={f.flag}
              type="button"
              onClick={() => setActiveFlag(f.flag)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                activeFlag === f.flag
                  ? "border-[var(--reorder-ink)] bg-[var(--reorder-ink)] text-white"
                  : "border-[var(--reorder-border)] bg-[var(--reorder-surface)] text-[var(--reorder-fg-muted)] hover:border-[var(--reorder-accent)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук за SKU або назвою…"
            className="w-full rounded-lg border border-[var(--reorder-border)] bg-[var(--reorder-surface)] px-3 py-2 text-xs lg:w-52"
          />
          <DownloadButton rows={rows} />
        </div>
      </div>

      {/* Desktop: fixed-layout table, wraps instead of scrolling sideways. */}
      <div className="mt-4 hidden max-h-[72vh] overflow-y-auto overflow-x-hidden rounded-2xl border border-[var(--reorder-border)] md:block">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <colgroup>
            <col style={{ width: "42%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "23%" }} />
          </colgroup>
          <thead className="sticky top-0 z-10 bg-[var(--reorder-ink)] text-white">
            <tr>
              {["Товар", "Продажі", "Залишок", "Вистачить", "Дія / статус"].map((h) => (
                <th
                  key={h}
                  className="reorder-display px-4 py-3 text-[11px] font-normal tracking-[0.08em]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.sku}
                className="border-t border-[var(--reorder-border)] align-top odd:bg-[var(--reorder-surface)] even:bg-[var(--reorder-bg)]"
              >
                <td className="px-4 py-3">
                  <p className="font-medium leading-snug">{r.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-[var(--reorder-fg-muted)]">{r.sku}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--reorder-fg-muted)]">
                    {reasonFor(r, windowDays, config)}
                  </p>
                </td>
                <td className="px-4 py-3 tabular-nums">{formatPerMonth(r.velocity)}</td>
                <td className="px-4 py-3 tabular-nums">{formatStock(r.stock_on_hand)}</td>
                <td className="px-4 py-3 tabular-nums">{dayLabel(r.days_of_cover)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1.5">
                    <FlagBadge flag={r.flag} />
                    {r.order_qty !== null && r.order_qty > 0 && (
                      <span className="text-xs text-[var(--reorder-fg-muted)]">
                        замовити <OrderQty qty={r.order_qty} />
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="p-6 text-center text-xs text-[var(--reorder-fg-muted)]">Нічого не знайдено.</p>
        )}
      </div>

      {/* Mobile: stacked cards — never scrolls sideways. */}
      <div className="mt-4 flex flex-col gap-3 md:hidden">
        {filtered.map((r) => (
          <MobileCard key={r.sku} r={r} reason={reasonFor(r, windowDays, config)} />
        ))}
        {filtered.length === 0 && (
          <p className="p-6 text-center text-xs text-[var(--reorder-fg-muted)]">Нічого не знайдено.</p>
        )}
      </div>

      <p className="mt-2 text-right text-xs text-[var(--reorder-fg-muted)]">
        {filtered.length} з {rows.length} SKU
      </p>
    </div>
  );
}
