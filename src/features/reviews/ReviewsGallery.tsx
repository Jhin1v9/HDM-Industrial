"use client";

import { useEffect, useMemo, useState } from "react";
import { ReviewCard } from "./ReviewCard";
import {
  filterReviews,
  getAvailableFilters,
  DEFAULT_FILTERS,
  type FilterState,
} from "@/lib/reviews-filter";
import { loadReviews, type Review } from "@/lib/reviews";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { Locale } from "@/domain/types";

export function ReviewsGallery({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.reviews;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [visible, setVisible] = useState(9);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews().then((all) => {
      setReviews(all);
      setLoading(false);
    });
  }, []);

  const filtersMeta = useMemo(() => getAvailableFilters(reviews), [reviews]);
  const filtered = useMemo(() => filterReviews(reviews, filters), [reviews, filters]);

  const toggleStar = (stars: number) => {
    setFilters((f) => ({
      ...f,
      stars: f.stars.includes(stars) ? f.stars.filter((s) => s !== stars) : [...f.stars, stars],
    }));
    setVisible(9);
  };

  const hasActive =
    filters.stars.length > 0 || filters.zone !== null || filters.projectType !== null;

  const chipCls = (active: boolean) =>
    `h-9 border px-3 text-xs font-bold tracking-wide uppercase transition-colors duration-150 ${
      active
        ? "border-ink-950 bg-ink-950 text-paper-50"
        : "border-line-300 bg-paper-50 text-ink-700 hover:border-ink-600"
    }`;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-4 border border-line-200 bg-paper-100 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs tracking-[0.18em] text-steel-500 uppercase">
            {t.sortBy}
          </span>
          <button
            type="button"
            onClick={() => {
              setFilters((f) => ({ ...f, sortBy: "recent" }));
              setVisible(9);
            }}
            className={chipCls(filters.sortBy === "recent")}
          >
            {t.recent}
          </button>
          <button
            type="button"
            onClick={() => {
              setFilters((f) => ({ ...f, sortBy: "rating" }));
              setVisible(9);
            }}
            className={chipCls(filters.sortBy === "rating")}
          >
            {t.rating}
          </button>
        </div>

        {filtersMeta.starCounts.some((s) => s.count > 0) ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs tracking-[0.18em] text-steel-500 uppercase">
              {t.ratingLabel}
            </span>
            {filtersMeta.starCounts.map(({ stars, count }) =>
              count > 0 ? (
                <button
                  key={stars}
                  type="button"
                  onClick={() => toggleStar(stars)}
                  className={chipCls(filters.stars.includes(stars))}
                >
                  {stars}★ ({count})
                </button>
              ) : null,
            )}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="filter-zone" className="sr-only">
            {t.zoneLabel}
          </label>
          <select
            id="filter-zone"
            value={filters.zone ?? ""}
            onChange={(e) => {
              setFilters((f) => ({ ...f, zone: e.target.value || null }));
              setVisible(9);
            }}
            className="h-9 border border-line-300 bg-paper-50 px-2 text-xs font-bold text-ink-700"
          >
            <option value="">{t.zoneLabel}</option>
            {filtersMeta.zones.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
          <label htmlFor="filter-type" className="sr-only">
            {t.projectTypeLabel}
          </label>
          <select
            id="filter-type"
            value={filters.projectType ?? ""}
            onChange={(e) => {
              setFilters((f) => ({ ...f, projectType: e.target.value || null }));
              setVisible(9);
            }}
            className="h-9 border border-line-300 bg-paper-50 px-2 text-xs font-bold text-ink-700"
          >
            <option value="">{t.projectTypeLabel}</option>
            {filtersMeta.projectTypes.map((pt) => (
              <option key={pt} value={pt}>
                {(t.projectTypes as Record<string, string>)[pt] ?? pt}
              </option>
            ))}
          </select>
          {hasActive ? (
            <button
              type="button"
              onClick={() => {
                setFilters({ ...DEFAULT_FILTERS, sortBy: filters.sortBy });
                setVisible(9);
              }}
              className={chipCls(false)}
            >
              {t.clear}
            </button>
          ) : null}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <p className="py-10 text-center text-steel-500">…</p>
      ) : reviews.length === 0 ? (
        <div className="mt-8 border border-dashed border-line-300 bg-paper-50 p-8 text-center">
          <p className="text-lg font-bold text-ink-800">{t.emptyTitle}</p>
          <p className="mt-1 text-ink-600">{t.emptySubtitle}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-8 border border-dashed border-line-300 bg-paper-50 p-8 text-center">
          <p className="text-lg font-bold text-ink-800">{t.noResults}</p>
          <p className="mt-1 text-ink-600">{t.tryOtherFilters}</p>
        </div>
      ) : (
        <>
          <p className="mt-6 font-mono text-xs tracking-wide text-steel-500 uppercase">
            {t.showing} {Math.min(visible, filtered.length)} {t.of} {filtered.length}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, visible).map((r) => (
              <ReviewCard
                key={r.id}
                review={r}
                locale={locale}
                variant="compact"
                labels={{ verified: t.verified, viewMore: t.viewMore, viewLess: t.viewLess }}
              />
            ))}
          </div>
          {visible < filtered.length ? (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + 9)}
                className="inline-flex h-11 items-center border border-ink-950 px-6 text-sm font-bold tracking-wide text-ink-950 uppercase transition-colors duration-150 hover:bg-ink-950 hover:text-paper-50"
              >
                {t.loadMore}
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
