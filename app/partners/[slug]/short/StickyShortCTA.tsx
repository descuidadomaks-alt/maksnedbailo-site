"use client";

import { useState, useEffect } from "react";
import type { ShortPartnerConfig } from "@/content/partners/index";
import type { ShortPageDict } from "../lib/i18n";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
    clarity?: (method: string, key: string, value?: string) => void;
  }
}

function track(event: string, props: Record<string, string>) {
  window.plausible?.(event, { props });
  window.clarity?.("set", event, Object.values(props).join(" | "));
}

export default function StickyShortCTA({
  config,
  d,
}: {
  config: ShortPartnerConfig;
  d: ShortPageDict;
}) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const ctas = Array.from(document.querySelectorAll<HTMLElement>("[data-primary-cta]"));
    if (ctas.length === 0) {
      const onScroll = () => setShow(window.scrollY > 400);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const visible = new Set<Element>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)
        );
        setShow(visible.size === 0);
      },
      { threshold: 0.3 }
    );
    ctas.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  if (!show || dismissed) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{ padding: "0 16px 16px", paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
    >
      <div
        className="flex items-center gap-2.5 rounded-2xl p-2.5"
        style={{
          background: "rgba(6,6,8,0.97)",
          border: "1px solid rgba(212,255,43,0.2)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
        }}
      >
        <a
          href={config.schedulerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-accent text-bg font-sora font-semibold rounded-xl active:scale-[0.98] transition-transform duration-150"
          style={{ fontSize: "14px", padding: "14px 16px", letterSpacing: "-0.01em", minHeight: "52px" }}
          onClick={() => track("cta_book_click", { slug: config.slug, location: "sticky_short" })}
        >
          {d.hero.cta}
          <span aria-hidden>→</span>
        </a>
        <button
          onClick={() => {
            setDismissed(true);
            track("sticky_cta_dismissed", { slug: config.slug });
          }}
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl"
          style={{ color: "rgba(240,236,230,0.22)" }}
          aria-label="Dismiss"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
