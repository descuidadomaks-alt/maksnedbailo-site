import type { ReactNode } from "react";
import Link from "next/link";
import ScrollReveal from "../[slug]/components/ScrollReveal";

/**
 * Layout for the Edible Health personalised outreach page.
 * Mirrors the standard [slug] demo layout:
 *   – Hides the site-wide AnnouncementBar + Nav
 *   – Single-logo minimal header
 *   – ScrollReveal animations
 */
export default function EdibleHealthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        body:has([data-demo-layout]) [data-site-element="announcement"],
        body:has([data-demo-layout]) [data-site-element="nav"] {
          display: none !important;
        }
      `}</style>

      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center px-6"
        style={{ height: "56px" }}
      >
        <Link href="/" aria-label="care less AI automation — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="care less AI automation"
            width={28}
            height={28}
            className="opacity-50 hover:opacity-90 transition-opacity duration-200"
          />
        </Link>
      </header>

      <div data-demo-layout hidden aria-hidden="true" />

      {children}

      <ScrollReveal />
    </>
  );
}
