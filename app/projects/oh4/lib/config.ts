/**
 * Overtime Hunch. — oh4 landing page constants.
 *
 * oh4 is oh3 re-gated for the Carter ad campaign: the demo video is now
 * locked until the visitor submits the form (see components/VideoForm.tsx),
 * the scarcity copy uses IP-derived location instead of a hardcoded region
 * (see components/LocationContext.tsx), and Meta Pixel is wired in (see
 * components/MetaPixel.tsx). Fill the remaining TODO placeholders with real
 * values before running this as a paid-ad destination.
 */

export const BRAND = "Overtime Hunch.";

// Location is now resolved per-visitor (city → region → "your area"; see
// LocationContext.tsx + app/api/geo/route.ts) instead of one hardcoded
// REGION constant. SCARCITY_LINE fills in the resolved label at render time.
//
// ⚠ Deliberately no per-city/state numeric spot count here — multiplying a
// single "N spots" figure across every detected city would be false. If a
// number is wanted anywhere, use the single global CAPACITY_LINE below
// instead.
export const SCARCITY_LINE = (location: string) =>
  `Now onboarding in ${location} — we only take a few businesses per area, so you never compete with our own clients.`;

// ⚠ HONEST scarcity — a real, non-per-city onboarding cap. Update the wording
// as spots actually fill; a fake counter breaks the one rule this whole
// company runs on.
export const CAPACITY_LINE = "A few onboarding spots open this month.";

// The offer — shown in the hero chip, the value stack, and the final CTA.
export const PRICE = "$499/mo";
export const SETUP = "$0 setup";
export const TERMS = "No contract · cancel anytime";

// Carter's closer calendar (Calendly / zcal). Shown after the form is submitted.
export const BOOKING_LINK = "https://zcal.co/carelessmaks/15min"; // TODO: Carter's closer calendar

// CRM / webhook endpoint the lead form POSTs to. Empty = no network call (the
// gate still unlocks so the page stays usable while you wire this up).
export const FORM_WEBHOOK = ""; // TODO: CRM / webhook endpoint

// Self-hosted demo video — native <video>, no iframe/YouTube. Gated behind
// the form until submit (see VideoForm.tsx). Files live in
// public/projects/oh4/ (compressed to 720p, faststart).
export const VIDEO_SRC = "/projects/oh4/demo.mp4";
export const VIDEO_POSTER = "/projects/oh4/demo-poster.jpg";

// Meta Pixel ID — Carter supplies the real ID; swap this one line to go
// live. components/MetaPixel.tsx no-ops entirely while this stays the
// placeholder.
export const PIXEL_ID = "PIXEL_ID_PENDING"; // TODO: Carter's Meta Pixel ID
