import "server-only";

import fs from "fs";
import path from "path";
import type {
  CatalogFilters,
  CatalogQuery,
  Collection,
  Product,
  ProductIndex,
  SortKey,
} from "./types";

const dataDir = path.join(process.cwd(), "src/data");

let indexCache: ProductIndex[] | null = null;
let productsCache: Product[] | null = null;
let productBySlug: Map<string, Product> | null = null;

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf-8")) as T;
}

export function getProductsIndex(): ProductIndex[] {
  if (!indexCache) {
    indexCache = readJson<ProductIndex[]>("products-index.json");
  }
  return indexCache;
}

export function getAllProducts(): Product[] {
  if (!productsCache) {
    productsCache = readJson<Product[]>("products.json");
  }
  return productsCache;
}

export function getProductBySlug(slug: string): Product | undefined {
  if (!productBySlug) {
    productBySlug = new Map(getAllProducts().map((p) => [p.slug, p]));
  }
  return productBySlug.get(decodeURIComponent(slug));
}

export function getCollections(): Collection[] {
  return readJson<Collection[]>("collections.json");
}

export function getFilterOptions(): CatalogFilters {
  return readJson<CatalogFilters>("filters.json");
}

export function getMeta() {
  return readJson<{
    productCount: number;
    categoryCount: number;
    collectionCount: number;
    importedAt: string;
  }>("meta.json");
}

function matchesMulti(value: string, needle?: string): boolean {
  if (!needle) return true;
  if (!value) return false;
  return value.toLowerCase().includes(needle.toLowerCase());
}

function sortProducts(items: ProductIndex[], sort: SortKey = "popular"): ProductIndex[] {
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

export function filterCatalog(query: CatalogQuery): {
  items: ProductIndex[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} {
  const pageSize = 24;
  const page = Math.max(1, query.page ?? 1);
  let items = getProductsIndex();

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
  if (query.minPrice != null)
    items = items.filter((p) => p.price >= query.minPrice!);
  if (query.maxPrice != null)
    items = items.filter((p) => p.price <= query.maxPrice!);

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

export function getPopularProducts(limit = 12): ProductIndex[] {
  return sortProducts(
    getProductsIndex().filter((p) => p.isPopular && p.image),
    "popular",
  ).slice(0, limit);
}

export function getNewProducts(limit = 12): ProductIndex[] {
  const news = getProductsIndex().filter((p) => p.isNew && p.image);
  if (news.length >= limit) return sortProducts(news, "new").slice(0, limit);
  return sortProducts(getProductsIndex().filter((p) => p.image), "new").slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 8): ProductIndex[] {
  const scored = getProductsIndex()
    .filter((p) => p.id !== product.id && p.image)
    .map((p) => {
      let score = 0;
      if (p.collection && p.collection === product.collection) score += 5;
      if (p.country && p.country === product.country) score += 2;
      if (p.material && p.material === product.material) score += 2;
      if (p.color && p.color === product.color) score += 1;
      if (Math.abs(p.price - product.price) < product.price * 0.3) score += 1;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.p);
}

export function getOftenBought(product: Product, limit = 4): ProductIndex[] {
  // Complementary: runners / underlays / different form nearby price
  const pool = getProductsIndex().filter(
    (p) =>
      p.id !== product.id &&
      p.image &&
      (p.tags.includes("дорожка") ||
        p.category.toLowerCase().includes("подлож") ||
        (p.form && p.form !== product.form)),
  );
  return sortProducts(pool, "popular").slice(0, limit);
}
