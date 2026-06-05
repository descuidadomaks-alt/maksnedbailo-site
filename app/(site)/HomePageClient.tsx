"use client";
/**
 * Client component for the homepage.
 * page.tsx (server) exports metadata and renders this component.
 */

import { useLang } from "@/lib/LanguageContext";
import Hero from "@/components/Hero";
import GotAProblemNew from "@/components/GotAProblemNew";
import TheShift from "@/components/TheShift";
import TheProblem from "@/components/TheProblem";
import TheSolutionNew from "@/app/new/components/TheSolutionNew";
import Proof from "@/components/Proof";
import BotInAction from "@/components/BotInAction";
import TheOffer from "@/components/TheOffer";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import VoidSection from "@/components/VoidSection";

const BRIDGE = {
  eyebrow: { en: "Different problem?", es: "¿Otro problema?" },
  headline: {
    en: "Not sure a chatbot is even what you need?",
    es: "¿No estás seguro de que un chatbot sea lo que necesitas?",
  },
  body: {
    en: "Most businesses don't have a chatbot problem. They have a \"nobody's mapped where the money actually leaks\" problem. Before you automate anything, see the whole picture — every AI opportunity in your business, ranked by ROI, in 90 minutes.",
    es: 'La mayoría de los negocios no tienen un problema de chatbot. Tienen un problema de "nadie ha mapeado por dónde se escapa el dinero". Antes de automatizar nada, ve el panorama completo: cada oportunidad de IA en tu negocio, priorizada por ROI, en 90 minutos.',
  },
  cta: { en: "Map my operation →", es: "Mapear mi operación →" },
};

function t(obj: { en: string; es: string }, lang: string): string {
  return lang === "es" ? obj.es : obj.en;
}

function AiMapBridge() {
  const { lang } = useLang();
  return (
    <VoidSection className="section-divider">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
        <p className="font-sora font-semibold text-accent uppercase mb-4" style={{ fontSize: "11px", letterSpacing: "2.5px" }}>
          {t(BRIDGE.eyebrow, lang)}
        </p>
        <h2 className="font-playfair font-normal text-fg mb-6" style={{ fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: "22ch" }}>
          {t(BRIDGE.headline, lang)}
        </h2>
        <p className="font-sora font-light text-fg/55 leading-[1.85] mb-10" style={{ fontSize: "15px", maxWidth: "52ch" }}>
          {t(BRIDGE.body, lang)}
        </p>
        <a
          href={lang !== "en" ? `/ai-map?lang=${lang}` : "/ai-map"}
          className="inline-flex items-center gap-2 font-sora font-semibold rounded-xl transition-all duration-200"
          style={{ fontSize: "15px", padding: "15px 32px", letterSpacing: "-0.01em", color: "var(--accent)", border: "1.5px solid var(--accent)", background: "transparent", opacity: 0.85 }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "1"; el.style.background = "rgba(212,255,43,0.08)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "0.85"; el.style.background = "transparent"; }}
        >
          {t(BRIDGE.cta, lang)}
        </a>
      </div>
    </VoidSection>
  );
}

export default function HomePageClient() {
  return (
    <>
      <main data-short-page>
        <Hero />
        <AiMapBridge />
        <TheShift />
        <TheProblem />
        <TheSolutionNew />
        <Proof />
        <BotInAction />
        <TheOffer />
        <FAQ />
        <GotAProblemNew />
        <CTASection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
