"use client";

import { useEffect, useState } from "react";
import { site } from "../lib/content";
import { waLink } from "../lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

/**
 * Sticky top bar — tiny wordmark left, single gold WhatsApp CTA right.
 * Translucent; gains a blur + hairline border once the page scrolls.
 */
export function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/20 bg-cream/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-3.5 sm:px-8">
        <a
          href="#top"
          className="font-display text-xl tracking-wide text-charcoal sm:text-2xl"
          aria-label={`${site.business} — inicio`}
        >
          {site.business}
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
        {/* Compact CTA on the smallest screens (full text would overflow). */}
        <WhatsAppButton href={waLink()} className="sm:hidden !px-4 !py-2.5">
          Reservar
        </WhatsAppButton>
      </div>
    </header>
  );
}
