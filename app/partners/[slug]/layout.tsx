import type { ReactNode } from "react";
import Link from "next/link";
import Script from "next/script";
import ScrollReveal from "./components/ScrollReveal";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

/**
 * Minimal layout for /partners/[slug] — hides global nav/announcement bar,
 * shows a single-logo header with a "Personal Invitation" badge.
 * Adds Plausible tagged-events tracking for all partner pages.
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

      {/* Static header — scrolls with page. No fixed/gradient bleed.
          Sticky conversion is handled by StickyMobileCTA at the bottom. */}
      <header
        className="flex items-center justify-between px-5 sm:px-8"
        style={{
          height: "56px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(6,6,8,0.98)",
        }}
      >
        <Link href="/" aria-label="care less AI automation — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="care less AI automation"
            style={{ height: "28px", opacity: 0.6 }}
            className="hover:opacity-90 transition-opacity duration-200"
          />
        </Link>

        <span
          className="font-sora"
          style={{
            fontSize: "9px",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            border: "1px solid rgba(212,255,43,0.14)",
            borderRadius: "999px",
            padding: "4px 12px",
            color: "rgba(212,255,43,0.45)",
          }}
        >
          Personal Invitation
        </span>
      </header>


      {children}
      <ScrollReveal />
    </>
  );
}
