import type { ProfessionalProfile } from "@/domain/types";

/**
 * Single source of truth — confirmed professional profiles (Nível A form).
 * Do NOT add specializations without a source (AGENTS.md).
 */
export const professionalProfiles: readonly ProfessionalProfile[] = [
  {
    id: "soldador",
    specializations: ["tig", "mig-mag", "electrodo"],
    pictogram: "welder",
    mediaId: "PH-PHOTO-TIG-01",
    slug: "soldadores-industriales",
  },
  {
    id: "calderero",
    specializations: [],
    pictogram: "boilermaker",
    mediaId: "PH-PHOTO-CALDERERO-01",
    slug: "caldereros-industriales",
  },
  {
    id: "montador",
    specializations: [],
    pictogram: "rigger",
    mediaId: "PH-PHOTO-MONTADOR-01",
    slug: "montadores-industriales",
  },
  {
    id: "electricista",
    specializations: [],
    pictogram: "electrician",
    mediaId: "PH-PHOTO-ELECTRICISTA-01",
    slug: "electricistas-industriales",
  },
  {
    id: "constructor",
    specializations: [],
    pictogram: "builder",
    mediaId: "PH-PHOTO-STRUCTURE-01",
    slug: "ayudantes-industriales",
  },
  {
    id: "supervisor",
    specializations: [],
    pictogram: "supervisor",
    mediaId: "PH-PHOTO-EPI-01",
    slug: "supervisores-industriales",
  },
  {
    // Texto oficial do cliente (Matheus, 2026-09-24, painel Nexo Workspace).
    id: "eletromecanico",
    specializations: [],
    pictogram: "electromechanic",
    mediaId: "PH-PHOTO-PLANT-01",
    slug: "eletromecanicos-industriales",
  },
  {
    // Texto oficial do cliente (Matheus, 2026-09-24, painel Nexo Workspace).
    id: "mecanico-industrial",
    specializations: [],
    pictogram: "industrialmechanic",
    mediaId: "PH-PHOTO-MOBILIZATION-01",
    slug: "mecanicos-industriales",
  },
] as const;

export function getProfile(id: string): ProfessionalProfile | undefined {
  return professionalProfiles.find((p) => p.id === id);
}

export function getProfileBySlug(slug: string): ProfessionalProfile | undefined {
  return professionalProfiles.find((p) => p.slug === slug);
}
