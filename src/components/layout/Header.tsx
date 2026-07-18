"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Heart,
  Menu,
  Ruler,
  Search,
  ShoppingBag,
  GitCompareArrows,
  X,
} from "lucide-react";
import { useShopStore } from "@/store/shop-store";
import { useRouter } from "next/navigation";

const nav = [
  { href: "/katalog", label: "Каталог" },
  { href: "/primerka-kovrov", label: "Примерка" },
  { href: "/dostavka-i-oplata", label: "Доставка" },
  { href: "/optovikam", label: "Опт" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/stati", label: "Блог" },
];

export function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useShopStore((s) => s.cart.reduce((n, i) => n + i.qty, 0));
  const favCount = useShopStore((s) => s.favorites.length);
  const compareCount = useShopStore((s) => s.compare.length);
  const tryOnCount = useShopStore((s) => s.tryOn.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/katalog?q=${encodeURIComponent(query)}` : "/katalog");
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-[rgba(246,243,238,0.88)] backdrop-blur-xl shadow-[0_8px_30px_rgba(26,23,20,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-page">
        <div className="flex items-center justify-between gap-4 py-3 md:py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full border border-line p-2 md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
            >
              <Menu size={18} />
            </button>
            <Link href="/" className="group flex flex-col leading-none">
              <span className="font-[family-name:var(--font-display)] text-2xl tracking-[0.04em] text-ink md:text-[1.75rem]">
                STAR‑CARPET
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                ковры со всего мира
              </span>
            </Link>
          </div>

          <nav className="hidden items-center gap-5 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-ink-soft transition hover:text-burgundy"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form
            onSubmit={submitSearch}
            className="hidden min-w-[220px] flex-1 max-w-md items-center gap-2 rounded-full border border-line bg-bg-elevated px-3 py-2 md:flex"
          >
            <Search size={16} className="text-ink-soft" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Название, артикул, стиль…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink-soft/70"
            />
          </form>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/primerka-kovrov"
              className="relative rounded-full p-2 text-ink-soft transition hover:bg-sand/60 hover:text-ink"
              aria-label="Примерка"
            >
              <Ruler size={18} />
              {tryOnCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-sage px-1 text-[10px] text-white">
                  {tryOnCount}
                </span>
              )}
            </Link>
            <Link
              href="/compare"
              className="relative rounded-full p-2 text-ink-soft transition hover:bg-sand/60 hover:text-ink"
              aria-label="Сравнение"
            >
              <GitCompareArrows size={18} />
              {compareCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-slate-blue px-1 text-[10px] text-white">
                  {compareCount}
                </span>
              )}
            </Link>
            <Link
              href="/favorite"
              className="relative rounded-full p-2 text-ink-soft transition hover:bg-sand/60 hover:text-ink"
              aria-label="Избранное"
            >
              <Heart size={18} />
              {favCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-burgundy px-1 text-[10px] text-white">
                  {favCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative rounded-full p-2 text-ink-soft transition hover:bg-sand/60 hover:text-ink"
              aria-label="Корзина"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-burgundy px-1 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink/40 md:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-bg-elevated p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-[family-name:var(--font-display)] text-xl">Меню</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submitSearch} className="mb-5 flex items-center gap-2 rounded-full border border-line px-3 py-2">
              <Search size={16} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Поиск ковров…"
                className="w-full bg-transparent text-sm outline-none"
              />
            </form>
            <div className="flex flex-col gap-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-2 py-2 text-lg hover:bg-sand/50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <a href="tel:+79015194267" className="mt-auto pt-8 text-sm text-ink-soft">
              8 (901) 519-42-67
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
