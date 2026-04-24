"use client";

import { useEffect, useRef } from "react";
import type { ProspectData } from "../data";

export default function ConnectoWidget({ data }: { data: ProspectData }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Inject the external widget script via DOM — dangerouslySetInnerHTML on
  // Next.js <Script> only works for *inline* JS; external src= scripts must
  // be created imperatively so the browser fetches and executes them.
  useEffect(() => {
    if (!data.connectoWidgetScript) return;

    const SCRIPT_ID = "connecto-widget-script";
    if (document.getElementById(SCRIPT_ID)) return; // already injected

    // Parse the stored HTML to extract src + data-* attributes
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.connectoWidgetScript, "text/html");
    const template = doc.querySelector("script");
    if (!template) return;

    const el = document.createElement("script");
    el.id = SCRIPT_ID;

    // Copy src and every attribute (data-widget-key, data-title, etc.)
    Array.from(template.attributes).forEach((attr) => {
      el.setAttribute(attr.name, attr.value);
    });

    document.body.appendChild(el);

    // Inject dark-theme overrides for widget inputs.
    // We use a MutationObserver so the styles apply the moment Connecto
    // renders its DOM — before the user sees any flash of white.
    const STYLE_ID = "connecto-widget-overrides";
    const css = `
      /* ── Connecto widget — fix invisible text in inputs ────────────── */
      /* Keep the widget's own white background; only force the text dark  */
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

    const applyStyles = () => {
      if (document.getElementById(STYLE_ID)) return;
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = css;
      document.head.appendChild(style);
    };

    // Apply immediately in case widget already rendered
    applyStyles();

    // Also watch for lazy-rendered widget markup
    const styleObserver = new MutationObserver(applyStyles);
    styleObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      styleObserver.disconnect();
      document.getElementById(SCRIPT_ID)?.remove();
      document.getElementById(STYLE_ID)?.remove();
    };
  }, [data.connectoWidgetScript]);

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
  );
}
