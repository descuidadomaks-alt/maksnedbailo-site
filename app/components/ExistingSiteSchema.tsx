"use client";
import { usePathname } from "next/navigation";
export default function ExistingSiteSchema({ schema }: { schema: Record<string, unknown> }) {
 const path = usePathname();
 if (path === "/new2") return null;
 // The experimental experience must not inherit the legacy offer's pricing.
 const value = path === "/new" ? { "@context": "https://schema.org", "@type": "WebPage", name: "Care Less | Better experiences", url: "https://maksnedbailo.site/new", description: "Thoughtful experiences. Working systems." } : schema;
 return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value) }} />;
}
