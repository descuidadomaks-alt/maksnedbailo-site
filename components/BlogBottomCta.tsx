"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";

const COPY = {
  en: {
    question: "Want to see how this would work for your business?",
    cta: "Get your free AI Map",
  },
  es: {
    question: "¿Quieres ver cómo funcionaría en tu negocio?",
    cta: "Consigue tu AI Map gratis",
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
        <Link
          href="/ai-map"
          className="inline-block bg-accent text-bg font-bold px-8 py-4 rounded-lg text-sm hover:bg-accent/90 transition-all duration-200"
        >
          {d.cta}
        </Link>
      </div>
    </section>
  );
}
