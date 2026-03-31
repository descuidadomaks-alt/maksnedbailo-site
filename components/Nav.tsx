"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { content, t } from "@/lib/content";

const BAR_HEIGHT = 28;

export default function Nav() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > BAR_HEIGHT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed left-0 right-0 z-50 backdrop-blur-xl bg-[#060608]/80 border-b border-white/5 transition-all duration-300"
      style={{ top: scrolled ? "0px" : `${BAR_HEIGHT}px` }}
    >
      <div
        className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-playfair text-xl font-normal text-fg tracking-wide"
        >
          MN
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-5">
          {/* Blog link */}
          <Link
            href="/blog"
            className="font-sora text-sm text-fg/45 hover:text-fg/80 transition-colors hidden sm:block"
          >
            {t(content.nav.blog, lang)}
          </Link>

          {/* Language toggle */}
          <div className="flex items-center gap-1 rounded-full border border-white/10 p-1">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full text-xs font-sora transition-all duration-200 ${
                lang === "en"
                  ? "bg-accent text-bg font-semibold"
                  : "text-fg/50 hover:text-fg/80"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("es")}
              className={`px-3 py-1 rounded-full text-xs font-sora transition-all duration-200 ${
                lang === "es"
                  ? "bg-accent text-bg font-semibold"
                  : "text-fg/50 hover:text-fg/80"
              }`}
            >
              ES
            </button>
          </div>

          {/* CTA */}
          <a
            href={content.nav.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-bg text-sm font-semibold px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors duration-200"
          >
            {t(content.nav.cta, lang)}
          </a>
        </div>
      </div>
    </nav>
  );
}
