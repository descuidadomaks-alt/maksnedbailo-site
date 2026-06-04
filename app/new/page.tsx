/**
 * /new — staging copy of the homepage.
 *
 * Changes vs live home (app/(site)/page.tsx):
 *   1. data-short-page on <main> → partner-page Cyrillic-safe font stack
 *   2. Bridge section (VoidSection) inserted after Hero, before TheShift
 *   3. TheSolutionNew replaces TheSolution (updated 500+/34 trust line)
 *   4. GotAProblemNew replaces GotAProblem (bottom CTA → /ai-map)
 *
 * Live homepage is NOT modified. Swap manually by renaming this file when ready.
 */
"use client";

import { useLang } from "@/lib/LanguageContext";
import Hero from "@/components/Hero";
import GotAProblemNew from "@/components/GotAProblemNew";
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
import VoidSection from "@/components/VoidSection";

// ─── Bridge section content ─────────────────────────────────────────────────

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
  // 3.1 — CTA updated to "Map my operation →" per spec
  cta: {
    en: "Map my operation →",
    es: "Mapear mi operación →",
  },
};

function t(obj: { en: string; es: string }, lang: string): string {
  return lang === "es" ? obj.es : obj.en;
}

function AiMapBridge() {
  const { lang } = useLang();
  return (
    // VoidSection provides the pure-black background + parallax dots.
    // All text is center-aligned per spec. Hard-cut edges (no border-radius / gradient).
    <VoidSection className="section-divider">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <p
          className="font-sora font-semibold text-accent uppercase mb-4"
          style={{ fontSize: "11px", letterSpacing: "2.5px" }}
        >
          {t(BRIDGE.eyebrow, lang)}
        </p>
        {/* Headline */}
        <h2
          className="font-playfair font-normal text-fg mb-6"
          style={{ fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: "22ch" }}
        >
          {t(BRIDGE.headline, lang)}
        </h2>
        {/* Body */}
        <p
          className="font-sora font-light text-fg/55 leading-[1.85] mb-10"
          style={{ fontSize: "15px", maxWidth: "52ch" }}
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
    </VoidSection>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function NewHomePage() {
  return (
    <>
      {/*
       * data-short-page activates the Cyrillic-safe font stack (Roboto Mono headings,
       * IBM Plex Sans body) scoped to this page only. See globals.css [data-short-page].
       */}
      <main data-short-page>
        <Hero />
        {/* Bridge section — void background, parallax dots, center-aligned */}
        <AiMapBridge />
        <TheShift />
        <TheProblem />
        {/* TheSolutionNew — same as TheSolution but with updated 500+/34 trust line */}
        <TheSolutionNew />
        <Proof />
        <BotInAction />
        <TheOffer />
        <FAQ />
        {/* GotAProblemNew — same as GotAProblem but bottom CTA → /ai-map */}
        <GotAProblemNew />
        <CTASection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
