"use client";

import { useState } from "react";
import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { professionalProfiles } from "@/content/profiles";
import { companyFacts } from "@/content/company";
import {
  buildCareersBody,
  buildCareersMailto,
  formatFileSize,
  isAcceptedCvFile,
  isCvSizeAllowed,
  type CareersMailInput,
} from "@/features/careers/mailto";

/**
 * Formulário de candidatura (Etapa A, sem backend).
 * O CV selecionado fica SÓ no navegador do candidato — nada é enviado a
 * servidor ou banco de dados. No submit:
 * 1. Se o aparelho suporta Web Share API com arquivos, o email sai com o CV
 *    anexado de verdade;
 * 2. Senão, abre o cliente de email com o nome do arquivo no corpo e a
 *    instrução de anexá-lo.
 * Nunca simula envio.
 */
export function CareersMailForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.careers;
  const hrEmail = companyFacts.hrEmail;
  const [cv, setCv] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

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
    const data = new FormData(e.currentTarget);
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

    // Caminho 1: Web Share API entrega o arquivo anexado de verdade
    // (suportado em celulares modernos; AbortError = usuário cancelou).
    if (cv && typeof navigator !== "undefined" && "canShare" in navigator) {
      try {
        if (navigator.canShare({ files: [cv] })) {
          navigator
            .share({ files: [cv], text: buildCareersBody(input, labels) })
            .catch(() => undefined);
          return;
        }
      } catch {
        // canShare indisponível/instável neste aparelho → cai no mailto
      }
    }

    // Caminho 2: mailto com metadados do CV no corpo (anexo é manual).
    window.location.href = buildCareersMailto(input, hrEmail, labels);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
