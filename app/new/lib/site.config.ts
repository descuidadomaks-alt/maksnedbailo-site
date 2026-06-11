/** ─── Founding-rate mechanic ─────────────────────────────────────────────────
 *  Single source of truth for the limited founding-rate offer shown under the
 *  Bottleneck Map CTAs. Decrement foundingSlotsLeft as sessions are booked —
 *  copy switches to the standard rate automatically at 0.
 */

export const foundingSlotsLeft = 5;

export const FOUNDING_RATE = "€297";
export const STANDARD_RATE = "€997";
export const FOUNDING_SLOTS_TOTAL = 5;

/** Monthly build capacity — shown in the "X of 5 still open" capacity line. */
export const slotsOpen = 2;
