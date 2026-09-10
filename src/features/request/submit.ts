import type { PersonnelRequest } from "@/domain/types";
import {
  personnelRequestSubmissionSchema,
  type PersonnelRequestSubmission,
} from "@/domain/requestSchema";
import { getRequestRepository } from "@/server/requests/repository";

/**
 * Fluxo de submissão (§94): validate → persist → return reference → notifications.
 * O lead nunca se perde por falha de notificação.
 */
export type SubmitOutcome =
  | { ok: true; reference: string; demo: boolean }
  | { ok: false; reason: "validation" | "no_backend" | "network" | "unknown"; issues?: string[] };

export function buildSubmission(
  request: PersonnelRequest,
  honeypot = "",
): PersonnelRequestSubmission {
  return {
    id: request.id,
    locale: request.locale,
    mode: request.mode,
    needType: request.needType,
    profiles: request.profiles,
    sector: request.sector,
    project: request.project,
    logistics: request.logistics,
    certificationRequired: request.certificationRequired,
    certificationRequirements: request.certificationRequirements,
    attachments: request.attachments,
    jobDescription: request.jobDescription,
    approximateQuantity: request.approximateQuantity,
    contact: request.contact,
    website: honeypot,
  };
}

export async function submitRequest(
  request: PersonnelRequest,
  honeypot = "",
): Promise<SubmitOutcome> {
  const submission = buildSubmission(request, honeypot);
  const parsed = personnelRequestSubmissionSchema.safeParse(submission);
  if (!parsed.success) {
    const KNOWN_ISSUES = new Set([
      "empty_request",
      "past_date",
      "invalid_date",
      "invalid_phone",
      "invalid_email",
      "required",
    ]);
    return {
      ok: false,
      reason: "validation",
      issues: parsed.error.issues.map((i) =>
        KNOWN_ISSUES.has(i.message) ? i.message : "invalid_input",
      ),
    };
  }

  const repository = getRequestRepository();
  if (!repository) {
    // Produção sem backend: NUNCA simular sucesso (§85). Caminho humano no caller.
    return { ok: false, reason: "no_backend" };
  }

  try {
    const result = await repository.submit(parsed.data);
    return { ok: true, reference: result.reference, demo: result.mode === "demo" };
  } catch (error) {
    if (error instanceof TypeError) return { ok: false, reason: "network" };
    return { ok: false, reason: "unknown" };
  }
}
