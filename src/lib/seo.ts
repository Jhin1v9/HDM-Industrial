import type { Metadata } from "next";
import type { Locale } from "@/domain/types";
import { PUBLISHED_LOCALES } from "@/domain/types";

/**
 * SEO helpers — canonical + hreflang per Doc 05 §44-46 and Doc 09 §58.
 * Site URL is configurable; the fallback is a conservative placeholder that
 * MUST be overridden with NEXT_PUBLIC_SITE_URL at launch (see .env.example).
 */
export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://www.hdm-industrial.es"
  );
}

export { localePrefix, sectionSlugs, localizedPath } from "@/content/pages";
import { localizedPath } from "@/content/pages";

/** Absolute URL from an already-localized path (e.g. "/pt/setores"). */
export function absoluteUrl(localizedPathValue: string): string {
  return `${siteUrl()}${localizedPathValue}`;
}

/**
 * Section paths per locale — thin wrapper over the canonical mapping in
 * content/pages.ts (Doc 05 §42). `section` is the ES canonical section slug.
 */
export function sectionPath(locale: Locale, esSectionSlug: string): string {
  return localizedPath(locale, esSectionSlug);
}

/** hreflang map: all published locales + x-default → ES (Doc 09 §58). */
export function hreflangLanguages(
  pathForLocale: (locale: Locale) => string,
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of PUBLISHED_LOCALES) {
    languages[locale] = absoluteUrl(pathForLocale(locale));
  }
  languages["x-default"] = absoluteUrl(pathForLocale("es"));
  return languages;
}

export function pageMetadata(options: {
  locale: Locale;
  /** Canonical ES path (registry-style, e.g. "sectores/construccion"). */
  esPath: string;
  title: string;
  description: string;
  indexable?: boolean;
}): Metadata {
  const { locale, esPath, title, description, indexable = true } = options;
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(localizedPath(locale, esPath)),
      languages: hreflangLanguages((l) => localizedPath(l, esPath)),
    },
    robots: indexable
      ? undefined
      : { index: false, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      locale,
      url: absoluteUrl(localizedPath(locale, esPath)),
    },
  };
}

/** Skip-link anchor id per locale (a11y, localized). */
export function mainAnchorId(locale: Locale): string {
  switch (locale) {
    case "pt":
      return "conteudo";
    case "en":
      return "main-content";
    case "ca":
      return "contingut";
    default:
      return "contenido";
  }
}

/** JSON-LD <script> tag helper (serialized server-side). */
export function jsonLdScript(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
