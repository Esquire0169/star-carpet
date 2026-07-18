import Link from "next/link";
import { Armchair, Baby, Briefcase, DoorOpen, Moon } from "lucide-react";

const scenarios = [
  {
    href: "/katalog?room=gostinaya",
    title: "Для гостиной",
    text: "Тёплый акцент и зона общения",
    icon: Armchair,
    tone: "bg-[#f0e4d8]",
  },
  {
    href: "/katalog?room=spalnya",
    title: "Для спальни",
    text: "Мягкость под ногами утром",
    icon: Moon,
    tone: "bg-[#e5ebe6]",
  },
  {
    href: "/katalog?room=detskaya&tag=детский",
    title: "Для детской",
    text: "Безопасные и яркие модели",
    icon: Baby,
    tone: "bg-[#ebe4df]",
  },
  {
    href: "/katalog?room=ofis",
    title: "Для офиса",
    text: "Сдержанный стиль и износостойкость",
    icon: Briefcase,
    tone: "bg-[#e2e7ee]",
  },
  {
    href: "/katalog?room=koridor&tag=дорожка",
    title: "Для коридора",
    text: "Дорожки и практичные покрытия",
    icon: DoorOpen,
    tone: "bg-[#efe6dc]",
  },
];

export function QuickPick() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">Быстрый подбор</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl md:text-4xl">
          С чего начать выбор ковра
        </h2>
      </div>
      <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {scenarios.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group card-lift rounded-[1.4rem] border border-line p-5 ${item.tone}`}
          >
            <div className="icon-pulse mb-6 inline-flex rounded-2xl bg-bg-elevated/80 p-3 text-burgundy shadow-sm">
              <item.icon size={22} />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
            <span className="mt-5 inline-block text-sm font-medium text-burgundy transition group-hover:translate-x-1">
              Подобрать →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
