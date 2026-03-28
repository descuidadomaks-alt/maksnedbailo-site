"use client";

import { useLang } from "@/lib/LanguageContext";

interface Props {
  titleEn: string;
  titleEs: string;
  excerptEn: string;
  excerptEs: string;
  contentHtmlEn: string;
  contentHtmlEs: string;
}

export default function BlogArticleClient({
  titleEn,
  titleEs,
  excerptEn,
  excerptEs,
  contentHtmlEn,
  contentHtmlEs,
}: Props) {
  const { lang } = useLang();

  const title = lang === "es" ? titleEs : titleEn;
  const excerpt = lang === "es" ? excerptEs : excerptEn;
  const html = lang === "es" ? contentHtmlEs : contentHtmlEn;

  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Title + excerpt inside header area */}
      <div className="pb-8 border-b border-white/[0.04] mb-10">
        <h1
          className="font-playfair font-normal leading-tight mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          {title}
        </h1>
        <p className="font-sora font-light text-[16px] text-fg/45 leading-relaxed max-w-[560px]">
          {excerpt}
        </p>
      </div>

      {/* Article body */}
      <article
        className="prose-blog pb-24"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
