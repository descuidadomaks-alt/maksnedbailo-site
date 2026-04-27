"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import type { ProspectData } from "../data";

export default function ConnectoWidget({ data }: { data: ProspectData }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fix invisible typed text — Connecto's default input text colour is too
  // light on its white background. Inject once; MutationObserver catches
  // lazy-rendered markup.
  useEffect(() => {
    const STYLE_ID = "connecto-widget-overrides";
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      [class*="connecto"] input,
      [id*="connecto"] input,
      [class*="Connecto"] input,
      [data-widget-key] input,
      input[placeholder*="message" i],
      input[placeholder*="name" i],
      input[placeholder*="your" i] {
        color: #1a1805 !important;
        caret-color: #1a1805 !important;
      }
      [class*="connecto"] input::placeholder,
      [id*="connecto"] input::placeholder,
      input[placeholder*="message" i]::placeholder,
      input[placeholder*="name" i]::placeholder {
        color: rgba(26, 24, 5, 0.38) !important;
      }
    `;
    document.head.appendChild(style);

    const obs = new MutationObserver(() => {
      if (document.getElementById(STYLE_ID)) obs.disconnect();
    });
    obs.observe(document.head, { childList: true });

    return () => {
      obs.disconnect();
      document.getElementById(STYLE_ID)?.remove();
    };
  }, []);

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

  if (data.slotExpired) return null;

  const w = data.connectoWidget;

  return (
    <>
      {/* Scroll anchor + "loading" placeholder while script hasn't arrived */}
      <div
        ref={containerRef}
        id="connecto-widget-container"
        className="section-divider py-8 flex items-center justify-center min-h-[80px]"
      >
        {!w && (
          <p className="font-sora text-[12px] text-fg/20 tracking-wide">
            Widget loading…
          </p>
        )}
      </div>

      {/* Next.js Script with strategy="afterInteractive" ≡ before </body> */}
      {w && (
        <Script
          src={w.src}
          data-widget-key={w.widgetKey}
          data-api-url={w.apiUrl}
          data-title={w.title}
          data-subtitle={w.subtitle}
          data-colour={w.colour}
          data-position={w.position}
          data-language={w.language}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
