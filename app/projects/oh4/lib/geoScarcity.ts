/**
 * Market-size-aware scarcity copy for oh4 (consumed via
 * LocationContext#useScarcityLine). Flat numbers read as fake as soon as the
 * market size varies — "5 spots in Madrid" (3.4M people) next to "50 spots
 * in Vermont" (620k) is backwards. So the unit of scarcity is the SERVICE
 * AREA, and the counts scale with the market:
 *
 *   major metro   → the city is split into N service areas (N scales with
 *                   the metro's size), most already claimed
 *   smaller city  → one city ≈ a few service areas → a tight flat count
 *   US state      → capacity derived from the state's population
 *   non-US region → named but numberless (we don't know that market)
 *   unknown       → generic one-per-trade-per-area line, no invented number
 *
 * "One business per trade, per service area" also fixes the exclusivity
 * promise for big cities — "never two competitors in New York" was
 * meaningless; "never two competitors in your service area" is the actual
 * offer.
 *
 * ⚠ These are hand-set campaign constants, not a live counter. The FRACTIONS
 * below decide how "sold out" the campaign claims to be — keep them in sync
 * with reality as spots actually fill.
 */

// Spots shown for a city we don't have in the metro table (≈ small/mid city).
export const SMALL_CITY_SPOTS_LEFT = 5;

// Fraction of capacity claimed so far. Metros run "hotter" (more claimed)
// than states — a big city being 60% taken is believable and urgent; a whole
// state at 60% on launch would read as fake.
const METRO_CLAIMED_FRACTION = 0.6;
const STATE_CLAIMED_FRACTION = 0.4;

// US states: 2-letter code → display name + population in millions.
// Population drives the state-tier capacity (see stateCapacity below).
const US_STATES: Record<string, { name: string; popM: number }> = {
  AL: { name: "Alabama", popM: 5.1 },
  AK: { name: "Alaska", popM: 0.73 },
  AZ: { name: "Arizona", popM: 7.4 },
  AR: { name: "Arkansas", popM: 3.1 },
  CA: { name: "California", popM: 39.0 },
  CO: { name: "Colorado", popM: 5.9 },
  CT: { name: "Connecticut", popM: 3.6 },
  DE: { name: "Delaware", popM: 1.0 },
  DC: { name: "Washington, D.C.", popM: 0.68 },
  FL: { name: "Florida", popM: 22.6 },
  GA: { name: "Georgia", popM: 11.0 },
  HI: { name: "Hawaii", popM: 1.4 },
  ID: { name: "Idaho", popM: 2.0 },
  IL: { name: "Illinois", popM: 12.5 },
  IN: { name: "Indiana", popM: 6.9 },
  IA: { name: "Iowa", popM: 3.2 },
  KS: { name: "Kansas", popM: 2.9 },
  KY: { name: "Kentucky", popM: 4.5 },
  LA: { name: "Louisiana", popM: 4.6 },
  ME: { name: "Maine", popM: 1.4 },
  MD: { name: "Maryland", popM: 6.2 },
  MA: { name: "Massachusetts", popM: 7.0 },
  MI: { name: "Michigan", popM: 10.0 },
  MN: { name: "Minnesota", popM: 5.7 },
  MS: { name: "Mississippi", popM: 2.9 },
  MO: { name: "Missouri", popM: 6.2 },
  MT: { name: "Montana", popM: 1.1 },
  NE: { name: "Nebraska", popM: 2.0 },
  NV: { name: "Nevada", popM: 3.2 },
  NH: { name: "New Hampshire", popM: 1.4 },
  NJ: { name: "New Jersey", popM: 9.3 },
  NM: { name: "New Mexico", popM: 2.1 },
  NY: { name: "New York", popM: 19.6 },
  NC: { name: "North Carolina", popM: 10.8 },
  ND: { name: "North Dakota", popM: 0.78 },
  OH: { name: "Ohio", popM: 11.8 },
  OK: { name: "Oklahoma", popM: 4.0 },
  OR: { name: "Oregon", popM: 4.2 },
  PA: { name: "Pennsylvania", popM: 13.0 },
  RI: { name: "Rhode Island", popM: 1.1 },
  SC: { name: "South Carolina", popM: 5.4 },
  SD: { name: "South Dakota", popM: 0.92 },
  TN: { name: "Tennessee", popM: 7.1 },
  TX: { name: "Texas", popM: 30.5 },
  UT: { name: "Utah", popM: 3.4 },
  VT: { name: "Vermont", popM: 0.65 },
  VA: { name: "Virginia", popM: 8.7 },
  WA: { name: "Washington", popM: 7.8 },
  WV: { name: "West Virginia", popM: 1.8 },
  WI: { name: "Wisconsin", popM: 5.9 },
  WY: { name: "Wyoming", popM: 0.58 },
};

const STATE_NAME_TO_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(US_STATES).map(([code, s]) => [s.name.toLowerCase(), code]),
);

// Major metros → how many service areas we split them into. Hand-tuned to
// roughly track metro size. NYC boroughs alias to the New York entry —
// ip-geo often returns the borough as the city. A few non-US cities are here
// so international traffic (and dev testing from Spain) reads sanely too.
const MAJOR_METROS: Record<string, { label: string; areas: number }> = {
  "new york": { label: "New York", areas: 42 },
  "new york city": { label: "New York", areas: 42 },
  brooklyn: { label: "New York", areas: 42 },
  queens: { label: "New York", areas: 42 },
  bronx: { label: "New York", areas: 42 },
  "the bronx": { label: "New York", areas: 42 },
  manhattan: { label: "New York", areas: 42 },
  "staten island": { label: "New York", areas: 42 },
  "los angeles": { label: "Los Angeles", areas: 28 },
  chicago: { label: "Chicago", areas: 20 },
  houston: { label: "Houston", areas: 18 },
  phoenix: { label: "Phoenix", areas: 14 },
  philadelphia: { label: "Philadelphia", areas: 14 },
  "san antonio": { label: "San Antonio", areas: 12 },
  "san diego": { label: "San Diego", areas: 12 },
  dallas: { label: "Dallas", areas: 14 },
  "fort worth": { label: "Fort Worth", areas: 9 },
  austin: { label: "Austin", areas: 10 },
  jacksonville: { label: "Jacksonville", areas: 9 },
  columbus: { label: "Columbus", areas: 9 },
  charlotte: { label: "Charlotte", areas: 9 },
  "san francisco": { label: "San Francisco", areas: 10 },
  indianapolis: { label: "Indianapolis", areas: 8 },
  seattle: { label: "Seattle", areas: 10 },
  denver: { label: "Denver", areas: 10 },
  boston: { label: "Boston", areas: 10 },
  nashville: { label: "Nashville", areas: 8 },
  "las vegas": { label: "Las Vegas", areas: 9 },
  detroit: { label: "Detroit", areas: 10 },
  memphis: { label: "Memphis", areas: 8 },
  baltimore: { label: "Baltimore", areas: 9 },
  milwaukee: { label: "Milwaukee", areas: 8 },
  sacramento: { label: "Sacramento", areas: 9 },
  "kansas city": { label: "Kansas City", areas: 8 },
  atlanta: { label: "Atlanta", areas: 12 },
  miami: { label: "Miami", areas: 12 },
  tampa: { label: "Tampa", areas: 8 },
  orlando: { label: "Orlando", areas: 8 },
  minneapolis: { label: "Minneapolis", areas: 8 },
  portland: { label: "Portland", areas: 8 },
  washington: { label: "Washington, D.C.", areas: 10 },
  // Non-US, mostly for demo/dev traffic:
  madrid: { label: "Madrid", areas: 20 },
  barcelona: { label: "Barcelona", areas: 14 },
  london: { label: "London", areas: 30 },
  toronto: { label: "Toronto", areas: 16 },
  "mexico city": { label: "Mexico City", areas: 30 },
};

/** ~1 service area per 500k people; floor 6 so tiny states still read as scarce, cap 48. */
function stateCapacity(popM: number): number {
  return Math.min(48, Math.max(6, Math.round(popM * 2)));
}

function split(total: number, claimedFraction: number): { taken: number; left: number } {
  const taken = Math.round(total * claimedFraction);
  return { taken, left: total - taken };
}

/** Resolve a region value (2-letter code like "VT" or full name) to a US state. */
export function lookupUsState(region: string): { name: string; popM: number } | null {
  const trimmed = region.trim();
  if (/^[A-Za-z]{2}$/.test(trimmed)) return US_STATES[trimmed.toUpperCase()] ?? null;
  const code = STATE_NAME_TO_CODE[trimmed.toLowerCase()];
  return code ? US_STATES[code] : null;
}

/**
 * The scarcity line, tiered by location confidence and market size.
 * `label` is the already-derived display label (titled-cased city/region).
 */
export function scarcityLineFor(
  city: string | null,
  region: string | null,
  label: string,
): string {
  if (city) {
    const metro = MAJOR_METROS[city.trim().toLowerCase()];
    if (metro) {
      const { taken, left } = split(metro.areas, METRO_CLAIMED_FRACTION);
      return `${metro.label} is big — so we split it into ${metro.areas} service areas, one business per trade in each. ${taken} are already claimed; ${left} still open.`;
    }
    return `Only ${SMALL_CITY_SPOTS_LEFT} spots left in ${label} — first come, first served. One business per trade, per service area.`;
  }

  if (region) {
    const state = lookupUsState(region);
    if (state) {
      const total = stateCapacity(state.popM);
      const { taken, left } = split(total, STATE_CLAIMED_FRACTION);
      return `${taken} of ${total} spots across ${state.name} are already claimed — ${left} left. One business per trade, per service area.`;
    }
    // Region resolved but not a US state (international traffic) — name it,
    // but don't invent a number for a market we haven't sized.
    return `Now onboarding in ${label} — one business per trade, per service area, so you never compete with our own clients.`;
  }

  return "We only take one business per trade, per service area — so you never compete with our own clients.";
}
