import type { Metadata } from "next";
import { CoverageIndexPage } from "@/components/pages/InfoPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "es" as const;
const ES_PATH = "cobertura";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.coverage.title,
    description: dict.coverage.lead,
    indexable: true,
  });
}

export default function Page() {
  return <CoverageIndexPage locale={LOCALE} />;
}
