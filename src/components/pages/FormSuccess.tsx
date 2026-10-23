import type { Locale } from "@/domain/types";
import { getDictionary } from "@/i18n";
import { companyFacts, contactData, whatsappLink } from "@/content/company";
import { localizedPath } from "@/content/pages";

type Props = {
  locale: Locale;
  kind: "contact" | "careers";
  reference?: string | null;
  onReset?: () => void;
};

/**
 * Confirmação no site após envio bem-sucedido (contacto e candidatura).
 * Substitui a mensagem simples por um painel com referência, próximos passos,
 * canais diretos (WhatsApp/telefone/email) e nota de privacidade em texto pequeno.
 */
export function FormSuccess({ locale, kind, reference, onReset }: Props) {
  const dict = getDictionary(locale);
  const s = kind === "contact" ? dict.contact : dict.careers;
  const email = kind === "contact" ? companyFacts.email : companyFacts.hrEmail;
  const wa = whatsappLink(s.successWa);
  const privacy = localizedPath(locale, "privacidad");
  const home = localizedPath(locale, "");

  const primary =
    "inline-flex h-10 items-center justify-center border border-ink-950 bg-ink-950 px-4 text-xs font-bold text-paper-50 hover:bg-ink-800";
  const secondary =
    "inline-flex h-10 items-center justify-center border border-line-300 bg-paper-50 px-4 text-xs font-bold text-ink-800 hover:border-ink-800";

  return (
    <div role="status" className="border border-line-200 bg-paper-50">
      <div className="flex items-start gap-4 border-b border-line-200 bg-paper-100 p-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink-950 text-paper-50">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 6 9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-steel-500">
            HDM Industrial
          </p>
          <h3 className="mt-1 text-xl font-bold text-ink-950">{s.successTitle}</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-700">{s.successBody}</p>
          {reference ? (
            <p className="mt-3 inline-block border border-line-300 bg-paper-50 px-2 py-1 text-xs text-ink-700">
              {s.successRef}: <strong className="text-ink-950">{reference}</strong>
            </p>
          ) : null}
        </div>
      </div>

      <div className="p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-steel-500">
          {s.successNext}
        </p>
        <ol className="mt-3 space-y-2">
          {s.successSteps.map((step, index) => (
            <li key={index} className="flex gap-3 text-sm leading-relaxed text-ink-800">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line-300 text-[11px] font-bold text-ink-800">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-5 border-t border-line-200 pt-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-steel-500">
            {s.successContact}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={primary}>
                {dict.common.whatsapp}
              </a>
            ) : null}
            {email ? (
              <a href={`mailto:${email}`} className={secondary}>
                {dict.common.email}
              </a>
            ) : null}
            {onReset ? (
              <button type="button" onClick={onReset} className={secondary}>
                {s.successAgain}
              </button>
            ) : null}
          </div>
          <div className="mt-4 space-y-1">
            {contactData.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="block text-sm font-semibold text-ink-800 hover:underline"
              >
                {phone.label}
              </a>
            ))}
            <p className="pt-1 text-xs leading-relaxed text-steel-500">
              {contactData.addresses.join(" · ")}
            </p>
            <p className="text-xs text-steel-500">{s.successHours}</p>
          </div>
        </div>

        <p className="mt-5 border-t border-line-200 pt-3 text-[11px] leading-relaxed text-steel-500">
          <a href={privacy} className="underline decoration-steel-300 underline-offset-2 hover:text-ink-800">
            {s.privacyNote}
          </a>
        </p>
        <a
          href={home}
          className="mt-3 inline-block text-xs font-bold text-ink-800 underline underline-offset-2 hover:text-ink-950"
        >
          {s.successBack}
        </a>
      </div>
    </div>
  );
}
