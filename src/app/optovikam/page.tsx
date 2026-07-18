import type { Metadata } from "next";
import Link from "next/link";
import pages from "@/data/pages-content.json";
import { Building, Hotel, Palette, Percent } from "lucide-react";

export const metadata: Metadata = {
  title: "Оптовым клиентам",
  description:
    "Оптовая продажа ковров для гостиниц, офисов и дизайнеров интерьера. Специальные цены, крупные партии, доставка.",
};

const audiences = [
  {
    icon: Hotel,
    title: "Гостиницы и апарт-отели",
    text: "Единый стиль номеров, дорожки в коридоры, износостойкие коллекции под высокую проходимость.",
  },
  {
    icon: Building,
    title: "Офисы и бизнес-центры",
    text: "Нейтральные и премиальные покрытия для переговорных, лобби и кабинетов.",
  },
  {
    icon: Palette,
    title: "Дизайнеры интерьера",
    text: "Подбор по проекту, образцы, консультации по материалам и срокам поставки.",
  },
  {
    icon: Percent,
    title: "Специальные условия",
    text: "Доступ к оптовому прайсу после заявки, гибкие объёмы и регулярные поставки.",
  },
];

export default function WholesalePage() {
  const content = pages.optovikam;
  const paras = content.paragraphs.filter((p) => !p.includes("cookie")).slice(0, 10);

  return (
    <div>
      <section className="border-b border-line bg-[linear-gradient(120deg,#1a1714_0%,#3a4d63_55%,#3f5a4a_100%)] text-white">
        <div className="container-page py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-white/70">B2B</p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl md:text-6xl">
            Оптовые поставки ковров
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Прямые поставки с фабрик Турции и других стран. Минимальные наценки, партии любого
            объёма и быстрая логистика в Москву.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="tel:+79015194267" className="btn-on-dark">
              Оставить заявку по телефону
            </a>
            <Link
              href="/kontakty"
              className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Написать менеджеру
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {audiences.map((a) => (
            <article key={a.title} className="rounded-[1.4rem] border border-line bg-bg-elevated p-5">
              <div className="icon-pulse mb-4 inline-flex rounded-2xl bg-sand p-3 text-burgundy">
                <a.icon size={22} />
              </div>
              <h2 className="text-lg font-semibold">{a.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{a.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page grid gap-8 pb-20 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-line bg-bg-elevated p-6 md:p-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">Почему с нами выгодно</h2>
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft">
            {paras.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
        <div className="rounded-[1.5rem] bg-sand p-6 md:p-8">
          <h3 className="font-[family-name:var(--font-display)] text-3xl">Как начать</h3>
          <ol className="mt-5 space-y-4 text-sm text-ink-soft">
            <li>1. Свяжитесь с менеджером или оставьте заявку на обратный звонок.</li>
            <li>2. Уточним объём, сроки и категории ковров.</li>
            <li>3. Откроем доступ к оптовым ценам и предложим оптимальные коллекции.</li>
            <li>4. Организуем поставку транспортной компанией или самовывоз.</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
