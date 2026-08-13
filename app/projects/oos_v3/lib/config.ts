/**
 * oos_v3 — Overtime OS "anti-SaaS" landing-page variant. No price anywhere
 * on this page (see FinalCTA.tsx / Hero.tsx) — deliberately the opposite
 * bet from oos_v2 / oos_v2_1, which lead with $499/mo. Copy is new for this
 * variant; only the video source and the brand/tracking plumbing are
 * reused from the sibling pages.
 */

export const BRAND = "Overtime OS.";

// Reused directly from the live page — no video was downloaded/rehosted
// into this repo, this links straight to overtimeos.com's own asset.
export const VIDEO_SRC = "https://overtimeos.com/demo.mp4";
export const VIDEO_POSTER = "https://overtimeos.com/demo-poster.jpg";

export const PAGE_TAG = "oos_v3" as const;
