import type { Metadata } from "next";
import { HowWeWorkPage } from "@/components/pages/InfoPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "es" as const;
const ES_PATH = "como-trabajamos";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.howWeWork.title,
    description: dict.howWeWork.lead,
    indexable: true,
  });
}

export default function Page() {
  return <HowWeWorkPage locale={LOCALE} />;
}
