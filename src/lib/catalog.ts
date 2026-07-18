import "server-only";

import fs from "fs";
import path from "path";
import type {
  CatalogFilters,
  CatalogQuery,
  Collection,
  Product,
  ProductIndex,
} from "./types";
import { filterCatalogItems, sortProducts } from "./catalog-filter";

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

export function filterCatalog(query: CatalogQuery) {
  return filterCatalogItems(getProductsIndex(), query);
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
  return sortProducts(
    getProductsIndex().filter((p) => p.image),
    "new",
  ).slice(0, limit);
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
