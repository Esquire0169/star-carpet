"use client";

import { useEffect, useState } from "react";
import { useShopStore } from "@/store/shop-store";
import type { ProductIndex } from "@/lib/types";
import { ProductCard } from "@/components/catalog/ProductCard";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

export function CartClient({ products }: { products: ProductIndex[] }) {
  const cart = useShopStore((s) => s.cart);
  const setQty = useShopStore((s) => s.setQty);
  const removeFromCart = useShopStore((s) => s.removeFromCart);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (!cart.length) {
    return <Empty title="Корзина пуста" href="/katalog" cta="Перейти в каталог" />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-[1.2rem] border border-line bg-bg-elevated p-4"
          >
            <div>
              <Link href={`/katalog/${item.slug}`} className="font-medium hover:text-burgundy">
                {item.name}
              </Link>
              <p className="mt-1 text-sm text-ink-soft">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={item.qty}
                onChange={(e) => setQty(item.id, Number(e.target.value))}
                className="w-16 rounded-xl border border-line px-2 py-1 text-sm"
              />
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-burgundy"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
      <aside className="h-fit rounded-[1.4rem] bg-sand p-6">
        <h2 className="text-xl font-semibold">Итого</h2>
        <p className="mt-3 text-3xl font-semibold">{formatPrice(total)}</p>
        <p className="mt-2 text-sm text-ink-soft">
          Оформление заказа — через менеджера Star Carpet. Мы сохранили привычные контакты магазина.
        </p>
        <a href="tel:+79015194267" className="btn-primary mt-6 w-full">
          Оформить по телефону
        </a>
      </aside>
      {products.length > 0 && (
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-xl font-semibold">Вам может понравиться</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function IdListClient({ mode }: { mode: "favorites" | "compare" | "tryOn" }) {
  const [mounted, setMounted] = useState(false);
  const items = useShopStore((s) =>
    mode === "favorites" ? s.favorites : mode === "compare" ? s.compare : s.tryOn,
  );

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="rounded-[1.4rem] border border-line bg-bg-elevated p-10 text-center text-ink-soft">
        Загрузка…
      </div>
    );
  }

  if (!items.length) {
    return (
      <Empty
        title={
          mode === "favorites"
            ? "В избранном пока пусто"
            : mode === "compare"
              ? "Список сравнения пуст"
              : "Список примерки пуст"
        }
        href="/katalog"
        cta="Выбрать ковры"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

function Empty({ title, href, cta }: { title: string; href: string; cta: string }) {
  return (
    <div className="rounded-[1.4rem] border border-dashed border-line bg-bg-elevated p-10 text-center">
      <p className="text-lg font-medium">{title}</p>
      <Link href={href} className="btn-primary mt-5 inline-flex">
        {cta}
      </Link>
    </div>
  );
}
