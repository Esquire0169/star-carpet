import type { CatalogQuery, ProductIndex, SortKey } from "./types";

function matchesMulti(value: string, needle?: string): boolean {
  if (!needle) return true;
  if (!value) return false;
  return value.toLowerCase().includes(needle.toLowerCase());
}

export function sortProducts(
  items: ProductIndex[],
  sort: SortKey = "popular",
): ProductIndex[] {
  const copy = [...items];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "new":
      return copy.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.price - a.price);
    case "discount":
      return copy.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0) || a.price - b.price);
    case "popular":
    default:
      return copy.sort(
        (a, b) => Number(b.isPopular) - Number(a.isPopular) || (b.discount ?? 0) - (a.discount ?? 0),
      );
  }
}

export function filterCatalogItems(
  all: ProductIndex[],
  query: CatalogQuery,
): {
  items: ProductIndex[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} {
  const pageSize = 24;
  const page = Math.max(1, query.page ?? 1);
  let items = all;

  if (query.q) {
    const q = query.q.toLowerCase().trim();
    items = items.filter(
      (p) =>
        p.searchText.includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q),
    );
  }
  if (query.material) items = items.filter((p) => matchesMulti(p.material, query.material));
  if (query.country) items = items.filter((p) => matchesMulti(p.country, query.country));
  if (query.color) items = items.filter((p) => matchesMulti(p.color, query.color));
  if (query.form) items = items.filter((p) => matchesMulti(p.form, query.form));
  if (query.style) items = items.filter((p) => matchesMulti(p.style, query.style));
  if (query.pile) items = items.filter((p) => matchesMulti(p.pileHeight, query.pile));
  if (query.collection)
    items = items.filter((p) => matchesMulti(p.collection, query.collection));
  if (query.materialKind)
    items = items.filter((p) => p.materialKind === query.materialKind);
  if (query.tag) items = items.filter((p) => p.tags.includes(query.tag!));
  if (query.room) items = items.filter((p) => p.rooms.includes(query.room!));
  if (query.minPrice != null) items = items.filter((p) => p.price >= query.minPrice!);
  if (query.maxPrice != null) items = items.filter((p) => p.price <= query.maxPrice!);

  items = sortProducts(items, query.sort ?? "popular");
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    totalPages,
  };
}
