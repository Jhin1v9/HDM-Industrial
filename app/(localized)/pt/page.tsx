import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "pt" as const;
const ES_PATH = "";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.meta.defaultTitle,
    description: dict.meta.defaultDescription,
    indexable: true,
  });
}

export default function Page() {
  return <HomePage locale={LOCALE} />;
}
