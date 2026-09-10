import type { MetadataRoute } from "next";
import { pageRegistry, localizedPath, publishedLocales } from "@/content/pages";
import { professionalProfiles } from "@/content/profiles";
import { solutions } from "@/content/modes";
import { sectors } from "@/content/sectors";
import { coverageAreas } from "@/content/coverage";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Sitemap: only indexable routes, all published locales (§58).
 * Detail routes derive from content registries — never hand-maintained.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const page of pageRegistry) {
    if (!page.indexable) continue;
    for (const locale of publishedLocales()) {
      if (!page.dynamic) {
        urls.push({ url: absoluteUrl(localizedPath(locale, page.path)) });
        continue;
      }
      if (page.path === "personal-industrial/[slug]") {
        for (const p of professionalProfiles) {
          urls.push({
            url: absoluteUrl(localizedPath(locale, `personal-industrial/${p.slug}`)),
          });
        }
      } else if (page.path === "soluciones/[slug]") {
        for (const s of solutions) {
          urls.push({ url: absoluteUrl(localizedPath(locale, `soluciones/${s.slug}`)) });
        }
      } else if (page.path === "sectores/[slug]") {
        for (const s of sectors) {
          if (!s.indexable) continue; // petroquímica: noindex hasta tener prueba propia
          urls.push({
            url: absoluteUrl(localizedPath(locale, `sectores/${s.slug}`)),
          });
        }
      } else if (page.path === "cobertura/[slug]") {
        for (const a of coverageAreas) {
          urls.push({ url: absoluteUrl(localizedPath(locale, `cobertura/${a.slug}`)) });
        }
      }
    }
  }

  return urls;
}
