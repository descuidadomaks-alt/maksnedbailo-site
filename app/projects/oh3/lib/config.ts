/**
 * Overtime Hunch. — oh3 landing page constants.
 *
 * Restructured variant of /projects/oh2: front-loads the offer, replaces the
 * gated placeholder demo with a self-hosted real video. Fill the remaining
 * TODO placeholders with real values before running this as a paid-ad
 * destination.
 */

export const BRAND = "Overtime Hunch.";

// Campaign target market — shown in every scarcity line on the page.
// First market: New England (cheapest contractor CPMs, low agency saturation,
// and the "one business per area" promise is literally checkable there).
// Retargeting a new metro per campaign = change this one line.
export const REGION = "New England";

// ⚠ HONEST scarcity — a real onboarding cap, not a marketing number.
// Update it as spots actually fill; a fake counter breaks the one rule this
// whole company runs on.
export const SPOTS_LEFT = "5";

// The offer — shown in the hero chip, the value stack, and the final CTA.
export const PRICE = "$499/mo";
export const SETUP = "$0 setup";
export const TERMS = "No contract · cancel anytime";

// Carter's closer calendar (Calendly / zcal). Shown after the form is submitted.
export const BOOKING_LINK = "https://zcal.co/carelessmaks/15min"; // TODO: Carter's closer calendar

// CRM / webhook endpoint the lead form POSTs to. Empty = no network call (the
// gate still unlocks so the page stays usable while you wire this up).
export const FORM_WEBHOOK = ""; // TODO: CRM / webhook endpoint

// Self-hosted demo video — native <video controls>, no iframe/YouTube.
// Files live in public/projects/oh3/ (compressed to 720p, faststart).
export const VIDEO_SRC = "/projects/oh3/demo.mp4";
export const VIDEO_POSTER = "/projects/oh3/demo-poster.jpg";
