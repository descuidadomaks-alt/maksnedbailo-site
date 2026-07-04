"use client";

import { downloadReport } from "../lib/exportXlsx";
import type { ReportRow } from "../lib/types";

export function DownloadButton({ rows }: { rows: ReportRow[] }) {
  return (
    <button
      type="button"
      onClick={() => downloadReport(rows)}
      className="whitespace-nowrap rounded-lg bg-[var(--reorder-accent-deep)] px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-85"
    >
      Скачати звіт (.xlsx)
    </button>
  );
}
