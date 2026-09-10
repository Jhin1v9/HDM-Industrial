import type { Metadata } from "next";
import { CertificationsPage } from "@/components/pages/InfoPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "es" as const;
const ES_PATH = "certificaciones-y-seguridad";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.certifications.title,
    description: dict.certifications.lead,
    indexable: true,
  });
}

export default function Page() {
  return <CertificationsPage locale={LOCALE} />;
}
