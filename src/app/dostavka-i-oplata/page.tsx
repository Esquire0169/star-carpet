import type { Metadata } from "next";
import pages from "@/data/pages-content.json";
import { Building2, Package, Truck, Wallet } from "lucide-react";

export const metadata: Metadata = {
  title: "Доставка и оплата",
  description:
    "Доставка ковров по Москве, МО и России: курьер, транспортная компания, самовывоз. Сроки, стоимость и способы оплаты.",
};

const methods = [
  {
    icon: Truck,
    title: "Курьер по Москве и МО",
    text: "Доставка до квартиры, при необходимости поможем занести ковёр. Согласуем удобный интервал.",
  },
  {
    icon: Package,
    title: "Транспортная компания",
    text: "Отправка в регионы России. Обычно передача заказа в ТК занимает 1–3 рабочих дня после оплаты.",
  },
  {
    icon: Building2,
    title: "Самовывоз",
    text: "Москва, ул. Свободы, 29, ТЦ «Свобода Мебель», 2 этаж, помещения 14 и 15.",
  },
  {
    icon: Wallet,
    title: "Оплата",
    text: "Наличными при получении, картой или безналичным расчётом для юридических лиц.",
  },
];

export default function DeliveryPage() {
  const content = pages["dostavka-i-oplata"];
  const highlights = content.paragraphs.filter((p) => !p.includes("cookie")).slice(0, 10);

  return (
    <div className="container-page py-12 md:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-ink-soft">Логистика</p>
      <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl md:text-6xl">
        Доставка и оплата
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Быстро, аккуратно и по всей России — от курьера в Москве до транспортной компании в ваш город.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {methods.map((m) => (
          <article key={m.title} className="group rounded-[1.4rem] border border-line bg-bg-elevated p-5">
            <div className="icon-pulse mb-4 inline-flex rounded-2xl bg-sand p-3 text-burgundy">
              <m.icon size={22} />
            </div>
            <h2 className="text-lg font-semibold">{m.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{m.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[1.4rem] border border-line bg-bg-elevated p-6 lg:col-span-2">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Подробности</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            {highlights.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="rounded-[1.4rem] bg-sand p-6">
          <h3 className="font-[family-name:var(--font-display)] text-2xl">Сроки</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-soft">
            <li>• Москва / МО — обычно 1–2 дня</li>
            <li>• Регионы — 1–3 дня до передачи в ТК</li>
            <li>• Доставка также в выходные по согласованию</li>
            <li>• Бесплатная доставка в крупные города от 10 000 ₽</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
