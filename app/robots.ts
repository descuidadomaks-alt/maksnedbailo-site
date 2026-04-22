import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://maksnedbailo.site/sitemap.xml",
    host: "https://maksnedbailo.site",
  };
}
