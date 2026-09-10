import type { Metadata } from "next";
import { EmpresaPage } from "@/components/pages/InfoPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "ca" as const;
const ES_PATH = "empresa";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.company.title,
    description: dict.company.lead,
    indexable: true,
  });
}

export default function Page() {
  return <EmpresaPage locale={LOCALE} />;
}
