"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "../lib/content";
import { waLink } from "../lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

/**
 * Sticky top bar. At the top of the page it shows the FULL brand lockup on a
 * roomy, transparent bar; once scrolled it collapses to a compact blurred bar
 * with just the lotus mark.
 */
export function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/20 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-content items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
          scrolled ? "py-2.5" : "py-4 sm:py-5"
        }`}
      >
        {/* Logo — full lockup at top, lotus mark once scrolled */}
        <a href="#top" aria-label={`${site.business} — inicio`} className="relative flex items-center">
          <Image
            src="/projects/parati/Logo_l.png"
            alt={`${site.business} — ${site.tagline}`}
            width={1007}
            height={832}
            sizes="180px"
            priority
            className={`w-auto transition-all duration-500 ${
              scrolled ? "h-0 opacity-0" : "h-14 opacity-100 sm:h-16"
            }`}
          />
          <Image
            src="/projects/parati/Logo_s.png"
            alt={site.business}
            width={577}
            height={498}
            sizes="60px"
            className={`w-auto transition-all duration-500 ${
              scrolled ? "h-9 opacity-100" : "h-0 opacity-0"
            }`}
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {site.nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-jost text-xs uppercase tracking-label text-charcoal/70 transition-colors hover:text-gold-deep"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <WhatsAppButton href={waLink()} className="hidden sm:inline-flex">
          {site.nav.cta}
        </WhatsAppButton>
        <WhatsAppButton href={waLink()} className="sm:hidden !px-4 !py-2.5">
          {site.nav.cta}
        </WhatsAppButton>
      </div>
    </header>
  );
}
