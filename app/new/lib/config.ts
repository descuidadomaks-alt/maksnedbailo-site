/** ─── /new (Care Less brand homepage) — config ──────────────────────────────
 *  Single source of truth for the primary CTA target and shared constants.
 *  Change one value here to update every "Book the Bottleneck Map" CTA.
 */

/**
 * CTA_TARGET — primary CTA destination across /new.
 *
 * Two reasonable choices:
 *  - The /ai-map offer page (lets visitors read the full offer + FAQ first)
 *  - The zcal booking link directly (one click to book)
 *
 * Currently set to the zcal booking link, matching the rest of the site's
 * "Book the Bottleneck Map" CTAs (/ai-map, /partners). Swap to "/ai-map" if
 * Maks wants the homepage CTA to land on the offer page first.
 */
export const CTA_TARGET = "https://zcal.co/carelessmaks/ai-map";

// Phase 1 anchor price — shown in the Bottleneck Map sample + cost-of-inaction strip.
export const PHASE1_ANCHOR = "€4,500";

// Telegram handle — used for the secondary "message me first" link.
export const TELEGRAM_HANDLE = "maksym_nedbailo";
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_HANDLE}`;
