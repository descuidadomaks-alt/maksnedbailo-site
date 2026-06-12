/**
 * /old2 — archived copy of the previous homepage (HomePageClient).
 * The Care Less "Bottleneck Map" page (formerly /new) now lives at "/".
 * Kept for reference only — noindex.
 */
import type { Metadata } from "next";
import HomePageClient from "../HomePageClient";

export const metadata: Metadata = {
  title: "Archived homepage | Care Less AI Automation",
  robots: { index: false, follow: false },
};

export default function Old2Page() {
  return <HomePageClient />;
}
