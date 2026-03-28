"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/LanguageContext";
import type { PostMeta } from "@/lib/blog";

const headings = {
  en: {
    tag: "Insights",
    title: "What the data says about losing — and keeping — customers.",
    empty: "No posts yet. Check back soon.",
    readMore: "Read more →",
  },
  es: {
    tag: "Artículos",
    title: "Lo que dicen los datos sobre perder — y retener — clientes.",
    empty: "Sin artículos todavía. Vuelve pronto.",
    readMore: "Leer más →",
  },
};

export default function BlogListingClient({ posts }: { posts: PostMeta[] }) {
  const { lang } = useLang();
  const h = headings[lang];

  return (
    <>
      {/* Header */}
      <section className="py-16 md:py-24 border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[11px] uppercase tracking-[3.5px] text-accent/60 font-sora mb-5">
            {h.tag}
          </p>
          <h1 className="font-playfair font-normal text-4xl md:text-5xl leading-tight max-w-[560px]">
            {h.title}
          </h1>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          {posts.length === 0 ? (
            <p className="font-sora text-[15px] text-fg/35">{h.empty}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} lang={lang} readMore={h.readMore} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function PostCard({
  post,
  lang,
  readMore,
}: {
  post: PostMeta;
  lang: "en" | "es";
  readMore: string;
}) {
  const title = lang === "es" ? post.titleEs : post.title;
  const excerpt = lang === "es" ? post.excerptEs : post.excerpt;

  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === "es" ? "es-ES" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border border-white/[0.05] overflow-hidden hover:border-white/[0.12] transition-all duration-300"
    >
      {post.coverImage ? (
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-white/[0.02]">
          <Image
            src={post.coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="w-full aspect-[16/9] bg-white/[0.02] flex items-center justify-center">
          <span className="font-playfair text-5xl text-fg/5 select-none">MN</span>
        </div>
      )}

      <div className="p-7">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-sora text-[11px] text-fg/30">{formattedDate}</span>
          {post.readingTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-fg/20" />
              <span className="font-sora text-[11px] text-fg/30">{post.readingTime}</span>
            </>
          )}
        </div>

        <h2 className="font-playfair font-normal text-xl leading-snug text-fg mb-3 group-hover:text-accent transition-colors duration-200">
          {title}
        </h2>

        <p className="font-sora font-light text-[14px] text-fg/40 leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        <div className="mt-5 font-sora text-[13px] text-accent/70 group-hover:text-accent transition-colors">
          {readMore}
        </div>
      </div>
    </Link>
  );
}
