"use client";

import { useEffect } from "react";
import { getConsent } from "./events";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Carrega gtag.js (GA4) uma vez — só após consentimento "accepted". */
export function loadGA4(): void {
  if (!GA_ID || typeof window === "undefined" || window.gtag) return;
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  script.async = true;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
}

/**
 * Injeção GA4 com gating de consentimento (banner "medición anónima de uso").
 * Sem NEXT_PUBLIC_GA_ID (preview / sem env) = no-op. Escuta "hdm:consent"
 * (dispatch de setConsent) para cargar também cando o utilizador aceita
 * no banner. Pageviews automáticos (cada visita é unha carga estática).
 */
export function GoogleAnalytics() {
  useEffect(() => {
    if (getConsent() === "accepted") loadGA4();
    const onConsent = () => {
      if (getConsent() === "accepted") loadGA4();
    };
    window.addEventListener("hdm:consent", onConsent);
    return () => window.removeEventListener("hdm:consent", onConsent);
  }, []);
  return null;
}
