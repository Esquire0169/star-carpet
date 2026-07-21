"use client";

import { withBase } from "@/lib/base-path";

type Props = {
  className?: string;
};

/**
 * Navbar material designed for UI — not a pasted rug photo.
 * Solid brand burgundy panel + subtle textile grain + soft side motifs.
 */
export function CarpetSurface({ className = "" }: Props) {
  const grain = withBase("/textures/star-carpet-ui-bar.jpg");

  return (
    <div
      className={`carpet-surface pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] ${className}`}
      aria-hidden
    >
      {/* Brand field — designed chrome */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(165deg, #8a2f3c 0%, #6e2230 42%, #541820 78%, #4a1520 100%),
            radial-gradient(80% 120% at 12% 40%, rgba(140, 48, 62, 0.55), transparent 55%),
            radial-gradient(70% 100% at 90% 60%, rgba(60, 18, 28, 0.5), transparent 50%)
          `,
        }}
      />

      {/* Soft textile grain from AI strip — low opacity, UI material not photo */}
      <div
        className="absolute inset-0 opacity-[0.34]"
        style={{
          backgroundImage: `url(${grain})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          mixBlendMode: "soft-light",
          filter: "saturate(0.85) contrast(1.05)",
        }}
      />

      {/* Directional pile micro-lines */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            100deg,
            transparent 0 1px,
            rgba(255, 230, 190, 0.22) 1px 1.3px,
            transparent 1.3px 2.8px
          )`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Side ornament hints — richer edges, quiet center for buttons */}
      <div
        className="absolute inset-y-0 left-0 w-[14%] opacity-50"
        style={{
          background: `
            linear-gradient(90deg, rgba(224,192,106,0.18), transparent 85%),
            repeating-linear-gradient(
              180deg,
              transparent 0 10px,
              rgba(224,192,106,0.12) 10px 11px,
              transparent 11px 22px
            )
          `,
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-[14%] opacity-50"
        style={{
          background: `
            linear-gradient(270deg, rgba(224,192,106,0.18), transparent 85%),
            repeating-linear-gradient(
              180deg,
              transparent 0 10px,
              rgba(224,192,106,0.12) 10px 11px,
              transparent 11px 22px
            )
          `,
        }}
      />

      {/* Center clarity for logo / nav / search */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg,
              transparent 0%,
              rgba(30, 10, 14, 0.22) 18%,
              rgba(30, 10, 14, 0.32) 50%,
              rgba(30, 10, 14, 0.22) 82%,
              transparent 100%
            ),
            linear-gradient(180deg, rgba(255,236,200,0.07) 0%, transparent 45%, rgba(20,8,12,0.22) 100%)
          `,
        }}
      />
    </div>
  );
}
