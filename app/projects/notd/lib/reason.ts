// Plain-language "why this recommendation" for a single row. No LLM — every
// sentence is derived from the row's own numbers, so it's always accurate and
// specific to that SKU.
import { formatPerMonth } from "./format";
import { FLAG_DATA, FLAG_OK, FLAG_ORDER_NOW, FLAG_ORDER_SOON } from "./forecast";
import type { ForecastConfig, ReportRow } from "./types";

export function reasonFor(row: ReportRow, windowDays: number, config: ForecastConfig): string {
  const lead = row.lead_time_days;
  const cover = row.days_of_cover;
  const perMonth = formatPerMonth(row.velocity);
  const seasonal = (config.demand_multiplier || 1) !== 1;

  switch (row.flag) {
    case FLAG_ORDER_NOW: {
      if (cover !== null && Number.isFinite(cover)) {
        const days = Math.round(cover);
        const base =
          days <= 0
            ? `Товар закінчився. Продавався ~${perMonth}`
            : `Продається ~${perMonth}, вистачить лише на ${days} дн. Постачання займає ${lead} дн. — закінчиться до наступної поставки`;
        return seasonal ? `${base} (з поправкою на сезон).` : `${base}.`;
      }
      return `Продажі ~${perMonth} перевищують поточний запас із урахуванням терміну постачання ${lead} дн.`;
    }
    case FLAG_ORDER_SOON: {
      const days = cover !== null && Number.isFinite(cover) ? Math.round(cover) : null;
      return days !== null
        ? `Запасу на ~${days} дн. Наближається до точки замовлення — плануйте закупівлю найближчим часом.`
        : `Наближається до точки замовлення — плануйте закупівлю найближчим часом.`;
    }
    case FLAG_OK: {
      if (row.velocity === 0) {
        return `Немає продажів за період — товар лежить на складі, замовляти не потрібно.`;
      }
      const days = cover !== null && Number.isFinite(cover) ? Math.round(cover) : null;
      return days !== null
        ? `Достатньо запасу (~${days} дн.) при продажах ~${perMonth}.`
        : `Достатньо запасу при поточних продажах.`;
    }
    case FLAG_DATA: {
      if (row.stock_on_hand === null) {
        return `Продавався, але відсутній у списку залишків — перевірте картку товару в KeyCRM.`;
      }
      if (windowDays < 14) {
        return `Замало історії (${windowDays} дн.) для надійного прогнозу. Завантажте довший період.`;
      }
      return `Недостатньо даних для прогнозу.`;
    }
    default:
      return "";
  }
}
