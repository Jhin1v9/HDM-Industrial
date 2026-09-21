/**
 * Careers/CV mailto composer (Etapa A — sem backend).
 * O site prepara o correio no cliente do candidato; NUNCA simula envio
 * (mesmo invariante do ContactMailForm e do Request Engine).
 * Destino confirmado pelo cliente (Matheus, 21/09/2026, painel Nexo):
 * rrhh@hdmindustrial.es.
 *
 * Limitação técnica honesta: mailto não transporta anexo. O CV selecionado
 * fica SÓ no navegador do candidato; quando o aparelho suporta a Web Share
 * API com arquivos, o formulário entrega o arquivo anexado de verdade;
 * caso contrário, o email abre com o nome/tamanho do arquivo no corpo e a
 * instrução de anexá-lo. Nenhum byte sai do dispositivo sem ação do candidato.
 */

export const CAREERS_CV_LIMITS = {
  maxSizeBytes: 25 * 1024 * 1024,
  acceptedExtensions: ["pdf", "doc", "docx", "jpg", "jpeg", "png"],
} as const;

export interface CareersAttachment {
  name: string;
  sizeLabel: string;
}

export interface CareersMailInput {
  name: string;
  email: string;
  phone: string;
  profile: string;
  zone: string;
  message: string;
  /** CV selecionado no navegador — metadados entram no corpo do email. */
  attachment: CareersAttachment | null;
}

/** Field labels are localized by the caller (dictionary parity). */
export interface CareersMailLabels {
  name: string;
  email: string;
  phone: string;
  profile: string;
  zone: string;
  attachment: string;
}

/** Pure validation — extension allowlist (file.type é vazio em alguns browsers). */
export function isAcceptedCvFile(file: { name: string }): boolean {
  const ext = file.name.toLowerCase().split(".").pop() ?? "";
  return (CAREERS_CV_LIMITS.acceptedExtensions as readonly string[]).includes(ext);
}

export function isCvSizeAllowed(sizeBytes: number): boolean {
  return sizeBytes > 0 && sizeBytes <= CAREERS_CV_LIMITS.maxSizeBytes;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Corpo do email em texto puro — usado tanto no mailto quanto no Web Share. */
export function buildCareersBody(
  input: CareersMailInput,
  labels: CareersMailLabels,
): string {
  const lines = [
    `${labels.name}: ${input.name}`,
    `${labels.email}: ${input.email}`,
    `${labels.phone}: ${input.phone}`,
    `${labels.profile}: ${input.profile}`,
  ];
  const zone = input.zone.trim();
  if (zone) lines.push(`${labels.zone}: ${zone}`);
  if (input.attachment) {
    lines.push(
      `${labels.attachment}: ${input.attachment.name} (${input.attachment.sizeLabel})`,
    );
  }
  const message = input.message.trim();
  if (message) lines.push("", message);
  return lines.join("\n");
}

export function buildCareersMailto(
  input: CareersMailInput,
  hrEmail: string,
  labels: CareersMailLabels,
): string {
  const subject = `CV Web HDM — ${input.profile} — ${input.name}`;
  return `mailto:${hrEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    buildCareersBody(input, labels),
  )}`;
}

/**
 * Relay response classification (VPS nexo_hdm_cv). Only a 2xx means the CV was
 * actually received server-side; anything else falls back to mailto/Web Share
 * so the candidate is never lost (§85 — never simulate success).
 */
export type CvSubmitOutcome = "sent" | "fallback";

export function classifyCvResponse(status: number): CvSubmitOutcome {
  return status >= 200 && status < 300 ? "sent" : "fallback";
}
