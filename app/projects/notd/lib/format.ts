// Display-formatting helpers. Numbers are formatted for a shop owner, not an
// analyst: whole days (nobody reorders on "13.9 days"), sales shown per month
// (human-scale, no tiny per-day decimals like 0.167), money at 2dp.

/** Historical sales shown per month — the readable scale. velocity is units/day. */
export function formatPerMonth(velocity: number): string {
  if (velocity <= 0) return "—";
  const perMonth = velocity * 30;
  if (perMonth < 1) return "<1/міс";
  return `${Math.round(perMonth)}/міс`;
}

/** Days of cover as whole days — "≈" hints it's an estimate. */
export function formatDays(d: number | null): string {
  if (d === null) return "—";
  if (!Number.isFinite(d)) return "∞";
  return `${Math.round(d)}`;
}

/** Suggested order quantity — whole units. */
export function formatQty(q: number | null): string {
  if (q === null) return "—";
  return String(q);
}

export function formatStock(s: number | null): string {
  if (s === null) return "—";
  return String(Math.round(s));
}

export function formatMoney(m: number): string {
  return m.toLocaleString("uk-UA", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function formatMoneyPrecise(m: number): string {
  return m.toFixed(2);
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function formatWindowRange(dateMin: Date, dateMax: Date): string {
  return `${isoDate(dateMin)} → ${isoDate(dateMax)}`;
}
