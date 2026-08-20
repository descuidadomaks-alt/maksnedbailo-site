/**
 * Homepage - the Care Less V3 page, promoted from /new.
 *
 * Lives at the app root (NOT inside the (site) route group) so it does not
 * inherit app/(site)/layout.tsx, which adds AnnouncementBar + NavNew and
 * would duplicate this page's own fixed header (V2Header -> NewHeader).
 *
 * Content is app/new/_v2/V2HomeClient.tsx. The `_v2` folder is underscore
 * prefixed, so Next treats it as private and never routes to it; it is only
 * ever imported, which is what lets the page body live under app/new/ while
 * being served from "/".
 *
 * Archives, oldest to newest, all noindex and all absent from the sitemap:
 *   /old   original site
 *   /old3  first Care Less homepage (HomePageClient)
 *   /old2  the "Bottleneck Map" homepage this page replaced
 * /new 308-redirects here (app/new/page.tsx).
 *
 * Copy rule for this page and everything it renders: no em dashes, en
 * dashes, curly quotes, ellipsis characters, middots or arrow glyphs in
 * anything a crawler can read. They are the cheapest tell that text was
 * machine written. Use a full stop, a colon, a comma, or the word ("4 to 6",
 * "2 to 3 weeks"). scratchpad/tells.py and htmltells.js check the source and
 * the served HTML respectively.
 */
import type { Metadata } from "next";
import { NewLocaleProvider } from "./new/lib/locale";
import V2Header from "./new/_v2/components/V2Header";
import V2HomeClient from "./new/_v2/V2HomeClient";
import ScrollReveal from "@/app/partners/[slug]/components/ScrollReveal";

const TITLE = "Win More Work, With Less Admin | AI Systems for Sales, Service & Finance Ops";
const DESCRIPTION =
  "We build AI systems that answer every enquiry in seconds, follow up until customers reply, and take invoicing, bookkeeping and repetitive admin off your team. Free 90-minute AI Map first. You pay once it works.";

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
    canonical: "https://maksnedbailo.site",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://maksnedbailo.site",
    siteName: "Care Less AI Automation",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    images: [
      {
        url: "/maks-stage2.jpg",
        width: 1400,
        height: 450,
        alt: "Maks Nedbailo - Care Less AI automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/maks-stage2.jpg"],
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
      <V2Header />
      {/* top padding so the fixed header doesn't overlap content */}
      <div style={{ paddingTop: "76px" }}>
        <V2HomeClient />
      </div>
      <ScrollReveal />
    </NewLocaleProvider>
  );
}
