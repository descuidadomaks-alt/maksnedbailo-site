/**
 * Overtime Hunch. — landing page constants.
 *
 * These are the only knobs the page reads. Fill the TODO placeholders with the
 * real values before running this as a paid-ad destination.
 *
 * ⚠ GUARANTEE_N is a REAL promise. Set it to a number you and Carter can
 *   actually deliver. A guarantee you can't honor breaks the one rule this
 *   whole company runs on.
 */

export const BRAND = "Overtime Hunch.";

// Your target service area, e.g. "the UK". Shown in copy where region matters.
export const REGION = "the UK"; // TODO: confirm target area

// Real 30-day booked-jobs commitment. NOT a marketing number — a deliverable.
export const GUARANTEE_N = "10"; // ⚠ TODO: set to a number you can honor

// Carter's closer calendar (Calendly / zcal). Shown after the form is submitted.
export const BOOKING_LINK = "https://zcal.co/carelessmaks/15min"; // TODO: Carter's closer calendar

// CRM / webhook endpoint the lead form POSTs to. Empty = no network call (the
// gate still unlocks so the page stays usable while you wire this up).
export const FORM_WEBHOOK = ""; // TODO: CRM / webhook endpoint

// Demo video. Leave empty to render the 16:9 placeholder with a play button.
// Set to a full embed URL (YouTube/Vimeo/Loom) to play the real demo.
export const VIDEO_EMBED = ""; // TODO: demo video embed URL
