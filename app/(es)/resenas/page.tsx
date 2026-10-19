import type { Metadata } from "next";
import { ResenasPage } from "@/components/pages/ResenasPage";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "es" as const;
const ES_PATH = "resenas";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.reviews.title,
    description: dict.reviews.description,
    indexable: true,
  });
}

export default function Page() {
  return <ResenasPage locale={LOCALE} />;
}
