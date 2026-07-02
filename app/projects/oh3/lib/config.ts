/**
 * Overtime Hunch. — oh3 landing page constants.
 *
 * Restructured variant of /projects/oh2: front-loads the offer, replaces the
 * gated placeholder demo with a self-hosted real video. Fill the remaining
 * TODO placeholders with real values before running this as a paid-ad
 * destination.
 */

export const BRAND = "Overtime Hunch.";

// Your target service area, e.g. "the UK". Shown in copy where region matters.
export const REGION = "the UK"; // TODO: confirm target area

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
