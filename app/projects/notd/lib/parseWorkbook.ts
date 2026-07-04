import * as XLSX from "xlsx";
import type { RawTable } from "./types";

/**
 * Reads an uploaded .xlsx File entirely in the browser (no upload to any
 * server) into a RawTable — header row + row objects keyed by header.
 *
 * cellDates:true so date cells arrive as JS Date objects (mirrors pandas'
 * pd.to_datetime downstream). We intentionally do NOT use SheetJS's
 * raw:false "formatted text" mode: for whole-number cells (SKU barcodes)
 * that mode is locale/number-format dependent and can behave unpredictably.
 * Instead numeric SKU cells come through as plain JS numbers here, and
 * normalize.ts converts them to strings explicitly (safe: EAN-13/14
 * barcodes are well under Number.MAX_SAFE_INTEGER, so `.toString()` never
 * produces scientific notation or loses digits).
 */
export async function parseWorkbookFile(file: File): Promise<RawTable> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array", cellDates: true });
  return workbookToRawTable(workbook);
}

export function workbookToRawTable(workbook: XLSX.WorkBook): RawTable {
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error("Файл не містить жодного аркуша.");
  }
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: null,
    raw: true,
  });
  const headers =
    rows.length > 0
      ? Object.keys(rows[0])
      : (XLSX.utils.sheet_to_json(sheet, { header: 1 })[0] as string[] | undefined) ?? [];
  return { headers, rows };
}
