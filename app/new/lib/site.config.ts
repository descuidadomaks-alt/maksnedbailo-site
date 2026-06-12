/** ─── Founding-rate mechanic ─────────────────────────────────────────────────
 *  Single source of truth for the limited founding-rate offer shown under the
 *  Bottleneck Map CTAs. Decrement foundingSlotsLeft as sessions are booked —
 *  copy switches to the standard rate automatically at 0.
 */

export const foundingSlotsLeft = 5;

export const FOUNDING_RATE = "€297";
export const STANDARD_RATE = "€1,500";
export const FOUNDING_SLOTS_TOTAL = 5;

/** Shown next to the founding rate wherever the offer has a hard deadline. */
export const FOUNDING_DEADLINE_EN = "until June 30";
export const FOUNDING_DEADLINE_ES = "hasta el 30 de junio";

/** Monthly build capacity — shown in the "X of 5 still open" capacity line. */
export const slotsOpen = 2;
