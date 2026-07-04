// Column-map constants, ported verbatim from loader.py.
import type { SourceRole } from "./types";

export const ORDERS_SIGNATURE_COL = "Время оформления";
export const PRODUCTS_SIGNATURE_COL = "ID вариации";

export const ORDERS_COLUMN_MAP: Record<string, string> = {
  "Артикул товара": "sku",
  Количество: "qty_sold",
  "Время оформления": "sale_date",
  "Название товара": "name",
  Статус: "order_status",
  "Статус оплаты": "pay_status",
  "Цена товара": "sell_price",
  "Цена закупки": "cost",
};

export const PRODUCTS_COLUMN_MAP: Record<string, string> = {
  Артикул: "sku",
  Количество: "stock_on_hand",
  Название: "name",
  Стоимость: "sell_price",
  "Закупочная стоимость": "cost",
  ID: "product_id",
  Категория: "category",
};

/** Ported from loader.py's find_input_files signature check. */
export function detectRole(headers: string[]): SourceRole {
  const isOrders = headers.includes(ORDERS_SIGNATURE_COL);
  const isProducts = headers.includes(PRODUCTS_SIGNATURE_COL);
  if (isOrders && !isProducts) return "orders";
  if (isProducts && !isOrders) return "products";
  return "unknown";
}
