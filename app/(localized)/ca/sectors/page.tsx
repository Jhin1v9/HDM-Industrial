import type { Metadata } from "next";
import { SectorsIndexPage } from "@/components/pages/InfoPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "ca" as const;
const ES_PATH = "sectores";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.sectors.title,
    description: dict.sectors.lead,
    indexable: true,
  });
}

export default function Page() {
  return <SectorsIndexPage locale={LOCALE} />;
}
