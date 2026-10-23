"use client";

import { useState } from "react";
import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { companyFacts } from "@/content/company";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

/**
 * Formulário de contacto: caminho principal POST /contact no relay da VPS
 * (envia o email por SMTP e responde 2xx só após aceite do servidor).
 * Se o relay estiver indisponível, cai no mailto direto para info@ — o site
 * nunca simula envio.
 */
export function ContactMailForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const c = dict.contact;
  const [status, setStatus] = useState<Status>("idle");

  const openMailto = (name: string, message: string) => {
    const email = companyFacts.email;
    if (!email) return false;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      `Web HDM - ${name}`,
    )}&body=${encodeURIComponent(message)}`;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website") ?? "")) return;
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !message) return;

    setStatus("sending");
    let ok = false;
    try {
      const res = await fetch(`${companyFacts.cvEndpoint}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, locale, website: "" }),
        signal: AbortSignal.timeout(15000),
      });
      ok = res.ok;
    } catch {
      ok = false;
    }
    if (ok) {
      form.reset();
      setStatus("sent");
      return;
    }
    setStatus(openMailto(name, message) ? "fallback" : "error");
  };

  return (
    <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
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
          autoComplete="email"
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
        disabled={status === "sending"}
        className="h-12 border border-ink-950 bg-ink-950 px-6 text-sm font-bold text-paper-50 hover:bg-ink-800 disabled:opacity-60"
      >
        {status === "sending" ? c.sending : c.send}
      </button>
      {status === "sent" ? (
        <p
          role="status"
          className="border border-line-200 bg-paper-100 p-4 text-base font-semibold text-ink-900"
        >
          {c.sentOk}
        </p>
      ) : null}
      {status === "fallback" ? (
        <p role="status" className="text-sm font-semibold text-ink-700">
          {c.sent}
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="text-sm font-semibold text-signal-600">
          {c.error}
        </p>
      ) : null}
    </form>
  );
}
