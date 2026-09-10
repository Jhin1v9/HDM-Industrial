"use client";

import type { ReactNode } from "react";
import type { CoverageAreaId, Locale, NeedTypeId, ProfessionId } from "@/domain/types";
import { usePrefillRequest } from "@/features/request/store";
import { useRequestUi } from "@/features/request/chrome";
import { trackEvent } from "@/features/analytics/events";

export function PrefillProfessionButton({
  locale,
  profession,
  className,
  children,
}: {
  locale: Locale;
  profession: ProfessionId;
  className?: string;
  children: ReactNode;
}) {
  const prefill = usePrefillRequest();
  const { openRequest } = useRequestUi();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        prefill.addProfession(profession);
        trackEvent("profile_added", { profession, locale, source: "profile_page" });
        openRequest();
      }}
    >
      {children}
    </button>
  );
}

export function PrefillNeedTypeButton({
  locale,
  needType,
  displacement = false,
  className,
  children,
}: {
  locale: Locale;
  needType: NeedTypeId | null;
  displacement?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const prefill = usePrefillRequest();
  const { openRequest } = useRequestUi();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (needType) prefill.setNeedType(needType);
        if (displacement) prefill.flagDisplacement();
        trackEvent("request_started", { locale, source: "solution_page" });
        openRequest();
      }}
    >
      {children}
    </button>
  );
}

export function PrefillAreaButton({
  locale,
  area,
  className,
  children,
}: {
  locale: Locale;
  area: CoverageAreaId;
  className?: string;
  children: ReactNode;
}) {
  const prefill = usePrefillRequest();
  const { openRequest } = useRequestUi();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        prefill.setCoverageArea(area);
        trackEvent("location_selected", { area, locale, source: "coverage_page" });
        openRequest();
      }}
    >
      {children}
    </button>
  );
}
