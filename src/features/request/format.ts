import type { RequestDuration, TimingOption } from "@/domain/types";
import type { Dictionary } from "@/i18n";

/** "3 semanas", "Continuado", "Por definir"… */
export function formatDuration(duration: RequestDuration, dict: Dictionary): string | null {
  const labels: Record<string, string> = {
    dias: dict.request.durationUnits.dias,
    semanas: dict.request.durationUnits.semanas,
    meses: dict.request.durationUnits.meses,
    continuado: dict.request.durationUnits.continuado,
    "por-definir": dict.request.durationUnits["por-definir"],
  };
  if (duration.unit === "continuado" || duration.unit === "por-definir") {
    return labels[duration.unit] ?? null;
  }
  if (duration.unit && duration.value != null) {
    return `${duration.value} ${labels[duration.unit] ?? duration.unit}`;
  }
  return null;
}

export function formatTiming(timing: TimingOption | null, dict: Dictionary): string | null {
  if (!timing) return null;
  return dict.request.timing[timing] ?? null;
}

/** ISO yyyy-mm-dd → "21 septiembre 2026" (formato claro, Doc 06 §37). */
export function formatStartDate(iso: string | null, locale: string): string | null {
  if (!iso) return null;
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  const localeTag = { es: "es-ES", ca: "ca-ES", en: "en-GB", pt: "pt-PT" }[locale] ?? "es-ES";
  return new Intl.DateTimeFormat(localeTag, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
