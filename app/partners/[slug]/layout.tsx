import type { ReactNode } from "react";
import Link from "next/link";
import ScrollReveal from "./components/ScrollReveal";

/**
 * Minimal layout for /partners/[slug] — hides global nav/announcement bar,
 * shows a single-logo header with a "Personal Invitation" badge.
 */
export default function PartnersLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        body:has([data-partner-layout]) [data-site-element="announcement"],
        body:has([data-partner-layout]) [data-site-element="nav"] {
          display: none !important;
        }
      `}</style>

      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 sm:px-8"
        style={{
          height: "56px",
          background: "linear-gradient(180deg, rgba(6,6,8,0.95) 0%, transparent 100%)",
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
          className="font-sora text-fg/35"
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

      <div data-partner-layout hidden aria-hidden="true" />

      {children}
      <ScrollReveal />
    </>
  );
}
