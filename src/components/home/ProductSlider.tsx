"use client";

import type { ProductIndex } from "@/lib/types";
import { ProductCard } from "@/components/catalog/ProductCard";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductSlider({
  title,
  subtitle,
  products,
  href,
}: {
  title: string;
  subtitle?: string;
  products: ProductIndex[];
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section className="container-page py-10 md:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">{title}</h2>
          {subtitle ? <p className="mt-2 text-sm text-ink-soft">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-line bg-bg-elevated p-2"
            onClick={() => ref.current?.scrollBy({ left: -320, behavior: "smooth" })}
            aria-label="Назад"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="rounded-full border border-line bg-bg-elevated p-2"
            onClick={() => ref.current?.scrollBy({ left: 320, behavior: "smooth" })}
            aria-label="Вперёд"
          >
            <ChevronRight size={18} />
          </button>
          <Link href={href} className="ml-2 hidden text-sm font-medium text-burgundy sm:inline">
            Смотреть все
          </Link>
        </div>
      </div>
      <div ref={ref} className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin snap-x">
        {products.map((p, i) => (
          <div
            key={p.id}
            className="w-[260px] shrink-0 snap-start sm:w-[300px]"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
