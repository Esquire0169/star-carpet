import type { Metadata } from "next";
import Link from "next/link";
import pages from "@/data/pages-content.json";
import { CalendarCheck, Home, PackageCheck, PhoneCall } from "lucide-react";
import { IdListClient } from "@/components/shop/ListsClient";

export const metadata: Metadata = {
  title: "Примерка ковров в Москве",
  description:
    "Бесплатная примерка ковров для жителей Москвы: до 2 моделей, привезём домой, оплачиваете только то, что подошло.",
};

const steps = [
  {
    icon: PackageCheck,
    title: "Выберите до 2 моделей",
    text: "Добавьте ковры к примерке в каталоге — так вы сравните цвет и размер вживую.",
  },
  {
    icon: PhoneCall,
    title: "Согласуйте визит",
    text: "Менеджер подтвердит адрес, время и условия. При заказе от 15 000 ₽ — бесплатно.",
  },
  {
    icon: Home,
    title: "Примерьте дома",
    text: "Привезём ковры в ваш район Москвы, разложим и дадим спокойно оценить интерьер.",
  },
  {
    icon: CalendarCheck,
    title: "Оставьте то, что подошло",
    text: "Оплачиваете только выбранную модель. Остальное забираем обратно.",
  },
];

export default function TryOnPage() {
  const content = pages["primerka-kovrov"];
  const paras = content.paragraphs.filter((p) => !p.includes("cookie")).slice(0, 8);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line bg-[linear-gradient(135deg,#efe8dc,#f6f3ee_45%,#e7ebe8)]">
        <div className="container-page py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-ink-soft">Сервис</p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl md:text-6xl">
            Примерка ковров в Москве
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">
            Не угадывайте по фото: привезём выбранные модели к вам домой. До двух ковров на
            примерку — и решение без сомнений.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/katalog" className="btn-primary">
              Выбрать ковры для примерки
            </Link>
            <a href="tel:+79015194267" className="btn-secondary">
              Позвонить консультанту
            </a>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">Как это работает</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {steps.map((step, i) => (
            <article key={step.title} className="group rounded-[1.4rem] border border-line bg-bg-elevated p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="icon-pulse rounded-2xl bg-sand p-3 text-burgundy">
                  <step.icon size={22} />
                </div>
                <span className="font-[family-name:var(--font-display)] text-3xl text-sand-deep">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-12">
        <h2 className="mb-5 font-[family-name:var(--font-display)] text-3xl">Ваш список примерки</h2>
        <IdListClient mode="tryOn" />
      </section>

      <section className="container-page grid gap-8 pb-20 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-line bg-bg-elevated p-6 md:p-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">Простыми словами</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-soft">
            {paras.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="rounded-[1.5rem] bg-[linear-gradient(160deg,#7a2430,#3f5a4a)] p-6 text-white md:p-8">
          <h3 className="font-[family-name:var(--font-display)] text-2xl">Условия</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/90">
            <li>• До 2 моделей на примерку</li>
            <li>• От 15 000 ₽ — бесплатно, иначе 600 ₽</li>
            <li>• Доступно для жителей Москвы</li>
            <li>• Один из ковров обычно остаётся у вас</li>
          </ul>
          <Link href="/katalog" className="btn-on-dark mt-8">
            Добавить к примерке
          </Link>
        </aside>
      </section>
    </div>
  );
}
