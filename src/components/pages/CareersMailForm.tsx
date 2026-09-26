"use client";

import { useState } from "react";
import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { professionalProfiles } from "@/content/profiles";
import { companyFacts } from "@/content/company";
import {
  buildCareersBody,
  buildCareersMailto,
  classifyCvResponse,
  formatFileSize,
  isAcceptedCvFile,
  isCvSizeAllowed,
  type CareersMailInput,
} from "@/features/careers/mailto";

/**
 * Formulário de candidatura (sem banco de dados).
 * Caminho principal: POST multipart pro relay na VPS (nexo_hdm_cv), que grava o
 * CV em disco privado e envia o email com anexo para rrhh@hdmindustrial.es.
 * Sucesso = só após 2xx do relay (nunca simula envio, §85). Se o relay estiver
 * indisponível ou sem credencial de email (503), cai no caminho anterior:
 * Web Share API (anexo real no mobile) ou mailto com metadados do arquivo.
 * O CV selecionado nunca sai do aparelho sem ação de envio do candidato.
 */
export function CareersMailForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.careers;
  const hrEmail = companyFacts.hrEmail;
  const [cv, setCv] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!isAcceptedCvFile(file)) {
      setFileError(dict.request.attachmentBadType);
      setCv(null);
      return;
    }
    if (!isCvSizeAllowed(file.size)) {
      setFileError(dict.request.attachmentTooLarge);
      setCv(null);
      return;
    }
    setFileError(null);
    setCv(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hrEmail) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const input: CareersMailInput = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      profile: String(data.get("profile") ?? ""),
      zone: String(data.get("zone") ?? ""),
      message: String(data.get("message") ?? ""),
      attachment: cv ? { name: cv.name, sizeLabel: formatFileSize(cv.size) } : null,
    };
    const labels = {
      name: c.nameLabel,
      email: c.emailLabel,
      phone: c.phoneLabel,
      profile: c.profileLabel,
      zone: c.zoneLabel,
      attachment: c.attachEmailLabel,
    };

    void (async () => {
      /* Caminho principal: relay VPS. Só 2xx conta como enviado. */
      const endpoint = companyFacts.cvEndpoint;
      if (endpoint) {
        try {
          const res = await fetch(`${endpoint}/submit`, { method: "POST", body: data });
          if (classifyCvResponse(res.status) === "sent") {
            setSent(true);
            return;
          }
        } catch {
          /* rede indisponível → fallback abaixo, o candidato não se perde */
        }
      }

      /* Fallback 1: Web Share API entrega o arquivo anexado de verdade
         (celulares modernos; AbortError = usuário cancelou). */
      if (cv && typeof navigator !== "undefined" && "canShare" in navigator) {
        try {
          if (navigator.canShare({ files: [cv] })) {
            await navigator
              .share({ files: [cv], text: buildCareersBody(input, labels) })
              .catch(() => undefined);
            return;
          }
        } catch {
          // canShare indisponível neste aparelho → cai no mailto
        }
      }

      /* Fallback 2: mailto com metadados do CV no corpo (anexo é manual). */
      window.location.href = buildCareersMailto(input, hrEmail, labels);
    })();
  };

  if (sent) {
    return (
      <p className="border border-line-200 bg-paper-100 p-4 text-base font-semibold text-ink-900">
        {c.submitSuccess}
      </p>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Honeypot — invisível para humanos, obrigatório para bots (§115). */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-bold text-ink-800">{c.nameLabel}</span>
        <input
          name="name"
          required
          autoComplete="name"
          className="h-12 border border-line-300 bg-paper-50 px-3 text-base text-ink-950 focus:border-ink-800"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-bold text-ink-800">{c.emailLabel}</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="h-12 border border-line-300 bg-paper-50 px-3 text-base text-ink-950 focus:border-ink-800"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-bold text-ink-800">{c.phoneLabel}</span>
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="h-12 border border-line-300 bg-paper-50 px-3 text-base text-ink-950 focus:border-ink-800"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-bold text-ink-800">{c.profileLabel}</span>
        <select
          name="profile"
          required
          defaultValue=""
          className="h-12 border border-line-300 bg-paper-50 px-3 text-base text-ink-950 focus:border-ink-800"
        >
          <option value="" disabled>
            {c.profilePlaceholder}
          </option>
          {professionalProfiles.map((p) => (
            <option key={p.id} value={dict.profiles.items[p.id]?.name ?? p.id}>
              {dict.profiles.items[p.id]?.name ?? p.id}
            </option>
          ))}
          <option value={c.profileOther}>{c.profileOther}</option>
        </select>
      </label>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-bold text-ink-800">{c.attachLabel}</span>
        <label className="flex h-12 cursor-pointer items-center justify-center gap-2 border border-dashed border-line-300 bg-paper-50 px-3 text-sm font-semibold text-ink-700 transition-colors hover:border-ink-600">
          <span className="truncate">{cv ? `${c.attachSelected}: ${cv.name}` : c.attachCta}</span>
          <input
            name="cv"
            type="file"
            className="sr-only"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
        {fileError ? <span className="text-sm font-semibold text-signal-600">{fileError}</span> : null}
        <span className="text-xs text-steel-500">{c.attachPrivacy}</span>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-bold text-ink-800">{c.zoneLabel}</span>
        <input
          name="zone"
          className="h-12 border border-line-300 bg-paper-50 px-3 text-base text-ink-950 focus:border-ink-800"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-bold text-ink-800">{c.messageLabel}</span>
        <textarea
          name="message"
          rows={4}
          className="border border-line-300 bg-paper-50 p-3 text-base text-ink-950 focus:border-ink-800"
        />
      </label>
      <button
        type="submit"
        disabled={!hrEmail}
        className="flex h-12 items-center justify-center border border-signal-500 bg-signal-600 px-5 text-sm font-extrabold tracking-wide text-white uppercase hover:bg-signal-700 disabled:opacity-50"
      >
        {c.send}
      </button>
    </form>
  );
}
