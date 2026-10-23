/**
 * Company facts - contact data comes from environment configuration, never invented (§92).
 * If a value is absent, the UI simply omits that channel (Request CTA is always present).
 * See .env.example and PENDING.md.
 */
export const companyFacts = {
  legalName: "HDM Industrial",
  /** Fiscal address is in Portugal (known). Full data pending legal confirmation. */
  fiscalCountry: "Portugal",
  phone: process.env.NEXT_PUBLIC_HDM_PHONE ?? null,
  whatsapp: process.env.NEXT_PUBLIC_HDM_WHATSAPP ?? null,
  email: process.env.NEXT_PUBLIC_HDM_EMAIL ?? "info@hdmindustrial.es",
  /** Instagram oficial (confirmado por el cliente el 09/10/2026). */
  instagram: "https://www.instagram.com/hdmindustriallda/",  /**
   * HR inbox for CV/applications - confirmed by the client (Matheus) on 21/09/2026
   * via Nexo panel request cmub9zxnq0011k011dz4f8qso. Not a public commercial contact.
   */
  hrEmail: "rrhh@hdmindustrial.es" as string | null,
  /**
   * CV relay endpoint (VPS nexo_hdm_cv). Public URL, not a secret. When the relay
   * is unreachable/not configured, the form falls back to mailto/Web Share -
   * production never simulates success (same invariant as the Request Engine).
   */
  cvEndpoint:
    process.env.NEXT_PUBLIC_HDM_CV_ENDPOINT ?? "https://vps.nexo-digital.app/hdm-cv",
} as const;

/**
 * Contact data confirmed by the client (Matheus) on 09/10/2026:
 * two offices (Pombal PT + Barcelona ES), three phone lines, three emails.
 */
export const contactData = {
  addresses: [
    "Calle José Santos Alves, Pombal, Portugal",
    "Avinguda de Francesc Macià, Barcelona, España",
  ],
  phones: [
    { label: "+34 621-377-018", href: "tel:+34621377018" },
    { label: "+34 645-181-733", href: "tel:+34645181733" },
    { label: "+351 918-577-946", href: "tel:+351918577946" },
  ],
  emails: [
    "rrhh@hdmindustrial.es",
    "info@hdmindustrial.es",
    "administracion@hdmindustrial.es",
  ],
} as const;

/** WhatsApp link with contextual message. Never includes PII or attachments (§36). */
export function whatsappLink(message: string): string | null {
  const number = companyFacts.whatsapp;
  if (!number) return null;
  const normalized = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
