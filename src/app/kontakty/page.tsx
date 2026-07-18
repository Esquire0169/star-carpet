import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты магазина ковров Star Carpet в Москве: телефоны, адрес шоурума, консультации.",
};

export default function ContactsPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-ink-soft">Связь</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl md:text-5xl">Контакты</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-[1.5rem] border border-line bg-bg-elevated p-6 md:p-8">
          <h2 className="text-xl font-semibold">Телефоны</h2>
          <div className="mt-4 space-y-2">
            <a href="tel:+79015194267" className="block text-lg hover:text-burgundy">
              8 (901) 519-42-67
            </a>
            <a href="tel:+79154497818" className="block text-lg hover:text-burgundy">
              8 (915) 449-78-18
            </a>
          </div>
          <h2 className="mt-8 text-xl font-semibold">Шоурум</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Москва, ул. Свободы, 29
            <br />
            ТЦ «Свобода Мебель», 2 этаж, помещения 14 и 15
            <br />
            м. Сходненская
          </p>
        </div>
        <div className="rounded-[1.5rem] bg-sand p-6 md:p-8">
          <h2 className="text-xl font-semibold">Напишите нам</h2>
          <p className="mt-3 text-sm text-ink-soft">
            Нужна консультация по размеру, материалу, опту или примерке? Позвоните или оставьте
            заявку — перезвоним и поможем подобрать ковёр.
          </p>
          <form className="mt-6 space-y-3">
            <input
              placeholder="Имя"
              className="w-full rounded-xl border border-line bg-bg-elevated px-4 py-3 text-sm outline-none"
            />
            <input
              placeholder="Телефон"
              className="w-full rounded-xl border border-line bg-bg-elevated px-4 py-3 text-sm outline-none"
            />
            <textarea
              placeholder="Вопрос"
              rows={4}
              className="w-full rounded-xl border border-line bg-bg-elevated px-4 py-3 text-sm outline-none"
            />
            <button type="button" className="btn-primary w-full">
              Отправить заявку
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
