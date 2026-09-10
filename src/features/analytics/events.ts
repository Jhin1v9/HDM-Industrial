/**
 * Analytics — eventos estruturados (Doc 06 §86 = fonte unificada; §98: sem PII).
 * Provider-agnóstico: eventos só saem se houver consentimento (ver CookieConsent).
 * Ativação de produção (Vercel Web Analytics / Speed Insights) documentada no README.
 */

export const ANALYTICS_EVENTS = [
  "request_started",
  "need_type_selected",
  "profile_added",
  "profile_removed",
  "quantity_changed",
  "location_selected",
  "start_date_selected",
  "logistics_added",
  "attachment_added",
  "summary_viewed",
  "contact_started",
  "request_submitted",
  "request_failed",
  "whatsapp_handoff",
  "phone_click",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

/** Propriedades seguras: ids de domínio, locale, source. NUNCA PII. */
export type SafeEventProps = Record<string, string | number | boolean | null>;

const CONSENT_KEY = "hdm.consent.v1";

export function getConsent(): "accepted" | "rejected" | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    if (value === "accepted" || value === "rejected") return value;
    return null;
  } catch {
    return null;
  }
}

export function setConsent(value: "accepted" | "rejected"): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* sem storage, sem tracking */
  }
}

declare global {
  interface Window {
    va?: (action: string, event: string, props?: SafeEventProps) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, props: SafeEventProps = {}): void {
  if (getConsent() !== "accepted") return;
  try {
    // Vercel Web Analytics custom events quando o script estiver ativo (produção Vercel).
    if (typeof window !== "undefined" && typeof window.va === "function") {
      window.va("event", event, props);
    }
    if (process.env.NODE_ENV !== "production") {
      console.debug("[analytics]", event, props);
    }
  } catch {
    // Analytics nunca derruba o produto (§118).
  }
}
