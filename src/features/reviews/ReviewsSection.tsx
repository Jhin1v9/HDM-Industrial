"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ReviewCard } from "./ReviewCard";
import { StarRating } from "./StarRating";
import { loadReviewsWithMeta, getFeaturedReviews, type Review, type ReviewsMeta } from "@/lib/reviews";
import { localizedPath } from "@/content/pages";
import { Section, SectionHeader } from "@/components/ui/layout";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { Locale } from "@/domain/types";

export function ReviewsSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.reviews;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [meta, setMeta] = useState<ReviewsMeta>({ total: 0, averageRating: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadReviewsWithMeta().then(({ reviews: all, meta: m }) => {
      if (cancelled) return;
      setReviews(getFeaturedReviews(all, 3));
      setMeta(m);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const labels = {
    verified: t.verified,
    viewMore: t.viewMore,
    viewLess: t.viewLess,
  };

  return (
    <Section id="resenas" tone="paper-100">
      <SectionHeader eyebrow={t.badge} title={t.title} lead={t.description} />

      {loading ? null : meta.total === 0 ? (
        <div className="border border-dashed border-line-300 bg-paper-50 p-8 text-center">
          <p className="text-lg font-bold text-ink-800">{t.emptyTitle}</p>
          <p className="mt-1 text-ink-600">{t.emptySubtitle}</p>
          <Link
            href={`${localizedPath(locale, "resenas")}#escribir`}
            className="mt-5 inline-flex h-11 items-center bg-ink-950 px-6 text-sm font-bold tracking-wide text-paper-50 uppercase transition-colors duration-150 hover:bg-ink-800"
          >
            {t.submit}
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8 inline-flex items-center gap-2 border border-line-200 bg-paper-50 px-4 py-2">
            <StarRating value={Math.round(meta.averageRating)} />
            <span className="tnum text-lg font-extrabold text-ink-950">
              {meta.averageRating}
            </span>
            <span className="text-steel-400">·</span>
            <span className="text-sm text-ink-600">
              {meta.total} {t.reviewsCount}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} locale={locale} variant="compact" labels={labels} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={localizedPath(locale, "resenas")}
              className="inline-flex h-11 items-center bg-ink-950 px-6 text-sm font-bold tracking-wide text-paper-50 uppercase transition-colors duration-150 hover:bg-ink-800"
            >
              {t.viewAll}
            </Link>
            <Link
              href={`${localizedPath(locale, "resenas")}#escribir`}
              className="inline-flex h-11 items-center border border-ink-950 px-6 text-sm font-bold tracking-wide text-ink-950 uppercase transition-colors duration-150 hover:bg-ink-950 hover:text-paper-50"
            >
              {t.formTitle}
            </Link>
          </div>
        </>
      )}
    </Section>
  );
}
