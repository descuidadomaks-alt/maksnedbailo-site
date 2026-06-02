import type { Metadata } from "next";
import DirectPage from "./DirectPage";

export const metadata: Metadata = {
  title: "Strategic AI Map — 90 minutes, ROI-ranked | care less AI automation",
  description:
    "A 90-minute working session that maps every AI opportunity in your business, ranked by ROI. One-page document delivered within 48 hours. €997 until June 30. 10× guarantee.",
  alternates: { canonical: "https://maksnedbailo.site/ai-map" },
  robots: { index: true, follow: true }, // public sales page — intentionally indexed
  openGraph: {
    title: "Strategic AI Map — 90 minutes, ROI-ranked",
    description:
      "Find where AI pays off in your business. One-page map, delivered within 48h. €997 until June 30. 10× guarantee or you pay nothing.",
    url: "https://maksnedbailo.site/ai-map",
    type: "website",
    siteName: "care less AI automation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategic AI Map — 90 minutes, ROI-ranked",
    description: "€997 until June 30. 10× guarantee or pay nothing.",
  },
};

export default function AiMapPage() {
  return <DirectPage />;
}
