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
      "Find where AI pays off in your business. One-page map, delivered within 48h. Free until July 31, 2026. 10k guarantee.",
    url: "https://maksnedbailo.site/ai-map",
    type: "website",
    siteName: "Care Less AI Automation",
    images: [{ url: "/AI_Map_Thumbnail.jpg", width: 1200, height: 675, alt: "Strategic AI Map — Care Less AI Automation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategic AI Map — 90 minutes, ROI-ranked",
    description: "Free (was €1,470) until July 31, 2026. 10k guarantee.",
    images: ["/AI_Map_Thumbnail.jpg"],
  },
};

export default function AiMapPage() {
  return <DirectPage />;
}
