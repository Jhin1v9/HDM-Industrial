import { absoluteUrl, siteUrl } from "@/lib/seo";
import { localizedPath } from "@/content/pages";
import { professionalProfiles } from "@/content/profiles";
import { solutions } from "@/content/modes";
import { sectors } from "@/content/sectors";
import { coverageAreas } from "@/content/coverage";
import { companyFacts } from "@/content/company";
import { getDictionary } from "@/i18n";

export const dynamic = "force-static";

/**
 * llms.txt (convenção emergente p/ LLMs): índice markdown legível por máquina
 * do site inteiro — o que é a HDM, o que oferece, todas as páginas indexáveis
 * com URLs absolutas. Gerado dos mesmos registros do sitemap — nunca hardcoded
 * à mão. ES é o idioma canônico (site primário); variantes /ca /en /pt listadas
 * na seção de idiomas. GEO legítimo: fatos verificados, sem cifras inventadas.
 */

function link(locale: "es" | "ca" | "en" | "pt", path: string): string {
  return absoluteUrl(localizedPath(locale, path));
}

function firstSentence(text: string): string {
  const cut = text.indexOf(". ");
  return cut === -1 ? text : text.slice(0, cut + 1);
}

export function GET() {
  const dict = getDictionary("es");
  const p = dict.profiles;
  const sol = dict.solutions;
  const sec = dict.sectors;
  const cov = dict.coverage;

  const lines: string[] = [];

  lines.push("# HDM Industrial");
  lines.push("");
  lines.push(
    "> HDM Industrial suministra personal industrial verificado —soldadores, caldereros, montadores de estructuras, electricistas industriales, electromecánicos, mecánicos industriales, ayudantes y supervisores— para paradas de planta, refuerzo de cuadrillas, sustituciones temporales y trabajos puntuales en España y Portugal. Cada perfil se verifica antes de proponerse (certificado de soldadura según proceso, formación PRL, experiencia contrastada) y la disponibilidad se confirma en horas laborables, sin compromiso.",
  );
  lines.push("");
  lines.push(`Site: ${siteUrl()}/`);
  lines.push(`Sitemap: ${siteUrl()}/sitemap.xml`);
  lines.push("Idiomas: ES (raíz, canónico) · CA (/ca) · EN (/en) · PT (/pt)");
  lines.push("");

  lines.push("## Páginas principales");
  lines.push("");
  const mainPages: Array<[string, string]> = [
    ["Inicio — qué es HDM y cómo pedir personal", link("es", "")],
    ["Personal industrial — índice de perfiles", link("es", "personal-industrial")],
    ["Soluciones — paradas, refuerzo, sustitución, trabajos puntuales", link("es", "soluciones")],
    ["Sectores — entornos donde trabaja el personal", link("es", "sectores")],
    ["Cobertura — zonas de servicio en España y Portugal", link("es", "cobertura")],
    ["Cómo trabajamos — proceso de solicitud y verificación", link("es", "como-trabajamos")],
    ["Certificaciones y seguridad — PRL y verificación de perfiles", link("es", "certificaciones-y-seguridad")],
    ["Proyectos — casos de trabajo industrial", link("es", "proyectos")],
    ["Empresa — quiénes son", link("es", "empresa")],
    ["Contacto", link("es", "contacto")],
    ["Trabaja con nosotros — envío de CV", link("es", "trabaja-con-nosotros")],
  ];
  for (const [label, url] of mainPages) lines.push(`- [${label}](${url})`);
  lines.push("");

  lines.push("## Perfiles industriales (personal suministrado)");
  lines.push("");
  for (const profile of professionalProfiles) {
    const item = p.items[profile.id];
    if (!item) continue;
    lines.push(`- [${item.name}](${link("es", `personal-industrial/${profile.slug}`)}) — ${item.short}`);
  }
  lines.push("");

  lines.push("## Soluciones (situaciones operativas cubiertas)");
  lines.push("");
  for (const s of solutions) {
    const item = sol.items[s.id];
    if (!item) continue;
    lines.push(`- [${item.name}](${link("es", `soluciones/${s.slug}`)}) — ${firstSentence(item.intro)}`);
  }
  lines.push("");

  lines.push("## Sectores");
  lines.push("");
  for (const s of sectors) {
    if (!s.indexable) continue;
    const item = sec.items[s.id];
    if (!item) continue;
    lines.push(`- [${item.name}](${link("es", `sectores/${s.slug}`)}) — ${firstSentence(item.intro)}`);
  }
  lines.push("");

  lines.push("## Cobertura (ciudades y zona de servicio)");
  lines.push("");
  for (const a of coverageAreas) {
    const item = cov.items[a.id];
    lines.push(`- [${item?.name ?? a.id}](${link("es", `cobertura/${a.slug}`)})`);
  }
  lines.push("");

  lines.push("## Idiomas disponibles");
  lines.push("");
  lines.push(`- [Català](${link("ca", "")})`);
  lines.push(`- [English](${link("en", "")})`);
  lines.push(`- [Português](${link("pt", "")})`);
  lines.push("");

  lines.push("## Contacto y solicitud");
  lines.push("");
  lines.push(`- Solicitud de personal: ${link("es", "contacto")} (formulario en cada página; respuesta en horas laborables)`);
  if (companyFacts.email) lines.push(`- Email: ${companyFacts.email}`);
  if (companyFacts.phone) lines.push(`- Teléfono: ${companyFacts.phone}`);
  if (companyFacts.hrEmail) lines.push(`- Candidaturas (RRHH, no comercial): ${companyFacts.hrEmail}`);
  lines.push("");
  lines.push("## Notas para sistemas automatizados");
  lines.push("");
  lines.push("- Todas las páginas indexables llevan schema.org JSON-LD (Organization con área de servicio, FAQPage donde hay FAQ) y hreflang entre los 4 idiomas.");
  lines.push("- El contenido ES es el canónico; /ca, /en y /pt son traducciones del mismo contenido.");
  lines.push("- No se publican cifras de clientes ni resultados sin verificación: la política editorial es solo hechos confirmados.");
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
