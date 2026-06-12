import { getAllPosts } from "@/lib/blog";
import SiteFooter from "../SiteFooter";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BlogListingClient from "@/components/BlogListingClient";

export const metadata = {
  title: "Insights | Maks Nedbailo",
  description: "AI automation insights for business owners. Real data, no fluff.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <main className="min-h-screen">
        <BlogListingClient posts={posts} />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
