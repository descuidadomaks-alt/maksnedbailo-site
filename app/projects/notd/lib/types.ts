// Shared types for the reorder-forecast pipeline. Ported from the Python MVP
// (D:\AI Automation\Service\Eldar\{loader,forecast,report}.py) — field names
// mirror the Python internal column names, not the Cyrillic source headers.

export type SourceRole = "orders" | "products" | "unknown";

/** Raw parsed table, before role detection or column mapping. */
export interface RawTable {
  headers: string[];
  rows: Record<string, unknown>[];
}

export interface OrderRow {
  sku: string;
  qty_sold: number;
  sale_date: Date | null;
  name: string;
  order_status: string;
  pay_status: string;
  sell_price: number;
  cost: number;
}

export interface ProductRow {
  sku: string;
  stock_on_hand: number;
  name: string;
  sell_price: number;
  cost: number;
  product_id: string;
  category: string;
}

export interface ForecastConfig {
  lead_time_days: number;
  safety_days: number;
  target_cover_days: number;
  require_paid: boolean;
  excluded_statuses: string[];
  // Seasonal demand adjustment applied to forward-looking math (reorder point,
  // order qty, days of cover). 1 = no change; set by the "improve accuracy"
  // survey. Historical velocity shown in the table stays actual, unadjusted.
  demand_multiplier: number;
}

/** Answers from the "improve accuracy" survey. lead_time / safety / season feed
 * the math directly; the rest are captured to refine future logic. */
export interface SurveyAnswers {
  leadTimeDays: number;
  serviceLevel: "economical" | "balanced" | "max";
  season: "low" | "normal" | "up" | "peak";
  moq?: string;
  promo?: string;
  discontinuing?: string;
  budget?: string;
}

export type InsightTone = "risk" | "cash" | "info";

export interface Insight {
  tone: InsightTone;
  title: string;
  body: string;
}

export type Flag = "🔴 ORDER NOW" | "🟡 ORDER SOON" | "🟢 OK" | "⚠ DATA";

export interface ReportRow {
  sku: string;
  name: string;
  stock_on_hand: number | null;
  velocity: number;
  days_of_cover: number | null; // null = no stock record, Infinity = velocity 0 with stock
  reorder_point: number;
  order_qty: number | null; // null = no stock record
  flag: Flag;
  sell_price: number;
  cost: number;
  lead_time_days: number;
}

export interface ForecastResult {
  rows: ReportRow[];
  windowDays: number;
  dateMin: Date;
  dateMax: Date;
  matchedCount: number;
  ordersOnlyCount: number;
  productsOnlyCount: number;
  capitalAtRisk: number;
}

/** A loaded input source (either an uploaded file or a fetched Google Sheet). */
export interface LoadedSource {
  id: string;
  label: string;
  role: SourceRole;
  rowCount: number;
  error?: string;
}
