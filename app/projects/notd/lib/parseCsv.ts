import * as XLSX from "xlsx";
import { workbookToRawTable } from "./parseWorkbook";
import type { RawTable } from "./types";

/** Parses CSV text (from the Google Sheets gviz export) into a RawTable,
 * reusing SheetJS's own CSV reader so there's no second parser to maintain. */
export function parseCsvText(csvText: string): RawTable {
  const workbook = XLSX.read(csvText, { type: "string", cellDates: true });
  return workbookToRawTable(workbook);
}
