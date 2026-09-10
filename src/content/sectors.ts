import type { Locale, Sector, SectorId } from "@/domain/types";

/** Confirmed sectors (Nível A). "fabricacion" = personal para empresas de fabricación. */
export const sectors: readonly Sector[] = [
  { id: "industria", slug: "industria", indexable: true },
  { id: "construccion", slug: "construccion", indexable: true },
  { id: "mantenimiento-industrial", slug: "mantenimiento-industrial", indexable: true },
  { id: "energia", slug: "energia", indexable: true },
  { id: "fabricacion", slug: "fabricacion", indexable: true },
  // Sem prova própria ainda (Doc 07 §104): rota existe, noindex até ter substância real.
  { id: "petroquimica", slug: "petroquimica", indexable: false },
] as const;

export function getSector(id: string): Sector | undefined {
  return sectors.find((s) => s.id === id);
}

export function getSectorBySlug(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}

/**
 * Localized sector detail slugs (Doc 05 §42 shows per-locale slugs for
 * sectors, e.g. construccion / construcao / construction / construccio).
 */
export const sectorLocalizedSlugs: Record<Locale, Record<SectorId, string>> = {
  es: {
    industria: "industria",
    construccion: "construccion",
    "mantenimiento-industrial": "mantenimiento-industrial",
    energia: "energia",
    fabricacion: "fabricacion",
    petroquimica: "petroquimica",
  },
  pt: {
    industria: "industria",
    construccion: "construcao",
    "mantenimiento-industrial": "manutencao-industrial",
    energia: "energia",
    fabricacion: "fabricacao",
    petroquimica: "petroquimica",
  },
  en: {
    industria: "industry",
    construccion: "construction",
    "mantenimiento-industrial": "industrial-maintenance",
    energia: "energy",
    fabricacion: "manufacturing",
    petroquimica: "petrochemical",
  },
  ca: {
    industria: "industria",
    construccion: "construccio",
    "mantenimiento-industrial": "manteniment-industrial",
    energia: "energia",
    fabricacion: "fabricacio",
    petroquimica: "petroquimica",
  },
};

export function getSectorByLocalizedSlug(
  locale: Locale,
  slug: string,
): Sector | undefined {
  const entry = Object.entries(sectorLocalizedSlugs[locale]).find(
    ([, localizedSlug]) => localizedSlug === slug,
  );
  if (!entry) return undefined;
  return getSector(entry[0]);
}
