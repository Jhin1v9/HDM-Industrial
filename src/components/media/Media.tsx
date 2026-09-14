import mediaManifest from "@/content/mediaManifest.json";
import { getPlaceholder } from "@/content/placeholders";
import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";

/**
 * MediaPlaceholder (§21) — componente estruturado:
 * - Se existe mídia real verificada (mediaManifest, fotos públicas editoriais full HD
 *   revisadas por contexto): renderiza a imagem com dimensões conhecidas (sem CLS).
 * - Se não: fallback técnico intencional (grid técnico + id + propósito), nunca
 *   uma imagem stock fingindo ser HDM.
 *
 * Imagens editoriais NUNCA são apresentadas como prova (equipe/projetos HDM) — o alt
 * e a nota editorial (rodapé) deixam isso explícito.
 */

interface ManifestEntry {
  id: string;
  file: string;
  alt: Record<Locale, string>;
  source: string;
  width: number;
  height: number;
}

const manifest = mediaManifest as ManifestEntry[];

export function getMedia(id: string): ManifestEntry | undefined {
  return manifest.find((m) => m.id === id);
}

const ratioClasses: Record<string, string> = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "3:4": "aspect-[3/4]",
  "4:5": "aspect-[4/5]",
  "2:3": "aspect-[2/3]",
  "1:1": "aspect-square",
};

export function Media({
  id,
  locale,
  className = "",
  imgClassName = "h-full w-full object-cover",
  priority = false,
}: {
  id: string;
  locale: Locale;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const dict = getDictionary(locale);
  const entry = getMedia(id);
  const placeholder = getPlaceholder(id);
  const aspect = placeholder?.aspectRatio ?? "4:3";
  const ratioClass = ratioClasses[aspect] ?? "aspect-[4/3]";

  if (entry) {
    return (
      <figure
        data-reveal=""
        data-delay="80"
        data-parallax-root=""
        className={`overflow-hidden ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, dimensões conhecidas */}
        <img
          data-parallax
          src={entry.file}
          alt={entry.alt[locale] ?? entry.alt.es}
          width={entry.width}
          height={entry.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className={imgClassName}
        />
      </figure>
    );
  }

  // Fallback técnico intencional (§21): staging parece desenhado, não quebrado.
  // NUNCA expõe metadados internos (IDs, prioridades, formatos) — apenas a nota
  // localizada de "material pendente".
  return (
    <div
      role="img"
      aria-label={dict.common.pendingAsset}
      className={`tech-grid relative flex ${ratioClass} flex-col items-center justify-center gap-2 border border-dashed border-steel-300 bg-paper-100 p-6 text-center ${className}`}
    >
      <span className="max-w-xs text-sm text-steel-500">{dict.common.pendingAsset}</span>
    </div>
  );
}
