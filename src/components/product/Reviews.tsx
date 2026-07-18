const reviews = [
  {
    name: "Анна К.",
    rating: 5,
    text: "Заказывали примерку двух ковров в гостиную — привезли аккуратно, помогли разложить. Выбрали с первого раза, доставка в тот же день.",
  },
  {
    name: "Игорь М.",
    rating: 5,
    text: "Нужен был ковёр для офиса оптом — менеджер быстро подобрал коллекцию, сделали выгодную цену и отправили ТК без задержек.",
  },
  {
    name: "Елена В.",
    rating: 4,
    text: "Большой выбор турецких и бельгийских моделей. Порадовало, что можно искать по артикулу и сразу видеть высоту ворса.",
  },
];

export function Reviews() {
  return (
    <section className="rounded-[1.5rem] border border-line bg-bg-elevated p-6 md:p-8">
      <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl">Отзывы</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <article key={r.name} className="rounded-2xl bg-sand/50 p-5">
            <div className="mb-2 text-burgundy">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
            <p className="text-sm leading-relaxed text-ink-soft">{r.text}</p>
            <p className="mt-4 text-sm font-semibold">{r.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
