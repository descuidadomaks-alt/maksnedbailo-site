/**
 * Homepage — the Care Less "Bottleneck Map" page, promoted from /new.
 *
 * Lives at the app root (NOT inside the (site) route group) so it does not
 * inherit app/(site)/layout.tsx — that layout adds AnnouncementBar + NavNew,
 * which would duplicate this page's own fixed header (NewHeader).
 *
 * The previous homepage is archived at /old2 (app/(site)/old2/page.tsx).
 * /new now 301-redirects here (app/new/page.tsx).
 *
 * Per the locked positioning doc, the following phrases are banned on this
 * page and must never reappear: "500+ businesses", "34+ countries",
 * "Free audit", "30-day guarantee", "under 60 seconds".
 */
import type { Metadata } from "next";
import { NewLocaleProvider } from "./new/lib/locale";
import NewHeader from "./new/components/NewHeader";
import NewHomeClient from "./new/NewHomeClient";
// Reuse the partner-page ScrollReveal (identical IntersectionObserver logic).
import ScrollReveal from "@/app/partners/[slug]/components/ScrollReveal";

const TITLE = "Bottleneck Map: Find Your #1 Cost Leak | AI Automation for Founders";
const DESCRIPTION =
  "Diagnose your founder bottlenecks in 90 minutes. Map your highest-ROI AI automation fixes (WhatsApp agents, lead systems) with an operator, not a consultant.";

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
    canonical: "https://maksnedbailo.site",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://maksnedbailo.site",
    siteName: "Care Less",
    locale: "en_US",
    alternateLocale: ["es_ES"],
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

export default function HomePage() {
  return (
    <NewLocaleProvider>
      <NewHeader />
      {/* top padding so the fixed header doesn't overlap content */}
      <div style={{ paddingTop: "76px" }}>
        <NewHomeClient />
      </div>
      <ScrollReveal />
    </NewLocaleProvider>
  );
}
