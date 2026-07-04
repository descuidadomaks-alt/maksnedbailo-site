// Ported from loader.py's load_orders / load_products / _require_columns.
import { ORDERS_COLUMN_MAP, PRODUCTS_COLUMN_MAP } from "./columns";
import type { OrderRow, ProductRow, RawTable } from "./types";

export function requireColumns(headers: string[], required: string[], label: string) {
  const missing = required.filter((c) => !headers.includes(c));
  if (missing.length > 0) {
    throw new Error(`У файлі «${label}» відсутні колонки: ${missing.join(", ")}`);
  }
}

/** SKU is an EAN barcode — force to string so leading/whole digits never get
 * corrupted by float conversion. Safe for numbers up to Number.MAX_SAFE_INTEGER;
 * EAN-13/GTIN-14 barcodes are far below that threshold. */
function toSkuString(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "number") return value.toString();
  return String(value).trim();
}

function toNumber(value: unknown): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (value === null || value === undefined || value === "") return 0;
  const n = Number(String(value).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function toStringField(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function toDate(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "number") {
    // Excel serial date fallback (in case cellDates parsing missed it).
    const epoch = new Date(Date.UTC(1899, 11, 30));
    const d = new Date(epoch.getTime() + value * 86400000);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (typeof value === "string" && value.trim()) {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
}

export function normalizeOrderRows(raw: RawTable): OrderRow[] {
  requireColumns(raw.headers, Object.keys(ORDERS_COLUMN_MAP), "Замовлення");
  return raw.rows.map((row) => ({
    sku: toSkuString(row["Артикул товара"]),
    qty_sold: toNumber(row["Количество"]),
    sale_date: toDate(row["Время оформления"]),
    name: toStringField(row["Название товара"]),
    order_status: toStringField(row["Статус"]),
    pay_status: toStringField(row["Статус оплаты"]),
    sell_price: toNumber(row["Цена товара"]),
    cost: toNumber(row["Цена закупки"]),
  }));
}

export function normalizeProductRows(raw: RawTable): ProductRow[] {
  requireColumns(raw.headers, Object.keys(PRODUCTS_COLUMN_MAP), "Товари");
  const rows = raw.rows.map((row) => ({
    sku: toSkuString(row["Артикул"]),
    stock_on_hand: toNumber(row["Количество"]),
    name: toStringField(row["Название"]),
    sell_price: toNumber(row["Стоимость"]),
    cost: toNumber(row["Закупочная стоимость"]),
    product_id: toStringField(row["ID"]),
    category: toStringField(row["Категория"]),
  }));

  // A product can have multiple variation rows sharing product_id but
  // distinct SKUs — dedupe defensively on sku, keep first (mirrors loader.py).
  const seen = new Set<string>();
  const deduped: ProductRow[] = [];
  for (const r of rows) {
    if (seen.has(r.sku)) continue;
    seen.add(r.sku);
    deduped.push(r);
  }
  return deduped;
}
