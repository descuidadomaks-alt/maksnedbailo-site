/**
 * /ai-map - the AI Map offer page. Free, permanently.
 *
 * Promoted from /ai-map/new. Content is app/ai-map/new/NewOfferClient.tsx,
 * imported directly; /ai-map/new now 308-redirects here.
 *
 * The previous version of this page, which carried the old "free until
 * July 31, normally EUR 1,470, 10k guarantee" mechanic, is archived at
 * /ai-map/old as noindex. It must stay noindex: it makes a price-and-
 * deadline promise this page contradicts.
 *
 * This is the money page and the primary conversion target, so it is
 * indexed, canonical to itself, and listed in app/sitemap.ts.
 *
 * Copy rule, same as the homepage: no em dashes, en dashes, curly quotes,
 * ellipsis characters, middots or arrow glyphs anywhere a crawler reads,
 * including this title and description. They are the cheapest tell that
 * text was machine written, and the title is the most exposed text on the
 * page because it renders directly in search results.
 */
import type { Metadata } from "next";
import NewOfferClient from "./new/NewOfferClient";

const TITLE = "Free AI Map: 90 Minutes, ROI-Ranked | Care Less AI Automation";
const DESCRIPTION =
  "A 90-minute working session that maps where your business is losing time and money, ranked by impact. Free, permanently. One-page document delivered within 48 hours.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "AI Map",
    "free AI audit",
    "AI opportunity assessment",
    "AI automation for small business",
    "where does AI pay off",
    "Care Less",
    "Maks Nedbailo",
  ],
  alternates: { canonical: "https://maksnedbailo.site/ai-map" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: "Free AI Map: 90 minutes, ROI-ranked",
    description:
      "Find where AI pays off in your business, and where it does not. One-page ranked map, delivered within 48 hours. Free, permanently.",
    url: "https://maksnedbailo.site/ai-map",
    type: "website",
    siteName: "Care Less AI Automation",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    images: [
      {
        url: "/AI_Map_Thumbnail.jpg",
        width: 1200,
        height: 675,
        alt: "Free AI Map, Care Less AI Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Map: 90 minutes, ROI-ranked",
    description:
      "Find where AI pays off in your business, and where it does not. Free, permanently.",
    images: ["/AI_Map_Thumbnail.jpg"],
  },
};

export default function AiMapPage() {
  return <NewOfferClient />;
}
