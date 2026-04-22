import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllCities } from "@/lib/cities";

const BASE = "https://maksnedbailo.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const cities = getAllCities();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const cityRoutes: MetadataRoute.Sitemap = cities.flatMap((city) => [
    {
      url: `${BASE}/es/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/en/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]);

  return [...staticRoutes, ...blogRoutes, ...cityRoutes];
}
