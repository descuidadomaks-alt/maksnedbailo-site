"use client";

import { useState } from "react";
import { fetchSheetCsv, GoogleSheetFetchError } from "../lib/googleSheets";
import { parseCsvText } from "../lib/parseCsv";
import type { RawTable } from "../lib/types";

export function GoogleSheetsInput({
  onRawTable,
}: {
  onRawTable: (raw: RawTable, label: string) => void;
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLoad() {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const csv = await fetchSheetCsv(url);
      const raw = parseCsvText(csv);
      onRawTable(raw, "Google Таблиця");
      setUrl("");
    } catch (e) {
      setError(e instanceof GoogleSheetFetchError ? e.message : "Не вдалося завантажити таблицю.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-4 max-w-3xl px-5">
      <p className="mb-2 text-center text-xs text-[var(--reorder-fg-muted)]">
        Або вставте посилання на публічну Google Таблицю (доступ «для всіх, хто має посилання»)
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLoad()}
          placeholder="https://docs.google.com/spreadsheets/d/..."
          className="flex-1 rounded-xl border border-[var(--reorder-border)] bg-[var(--reorder-surface)] px-4 py-2.5 text-sm outline-none"
        />
        <button
          type="button"
          onClick={handleLoad}
          disabled={loading || !url.trim()}
          className="rounded-xl bg-[var(--reorder-ink)] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-85 disabled:opacity-40"
        >
          {loading ? "Завантаження…" : "Завантажити"}
        </button>
      </div>
      {error && <p className="mt-2 text-center text-xs text-red-600">{error}</p>}
    </div>
  );
}
