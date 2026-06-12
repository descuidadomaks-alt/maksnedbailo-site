import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/LanguageContext";
import SiteHeader from "./SiteHeader";

/**
 * Layout for all public "site" pages — blog, city pages.
 * Shares the same NewHeader (with global ticker) as the homepage and
 * /ai-map. Partners / automations / roman have their own isolated layouts
 * and do NOT inherit this.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SiteHeader />
      <div style={{ paddingTop: "76px" }}>
        {children}
      </div>
    </LanguageProvider>
  );
}
