import type { ReactNode } from "react";
import Script from "next/script";
import DirectLocaleWrapper from "./lib/DirectLocaleWrapper";

// Reuse the partner-page ScrollReveal (identical IntersectionObserver logic)
// The [slug] directory name is valid for module resolution; Next.js routing is separate.
import ScrollReveal from "@/app/partners/[slug]/components/ScrollReveal";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

/**
 * Layout for /ai-map — the direct sales page.
 * EN default (public traffic). Lenis smooth scroll is already active from root layout.
 * DirectLocaleWrapper renders the minimal header (logo + EN/UK toggle, no partner badge).
 */
export default function DirectSalesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Plausible analytics */}
      <Script
        src="https://plausible.io/js/script.tagged-events.js"
        data-domain="maksnedbailo.site"
        strategy="afterInteractive"
      />

      {/* Microsoft Clarity */}
      {CLARITY_ID && (
        <Script id="ms-clarity-direct" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}

      {/* EN default — public cold traffic */}
      <DirectLocaleWrapper defaultLocale="en">
        {children}
      </DirectLocaleWrapper>

      <ScrollReveal />
    </>
  );
}
