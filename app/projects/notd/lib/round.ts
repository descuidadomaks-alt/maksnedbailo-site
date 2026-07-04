// Single rounding implementation used everywhere in this tool.
//
// The Python reference (forecast.py) uses the builtin round(), which is
// banker's rounding (round-half-to-even) — e.g. round(0.5) === 0. JavaScript's
// Math.round is round-half-up (Math.round(0.5) === 1). We deliberately use
// standard half-up rounding here rather than replicating banker's rounding:
// it's the intuitive behavior for a business-facing "how many units to order"
// number, and the two only disagree on values sitting exactly on a .5
// boundary, which essentially never happens with real sales-velocity math.
export function roundHalfUp(n: number, decimals = 0): number {
  if (!Number.isFinite(n)) return n;
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}
