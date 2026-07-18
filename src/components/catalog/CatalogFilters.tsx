"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import type { CatalogFilters as Filters } from "@/lib/types";

type Props = {
  filters: Filters;
  mobile?: boolean;
  onClose?: () => void;
};

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-line py-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function CatalogFilters({ filters, mobile, onClose }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [minPrice, setMinPrice] = useState(params.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(params.get("maxPrice") ?? "");

  const current = useMemo(() => {
    return {
      material: params.get("material") ?? "",
      country: params.get("country") ?? "",
      color: params.get("color") ?? "",
      form: params.get("form") ?? "",
      style: params.get("style") ?? "",
      pile: params.get("pile") ?? "",
      tag: params.get("tag") ?? "",
      room: params.get("room") ?? "",
      materialKind: params.get("materialKind") ?? "",
    };
  }, [params]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    next.delete("page");
    startTransition(() => {
      router.push(`/katalog?${next.toString()}`);
      onClose?.();
    });
  };

  const applyPrice = () => {
    const next = new URLSearchParams(params.toString());
    if (minPrice) next.set("minPrice", minPrice);
    else next.delete("minPrice");
    if (maxPrice) next.set("maxPrice", maxPrice);
    else next.delete("maxPrice");
    next.delete("page");
    startTransition(() => {
      router.push(`/katalog?${next.toString()}`);
      onClose?.();
    });
  };

  const reset = () => {
    startTransition(() => {
      router.push("/katalog");
      onClose?.();
    });
  };

  const checkbox = (
    key: keyof typeof current,
    value: string,
    label = value,
  ) => {
    const active = current[key] === value;
    return (
      <label key={`${key}-${value}`} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
        <input
          type="checkbox"
          checked={active}
          onChange={() => setParam(key, active ? "" : value)}
          className="size-4 rounded border-line accent-[var(--burgundy)]"
        />
        <span className={active ? "text-ink" : "text-ink-soft"}>{label}</span>
      </label>
    );
  };

  return (
    <aside
      className={`rounded-[1.4rem] border border-line bg-bg-elevated p-4 ${
        mobile ? "" : "sticky-filters scrollbar-thin"
      } ${pending ? "opacity-70" : ""}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-display)] text-xl">Фильтры</h2>
        <button type="button" onClick={reset} className="text-xs text-burgundy hover:underline">
          Сбросить
        </button>
      </div>

      <FilterGroup title="Сценарий">
        <div className="space-y-1">
          {filters.rooms.map((room) => checkbox("room", room.id, room.label))}
        </div>
      </FilterGroup>

      <FilterGroup title="Цена, ₽">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder={`${filters.priceRange.min}`}
            className="w-full rounded-xl border border-line bg-bg px-3 py-2 text-sm outline-none"
          />
          <span className="text-ink-soft">—</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder={`${filters.priceRange.max}`}
            className="w-full rounded-xl border border-line bg-bg px-3 py-2 text-sm outline-none"
          />
        </div>
        <button type="button" onClick={applyPrice} className="btn-secondary mt-3 w-full !py-2 text-sm">
          Применить
        </button>
      </FilterGroup>

      <FilterGroup title="Материал">
        <div className="mb-2 flex gap-2">
          <button
            type="button"
            onClick={() =>
              setParam("materialKind", current.materialKind === "natural" ? "" : "natural")
            }
            className={`rounded-full px-3 py-1 text-xs ${
              current.materialKind === "natural"
                ? "bg-sage text-white"
                : "bg-sand text-ink-soft"
            }`}
          >
            Натуральные
          </button>
          <button
            type="button"
            onClick={() =>
              setParam("materialKind", current.materialKind === "synthetic" ? "" : "synthetic")
            }
            className={`rounded-full px-3 py-1 text-xs ${
              current.materialKind === "synthetic"
                ? "bg-slate-blue text-white"
                : "bg-sand text-ink-soft"
            }`}
          >
            Искусственные
          </button>
        </div>
        <div className="max-h-40 space-y-1 overflow-auto scrollbar-thin">
          {filters.materials.slice(0, 16).map((m) => checkbox("material", m))}
        </div>
      </FilterGroup>

      <FilterGroup title="Страна">
        <div className="max-h-36 space-y-1 overflow-auto scrollbar-thin">
          {filters.countries.map((c) => checkbox("country", c))}
        </div>
      </FilterGroup>

      <FilterGroup title="Цвет">
        <div className="max-h-36 space-y-1 overflow-auto scrollbar-thin">
          {filters.colors.map((c) => checkbox("color", c))}
        </div>
      </FilterGroup>

      <FilterGroup title="Форма">
        <div className="space-y-1">
          {filters.forms.map((f) => checkbox("form", f))}
        </div>
      </FilterGroup>

      <FilterGroup title="Высота ворса">
        <div className="space-y-1">
          {filters.pileHeights.map((p) => checkbox("pile", p))}
        </div>
      </FilterGroup>

      <FilterGroup title="Теги">
        <div className="space-y-1">
          {filters.tags.map((t) => checkbox("tag", t))}
        </div>
      </FilterGroup>

      {mobile && (
        <button type="button" onClick={onClose} className="btn-primary mt-4 w-full">
          Показать результаты
        </button>
      )}
    </aside>
  );
}
