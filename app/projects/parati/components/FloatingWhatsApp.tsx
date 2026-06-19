"use client";

import { useEffect, useState } from "react";
import { site } from "../lib/content";
import { waLink } from "../lib/whatsapp";
import { WhatsAppGlyph } from "./WhatsAppButton";

/**
 * Floating WhatsApp button — fixed bottom-right, always visible, the
 * friction-killer. Fades in just after load so it doesn't fight the hero.
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={site.floatingWhatsAppLabel}
      className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ivory shadow-soft transition-all duration-500 hover:bg-gold-deep sm:bottom-7 sm:right-7 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppGlyph className="h-7 w-7" />
      {/* Soft gold pulse ring — purely decorative */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/40 [animation-duration:3s]"
      />
    </a>
  );
}
