/** ─── Direct sales page config ───────────────────────────────────────────────
 *  Change a single value here to update pricing/deadlines everywhere on /ai-map.
 */

// ── Founding-rate phase (active until OFFER_DEADLINE) ──────────────────────
// Matches the homepage: €1,500 struck through -> €297 founding rate.
export const PRICE_CURRENT      = "€297";
export const PRICE_ANCHOR       = "€1,500";
export const OFFER_DEADLINE     = "June 30, 2026";
export const OFFER_DEADLINE_ISO = "2026-06-30T23:59:59";

// Legacy aliases — the complimentary phase ended June 15; countdown components
// keep working against the new deadline.
export const COMP_DEADLINE     = OFFER_DEADLINE;
export const COMP_DEADLINE_ISO = OFFER_DEADLINE_ISO;

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
