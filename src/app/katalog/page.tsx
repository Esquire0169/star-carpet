import { Suspense } from "react";
import { CatalogClient } from "@/components/catalog/CatalogClient";
import { filterCatalog, getFilterOptions } from "@/lib/catalog";
import type { CatalogQuery, SortKey } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог ковров",
  description:
    "Каталог ковров Star Carpet с фильтрами по материалу, стране, цвету, форме, ворсу и цене.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export default async function CatalogPage({ searchParams }: Props) {
  const sp = await searchParams;
  const query: CatalogQuery = {
    q: first(sp.q),
    material: first(sp.material),
    country: first(sp.country),
    color: first(sp.color),
    form: first(sp.form),
    style: first(sp.style),
    pile: first(sp.pile),
    tag: first(sp.tag),
    room: first(sp.room),
    collection: first(sp.collection),
    materialKind: first(sp.materialKind),
    minPrice: first(sp.minPrice) ? Number(first(sp.minPrice)) : undefined,
    maxPrice: first(sp.maxPrice) ? Number(first(sp.maxPrice)) : undefined,
    sort: (first(sp.sort) as SortKey) || "popular",
    page: first(sp.page) ? Number(first(sp.page)) : 1,
  };

  const result = filterCatalog(query);
  const filters = getFilterOptions();
  const qs = new URLSearchParams();
  Object.entries(sp).forEach(([k, v]) => {
    const val = first(v);
    if (val) qs.set(k, val);
  });

  return (
    <Suspense fallback={<div className="container-page py-20">Загрузка каталога…</div>}>
      <CatalogClient
        filters={filters}
        items={result.items}
        total={result.total}
        page={result.page}
        totalPages={result.totalPages}
        queryString={qs.toString()}
      />
    </Suspense>
  );
}
