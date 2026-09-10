import type { Metadata } from "next";
import { SolicitarPersonalPage } from "@/components/pages/MiscPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "es" as const;
const ES_PATH = "solicitar-personal";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.request.title,
    description: dict.meta.defaultDescription,
    indexable: false,
  });
}

export default function Page() {
  return <SolicitarPersonalPage locale={LOCALE} />;
}
