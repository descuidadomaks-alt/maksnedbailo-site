import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  titleEs: string;
  date: string;
  excerpt: string;
  excerptEs: string;
  coverImage?: string;
  keywords?: string[];
  readingTime: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
  contentHtmlEs: string;
  keywords?: string[];
}

function calcReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${mins} min read`;
}

async function mdToHtml(md: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(md);
  return result.toString();
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
    const { data, content } = matter(raw);

    const [enContent] = content.split(/^---ES---$/m);

    return {
      slug,
      title: data.title ?? slug,
      titleEs: data.titleEs ?? data.title ?? slug,
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      excerptEs: data.excerptEs ?? data.excerpt ?? "",
      coverImage: data.coverImage ?? undefined,
      keywords: data.keywords ?? undefined,
      readingTime: calcReadingTime(enContent),
    } as PostMeta;
  });

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  return posts
    .filter((p) => !p.date || new Date(p.date) <= today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Try both .mdx and .md extensions
  let filepath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) {
    filepath = path.join(POSTS_DIR, `${slug}.md`);
    if (!fs.existsSync(filepath)) return null;
  }

  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);

  const esSplit = content.split(/^---ES---$/m);
  const enRaw = esSplit[0].trim();
  const esRaw = (esSplit[1] ?? esSplit[0]).trim();

  const [contentHtml, contentHtmlEs] = await Promise.all([
    mdToHtml(enRaw),
    mdToHtml(esRaw),
  ]);

  const postDate = data.date ? new Date(data.date) : null;
  if (postDate) {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (postDate > today) return null;
  }

  return {
    slug,
    title: data.title ?? slug,
    titleEs: data.titleEs ?? data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    excerptEs: data.excerptEs ?? data.excerpt ?? "",
    coverImage: data.coverImage ?? undefined,
    keywords: data.keywords ?? undefined,
    readingTime: calcReadingTime(enRaw),
    contentHtml,
    contentHtmlEs,
  };
}
