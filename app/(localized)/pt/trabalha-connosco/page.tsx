import type { Metadata } from "next";
import { CareersPage } from "@/components/pages/CareersPage";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "pt" as const;
const ES_PATH = "trabaja-con-nosotros";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.careers.title,
    description: dict.careers.lead,
    indexable: true,
  });
}

export default function Page() {
  return <CareersPage locale={LOCALE} />;
}
