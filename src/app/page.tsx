import { Hero } from "@/components/home/Hero";
import { QuickPick } from "@/components/home/QuickPick";
import { CollectionsCarousel } from "@/components/home/CollectionsCarousel";
import { ProductSlider } from "@/components/home/ProductSlider";
import { WhyUs } from "@/components/home/WhyUs";
import {
  getCollections,
  getMeta,
  getNewProducts,
  getPopularProducts,
} from "@/lib/catalog";
import Link from "next/link";

export default function HomePage() {
  const popular = getPopularProducts(12);
  const news = getNewProducts(12);
  const collections = getCollections();
  const meta = getMeta();

  return (
    <>
      <Hero />
      <QuickPick />
      <CollectionsCarousel collections={collections} />
      <ProductSlider
        title="Популярные"
        subtitle={`${meta.productCount.toLocaleString("ru-RU")} моделей в каталоге — выбирайте проверенные позиции`}
        products={popular}
        href="/katalog?sort=popular"
      />
      <ProductSlider
        title="Новинки"
        subtitle="Свежие поступления со склада Star Carpet"
        products={news}
        href="/katalog?sort=new"
      />
      <WhyUs />
      <section className="container-page pb-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-[linear-gradient(120deg,#3f5a4a_0%,#3a4d63_45%,#7a2430_100%)] px-6 py-12 text-white md:px-12">
          <div className="texture-grain absolute inset-0 opacity-[0.08]" />
          <div className="relative max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              Не уверены в размере или цвете?
            </h2>
            <p className="mt-3 text-white/85">
              Закажите примерку в Москве или напишите консультанту — поможем подобрать ковёр под
              ваш интерьер, бюджет и нагрузку помещения.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/primerka-kovrov" className="btn-on-dark">
                Узнать про примерку
              </Link>
              <Link
                href="/optovikam"
                className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                Условия для опта
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
