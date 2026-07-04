// Ported from loader.py's filter_and_join.
import type { ForecastConfig, OrderRow, ProductRow } from "./types";

export interface FilterJoinResult {
  filtered: OrderRow[];
  ordersOnly: Set<string>;
  productsOnly: Set<string>;
  matched: Set<string>;
}

export function filterAndJoin(
  orders: OrderRow[],
  products: ProductRow[],
  config: ForecastConfig,
): FilterJoinResult {
  const excluded = new Set(config.excluded_statuses);
  let filtered = orders.filter((o) => !excluded.has(o.order_status));
  if (config.require_paid) {
    filtered = filtered.filter((o) => o.pay_status.toLowerCase() === "paid");
  }

  const orderSkus = new Set(filtered.map((o) => o.sku));
  const productSkus = new Set(products.map((p) => p.sku));

  const matched = new Set<string>();
  const ordersOnly = new Set<string>();
  Array.from(orderSkus).forEach((sku) => {
    if (productSkus.has(sku)) matched.add(sku);
    else ordersOnly.add(sku);
  });
  const productsOnly = new Set<string>();
  Array.from(productSkus).forEach((sku) => {
    if (!orderSkus.has(sku)) productsOnly.add(sku);
  });

  return { filtered, ordersOnly, productsOnly, matched };
}
