"use client";

import { StarIcon } from "@/components/ui/icons";

/** Read-only star display (1-5). */
export function StarRating({
  value,
  className = "h-4 w-4",
  label,
}: {
  value: number;
  className?: string;
  label?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-0.5 text-signal-600"
      role="img"
      aria-label={label ?? `${value}/5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={className} filled={i < value} />
      ))}
    </span>
  );
}

/** Interactive 1-5 star picker (form). */
export function StarPicker({
  value,
  onChange,
  labels,
}: {
  value: number;
  onChange: (v: number) => void;
  labels: string[];
}) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="rating">
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1;
        const active = star <= value;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === value}
            aria-label={labels[i] ?? String(star)}
            onClick={() => onChange(star)}
            className={`p-0.5 transition-colors duration-150 ${
              active ? "text-signal-600" : "text-line-300 hover:text-steel-400"
            }`}
          >
            <StarIcon className="h-7 w-7" filled={active} />
          </button>
        );
      })}
      {value > 0 ? (
        <span className="ml-2 text-sm font-semibold text-ink-600">
          {labels[value - 1]}
        </span>
      ) : null}
    </div>
  );
}
