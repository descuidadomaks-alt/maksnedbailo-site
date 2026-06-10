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

// Bottleneck Score quiz — primary lead-magnet CTA, referenced from the hero,
// CTA-density bands, and the final section.
export const SCORE_TARGET = "/score";

// Phase 1 anchor price — shown in the Bottleneck Map sample + cost-of-inaction strip.
export const PHASE1_ANCHOR = "€4,500";

// Telegram handle — kept for /partners/* pages only. Removed from the
// homepage per the channel-cleanup pass (replaced by WA_BOTTLENECK_LINK).
export const TELEGRAM_HANDLE = "maksym_nedbailo";
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_HANDLE}`;

// WhatsApp number — shared across /new and /score for wa.me links with
// custom prefilled text (e.g. the /score result share link).
export const WA_NUMBER = "34641935207";

// WhatsApp — homepage secondary channel (replaces the Telegram "message me
// first" CTA). Pre-filled with a Bottleneck Map-flavoured opener.
export const WA_BOTTLENECK_LINK =
  `https://wa.me/${WA_NUMBER}?text=` +
  encodeURIComponent("Hi Maks, saw the Bottleneck Map — quick question");

// Hero visual anchor (Hero v2) — full-bleed stage photo behind the headline,
// dark gradient overlay applied in Hero.tsx. ~4:1, public/maks-stage.jpg.
export const STAGE_PHOTO_SRC = "/maks-stage.jpg";

// Founder portrait — used in the "Why I do this" (Belief) section. Per the
// "never the same image twice on one page" rule, the stage photo lives in
// the hero, so Belief keeps this portrait.
export const HERO_PHOTO_SRC = "/maks-photo.png";

// Anchor id for the Voice AI proof card (ProofSection) — replaces the old
// off-site chasehughes.com demo link with an on-page anchor.
export const VOICE_DEMO_ANCHOR = "#voice-demo";

/**
 * Hero headline — Option A (live).
 * "Your team isn't the bottleneck. You are."
 *
 * Kept for future A/B testing (not wired up — swap headlineLines in
 * lib/i18n.ts to test):
 *
 * Option B: "You're the bottleneck. Let's find out what it costs."
 * Option C: "You can't be everywhere. That's what it's costing you."
 */
