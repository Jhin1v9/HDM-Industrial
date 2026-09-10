import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { coverageAreas, getCoverageAreaBySlug } from "@/content/coverage";
import { CoverageAreaPage } from "@/components/pages/InfoPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "en" as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return coverageAreas.map((a) => ({ slug: a.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const area = getCoverageAreaBySlug(slug);
  if (!area) return {};
  const dict = getDictionary(LOCALE);
  const item = dict.coverage.items[area.id];
  return pageMetadata({
    locale: LOCALE,
    esPath: `cobertura/${area.slug}`,
    title: item?.name ?? area.slug,
    description: item?.intro ?? dict.coverage.lead,
    indexable: true,
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const area = getCoverageAreaBySlug(slug);
  if (!area) notFound();
  return <CoverageAreaPage locale={LOCALE} area={area} />;
}
