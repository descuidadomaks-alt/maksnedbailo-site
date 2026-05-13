"use client";

import { useEffect, useRef } from "react";
import type { ProspectData } from "../data";

/**
 * Invisible anchor div that:
 * 1. Provides a section divider between SectionHero and SectionObservation
 * 2. Fires a `widget_visible` Plausible event when scrolled into view
 *
 * The actual Connecto chat script is loaded via <Script> in page.tsx.
 */
export default function ConnectoWidget({ data }: { data: ProspectData }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.plausible?.("widget_visible", { props: { slug: data.slug } });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [data.slug]);

  if (data.slotExpired) return null;

  return <div ref={ref} className="section-divider" />;
}
