/** ─── /new (Care Less brand homepage) — config ──────────────────────────────
 *  Single source of truth for the primary CTA target and shared constants.
 *  Change one value here to update every "Book the Bottleneck Map" CTA.
 */

/**
 * CTA_TARGET — primary CTA destination across /new and /score.
 *
 * Routes to the /ai-map offer page (full pricing, guarantee, FAQ, then the
 * zcal booking CTA). zcal itself is only linked from /ai-map — every other
 * "Book the Bottleneck Map" CTA on the site routes here first.
 */
export const CTA_TARGET = "/ai-map";

// Bottleneck Score quiz — primary lead-magnet CTA, referenced from the hero,
// CTA-density bands, and the final section.
export const SCORE_TARGET = "/score";

// Phase 1 anchor price — shown in the Bottleneck Map sample + cost-of-inaction strip.
export const PHASE1_ANCHOR = "€4,500";

// Telegram handle — kept for /partners/* pages only. Removed from the
// homepage per the channel-cleanup pass (replaced by WA_BOTTLENECK_LINK).
export const TELEGRAM_HANDLE = "maksym_nedbailo";
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_HANDLE}`;

// Public Upwork profile — third-party source for the on-page client reviews.
// Used as `sameAs` on the Person schema (app/layout.tsx) and as the visible
// "verified on Upwork" source link in sections/Testimonials.tsx. First-party
// testimonials are only trusted by search/AI engines when the independent
// source is linked.
export const UPWORK_PROFILE_URL = "https://www.upwork.com/freelancers/maksdcoast";

// WhatsApp number — shared across /new and /score for wa.me links with
// custom prefilled text (e.g. the /score result share link).
export const WA_NUMBER = "34641935207";

// WhatsApp — homepage secondary channel (replaces the Telegram "message me
// first" CTA). Pre-filled with a Bottleneck Map-flavoured opener.
export const WA_BOTTLENECK_LINK =
  `https://wa.me/${WA_NUMBER}?text=` +
  encodeURIComponent("Hi Maks, saw the Bottleneck Map — quick question");

// Hero visual anchor — bottom photo band under the hero copy. 1400x450
// (taller crop than the old maks-stage.jpg so the head isn't cut off).
export const STAGE_PHOTO_SRC = "/maks-stage2.jpg";

// Founder portrait — kept for reference, no longer used in Belief (see
// CRM_SCREENSHOT_SRC below). Per the "never the same image twice on one
// page" rule, the stage photo lives in the hero.
export const HERO_PHOTO_SRC = "/maks-photo.png";

// "Why I do this" (Belief) section visual. Portrait, 1536x2752 — JPEG
// re-encode of hero-image.png (7.4MB -> ~460KB; the PNG's decode cost was a
// visible scroll-jank contributor).
export const CRM_SCREENSHOT_SRC = "/hero-image.jpg";

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
