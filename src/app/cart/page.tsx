import { CartClient } from "@/components/shop/ListsClient";
import { getPopularProducts } from "@/lib/catalog";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Корзина" };

export default function CartPage() {
  const popular = getPopularProducts(8);
  return (
    <div className="container-page py-12">
      <h1 className="mb-8 font-[family-name:var(--font-display)] text-4xl">Корзина</h1>
      <CartClient products={popular} />
    </div>
  );
}
