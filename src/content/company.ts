/**
 * Company facts — contact data comes from environment configuration, never invented (§92).
 * If a value is absent, the UI simply omits that channel (Request CTA is always present).
 * See .env.example and PENDING.md.
 */
export const companyFacts = {
  legalName: "HDM Industrial",
  /** Fiscal address is in Portugal (known). Full data pending legal confirmation. */
  fiscalCountry: "Portugal",
  phone: process.env.NEXT_PUBLIC_HDM_PHONE ?? null,
  whatsapp: process.env.NEXT_PUBLIC_HDM_WHATSAPP ?? null,
  email: process.env.NEXT_PUBLIC_HDM_EMAIL ?? null,
} as const;

/** WhatsApp link with contextual message. Never includes PII or attachments (§36). */
export function whatsappLink(message: string): string | null {
  const number = companyFacts.whatsapp;
  if (!number) return null;
  const normalized = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
