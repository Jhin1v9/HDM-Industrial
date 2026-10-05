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
  cmsKey,
}: {
  locale: Locale;
  profession: ProfessionId;
  className?: string;
  children: ReactNode;
  /** nexo-cms editmode: data-cms keypath ("<locale>:<dotted.keypath>") do label. */
  cmsKey?: string;
}) {
  const prefill = usePrefillRequest();
  const { openRequest } = useRequestUi();
  return (
    <button
      type="button"
      data-cms={cmsKey}
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
  cmsKey,
}: {
  locale: Locale;
  needType: NeedTypeId | null;
  displacement?: boolean;
  className?: string;
  children: ReactNode;
  /** nexo-cms editmode: data-cms keypath ("<locale>:<dotted.keypath>") do label. */
  cmsKey?: string;
}) {
  const prefill = usePrefillRequest();
  const { openRequest } = useRequestUi();
  return (
    <button
      type="button"
      data-cms={cmsKey}
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
  cmsKey,
}: {
  locale: Locale;
  area: CoverageAreaId;
  className?: string;
  children: ReactNode;
  /** nexo-cms editmode: data-cms keypath ("<locale>:<dotted.keypath>") do label. */
  cmsKey?: string;
}) {
  const prefill = usePrefillRequest();
  const { openRequest } = useRequestUi();
  return (
    <button
      type="button"
      data-cms={cmsKey}
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
