import type { Metadata } from "next";
import DirectPage from "./DirectPage";

export const metadata: Metadata = {
  title: "Strategic AI Map — 90 Minutes, ROI-Ranked | Care Less AI Automation",
  description:
    "A 90-minute working session that maps every AI opportunity in your business, ranked by ROI. One-page document delivered within 48 hours.",
  alternates: { canonical: "https://maksnedbailo.site/ai-map" },
  robots: { index: true, follow: true }, // public sales page — intentionally indexed
  openGraph: {
    title: "Strategic AI Map — 90 minutes, ROI-ranked",
    description:
      "Find where AI pays off in your business. One-page map, delivered within 48h. Free until June 30, 2026. 10k guarantee.",
    url: "https://maksnedbailo.site/ai-map",
    type: "website",
    siteName: "Care Less AI Automation",
    images: [{ url: "/maks-stage2.jpg", width: 1400, height: 450, alt: "Strategic AI Map — Care Less" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategic AI Map — 90 minutes, ROI-ranked",
    description: "Free (was €1,470) until June 30, 2026. 10k guarantee.",
    images: ["/maks-stage2.jpg"],
  },
};

export default function AiMapPage() {
  return <DirectPage />;
}
