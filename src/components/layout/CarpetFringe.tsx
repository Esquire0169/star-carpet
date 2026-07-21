"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type Props = {
  className?: string;
};

const TASSELS = [
  { id: 0, x: "14%", sens: 1.08, phase: 0.0, idle: 1.0, len: 1.0 },
  { id: 1, x: "32%", sens: 0.9, phase: 1.7, idle: 1.2, len: 0.94 },
  { id: 2, x: "50%", sens: 1.15, phase: 2.9, idle: 0.85, len: 1.05 },
  { id: 3, x: "68%", sens: 0.95, phase: 0.9, idle: 1.1, len: 0.97 },
  { id: 4, x: "86%", sens: 1.02, phase: 3.8, idle: 0.95, len: 1.02 },
] as const;

const SPRING = { stiffness: 110, damping: 18, mass: 0.4 };
const MAX_LEAN = 11;
/** Idle sway in degrees — visible but soft */
const IDLE_DEG = 4.2;

type Strand = { x: number; w: number; h: number; op: number; tint: number };

function buildStrands(seed: number): Strand[] {
  const strands: Strand[] = [];
  for (let i = 0; i < 18; i++) {
    const u = i / 17;
    const x = (u - 0.5) * 13.5;
    const n = Math.sin(seed * 12.7 + i * 3.1) * 0.5 + 0.5;
    strands.push({
      x,
      w: 0.95 + n * 0.55,
      h: 20 + n * 8 + (i % 3) * 1.4,
      op: 0.38 + n * 0.28,
      tint: i % 3,
    });
  }
  return strands;
}

function TasselSvg({ id, scale = 1 }: { id: number; scale?: number }) {
  const goldId = `tg-${id}`;
  const headId = `th-${id}`;
  const stemId = `ts-${id}`;
  const strands = buildStrands(id + 1);
  const vbH = 58;
  const h = Math.round(vbH * scale);

  const cream = ["#f7efd8", "#efe2c0", "#e5d4a8"];

  return (
    <svg
      width={Math.round(28 * scale)}
      height={h}
      viewBox={`0 0 28 ${vbH}`}
      fill="none"
      aria-hidden
      className="block overflow-visible drop-shadow-[0_2px_3px_rgba(60,35,15,0.18)]"
    >
      <defs>
        <linearGradient id={stemId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a3824" />
          <stop offset="100%" stopColor="#3a2214" />
        </linearGradient>
        <radialGradient id={goldId} cx="32%" cy="28%" r="68%">
          <stop offset="0%" stopColor="#fff6d8" />
          <stop offset="40%" stopColor="#e8c878" />
          <stop offset="100%" stopColor="#a67a28" />
        </radialGradient>
        <radialGradient id={headId} cx="34%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#fffaf0" />
          <stop offset="45%" stopColor="#f0e2c4" />
          <stop offset="100%" stopColor="#c9a878" />
        </radialGradient>
      </defs>

      {/* stem into bar */}
      <rect x="13.15" y="0" width="1.7" height="5.2" rx="0.7" fill={`url(#${stemId})`} opacity="0.85" />

      {/* crystal */}
      <circle cx="14" cy="7.4" r="1.85" fill="rgba(255,255,255,0.72)" />
      <circle cx="13.35" cy="6.85" r="0.55" fill="rgba(255,255,255,0.9)" />

      {/* gold bead */}
      <circle cx="14" cy="12.2" r="3.55" fill={`url(#${goldId})`} opacity="0.92" />
      <ellipse cx="12.9" cy="11.1" rx="1.2" ry="0.85" fill="rgba(255,255,255,0.35)" />

      {/* spacer crystal */}
      <circle cx="14" cy="16.55" r="1.55" fill="rgba(255,255,255,0.62)" />
      <circle cx="13.5" cy="16.1" r="0.4" fill="rgba(255,255,255,0.85)" />

      {/* satin head */}
      <ellipse cx="14" cy="21.6" rx="6.4" ry="5.1" fill={`url(#${headId})`} opacity="0.94" />
      <ellipse cx="12.2" cy="19.8" rx="2.4" ry="1.5" fill="rgba(255,255,255,0.28)" />
      <ellipse cx="14" cy="24.4" rx="4.2" ry="1.1" fill="rgba(140,100,50,0.12)" />

      {/* thread skirt — soft rounded fibres */}
      {strands.map((s, i) => (
        <rect
          key={i}
          x={14 + s.x - s.w / 2}
          y={26.2}
          width={s.w}
          height={s.h}
          rx={s.w / 2}
          fill={cream[s.tint]}
          opacity={s.op}
        />
      ))}
    </svg>
  );
}

function FringeTassel({
  id,
  x,
  sens,
  phase,
  idle,
  len,
  mouseX,
  active,
  reduced,
}: {
  id: number;
  x: string;
  sens: number;
  phase: number;
  idle: number;
  len: number;
  mouseX: MotionValue<number>;
  active: MotionValue<number>;
  reduced: boolean;
}) {
  const mouseLean = useSpring(0, SPRING);
  const sway = useMotionValue(0);
  const rotate = useTransform([mouseLean, sway], ([m, s]) => (m as number) + (s as number));

  useAnimationFrame((t) => {
    if (reduced) {
      mouseLean.set(0);
      sway.set(0);
      return;
    }
    const mx = mouseX.get();
    const on = active.get();
    const px = parseFloat(x) / 100;
    const dx = mx - px;
    const falloff = Math.max(0, 1 - Math.abs(dx) / 0.45);
    mouseLean.set(dx * falloff * on * sens * MAX_LEAN);

    // Direct sine (not through spring) so idle sway stays visible
    const primary = Math.sin(t * 0.00165 + phase) * IDLE_DEG * idle;
    const secondary = Math.sin(t * 0.0024 + phase * 1.7) * 1.1 * idle;
    sway.set(primary + secondary);
  });

  return (
    <motion.div
      className="absolute top-0 -translate-x-1/2"
      style={{
        left: x,
        rotate,
        transformOrigin: "50% 0%",
        willChange: "transform",
      }}
    >
      <TasselSvg id={id} scale={len} />
    </motion.div>
  );
}

/**
 * Five hanging tassels under the navbar — spring lean toward the pointer,
 * continuous soft idle sway, never blocking clicks.
 */
export function CarpetFringe({ className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const activeRaw = useMotionValue(0);
  const active = useSpring(activeRaw, { stiffness: 80, damping: 20, mass: 0.35 });
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const host = wrap.parentElement;
    if (!host) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");

    const onMove = (e: PointerEvent) => {
      if (reduced || !fine.matches) return;
      const rect = host.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / Math.max(rect.width, 1));
      activeRaw.set(1);
    };
    const onLeave = () => activeRaw.set(0);

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [mouseX, activeRaw, reduced]);

  return (
    <div
      ref={wrapRef}
      className={`carpet-fringe pointer-events-none absolute inset-x-1 top-full z-[1] h-16 -mt-px overflow-visible sm:inset-x-2 ${className}`}
      aria-hidden
    >
      {TASSELS.map((t) => (
        <FringeTassel
          key={t.id}
          id={t.id}
          x={t.x}
          sens={t.sens}
          phase={t.phase}
          idle={t.idle}
          len={t.len}
          mouseX={mouseX}
          active={active}
          reduced={reduced}
        />
      ))}
    </div>
  );
}
