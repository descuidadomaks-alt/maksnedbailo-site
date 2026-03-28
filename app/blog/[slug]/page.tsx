import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BlogArticleClient from "@/components/BlogArticleClient";
import { BOOKING_LINK } from "@/lib/content";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Maks Nedbailo`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ paddingTop: "100px" }}
      >
        <p className="font-sora text-fg/40">Article not found.</p>
      </main>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <main className="min-h-screen" style={{ paddingTop: "100px" }}>
        {/* Header */}
        <section className="py-14 md:py-20 border-b border-white/[0.04]">
          <div className="max-w-3xl mx-auto px-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-sora text-[13px] text-fg/35 hover:text-fg/70 transition-colors mb-8"
            >
              ← Insights
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="font-sora text-[11px] text-fg/30">{formattedDate}</span>
              <span className="w-1 h-1 rounded-full bg-fg/20" />
              <span className="font-sora text-[11px] text-fg/30">{post.readingTime}</span>
            </div>
          </div>
        </section>

        {/* Cover image */}
        {post.coverImage && (
          <div className="max-w-3xl mx-auto px-6 py-8">
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Article body — client component handles EN/ES switching */}
        <BlogArticleClient
          titleEn={post.title}
          titleEs={post.titleEs}
          excerptEn={post.excerpt}
          excerptEs={post.excerptEs}
          contentHtmlEn={post.contentHtml}
          contentHtmlEs={post.contentHtmlEs}
        />

        {/* Bottom CTA */}
        <section className="border-t border-white/[0.04] py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="font-playfair text-2xl font-normal text-fg/70 mb-6">
              Want to see if this applies to your business?
            </p>
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-bg font-bold px-8 py-4 rounded-lg text-sm hover:bg-accent/90 transition-all duration-200"
            >
              Book a Free Audit →
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
