/**
 * Overtime OS. — oh6 landing page constants. Renamed from "Overtime Hunch"
 * (oh4 and earlier keep the old brand; see app/api/lead/route.ts, which
 * branches its notification copy on `page` so oh4's emails/Telegram alerts
 * still say Overtime Hunch).
 *
 * oh6 is oh3 re-gated for the Carter ad campaign: the demo video is now
 * locked until the visitor submits the form (see components/VideoForm.tsx),
 * the scarcity copy uses IP-derived location instead of a hardcoded region
 * (see components/LocationContext.tsx), and Meta Pixel is wired in (see
 * components/MetaPixel.tsx). Fill the remaining TODO placeholders with real
 * values before running this as a paid-ad destination.
 */

export const BRAND = "Overtime OS.";

// Location is resolved per-visitor (city → region → "your area"; see
// LocationContext.tsx + app/api/geo/route.ts). The scarcity copy is
// market-size-aware — tier logic, metro/state tables, and all tunable
// numbers live in lib/geoScarcity.ts.

// The offer — shown in the hero chip, the value stack, and the final CTA.
export const PRICE = "$499/mo";
export const SETUP = "$0 setup";
export const TERMS = "No contract · cancel anytime";

// Carter's closer calendar (Calendly / zcal). Shown after the form is submitted.
export const BOOKING_LINK = "https://zcal.co/carelessmaks/15min"; // TODO: Carter's closer calendar

// Self-hosted demo video — native <video>, no iframe/YouTube. Gated behind
// the form until submit (see VideoForm.tsx). Files live in
// public/projects/oh6/ (compressed to 720p, faststart).
export const VIDEO_SRC = "/projects/oh6/demo.mp4";
export const VIDEO_POSTER = "/projects/oh6/demo-poster.jpg";

// Meta Pixel ID — Carter supplies the real ID; swap this one line to go
// live. components/MetaPixel.tsx no-ops entirely while this stays the
// placeholder.
export const PIXEL_ID = "PIXEL_ID_PENDING"; // TODO: Carter's Meta Pixel ID
