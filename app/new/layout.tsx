/**
 * Standalone layout for /new — the Care Less brand homepage.
 *
 * Lives OUTSIDE the (site) route group so it doesn't inherit
 * app/(site)/layout.tsx — that parent layout would add a second
 * AnnouncementBar and a second Nav, causing duplicate ticker + duplicate header.
 *
 * Provides: EN/ES locale context (NewLocaleProvider), the minimal fixed
 * header (NewHeader), and the [data-reveal] scroll-reveal observer
 * (ScrollReveal — reused from the partner short-page, identical IO logic).
 * Lenis smooth scroll is already mounted globally by the root layout.
 *
 * Metadata below overrides the root layout's defaults with Bottleneck Map
 * positioning. Per the locked positioning doc, the following phrases are
 * banned site-wide on /new and must never reappear here: "500+ businesses",
 * "34+ countries", "Free audit", "30-day guarantee", "under 60 seconds".
 */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NewLocaleProvider } from "./lib/locale";
import NewHeader from "./components/NewHeader";

const TITLE = "The Bottleneck Map — Find the One Leak That's Costing You | Care Less";
const DESCRIPTION =
  "Most founders aren't drowning in too little AI — they're drowning in being the bottleneck. The Bottleneck Map is a 90-minute, ROI-ranked audit of where your time, money, and energy are leaking, and what's actually worth fixing first.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "bottleneck map",
    "founder bottleneck",
    "business process audit",
    "AI automation audit",
    "operations audit for founders",
    "where is my business losing money",
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// Reuse the partner-page ScrollReveal (identical IntersectionObserver logic).
// The [slug] directory name is valid for module resolution; Next.js routing is separate.
import ScrollReveal from "@/app/partners/[slug]/components/ScrollReveal";

export default function NewLayout({ children }: { children: ReactNode }) {
  return (
    <NewLocaleProvider>
      <NewHeader />
      {/* top padding so the fixed header doesn't overlap content */}
      <div style={{ paddingTop: "76px" }}>{children}</div>
      <ScrollReveal />
    </NewLocaleProvider>
  );
}
