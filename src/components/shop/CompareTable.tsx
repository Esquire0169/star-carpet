"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { useShopStore, type SavedProduct } from "@/store/shop-store";

const rows: { key: keyof SavedProduct | "priceDisplay"; label: string; render: (p: SavedProduct) => string }[] = [
  {
    key: "priceDisplay",
    label: "Цена",
    render: (p) => formatPrice(p.price),
  },
  { key: "sku", label: "Артикул", render: (p) => p.sku || "—" },
  { key: "collection", label: "Коллекция", render: (p) => p.collection || "—" },
  { key: "country", label: "Страна", render: (p) => p.country || "—" },
  { key: "material", label: "Материал", render: (p) => p.material || "—" },
  { key: "form", label: "Форма", render: (p) => p.form || "—" },
  { key: "color", label: "Цвет", render: (p) => p.color || "—" },
  { key: "pileHeight", label: "Высота ворса", render: (p) => p.pileHeight || "—" },
  { key: "density", label: "Плотность", render: (p) => p.density || "—" },
  { key: "style", label: "Стиль", render: (p) => p.style || "—" },
  { key: "size", label: "Размер", render: (p) => p.size || "—" },
  {
    key: "available",
    label: "Наличие",
    render: (p) => (p.available ? "В наличии" : "Под заказ"),
  },
  {
    key: "tags",
    label: "Теги",
    render: (p) => (p.tags?.length ? p.tags.join(", ") : "—"),
  },
];

export function CompareTable() {
  const [mounted, setMounted] = useState(false);
  const items = useShopStore((s) => s.compare);
  const toggleCompare = useShopStore((s) => s.toggleCompare);
  const clearCompare = useShopStore((s) => s.clearCompare);
  const addToCart = useShopStore((s) => s.addToCart);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="rounded-[1.4rem] border border-line bg-bg-elevated p-10 text-center text-ink-soft">
        Загрузка сравнения…
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-[1.4rem] border border-dashed border-line bg-bg-elevated p-10 text-center">
        <p className="text-lg font-medium">Список сравнения пуст</p>
        <p className="mt-2 text-sm text-ink-soft">
          Нажмите «Сравнить» на карточке товара — можно добавить до 4 ковров.
        </p>
        <Link href="/katalog" className="btn-primary mt-5 inline-flex">
          Выбрать ковры
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">
          В сравнении: <span className="font-semibold text-ink">{items.length}</span> из 4
        </p>
        <button type="button" onClick={clearCompare} className="text-sm text-burgundy hover:underline">
          Очистить всё
        </button>
      </div>

      <div className="overflow-x-auto rounded-[1.4rem] border border-line bg-bg-elevated scrollbar-thin">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 min-w-[140px] bg-bg-elevated p-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
                Параметр
              </th>
              {items.map((p) => (
                <th key={p.id} className="min-w-[220px] max-w-[260px] p-4 align-top">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleCompare(p)}
                      className="absolute right-0 top-0 rounded-full border border-line bg-bg p-1.5 text-ink-soft hover:text-burgundy"
                      aria-label="Убрать из сравнения"
                    >
                      <X size={14} />
                    </button>
                    <Link href={`/katalog/${encodeURIComponent(p.slug)}`} className="block">
                      <div className="relative mx-auto aspect-square w-full max-w-[180px] overflow-hidden rounded-2xl bg-sand">
                        {p.image ? (
                          <Image src={p.image} alt={p.name} fill className="object-cover" sizes="180px" />
                        ) : null}
                      </div>
                      <p className="mt-3 line-clamp-2 text-left font-medium leading-snug hover:text-burgundy">
                        {p.name}
                      </p>
                    </Link>
                    <div className="mt-2 text-left text-lg font-semibold">{formatPrice(p.price)}</div>
                    {p.oldPrice ? (
                      <div className="text-left text-xs text-ink-soft line-through">
                        {formatPrice(p.oldPrice)}
                      </div>
                    ) : null}
                    <button
                      type="button"
                      className="btn-primary mt-3 w-full !py-2 text-xs"
                      onClick={() =>
                        addToCart({
                          id: p.id,
                          slug: p.slug,
                          name: p.name,
                          price: p.price,
                          image: p.image,
                        })
                      }
                    >
                      <ShoppingBag size={14} /> В корзину
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.key} className={idx % 2 === 0 ? "bg-sand/35" : ""}>
                <th className="sticky left-0 z-10 bg-inherit p-4 text-left font-medium text-ink-soft">
                  {row.label}
                </th>
                {items.map((p) => (
                  <td key={`${p.id}-${row.key}`} className="p-4 align-top text-ink">
                    {row.render(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
