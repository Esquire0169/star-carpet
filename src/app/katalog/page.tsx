import { Suspense } from "react";
import { CatalogPageClient } from "@/components/catalog/CatalogPageClient";
import { getFilterOptions } from "@/lib/catalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог ковров",
  description:
    "Каталог ковров Star Carpet с фильтрами по материалу, стране, цвету, форме, ворсу и цене.",
};

export default function CatalogPage() {
  const filters = getFilterOptions();

  return (
    <Suspense fallback={<div className="container-page py-20">Загрузка каталога…</div>}>
      <CatalogPageClient filters={filters} />
    </Suspense>
  );
}
