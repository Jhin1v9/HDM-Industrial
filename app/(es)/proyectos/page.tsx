import type { Metadata } from "next";
import { ProjectsPage } from "@/components/pages/InfoPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "es" as const;
const ES_PATH = "proyectos";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LOCALE);
  return pageMetadata({
    locale: LOCALE,
    esPath: ES_PATH,
    title: dict.projects.title,
    description: dict.projects.lead,
    indexable: true,
  });
}

export default function Page() {
  return <ProjectsPage locale={LOCALE} />;
}
