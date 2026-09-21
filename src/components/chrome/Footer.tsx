import Link from "next/link";
import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/content/pages";
import { companyFacts } from "@/content/company";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const f = dict.footer;

  const explore = [
    { href: localizedPath(locale, "personal-industrial"), label: dict.nav.profiles },
    { href: localizedPath(locale, "soluciones"), label: dict.nav.solutions },
    { href: localizedPath(locale, "sectores"), label: dict.nav.sectors },
    { href: localizedPath(locale, "cobertura"), label: dict.nav.coverage },
  ];
  const company = [
    { href: localizedPath(locale, "como-trabajamos"), label: dict.nav.howWeWork },
    { href: localizedPath(locale, "certificaciones-y-seguridad"), label: dict.nav.certifications },
    { href: localizedPath(locale, "proyectos"), label: dict.nav.projects },
    { href: localizedPath(locale, "empresa"), label: dict.nav.company },
    { href: localizedPath(locale, "contacto"), label: dict.nav.contact },
    { href: localizedPath(locale, "trabaja-con-nosotros"), label: dict.nav.careers },
  ];
  const legal = [
    { href: localizedPath(locale, "aviso-legal"), label: f.legalNotice },
    { href: localizedPath(locale, "privacidad"), label: f.privacy },
    { href: localizedPath(locale, "cookies"), label: f.cookies },
  ];

  return (
    <footer className="border-t border-ink-800 bg-ink-950 pb-24 text-paper-50 lg:pb-0">
      <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="text-xl font-extrabold tracking-tight">
            HDM <span className="font-mono text-[10px] tracking-[0.25em] text-steel-400 uppercase">Industrial</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-steel-300">{f.tagline}</p>
          <Link
            href={localizedPath(locale, "solicitar-personal")}
            className="mt-5 inline-flex h-11 items-center border border-signal-500 bg-signal-600 px-5 font-mono text-xs font-bold tracking-widest text-white uppercase hover:bg-signal-700"
          >
            {dict.common.requestPersonal}
          </Link>
          <div className="mt-6 flex flex-col gap-1 text-sm text-steel-300">
            {companyFacts.phone ? (
              <a href={`tel:${companyFacts.phone.replace(/[^+0-9]/g, "")}`} className="hover:text-white">
                {companyFacts.phone}
              </a>
            ) : null}
            {companyFacts.email ? (
              <a href={`mailto:${companyFacts.email}`} className="hover:text-white">
                {companyFacts.email}
              </a>
            ) : null}
          </div>
        </div>
        <nav aria-label={f.explore}>
          <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-steel-400 uppercase">{f.explore}</p>
          <ul className="flex flex-col gap-2 text-sm">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-paper-50/85 hover:text-white hover:underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={f.companyCol}>
          <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-steel-400 uppercase">{f.companyCol}</p>
          <ul className="flex flex-col gap-2 text-sm">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-paper-50/85 hover:text-white hover:underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={f.legal}>
          <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-steel-400 uppercase">{f.legal}</p>
          <ul className="flex flex-col gap-2 text-sm">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-paper-50/85 hover:text-white hover:underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-ink-800">
        <div className="mx-auto flex max-w-[76rem] flex-col gap-2 px-5 py-5 text-xs text-steel-400 sm:px-8">
          <p>{f.fiscalNote}</p>
          <p>{f.editorialNote}</p>
        </div>
      </div>
    </footer>
  );
}
