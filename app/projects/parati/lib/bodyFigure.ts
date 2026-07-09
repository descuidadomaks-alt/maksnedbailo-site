/**
 * Maps ritual-explorer zones to the named groups inside New_body.svg
 * (public/projects/parati/New_body.svg). The artwork ships four
 * pre-composed anatomical groups — Head, Shoulders, Body, legs — sitting
 * under a permanent full-detail outline layer that always stays at full
 * opacity.
 *
 * Highlighting a zone means raising ONLY that zone's group(s) to 60%
 * opacity while the rest sit at 10% — no separate glow overlay needed.
 */
export const BODY_GROUP_IDS = ["Head", "Shoulders", "Body", "legs"] as const;
export type BodyGroupId = (typeof BODY_GROUP_IDS)[number];

export const ZONE_GROUP_MAP: Record<string, BodyGroupId[]> = {
  rostro: ["Head"],
  espalda: ["Shoulders"],
  piernas: ["legs"],
  cuerpo: ["Head", "Shoulders", "Body", "legs"],
};

const FAINT_OPACITY = 0.1;
const ACTIVE_OPACITY = 0.6;

/**
 * Injects an inline `style="opacity:…"` on each named group's opening tag,
 * matching the given active zone. Used server-side to render the correct
 * state on first paint (no flash-then-correct), and the same logic is
 * mirrored client-side (via direct DOM opacity writes) for zone switches.
 */
export function withZoneOpacity(svgMarkup: string, activeZone: string): string {
  const activeGroups = new Set<BodyGroupId>(ZONE_GROUP_MAP[activeZone] ?? []);
  let out = svgMarkup;
  for (const id of BODY_GROUP_IDS) {
    const opacity = activeGroups.has(id) ? ACTIVE_OPACITY : FAINT_OPACITY;
    const re = new RegExp(`(<g id="${id}"[^>]*?)(/?>)`);
    out = out.replace(re, (_match, openPart: string, close: string) => {
      const cleaned = openPart.replace(/\s+style="[^"]*"/, "");
      return `${cleaned} style="opacity:${opacity}"${close}`;
    });
  }
  return out;
}

export { FAINT_OPACITY, ACTIVE_OPACITY };
