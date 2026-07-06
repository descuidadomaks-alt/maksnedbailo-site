// Default forecast settings + static UI copy. Mirrors the /projects/oh3
// lib/config.ts convention: simple named constants, no schema/class.
import type { ForecastConfig } from "./types";

// Ported from D:\AI Automation\Service\Eldar\config.yaml. Note: the Python
// config also has a per_sku_lead_time override map — intentionally not
// exposed in this UI (out of scope), the default lead time always applies.
export const DEFAULT_CONFIG: ForecastConfig = {
  lead_time_days: 30,
  safety_days: 14,
  target_cover_days: 60,
  require_paid: true,
  excluded_statuses: ["Отменён", "Возврат", "Скасовано"],
  demand_multiplier: 1,
};

export const MIN_HISTORY_DAYS = 14;

export const TOOL_TITLE = "Прогноз дозамовлення";
export const TOOL_SUBTITLE = "Nailsoftheday";
export const TOOL_TAGLINE =
  "Завантажте два експорти з KeyCRM — отримайте ранжований план дозамовлення: що купити, скільки і наскільки терміново.";

export const PRIVACY_NOTE =
  "Дані обробляються повністю у вашому браузері — файли нікуди не завантажуються.";

export const FOOTER_CREDIT = "Побудовано Maks Nedbailo · AI Automation";
export const FOOTER_LINK = "https://maksnedbailo.site";

export const KEYCRM_HINT =
  "Потрібні два файли з KeyCRM: історія замовлень (експорт продажів) і список товарів із залишками.";

// Where survey answers are delivered. Paste an n8n / Make / Zapier webhook URL
// (or any endpoint that accepts a JSON POST — e.g. a Google Apps Script web
// app or Formspree). The browser POSTs through /api/outreach-form (same-origin,
// no CORS), which forwards the payload server-side. Empty = answers are only
// logged in the Vercel function logs and still adjust the on-screen forecast.
export const SURVEY_WEBHOOK = "";
