/**
 * Standalone layout for /new.
 * Lives OUTSIDE the (site) route group so it doesn't inherit
 * app/(site)/layout.tsx — that parent layout would add a second
 * AnnouncementBar and a second Nav, causing duplicate ticker + duplicate header.
 *
 * This layout is the sole layout for /new; it provides everything the page needs.
 */
import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/LanguageContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import NavNew from "@/components/NavNew";

export default function NewLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <AnnouncementBar />
      <NavNew />
      {children}
    </LanguageProvider>
  );
}
