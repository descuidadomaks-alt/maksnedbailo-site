"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { content, t } from "@/lib/content";

const BAR_HEIGHT = 28;

/**
 * True liquid glass — neutral islands (logo, blog, lang).
 * Top-edge inner highlight via gradient; very low opacity so content bleeds through.
 */
const GLASS: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(20,20,20,0.24) 55%)",
  backdropFilter: "blur(40px) saturate(200%)",
  WebkitBackdropFilter: "blur(40px) saturate(200%)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  borderRadius: "999px",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08)",
};

/**
 * Accent-tinted liquid glass — CTA button.
 * Same frosted treatment, lime-tinted so it reads as the brand action colour.
 */
const CTA_GLASS: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(212,255,43,0.28) 0%, rgba(212,255,43,0.15) 55%)",
  backdropFilter: "blur(40px) saturate(200%)",
  WebkitBackdropFilter: "blur(40px) saturate(200%)",
  border: "1px solid rgba(212, 255, 43, 0.25)",
  borderRadius: "999px",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(212,255,43,0.15)",
};

/** Thin book icon for Blog island at mobile sizes */
function BookIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

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
      data-site-element="nav"
      className="fixed left-0 right-0 z-50 pointer-events-none"
      animate={{ top: topOffset }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ top: topOffset }}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 flex items-center justify-between gap-2">

        {/* ── Logo — standalone circle, no pill ── */}
        <Link
          href="/"
          className="pointer-events-auto flex items-center"
          aria-label="care less AI automation home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="care less AI automation"
            className="w-auto shrink-0"
            style={{ height: "36px" }}
          />
        </Link>

        {/* ── Right islands ── */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">

          {/* Blog island — icon-only below xs:400px, full label at xs+ */}
          <Link
            href="/blog"
            className="flex items-center justify-center gap-1.5 px-2.5 xs:px-4 py-2.5 font-sora text-[13px] text-fg/55 hover:text-fg/90 transition-colors duration-200 min-h-[44px]"
            style={GLASS}
            aria-label="Blog"
          >
            <BookIcon />
            <span className="hidden xs:inline">{t(content.nav.blog, lang)}</span>
          </Link>

          {/* Language switcher island */}
          <div
            className="flex items-center gap-0.5 p-1"
            style={GLASS}
          >
            <button
              onClick={() => setLang("en")}
              className={`min-w-[34px] xs:min-w-[38px] min-h-[32px] px-2 xs:px-2.5 py-1.5 rounded-full text-[12px] font-sora font-semibold transition-all duration-200 ${
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
              className={`min-w-[34px] xs:min-w-[38px] min-h-[32px] px-2 xs:px-2.5 py-1.5 rounded-full text-[12px] font-sora font-semibold transition-all duration-200 ${
                lang === "es"
                  ? "bg-accent text-bg"
                  : "text-fg/45 hover:text-fg/75"
              }`}
              aria-label="Cambiar a Español"
            >
              ES
            </button>
          </div>

          {/* Free Audit CTA island — accent-tinted glass */}
          <a
            href={content.nav.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 xs:px-4 sm:px-5 py-2.5 font-sora text-[12px] xs:text-[13px] font-semibold text-fg hover:opacity-90 transition-all duration-200 whitespace-nowrap min-h-[44px]"
            style={CTA_GLASS}
          >
            {t(content.nav.cta, lang)}
          </a>
        </div>
      </div>
    </motion.header>
  );
}
