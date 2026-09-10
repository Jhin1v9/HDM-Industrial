"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { coverageAreas } from "@/content/coverage";
import { needTypes } from "@/content/modes";
import { sectors } from "@/content/sectors";
import { isRequestEmpty, totalProfessionals } from "@/domain/request";
import { useRequest, useResetRequest } from "./store";
import { NeedStep, ProfilesStep, ProjectStep, LogisticsStep } from "./steps";
import { TextInput } from "./controls";
import { submitRequest } from "./submit";
import { buildWhatsappMessage } from "./whatsapp";
import { formatDuration, formatStartDate, formatTiming } from "./format";
import { whatsappLink, companyFacts } from "@/content/company";
import { trackEvent } from "@/features/analytics/events";

const STEPS = ["need", "profiles", "project", "logistics", "summary", "contact"] as const;
type Step = (typeof STEPS)[number];

export function RequestPanel({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.request;
  const { request } = useRequest();
  const [step, setStep] = useState<Step>("need");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const stepIndex = STEPS.indexOf(step);
  const stepTitles: Record<Step, string> = {
    need: t.stepNeed,
    profiles: t.stepProfiles,
    project: t.stepProject,
    logistics: t.stepLogistics,
    summary: t.stepSummary,
    contact: t.stepContact,
  };

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (step === "summary") trackEvent("summary_viewed", { locale });
    if (step === "contact") trackEvent("contact_started", { locale });
  }, [step, locale]);

  if (request.status === "submitted" && request.reference) {
    return <SuccessView locale={locale} />;
  }

  const empty = isRequestEmpty(request);
  const canContinue = step !== "profiles" || !empty;

  return (
    <div className="flex flex-col gap-6">
      {/* Progresso — orientação, não decoração */}
      <nav aria-label={dict.common.requestProgress} className="flex flex-wrap gap-1">
        {STEPS.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => i <= stepIndex && setStep(s)}
            aria-current={s === step ? "step" : undefined}
            disabled={i > stepIndex}
            className={`h-8 border px-2.5 font-mono text-[11px] tracking-wide uppercase transition-colors duration-150 ${
              s === step
                ? "border-ink-950 bg-ink-950 text-paper-50"
                : i < stepIndex
                  ? "border-line-300 bg-paper-50 text-ink-700 hover:border-ink-600"
                  : "border-line-200 bg-paper-100 text-steel-400"
            }`}
          >
            {i + 1} · {stepTitles[s]}
          </button>
        ))}
      </nav>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-extrabold tracking-tight text-ink-950 focus:outline-none"
      >
        {step === "summary" ? t.summaryTitle : stepTitles[step]}
      </h2>

      {step === "need" ? <NeedStep locale={locale} /> : null}
      {step === "profiles" ? <ProfilesStep locale={locale} /> : null}
      {step === "project" ? <ProjectStep locale={locale} /> : null}
      {step === "logistics" ? <LogisticsStep locale={locale} /> : null}
      {step === "summary" ? <SummaryView locale={locale} goTo={setStep} /> : null}
      {step === "contact" ? <ContactStep locale={locale} /> : null}

      {step !== "contact" ? (
        <div className="flex items-center justify-between gap-3 border-t border-line-200 pt-4">
          <button
            type="button"
            onClick={() => setStep(STEPS[Math.max(0, stepIndex - 1)] ?? "need")}
            disabled={stepIndex === 0}
            className="h-11 border border-line-300 px-4 text-sm font-bold text-ink-800 disabled:opacity-40 hover:border-ink-600"
          >
            {dict.common.back}
          </button>
          <div className="flex flex-col items-end gap-1">
            {!canContinue ? (
              <p role="alert" className="text-sm font-semibold text-signal-600">
                {t.errors.empty_request}
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => canContinue && setStep(STEPS[Math.min(STEPS.length - 1, stepIndex + 1)] ?? "summary")}
              className="h-11 border border-ink-950 bg-ink-950 px-6 text-sm font-bold text-paper-50 transition-colors duration-150 hover:bg-ink-800 disabled:opacity-40"
              disabled={!canContinue}
            >
              {dict.common.next}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ---------------------------------- SUMMARY --------------------------------- */

function SummaryRow({
  label,
  value,
  onEdit,
  editLabel,
}: {
  label: string;
  value: string | null;
  onEdit: () => void;
  editLabel: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line-200 py-2.5">
      <div>
        <dt className="font-mono text-[11px] tracking-widest text-steel-500 uppercase">{label}</dt>
        <dd className="mt-0.5 text-base font-semibold text-ink-950">{value}</dd>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-sm font-bold text-signal-600 underline-offset-2 hover:underline"
      >
        {editLabel}
      </button>
    </div>
  );
}

export function SummaryView({ locale, goTo }: { locale: Locale; goTo: (s: Step) => void }) {
  const dict = getDictionary(locale);
  const t = dict.request;
  const { request } = useRequest();
  const total = totalProfessionals(request.profiles);
  const area = coverageAreas.find((a) => a.id === request.project.coverageArea);
  const need = needTypes.find((n) => n.id === request.needType);
  const sector = sectors.find((s) => s.id === request.sector);

  const logisticsItems: string[] = [];
  if (request.logistics.displacement === "required") {
    logisticsItems.push(
      request.logistics.displacementScope === "portugal"
        ? t.displacementPortugal
        : t.displacementEspana,
    );
    if (request.logistics.accommodation === "required") logisticsItems.push(t.accommodation);
    if (request.logistics.transport === "required") logisticsItems.push(t.transport);
    if (request.logistics.allowances === "required") logisticsItems.push(t.allowances);
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-ink-600">{t.summaryLead}</p>
      <dl>
        <SummaryRow
          label={t.summaryNeed}
          value={need ? (t.needTypes[need.id]?.name ?? null) : null}
          onEdit={() => goTo("need")}
          editLabel={dict.common.editRequest}
        />
        {request.profiles.length > 0 ? (
          <div className="border-b border-line-200 py-2.5">
            <div className="flex items-start justify-between gap-4">
              <div className="w-full">
                <dt className="font-mono text-[11px] tracking-widest text-steel-500 uppercase">
                  {t.summaryProfiles}
                </dt>
                <dd className="mt-1">
                  <ul className="flex flex-col gap-1">
                    {request.profiles.map((p) => {
                      const spec =
                        p.specialization != null
                          ? ` ${dict.profiles.specializations[p.specialization]?.name ?? ""}`
                          : "";
                      return (
                        <li key={p.lineId} className="flex items-baseline justify-between gap-3">
                          <span className="text-base font-semibold text-ink-950">
                            {dict.profiles.items[p.profession]?.singular ?? p.profession}
                            {spec}
                          </span>
                          <span className="tnum text-base font-black">{p.quantity}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-2 border-t-2 border-ink-950 pt-2 text-sm font-bold">
                    <span className="tnum text-lg">{total}</span> {t.summaryTotal}
                  </p>
                </dd>
              </div>
              <button
                type="button"
                onClick={() => goTo("profiles")}
                className="shrink-0 text-sm font-bold text-signal-600 underline-offset-2 hover:underline"
              >
                {dict.common.editRequest}
              </button>
            </div>
          </div>
        ) : null}
        {request.mode === "assisted" && request.jobDescription ? (
          <SummaryRow
            label={t.assistedTitle}
            value={request.jobDescription.slice(0, 180)}
            onEdit={() => goTo("profiles")}
            editLabel={dict.common.editRequest}
          />
        ) : null}
        <SummaryRow
          label={t.summaryLocation}
          value={area ? (dict.coverage.items[area.id]?.name ?? null) : request.project.city}
          onEdit={() => goTo("project")}
          editLabel={dict.common.editRequest}
        />
        <SummaryRow
          label={t.summaryStart}
          value={
            (request.project.timing === "fecha-concreta"
              ? formatStartDate(request.project.startDate, locale)
              : null) ?? formatTiming(request.project.timing, dict)
          }
          onEdit={() => goTo("project")}
          editLabel={dict.common.editRequest}
        />
        <SummaryRow
          label={t.summaryDuration}
          value={formatDuration(request.project.duration, dict)}
          onEdit={() => goTo("project")}
          editLabel={dict.common.editRequest}
        />
        <SummaryRow
          label={t.summaryShift}
          value={request.project.shift}
          onEdit={() => goTo("project")}
          editLabel={dict.common.editRequest}
        />
        <SummaryRow
          label={t.summarySector}
          value={sector ? (dict.sectors.items[sector.id]?.name ?? null) : null}
          onEdit={() => goTo("project")}
          editLabel={dict.common.editRequest}
        />
        <SummaryRow
          label={t.summaryLogistics}
          value={logisticsItems.length > 0 ? logisticsItems.join(" · ") : null}
          onEdit={() => goTo("logistics")}
          editLabel={dict.common.editRequest}
        />
        <SummaryRow
          label={t.summaryDocs}
          value={
            request.attachments.length > 0
              ? request.attachments.map((a) => a.name).join(", ")
              : null
          }
          onEdit={() => goTo("logistics")}
          editLabel={dict.common.editRequest}
        />
      </dl>

      {/* Trust panel (Doc 07 §93) */}
      <ul className="flex flex-col gap-1.5 border border-line-300 bg-paper-100 p-4">
        <li className="font-mono text-[11px] tracking-widest text-steel-500 uppercase">
          {t.summaryTitle}
        </li>
        {t.trustPanel.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-ink-800">
            <span aria-hidden="true" className="font-bold text-ok-600">✓</span> {item}
          </li>
        ))}
      </ul>
      <p className="text-sm text-ink-600">{t.summaryDisclaimer}</p>
    </div>
  );
}

/* ---------------------------------- CONTACT --------------------------------- */

function ContactStep({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.request;
  const { request, dispatch, setSubmissionDemo } = useRequest();
  const [submitting, setSubmitting] = useState(false);
  const [failure, setFailure] = useState<"no_backend" | "network" | "unknown" | null>(null);
  const [failureIssue, setFailureIssue] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [touched, setTouched] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.contact.email);
  const phoneValid = /^[+0-9 ().-]{6,32}$/.test(request.contact.phone.trim());
  const valid =
    request.contact.company.trim().length >= 2 &&
    request.contact.name.trim().length >= 2 &&
    phoneValid &&
    emailValid;

  async function onSubmit() {
    setTouched(true);
    if (!valid || submitting) return;
    setSubmitting(true);
    setFailure(null);
    dispatch({ type: "markSubmitting" });
    const outcome = await submitRequest(request, honeypot);
    if (outcome.ok) {
      dispatch({ type: "markSubmitted", reference: outcome.reference });
      setSubmissionDemo(outcome.demo);
      trackEvent("request_submitted", {
        locale,
        profiles: request.profiles.length,
        total: totalProfessionals(request.profiles),
        demo: outcome.demo,
      });
    } else {
      dispatch({ type: "markFailed" });
      trackEvent("request_failed", { locale, reason: outcome.reason });
      setFailure(outcome.reason === "validation" ? "unknown" : outcome.reason);
      setFailureIssue(
        outcome.reason === "validation" ? (outcome.issues?.[0] ?? null) : null,
      );
    }
    setSubmitting(false);
  }

  if (failure) {
    return (
      <FailureView
        locale={locale}
        reason={failure}
        validationIssue={failureIssue}
        onRetry={() => {
          setFailure(null);
          setFailureIssue(null);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-ink-600">{t.contactLead}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          label={t.contactCompany}
          required
          autoComplete="organization"
          maxLength={160}
          value={request.contact.company}
          onChange={(v) => dispatch({ type: "setContact", contact: { company: v } })}
          error={touched && request.contact.company.trim().length < 2 ? t.errors.required : undefined}
        />
        <TextInput
          label={t.contactName}
          required
          autoComplete="name"
          maxLength={160}
          value={request.contact.name}
          onChange={(v) => dispatch({ type: "setContact", contact: { name: v } })}
          error={touched && request.contact.name.trim().length < 2 ? t.errors.required : undefined}
        />
        <TextInput
          label={t.contactPhone}
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={32}
          value={request.contact.phone}
          onChange={(v) => dispatch({ type: "setContact", contact: { phone: v } })}
          error={touched && !phoneValid ? t.errors.invalid_phone : undefined}
        />
        <TextInput
          label={t.contactEmail}
          required
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          value={request.contact.email}
          onChange={(v) => dispatch({ type: "setContact", contact: { email: v } })}
          error={touched && !emailValid ? t.errors.invalid_email : undefined}
        />
      </div>

      {/* Honeypot — invisível para humanos (§115) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          {t.honeypotLabel}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <p className="text-xs text-steel-500">{t.privacyNote}</p>

      <div className="flex items-center justify-between gap-3 border-t border-line-200 pt-4">
        <span className="text-sm text-ink-600">{t.summaryDisclaimer}</span>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting || (touched && !valid)}
          className="h-12 border border-signal-600 bg-signal-600 px-8 text-base font-extrabold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-signal-700 disabled:opacity-50"
        >
          {submitting ? t.submitting : t.submit}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------- SUCCESS/ERROR ------------------------------ */

function SuccessView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.request;
  const { request, submissionDemo } = useRequest();
  const reset = useResetRequest();

  return (
    <div className="flex flex-col gap-6" role="status">
      <div className="border-2 border-ok-600 bg-paper-50 p-6">
        <p className="font-mono text-xs tracking-[0.2em] text-ok-600 uppercase">{t.successTitle}</p>
        <p className="mt-3 font-mono text-sm text-steel-500">{t.successReference}</p>
        <p className="tnum text-3xl font-black tracking-tight text-ink-950">{request.reference}</p>
      </div>
      <p className="text-base text-ink-800">{t.successBody}</p>
      {submissionDemo ? (
        <p className="text-xs text-steel-500">{t.successDemoNote}</p>
      ) : null}
      <SummaryStatic locale={locale} />
      <div>
        <button
          type="button"
          onClick={() => reset(locale)}
          className="h-11 border border-ink-950 px-5 text-sm font-bold text-ink-950 hover:bg-paper-100"
        >
          {t.successNew}
        </button>
      </div>
    </div>
  );
}

function SummaryStatic({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { request } = useRequest();
  const total = totalProfessionals(request.profiles);
  if (request.profiles.length === 0) return null;
  return (
    <ul className="flex flex-col gap-1 border-t border-line-200 pt-4">
      {request.profiles.map((p) => {
        const spec =
          p.specialization != null
            ? ` ${dict.profiles.specializations[p.specialization]?.name ?? ""}`
            : "";
        return (
          <li key={p.lineId} className="flex justify-between gap-3 text-sm">
            <span className="font-semibold text-ink-800">
              {dict.profiles.items[p.profession]?.singular ?? p.profession}
              {spec}
            </span>
            <span className="tnum font-black">{p.quantity}</span>
          </li>
        );
      })}
      <li className="mt-1 border-t-2 border-ink-950 pt-2 text-sm font-bold">
        <span className="tnum">{total}</span> {dict.request.summaryTotal}
      </li>
    </ul>
  );
}

function FailureView({
  locale,
  reason,
  validationIssue,
  onRetry,
}: {
  locale: Locale;
  reason: "no_backend" | "network" | "unknown";
  validationIssue?: string | null;
  onRetry: () => void;
}) {
  const dict = getDictionary(locale);
  const t = dict.request;
  const { request } = useRequest();
  const message = buildWhatsappMessage(request, dict, locale);
  const waLink = whatsappLink(message);

  return (
    <div className="flex flex-col gap-5" role="alert">
      <div className="border-2 border-signal-600 bg-paper-50 p-6">
        <p className="text-xl font-extrabold text-ink-950">{t.failureTitle}</p>
        <p className="mt-2 text-base text-ink-800">
          {reason === "no_backend"
            ? t.errors.no_backend
            : validationIssue && validationIssue in t.errors
              ? t.errors[validationIssue as keyof typeof t.errors]
              : t.failureBody}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="h-12 border border-ink-950 bg-ink-950 px-6 text-sm font-bold text-paper-50 hover:bg-ink-800"
        >
          {t.failureRetry}
        </button>
        {waLink ? (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_handoff", { locale })}
            className="flex h-12 items-center border border-ok-600 px-6 text-sm font-bold text-ok-600 hover:bg-paper-100"
          >
            {t.failureWhatsapp}
          </a>
        ) : null}
        {companyFacts.phone ? (
          <a
            href={`tel:${companyFacts.phone.replace(/[^+0-9]/g, "")}`}
            onClick={() => trackEvent("phone_click", { locale })}
            className="flex h-12 items-center border border-line-300 px-6 text-sm font-bold text-ink-800 hover:border-ink-600"
          >
            {t.failureCall}
          </a>
        ) : null}
      </div>
    </div>
  );
}
