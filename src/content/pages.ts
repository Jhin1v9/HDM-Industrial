import type { Locale } from "@/domain/types";
import { PUBLISHED_LOCALES } from "@/domain/types";
import {
  sectorLocalizedSlugs,
  getSectorBySlug,
  getSectorByLocalizedSlug,
} from "./sectors";

/**
 * Page registry — single source of truth for routes, indexability and locales.
 * Indexability rule (§45): distinct intent + own content + value + proof + CTA + internal links.
 * Paths below are the ES (root) canonical slugs; other locales resolve via sectionSlugs.
 */
export interface PageDefinition {
  /** Path template without locale prefix. "" = home. */
  path: string;
  family:
    | "home"
    | "profiles"
    | "solutions"
    | "sectors"
    | "coverage"
    | "company"
    | "request"
    | "legal";
  indexable: boolean;
  /** Dynamic family? (driven by registry items) */
  dynamic: boolean;
}

export const pageRegistry: readonly PageDefinition[] = [
  { path: "", family: "home", indexable: true, dynamic: false },
  { path: "personal-industrial", family: "profiles", indexable: true, dynamic: false },
  { path: "personal-industrial/[slug]", family: "profiles", indexable: true, dynamic: true },
  { path: "soluciones", family: "solutions", indexable: true, dynamic: false },
  { path: "soluciones/[slug]", family: "solutions", indexable: true, dynamic: true },
  { path: "sectores", family: "sectors", indexable: true, dynamic: false },
  { path: "sectores/[slug]", family: "sectors", indexable: true, dynamic: true },
  { path: "cobertura", family: "coverage", indexable: true, dynamic: false },
  { path: "cobertura/[slug]", family: "coverage", indexable: true, dynamic: true },
  { path: "como-trabajamos", family: "company", indexable: true, dynamic: false },
  { path: "certificaciones-y-seguridad", family: "company", indexable: true, dynamic: false },
  { path: "proyectos", family: "company", indexable: true, dynamic: false },
  { path: "empresa", family: "company", indexable: true, dynamic: false },
  // Request engine: noindex (Doc 09 §58 — transactional page, canonical is the home CTA).
  { path: "solicitar-personal", family: "request", indexable: false, dynamic: false },
  { path: "contacto", family: "company", indexable: true, dynamic: false },
  // Careers/CV intake — client request 21/09/2026 (Matheus, Nexo panel cmub9zxnq0011k011dz4f8qso).
  { path: "trabaja-con-nosotros", family: "company", indexable: true, dynamic: false },
  { path: "aviso-legal", family: "legal", indexable: false, dynamic: false },
  { path: "privacidad", family: "legal", indexable: false, dynamic: false },
  { path: "cookies", family: "legal", indexable: false, dynamic: false },
] as const;

/**
 * Section slugs per locale (Doc 05 §42). ES values are the canonical registry
 * paths; other locales are direct translations listed in the sitemap doc.
 * Detail slugs: coverage = city names (shared); sectors = localized
 * (sectorLocalizedSlugs); profiles/solutions = shared base slugs (Doc 05 §42
 * only specifies ES detail slugs exhaustively — conservative reuse).
 */
export const sectionSlugs = {
  "personal-industrial": {
    es: "personal-industrial",
    pt: "pessoal-industrial",
    en: "industrial-personnel",
    ca: "personal-industrial",
  },
  soluciones: { es: "soluciones", pt: "solucoes", en: "solutions", ca: "solucions" },
  sectores: { es: "sectores", pt: "setores", en: "sectors", ca: "sectors" },
  cobertura: { es: "cobertura", pt: "cobertura", en: "coverage", ca: "cobertura" },
  "como-trabajamos": {
    es: "como-trabajamos",
    pt: "como-trabalhamos",
    en: "how-we-work",
    ca: "com-treballem",
  },
  "certificaciones-y-seguridad": {
    es: "certificaciones-y-seguridad",
    pt: "certificacoes-e-seguranca",
    en: "certifications-and-safety",
    ca: "certificacions-i-seguretat",
  },
  proyectos: { es: "proyectos", pt: "projetos", en: "projects", ca: "projectes" },
  empresa: { es: "empresa", pt: "empresa", en: "company", ca: "empresa" },
  "solicitar-personal": {
    es: "solicitar-personal",
    pt: "solicitar-pessoal",
    en: "request-personnel",
    ca: "sol-licitar-personal",
  },
  contacto: { es: "contacto", pt: "contacto", en: "contact", ca: "contacte" },
  "trabaja-con-nosotros": {
    es: "trabaja-con-nosotros",
    pt: "trabalha-connosco",
    en: "work-with-us",
    ca: "treballa-amb-nosaltres",
  },
  "aviso-legal": { es: "aviso-legal", pt: "aviso-legal", en: "legal-notice", ca: "avis-legal" },
  privacidad: { es: "privacidad", pt: "privacidade", en: "privacy", ca: "privacitat" },
  cookies: { es: "cookies", pt: "cookies", en: "cookies", ca: "cookies" },
} as const satisfies Record<string, Record<Locale, string>>;

export type SectionKey = keyof typeof sectionSlugs;

export function localePrefix(locale: Locale): string {
  // Spanish at root (§101).
  return locale === "es" ? "" : `/${locale}`;
}

/**
 * Translate a canonical ES path (as used by components and the registry)
 * into the path for the given locale. Handles section slugs and localized
 * sector detail slugs.
 */
export function localizedPath(locale: Locale, path: string): string {
  const prefix = localePrefix(locale);
  const clean = path.replace(/^\/+/, "");
  if (clean === "") return `${prefix}/` || "/";
  const segments = clean.split("/");
  const first = segments[0] ?? "";
  const section = (sectionSlugs as Record<string, Record<Locale, string>>)[first];
  if (section) {
    segments[0] = section[locale];
    // Localized sector detail slug (sectores/<slug>)
    if (first === "sectores" && segments[1]) {
      const sector = getSectorBySlug(segments[1]);
      if (sector) segments[1] = sectorLocalizedSlugs[locale][sector.id];
    }
  }
  return `${prefix}/${segments.join("/")}`;
}

/** Reverse lookup: ES canonical section key for a localized section slug. */
export function sectionKeyForLocale(
  locale: Locale,
  localizedSection: string,
): SectionKey | null {
  for (const [key, slugs] of Object.entries(sectionSlugs)) {
    if ((slugs as Record<Locale, string>)[locale] === localizedSection) {
      return key as SectionKey;
    }
  }
  return null;
}

/**
 * Resolve the current localized pathname back to the canonical ES path.
 * Used by the language switcher so switching locale preserves the page
 * (including localized sector detail slugs) without wiping request state (§39).
 */
export function esPathFromLocalized(locale: Locale, pathname: string): string {
  let clean = pathname;
  if (locale !== "es") {
    clean = clean.replace(new RegExp(`^/${locale}(?=/|$)`), "");
  }
  const segments = clean.split("/").filter(Boolean);
  if (segments.length === 0) return "";
  const first = segments[0] ?? "";
  const key = sectionKeyForLocale(locale, first);
  if (!key) return segments.join("/");
  segments[0] = key;
  if (key === "sectores" && segments[1]) {
    const sector = getSectorByLocalizedSlug(locale, segments[1]);
    if (sector) segments[1] = sector.slug;
  }
  return segments.join("/");
}

export function publishedLocales(): readonly Locale[] {
  return PUBLISHED_LOCALES;
}
