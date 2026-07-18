"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=80";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yCarpet = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yFurniture = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.35]);

  return (
    <section ref={ref} className="relative min-h-[88vh] overflow-hidden">
      <motion.div style={{ y: yFurniture, opacity }} className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="Уютный интерьер с ковром Star-Carpet"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(26,23,20,0.72)_0%,rgba(26,23,20,0.35)_48%,rgba(26,23,20,0.15)_100%)]" />
        <div className="texture-grain absolute inset-0" />
      </motion.div>

      <motion.div
        style={{ y: yCarpet }}
        className="pointer-events-none absolute -bottom-10 right-[-8%] hidden h-[42%] w-[55%] rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(122,36,48,0.28),transparent_70%)] blur-2xl md:block"
      />

      <div className="container-page relative z-10 flex min-h-[88vh] items-end pb-16 pt-28 md:items-center md:pb-24">
        <div className="max-w-2xl text-white">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4 text-xs uppercase tracking-[0.28em] text-white/75"
          >
            Star Carpet · Москва и вся Россия
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.95] tracking-[-0.02em]"
          >
            Ковры со всего мира для вашего дома
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg"
          >
            Тысячи моделей из Турции, Ирана, Бельгии, Египта и России. Примерка в Москве,
            бесплатная доставка в крупные города и большой складской запас — чтобы выбрать
            ковёр было спокойно и приятно.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/katalog" className="btn-primary">
              Смотреть каталог
            </Link>
            <Link
              href="/primerka-kovrov"
              className="btn-secondary border-white/35 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              Заказать примерку
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
