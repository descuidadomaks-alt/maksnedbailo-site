"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

export default function DemoTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const p = (e: string, props?: Record<string, string>) =>
      window.plausible?.(e, { props: { slug, ...props } });

    // Dwell time milestones
    const t30 = setTimeout(() => p("time_30s"), 30_000);
    const t60 = setTimeout(() => p("time_60s"), 60_000);
    const t120 = setTimeout(() => p("time_120s"), 120_000);

    // demo_loaded
    p("demo_loaded");

    // scroll_75 — once
    let fired75 = false;
    const onScroll = () => {
      if (fired75) return;
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (pct >= 0.75) {
        p("scroll_75");
        fired75 = true;
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(t30);
      clearTimeout(t60);
      clearTimeout(t120);
      window.removeEventListener("scroll", onScroll);
    };
  }, [slug]);

  return null;
}
