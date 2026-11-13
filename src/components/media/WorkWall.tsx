"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { getMedia } from "@/components/media/Media";
import { asset } from "@/lib/basePath";
import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";

/**
 * Muro de trabajos realizados: grid de miniaturas con carga diferida
 * (thumbs ligeros) + visor a pantalla completa con la imagen original.
 * Pensado para muchas fotos reales sin penalizar el peso de la página.
 */
export function WorkWall({ ids, locale }: { ids: readonly string[]; locale: Locale }) {
  const dict = getDictionary(locale);
  const slides = useMemo(
    () => ids.map((id) => getMedia(id)).filter((e): e is NonNullable<typeof e> => Boolean(e)),
    [ids],
  );
  const [open, setOpen] = useState<number | null>(null);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const count = slides.length;

  const thumbOf = (file: string) => file.replace("/images/obras/", "/images/obras/thumbs/");
  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, go]);

  if (count === 0) return null;
  const active = open === null ? null : slides[open];

  return (
    <div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {slides.map((entry, i) => (
          <li key={entry.id} className="min-w-0">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-square w-full overflow-hidden border border-line-200 bg-paper-100 focus-visible:ring-2 focus-visible:ring-signal-600 focus-visible:outline-none"
              aria-label={`${dict.common.galleryZoom}: ${entry.alt[locale] ?? entry.alt.es}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- thumb estático, export */}
              <img
                src={asset(thumbOf(entry.file))}
                alt={entry.alt[locale] ?? entry.alt.es}
                width={520}
                height={520}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      {mounted && active
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex flex-col bg-ink-950"
              role="dialog"
              aria-modal="true"
              aria-label={active.alt[locale] ?? dict.common.galleryLabel}
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
            >
              <div className="flex flex-none items-center justify-between border-b border-white/10 px-3 py-2 sm:px-4 sm:py-3">
                <p className="font-mono text-xs tracking-wide text-white/70 tabular-nums">
                  {(open ?? 0) + 1} / {count}
                </p>
                <button
                  type="button"
                  onClick={close}
                  aria-label={dict.common.galleryClose}
                  className="flex h-10 w-10 items-center justify-center border border-white/20 text-white hover:bg-white/10"
                >
                  ✕
                </button>
              </div>
              <div className="relative min-h-0 flex-1 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element -- lightbox */}
                <img
                  src={asset(active.file)}
                  alt={active.alt[locale] ?? active.alt.es}
                  className="absolute inset-0 h-full w-full object-contain"
                  draggable={false}
                />
                {count > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        go(-1);
                      }}
                      aria-label={dict.common.galleryPrev}
                      className="absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-ink-950/70 text-white hover:bg-ink-950 focus-visible:ring-2 focus-visible:ring-signal-500 focus-visible:outline-none"
                    >
                      <span aria-hidden="true" className="text-xl leading-none">←</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        go(1);
                      }}
                      aria-label={dict.common.galleryNext}
                      className="absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-ink-950/70 text-white hover:bg-ink-950 focus-visible:ring-2 focus-visible:ring-signal-500 focus-visible:outline-none"
                    >
                      <span aria-hidden="true" className="text-xl leading-none">→</span>
                    </button>
                  </>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
