// Ported from forecast.py's build_forecast / capital_at_risk.
import { MIN_HISTORY_DAYS } from "./config";
import { roundHalfUp } from "./round";
import type { FilterJoinResult } from "./pipeline";
import type { ForecastConfig, ForecastResult, OrderRow, ProductRow, ReportRow, Flag } from "./types";

const FLAG_ORDER_NOW: Flag = "🔴 ORDER NOW";
const FLAG_ORDER_SOON: Flag = "🟡 ORDER SOON";
const FLAG_OK: Flag = "🟢 OK";
const FLAG_DATA: Flag = "⚠ DATA";

const FLAG_PRIORITY: Record<Flag, number> = {
  [FLAG_ORDER_NOW]: 0,
  [FLAG_ORDER_SOON]: 1,
  [FLAG_OK]: 2,
  [FLAG_DATA]: 3,
};

interface MergedRow {
  sku: string;
  qty_sold: number;
  name: string;
  sell_price: number;
  cost: number;
  stock_on_hand: number | null; // null when no product record exists (orders-only)
}

function wholeDaysBetween(min: Date, max: Date): number {
  const ms = max.getTime() - min.getTime();
  return Math.floor(ms / 86400000);
}

export function buildForecast(
  filtered: OrderRow[],
  products: ProductRow[],
  join: FilterJoinResult,
  config: ForecastConfig,
): ForecastResult {
  if (filtered.length === 0) {
    throw new Error("Немає підходящих (оплачених, не скасованих) замовлень для прогнозу.");
  }

  const dates = filtered.map((o) => o.sale_date).filter((d): d is Date => d !== null);
  if (dates.length === 0) {
    throw new Error("Не вдалося розпізнати дати замовлень.");
  }
  const dateMin = new Date(Math.min(...dates.map((d) => d.getTime())));
  const dateMax = new Date(Math.max(...dates.map((d) => d.getTime())));
  // Real exports span months; never assume a fixed window — measure it.
  const windowDays = Math.max(1, wholeDaysBetween(dateMin, dateMax));

  // Group filtered orders by sku: sum qty_sold, keep first name/price/cost as fallback.
  const salesBySku = new Map<
    string,
    { qty_sold: number; name: string; sell_price: number; cost: number }
  >();
  for (const o of filtered) {
    const existing = salesBySku.get(o.sku);
    if (existing) {
      existing.qty_sold += o.qty_sold;
    } else {
      salesBySku.set(o.sku, {
        qty_sold: o.qty_sold,
        name: o.name,
        sell_price: o.sell_price,
        cost: o.cost,
      });
    }
  }

  const productsBySku = new Map(products.map((p) => [p.sku, p]));

  // Outer join: union of sku keys from both sides.
  const allSkus = new Set<string>(
    Array.from(salesBySku.keys()).concat(Array.from(productsBySku.keys())),
  );
  const merged: MergedRow[] = [];
  Array.from(allSkus).forEach((sku) => {
    const sale = salesBySku.get(sku);
    const product = productsBySku.get(sku);
    merged.push({
      sku,
      qty_sold: sale?.qty_sold ?? 0,
      // Prefer the product catalog's name/price/cost, fall back to the order line's.
      name: product?.name || sale?.name || "",
      sell_price: product?.sell_price ?? sale?.sell_price ?? 0,
      cost: product?.cost ?? sale?.cost ?? 0,
      stock_on_hand: product ? product.stock_on_hand : null,
    });
  });

  const { ordersOnly, productsOnly, matched } = join;
  const rows: ReportRow[] = merged.map((r) => {
    const isOrdersOnly = ordersOnly.has(r.sku);
    const isProductsOnly = productsOnly.has(r.sku);
    const leadTimeDays = config.lead_time_days;

    // velocity = actual historical sales rate (units/day) — this is what we
    // SHOW, unadjusted. fv = forecast velocity: the same rate scaled by the
    // seasonal demand multiplier (1 unless set by the survey), used for all
    // forward-looking math so an expected spike pulls reorders earlier.
    const velocity = r.qty_sold / windowDays;
    const mult = config.demand_multiplier || 1;
    const fv = velocity * mult;

    // 2. demand expected to occur while waiting for a new order to arrive
    const leadTimeDemand = fv * leadTimeDays;
    // 3. buffer stock to absorb demand spikes during lead time
    const safetyStock = fv * config.safety_days;
    // 4. stock level at which a new order should be placed
    const reorderPoint = leadTimeDemand + safetyStock;
    // 5. how many days current stock will last at the (forecast) sales rate
    const stock = r.stock_on_hand;
    let daysOfCover: number | null;
    if (isOrdersOnly || stock === null) {
      daysOfCover = null;
    } else if (fv === 0) {
      daysOfCover = Infinity;
    } else {
      daysOfCover = stock / fv;
    }
    // 6. units to order to reach the target cover after this order arrives
    let orderQty: number | null;
    if (isOrdersOnly || stock === null) {
      orderQty = null;
    } else {
      orderQty = Math.max(0, roundHalfUp(fv * config.target_cover_days - stock));
    }

    // At the reorder point, days_of_cover === lead + safety. So 🟡 SOON is the
    // one-week buffer band ABOVE that line: still fine now, but about to cross
    // into 🔴. (The old "< lead + 7" rule was unreachable whenever safety ≥ 7.)
    const soonThreshold = leadTimeDays + config.safety_days + 7;
    let flag: Flag;
    if (isOrdersOnly) {
      flag = FLAG_DATA;
    } else if (windowDays < MIN_HISTORY_DAYS) {
      flag = FLAG_DATA;
    } else if (isProductsOnly && velocity === 0) {
      flag = FLAG_OK; // in stock, no recent sales -> no reorder, not urgent
    } else if (stock !== null && stock <= reorderPoint) {
      flag = FLAG_ORDER_NOW;
    } else if (daysOfCover !== null && daysOfCover < soonThreshold) {
      flag = FLAG_ORDER_SOON;
    } else {
      flag = FLAG_OK;
    }

    return {
      sku: r.sku,
      name: r.name,
      stock_on_hand: stock,
      velocity,
      days_of_cover: daysOfCover,
      reorder_point: reorderPoint,
      order_qty: orderQty,
      flag,
      sell_price: r.sell_price,
      cost: r.cost,
      lead_time_days: leadTimeDays,
    };
  });

  rows.sort((a, b) => FLAG_PRIORITY[a.flag] - FLAG_PRIORITY[b.flag]);

  return {
    rows,
    windowDays,
    dateMin,
    dateMax,
    matchedCount: matched.size,
    ordersOnlyCount: ordersOnly.size,
    productsOnlyCount: productsOnly.size,
    capitalAtRisk: capitalAtRisk(rows),
  };
}

export function capitalAtRisk(rows: ReportRow[]): number {
  return rows
    .filter((r) => r.flag === FLAG_ORDER_NOW)
    .reduce((sum, r) => sum + r.velocity * r.lead_time_days * r.cost, 0);
}

export { FLAG_ORDER_NOW, FLAG_ORDER_SOON, FLAG_OK, FLAG_DATA };
