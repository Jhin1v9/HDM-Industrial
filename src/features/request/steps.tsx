"use client";

import { useRef, useState } from "react";
import type { Locale, NeedTypeId, TimingOption } from "@/domain/types";
import { needTypes } from "@/content/modes";
import { coverageAreas } from "@/content/coverage";
import { sectors } from "@/content/sectors";
import { isAllowedUpload, UPLOAD_LIMITS } from "@/domain/requestSchema";
import { generateLineId } from "@/domain/request";
import { getDictionary } from "@/i18n";
import { useRequest } from "./store";
import { OptionCard, Field, TextInput, TextArea, TriStateRadio } from "./controls";
import { TeamComposer } from "./composer";
import { trackEvent } from "@/features/analytics/events";

/* --------------------------------- NEED STEP -------------------------------- */

export function NeedStep({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.request;
  const { request, dispatch } = useRequest();

  return (
    <div className="flex flex-col gap-6">
      <div role="radiogroup" aria-label={t.needTitle} className="grid gap-2 sm:grid-cols-2">
        {needTypes.map((need) => {
          const label = t.needTypes[need.id];
          return (
            <OptionCard
              key={need.id}
              name={need.id}
              selected={request.needType === need.id}
              onSelect={() => {
                dispatch({ type: "setNeedType", needType: request.needType === need.id ? null : (need.id as NeedTypeId) });
                trackEvent("need_type_selected", { needType: need.id, locale });
              }}
              title={label?.name ?? need.id}
              hint={label?.hint}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-2 border-t border-line-200 pt-4">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={dict.common.requestMode}>
          <button
            type="button"
            role="radio"
            aria-checked={request.mode === "expert"}
            onClick={() => dispatch({ type: "setMode", mode: "expert" })}
            className={`h-10 border px-4 text-sm font-semibold ${
              request.mode === "expert"
                ? "border-signal-500 bg-ink-900 text-paper-50"
                : "border-line-300 text-ink-700 hover:border-ink-600"
            }`}
          >
            {t.modeExpert}
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={request.mode === "assisted"}
            onClick={() => dispatch({ type: "setMode", mode: "assisted" })}
            className={`h-10 border px-4 text-sm font-semibold ${
              request.mode === "assisted"
                ? "border-signal-500 bg-ink-900 text-paper-50"
                : "border-line-300 text-ink-700 hover:border-ink-600"
            }`}
          >
            {t.modeAssisted}
          </button>
        </div>
        {request.mode === "assisted" ? (
          <p className="text-sm text-ink-600">{t.assistedLead}</p>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------- PROFILES STEP ------------------------------ */

export function ProfilesStep({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.request;
  const { request, dispatch } = useRequest();

  if (request.mode === "assisted") {
    return (
      <div className="flex flex-col gap-5">
        <TextArea
          maxLength={4000}
          label={t.assistedTitle}
          value={request.jobDescription ?? ""}
          onChange={(v) => dispatch({ type: "setJobDescription", jobDescription: v || null })}
          placeholder={t.assistedPlaceholder}
          rows={6}
          hint={t.assistedLead}
        />
        <TextInput
          label={t.assistedQuantity}
          value={request.approximateQuantity != null ? String(request.approximateQuantity) : ""}
          onChange={(v) => {
            const n = Number(v.replace(/[^0-9]/g, ""));
            dispatch({
              type: "setApproximateQuantity",
              approximateQuantity: Number.isFinite(n) && n > 0 ? Math.min(500, n) : null,
            });
          }}
          inputMode="numeric"
          placeholder="Ej.: 12"
        />
        <p className="text-sm text-ink-600">
          {t.profilesLead}
        </p>
        <TeamComposer locale={locale} />
      </div>
    );
  }

  return <TeamComposer locale={locale} />;
}

/* -------------------------------- PROJECT STEP ------------------------------- */

export function ProjectStep({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.request;
  const { request, dispatch } = useRequest();
  const p = request.project;
  const [dateError, setDateError] = useState<string | null>(null);

  const timingOptions: TimingOption[] = ["urgente", "esta-semana", "este-mes", "fecha-concreta", "sin-fecha"];
  const now = new Date();
  const todayIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-6">
      <Field label={t.timingLabel}>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t.timingLabel}>
          {timingOptions.map((option) => {
            const selected = p.timing === option;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => dispatch({ type: "setTiming", timing: selected ? null : option })}
                className={`h-11 border px-4 text-sm font-semibold transition-colors duration-150 ${
                  selected
                    ? "border-signal-500 bg-ink-900 text-paper-50"
                    : "border-line-300 text-ink-800 hover:border-ink-600"
                }`}
              >
                {t.timing[option]}
              </button>
            );
          })}
        </div>
      </Field>

      {p.timing === "fecha-concreta" ? (
        <Field label={t.startDateLabel} error={dateError ?? undefined}>
          <input
            type="date"
            min={todayIso}
            value={p.startDate ?? ""}
            aria-label={t.startDateLabel}
            onChange={(e) => {
              const value = e.target.value || null;
              if (value && value < todayIso) {
                setDateError(t.errors.past_date);
              } else {
                setDateError(null);
                dispatch({ type: "setStartDate", startDate: value });
                trackEvent("start_date_selected", { locale });
              }
            }}
            className="h-12 border border-line-300 bg-paper-50 px-3 text-base text-ink-950 focus:border-ink-800"
          />
        </Field>
      ) : null}

      <Field label={t.durationLabel}>
        <div className="flex flex-wrap items-stretch gap-2">
          <input
            inputMode="numeric"
            aria-label={t.durationValueLabel}
            placeholder={t.durationPlaceholder}
            value={p.duration.value != null ? String(p.duration.value) : ""}
            disabled={p.duration.unit === "continuado" || p.duration.unit === "por-definir"}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9]/g, "");
              dispatch({
                type: "setDuration",
                duration: {
                  value: raw === "" ? null : Math.max(1, Math.min(3650, Number(raw))),
                  unit: p.duration.unit ?? "semanas",
                },
              });
            }}
            className="tnum h-12 w-24 border border-line-300 bg-paper-50 px-3 text-base text-ink-950 disabled:opacity-40 focus:border-ink-800"
          />
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t.durationLabel}>
            {(["dias", "semanas", "meses", "continuado", "por-definir"] as const).map((unit) => {
              const selected = p.duration.unit === unit;
              return (
                <button
                  key={unit}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() =>
                    dispatch({
                      type: "setDuration",
                      duration:
                        unit === "continuado" || unit === "por-definir"
                          ? { value: null, unit }
                          : { value: p.duration.value, unit },
                    })
                  }
                  className={`h-12 border px-3 text-sm font-semibold transition-colors duration-150 ${
                    selected
                      ? "border-signal-500 bg-ink-900 text-paper-50"
                      : "border-line-300 text-ink-800 hover:border-ink-600"
                  }`}
                >
                  {t.durationUnits[unit]}
                </button>
              );
            })}
          </div>
        </div>
      </Field>

      <Field label={t.locationLabel} hint={t.locationHint}>
        <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label={t.locationLabel}>
          {coverageAreas.map((area) => {
            const selected = p.coverageArea === area.id;
            return (
              <OptionCard
                key={area.id}
                name={area.id}
                selected={selected}
                onSelect={() => {
                  dispatch({
                    type: "setCoverageArea",
                    coverageArea: selected ? null : area.id,
                  });
                  trackEvent("location_selected", { area: area.id, locale });
                }}
                title={dict.coverage.items[area.id]?.name ?? area.id}
              />
            );
          })}
        </div>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          maxLength={120}
          label={t.cityLabel}
          value={p.city ?? ""}
          onChange={(v) => dispatch({ type: "setCity", city: v || null })}
        />
        <TextInput
          maxLength={255}
          label={t.addressLabel}
          value={p.address ?? ""}
          onChange={(v) => dispatch({ type: "setAddress", address: v || null })}
        />
      </div>

      <Field label={t.sectorLabel}>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t.sectorLabel}>
          {sectors.map((sector) => {
            const selected = request.sector === sector.id;
            return (
              <button
                key={sector.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => dispatch({ type: "setSector", sector: selected ? null : sector.id })}
                className={`h-11 border px-4 text-sm font-semibold transition-colors duration-150 ${
                  selected
                    ? "border-signal-500 bg-ink-900 text-paper-50"
                    : "border-line-300 text-ink-800 hover:border-ink-600"
                }`}
              >
                {dict.sectors.items[sector.id]?.name ?? sector.id}
              </button>
            );
          })}
        </div>
      </Field>

      <TextInput
        maxLength={120}
        label={t.shiftLabel}
        value={p.shift ?? ""}
        onChange={(v) => dispatch({ type: "setShift", shift: v || null })}
        placeholder={t.shiftPlaceholder}
      />

      <TextArea
        maxLength={4000}
        label={t.descriptionLabel}
        value={p.description ?? ""}
        onChange={(v) => dispatch({ type: "setDescription", description: v || null })}
        rows={4}
      />
    </div>
  );
}

/* ------------------------------- LOGISTICS STEP ------------------------------ */

export function LogisticsStep({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.request;
  const { request, dispatch } = useRequest();
  const l = request.logistics;

  const triOptions = [
    { value: "required" as const, label: t.logisticsYes },
    { value: "not_required" as const, label: t.logisticsNo },
    { value: "to_be_defined" as const, label: t.logisticsTbd },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Field label={t.displacement}>
        <TriStateRadio
          groupLabel={t.displacement}
          value={l.displacement}
          onChange={(v) => {
            dispatch({
              type: "setLogistics",
              logistics: {
                displacement: v,
                displacementScope: v === "required" ? l.displacementScope : null,
              },
            });
            trackEvent("logistics_added", { displacement: v, locale });
          }}
          options={triOptions}
        />
      </Field>

      {l.displacement === "required" ? (
        <>
          <Field label={t.displacementScope}>
            <TriStateRadio
              groupLabel={t.displacementScope}
              value={l.displacementScope}
              onChange={(v) => dispatch({ type: "setLogistics", logistics: { displacementScope: v } })}
              options={[
                { value: "espana", label: t.displacementEspana },
                { value: "portugal", label: t.displacementPortugal },
              ]}
            />
          </Field>
          <Field label={t.accommodation}>
            <TriStateRadio
              groupLabel={t.accommodation}
              value={l.accommodation}
              onChange={(v) => dispatch({ type: "setLogistics", logistics: { accommodation: v } })}
              options={triOptions}
            />
          </Field>
          <Field label={t.transport}>
            <TriStateRadio
              groupLabel={t.transport}
              value={l.transport}
              onChange={(v) => dispatch({ type: "setLogistics", logistics: { transport: v } })}
              options={triOptions}
            />
          </Field>
          <Field label={t.allowances}>
            <TriStateRadio
              groupLabel={t.allowances}
              value={l.allowances}
              onChange={(v) => dispatch({ type: "setLogistics", logistics: { allowances: v } })}
              options={triOptions}
            />
          </Field>
          <TextArea
            maxLength={1000}
            label={t.logisticsNotes}
            value={l.notes ?? ""}
            onChange={(v) => dispatch({ type: "setLogistics", logistics: { notes: v || null } })}
            rows={3}
          />
        </>
      ) : null}

      <Field label={t.certsQuestion}>
        <TriStateRadio
          groupLabel={t.certsQuestion}
          value={request.certificationRequired}
          onChange={(v) => dispatch({ type: "setCertificationRequired", required: v })}
          options={[
            { value: "si", label: t.certsYes },
            { value: "no", label: t.certsNo },
            { value: "no-se", label: t.certsUnknown },
          ]}
        />
      </Field>

      {request.certificationRequired === "si" ? (
        <TextArea
          label={t.certsLabel}
          value={request.certificationRequirements.join("\n")}
          onChange={(v) =>
            dispatch({
              type: "setCertificationRequirements",
              requirements: v
                .split("\n")
                .map((line) => line.trim().slice(0, 200))
                .filter(Boolean)
                .slice(0, 20),
            })
          }
          rows={3}
          hint={t.certsHint}
        />
      ) : null}

      <AttachmentsBlock locale={locale} />
    </div>
  );
}

/* -------------------------------- ATTACHMENTS -------------------------------- */

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function AttachmentsBlock({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.request;
  const { request, dispatch } = useRequest();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <div className="flex flex-col gap-3 border-t border-line-200 pt-5">
      <div>
        <p className="text-sm font-bold text-ink-800">{t.attachmentsTitle}</p>
        <p className="mt-1 text-sm text-ink-600">{t.attachmentsLead}</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        aria-label={t.attachmentsCta}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        className="sr-only"
        accept={UPLOAD_LIMITS.allowedMimeTypes.join(",")}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          setError(null);
          let remaining = UPLOAD_LIMITS.maxFiles - request.attachments.length;
          for (const file of files) {
            if (remaining <= 0) {
              setError(t.attachmentTooMany);
              break;
            }
            if (!isAllowedUpload(file.type, file.size)) {
              setError(
                file.size > UPLOAD_LIMITS.maxSizeBytes
                  ? t.attachmentTooLarge
                  : t.attachmentBadType,
              );
              continue;
            }
            remaining -= 1;
            dispatch({
              type: "addAttachment",
              attachment: {
                id: generateLineId(),
                name: file.name.slice(0, 255),
                size: file.size,
                mimeType: file.type,
                status: "ready",
              },
            });
            trackEvent("attachment_added", { locale });
          }
          e.target.value = "";
        }}
      />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          tabIndex={-1}
          onClick={() => inputRef.current?.click()}
          className={`h-11 border border-ink-800 bg-paper-50 px-4 text-sm font-bold text-ink-900 transition-colors duration-150 hover:bg-paper-100 ${
            inputFocused ? "outline-2 outline-offset-2 outline-ink-950" : ""
          }`}
        >
          {t.attachmentsCta}
        </button>
        <p className="text-xs text-steel-500">{t.attachmentsNote}</p>
      </div>
      {error ? (
        <p role="alert" className="text-sm font-semibold text-signal-600">
          {error}
        </p>
      ) : null}
      {request.attachments.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {request.attachments.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between gap-3 border border-line-300 bg-paper-50 px-3 py-2"
            >
              <span className="truncate text-sm text-ink-800">
                {a.name} <span className="tnum text-xs text-steel-500">· {formatSize(a.size)}</span>
              </span>
              <button
                type="button"
                onClick={() => dispatch({ type: "removeAttachment", id: a.id })}
                className="text-sm font-semibold text-ink-600 hover:text-signal-600"
                aria-label={`${t.attachmentRemove}: ${a.name}`}
              >
                {t.attachmentRemove}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
