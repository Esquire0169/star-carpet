import Link from "next/link";

const columns = [
  {
    title: "Покупателям",
    links: [
      { href: "/katalog", label: "Каталог" },
      { href: "/primerka-kovrov", label: "Примерка в Москве" },
      { href: "/dostavka-i-oplata", label: "Доставка и оплата" },
      { href: "/stati", label: "Как выбрать ковёр" },
    ],
  },
  {
    title: "Бизнесу",
    links: [
      { href: "/optovikam", label: "Оптовым клиентам" },
      { href: "/kontakty", label: "Контакты" },
      { href: "/o-kompanii", label: "О компании" },
    ],
  },
  {
    title: "Сценарии",
    links: [
      { href: "/katalog?room=gostinaya", label: "Для гостиной" },
      { href: "/katalog?room=spalnya", label: "Для спальни" },
      { href: "/katalog?room=detskaya", label: "Для детской" },
      { href: "/katalog?room=koridor", label: "Для коридора" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-[linear-gradient(180deg,#efe8dc_0%,#e7dfd2_100%)]">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="font-[family-name:var(--font-display)] text-3xl tracking-[0.04em]">
            STAR‑CARPET
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            Современный магазин ковров со всего мира: Турция, Иран, Бельгия, Египет, Россия и
            другие страны. Примерка в Москве, бесплатная доставка в крупные города, опт для
            дизайнеров и гостиниц.
          </p>
          <div className="mt-5 space-y-1 text-sm">
            <a href="tel:+79015194267" className="block font-medium hover:text-burgundy">
              8 (901) 519-42-67
            </a>
            <a href="tel:+79154497818" className="block font-medium hover:text-burgundy">
              8 (915) 449-78-18
            </a>
            <p className="pt-2 text-ink-soft">Москва, ул. Свободы, 29, ТЦ «Свобода Мебель»</p>
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
              {col.title}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-burgundy">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line/70">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Star Carpet</span>
          <span>ИП Кодиров Д.О.</span>
        </div>
      </div>
    </footer>
  );
}
