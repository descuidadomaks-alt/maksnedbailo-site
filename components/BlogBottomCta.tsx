"use client";

import { useLang } from "@/lib/LanguageContext";
import { BOOKING_LINK } from "@/lib/content";

const COPY = {
  en: {
    question: "Want to see if this applies to your business?",
    cta: "Book a Free Audit →",
  },
  es: {
    question: "¿Quieres ver si esto aplica a tu negocio?",
    cta: "Auditoría Gratuita →",
  },
};

export default function BlogBottomCta() {
  const { lang } = useLang();
  const d = COPY[lang];

  return (
    <section className="border-t border-white/[0.04] py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="font-playfair text-2xl font-normal text-fg/70 mb-6">
          {d.question}
        </p>
        <a
          href={BOOKING_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent text-bg font-bold px-8 py-4 rounded-lg text-sm hover:bg-accent/90 transition-all duration-200"
        >
          {d.cta}
        </a>
      </div>
    </section>
  );
}
