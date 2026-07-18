import articles from "@/data/articles.json";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Статья" };
  return {
    title: article.title,
    description: article.description || article.paragraphs[0]?.slice(0, 160),
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <article className="container-page py-12 md:py-16">
      <Link href="/stati" className="text-sm text-burgundy hover:underline">
        ← Все статьи
      </Link>
      <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl md:text-5xl">
        {article.title}
      </h1>
      {article.description ? (
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{article.description}</p>
      ) : null}
      <div className="prose-sc mt-10 max-w-3xl space-y-4 text-sm leading-relaxed text-ink-soft md:text-base">
        {article.paragraphs.map((p) =>
          p.startsWith("## ") ? (
            <h2 key={p} className="pt-4 font-[family-name:var(--font-display)] text-2xl text-ink">
              {p.replace(/^##\s*/, "")}
            </h2>
          ) : p.startsWith("### ") ? (
            <h3 key={p} className="pt-2 text-xl font-semibold text-ink">
              {p.replace(/^###\s*/, "")}
            </h3>
          ) : (
            <p key={p.slice(0, 60)}>{p}</p>
          ),
        )}
      </div>
    </article>
  );
}
