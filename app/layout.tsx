import type { Metadata } from "next";
import { Playfair_Display, Sora, Cormorant_Garamond, IBM_Plex_Sans, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import { TESTIMONIAL_ITEMS } from "./new/lib/i18n";
import { UPWORK_PROFILE_URL } from "./new/lib/config";

// ── Primary display (Latin) ────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  // Overridden to Roboto Mono on the homepage ([data-short-page]); avoid
  // preloading it there. Pages that do render Playfair (e.g. /blog) still
  // load it on demand via the @font-face.
  preload: false,
});

// ── Primary body (Latin) ───────────────────────────────────────────────────────
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "600"],
});

// ── Cyrillic display — replaces Playfair when lang="uk" ───────────────────────
// Cormorant Garamond has native Cyrillic glyphs; similar editorial proportions
// to Playfair Display but with genuine Cyrillic support.
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  // Only used for :lang(uk) on /ai-map and partner pages; never preload it
  // on the homepage.
  preload: false,
});

// ── Cyrillic body — replaces Sora when lang="uk" ─────────────────────────────
// IBM Plex Sans has complete Cyrillic coverage and similar geometric feel to Sora.
const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-ibm-plex",
  display: "swap",
  weight: ["300", "400", "600"],
});

// ── Premium-tech mono — partner pages headings/labels/numbers ─────────────────
// Roboto Mono: complete Latin + Cyrillic coverage. Used for titles, eyebrows,
// section labels, step-numbers, and table column headers in the short template.
// Body text stays as IBM Plex Sans (Cyrillic) / Sora (Latin).
const robotoMono = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maksnedbailo.site"),
  title: "AI Chatbot & WhatsApp Automation for Small Business | care less AI automation",
  description:
    "Your clients message while you're with a client. An AI assistant replies in seconds — built after a real diagnosis, not another tool. Free 2-min Bottleneck Score.",
  keywords: [
    "AI chatbot for small business",
    "WhatsApp automation",
    "AI customer service automation",
    "WhatsApp business chatbot",
    "automated customer response",
    "AI assistant for business",
    "chatbot for restaurants",
    "AI booking automation",
    "voice AI agent",
    "customer service AI 2026",
    "automatización WhatsApp negocio",
    "chatbot IA para pymes",
    "asistente IA WhatsApp",
    "automatización atención cliente España",
    "Maks Nedbailo",
    "care less AI automation",
  ],
  authors: [{ name: "Maks Nedbailo", url: "https://maksnedbailo.site" }],
  alternates: {
    canonical: "https://maksnedbailo.site",
  },
  openGraph: {
    title: "AI Chatbot & WhatsApp Automation for Small Business | care less AI automation",
    description:
      "Your clients message while you're with a client. An AI assistant replies in seconds — built after a real diagnosis, not another tool. Free 2-min Bottleneck Score.",
    type: "website",
    url: "https://maksnedbailo.site",
    siteName: "care less AI automation",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chatbot & WhatsApp Automation for Small Business | care less AI automation",
    description:
      "Your clients message while you're with a client. An AI assistant replies in seconds — built after a real diagnosis, not another tool. Free 2-min Bottleneck Score.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://maksnedbailo.site/#website",
      url: "https://maksnedbailo.site",
      name: "Care Less AI Automation",
      description:
        "ROI-first AI diagnosis and systems architecture for owner-led businesses.",
      publisher: { "@id": "https://maksnedbailo.site/#person" },
    },
    {
      "@type": "Person",
      "@id": "https://maksnedbailo.site/#person",
      name: "Maks Nedbailo",
      jobTitle: "AI Automation Operator",
      url: "https://maksnedbailo.site",
      // Independent third-party source backing the on-page client reviews.
      sameAs: [UPWORK_PROFILE_URL],
      telephone: "+34641935207",
      description:
        "Operator, not consultant. Designing ROI-ranked AI diagnostics and custom systems for owner-led businesses — honest about where AI helps and where it doesn't.",
      knowsLanguage: ["en", "es", "ru"],
      knowsAbout: [
        "Generative Engine Optimization",
        "AI Automation Architecture",
        "WhatsApp Business API Development",
        "Process Automation",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santander",
        addressRegion: "Cantabria",
        addressCountry: "ES",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://maksnedbailo.site/#business",
      name: "care less AI automation",
      url: "https://maksnedbailo.site",
      telephone: "+34641935207",
      description:
        "The Bottleneck Map: a 90-minute, ROI-ranked diagnosis of where an owner-led business is leaking time and money — and what's actually worth fixing first.",
      priceRange: "€€€",
      currenciesAccepted: "EUR, GBP, USD",
      founder: { "@id": "https://maksnedbailo.site/#person" },
      areaServed: ["Spain", "United Kingdom", "United States"],
      // Real, verbatim client reviews (Upwork) — single source of truth in
      // app/new/lib/i18n.ts, also rendered on-page as Review microdata in
      // sections/Testimonials.tsx. All cards display a 5★ rating.
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        bestRating: "5",
        reviewCount: String(TESTIMONIAL_ITEMS.length),
      },
      review: TESTIMONIAL_ITEMS.map((t) => ({
        "@type": "Review",
        author: { "@type": "Person", name: t.author },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: t.quote,
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Founder Optimization Capabilities",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "The Bottleneck Map",
              description:
                "An intensive 90-minute working session that visualizes where operations bottle up at the founder layer, producing an ROI-ranked automation blueprint.",
              offers: {
                "@type": "Offer",
                price: "1470.00",
                priceCurrency: "EUR",
                valueAddedTaxIncluded: true,
              },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom WhatsApp Assistant Integration",
              description:
                "Full-stack development of automated, instant lead-response systems natively connected to corporate CRMs for service and hospitality brands.",
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${sora.variable} ${cormorant.variable} ${ibmPlex.variable} ${robotoMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-fg font-sora">
        <LenisProvider />
        {children}

        {/* Cloudflare Web Analytics */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "aacf89e5673746c586d5703c252bca88"}'
          strategy="afterInteractive"
        />

        {/* Microsoft Clarity */}
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wley84eoj3");`,
          }}
        />
      </body>
    </html>
  );
}
