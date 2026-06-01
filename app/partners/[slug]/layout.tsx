import type { ReactNode } from "react";
import Script from "next/script";
import ScrollReveal from "./components/ScrollReveal";
import PartnerLocaleWrapper from "./lib/PartnerLocaleWrapper";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

/**
 * Minimal layout for /partners/[slug].
 *
 * Provides:
 *  - Plausible tagged-events script
 *  - Microsoft Clarity (opt-in via NEXT_PUBLIC_CLARITY_ID)
 *  - PartnerLocaleWrapper — renders the static minimal header (logo + EN/UK toggle)
 *    and supplies locale context to all child components
 *  - ScrollReveal — IntersectionObserver-based data-reveal animations
 *
 * All partner pages default to "uk" locale (Vlad's circle is Ukrainian).
 * Main-site clones can override via ShortPartnerConfig.defaultLocale.
 */
export default function PartnersLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Plausible analytics — tagged events */}
      <Script
        src="https://plausible.io/js/script.tagged-events.js"
        data-domain="maksnedbailo.site"
        strategy="afterInteractive"
      />

      {/* Microsoft Clarity — session recordings (opt-in via env var) */}
      {CLARITY_ID && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}

      {/* defaultLocale="uk" — partner pages are Ukrainian by default */}
      <PartnerLocaleWrapper defaultLocale="uk">
        {children}
      </PartnerLocaleWrapper>

      <ScrollReveal />
    </>
  );
}
