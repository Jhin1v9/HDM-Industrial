"use client";

import { useState } from "react";
import { L as Link } from "@/components/ui/L";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { localizedPath, esPathFromLocalized } from "@/content/pages";
import { RequestIndicator } from "@/features/request/chrome";
import { mainAnchorId } from "@/lib/seo";

/**
 * Navegação principal (Doc 05 §63 + decisão do cliente 21/09/2026): Personal · Soluciones ·
 * Sectores · Cobertura · Trabaja con nosotros · HDM · [SOLICITAR PERSONAL]
 */
export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hdmOpen, setHdmOpen] = useState(false);

  const links = [
    { href: localizedPath(locale, "personal-industrial"), label: dict.nav.profiles },
    { href: localizedPath(locale, "soluciones"), label: dict.nav.solutions },
    { href: localizedPath(locale, "sectores"), label: dict.nav.sectors },
    { href: localizedPath(locale, "cobertura"), label: dict.nav.coverage },
    { href: localizedPath(locale, "trabaja-con-nosotros"), label: dict.nav.careers },
  ];
  const hdmLinks = [
    { href: localizedPath(locale, "como-trabajamos"), label: dict.nav.howWeWork },
    { href: localizedPath(locale, "certificaciones-y-seguridad"), label: dict.nav.certifications },
    { href: localizedPath(locale, "proyectos"), label: dict.nav.projects },
    { href: localizedPath(locale, "empresa"), label: dict.nav.company },
    { href: localizedPath(locale, "contacto"), label: dict.nav.contact },
  ];

  // Language switcher preserva a rota atual (com slugs localizados) e NUNCA apaga o request (§39).
  const currentEsPath = esPathFromLocalized(locale, pathname);

  return (
    <header className="sticky top-0 z-[40] border-b border-ink-800 bg-ink-950 text-paper-50">
      <a href={`#${mainAnchorId(locale)}`} className="skip-link">
        {locale === "es" ? "Saltar al contenido" : locale === "pt" ? "Saltar para o conteúdo" : locale === "ca" ? "Saltar al contingut" : "Skip to content"}
      </a>
      <div className="mx-auto flex h-16 max-w-[76rem] items-center gap-4 px-5 sm:px-8">
        <Link
          href={localizedPath(locale, "")}
          className="flex items-baseline gap-2 font-extrabold tracking-tight"
          aria-label="HDM Industrial"
        >
          <span className="text-xl">HDM</span>
          <span className="font-mono text-[10px] tracking-[0.25em] text-steel-400 uppercase">
            Industrial
          </span>
        </Link>

        <nav aria-label={dict.common.navPrimary} className="ml-6 hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-semibold text-paper-50/90 transition-colors duration-150 hover:text-white hover:underline underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setHdmOpen(true)}
            onMouseLeave={() => setHdmOpen(false)}
            onFocusCapture={() => setHdmOpen(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHdmOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setHdmOpen(false);
            }}
          >
            <button
              type="button"
              className="px-3 py-2 text-sm font-semibold text-paper-50/90 hover:text-white"
              aria-haspopup="true"
              aria-expanded={hdmOpen}
              onClick={() => setHdmOpen((v) => !v)}
            >
              HDM ▾
            </button>
            <div
              className={`absolute left-0 top-full min-w-56 border border-ink-700 bg-ink-900 shadow-lift transition-all duration-150 ${
                hdmOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              {hdmLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2.5 text-sm text-paper-50/90 hover:bg-ink-800 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <nav aria-label={dict.nav.language} className="hidden items-center gap-1 font-mono text-[11px] tracking-wider sm:flex">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={localizedPath(l, currentEsPath)}
                aria-current={l === locale ? "true" : undefined}
                hrefLang={l}
                className={`px-1.5 py-1 uppercase ${
                  l === locale ? "font-bold text-white underline underline-offset-4" : "text-steel-400 hover:text-paper-50"
                }`}
              >
                {l}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <RequestIndicator locale={locale} />
          </div>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center border border-ink-700 text-paper-50 lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? dict.nav.close : dict.nav.menu}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "×" : "≡"}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav aria-label={dict.common.navPrimaryMobile} className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ink-800 bg-ink-950 px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {[...links, ...hdmLinks].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-lg font-semibold text-paper-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex gap-2 border-t border-ink-800 pt-3 font-mono text-xs uppercase">
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href={localizedPath(l, currentEsPath)}
                  hrefLang={l}
                  className={`px-2 py-1 ${l === locale ? "font-bold text-white underline" : "text-steel-400"}`}
                >
                  {l}
                </Link>
              ))}
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
