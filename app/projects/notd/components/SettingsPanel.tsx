"use client";

import { useState } from "react";
import type { ForecastConfig } from "../lib/types";

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-[var(--reorder-fg-muted)]">
      {label}
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="rounded-lg border border-[var(--reorder-border)] bg-[var(--reorder-surface)] px-3 py-2 text-sm text-[var(--reorder-fg)]"
      />
    </label>
  );
}

export function SettingsPanel({
  config,
  onChange,
}: {
  config: ForecastConfig;
  onChange: (next: ForecastConfig) => void;
}) {
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  function addStatus() {
    const v = newStatus.trim();
    if (!v || config.excluded_statuses.includes(v)) return;
    onChange({ ...config, excluded_statuses: [...config.excluded_statuses, v] });
    setNewStatus("");
  }

  function removeStatus(s: string) {
    onChange({ ...config, excluded_statuses: config.excluded_statuses.filter((x) => x !== s) });
  }

  return (
    <div className="mx-auto mt-6 max-w-3xl px-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-[var(--reorder-border)] bg-[var(--reorder-surface)] px-4 py-3 text-sm font-medium"
      >
        <span>Налаштування прогнозу</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      {open && (
        <div className="mt-3 rounded-xl border border-[var(--reorder-border)] bg-[var(--reorder-surface)] p-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <NumberField
              label="Термін постачання (днів)"
              value={config.lead_time_days}
              onChange={(v) => onChange({ ...config, lead_time_days: v })}
            />
            <NumberField
              label="Страховий запас (днів)"
              value={config.safety_days}
              onChange={(v) => onChange({ ...config, safety_days: v })}
            />
            <NumberField
              label="Цільове покриття (днів)"
              value={config.target_cover_days}
              onChange={(v) => onChange({ ...config, target_cover_days: v })}
            />
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={config.require_paid}
              onChange={(e) => onChange({ ...config, require_paid: e.target.checked })}
            />
            Враховувати лише оплачені замовлення
          </label>

          <div className="mt-4">
            <p className="text-xs text-[var(--reorder-fg-muted)]">Виключені статуси замовлень</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {config.excluded_statuses.map((s) => (
                <span
                  key={s}
                  className="flex items-center gap-1 rounded-full bg-[var(--reorder-accent-soft)] px-3 py-1 text-xs"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeStatus(s)}
                    className="opacity-60 hover:opacity-100"
                    aria-label={`Видалити ${s}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addStatus()}
                placeholder="Додати статус…"
                className="flex-1 rounded-lg border border-[var(--reorder-border)] bg-white px-3 py-1.5 text-xs"
              />
              <button
                type="button"
                onClick={addStatus}
                className="rounded-lg bg-[var(--reorder-accent-soft)] px-3 py-1.5 text-xs font-medium"
              >
                Додати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
