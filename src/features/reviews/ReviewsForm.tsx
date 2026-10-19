"use client";

import { useState } from "react";
import { StarPicker } from "./StarRating";
import { submitReview } from "@/lib/reviews-submit";
import { PROJECT_TYPES } from "@/lib/reviews";
import { coverageAreas } from "@/content/coverage";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { Locale } from "@/domain/types";

const TEXT_MIN = 20;
const TEXT_MAX = 500;

type Status = "idle" | "submitting" | "success" | "error" | "not-configured";

export function ReviewsForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.reviews;
  const [stars, setStars] = useState(0);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [zone, setZone] = useState("");
  const [projectType, setProjectType] = useState("");
  const [email, setEmail] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const zoneSuggestions = coverageAreas.map(
    (a) => dict.coverage.items[a.slug as keyof typeof dict.coverage.items]?.name ?? a.slug,
  );

  const projectTypeLabels: Record<string, string> = t.projectTypes as Record<string, string>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !stars ||
      text.trim().length < TEXT_MIN ||
      text.trim().length > TEXT_MAX ||
      !name.trim() ||
      !zone.trim() ||
      !projectType ||
      !gdpr
    ) {
      setErrorMsg(t.errorRequired);
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    const res = await submitReview({
      name: name.trim(),
      zone: zone.trim(),
      project_type: projectType,
      stars,
      text: text.trim(),
      email: email.trim() || undefined,
      gdpr,
      locale,
    });
    if (res.ok) {
      setStatus("success");
    } else if (res.error === "reviews_not_configured") {
      setStatus("not-configured");
    } else if (res.error === "rate_limited") {
      setErrorMsg(t.errorSubmit);
      setStatus("error");
    } else {
      setErrorMsg(t.errorSubmit);
      setStatus("error");
    }
  }

  if (status === "success" || status === "not-configured") {
    return (
      <div className="border border-line-200 bg-paper-100 p-6 sm:p-8" aria-live="polite">
        <h3 className="text-xl font-extrabold tracking-tight text-ink-950">
          {status === "success" ? t.formSuccessTitle : t.errorNotConfigured}
        </h3>
        {status === "success" ? (
          <p className="mt-2 text-ink-600">{t.formSuccessText}</p>
        ) : null}
        {status === "success" ? (
          <p className="mt-3 border-t border-line-200 pt-3 font-mono text-xs tracking-wide text-steel-500 uppercase">
            {t.formDisclaimer}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line-200 bg-paper-50 p-5 sm:p-6" noValidate>
      <h3 className="text-xl font-extrabold tracking-tight text-ink-950">{t.formTitle}</h3>

      <div className="mt-5 flex flex-col gap-5">
        {/* Stars */}
        <fieldset>
          <legend className="mb-2 text-sm font-bold text-ink-800">{t.ratingLabel}</legend>
          <StarPicker
            value={stars}
            onChange={setStars}
            labels={[
              t.ratingTerrible,
              t.ratingBad,
              t.ratingOkay,
              t.ratingGood,
              t.ratingExcellent,
            ]}
          />
        </fieldset>

        {/* Text */}
        <div>
          <label htmlFor="review-text" className="mb-1.5 block text-sm font-bold text-ink-800">
            {t.textLabel}
          </label>
          <textarea
            id="review-text"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, TEXT_MAX))}
            placeholder={t.textPlaceholder}
            rows={4}
            className="w-full resize-y border border-line-300 bg-paper-50 p-3 text-base text-ink-950 placeholder:text-steel-400 focus:border-ink-800"
          />
          <p className="mt-1 text-right font-mono text-xs text-steel-500">
            {t.charCount.replace("{count}", String(text.length)).replace("{max}", String(TEXT_MAX))}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label htmlFor="review-name" className="mb-1.5 block text-sm font-bold text-ink-800">
              {t.nameLabel}
            </label>
            <input
              id="review-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="h-12 w-full border border-line-300 bg-paper-50 px-3 text-base text-ink-950 placeholder:text-steel-400 focus:border-ink-800"
            />
          </div>
          {/* Zone */}
          <div>
            <label htmlFor="review-zone" className="mb-1.5 block text-sm font-bold text-ink-800">
              {t.zoneLabel}
            </label>
            <input
              id="review-zone"
              type="text"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              placeholder={t.zonePlaceholder}
              list="review-zone-list"
              className="h-12 w-full border border-line-300 bg-paper-50 px-3 text-base text-ink-950 placeholder:text-steel-400 focus:border-ink-800"
            />
            <datalist id="review-zone-list">
              {zoneSuggestions.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          {/* Project type */}
          <div>
            <label htmlFor="review-type" className="mb-1.5 block text-sm font-bold text-ink-800">
              {t.projectTypeLabel}
            </label>
            <select
              id="review-type"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="h-12 w-full border border-line-300 bg-paper-50 px-3 text-base text-ink-950 focus:border-ink-800"
            >
              <option value="">—</option>
              {PROJECT_TYPES.map((pt) => (
                <option key={pt} value={pt}>
                  {projectTypeLabels[pt] ?? pt}
                </option>
              ))}
            </select>
          </div>
          {/* Email */}
          <div>
            <label htmlFor="review-email" className="mb-1.5 block text-sm font-bold text-ink-800">
              {t.emailLabel} <span className="font-normal text-steel-500">({t.emailHint})</span>
            </label>
            <input
              id="review-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="h-12 w-full border border-line-300 bg-paper-50 px-3 text-base text-ink-950 placeholder:text-steel-400 focus:border-ink-800"
            />
          </div>
        </div>

        {/* GDPR */}
        <label className="flex items-start gap-3 text-sm text-ink-700">
          <input
            type="checkbox"
            checked={gdpr}
            onChange={(e) => setGdpr(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-ink-950"
          />
          <span>{t.gdpr}</span>
        </label>

        {status === "error" && errorMsg ? (
          <p className="border border-red-300 bg-red-50 p-3 text-sm font-semibold text-red-800" role="alert">
            {errorMsg}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 items-center justify-center gap-2 bg-ink-950 px-6 text-sm font-bold tracking-wide text-paper-50 uppercase transition-colors duration-150 hover:bg-ink-800 disabled:opacity-60"
        >
          {status === "submitting" ? t.submitting : t.submit}
        </button>
      </div>
    </form>
  );
}
