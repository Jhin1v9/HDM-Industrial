"use client";

import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { companyFacts } from "@/content/company";

/** Form simples via mailto — sem backend próprio (sem duplicar o Request). */
export function ContactMailForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.contact;
  return (
    <form
      className="mt-4 flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name") ?? "");
        const message = String(data.get("message") ?? "");
        const email = companyFacts.email;
        if (!email) return;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(
          `Web HDM — ${name}`,
        )}&body=${encodeURIComponent(message)}`;
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
        <span className="text-sm font-bold text-ink-800">{c.messageLabel}</span>
        <textarea
          name="message"
          required
          rows={5}
          className="border border-line-300 bg-paper-50 p-3 text-base text-ink-950 focus:border-ink-800"
        />
      </label>
      <button
        type="submit"
        className="h-12 border border-ink-950 bg-ink-950 px-6 text-sm font-bold text-paper-50 hover:bg-ink-800"
      >
        {c.send}
      </button>
    </form>
  );
}
