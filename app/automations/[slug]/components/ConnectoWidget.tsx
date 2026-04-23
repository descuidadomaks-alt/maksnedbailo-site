"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import type { ProspectData } from "../data";

export default function ConnectoWidget({ data }: { data: ProspectData }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fire widget_visible event when the container scrolls into view
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

  if (data.slotExpired) return null;

  return (
    <>
      <div
        ref={containerRef}
        id="connecto-widget-container"
        className="section-divider py-8 flex items-center justify-center min-h-[80px]"
      >
        {!data.connectoWidgetScript && (
          <p className="font-sora text-[12px] text-fg/20 tracking-wide">
            Widget loading…
          </p>
        )}
      </div>
      {data.connectoWidgetScript && (
        <Script
          id="connecto-widget-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: data.connectoWidgetScript }}
        />
      )}
    </>
  );
}
