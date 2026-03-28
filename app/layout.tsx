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
  title: "Maks Nedbailo | AI Automation Consulting",
  description:
    "I help businesses install smart assistants that respond to every customer in under 60 seconds. You only pay when it works.",
  openGraph: {
    title: "Maks Nedbailo | AI Automation Consulting",
    description:
      "I help businesses install smart assistants that respond to every customer in under 60 seconds. You only pay when it works.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${sora.variable}`}>
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
