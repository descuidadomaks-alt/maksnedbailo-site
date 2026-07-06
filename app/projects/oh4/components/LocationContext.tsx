"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { scarcityLineFor, lookupUsState } from "../lib/geoScarcity";

/**
 * Visitor-location detection for the scarcity copy (see useScarcityLine
 * below) and the quiz's lead payload (see QuizContext.tsx). Confidence
 * ladder for the display label: city → region/state → "your area". Resolves
 * once per visit (sessionStorage-cached) and swaps in client-side after the
 * neutral default's first paint, so SSR/hydration never mismatch and
 * there's no layout shift — only the text itself changes.
 *
 * Detection order: our own /api/geo route (reads Vercel's ip-geo headers,
 * empty off-Vercel) → ipapi.co client-side fallback (1.5s timeout) → default.
 */

type GeoResult = { city: string | null; region: string | null; country: string | null };

type LocationState = { label: string; city: string | null; region: string | null };

const DEFAULT_LOCATION = "your area";
const CACHE_KEY = "oh4-geo-location";

const DEFAULT_STATE: LocationState = { label: DEFAULT_LOCATION, city: null, region: null };

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function deriveLabel(geo: GeoResult): string {
  if (geo.city) return titleCase(geo.city);
  if (geo.region) {
    // Vercel's geo header carries a region CODE ("VT"), ipapi a full name
    // ("Vermont") — expand codes so the label never renders as "Vt".
    const state = lookupUsState(geo.region);
    return state ? state.name : titleCase(geo.region);
  }
  return DEFAULT_LOCATION;
}

async function fetchIpapiFallback(): Promise<GeoResult | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      city: typeof data.city === "string" ? data.city : null,
      region: typeof data.region === "string" ? data.region : null,
      country: typeof data.country_name === "string" ? data.country_name : null,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

const LocationContext = createContext<LocationState>(DEFAULT_STATE);

/** Display label for scarcity copy: city → region → "your area". */
export function useLocation(): string {
  return useContext(LocationContext).label;
}

/** Raw city/region for the quiz's lead payload — null until resolved. */
export function useLocationGeo(): { city: string | null; region: string | null } {
  const { city, region } = useContext(LocationContext);
  return { city, region };
}

/**
 * Market-size-aware scarcity copy — the tier logic and all numbers live in
 * lib/geoScarcity.ts (metro service-area split → small-city flat count →
 * population-scaled state count → numberless fallbacks).
 */
export function useScarcityLine(): string {
  const { label, city, region } = useContext(LocationContext);
  return scarcityLineFor(city, region, label);
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LocationState>(DEFAULT_STATE);

  useEffect(() => {
    let cancelled = false;

    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        setState(JSON.parse(cached) as LocationState);
      } catch {
        setState({ ...DEFAULT_STATE, label: cached });
      }
      return;
    }

    (async () => {
      let geo: GeoResult | null = null;

      try {
        const res = await fetch("/api/geo");
        if (res.ok) {
          const data = (await res.json()) as GeoResult;
          if (data.city || data.region) geo = data;
        }
      } catch {
        // fall through to the client-side fallback below
      }

      if (!geo) {
        geo = await fetchIpapiFallback();
      }

      if (cancelled) return;

      const next: LocationState = geo
        ? { label: deriveLabel(geo), city: geo.city, region: geo.region }
        : DEFAULT_STATE;
      setState(next);
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(next));
      } catch {
        // sessionStorage unavailable (private mode etc.) — non-fatal
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <LocationContext.Provider value={state}>{children}</LocationContext.Provider>;
}
