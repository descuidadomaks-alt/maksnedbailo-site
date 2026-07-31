/**
 * oos_v2 — Overtime OS landing-page variant A ("value stack morphs into
 * pricing"). Hosted here so it can be iterated on without redeploying the
 * live overtimeos.com ad page (a separate repo). Copy for every section
 * below except the hero headline is locked to the live page's verbatim
 * text — see the Task 1 inventory in this session for the source.
 */

export const BRAND = "Overtime OS.";

export const PRICE = "$499/mo";
export const SETUP = "$0 setup";
export const TERMS = "No contract · cancel anytime";

// Reused directly from the live page — no video was downloaded/rehosted
// into this repo, this links straight to overtimeos.com's own asset.
export const VIDEO_SRC = "https://overtimeos.com/demo.mp4";
export const VIDEO_POSTER = "https://overtimeos.com/demo-poster.jpg";

export const PAGE_TAG = "oos_v2" as const;
