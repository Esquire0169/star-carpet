"use client";

import { useState } from "react";
import { CatalogFilters } from "./CatalogFilters";
import { CatalogToolbar } from "./CatalogToolbar";
import { ProductCard } from "./ProductCard";
import type { CatalogFilters as Filters, ProductIndex } from "@/lib/types";
import Link from "next/link";
import { X } from "lucide-react";

export function CatalogClient({
  filters,
  items,
  total,
  page,
  totalPages,
  queryString,
}: {
  filters: Filters;
  items: ProductIndex[];
  total: number;
  page: number;
  totalPages: number;
  queryString: string;
}) {
  const [open, setOpen] = useState(false);

  const pageHref = (p: number) => {
    const params = new URLSearchParams(queryString);
    if (p <= 1) params.delete("page");
    else params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/katalog?${qs}` : "/katalog";
  };

  return (
    <div className="container-page py-8 md:py-12">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">Каталог</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl md:text-5xl">
          Ковры для дома и интерьера
        </h1>
        <p className="mt-3 text-ink-soft">
          Фильтры по материалу, стране, цвету, форме, ворсу и сценарию комнаты. Поиск по названию
          и артикулу.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <CatalogFilters filters={filters} />
        </div>

        <div>
          <CatalogToolbar total={total} onOpenFilters={() => setOpen(true)} />
          <div className="stagger grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-3">
            {items.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                style={{ animationDelay: `${(i % 9) * 0.05}s` }}
              />
            ))}
          </div>
          {items.length === 0 && (
            <div className="rounded-[1.4rem] border border-dashed border-line bg-bg-elevated p-10 text-center">
              <p className="text-lg font-medium">Ничего не найдено</p>
              <p className="mt-2 text-sm text-ink-soft">Смягчите фильтры или сбросьте поиск</p>
              <Link href="/katalog" className="btn-primary mt-5 inline-flex">
                Сбросить фильтры
              </Link>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: Math.min(totalPages, 8) }, (_, i) => {
                const p =
                  totalPages <= 8
                    ? i + 1
                    : Math.min(Math.max(page - 3, 1) + i, totalPages);
                return (
                  <Link
                    key={`${p}-${i}`}
                    href={pageHref(p)}
                    className={`grid h-10 min-w-10 place-items-center rounded-full px-3 text-sm ${
                      p === page
                        ? "bg-burgundy text-white"
                        : "border border-line bg-bg-elevated text-ink-soft"
                    }`}
                  >
                    {p}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink/40 lg:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-auto rounded-t-[1.6rem] bg-bg p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex justify-end">
              <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть">
                <X size={20} />
              </button>
            </div>
            <CatalogFilters filters={filters} mobile onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
