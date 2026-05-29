"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
    // Microsoft Clarity custom tag API
    clarity?: (method: string, key: string, value?: string) => void;
  }
}

/** Fire an event to both Plausible and Clarity (if available). */
function track(event: string, props: Record<string, string>) {
  window.plausible?.(event, { props });
  // Clarity: custom tags visible in session recordings & dashboards
  if (window.clarity) {
    window.clarity("set", event, Object.values(props).join(" | "));
  }
}

/**
 * Client-only component. Fires named analytics events for:
 *  — Scroll depth (25 / 50 / 75 / 100 %)   → "scroll_depth"
 *  — Time on page (on beforeunload buckets) → "partner_time_on_page"
 */
export default function PartnerAnalytics({ slug }: { slug: string }) {
  useEffect(() => {
    const fired = new Set<string>();
    const THRESHOLDS = [25, 50, 75, 100];
    const startTime = Date.now();

    // ── Scroll depth ──────────────────────────────────────────────────────────
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop + el.clientHeight;
      const total = el.scrollHeight;
      if (total <= 0) return;

      const pct = Math.round((scrolled / total) * 100);
      for (const t of THRESHOLDS) {
        if (pct >= t && !fired.has(`scroll_${t}`)) {
          fired.add(`scroll_${t}`);
          track("scroll_depth", { slug, depth: `${t}%` });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // fire immediately if already scrolled (e.g. refresh mid-page)

    // ── Time on page ──────────────────────────────────────────────────────────
    const onLeave = () => {
      const seconds = Math.round((Date.now() - startTime) / 1000);
      let bucket: string;
      if (seconds < 30)       bucket = "<30s";
      else if (seconds < 60)  bucket = "30–60s";
      else if (seconds < 120) bucket = "1–2min";
      else if (seconds < 180) bucket = "2–3min";
      else                    bucket = "3min+";

      track("partner_time_on_page", { slug, duration: bucket });
    };

    window.addEventListener("beforeunload", onLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeunload", onLeave);
    };
  }, [slug]);

  return null;
}
