import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/LanguageContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import NavNew from "@/components/NavNew"; // NavNew adds "AI Map" link — replaces Nav after homepage swap

/**
 * Layout for all public "site" pages — homepage, blog, city pages.
 * Partners / automations / roman have their own isolated layouts and
 * do NOT inherit this, so Nav/Announcement never flashes on those pages.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <AnnouncementBar />
      <NavNew />
      {children}
    </LanguageProvider>
  );
}
