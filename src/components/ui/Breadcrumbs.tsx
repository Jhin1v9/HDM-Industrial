import Link from "next/link";
import type { Locale } from "@/domain/types";
import { localizedPath } from "@/content/pages";

export function Breadcrumbs({
  locale,
  items,
}: {
  locale: Locale;
  items: { label: string; href?: string }[];
}) {
  const homeLabel = { es: "Inicio", ca: "Inici", en: "Home", pt: "Início" }[locale];
  return (
    <nav aria-label="breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] tracking-wider text-steel-500 uppercase">
        <li>
          <Link href={localizedPath(locale, "")} className="hover:text-ink-800 hover:underline underline-offset-2">
            {homeLabel}
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-ink-800 hover:underline underline-offset-2">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
