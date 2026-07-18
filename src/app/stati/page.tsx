import type { Metadata } from "next";
import Link from "next/link";
import articles from "@/data/articles.json";

export const metadata: Metadata = {
  title: "Блог о коврах",
  description:
    "Статьи Star Carpet: как выбрать ковёр, уход, ковровые дорожки, детские ковры и идеи для интерьера.",
};

export default function BlogPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-ink-soft">Блог</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl md:text-5xl">
        Полезные материалы о коврах
      </h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Советы по выбору, уходу и применению — перенесённые с действующего сайта Star Carpet в новый
        формат.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/stati/${article.slug}`}
            className="card-lift rounded-[1.4rem] border border-line bg-bg-elevated p-6"
          >
            <h2 className="text-xl font-semibold leading-snug tracking-tight">{article.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm text-ink-soft">
              {article.description || article.paragraphs[0]}
            </p>
            <span className="mt-5 inline-block text-sm font-medium text-burgundy">Читать →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
