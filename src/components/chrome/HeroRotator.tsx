"use client";

import { useEffect, useState } from "react";

export interface HeroSlide {
  src: string;
  mobileSrc?: string;
  alt: string;
}

const INTERVAL_MS = 30000;
const FADE_MS = 1400;

/**
 * Hero rotator — pedido do cliente (Matheus, 2026-09-24): "as imagens passam
 * automaticamente, só na primeira parte". TROCA A CADA 30s (decreto do
 * Matheus; antes estava 5s, frenético — corrigido na revisão de 26/09).
 * Crossfade com leve zoom (Ken Burns)
 * sobre as fotos editoriais licenciadas já registradas (mediaManifest).
 * Respeita prefers-reduced-motion (imagem fixa, sem rotação) — acessibilidade.
 * A legenda editorial e a borda do bloco ficam no HomePage (sem fake proof).
 */
export function HeroRotator({ slides, className }: { slides: HeroSlide[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced || slides.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [reduced, slides.length]);

  const current = slides[index] ?? slides[0];
  if (!current) return null;

  return (
    <div className={className} aria-live="off">
      {slides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.src}
            className="absolute inset-0 transition-opacity ease-out"
            style={{ opacity: active ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
            aria-hidden={!active}
          >
            <picture>
              {s.mobileSrc ? <source media="(max-width: 768px)" srcSet={s.mobileSrc} /> : null}
              <img
                src={s.src}
                alt={active ? s.alt : ""}
                width={1920}
                height={1280}
                decoding="async"
                fetchPriority={i === 0 ? "high" : "low"}
                className="h-full w-full object-cover"
                style={
                  active && !reduced
                    ? { animation: `hdm-kenburns ${INTERVAL_MS + FADE_MS}ms ease-out forwards` }
                    : undefined
                }
              />
            </picture>
          </div>
        );
      })}
      {/* Gradiente inferior: legibilidade da legenda editorial + dots */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-950/80 to-transparent" />
      {/* Dots + contador — nível do site, discreto */}
      <div className="absolute bottom-4 left-5 flex items-center gap-2 sm:left-8">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Imagem ${i + 1}`}
            onClick={() => setIndex(i)}
            className="h-1.5 transition-all duration-300"
            style={{
              width: i === index ? 28 : 10,
              background: i === index ? "#fff" : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
        <span className="ml-2 font-mono text-[11px] tracking-wider text-white/70">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>
      <style jsx>{`
        @keyframes hdm-kenburns {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}
