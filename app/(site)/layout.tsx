import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/LanguageContext";
import SiteHeader from "./SiteHeader";

/**
 * Layout for all public "site" pages — blog, city pages.
 * Shares the same NewHeader (with global ticker) as the homepage and
 * /ai-map. Partners / automations / roman have their own isolated layouts
 * and do NOT inherit this.
 *
 * data-short-page activates the homepage's 2-font system (Roboto Mono
 * titles/labels + IBM Plex Sans body & numerals) — see app/globals.css
 * [data-short-page]. Keeps blog + city pages typographically consistent
 * with the homepage.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SiteHeader />
      <div data-short-page style={{ paddingTop: "76px" }}>
        {children}
      </div>
    </LanguageProvider>
  );
}
