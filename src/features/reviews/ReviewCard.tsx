"use client";

import { useState } from "react";
import { StarRating } from "./StarRating";
import { Avatar } from "./Avatar";
import type { Review } from "@/lib/reviews";
import type { Locale } from "@/domain/types";

function formatDate(dateStr: string, locale: Locale) {
  try {
    return new Date(dateStr).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function ReviewCard({
  review,
  locale,
  variant = "default",
  labels,
}: {
  review: Review;
  locale: Locale;
  variant?: "compact" | "default" | "featured" | "detail";
  labels: { verified: string; viewMore: string; viewLess: string };
}) {
  const [expanded, setExpanded] = useState(false);
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";
  const isDetail = variant === "detail";
  const shouldTruncate = !isDetail && review.text.length > 140;
  const maxCls = isCompact ? "line-clamp-3" : "line-clamp-4";

  return (
    <article
      className={`flex h-full flex-col border border-line-200 bg-paper-50 ${
        isFeatured || isDetail ? "p-5 sm:p-6" : "p-4 sm:p-5"
      }`}
    >
      <div className="flex items-start gap-3">
        <Avatar name={review.name} size={isFeatured || isDetail ? 44 : 38} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
            <div className="min-w-0">
              <h3
                className={`break-words font-extrabold tracking-tight text-ink-950 ${
                  isFeatured ? "text-lg" : "text-base"
                }`}
              >
                {review.name}
              </h3>
              <p className="break-words text-[13px] text-ink-600">
                {review.project_type} · {review.zone}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-0.5">
              <StarRating value={review.stars} className="h-3.5 w-3.5" />
              <time className="text-xs text-steel-500" dateTime={review.created_at}>
                {formatDate(review.created_at, locale)}
              </time>
            </div>
          </div>
        </div>
      </div>

      <p
        className={`mt-4 text-pretty leading-relaxed text-ink-800 ${
          isDetail ? "text-base sm:text-lg" : "text-[15px]"
        } ${shouldTruncate && !expanded ? maxCls : ""}`}
      >
        &ldquo;{review.text}&rdquo;
      </p>
      {shouldTruncate ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 self-start text-sm font-bold text-signal-600 hover:underline underline-offset-4"
        >
          {expanded ? labels.viewLess : labels.viewMore}
        </button>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line-200 pt-3">
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-steel-500 uppercase">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-signal-600" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          {labels.verified}
        </span>
      </div>
    </article>
  );
}
