// Computed, non-generic insights — the layer the good replenishment platforms
// (Inventory Planner, Cogsy, Netstock) lead with: not just "what to reorder"
// but the money story around it — revenue at risk, cash frozen in dead stock,
// where the urgency concentrates, and data-quality gaps. Every number is
// derived from the report; nothing is invented or LLM-written.
import { formatMoney } from "./format";
import { FLAG_DATA, FLAG_OK, FLAG_ORDER_NOW, FLAG_ORDER_SOON } from "./forecast";
import type { ForecastConfig, ForecastResult, Insight, ReportRow } from "./types";

/** Revenue that walks out the door if a 🔴 item stocks out before restock:
 * expected unmet demand over the lead time × its retail price. */
function lostRevenue(rows: ReportRow[]): number {
  return rows
    .filter((r) => r.flag === FLAG_ORDER_NOW)
    .reduce((sum, r) => sum + r.velocity * r.lead_time_days * r.sell_price, 0);
}

interface DeadStock {
  capital: number;
  count: number;
  worst: ReportRow | null;
}

/** Cash sitting in overstock/dead stock: healthy items whose cover is far
 * beyond target (>2×), plus in-stock items with zero sales. Valued at cost. */
function deadStock(rows: ReportRow[], config: ForecastConfig): DeadStock {
  const threshold = config.target_cover_days * 2;
  const items = rows.filter((r) => {
    if (r.stock_on_hand === null || r.stock_on_hand <= 0) return false;
    if (r.velocity === 0) return true; // in stock, never sold
    return r.days_of_cover !== null && Number.isFinite(r.days_of_cover) && r.days_of_cover > threshold;
  });
  const withCash = items.map((r) => ({ r, cash: (r.stock_on_hand ?? 0) * r.cost }));
  const capital = withCash.reduce((s, x) => s + x.cash, 0);
  const worst = withCash.sort((a, b) => b.cash - a.cash)[0]?.r ?? null;
  return { capital, count: items.length, worst };
}

export function computeInsights(result: ForecastResult, config: ForecastConfig): Insight[] {
  const rows = result.rows;
  const insights: Insight[] = [];

  const orderNow = rows.filter((r) => r.flag === FLAG_ORDER_NOW);
  const orderSoon = rows.filter((r) => r.flag === FLAG_ORDER_SOON);

  // 1. Revenue at risk from stockouts.
  if (orderNow.length > 0) {
    const revenue = lostRevenue(rows);
    // Concentration: does a handful of SKUs drive most of the order value?
    const byValue = [...orderNow]
      .map((r) => ({ r, val: (r.order_qty ?? 0) * r.cost }))
      .sort((a, b) => b.val - a.val);
    const totalVal = byValue.reduce((s, x) => s + x.val, 0);
    const topShare = totalVal > 0 ? byValue[0].val / totalVal : 0;
    const concentration =
      byValue.length >= 3 && topShare >= 0.4
        ? ` Найбільша частка припадає на «${byValue[0].r.name}» — близько ${Math.round(topShare * 100)}% суми замовлення.`
        : "";
    insights.push({
      tone: "risk",
      title: `${orderNow.length} ${plural(orderNow.length, "товар потребує", "товари потребують", "товарів потребують")} замовлення зараз`,
      body: `Без поповнення ви ризикуєте недоотримати ~€${formatMoney(revenue)} продажів, поки чекаєте на постачання.${concentration}`,
    });
  }

  // 2. Cash frozen in overstock / dead stock — the flip side owners forget.
  const dead = deadStock(rows, config);
  if (dead.capital > 0 && dead.count > 0) {
    const worst = dead.worst
      ? ` Найбільше «заморожено» в «${dead.worst.name}» (${dead.worst.stock_on_hand} шт).`
      : "";
    insights.push({
      tone: "cash",
      title: `~€${formatMoney(dead.capital)} лежить у надлишкових запасах`,
      body: `${dead.count} ${plural(dead.count, "позиція має", "позиції мають", "позицій мають")} запас надовго понад ціль або не продається взагалі — це заморожені гроші, які варто розпродати чи не дозамовляти.${worst}`,
    });
  }

  // 3. Early-warning: soon-to-order buffer.
  if (orderSoon.length > 0) {
    insights.push({
      tone: "info",
      title: `${orderSoon.length} ${plural(orderSoon.length, "товар наближається", "товари наближаються", "товарів наближаються")} до точки замовлення`,
      body: `Ще не критично, але запас цих позицій закінчиться протягом наступного циклу постачання — додайте їх у найближче замовлення, щоб не переходити в «червону» зону.`,
    });
  }

  // 4. Data hygiene — sold-but-untracked SKUs distort everything downstream.
  const soldUntracked = rows.filter((r) => r.flag === FLAG_DATA && r.stock_on_hand === null).length;
  if (soldUntracked > 0) {
    insights.push({
      tone: "info",
      title: `${soldUntracked} ${plural(soldUntracked, "товар продавався", "товари продавались", "товарів продавались")} без картки залишку`,
      body: `Ці SKU є в продажах, але відсутні у списку товарів KeyCRM — прогноз по них неможливий. Варто навести лад у картках, щоб система бачила повну картину.`,
    });
  }

  return insights;
}

function plural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}
