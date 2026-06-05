/**
 * Homepage — server component that exports SEO metadata.
 * All interactive content is in HomePageClient (client component).
 */
import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Find Where AI Pays Off in Your Business | Care Less AI Automation",
  description:
    "Stop guessing where AI fits. We map every opportunity in your business, ranked by ROI, in 90 minutes. Strategic AI Map — free sessions available now.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Care Less AI — Strategic AI Map for Business Owners",
    description:
      "A 90-minute working session that maps every AI opportunity in your business, ranked by ROI. No hype. No pitch. One-page deliverable in 48 hours.",
    url: "https://maksnedbailo.site",
    type: "website",
    siteName: "Care Less AI Automation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Care Less AI — Strategic AI Map for Business Owners",
    description:
      "Find where AI actually earns its keep — and where it doesn't. Free 90-min Strategic AI Map.",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
