import type { Metadata } from "next";
import NetBeesNote from "./NetBeesNote";

export const metadata: Metadata = {
  title: "A note for Maura · NetBees",
  description: "A personal follow-up to a conversation with Maura about NetBees.",
  alternates: {
    canonical: "https://maksnedbailo.site/partners/netbees",
    languages: { en: "/partners/netbees", es: "/partners/netbees/es" },
  },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function Page() { return <NetBeesNote locale="en" />; }
