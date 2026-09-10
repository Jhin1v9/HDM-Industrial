import type { Metadata } from "next";
import { SolutionsIndexPage } from "@/components/pages/InfoPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "ca" as const;
const ES_PATH = "soluciones";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.solutions.title,
    description: dict.solutions.lead,
    indexable: true,
  });
}

export default function Page() {
  return <SolutionsIndexPage locale={LOCALE} />;
}
