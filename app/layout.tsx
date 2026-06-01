import type { Metadata } from "next";
import { Playfair_Display, Sora, Cormorant_Garamond, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";

// ── Primary display (Latin) ────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
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
});

// ── Cyrillic body — replaces Sora when lang="uk" ─────────────────────────────
// IBM Plex Sans has complete Cyrillic coverage and similar geometric feel to Sora.
const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-ibm-plex",
  display: "swap",
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maksnedbailo.site"),
  title: "AI Chatbot & WhatsApp Automation for Small Business | care less AI automation",
  description:
    "AI assistants that reply to every customer in under 60 seconds — on WhatsApp, your website, or both. Free audit. 30-day guarantee. 500+ businesses across 34+ countries.",
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
      "AI assistants that reply to every customer in under 60 seconds — on WhatsApp, your website, or both. Free audit. 30-day guarantee. 500+ businesses across 34+ countries.",
    type: "website",
    url: "https://maksnedbailo.site",
    siteName: "care less AI automation",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chatbot & WhatsApp Automation for Small Business | care less AI automation",
    description:
      "AI assistants that reply to every customer in under 60 seconds — on WhatsApp, your website, or both. Free audit. 30-day guarantee. 500+ businesses across 34+ countries.",
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
      "@type": "Person",
      "@id": "https://maksnedbailo.site/#person",
      name: "Maks Nedbailo",
      url: "https://maksnedbailo.site",
      telephone: "+34641935207",
      description:
        "Helping business owners respond to every customer in seconds. 500+ businesses across 34 countries, 16 years of experience.",
      knowsLanguage: ["en", "es", "ru"],
      knowsAbout: [
        "AI automation",
        "WhatsApp Business API",
        "customer response automation",
        "small business AI",
        "chatbot development",
      ],
      areaServed: [
        { "@type": "Country", name: "Spain" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United States" },
        { "@type": "AdministrativeArea", name: "Cantabria" },
        { "@type": "City", name: "Santander" },
        { "@type": "City", name: "Madrid" },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://maksnedbailo.site/#business",
      name: "care less AI automation",
      url: "https://maksnedbailo.site",
      telephone: "+34641935207",
      description:
        "Custom AI assistants for WhatsApp and websites that respond to customers in seconds. Free audit. 30-day money-back guarantee.",
      priceRange: "$$",
      currenciesAccepted: "EUR, GBP, USD",
      areaServed: [
        { "@type": "Country", name: "Spain" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United States" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI Automation Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Free Business Audit",
              description:
                "48-hour audit that shows exactly where your business is losing leads and what it's costing you.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Customer Assistant",
              description:
                "Custom AI assistant for WhatsApp and website that responds to every customer in seconds, 24/7.",
            },
          },
        ],
      },
      founder: { "@id": "https://maksnedbailo.site/#person" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${sora.variable} ${cormorant.variable} ${ibmPlex.variable}`}>
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
