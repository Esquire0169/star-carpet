"use client";

import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/types";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CollectionsCarousel({ collections }: { collections: Collection[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section className="py-8 md:py-12">
      <div className="container-page mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">Коллекции</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Знаковые линейки бренда
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="rounded-full border border-line bg-bg-elevated p-2"
            aria-label="Назад"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="rounded-full border border-line bg-bg-elevated p-2"
            aria-label="Вперёд"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="container-page flex gap-4 overflow-x-auto pb-4 scrollbar-thin snap-x snap-mandatory"
      >
        {collections.slice(0, 12).map((col) => (
          <article
            key={col.slug}
            className="card-lift w-[280px] shrink-0 snap-start overflow-hidden rounded-[1.4rem] border border-line bg-bg-elevated sm:w-[320px]"
          >
            <div className="relative aspect-[5/4] bg-sand">
              {col.image ? (
                <Image src={col.image} alt={col.name} fill className="img-zoom object-cover" sizes="320px" />
              ) : null}
            </div>
            <div className="p-5">
              <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
                {col.name}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{col.description}</p>
              <Link
                href={`/katalog?collection=${encodeURIComponent(col.name)}`}
                className="btn-secondary mt-5 !px-4 !py-2 text-sm"
              >
                Смотреть коллекцию
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
