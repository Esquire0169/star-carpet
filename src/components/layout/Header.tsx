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
import { CarpetSurface } from "@/components/layout/CarpetSurface";
import { CarpetFringe } from "@/components/layout/CarpetFringe";

const nav = [
  { href: "/katalog", label: "Каталог" },
  { href: "/primerka-kovrov", label: "Примерка" },
  { href: "/dostavka-i-oplata", label: "Доставка" },
  { href: "/optovikam", label: "Опт" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/stati", label: "Блог" },
];

function FleurIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id="fleurGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0d78a" />
          <stop offset="100%" stopColor="#b8923a" />
        </linearGradient>
      </defs>
      <path
        fill="url(#fleurGold)"
        d="M12 2c-1.2 3.2-3.5 5.2-2.8 8.2.8-1 2-1.4 2.8-1.4s2 .4 2.8 1.4C15.5 7.2 13.2 5.2 12 2zm-5.5 7.5c-2.2 1.5-3 4-1.8 5.8 1.5-.8 2.8-.5 3.6.2-.8-2.2-.5-4.2-1.8-6zm11 0c-1.3 1.8-1 3.8-1.8 6 .8-.7 2.1-1 3.6-.2 1.2-1.8.4-4.3-1.8-5.8zM11 14.5h2v5h-2zm-4 6.5h10l-1.5 1.5h-7z"
      />
    </svg>
  );
}

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
      className={`sticky top-0 z-50 overflow-visible transition-all duration-300 ${
        scrolled ? "pt-2 pb-1" : "pt-3 pb-2 md:pt-4"
      }`}
    >
      <div className="container-page">
        <div className="carpet-shell">
          <div className="relative">
            <div
              className={`carpet-bar transition-shadow duration-300 ${
                scrolled ? "shadow-[0_20px_48px_rgba(74,21,32,0.5)]" : ""
              }`}
              style={{
                backgroundColor: "#4a1520",
              }}
            >
              <CarpetSurface />

              <div className="carpet-bar-content flex min-w-0 flex-1 items-center gap-3 px-3 py-3 sm:gap-4 sm:px-5 md:py-3.5 lg:gap-6 lg:px-6">
                <button
                  type="button"
                  className="carpet-icon rounded-full p-2 lg:hidden"
                  onClick={() => setOpen(true)}
                  aria-label="Открыть меню"
                >
                  <Menu size={18} />
                </button>

                <Link href="/" className="group shrink-0 leading-none">
                  <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.08em] text-[var(--carpet-gold)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] sm:text-2xl md:text-[1.7rem]">
                    STAR‑CARPET
                  </span>
                  <span className="mt-0.5 hidden text-[9px] uppercase tracking-[0.28em] text-[var(--carpet-cream)]/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] sm:block">
                    ковры со всего мира
                  </span>
                </Link>

                <nav className="ml-auto hidden items-center gap-4 xl:gap-6 lg:flex">
                  {nav.map((item) => (
                    <Link key={item.href} href={item.href} className="carpet-link whitespace-nowrap">
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <form
                  onSubmit={submitSearch}
                  className="ml-auto hidden max-w-[200px] flex-1 items-center gap-2 rounded-full border border-[rgba(224,192,106,0.35)] bg-[rgba(20,8,12,0.45)] px-3 py-1.5 backdrop-blur-[2px] lg:ml-0 xl:flex"
                >
                  <Search size={14} className="shrink-0 text-[var(--carpet-gold)]/85" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Поиск…"
                    className="w-full bg-transparent text-sm text-[var(--carpet-cream)] outline-none placeholder:text-[var(--carpet-cream)]/45"
                  />
                </form>

                <div className="ml-auto flex items-center gap-0.5 sm:gap-1 lg:ml-0">
                  <Link
                    href="/primerka-kovrov"
                    className="carpet-icon relative rounded-full p-2"
                    aria-label="Примерка"
                  >
                    <Ruler size={17} />
                    {tryOnCount > 0 && (
                      <span className="carpet-badge absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px]">
                        {tryOnCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/compare"
                    className="carpet-icon relative hidden rounded-full p-2 sm:inline-flex"
                    aria-label="Сравнение"
                  >
                    <GitCompareArrows size={17} />
                    {compareCount > 0 && (
                      <span className="carpet-badge absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px]">
                        {compareCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/favorite"
                    className="carpet-icon relative rounded-full p-2"
                    aria-label="Избранное"
                  >
                    <Heart size={17} />
                    {favCount > 0 && (
                      <span className="carpet-badge absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px]">
                        {favCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/cart"
                    className="carpet-icon relative rounded-full p-2"
                    aria-label="Корзина"
                  >
                    <ShoppingBag size={17} />
                    {cartCount > 0 && (
                      <span className="carpet-badge absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px]">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <span className="ml-1 hidden drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] lg:inline-flex" aria-hidden>
                    <FleurIcon />
                  </span>
                </div>
              </div>
            </div>
            <CarpetFringe />
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink/55 backdrop-blur-[2px] lg:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute left-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 10%, rgba(160,55,70,0.35), transparent 55%), linear-gradient(165deg, #8b2f3c 0%, #541820 100%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[rgba(35,10,16,0.45)]" />
            <div className="relative z-10 mb-6 flex items-center justify-between border-b border-[rgba(224,192,106,0.25)] px-5 py-4">
              <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.08em] text-[var(--carpet-gold)]">
                Меню
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                className="carpet-icon rounded-full p-2"
              >
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={submitSearch}
              className="relative z-10 mx-5 mb-5 flex items-center gap-2 rounded-full border border-[rgba(224,192,106,0.28)] bg-[rgba(26,23,20,0.35)] px-3 py-2"
            >
              <Search size={16} className="text-[var(--carpet-gold)]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Поиск ковров…"
                className="w-full bg-transparent text-sm text-[var(--carpet-cream)] outline-none placeholder:text-[var(--carpet-cream)]/50"
              />
            </form>
            <div className="relative z-10 flex flex-col gap-1 px-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="carpet-link rounded-lg px-3 py-3 text-lg hover:bg-[rgba(240,215,138,0.1)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="relative z-10 mt-auto flex items-center justify-between border-t border-[rgba(224,192,106,0.2)] px-5 py-5">
              <a href="tel:+79015194267" className="text-sm text-[var(--carpet-cream)]/75">
                8 (901) 519-42-67
              </a>
              <FleurIcon />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
