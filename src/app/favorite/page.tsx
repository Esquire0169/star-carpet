import { IdListClient } from "@/components/shop/ListsClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Избранное" };

export default function FavoritePage() {
  return (
    <div className="container-page py-12">
      <h1 className="mb-8 font-[family-name:var(--font-display)] text-4xl">Избранное</h1>
      <IdListClient mode="favorites" />
    </div>
  );
}
