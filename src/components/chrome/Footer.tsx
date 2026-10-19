import { L as Link } from "@/components/ui/L";
import { asset } from "@/lib/basePath";
import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/content/pages";
import { companyFacts, whatsappLink } from "@/content/company";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";

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
    { href: localizedPath(locale, "resenas"), label: dict.reviews.badge },
  ];
  const legal = [
    { href: localizedPath(locale, "aviso-legal"), label: f.legalNotice },
    { href: localizedPath(locale, "privacidad"), label: f.privacy },
    { href: localizedPath(locale, "cookies"), label: f.cookies },
  ];

  return (
    <footer className="border-t border-ink-800 bg-ink-950 pb-24 text-center text-paper-50 lg:pb-0 lg:text-left">
      <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          {/* Logo oficial do cliente - mesma marca do header */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/images/brand/hdm-logo-light.png")}
            alt="HDM Industrial"
            width={771}
            height={330}
            className="mx-auto h-9 w-auto lg:mx-0"
          />
          <p className="mt-3 text-sm text-steel-300 sm:max-w-xs">{f.tagline}</p>
          <div className="mt-4 flex items-center justify-center gap-4 lg:justify-start">
            {companyFacts.instagram ? (
              <a
                href={companyFacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-steel-400 hover:text-white transition-colors duration-150"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            ) : null}
            {whatsappLink("") ? (
              <a
                href={whatsappLink("") ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-steel-400 hover:text-white transition-colors duration-150"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            ) : null}
          </div>
          <Link
            href={localizedPath(locale, "solicitar-personal")}
            className="mt-5 inline-flex h-11 items-center border border-signal-500 bg-signal-600 px-5 font-mono text-xs font-bold tracking-widest text-white uppercase hover:bg-signal-700"
          >
            {dict.common.requestPersonal}
          </Link>
          {companyFacts.email ? (
            <div className="mt-6 text-sm text-steel-300">
              <a href={`mailto:${companyFacts.email}`} className="hover:text-white">
                {companyFacts.email}
              </a>
            </div>
          ) : null}
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
        <div className="mx-auto flex max-w-[76rem] items-center justify-center px-5 py-5 text-xs text-steel-400 sm:px-8">
          <p>{f.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
