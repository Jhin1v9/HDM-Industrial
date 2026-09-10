import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { professionalProfiles, getProfileBySlug } from "@/content/profiles";
import { ProfileDetailPage } from "@/components/pages/ProfilesPages";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const LOCALE = "en" as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return professionalProfiles.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) return {};
  const dict = getDictionary(LOCALE);
  const item = dict.profiles.items[profile.id];
  return pageMetadata({
    locale: LOCALE,
    esPath: `personal-industrial/${profile.slug}`,
    title: item?.name ?? profile.slug,
    description: item?.short ?? dict.profiles.lead,
    indexable: true,
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) notFound();
  return <ProfileDetailPage locale={LOCALE} profile={profile} />;
}
