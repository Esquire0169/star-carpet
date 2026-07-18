import type { Metadata } from "next";
import pages from "@/data/pages-content.json";
import { getMeta } from "@/lib/catalog";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "Star Carpet — московский интернет-магазин ковров с 2008 года. Ассортимент со всего мира, примерка, доставка и опт.",
};

export default function AboutPage() {
  const content = pages["o-kompanii"];
  const meta = getMeta();
  const paras = content.paragraphs.filter((p) => !p.includes("cookie"));

  return (
    <div>
      <section className="border-b border-line bg-[linear-gradient(160deg,#f6f3ee,#e7dfd2_40%,#e5ebe6)]">
        <div className="container-page py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-ink-soft">О бренде</p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl md:text-6xl">
            Уют, который можно выбрать спокойно
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            С 2008 года мы собираем ковры со всего мира в одном месте — чтобы семьям, дизайнерам и
            отелям было проще найти покрытие под свой дом, стиль и бюджет.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-4 py-12 md:grid-cols-3">
        {[
          { label: "Моделей в каталоге", value: meta.productCount.toLocaleString("ru-RU") },
          { label: "Категорий и подборок", value: String(meta.categoryCount) },
          { label: "Коллекций", value: String(meta.collectionCount) },
        ].map((stat) => (
          <div key={stat.label} className="rounded-[1.4rem] border border-line bg-bg-elevated p-6">
            <div className="font-[family-name:var(--font-display)] text-4xl text-burgundy">
              {stat.value}
            </div>
            <p className="mt-2 text-sm text-ink-soft">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="container-page grid gap-8 pb-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-line bg-bg-elevated p-6 md:p-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">Наша история</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-soft">
            {paras.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="rounded-[1.5rem] bg-[linear-gradient(160deg,#7a2430,#3a4d63)] p-6 text-white md:p-8">
          <h3 className="font-[family-name:var(--font-display)] text-2xl">Что важно для нас</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/90">
            <li>• Комфорт выбора без поездок за границу</li>
            <li>• Честные цены и большой складской запас</li>
            <li>• Примерка в Москве и доставка по России</li>
            <li>• Поддержка семей, дизайнеров и оптовых клиентов</li>
          </ul>
          <Link href="/katalog" className="btn-on-dark mt-8">
            Перейти в каталог
          </Link>
        </aside>
      </section>
    </div>
  );
}
