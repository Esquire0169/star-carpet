import {
  getOftenBought,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/catalog";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { RoomVisualizer } from "@/components/product/RoomVisualizer";
import { Reviews } from "@/components/product/Reviews";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Товар не найден" };
  return {
    title: product.name,
    description: product.description?.slice(0, 160) || `${product.name} — купить в Star Carpet`,
    alternates: { canonical: `/katalog/${product.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 8);
  const often = getOftenBought(product, 4);
  const images = product.images?.length ? product.images : product.image ? [product.image] : [];

  return (
    <div className="container-page py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <ProductGallery images={images} name={product.name} />
        <ProductBuyBox product={product} />
      </div>

      <div className="mt-10 grid gap-6">
        <ProductSpecs product={product} />
        <RoomVisualizer carpetImage={product.image} name={product.name} />
        <Reviews />
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 font-[family-name:var(--font-display)] text-3xl">Похожие ковры</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {often.length > 0 && (
        <section className="mt-12 pb-8">
          <h2 className="mb-5 font-[family-name:var(--font-display)] text-3xl">
            С этим ковром часто покупают
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {often.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
