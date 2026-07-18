"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

export type SavedProduct = {
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

type ShopState = {
  cart: CartItem[];
  favorites: SavedProduct[];
  compare: SavedProduct[];
  tryOn: SavedProduct[];
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  toggleFavorite: (product: SavedProduct) => void;
  toggleCompare: (product: SavedProduct) => boolean | void;
  toggleTryOn: (product: SavedProduct) => void;
  clearTryOn: () => void;
  clearCompare: () => void;
  isFavorite: (id: string) => boolean;
  isCompare: (id: string) => boolean;
  isTryOn: (id: string) => boolean;
};

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],
      compare: [],
      tryOn: [],
      addToCart: (item, qty = 1) => {
        const existing = get().cart.find((c) => c.id === item.id);
        if (existing) {
          set({
            cart: get().cart.map((c) =>
              c.id === item.id ? { ...c, qty: c.qty + qty } : c,
            ),
          });
        } else {
          set({ cart: [...get().cart, { ...item, qty }] });
        }
      },
      removeFromCart: (id) => set({ cart: get().cart.filter((c) => c.id !== id) }),
      setQty: (id, qty) =>
        set({
          cart: get().cart
            .map((c) => (c.id === id ? { ...c, qty } : c))
            .filter((c) => c.qty > 0),
        }),
      toggleFavorite: (product) => {
        const has = get().favorites.some((x) => x.id === product.id);
        set({
          favorites: has
            ? get().favorites.filter((x) => x.id !== product.id)
            : [...get().favorites, product],
        });
      },
      toggleCompare: (product) => {
        const has = get().compare.some((x) => x.id === product.id);
        if (has) {
          set({ compare: get().compare.filter((x) => x.id !== product.id) });
          return true;
        }
        if (get().compare.length >= 4) {
          if (typeof window !== "undefined") {
            window.alert("Можно сравнить не больше 4 ковров. Уберите один из списка.");
          }
          return false;
        }
        set({ compare: [...get().compare, product] });
        return true;
      },
      toggleTryOn: (product) => {
        const has = get().tryOn.some((x) => x.id === product.id);
        if (has) {
          set({ tryOn: get().tryOn.filter((x) => x.id !== product.id) });
          return;
        }
        if (get().tryOn.length >= 2) {
          if (typeof window !== "undefined") {
            window.alert("На примерку можно добавить не больше 2 ковров.");
          }
          return;
        }
        set({ tryOn: [...get().tryOn, product] });
      },
      clearTryOn: () => set({ tryOn: [] }),
      clearCompare: () => set({ compare: [] }),
      isFavorite: (id) => get().favorites.some((x) => x.id === id),
      isCompare: (id) => get().compare.some((x) => x.id === id),
      isTryOn: (id) => get().tryOn.some((x) => x.id === id),
    }),
    { name: "star-carpet-shop-v2" },
  ),
);
