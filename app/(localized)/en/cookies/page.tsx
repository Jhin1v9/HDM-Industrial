import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/MiscPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "en" as const;
const ES_PATH = "cookies";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.legal.cookies.title,
    description: dict.legal.cookies.intro,
    indexable: false,
  });
}

export default function Page() {
  return <LegalPage locale={LOCALE} kind="cookies" />;
}
