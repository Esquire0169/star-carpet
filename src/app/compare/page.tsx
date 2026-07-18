import { CompareTable } from "@/components/shop/CompareTable";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Сравнение ковров" };

export default function ComparePage() {
  return (
    <div className="container-page py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">Сравнение</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl">Сравнить ковры</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-soft">
            Сопоставьте цену, материал, страну, ворс и другие параметры — до 4 моделей.
          </p>
        </div>
        <Link href="/katalog" className="btn-secondary text-sm">
          Добавить ещё из каталога
        </Link>
      </div>
      <CompareTable />
    </div>
  );
}
