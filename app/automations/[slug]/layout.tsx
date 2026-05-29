import type { ReactNode } from "react";
import Link from "next/link";
import ScrollReveal from "./components/ScrollReveal";

/**
 * Minimal layout for all /automations/[slug] demo pages.
 *
 * – Hides the site-wide AnnouncementBar + Nav using CSS :has() with a
 *   data-demo-layout sentinel rendered here (no JS flash).
 * – Replaces them with a single-logo header so the page feels like a
 *   dedicated, premium landing experience.
 */
export default function AutomationsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Minimal demo header — logo only */}
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

      {children}
      <ScrollReveal />
    </>
  );
}
