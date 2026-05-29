import { getAllPosts } from "@/lib/blog";
import Footer from "@/components/Footer";
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
      <main className="min-h-screen" style={{ paddingTop: "100px" }}>
        <BlogListingClient posts={posts} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
