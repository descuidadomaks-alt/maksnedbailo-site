"use client";

import { useEffect, useRef } from "react";
import type { ProspectData } from "../data";

export default function ConnectoWidget({ data }: { data: ProspectData }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fire widget_visible Plausible event when the anchor scrolls into view
  useEffect(() => {
    const el = containerRef.current;
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

  // Inject Connecto script via DOM so all data-* attributes are reliably set
  useEffect(() => {
    const w = data.connectoWidget;
    if (!w) return;

    const script = document.createElement("script");
    script.src = w.src;
    script.async = true;
    script.setAttribute("data-widget-key", w.widgetKey);
    script.setAttribute("data-api-url", w.apiUrl);
    script.setAttribute("data-title", w.title);
    script.setAttribute("data-subtitle", w.subtitle);
    script.setAttribute("data-colour", w.colour);
    script.setAttribute("data-position", w.position);
    script.setAttribute("data-language", w.language);
    script.setAttribute("data-auto-open", "true");

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [data.connectoWidget]);

  if (data.slotExpired) return null;

  return (
    <div
      ref={containerRef}
      id="connecto-widget-container"
      className="section-divider py-8 flex items-center justify-center min-h-[80px]"
    >
      {!data.connectoWidget && (
        <p className="font-sora text-[12px] text-fg/20 tracking-wide">
          Widget loading…
        </p>
      )}
    </div>
  );
}
