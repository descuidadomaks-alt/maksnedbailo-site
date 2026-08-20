/**
 * Standalone layout for /score — The Bottleneck Score quiz.
 *
 * Lives OUTSIDE the (site) route group, same pattern as /new, so it doesn't
 * inherit app/(site)/layout.tsx (no AnnouncementBar / Nav duplication).
 * Lenis smooth scroll + global fonts are mounted by the root layout.
 *
 * Same design system as /new: data-short-page (Roboto Mono titles/labels +
 * IBM Plex Sans body), set on <main> in page.tsx.
 */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

const TITLE = "The Bottleneck Score: Free 2-Minute Diagnostic | Care Less AI Automation";
const DESCRIPTION =
  "8 questions, 2 minutes. Find out what being the bottleneck is costing your business every month, before you spend a cent fixing it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "bottleneck score",
    "founder bottleneck",
    "business process audit",
    "AI automation audit",
    "operations audit for founders",
    "where is my business losing money",
    "Care Less",
    "Maks Nedbailo",
  ],
  alternates: {
    canonical: "https://maksnedbailo.site/score",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://maksnedbailo.site/score",
    siteName: "Care Less AI Automation",
    locale: "en_US",
    images: [{ url: "/Bottleneck_Score_Thumbnail.jpg", width: 1200, height: 675, alt: "The Bottleneck Score, Care Less AI Automation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/Bottleneck_Score_Thumbnail.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "The Bottleneck Score",
  url: "https://maksnedbailo.site/score",
  description: DESCRIPTION,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  provider: { "@id": "https://maksnedbailo.site/#business" },
};

export default function ScoreLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/" className="fixed left-5 top-5 z-[60]" aria-label="Care Less home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Care Less" width={26} height={26} className="w-auto" style={{ height: "26px" }} />
      </Link>
      {children}
    </>
  );
}
