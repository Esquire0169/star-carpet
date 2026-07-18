"use client";

import Image from "next/image";
import Link from "next/link";
import { GitCompareArrows, Heart, Ruler, ShoppingBag } from "lucide-react";
import type { ProductIndex } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useShopStore } from "@/store/shop-store";

type Props = {
  product: ProductIndex;
  style?: React.CSSProperties;
};

export function ProductCard({ product, style }: Props) {
  const addToCart = useShopStore((s) => s.addToCart);
  const toggleFavorite = useShopStore((s) => s.toggleFavorite);
  const toggleCompare = useShopStore((s) => s.toggleCompare);
  const toggleTryOn = useShopStore((s) => s.toggleTryOn);
  const fav = useShopStore((s) => s.favorites.some((x) => x.id === product.id));
  const cmp = useShopStore((s) => s.compare.some((x) => x.id === product.id));
  const tryItem = useShopStore((s) => s.tryOn.some((x) => x.id === product.id));

  return (
    <article
      className="card-lift group relative flex flex-col overflow-hidden rounded-[1.35rem] border border-line bg-bg-elevated"
      style={style}
    >
      <Link href={`/katalog/${encodeURIComponent(product.slug)}`} className="relative block">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width:768px) 50vw, 320px"
              className="img-zoom object-cover"
            />
          ) : (
            <div className="grid h-full place-items-center text-sm text-ink-soft">Нет фото</div>
          )}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.discount ? (
              <span className="rounded-full bg-burgundy px-2.5 py-1 text-[11px] font-semibold text-white">
                −{product.discount}%
              </span>
            ) : null}
            {product.isNew ? (
              <span className="rounded-full bg-sage px-2.5 py-1 text-[11px] font-semibold text-white">
                Новинка
              </span>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/katalog/${encodeURIComponent(product.slug)}`}>
          <h3 className="line-clamp-2 min-h-[2.8em] text-[15px] font-medium leading-snug tracking-[-0.01em]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-soft">
          {product.material && <span>{product.material.split(",")[0]}</span>}
          {product.country && <span>{product.country}</span>}
          {product.pileHeight && <span>{product.pileHeight}</span>}
        </div>
        {product.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-sand/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-ink-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <div className="text-lg font-semibold tracking-tight">{formatPrice(product.price)}</div>
            {product.oldPrice ? (
              <div className="text-xs text-ink-soft line-through">
                {formatPrice(product.oldPrice)}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            className="btn-primary !px-3 !py-2.5 text-sm"
            onClick={() =>
              addToCart({
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
            aria-label="В корзину"
          >
            <ShoppingBag size={16} />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleTryOn(product);
            }}
            className={`flex items-center justify-center gap-1 rounded-xl border px-2 py-2 text-[11px] ${
              tryItem ? "border-sage bg-sage/10 text-sage" : "border-line text-ink-soft"
            }`}
          >
            <Ruler size={13} /> Примерка
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(product);
            }}
            className={`flex items-center justify-center gap-1 rounded-xl border px-2 py-2 text-[11px] ${
              cmp ? "border-slate-blue bg-slate-blue/10 text-slate-blue" : "border-line text-ink-soft"
            }`}
          >
            <GitCompareArrows size={13} /> {cmp ? "В сравнении" : "Сравнить"}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product);
            }}
            className={`flex items-center justify-center gap-1 rounded-xl border px-2 py-2 text-[11px] ${
              fav ? "border-burgundy bg-burgundy/10 text-burgundy" : "border-line text-ink-soft"
            }`}
          >
            <Heart size={13} /> {fav ? "В избранном" : "В избранное"}
          </button>
        </div>
      </div>
    </article>
  );
}
