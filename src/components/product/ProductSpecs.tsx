import type { Product } from "@/lib/types";

export function ProductSpecs({ product }: { product: Product }) {
  const rows = [
    ["Материал", product.material],
    ["Страна", product.country],
    ["Тип ворса / высота", product.pileHeight],
    ["Состав ворса", product.pileComposition],
    ["Плотность", product.density],
    ["Форма", product.form],
    ["Стиль", product.style],
    ["Способ производства", product.production],
    ["Производитель", product.manufacturer],
    ["Коллекция", product.collection],
    ["Рекомендуемый уход", "Регулярная сухая чистка, химчистка по необходимости"],
    ["Сертификаты", "Соответствует требованиям производителя / сертификаты фабрик"],
  ].filter(([, v]) => Boolean(v));

  return (
    <section className="rounded-[1.5rem] border border-line bg-bg-elevated p-6 md:p-8">
      <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl">Характеристики</h2>
      <dl className="mt-6 divide-y divide-line">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[220px_1fr]">
            <dt className="text-sm text-ink-soft">{label}</dt>
            <dd className="text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>
      {product.description ? (
        <div className="mt-6 border-t border-line pt-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Описание
          </h3>
          <p className="text-sm leading-relaxed text-ink-soft whitespace-pre-line">
            {product.description.replace(/&amp;/g, "&").replace(/&quot;/g, '"').slice(0, 1200)}
          </p>
        </div>
      ) : null}
    </section>
  );
}
