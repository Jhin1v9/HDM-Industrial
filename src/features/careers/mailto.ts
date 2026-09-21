/**
 * Careers/CV mailto composer (Etapa A — sem backend).
 * O site prepara o correio no cliente do candidato; NUNCA simula envio
 * (mesmo invariante do ContactMailForm e do Request Engine).
 * Destino confirmado pelo cliente (Matheus, 21/09/2026, painel Nexo):
 * rrhh@hdmindustrial.es.
 */
export interface CareersMailInput {
  name: string;
  email: string;
  phone: string;
  profile: string;
  zone: string;
  message: string;
}

/** Field labels are localized by the caller (dictionary parity). */
export interface CareersMailLabels {
  name: string;
  email: string;
  phone: string;
  profile: string;
  zone: string;
}

export function buildCareersMailto(
  input: CareersMailInput,
  hrEmail: string,
  labels: CareersMailLabels,
): string {
  const subject = `CV Web HDM — ${input.profile} — ${input.name}`;
  const lines = [
    `${labels.name}: ${input.name}`,
    `${labels.email}: ${input.email}`,
    `${labels.phone}: ${input.phone}`,
    `${labels.profile}: ${input.profile}`,
  ];
  const zone = input.zone.trim();
  if (zone) lines.push(`${labels.zone}: ${zone}`);
  const message = input.message.trim();
  if (message) lines.push("", message);
  return `mailto:${hrEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join("\n"),
  )}`;
}
