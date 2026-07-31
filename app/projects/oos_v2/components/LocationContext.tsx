"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { scarcityLineFor, lookupUsState } from "../lib/geoScarcity";

/**
 * Visitor-location detection for the scarcity copy and the quiz's lead
 * payload. Forked from app/projects/oos/components/LocationContext.tsx —
 * same detection order (our own /api/geo route → ipapi.co client-side
 * fallback → default), cache keys namespaced to oos_v2 so this page's
 * sessionStorage never collides with oos_v3 or the original oos build.
 */

type GeoResult = { city: string | null; region: string | null; country: string | null };

type LocationState = { label: string; city: string | null; region: string | null };

const DEFAULT_LOCATION = "your area";
const CACHE_KEY = "oos_v2-geo-location";

const DEFAULT_STATE: LocationState = { label: DEFAULT_LOCATION, city: null, region: null };

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function deriveLabel(geo: GeoResult): string {
  if (geo.city) return titleCase(geo.city);
  if (geo.region) {
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

export function useLocationGeo(): { city: string | null; region: string | null } {
  const { city, region } = useContext(LocationContext);
  return { city, region };
}

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
