"use client";

import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useShopStore, type SavedProduct } from "@/store/shop-store";
import { GitCompareArrows, Heart, MessageCircle, Ruler, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";

function toSaved(product: Product): SavedProduct {
  return {
    id: product.id,
    sku: product.sku,
    slug: product.slug,
    name: product.name,
    price: product.price,
    oldPrice: product.oldPrice,
    discount: product.discount,
    image: product.image,
    available: product.available,
    collection: product.collection,
    country: product.country,
    material: product.material,
    materialKind: product.materialKind,
    form: product.form,
    style: product.style,
    pileHeight: product.pileHeight,
    density: product.density,
    color: product.color,
    size: product.size,
    tags: product.tags,
    rooms: product.rooms,
    isNew: product.isNew,
    isPopular: product.isPopular,
    searchText: product.searchText,
    category: product.category,
    categoryId: product.categoryId,
  };
}

export function ProductBuyBox({ product }: { product: Product }) {
  const sizes = useMemo(() => {
    const fromParam = product.params["Размер"] || product.size;
    if (fromParam) return [fromParam];
    return ["Стандартный размер", "Под заказ / обрезка"];
  }, [product]);
  const [size, setSize] = useState(sizes[0]);
  const saved = useMemo(() => toSaved(product), [product]);

  const addToCart = useShopStore((s) => s.addToCart);
  const toggleFavorite = useShopStore((s) => s.toggleFavorite);
  const toggleTryOn = useShopStore((s) => s.toggleTryOn);
  const toggleCompare = useShopStore((s) => s.toggleCompare);
  const fav = useShopStore((s) => s.favorites.some((x) => x.id === product.id));
  const tryItem = useShopStore((s) => s.tryOn.some((x) => x.id === product.id));
  const cmp = useShopStore((s) => s.compare.some((x) => x.id === product.id));

  return (
    <div className="rounded-[1.6rem] border border-line bg-bg-elevated p-5 md:p-7">
      <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">
        Артикул {product.sku}
        {product.collection ? ` · ${product.collection}` : ""}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-tight md:text-4xl">
        {product.name}
      </h1>

      <div className="mt-5 flex items-end gap-3">
        <div className="text-3xl font-semibold tracking-tight">{formatPrice(product.price)}</div>
        {product.oldPrice ? (
          <div className="pb-1 text-sm text-ink-soft line-through">
            {formatPrice(product.oldPrice)}
          </div>
        ) : null}
        {product.discount ? (
          <span className="mb-1 rounded-full bg-burgundy px-2.5 py-1 text-xs font-semibold text-white">
            −{product.discount}%
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-sm text-ink-soft">
        {product.available ? "В наличии на складе" : "Под заказ"}
        {product.country ? ` · ${product.country}` : ""}
        {product.material ? ` · ${product.material}` : ""}
      </p>

      <div className="mt-6">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
          Размер
        </label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`rounded-full border px-3 py-2 text-sm ${
                size === s
                  ? "border-burgundy bg-burgundy/10 text-burgundy"
                  : "border-line text-ink-soft"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          className="btn-primary w-full"
          onClick={() =>
            addToCart({
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
            })
          }
        >
          <ShoppingBag size={18} /> Купить
        </button>
        <button
          type="button"
          className={`btn-secondary w-full ${tryItem ? "!border-sage !text-sage" : ""}`}
          onClick={() => toggleTryOn(saved)}
        >
          <Ruler size={18} /> {tryItem ? "В списке примерки" : "Добавить к примерке"}
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className={`btn-secondary ${cmp ? "!border-slate-blue !text-slate-blue" : ""}`}
            onClick={() => toggleCompare(saved)}
          >
            <GitCompareArrows size={16} /> {cmp ? "В сравнении" : "Сравнить"}
          </button>
          <button
            type="button"
            className={`btn-secondary ${fav ? "!border-burgundy !text-burgundy" : ""}`}
            onClick={() => toggleFavorite(saved)}
          >
            <Heart size={16} /> {fav ? "В избранном" : "В избранное"}
          </button>
        </div>
        {cmp ? (
          <Link href="/compare" className="text-center text-sm font-medium text-slate-blue hover:underline">
            Открыть сравнение →
          </Link>
        ) : null}
        <a href="/kontakty" className="btn-secondary w-full">
          <MessageCircle size={16} /> Задать вопрос
        </a>
      </div>
    </div>
  );
}
