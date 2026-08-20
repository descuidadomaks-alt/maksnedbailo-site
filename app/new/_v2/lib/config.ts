/** ─── /new V2 (experimental homepage) — config ──────────────────────────────
 *  Own, self-contained config for the V2 build. Does not touch the live
 *  homepage's app/new/lib/config.ts or app/new/lib/site.config.ts — those
 *  still carry the old founding-offer mechanic (deadline, price anchor,
 *  slot count) that V2 explicitly does not use.
 */

/**
 * Primary CTA target: the free, permanent AI Map booking page.
 *
 * Points at /ai-map, NOT /ai-map/new. That page was promoted to /ai-map and
 * /ai-map/new is now a 308 redirect, so leaving the old path here would send
 * every homepage CTA through a needless extra hop, which costs the visitor a
 * round trip and spends crawl budget on a redirect.
 */
export const CTA_TARGET = "/ai-map";
export const CTA_TARGET_ES = "/ai-map?lang=es";

/**
 * Voice agent proof section — off until the real agent is built and wired
 * in. See app/new/_v2/sections/VoiceProof.tsx for the plug-in boundary.
 */
export const VOICE_AGENT_ENABLED = false;
