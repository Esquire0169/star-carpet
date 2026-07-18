"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const photos = images.length ? images : ["/placeholder-carpet.svg"];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[1.6rem] border border-line bg-sand md:aspect-[5/4]">
        <AnimatePresence mode="wait">
          <motion.div
            key={photos[active]}
            initial={{ opacity: 0.2, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image
              src={photos[active]}
              alt={`${name} — фото ${active + 1}`}
              fill
              priority
              className="object-cover transition duration-500 hover:scale-[1.04]"
              sizes="(max-width:768px) 100vw, 55vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {photos.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-thin">
          {photos.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border ${
                i === active ? "border-burgundy" : "border-line"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
