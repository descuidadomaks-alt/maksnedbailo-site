import type { Metadata } from "next";
import { Playfair_Display, Sora } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Nav from "@/components/Nav";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maksnedbailo.site"),
  title: "Maks Nedbailo | AI Automation Consultant",
  description:
    "Smart assistants that respond to every customer in under 60 seconds — on WhatsApp, your website, or both. 400+ projects across 37 countries. You only pay when it works.",
  keywords: [
    "AI automation consultant",
    "WhatsApp automation",
    "customer response automation",
    "AI assistant for small business",
    "automatización IA",
    "asistente WhatsApp automático",
    "consultor IA España",
    "Maks Nedbailo",
  ],
  authors: [{ name: "Maks Nedbailo", url: "https://maksnedbailo.site" }],
  alternates: {
    canonical: "https://maksnedbailo.site",
  },
  openGraph: {
    title: "Maks Nedbailo | AI Automation Consultant",
    description:
      "Smart assistants that respond to every customer in under 60 seconds. 400+ projects. You only pay when it works.",
    type: "website",
    url: "https://maksnedbailo.site",
    siteName: "Maks Nedbailo",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maks Nedbailo | AI Automation Consultant",
    description:
      "Smart assistants that respond to every customer in under 60 seconds. You only pay when it works.",
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
      jobTitle: "AI Automation Consultant",
      url: "https://maksnedbailo.site",
      telephone: "+34641935207",
      description:
        "AI automation consultant helping business owners respond to every customer in under 60 seconds. 400+ projects delivered across 37 countries.",
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
      name: "Maks Nedbailo AI Automation",
      url: "https://maksnedbailo.site",
      telephone: "+34641935207",
      description:
        "Custom AI assistants for WhatsApp and websites that respond to customers in under 60 seconds. Free audit. 30-day money-back guarantee.",
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
                "Custom AI assistant for WhatsApp and website that responds to every customer in under 60 seconds, 24/7.",
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
    <html lang="en" className={`${playfair.variable} ${sora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-fg font-sora">
        <LanguageProvider>
          <AnnouncementBar />
          <Nav />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
