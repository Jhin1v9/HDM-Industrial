"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/domain/types";
import { useRequestUi } from "@/features/request/chrome";
import { trackEvent } from "@/features/analytics/events";

/** Botão que abre o Request drawer a partir de qualquer ponto do site. */
export function OpenRequestButton({
  locale,
  className,
  children,
  source,
  cmsKey,
}: {
  locale: Locale;
  className?: string;
  children: ReactNode;
  source?: string;
  /** nexo-cms editmode: data-cms keypath ("<locale>:<dotted.keypath>") do label. */
  cmsKey?: string;
}) {
  const { openRequest } = useRequestUi();
  return (
    <button
      type="button"
      data-cms={cmsKey}
      className={className}
      onClick={() => {
        trackEvent("request_started", { locale, source: source ?? "cta" });
        openRequest();
      }}
    >
      {children}
    </button>
  );
}
