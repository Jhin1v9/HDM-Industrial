import type { Locale, PersonnelRequest } from "@/domain/types";
import type { Dictionary } from "@/i18n";
import { professionalProfiles } from "@/content/profiles";
import { coverageAreas } from "@/content/coverage";
import { formatDuration, formatStartDate } from "./format";

/**
 * WhatsApp handoff contextual (§36, Doc 06 §73–75).
 * NUNCA incluir PII (nome/telefone/email/empresa) nem anexos na URL.
 */
export function buildWhatsappMessage(
  request: PersonnelRequest,
  dict: Dictionary,
  locale: Locale,
): string {
  const lines: string[] = [dict.request.whatsappIntro, ""];
  const t = dict.request;

  if (request.reference) {
    lines.push(`${t.successReference}: ${request.reference}`);
    lines.push("");
  }

  if (request.mode === "assisted" && request.jobDescription?.trim()) {
    lines.push(`${t.whatsappDescribe}:`);
    lines.push(request.jobDescription.trim().slice(0, 500));
    lines.push("");
  }

  if (request.profiles.length > 0) {
    lines.push(`${t.whatsappNeed}:`);
    for (const profile of request.profiles) {
      const def = professionalProfiles.find((p) => p.id === profile.profession);
      const name = def ? dict.profiles.items[def.id]?.singular ?? def.id : profile.profession;
      const spec =
        profile.specialization != null
          ? ` ${dict.profiles.specializations[profile.specialization]?.name ?? profile.specialization}`
          : "";
      lines.push(`${profile.quantity} ${name}${spec}`);
    }
    lines.push("");
  }

  if (request.needType) {
    const needLabel = t.needTypes[request.needType]?.name;
    if (needLabel) lines.push(`${t.summaryNeed}: ${needLabel}`);
  }

  if (request.project.coverageArea) {
    const area = coverageAreas.find((a) => a.id === request.project.coverageArea);
    const areaName = area ? dict.coverage.items[area.id]?.name ?? area.id : request.project.coverageArea;
    lines.push(`${t.whatsappLocation}: ${areaName}`);
  } else if (request.project.city?.trim()) {
    lines.push(`${t.whatsappLocation}: ${request.project.city.trim()}`);
  }

  if (request.project.startDate && request.project.timing === "fecha-concreta") {
    lines.push(
      `${t.whatsappStart}: ${formatStartDate(request.project.startDate, locale) ?? request.project.startDate}`,
    );
  }

  const duration = formatDuration(request.project.duration, dict);
  if (duration) lines.push(`${t.whatsappDuration}: ${duration}`);

  lines.push("");
  lines.push(t.whatsappClose);
  return lines.join("\n");
}
