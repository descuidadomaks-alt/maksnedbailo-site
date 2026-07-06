"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Visitor-location detection for the scarcity copy (see lib/config#SCARCITY_LINE).
 * Confidence ladder: city → region/state → "your area". Resolves once per
 * visit (sessionStorage-cached) and swaps in client-side after the neutral
 * default's first paint, so SSR/hydration never mismatch and there's no
 * layout shift — only the text itself changes.
 *
 * Detection order: our own /api/geo route (reads Vercel's ip-geo headers,
 * empty off-Vercel) → ipapi.co client-side fallback (1.5s timeout) → default.
 */

type GeoResult = { city: string | null; region: string | null; country: string | null };

const DEFAULT_LOCATION = "your area";
const CACHE_KEY = "oh4-geo-location";

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function deriveLabel(geo: GeoResult): string {
  if (geo.city) return titleCase(geo.city);
  if (geo.region) return titleCase(geo.region);
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

const LocationContext = createContext<string>(DEFAULT_LOCATION);

export function useLocation(): string {
  return useContext(LocationContext);
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(DEFAULT_LOCATION);

  useEffect(() => {
    let cancelled = false;

    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      setLocation(cached);
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

      const label = geo ? deriveLabel(geo) : DEFAULT_LOCATION;
      setLocation(label);
      try {
        sessionStorage.setItem(CACHE_KEY, label);
      } catch {
        // sessionStorage unavailable (private mode etc.) — non-fatal
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <LocationContext.Provider value={location}>{children}</LocationContext.Provider>;
}
