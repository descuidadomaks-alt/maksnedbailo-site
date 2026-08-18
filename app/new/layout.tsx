/**
 * Layout for /new — the experimental V2 homepage (app/new/_v2/V2HomeClient.tsx).
 *
 * This file is used only by the /new route segment (Next.js applies it
 * automatically; nothing imports it directly — verified). It is safe to
 * rewrite. The rest of app/new/** (sections/, components/, lib/) is the
 * live "/" homepage's source and must not be touched from here.
 *
 * Lives OUTSIDE the (site) route group so it doesn't inherit
 * app/(site)/layout.tsx — that parent layout would add a second
 * AnnouncementBar and a second Nav, causing duplicate ticker + duplicate header.
 *
 * Provides: EN/ES locale context (NewLocaleProvider, reused — generic, not
 * V2-specific), the V2 header (V2Header — same NewHeader chrome, CTA
 * repointed at /ai-map/new), and the [data-reveal] scroll-reveal observer.
 *
 * V2 positioning bans the same phrases as the live homepage, plus: no price
 * anchor (€1,470), no "until July 31" deadline, no "10k guarantee" framing,
 * no €3–10M/20–50-employee ICP language. See docs/NEW-HOMEPAGE-V2-BRIEF.md.
 */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NewLocaleProvider } from "./lib/locale";
import V2Header from "./_v2/components/V2Header";

const TITLE = "Find Out What Your Business Is Losing | Care Less";
const DESCRIPTION =
  "We find where your business is losing time and money, then build the system that stops it. The diagnosis is free. You pay for the build once it works.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "AI automation for small business",
    "sales follow-up automation",
    "AI front office",
    "operations automation",
    "AI Map",
    "Care Less",
    "Maks Nedbailo",
  ],
  alternates: {
    canonical: "https://maksnedbailo.site/new",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://maksnedbailo.site/new",
    siteName: "Care Less AI Automation",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  // Experimental V1 — not competing with the live homepage's SEO yet, and
  // deliberately excluded from app/sitemap.ts (not added there).
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

// Reuse the partner-page ScrollReveal (identical IntersectionObserver logic).
// The [slug] directory name is valid for module resolution; Next.js routing is separate.
import ScrollReveal from "@/app/partners/[slug]/components/ScrollReveal";

export default function NewLayout({ children }: { children: ReactNode }) {
  return (
    <NewLocaleProvider>
      <V2Header />
      {/* top padding so the fixed header doesn't overlap content */}
      <div style={{ paddingTop: "76px" }}>{children}</div>
      <ScrollReveal />
    </NewLocaleProvider>
  );
}
