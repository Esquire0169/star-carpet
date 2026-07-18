import { BadgeCheck, PackageOpen, Sofa, Sparkles, Truck } from "lucide-react";

const items = [
  {
    icon: Sofa,
    title: "Примерка в Москве",
    text: "Привезём до 2 моделей домой — оплачиваете только то, что подошло.",
  },
  {
    icon: Truck,
    title: "Бесплатная доставка",
    text: "В крупные города России при заказе от 10 000 ₽ — быстро и аккуратно.",
  },
  {
    icon: PackageOpen,
    title: "Большие остатки",
    text: "Складской ассортимент обновляется постоянно — есть что выбрать сразу.",
  },
  {
    icon: Sparkles,
    title: "Качественные материалы",
    text: "Шерсть, шёлк, вискоза, полипропилен и другие — от фабрик со всего мира.",
  },
  {
    icon: BadgeCheck,
    title: "Сертификаты и доверие",
    text: "Работаем с 2008 года, помогаем семьям, дизайнерам и оптовым клиентам.",
  },
];

export function WhyUs() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">Почему Star-Carpet</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl md:text-4xl">
          Сервис, который упрощает выбор
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => (
          <article
            key={item.title}
            className="group rounded-[1.4rem] border border-line bg-bg-elevated/80 p-5"
          >
            <div className="icon-pulse mb-5 inline-flex rounded-2xl bg-sand p-3 text-burgundy">
              <item.icon size={22} />
            </div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
