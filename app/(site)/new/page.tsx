/**
 * /new — staging copy of the homepage.
 * Changes vs live home:
 *   1. `data-short-page` on <main> → partner-page Cyrillic-safe font stack
 *   2. Bridge section inserted after Hero (before TheShift)
 *   3. TheSolutionNew replaces TheSolution (updated 500+/34 trust line)
 *
 * The live home (app/(site)/page.tsx) is NOT modified.
 * Swap manually: rename this file to page.tsx when ready to go live.
 */
"use client";

import { useLang } from "@/lib/LanguageContext";
import Hero from "@/components/Hero";
import GotAProblem from "@/components/GotAProblem";
import TheShift from "@/components/TheShift";
import TheProblem from "@/components/TheProblem";
import TheSolutionNew from "./components/TheSolutionNew";
import Proof from "@/components/Proof";
import BotInAction from "@/components/BotInAction";
import TheOffer from "@/components/TheOffer";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// ─── Bridge section copy ────────────────────────────────────────────────────

const BRIDGE = {
  eyebrow: {
    en: "Different problem?",
    es: "¿Otro problema?",
  },
  headline: {
    en: "Not sure a chatbot is even what you need?",
    es: "¿No estás seguro de que un chatbot sea lo que necesitas?",
  },
  body: {
    en: "Most businesses don't have a chatbot problem. They have a \"nobody's mapped where the money actually leaks\" problem. Before you automate anything, see the whole picture — every AI opportunity in your business, ranked by ROI, in 90 minutes.",
    es: 'La mayoría de los negocios no tienen un problema de chatbot. Tienen un problema de "nadie ha mapeado por dónde se escapa el dinero". Antes de automatizar nada, ve el panorama completo: cada oportunidad de IA en tu negocio, priorizada por ROI, en 90 minutos.',
  },
  cta: {
    en: "Get your Strategic AI Map →",
    es: "Consigue tu Mapa Estratégico de IA →",
  },
};

function t(obj: { en: string; es: string }, lang: string): string {
  return lang === "es" ? obj.es : obj.en;
}

function AiMapBridge() {
  const { lang } = useLang();
  return (
    <section
      className="section-divider"
      style={{
        background: "linear-gradient(135deg, rgba(212,255,43,0.04) 0%, rgba(212,255,43,0.01) 100%)",
        borderTop: "1px solid rgba(212,255,43,0.12)",
        borderBottom: "1px solid rgba(212,255,43,0.12)",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-14 md:py-18">
        {/* Eyebrow */}
        <p
          className="font-sora font-semibold text-accent uppercase mb-3"
          style={{ fontSize: "11px", letterSpacing: "2.5px" }}
        >
          {t(BRIDGE.eyebrow, lang)}
        </p>
        {/* Headline */}
        <h2
          className="font-playfair font-normal text-fg mb-5"
          style={{ fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
        >
          {t(BRIDGE.headline, lang)}
        </h2>
        {/* Body */}
        <p
          className="font-sora font-light text-fg/55 leading-[1.85] mb-8"
          style={{ fontSize: "15px", maxWidth: "58ch" }}
        >
          {t(BRIDGE.body, lang)}
        </p>
        {/* CTA */}
        <a
          href="/ai-map"
          className="inline-flex items-center gap-2 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(212,255,43,0.22)]"
          style={{ fontSize: "15px", padding: "16px 32px", letterSpacing: "-0.01em" }}
        >
          {t(BRIDGE.cta, lang)}
        </a>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function NewHomePage() {
  return (
    <>
      {/* data-short-page activates the partner-page Cyrillic-safe font stack
          (Roboto Mono for headings/labels, IBM Plex Sans for body/numerals).
          Scoped to this page only — does not affect the live homepage. */}
      <main data-short-page>
        <Hero />
        {/* Bridge section — inserted between Hero and TheShift (Phase 2.3) */}
        <AiMapBridge />
        <TheShift />
        <TheProblem />
        {/* TheSolutionNew — identical to TheSolution but with updated trust line */}
        <TheSolutionNew />
        <Proof />
        <BotInAction />
        <TheOffer />
        <FAQ />
        <GotAProblem />
        <CTASection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
