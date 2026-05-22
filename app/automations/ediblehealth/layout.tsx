import type { ReactNode } from "react";
import Link from "next/link";
import ScrollReveal from "../[slug]/components/ScrollReveal";

/**
 * Layout for the Edible Health personalised page.
 *
 * – Hides the site-wide AnnouncementBar + Nav (data-demo-layout sentinel).
 * – Overrides the dark site background with a warm cream palette.
 * – Inverts the logo so it reads on a light surface.
 * – Includes ScrollReveal for data-reveal animations.
 */
export default function EdibleHealthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        /* ── hide global nav on demo pages ── */
        body:has([data-demo-layout]) [data-site-element="announcement"],
        body:has([data-demo-layout]) [data-site-element="nav"] {
          display: none !important;
        }

        /* ── warm cream override for this page ── */
        body:has([data-ediblehealth-page]) {
          background-color: #FAF8F4 !important;
          color: #1C1208 !important;
        }

        /* ── invert logo for light background ── */
        body:has([data-ediblehealth-page]) header img {
          filter: invert(1) sepia(0.4) saturate(0.5) brightness(0.25);
        }

        /* ── header backdrop on light bg ── */
        body:has([data-ediblehealth-page]) header {
          background: rgba(250,248,244,0.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(28,18,8,0.06);
        }

        /* ── keep film-grain overlay from showing on white ── */
        body:has([data-ediblehealth-page])::before {
          opacity: 0.008;
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
            className="opacity-70 hover:opacity-100 transition-opacity duration-200"
          />
        </Link>
      </header>

      {/* Sentinels */}
      <div data-demo-layout hidden aria-hidden="true" />

      {children}

      <ScrollReveal />
    </>
  );
}
