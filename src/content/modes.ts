import type { NeedTypeId } from "@/domain/types";

/** Confirmed need types for the Request Engine (Nível A). */
export const needTypes: readonly { id: NeedTypeId }[] = [
  { id: "trabajo-puntual" },
  { id: "sustitucion-temporal" },
  { id: "parada-programada" },
  { id: "parada-urgente" },
  { id: "trabajo-continuado" },
] as const;

export type SolutionId =
  | "paradas-industriales"
  | "refuerzo-de-personal"
  | "sustitucion-temporal"
  | "trabajos-puntuales"
  | "personal-con-desplazamiento"
  | "guia-soldadores-tig-barcelona"
  | "guia-ett-industrial-vs-cuadrilla"
  | "guia-planificar-parada-planta"
  | "guia-certificaciones-soldadura";

export interface Solution {
  id: SolutionId;
  slug: string;
  /** Related need type pre-selected when starting a Request from this solution. */
  relatedNeedType: NeedTypeId | null;
  /** Displacement solutions pre-flag logistics. */
  impliesDisplacement: boolean;
}

/** Sitemap §42 — /soluciones family. */
export const solutions: readonly Solution[] = [
  { id: "paradas-industriales", slug: "paradas-industriales", relatedNeedType: "parada-programada", impliesDisplacement: false },
  { id: "refuerzo-de-personal", slug: "refuerzo-de-personal", relatedNeedType: "trabajo-continuado", impliesDisplacement: false },
  { id: "sustitucion-temporal", slug: "sustitucion-temporal", relatedNeedType: "sustitucion-temporal", impliesDisplacement: false },
  { id: "trabajos-puntuales", slug: "trabajos-puntuales", relatedNeedType: "trabajo-puntual", impliesDisplacement: false },
  { id: "personal-con-desplazamiento", slug: "personal-con-desplazamiento", relatedNeedType: null, impliesDisplacement: true },
  // Guías editoriales (Fase 4 del plano SEO — artigos-pilares, 1.000+ palavras ES).
  { id: "guia-soldadores-tig-barcelona", slug: "guia-soldadores-tig-barcelona", relatedNeedType: null, impliesDisplacement: false },
  { id: "guia-ett-industrial-vs-cuadrilla", slug: "guia-ett-industrial-vs-cuadrilla", relatedNeedType: null, impliesDisplacement: false },
  { id: "guia-planificar-parada-planta", slug: "guia-planificar-parada-planta", relatedNeedType: null, impliesDisplacement: false },
  { id: "guia-certificaciones-soldadura", slug: "guia-certificaciones-soldadura", relatedNeedType: null, impliesDisplacement: false },
] as const;

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
