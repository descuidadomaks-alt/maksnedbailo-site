"use client";

import { useState, useRef, useEffect } from "react";
import type { DirectPageDict } from "../lib/directi18n";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

const SCROLL_HINT_KEY = "direct_industry_scroll_hinted";
type TabId = "manufacturing" | "professionalServices" | "ecommerce" | "investorOperators";

function ResultCell({ html }: { html: string }) {
  return (
    <p className="font-sora leading-[1.6]" style={{ fontSize: "13px", color: "rgba(212,255,43,0.82)", fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export default function DirectIndustry({ d }: { d: DirectPageDict }) {
  const [active, setActive] = useState<TabId>("professionalServices");
  const [showHint, setShowHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined" && !localStorage.getItem(SCROLL_HINT_KEY)) setShowHint(true);
  }, []);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.scrollLeft > 10) { setShowHint(false); if (typeof localStorage !== "undefined") localStorage.setItem(SCROLL_HINT_KEY, "1"); window.plausible?.("mobile_table_scroll", { props: { table: "direct_industry" } }); el.removeEventListener("scroll", onScroll); }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const tabs = d.industry.tabs;
  const tabList: { id: TabId; label: string }[] = [
    { id: "manufacturing", label: tabs.manufacturing.label },
    { id: "professionalServices", label: tabs.professionalServices.label },
    { id: "ecommerce", label: tabs.ecommerce.label },
    { id: "investorOperators", label: tabs.investorOperators.label },
  ];
  const rows = tabs[active].rows;

  return (
    <section className="section-divider py-14 md:py-20">
      <div className="max-w-5xl mx-auto px-6">

        <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>{d.industry.label}</p>
        <h2 data-reveal className="font-playfair font-normal text-fg mb-4" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}>{d.industry.headline}</h2>
        <p data-reveal className="font-sora font-light text-fg/35 mb-8" style={{ fontSize: "14px", lineHeight: 1.7, maxWidth: "60ch" }}>{d.industry.sub}</p>

        <div data-reveal className="flex flex-wrap gap-2 mb-6">
          {tabList.map((t) => (
            <button key={t.id} onClick={() => setActive(t.id)} className="font-sora transition-all duration-200 rounded-full px-4 py-2" style={{ fontSize: "11px", letterSpacing: "1.2px", textTransform: "uppercase", background: active === t.id ? "rgba(212,255,43,0.11)" : "rgba(255,255,255,0.04)", border: active === t.id ? "1px solid rgba(212,255,43,0.32)" : "1px solid rgba(255,255,255,0.07)", color: active === t.id ? "rgba(212,255,43,0.82)" : "rgba(240,236,230,0.32)" }}>
              {t.label}
            </button>
          ))}
        </div>

        {showHint && <p className="md:hidden font-sora text-fg/20 mb-2 text-right italic" style={{ fontSize: "10px" }}>{d.industry.swipeHint}</p>}

        <div data-reveal className="relative w-full rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: "rgba(255,255,255,0.012)" }}>
          <div className="md:hidden pointer-events-none absolute top-0 right-0 bottom-0 z-10" style={{ width: "48px", background: "linear-gradient(to right, transparent, rgba(6,6,8,0.92))" }} aria-hidden />
          <div ref={scrollRef} className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
            <div style={{ minWidth: "580px" }}>
              {/* Column widths: use-case 1.1fr | pain 1fr | result 1.4fr
                  Result gets more room — it contains the longer "Typical result" copy.
                  gap-3 (not gap-4) to reduce excess whitespace between Pain and Result. */}
              <div className="grid px-6 py-3 border-b border-white/[0.05] gap-3" style={{ gridTemplateColumns: "1.1fr 1fr 1.4fr" }}>
                {[d.industry.colUseCase, d.industry.colPain, d.industry.colResult].map((h) => (
                  <span key={h} className="font-sora text-fg/45" style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase" }}>{h}</span>
                ))}
              </div>
              {rows.map(([useCase, pain, result], i) => (
                <div key={i} className="grid px-6 py-5 border-t border-white/[0.04] hover:bg-white/[0.016] transition-colors duration-150 items-start gap-3" style={{ gridTemplateColumns: "1.1fr 1fr 1.4fr" }}>
                  <p className="font-sora text-fg/80 leading-[1.5]" style={{ fontSize: "14px", fontWeight: 500 }}>{useCase}</p>
                  <p className="font-sora font-light text-fg/48 leading-[1.6]" style={{ fontSize: "13px", fontStyle: "italic" }}>{pain}</p>
                  <ResultCell html={result} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <p data-reveal className="font-sora font-light text-fg/[0.14] mt-5 text-center leading-relaxed" style={{ fontSize: "10px" }}>{d.industry.sources}</p>

      </div>
    </section>
  );
}
