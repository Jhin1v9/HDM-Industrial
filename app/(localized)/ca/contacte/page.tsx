import type { Metadata } from "next";
import { ContactoPage } from "@/components/pages/MiscPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "ca" as const;
const ES_PATH = "contacto";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.contact.title,
    description: dict.contact.lead,
    indexable: true,
  });
}

export default function Page() {
  return <ContactoPage locale={LOCALE} />;
}
