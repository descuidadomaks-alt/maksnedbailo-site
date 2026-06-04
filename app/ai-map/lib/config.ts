/** ─── Direct sales page config ───────────────────────────────────────────────
 *  Change a single value here to update pricing/deadlines everywhere on /ai-map.
 */

// ── Complimentary phase (active until COMP_DEADLINE) ───────────────────────
export const COMP_DEADLINE     = "June 15, 2026";
export const COMP_DEADLINE_ISO = "2026-06-15T23:59:59";

// ── Paid phase constants (commented out — restore after June 15) ───────────
// export const PRICE_CURRENT      = "€997";
// export const PRICE_ANCHOR       = "€1,500";
// export const OFFER_DEADLINE     = "June 30, 2026";
// export const OFFER_DEADLINE_ISO = "2026-06-30T23:59:59";

// ── Shared ─────────────────────────────────────────────────────────────────
export const PHASE1_ANCHOR  = "€4,500";
export const TELEGRAM_HANDLE = "maksym_nedbailo";

/**
 * CHECKOUT_URL — CTA destination.
 * Currently points to Vlad's zcal (complimentary phase).
 * Swap to Stripe Payment Link when moving back to paid (after June 15).
 *
 * Previous paid URL (keep for restore):
 * // export const CHECKOUT_URL = "https://buy.stripe.com/TODO_CHECKOUT_URL";
 */
export const CHECKOUT_URL = "https://zcal.co/carelessmaks/ai-map";
