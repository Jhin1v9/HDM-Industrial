"use client";

import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { professionalProfiles } from "@/content/profiles";
import { companyFacts } from "@/content/company";
import { buildCareersMailto } from "@/features/careers/mailto";

/**
 * Formulário de candidatura via mailto (Etapa A, sem backend).
 * Prepara o correio para rrhh@hdmindustrial.es; o candidato revisa e anexa o CV
 * no próprio cliente de email. Nunca simula envio.
 */
export function CareersMailForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.careers;
  const hrEmail = companyFacts.hrEmail;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!hrEmail) return;
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name") ?? "");
        const email = String(data.get("email") ?? "");
        const phone = String(data.get("phone") ?? "");
        const profile = String(data.get("profile") ?? "");
        const zone = String(data.get("zone") ?? "");
        const message = String(data.get("message") ?? "");
        window.location.href = buildCareersMailto(
          { name, email, phone, profile, zone, message },
          hrEmail,
          {
            name: c.nameLabel,
            email: c.emailLabel,
            phone: c.phoneLabel,
            profile: c.profileLabel,
            zone: c.zoneLabel,
          },
        );
      }}
    >
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
