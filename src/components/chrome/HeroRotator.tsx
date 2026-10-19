"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/basePath";

export interface HeroSlide {
  src: string;
  mobileSrc?: string;
  videoSrc?: string;
  alt: string;
  /** Duração da slide em ms (default PHOTO_MS). Vídeo usa a duração do clipe. */
  durationMs?: number;
}

const PHOTO_MS = 8000;
const FADE_MS = 1400;

/**
 * Hero rotator - pedido do cliente (Matheus, 2026-09-24): "as imagens passam
 * automaticamente, só na primeira parte". Crossfade com leve zoom (Ken Burns)
 * sobre as fotos editoriais licenciadas já registradas (mediaManifest).
 * Respeita prefers-reduced-motion (imagem fixa, sem rotação) - acessibilidade.
 * A legenda editorial e a borda do bloco ficam no HomePage (sem fake proof).
 *
 * TIMING (19/10/2026 tarde, pedido do utilizador na revisão): o decreto
 * antigo de Matheus de 30s/foto fazia o vídeo (slide 1) demorar 2,5 min a
 * aparecer e REPETIR-SE em loop dentro da sua própria slide ("tarda
 * bastante o repite o vídeo"). Agora: **vídeo 19s = 1 clip completo e passa
 * (sem loop)**, fotos 8s cada → ciclo completo ~75s. durationMs por slide.
 *
 * Vídeo hero: REMOVIDO 12/10/2026 (autoplay bloqueado em móveis),
 * RECUPERADO 19/10/2026 SÓ EM DESKTOP e ATIVADO EM TODOS OS VIEWPORTS
 * 19/10/2026 tarde (pedido do utilizador: "como tínhamos antes" - verificar
 * primeiro no desktop e depois no móvel). muted+playsInline com
 * poster=póster; se o autoplay falhar num device real, fica o póster
 * (mesmo resultado visual de hoje). prefers-reduced-motion também fica
 * só com imagem. PH-VIDEO-HERO-01 segue no manifest (proveniência).
 */

function HeroVideo({ slide, active }: { slide: HeroSlide; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      void v.play().catch(() => undefined);
    } else v.pause();
  }, [active]);

  return (
    <video
      ref={ref}
      src={asset(slide.videoSrc ?? "")}
      poster={asset(slide.src)}
      muted
      playsInline
      preload="metadata"
      aria-hidden={!active}
      className="h-full w-full object-cover"
    />
  );
}

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
    const duration = slides[index]?.durationMs ?? PHOTO_MS;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), duration);
    return () => clearTimeout(t);
  }, [reduced, slides, index]);

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
            {s.videoSrc && !reduced ? (
              <HeroVideo slide={s} active={active} />
            ) : (
              <picture>
                {s.mobileSrc ? <source media="(max-width: 768px)" srcSet={asset(s.mobileSrc)} /> : null}
                <img
                  src={asset(s.src)}
                  alt={active ? s.alt : ""}
                  width={1920}
                  height={1280}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                  className="h-full w-full object-cover"
                  style={
                    active && !reduced
                      ? { animation: `hdm-kenburns ${(s.durationMs ?? PHOTO_MS) + FADE_MS}ms ease-out forwards` }
                      : undefined
                  }
                />
              </picture>
            )}
          </div>
        );
      })}
      {/* Gradiente inferior: legibilidade da legenda editorial + dots */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-950/80 to-transparent" />
      {/* Dots + contador - nível do site, discreto */}
      <div className="absolute bottom-4 left-5 flex items-center gap-2 sm:left-8">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Imagem ${i + 1}`}
            onClick={() => setIndex(i)}
            className="relative h-1.5 transition-all duration-300 after:absolute after:-inset-2.5 after:content-['']"
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
