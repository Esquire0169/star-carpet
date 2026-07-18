"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CatalogClient } from "./CatalogClient";
import { filterCatalogItems } from "@/lib/catalog-filter";
import { withBase } from "@/lib/base-path";
import type { CatalogFilters, CatalogQuery, ProductIndex, SortKey } from "@/lib/types";

export function CatalogPageClient({ filters }: { filters: CatalogFilters }) {
  const params = useSearchParams();
  const [all, setAll] = useState<ProductIndex[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(withBase("/data/products-index.json"))
      .then((r) => {
        if (!r.ok) throw new Error("Не удалось загрузить каталог");
        return r.json();
      })
      .then((data: ProductIndex[]) => {
        if (!cancelled) setAll(data);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const query: CatalogQuery = useMemo(
    () => ({
      q: params.get("q") ?? undefined,
      material: params.get("material") ?? undefined,
      country: params.get("country") ?? undefined,
      color: params.get("color") ?? undefined,
      form: params.get("form") ?? undefined,
      style: params.get("style") ?? undefined,
      pile: params.get("pile") ?? undefined,
      tag: params.get("tag") ?? undefined,
      room: params.get("room") ?? undefined,
      collection: params.get("collection") ?? undefined,
      materialKind: params.get("materialKind") ?? undefined,
      minPrice: params.get("minPrice") ? Number(params.get("minPrice")) : undefined,
      maxPrice: params.get("maxPrice") ? Number(params.get("maxPrice")) : undefined,
      sort: (params.get("sort") as SortKey) || "popular",
      page: params.get("page") ? Number(params.get("page")) : 1,
    }),
    [params],
  );

  const result = useMemo(
    () => (all ? filterCatalogItems(all, query) : null),
    [all, query],
  );

  const queryString = params.toString();

  if (error) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-lg font-medium">Ошибка загрузки каталога</p>
        <p className="mt-2 text-sm text-ink-soft">{error}</p>
      </div>
    );
  }

  if (!result) {
    return <div className="container-page py-20 text-center text-ink-soft">Загрузка каталога…</div>;
  }

  return (
    <CatalogClient
      filters={filters}
      items={result.items}
      total={result.total}
      page={result.page}
      totalPages={result.totalPages}
      queryString={queryString}
    />
  );
}
