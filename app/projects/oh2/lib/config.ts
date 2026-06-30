/**
 * Overtime Hunch. — oh2 landing page constants.
 *
 * Parallel variant of /projects/overtimehunch built around the AI-front-desk
 * offer ($499/mo, $0 setup) instead of the ads-included offer. Fill the TODO
 * placeholders with real values before running this as a paid-ad destination.
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

// Demo video — direct video FILE url (.mp4/.webm), not a YouTube/iframe embed.
// The demo section renders a <video autoPlay muted loop playsInline> so it
// plays silently on loop the moment a real file is set. Empty = 16:9
// placeholder with a play icon.
export const VIDEO_EMBED = ""; // TODO: demo video file URL (mp4/webm)
