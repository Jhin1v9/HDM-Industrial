import type { Metadata } from "next";
import { ProfilesIndexPage } from "@/components/pages/ProfilesPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "en" as const;
const ES_PATH = "personal-industrial";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.profiles.title,
    description: dict.profiles.lead,
    indexable: true,
  });
}

export default function Page() {
  return <ProfilesIndexPage locale={LOCALE} />;
}
