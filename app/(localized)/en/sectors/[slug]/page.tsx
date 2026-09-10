import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectors, sectorLocalizedSlugs, getSectorByLocalizedSlug } from "@/content/sectors";
import { SectorDetailPage } from "@/components/pages/InfoPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "en" as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: sectorLocalizedSlugs[LOCALE][s.id] }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorByLocalizedSlug(LOCALE, slug);
  if (!sector) return {};
  const dict = getDictionary(LOCALE);
  const item = dict.sectors.items[sector.id];
  return pageMetadata({
    locale: LOCALE,
    esPath: `sectores/${sector.slug}`,
    title: item?.name ?? sector.slug,
    description: item?.intro ?? dict.sectors.lead,
    indexable: sector.indexable,
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const sector = getSectorByLocalizedSlug(LOCALE, slug);
  if (!sector) notFound();
  return <SectorDetailPage locale={LOCALE} sector={sector} />;
}
