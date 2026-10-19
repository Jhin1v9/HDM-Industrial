"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { getMedia } from "@/components/media/Media";
import { asset } from "@/lib/basePath";
import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 1.6;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function subscribeNoop() {
  return () => {};
}

/**
 * Galeria profissional do cliente:
 * - Crossfade absoluto (todas as imagens object-cover no mesmo aspecto —
 *   fotos retrato/paisagem ficam consistentes, nunca "estouram" o layout)
 * - Auto-play + barra de progresso + miniaturas
 * - Lightbox: zoom (duplo clique/toque, pinca, +/−), setas que funcionam
 *   tambem em mobile (sem pointer-capture sobre os botoes), fecha em Esc/click fora
 */
export function GalleryViewer({
  ids,
  locale,
  className = "",
  aspect = "aspect-[4/3]",
  autoPlayMs = 5000,
}: {
  ids: readonly string[];
  locale: Locale;
  className?: string;
  aspect?: string;
  autoPlayMs?: number;
}) {
  const dict = getDictionary(locale);
  const slides = ids.map((id) => getMedia(id)).filter((e): e is NonNullable<typeof e> => Boolean(e));
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const panRef = useRef({ startX: 0, startY: 0, baseX: 0, baseY: 0 });
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef(0);
  const lastTapRef = useRef(0);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const [thumbCanPrev, setThumbCanPrev] = useState(false);
  const [thumbCanNext, setThumbCanNext] = useState(false);

  // Estado de las flechas de miniaturas según scroll real
  const updateThumbArrows = useCallback(() => {
    const el = thumbStripRef.current;
    if (!el) return;
    setThumbCanPrev(el.scrollLeft > 4);
    setThumbCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = thumbStripRef.current;
    if (!el) return;
    updateThumbArrows();
    el.addEventListener("scroll", updateThumbArrows, { passive: true });
    const ro = new ResizeObserver(updateThumbArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateThumbArrows);
      ro.disconnect();
    };
  }, [updateThumbArrows, count]);

  const scrollThumbs = useCallback((dir: -1 | 1) => {
    const el = thumbStripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.7, 120), behavior: "smooth" });
  }, []);

  // Centrar miniatura activa cuando cambia el índice (auto-play / flechas)
  useEffect(() => {
    const el = thumbStripRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>('[aria-selected="true"]');
    active?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    updateThumbArrows();
  }, [index, updateThumbArrows]);

  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count < 2 || hovering || lightbox) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => goTo(index + 1), autoPlayMs);
    return () => window.clearTimeout(t);
  }, [index, count, hovering, lightbox, autoPlayMs, goTo]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      else if (e.key === "ArrowLeft") goTo(index - 1);
      else if (e.key === "ArrowRight") goTo(index + 1);
      else if (e.key === "+" || e.key === "=") setZoom((z) => clamp(z * ZOOM_STEP, MIN_ZOOM, MAX_ZOOM));
      else if (e.key === "-") setZoom((z) => clamp(z / ZOOM_STEP, MIN_ZOOM, MAX_ZOOM));
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, index, goTo]);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const openLightbox = useCallback((i: number) => {
    setIndex(i);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setLightbox(true);
  }, []);

  const onStageClick = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 320) {
      setZoom((z) => (z > 1.05 ? 1 : 2));
      setPan({ x: 0, y: 0 });
      lastTapRef.current = 0;
      openLightbox(index);
      return;
    }
    lastTapRef.current = now;
    window.setTimeout(() => {
      if (lastTapRef.current === now) openLightbox(index);
    }, 320);
  }, [index, openLightbox]);

  /* Pan + pinca — so na IMAGEM do lightbox (nao no overlay, para as setas clicarem) */
  const imgPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (zoom <= 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointersRef.current.size === 1) {
      panRef.current = { startX: e.clientX, startY: e.clientY, baseX: pan.x, baseY: pan.y };
      setDragging(true);
    } else if (pointersRef.current.size === 2) {
      const pts = [...pointersRef.current.values()];
      const a = pts[0]!;
      const b = pts[1]!;
      pinchRef.current = Math.hypot(a.x - b.x, a.y - b.y);
      setDragging(false);
    }
  };

  const imgPointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointersRef.current.size === 2) {
      const pts = [...pointersRef.current.values()];
      const a = pts[0]!;
      const b = pts[1]!;
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchRef.current > 0) {
        setZoom((z) => clamp((z * dist) / pinchRef.current, MIN_ZOOM, MAX_ZOOM));
        pinchRef.current = dist;
      }
    } else if (zoom > 1) {
      const p = panRef.current;
      setPan({ x: p.baseX + (e.clientX - p.startX), y: p.baseY + (e.clientY - p.startY) });
    }
  };

  const imgPointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = 0;
    if (pointersRef.current.size === 0) setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  if (count === 0) return null;
  const active = slides[index] ?? slides[0];
  if (!active) return null;

  return (
    <div className={`gallery-shell ${className}`}>
      {/* Estagio: crossfade absoluto, todas object-cover no mesmo aspecto */}
      <div
        className="group relative overflow-hidden border border-line-200 bg-ink-950"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label={dict.common.galleryLabel}
      >
        <div className={`relative w-full ${aspect}`}>
          {slides.map((entry, i) => (
            <figure
              key={entry.id}
              className={`absolute inset-0 m-0 transition-opacity duration-700 ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={i !== index}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, dimensões conhecidas */}
              <img
                src={asset(entry.file)}
                alt={entry.alt[locale] ?? entry.alt.es}
                width={entry.width}
                height={entry.height}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                draggable={false}
                onClick={onStageClick}
                className={`h-full w-full object-cover select-none ${i === index ? "gallery-kenburns" : ""}`}
              />
            </figure>
          ))}
        </div>

        {/* Zoom indicador */}
        <button
          type="button"
          onClick={() => openLightbox(index)}
          aria-label={dict.common.galleryZoom}
          className="absolute right-3 bottom-3 z-10 flex h-10 items-center gap-2 bg-ink-950/75 px-3 text-xs font-bold tracking-wide text-white uppercase opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-signal-600 focus-visible:outline-none"
        >
          <span aria-hidden="true">⊕</span> {dict.common.galleryZoom}
        </button>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label={dict.common.galleryPrev}
              className="absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-ink-950/70 text-white transition-colors hover:bg-ink-950 focus-visible:ring-2 focus-visible:ring-signal-600 focus-visible:outline-none disabled:opacity-30"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                ←
              </span>
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === count - 1}
              aria-label={dict.common.galleryNext}
              className="absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-ink-950/70 text-white transition-colors hover:bg-ink-950 focus-visible:ring-2 focus-visible:ring-signal-600 focus-visible:outline-none disabled:opacity-30"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                →
              </span>
            </button>
            {!hovering && !lightbox ? (
              <div className="absolute inset-x-0 bottom-0 z-10 h-0.5 bg-white/20">
                <div
                  key={index}
                  className="gallery-progress h-full bg-signal-600"
                  style={{ animationDuration: `${autoPlayMs}ms` }}
                />
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      {/* Miniaturas — sin barra de scroll: flechas ← → a los lados */}
      {count > 1 ? (
        <div className="mt-2 flex items-center gap-1">
          <button
            type="button"
            onClick={() => scrollThumbs(-1)}
            disabled={!thumbCanPrev}
            aria-label={dict.common.galleryPrev}
            className="flex h-10 w-8 flex-none items-center justify-center text-ink-600 transition-colors hover:text-ink-950 focus-visible:ring-2 focus-visible:ring-signal-600 focus-visible:outline-none disabled:opacity-25 disabled:hover:text-ink-600"
          >
            ←
          </button>
          <div
            ref={thumbStripRef}
            role="tablist"
            aria-label={dict.common.galleryLabel}
            className="flex min-w-0 flex-1 gap-2 overflow-x-auto gallery-no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {slides.map((entry, i) => (
              <button
                key={entry.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${i + 1}`}
                onClick={() => goTo(i)}
                className={`relative h-16 w-24 flex-none border-2 transition-opacity focus-visible:ring-2 focus-visible:ring-signal-600 focus-visible:outline-none ${
                  i === index ? "border-signal-600 opacity-100" : "border-line-200 opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- miniatura */}
                <img
                  src={asset(entry.file)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollThumbs(1)}
            disabled={!thumbCanNext}
            aria-label={dict.common.galleryNext}
            className="flex h-10 w-8 flex-none items-center justify-center text-ink-600 transition-colors hover:text-ink-950 focus-visible:ring-2 focus-visible:ring-signal-600 focus-visible:outline-none disabled:opacity-25 disabled:hover:text-ink-600"
          >
            →
          </button>
        </div>
      ) : null}

      {/* Lightbox via portal: position fixed fica relativo ao <body>,
          imune a transforms do GSAP em ancestrais (que quebrariam o overlay). */}
      {mounted && lightbox
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex flex-col bg-[#10151a]"
              role="dialog"
              aria-modal="true"
              aria-label={active.alt[locale] ?? dict.common.galleryLabel}
              onClick={(e) => {
                if (e.target === e.currentTarget) setLightbox(false);
              }}
            >
              <div className="flex flex-none items-center justify-between border-b border-white/10 px-3 py-2 sm:px-4 sm:py-3">
                <p className="font-mono text-xs tracking-wide text-white/70 tabular-nums">
                  {index + 1} / {count}
                </p>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setZoom((z) => clamp(z / ZOOM_STEP, MIN_ZOOM, MAX_ZOOM))}
                    aria-label="Zoom out"
                    className="flex h-10 w-10 items-center justify-center border border-white/20 text-white hover:bg-white/10"
                  >
                    −
                  </button>
                  <span className="w-11 text-center font-mono text-xs text-white/70 tabular-nums">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => clamp(z * ZOOM_STEP, MIN_ZOOM, MAX_ZOOM))}
                    aria-label="Zoom in"
                    className="flex h-10 w-10 items-center justify-center border border-white/20 text-white hover:bg-white/10"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightbox(false)}
                    aria-label={dict.common.galleryClose}
                    className="ml-1 flex h-10 w-10 items-center justify-center border border-white/20 text-white hover:bg-white/10 sm:ml-2"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Area da imagem: absolute fill + object-contain = sempre dentro do ecrã */}
              <div className="relative min-h-0 flex-1 overflow-hidden">
                {count > 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      goTo(index - 1);
                      resetZoom();
                    }}
                    aria-label={dict.common.galleryPrev}
                    className="absolute top-1/2 left-1 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-black/50 text-xl text-white hover:bg-black/80 sm:left-2"
                  >
                    ←
                  </button>
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element -- lightbox zoom */}
                  <img
                    src={asset(active.file)}
                    alt={active.alt[locale] ?? active.alt.es}
                    decoding="async"
                    draggable={false}
                    onPointerDown={imgPointerDown}
                    onPointerMove={imgPointerMove}
                    onPointerUp={imgPointerUp}
                    onPointerCancel={imgPointerUp}
                    onDoubleClick={() => {
                      setZoom((z) => (z > 1.05 ? 1 : 2));
                      setPan({ x: 0, y: 0 });
                    }}
                    className="max-h-full max-w-full object-contain select-none"
                    style={{
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                      transition: dragging ? "none" : "transform 0.2s ease",
                      cursor: zoom > 1 ? "grab" : "zoom-in",
                      touchAction: zoom > 1 ? "none" : "pan-y",
                    }}
                  />
                </div>
                {count > 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      goTo(index + 1);
                      resetZoom();
                    }}
                    aria-label={dict.common.galleryNext}
                    className="absolute top-1/2 right-1 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-black/50 text-xl text-white hover:bg-black/80 sm:right-2"
                  >
                    →
                  </button>
                ) : null}
              </div>

              {active.alt[locale] ? (
                <p className="flex-none border-t border-white/10 px-4 py-2 text-center text-xs text-white/75 sm:py-3 sm:text-sm">
                  {active.alt[locale]}
                </p>
              ) : null}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
