// Ported from report.py's OUTPUT_COLUMNS + write_report. Column order/labels
// here use the Ukrainian UI labels (report.py used the Latin/Russian labels
// for the desktop tool; the web report is Ukrainian throughout, per spec).
import * as XLSX from "xlsx";
import type { ReportRow } from "./types";

const COLUMN_LABELS = [
  "SKU",
  "Назва",
  "Залишок",
  "Швидкість/день",
  "Днів запасу",
  "Точка замовлення",
  "К-сть до замовлення",
  "Статус",
  "Ціна продажу",
  "Закупівля",
] as const;

function rowToArray(r: ReportRow): (string | number)[] {
  return [
    r.sku,
    r.name,
    r.stock_on_hand ?? "",
    Number(r.velocity.toFixed(3)),
    r.days_of_cover === null ? "" : Number.isFinite(r.days_of_cover) ? Number(r.days_of_cover.toFixed(1)) : "∞",
    Number(r.reorder_point.toFixed(2)),
    r.order_qty ?? "",
    r.flag,
    r.sell_price,
    r.cost,
  ];
}

export function buildReportWorkbook(rows: ReportRow[]): XLSX.WorkBook {
  const data = [COLUMN_LABELS as unknown as string[], ...rows.map(rowToArray)];
  const sheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "reorder_report");
  return workbook;
}

export function downloadReport(rows: ReportRow[], filename?: string): void {
  const workbook = buildReportWorkbook(rows);
  const today = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, filename ?? `reorder_report_${today}.xlsx`);
}
