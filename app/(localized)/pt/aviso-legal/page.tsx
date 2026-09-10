import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/MiscPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "pt" as const;
const ES_PATH = "aviso-legal";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.legal.aviso.title,
    description: dict.legal.aviso.title,
    indexable: false,
  });
}

export default function Page() {
  return <LegalPage locale={LOCALE} kind="aviso" />;
}
