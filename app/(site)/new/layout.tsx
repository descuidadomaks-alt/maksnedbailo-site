/**
 * Layout for /new — same as the site layout but uses NavNew (adds AI Map link).
 * The live homepage layout (app/(site)/layout.tsx) is NOT modified.
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
