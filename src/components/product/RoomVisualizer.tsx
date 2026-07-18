"use client";

import Image from "next/image";
import { useState } from "react";

const rooms = [
  {
    id: "living",
    label: "Гостиная",
    bg: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "bedroom",
    label: "Спальня",
    bg: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "office",
    label: "Кабинет",
    bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
  },
];

export function RoomVisualizer({ carpetImage, name }: { carpetImage: string; name: string }) {
  const [room, setRoom] = useState(rooms[0]);

  return (
    <section className="rounded-[1.5rem] border border-line bg-bg-elevated p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl">
            Как будет выглядеть у вас дома
          </h2>
          <p className="mt-2 max-w-xl text-sm text-ink-soft">
            Выберите интерьер — ковёр отобразится в контексте комнаты. Для точного решения
            закажите примерку в Москве.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {rooms.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRoom(r)}
              className={`rounded-full px-3 py-1.5 text-sm ${
                room.id === r.id ? "bg-burgundy text-white" : "bg-sand text-ink-soft"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[1.3rem] bg-sand">
        <Image src={room.bg} alt={room.label} fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-x-[18%] bottom-[12%] top-[42%] overflow-hidden rounded-[40%] shadow-2xl">
          {carpetImage ? (
            <Image
              src={carpetImage}
              alt={name}
              fill
              className="object-cover opacity-95"
              sizes="50vw"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
