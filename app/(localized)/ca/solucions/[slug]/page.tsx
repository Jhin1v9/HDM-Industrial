import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { solutions, getSolutionBySlug } from "@/content/modes";
import { SolutionDetailPage } from "@/components/pages/InfoPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "ca" as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  const dict = getDictionary(LOCALE);
  const item = dict.solutions.items[solution.id];
  return pageMetadata({
    locale: LOCALE,
    esPath: `soluciones/${solution.slug}`,
    title: item?.name ?? solution.slug,
    description: item?.intro ?? dict.solutions.lead,
    indexable: true,
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();
  return <SolutionDetailPage locale={LOCALE} solution={solution} />;
}
