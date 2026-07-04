// Synthetic 90-day demo dataset so the suggestion engine can be seen working
// without a real long-range KeyCRM export (the sample export spans only 6
// days, which the tool correctly flags as insufficient history).
//
// Clearly labeled as demo data in the UI. Product names are generic
// nail-supply items, NOT real Nailsoftheday SKUs or figures.
//
// Deterministic PRNG (LCG) — same dataset on every click, so results are
// reproducible and hand-checkable.
import type { OrderRow, ProductRow } from "./types";

const WINDOW_DAYS = 90;

function makeRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

interface DemoSku {
  sku: string;
  name: string;
  /** average units sold per day over the 90-day window */
  dailyRate: number;
  /** stock expressed in days of cover (stock = dailyRate * coverDays) — this is
   * what determines the flag: <44 days → 🔴 (reorder point at default settings
   * is velocity*(30+14)), comfortably above → 🟢. */
  coverDays: number;
  sellPrice: number;
  /** absent from the products file → "orders-only" ⚠ DATA row */
  noStockRecord?: boolean;
  /** absent from orders (no sales) → products-only 🟢 "no recent sales" */
  noSales?: boolean;
  /** fixed stock for no-sales items (coverDays meaningless at velocity 0) */
  fixedStock?: number;
}

const DEMO_SKUS: DemoSku[] = [
  // 🔴 ORDER NOW — cover well below the 44-day reorder point, real order qty
  { sku: "4820000000017", name: "Камуфлююча база Rose 01, 10 мл", dailyRate: 2.4, coverDays: 9, sellPrice: 12.95 },
  { sku: "4820000000024", name: "Топ без липкого шару Glossy, 10 мл", dailyRate: 1.8, coverDays: 14, sellPrice: 11.85 },
  { sku: "4820000000031", name: "Гель-лак Cherry 12, 10 мл", dailyRate: 0.9, coverDays: 22, sellPrice: 11.85 },
  { sku: "4820000000048", name: "Рідка база Scotch, 10 мл", dailyRate: 1.3, coverDays: 30, sellPrice: 12.95 },
  { sku: "4820000000055", name: "Полігель Nude 02, 30 г", dailyRate: 0.5, coverDays: 18, sellPrice: 23.65 },
  // 🟢 OK — healthy cover
  { sku: "4820000000062", name: "Builder-гель молочний 09, 30 мл", dailyRate: 0.8, coverDays: 95, sellPrice: 21.35 },
  { sku: "4820000000079", name: "Гель-лак котяче око 13, 10 мл", dailyRate: 0.6, coverDays: 120, sellPrice: 11.95 },
  { sku: "4820000000086", name: "Каучукова база 30 мл", dailyRate: 1.1, coverDays: 80, sellPrice: 25.85 },
  { sku: "4820000000093", name: "Матовий топ Velvet, 10 мл", dailyRate: 0.4, coverDays: 140, sellPrice: 11.85 },
  { sku: "4820000000109", name: "Гель-фарба White, 5 мл", dailyRate: 0.3, coverDays: 100, sellPrice: 12.95 },
  // 🟡 SOON — cover sits just above the reorder point (44d), inside the 7-day
  // warning band, so these surface as "order soon" before they go critical.
  { sku: "4820000000116", name: "Ультрабонд, 10 мл", dailyRate: 1.6, coverDays: 47, sellPrice: 5.55 },
  { sku: "4820000000123", name: "Дегідратор, 10 мл", dailyRate: 1.2, coverDays: 49, sellPrice: 5.55 },
  // 🟢 no recent sales — in stock, zero velocity
  { sku: "4820000000130", name: "Набір пензлів Oval (3 шт)", dailyRate: 0, coverDays: 0, fixedStock: 34, noSales: true, sellPrice: 14.5 },
  { sku: "4820000000147", name: "Фреза керамічна Corn", dailyRate: 0, coverDays: 0, fixedStock: 58, noSales: true, sellPrice: 11.75 },
  // ⚠ DATA — sold, but no stock record in the products file
  { sku: "4820000000154", name: "Олія для кутикули Peach, 8 мл", dailyRate: 0.7, coverDays: 0, noStockRecord: true, sellPrice: 9.45 },
  { sku: "4820000000161", name: "Топ Party зі шимером, 10 мл", dailyRate: 0.4, coverDays: 0, noStockRecord: true, sellPrice: 12.95 },
];

export function buildDemoData(now: Date): { orders: OrderRow[]; products: ProductRow[] } {
  const rng = makeRng(42);
  const orders: OrderRow[] = [];
  const products: ProductRow[] = [];

  for (const item of DEMO_SKUS) {
    const cost = Math.round(item.sellPrice * 22) / 100; // ~22% of retail, typical margin shape

    if (!item.noStockRecord) {
      products.push({
        sku: item.sku,
        stock_on_hand: item.noSales ? item.fixedStock ?? 0 : Math.round(item.dailyRate * item.coverDays),
        name: item.name,
        sell_price: item.sellPrice,
        cost,
        product_id: item.sku.slice(-4),
        category: "",
      });
    }

    if (!item.noSales && item.dailyRate > 0) {
      // Spread total demand across the window as 1–3-unit order lines.
      let remaining = Math.round(item.dailyRate * WINDOW_DAYS);
      while (remaining > 0) {
        const qty = Math.min(remaining, 1 + Math.floor(rng() * 3));
        remaining -= qty;
        const daysAgo = rng() * WINDOW_DAYS;
        orders.push({
          sku: item.sku,
          qty_sold: qty,
          sale_date: new Date(now.getTime() - daysAgo * 86400000),
          name: item.name,
          order_status: "Виконано",
          pay_status: "paid",
          sell_price: item.sellPrice,
          cost,
        });
      }
    }
  }

  // A few cancelled/unpaid lines to demonstrate that status filtering works —
  // these must NOT count toward demand.
  const busySku = DEMO_SKUS[0];
  orders.push(
    {
      sku: busySku.sku, qty_sold: 40, sale_date: new Date(now.getTime() - 10 * 86400000),
      name: busySku.name, order_status: "Отменён", pay_status: "not_paid",
      sell_price: busySku.sellPrice, cost: 2.85,
    },
    {
      sku: busySku.sku, qty_sold: 25, sale_date: new Date(now.getTime() - 40 * 86400000),
      name: busySku.name, order_status: "Виконано", pay_status: "not_paid",
      sell_price: busySku.sellPrice, cost: 2.85,
    },
  );

  // Anchor the window: guarantee the min/max dates span exactly ~90 days
  // regardless of PRNG draw, so the detected window is stable.
  const anchor = DEMO_SKUS[5];
  orders.push(
    {
      sku: anchor.sku, qty_sold: 1, sale_date: new Date(now.getTime() - WINDOW_DAYS * 86400000),
      name: anchor.name, order_status: "Виконано", pay_status: "paid",
      sell_price: anchor.sellPrice, cost: 4.7,
    },
    {
      sku: anchor.sku, qty_sold: 1, sale_date: now,
      name: anchor.name, order_status: "Виконано", pay_status: "paid",
      sell_price: anchor.sellPrice, cost: 4.7,
    },
  );

  return { orders, products };
}
