"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { useTransition } from "react";

const sorts = [
  { value: "popular", label: "По популярности" },
  { value: "new", label: "По новизне" },
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" },
  { value: "discount", label: "По скидке" },
];

export function CatalogToolbar({
  total,
  onOpenFilters,
}: {
  total: number;
  onOpenFilters: () => void;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const sort = params.get("sort") ?? "popular";

  return (
    <div className={`mb-5 flex flex-wrap items-center justify-between gap-3 ${pending ? "opacity-70" : ""}`}>
      <p className="text-sm text-ink-soft">
        Найдено: <span className="font-semibold text-ink">{total.toLocaleString("ru-RU")}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenFilters}
          className="btn-secondary !px-3 !py-2 text-sm lg:hidden"
        >
          <SlidersHorizontal size={16} /> Фильтры
        </button>
        <select
          value={sort}
          onChange={(e) => {
            const next = new URLSearchParams(params.toString());
            next.set("sort", e.target.value);
            next.delete("page");
            startTransition(() => router.push(`/katalog?${next.toString()}`));
          }}
          className="rounded-full border border-line bg-bg-elevated px-3 py-2 text-sm outline-none"
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
