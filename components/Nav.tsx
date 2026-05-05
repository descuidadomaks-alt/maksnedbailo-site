"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { content, t } from "@/lib/content";

const BAR_HEIGHT = 28;

const GLASS: React.CSSProperties = {
  background: "rgba(12, 12, 14, 0.72)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "999px",
  boxShadow:
    "0 4px 24px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.05)",
};

const CTA_PILL: React.CSSProperties = {
  background: "#D4FF2B",
  borderRadius: "999px",
  boxShadow: "0 4px 16px rgba(212,255,43,0.22)",
};

export default function Nav() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > BAR_HEIGHT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const topOffset = scrolled ? 8 : BAR_HEIGHT + 8;

  return (
    <motion.header
      className="fixed left-0 right-0 z-50 pointer-events-none"
      animate={{ top: topOffset }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ top: topOffset }}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 flex items-center justify-between gap-2">

        {/* ── Logo island ── */}
        <Link
          href="/"
          className="pointer-events-auto flex items-center px-4 py-2.5"
          style={GLASS}
          aria-label="careless home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="careless"
            className="w-auto"
            style={{ height: "22px" }}
          />
        </Link>

        {/* ── Right islands ── */}
        <div className="flex items-center gap-2 pointer-events-auto">

          {/* Blog island — hidden on very small screens */}
          <Link
            href="/blog"
            className="hidden xs:flex items-center px-4 py-2.5 font-sora text-[13px] text-fg/55 hover:text-fg/90 transition-colors duration-200"
            style={GLASS}
          >
            {t(content.nav.blog, lang)}
          </Link>

          {/* Language switcher island */}
          <div
            className="flex items-center gap-1 p-1"
            style={GLASS}
          >
            <button
              onClick={() => setLang("en")}
              className={`min-w-[40px] min-h-[34px] px-3 py-1.5 rounded-full text-[12px] font-sora font-semibold transition-all duration-200 ${
                lang === "en"
                  ? "bg-accent text-bg"
                  : "text-fg/45 hover:text-fg/75"
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLang("es")}
              className={`min-w-[40px] min-h-[34px] px-3 py-1.5 rounded-full text-[12px] font-sora font-semibold transition-all duration-200 ${
                lang === "es"
                  ? "bg-accent text-bg"
                  : "text-fg/45 hover:text-fg/75"
              }`}
              aria-label="Cambiar a Español"
            >
              ES
            </button>
          </div>

          {/* Free Audit CTA island */}
          <a
            href={content.nav.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 sm:px-5 py-2.5 font-sora text-[13px] font-semibold text-bg hover:opacity-90 transition-opacity duration-200 whitespace-nowrap min-h-[44px]"
            style={CTA_PILL}
          >
            {t(content.nav.cta, lang)}
          </a>
        </div>
      </div>
    </motion.header>
  );
}
