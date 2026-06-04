"use client";

import { useRef, useState, useEffect } from "react";
import type { DirectPageDict } from "../lib/directi18n";
import { PHASE1_ANCHOR } from "../lib/config";

/**
 * The offer section — what the map is, value framing, and the full sample table.
 * Sample table inlined from the polished short-page component (same grid, same fonts).
 */

const SCROLL_HINT_KEY = "direct_map_scroll_hinted";
const COL_TEMPLATE = "2.5fr 1fr 1.2fr 0.7fr";

const SAMPLE_PILLARS_BASE = [
  { cost: "€2,400/mo", feasibility: 5, rank: 1 },
  { cost: "8 hrs/wk",  feasibility: 4, rank: 3 },
  { cost: "6 hrs/wk",  feasibility: 5, rank: 2 },
  { cost: "3 hrs/wk",  feasibility: 4, rank: 5 },
  { cost: "€900/mo",   feasibility: 5, rank: 3 },
  { cost: "4 hrs/wk",  feasibility: 4, rank: 4 },
];

const PILLAR_PAINS_EN = [
  ["Lead response delay (>4h avg)", "Manual booking follow-up"],
  ["Knowledge lives in founder's head", "Meeting notes + action tracking"],
  ["Invoice & document processing", "Weekly reporting to stakeholders"],
];
const PILLAR_PAINS_UK = [
  ["Затримка відповіді на ліди (>4 год)", "Ручне ведення нагадувань про бронювання"],
  ["Знання зосереджені в голові засновника", "Нотатки з нарад та відстеження задач"],
  ["Обробка рахунків та документів", "Щотижнева звітність для стейкхолдерів"],
];

function FeasibilityDots({ score }: { score: number }) {
  return (
    <span className="flex gap-0.5 items-center">
      {[1,2,3,4,5].map((d) => (
        <span key={d} className="inline-block rounded-full" style={{ width:"5px", height:"5px", background: d<=score ? "rgba(212,255,43,0.75)" : "rgba(240,236,230,0.08)" }} />
      ))}
    </span>
  );
}

// ES pillar pains (3.9 — added for Spanish locale)
const PILLAR_PAINS_ES = [
  ["Retraso en respuesta a leads (>4h)", "Seguimiento manual de reservas"],
  ["El conocimiento vive en la cabeza del fundador", "Notas de reuniones y seguimiento de acciones"],
  ["Procesamiento de facturas y documentos", "Informes semanales a stakeholders"],
];

export default function DirectOffer({ d, locale }: { d: DirectPageDict; locale: "en" | "es" | "uk" }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (typeof localStorage !== "undefined" && !localStorage.getItem(SCROLL_HINT_KEY)) setShowHint(true);
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.scrollLeft > 10) { setShowHint(false); if (typeof localStorage !== "undefined") localStorage.setItem(SCROLL_HINT_KEY, "1"); el.removeEventListener("scroll", onScroll); }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const pains = locale === "uk" ? PILLAR_PAINS_UK : locale === "es" ? PILLAR_PAINS_ES : PILLAR_PAINS_EN;
  const sm = {
    docTitle: locale === "uk" ? "Стратегічна карта ШІ" : "Strategic AI Map",
    clientLabel: locale === "uk" ? "[Назва вашого бізнесу]" : "[Client Business Name]",
    sessionLabel: locale === "uk" ? "РЕЗУЛЬТАТ 90-ХВ. СЕСІЇ" : "90-MIN SESSION OUTPUT",
    studioName: "care less AI automation",
    colPain: locale === "uk" ? "Проблема" : "Problem",
    colLosingNow: locale === "uk" ? "Втрачаєте зараз" : "Losing Now",
    colFeasibility: locale === "uk" ? "Здійсненність ШІ" : "AI Feasibility",
    colPriority: locale === "uk" ? "Пріоритет" : "Priority",
    phase1Heading: locale === "uk" ? "Рекомендований перший етап" : "Phase 1 Recommended Build",
    phase1Rec: locale === "uk" ? "#1 — Система реагування на ліди · WhatsApp + сайт · цілодобово" : "#1 — AI Lead Response System · WhatsApp + website · 24/7",
    phase1Timeline: locale === "uk" ? "2–3 тижні" : "2–3 weeks",
    phase1IfProceed: locale === "uk" ? "якщо вирішите впроваджувати" : "if you proceed",
    pillarLabels: locale === "uk"
      ? ["Комунікація з клієнтами", "Внутрішні знання та операції", "Повторювані процеси"]
      : ["Customer-Facing Communication", "Internal Knowledge & Ops", "Repeatable Execution"],
    pillarPrefix: (n: number, label: string) => locale === "uk" ? `Напрям ${n} — ${label}` : `Pillar ${n} — ${label}`,
    note: locale === "uk" ? "Приклад результату — ваша карта буде специфічною під ваш бізнес" : "Sample output — yours will be specific to your business",
    bleedLabel: locale === "uk" ? "Приклад" : "Example",
    bleedStat: "~€6,000/mo",
    bleedAnnual: locale === "uk" ? "(€72k/рік)" : "(€72k/yr)",
    bleedDesc: locale === "uk"
      ? `Цей бізнес втрачає ~€6,000/міс (~€72k/рік) — прямі витрати плюс згаяний час (~21 год/тиждень). Перший етап б'є по найбільшому витоку (#1 — затримка відповіді на ліди, ~€2,400/міс): ${PHASE1_ANCHOR} одноразово. Окупність на цей крок — ~2 місяці. Далі економія лише зростає.`
      : `This business leaks ~€6,000/mo (~€72k/yr) — direct costs plus wasted time (~21 hrs/wk). Phase 1 hits the biggest leak first (#1 — lead-response delay, ~€2,400/mo): ${PHASE1_ANCHOR} one-time. Pays for itself in under 2 months — and the savings compound.`,
    bleedPhase1Label: locale === "uk" ? "Перший етап" : "Phase 1",
    bleedPayback: locale === "uk" ? "~2 міс. окупність" : "Under 2 months",
  };

  const pillars = sm.pillarLabels.map((label, pi) => ({
    label,
    items: [
      { pain: pains[pi][0], ...SAMPLE_PILLARS_BASE[pi * 2] },
      { pain: pains[pi][1], ...SAMPLE_PILLARS_BASE[pi * 2 + 1] },
    ],
  }));

  return (
    <section className="section-divider py-14 md:py-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* Section intro */}
        <p data-reveal className="font-label text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.offer.label}
        </p>
        <h2 data-reveal className="font-playfair font-normal text-fg mb-4" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "52ch" }}>
          {d.offer.headline}
        </h2>
        <p data-reveal className="font-sora font-light text-fg/55 italic mb-8" style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.55, maxWidth: "60ch" }}>
          {d.offer.subhead}
        </p>
        <p data-reveal className="font-sora font-light text-fg/55 leading-[1.85] mb-10" style={{ fontSize: "15px", maxWidth: "62ch" }}>
          {d.offer.body}
        </p>

        {/* Value + price side by side */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start mb-14">
          <div>
            <p className="font-label text-fg/28 mb-4" style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
              {d.offer.valueLabel}
            </p>
            <ul className="flex flex-col gap-4">
              {[d.offer.del1, d.offer.del2, d.offer.del3].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="font-numeral shrink-0 text-accent" style={{ fontSize: "22px", fontWeight: 700, lineHeight: 1.3 }} aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sora font-light text-fg/60 leading-[1.65]" style={{ fontSize: "14px", paddingTop: "2px" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price block — COMPLIMENTARY phase (active until June 15)
               PAID phase block is commented out below for easy restore */}
          <div
            className="rounded-2xl p-6 text-right"
            style={{ background: "rgba(212,255,43,0.06)", border: "1px solid rgba(212,255,43,0.18)", minWidth: "220px" }}
          >
            {/* Anchor — show "Normally €1,500" so value is established */}
            <p className="font-label text-fg/30 mb-2" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
              {d.offer.anchorLabel}
            </p>
            <p className="font-numeral text-fg/25 line-through mb-4" style={{ fontSize: "22px", fontWeight: 600, lineHeight: 1 }}>
              {d.offer.anchorValue}
            </p>
            {/* Complimentary label */}
            <p className="font-label text-accent/65 mb-1" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
              {d.offer.compPriceLabel}
            </p>
            <p className="font-sora font-bold text-accent" style={{ fontSize: "28px", lineHeight: 1 }}>
              {d.offer.compPriceValue}
            </p>
            <p className="font-sora font-light text-fg/45 mt-3" style={{ fontSize: "11px", lineHeight: 1.65, maxWidth: "24ch", marginLeft: "auto" }}>
              {d.offer.compJustify}
            </p>
          </div>
          {/* PAID phase price block — restore after June 15:
          <div className="rounded-2xl p-6 text-right" style={{...}}>
            <p>{d.offer.anchorLabel}</p>
            <p className="line-through">{d.offer.anchorValue}</p>
            <p>{d.offer.currentPriceLabel}</p>
            <p className="text-accent font-bold text-[36px]">{d.offer.currentPriceValue}</p>
            <p>{d.offer.creditNote}</p>
          </div> */}
        </div>

        {/* Full sample map table */}
        <div data-reveal>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <p className="font-label text-fg/30 uppercase" style={{ fontSize: "10px", letterSpacing: "3px" }}>{sm.docTitle}</p>
            {showHint && <p className="md:hidden font-sora text-fg/22 italic" style={{ fontSize: "10px" }}>← swipe →</p>}
          </div>

          <div className="w-full rounded-2xl border border-white/[0.08] overflow-hidden" style={{ background: "rgba(255,255,255,0.016)", boxShadow: "0 12px 48px rgba(0,0,0,0.36), 0 0 0 1px rgba(212,255,43,0.05)" }}>
            {/* Doc header */}
            <div className="px-6 py-4 border-b border-white/[0.06]" style={{ background: "rgba(212,255,43,0.055)" }}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="font-label text-accent/65" style={{ fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase" }}>{sm.docTitle}</p>
                  <p className="font-label text-fg font-medium mt-0.5" style={{ fontSize: "15px" }}>{sm.clientLabel}</p>
                </div>
                <div className="text-right">
                  <p className="font-label text-fg/22 uppercase" style={{ fontSize: "9px", letterSpacing: "1.5px" }}>{sm.sessionLabel}</p>
                  <p className="font-sora text-fg/35" style={{ fontSize: "9px" }}>{sm.studioName}</p>
                </div>
              </div>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block">
              <div className="grid px-6 py-2.5 border-b border-white/[0.04]" style={{ gridTemplateColumns: COL_TEMPLATE }}>
                {[sm.colPain, sm.colLosingNow, sm.colFeasibility, sm.colPriority].map((h) => (
                  <span key={h} className="font-label text-fg/38" style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase" }}>{h}</span>
                ))}
              </div>
              {pillars.map((pillar, pi) => (
                <div key={pi} className={pi < pillars.length - 1 ? "border-b border-white/[0.05]" : ""}>
                  <div className="px-6 py-2" style={{ background: "rgba(255,255,255,0.01)" }}>
                    <span className="font-label text-accent/55" style={{ fontSize: "9px", letterSpacing: "1.8px", textTransform: "uppercase" }}>{sm.pillarPrefix(pi + 1, pillar.label)}</span>
                  </div>
                  {pillar.items.map((item, ii) => (
                    <div key={ii} className="grid px-6 py-3 border-t border-white/[0.03] hover:bg-white/[0.015] transition-colors duration-150 items-center" style={{ gridTemplateColumns: COL_TEMPLATE, gap: "0.75rem" }}>
                      <p className="font-sora font-light text-fg/62" style={{ fontSize: "12px" }}>{item.pain}</p>
                      <p className="font-numeral text-fg/55" style={{ fontSize: "12px" }}>{item.cost}</p>
                      <FeasibilityDots score={item.feasibility} />
                      <p className="font-numeral text-fg/38 text-right" style={{ fontSize: "12px" }}>#{item.rank}</p>
                    </div>
                  ))}
                </div>
              ))}
              <div className="px-6 py-4" style={{ background: "rgba(212,255,43,0.065)", borderTop: "1px solid rgba(212,255,43,0.16)" }}>
                <p className="font-label text-accent/65 mb-2" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>{sm.phase1Heading}</p>
                <div className="flex items-start justify-between gap-4">
                  <p className="font-sora font-light text-fg/62 flex-1" style={{ fontSize: "12px" }}>{sm.phase1Rec}</p>
                  <div className="text-right shrink-0">
                    <p className="font-sora text-fg/35" style={{ fontSize: "10px" }}>{sm.phase1Timeline}</p>
                    <p className="font-numeral font-bold text-accent" style={{ fontSize: "17px", lineHeight: 1.2 }}>{PHASE1_ANCHOR}</p>
                    <p className="font-sora text-fg/22" style={{ fontSize: "9px" }}>{sm.phase1IfProceed}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile card reflow */}
            <div className="md:hidden">
              {pillars.map((pillar, pi) => (
                <div key={pi} className={pi < pillars.length - 1 ? "border-b border-white/[0.06]" : ""}>
                  <div className="px-5 py-2.5" style={{ background: "rgba(255,255,255,0.01)" }}>
                    <span className="font-label text-accent/55" style={{ fontSize: "9px", letterSpacing: "1.8px", textTransform: "uppercase" }}>{sm.pillarPrefix(pi + 1, pillar.label)}</span>
                  </div>
                  {pillar.items.map((item, ii) => (
                    <div key={ii} className="border-t border-white/[0.03] px-5 py-4">
                      <p className="font-sora font-light text-fg/65 mb-2.5 leading-[1.5]" style={{ fontSize: "13px" }}>{item.pain}</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="font-numeral text-fg/50" style={{ fontSize: "12px" }}>{item.cost}</span>
                        <FeasibilityDots score={item.feasibility} />
                        <span className="font-numeral text-fg/35" style={{ fontSize: "11px" }}>#{item.rank}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div className="px-5 py-4" style={{ background: "rgba(212,255,43,0.065)", borderTop: "1px solid rgba(212,255,43,0.16)" }}>
                <p className="font-label text-accent/65 mb-2" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>{sm.phase1Heading}</p>
                <p className="font-sora font-light text-fg/62 mb-3" style={{ fontSize: "12px" }}>{sm.phase1Rec}</p>
                <div className="flex items-center justify-between">
                  <span className="font-sora text-fg/35" style={{ fontSize: "11px" }}>{sm.phase1Timeline}</span>
                  <div className="text-right">
                    <span className="font-numeral font-bold text-accent" style={{ fontSize: "16px" }}>{PHASE1_ANCHOR}</span>
                    <p className="font-sora text-fg/22" style={{ fontSize: "9px" }}>{sm.phase1IfProceed}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost-of-inaction summary */}
          <div className="mt-4 rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: "rgba(255,255,255,0.012)" }}>
            <div className="px-6 py-5 flex flex-col sm:flex-row gap-5 sm:items-center">
              <div className="shrink-0">
                <p className="font-label text-fg/22 uppercase mb-1" style={{ fontSize: "9px", letterSpacing: "2px" }}>{sm.bleedLabel}</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-numeral font-bold text-fg/55" style={{ fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1 }}>{sm.bleedStat}</span>
                  <span className="font-sora text-fg/28" style={{ fontSize: "12px" }}>{sm.bleedAnnual}</span>
                </div>
              </div>
              <div className="hidden sm:block w-px self-stretch bg-white/[0.06]" aria-hidden />
              <div className="shrink-0">
                <p className="font-label text-accent/50 uppercase mb-1" style={{ fontSize: "9px", letterSpacing: "2px" }}>{sm.bleedPhase1Label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-numeral font-bold text-accent" style={{ fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1 }}>{PHASE1_ANCHOR}</span>
                  <span className="font-sora text-accent/55" style={{ fontSize: "12px" }}>{sm.bleedPayback}</span>
                </div>
              </div>
              <p className="font-sora font-light text-fg/38 leading-[1.75]" style={{ fontSize: "13px" }}>{sm.bleedDesc}</p>
            </div>
          </div>
          <p className="font-sora text-fg/[0.14] mt-4 text-center italic" style={{ fontSize: "10px" }}>{sm.note}</p>
        </div>

      </div>
    </section>
  );
}
