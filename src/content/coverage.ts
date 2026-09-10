import type { CoverageArea } from "@/domain/types";

/**
 * Confirmed coverage = project locations, NOT offices (Prompt Supremo §9, §104).
 * Map points anchor the proprietary SVG map (viewBox 0 0 100 100, Iberian peninsula).
 */
export const coverageAreas: readonly CoverageArea[] = [
  { id: "barcelona", country: "ES", slug: "barcelona", mapPoint: { x: 79, y: 30 } },
  { id: "tarragona", country: "ES", slug: "tarragona", mapPoint: { x: 74, y: 38 } },
  { id: "valencia", country: "ES", slug: "valencia", mapPoint: { x: 66, y: 52 } },
  { id: "madrid", country: "ES", slug: "madrid", mapPoint: { x: 47, y: 46 } },
  { id: "pais-vasco", country: "ES", slug: "pais-vasco", mapPoint: { x: 46, y: 15 } },
  { id: "portugal", country: "PT", slug: "portugal", mapPoint: { x: 18, y: 52 } },
] as const;

export function getCoverageArea(id: string): CoverageArea | undefined {
  return coverageAreas.find((a) => a.id === id);
}

export function getCoverageAreaBySlug(slug: string): CoverageArea | undefined {
  return coverageAreas.find((a) => a.slug === slug);
}
