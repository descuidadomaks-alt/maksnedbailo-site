import type { Metadata } from "next";
import NetBeesNote from "../NetBeesNote";

export const metadata: Metadata = {
  title: "Una nota para Maura · NetBees",
  description: "Una nota personal para Maura después de nuestra conversación sobre NetBees.",
  alternates: {
    canonical: "https://maksnedbailo.site/partners/netbees/es",
    languages: { en: "/partners/netbees", es: "/partners/netbees/es" },
  },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function Page() { return <NetBeesNote locale="es" />; }
