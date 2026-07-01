/** ─── Complimentary-offer mechanic ───────────────────────────────────────────
 *  Single source of truth for the limited complimentary offer shown under the
 *  Bottleneck Map CTAs. Decrement foundingSlotsLeft as sessions are booked —
 *  copy switches to the standard rate automatically at 0.
 */

export const foundingSlotsLeft = 5;

export const FOUNDING_RATE = "Free";
export const FOUNDING_RATE_ES = "Gratis";
export const STANDARD_RATE = "€1,470";
export const FOUNDING_SLOTS_TOTAL = 5;

/** Shown next to the founding rate wherever the offer has a hard deadline. */
export const FOUNDING_DEADLINE_EN = "until July 31";
export const FOUNDING_DEADLINE_ES = "hasta el 31 de julio";

/** Monthly build capacity — shown in the "X of 5 still open" capacity line. */
export const slotsOpen = 2;
