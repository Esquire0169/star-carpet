export type ProductIndex = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  price: number;
  oldPrice: number | null;
  discount: number | null;
  image: string;
  available: boolean;
  collection: string;
  country: string;
  material: string;
  materialKind: string;
  form: string;
  style: string;
  pileHeight: string;
  density: string;
  color: string;
  size: string;
  tags: string[];
  rooms: string[];
  isNew: boolean;
  isPopular: boolean;
  searchText: string;
  category: string;
  categoryId: string;
};

export type Product = ProductIndex & {
  url: string;
  currency: string;
  images: string[];
  description: string;
  manufacturer: string;
  production: string;
  pileComposition: string;
  params: Record<string, string>;
};

export type Collection = {
  name: string;
  slug: string;
  count: number;
  image: string;
  description: string;
};

export type CatalogFilters = {
  materials: string[];
  countries: string[];
  colors: string[];
  forms: string[];
  styles: string[];
  pileHeights: string[];
  tags: string[];
  rooms: { id: string; label: string }[];
  priceRange: { min: number; max: number };
};

export type SortKey = "popular" | "new" | "price-asc" | "price-desc" | "discount";

export type CatalogQuery = {
  q?: string;
  material?: string;
  country?: string;
  color?: string;
  form?: string;
  style?: string;
  pile?: string;
  tag?: string;
  room?: string;
  collection?: string;
  materialKind?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortKey;
  page?: number;
};
