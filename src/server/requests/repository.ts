import type { PersonnelRequestSubmission } from "@/domain/requestSchema";
import { generateReference } from "@/domain/request";

/**
 * RequestRepository — UI nunca se acopla ao provider (§84).
 *
 * Implementações:
 * - SupabaseRequestRepository: produção, via PostgREST com anon key + RLS (ver supabase/migrations/).
 *   Ativa com NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY.
 * - DevRequestRepository: desenvolvimento/demo. Persiste de verdade (arquivo local do navegador)
 *   e sinaliza modo demo. NUNCA simular sucesso em produção (§85): sem backend configurado,
 *   o fluxo de envio online falha explicitamente com caminho humano (WhatsApp/telefone).
 */
export interface SubmitResult {
  reference: string;
  mode: "production" | "demo";
}

export interface RequestRepository {
  readonly kind: "supabase" | "dev";
  submit(submission: PersonnelRequestSubmission): Promise<SubmitResult>;
}

const DEV_ARCHIVE_KEY = "hdm.request.archive.v1";
const DEV_ARCHIVE_MAX_ENTRIES = 20;

/**
 * Arquivo demo NUNCA guarda PII (o invariante §22–26 aplica-se a todo o
 * localStorage): o contacto é substituído por um marcador e o endereço fino
 * da obra é omitido. Sem TTL implícito — a lista é limitada às últimas
 * DEV_ARCHIVE_MAX_ENTRIES submissões.
 */
function stripSubmissionPii(submission: PersonnelRequestSubmission): PersonnelRequestSubmission {
  return {
    ...submission,
    contact: { company: "", name: "", phone: "", email: "" },
    project: { ...submission.project, address: null },
  };
}

export class DevRequestRepository implements RequestRepository {
  readonly kind = "dev" as const;

  async submit(submission: PersonnelRequestSubmission): Promise<SubmitResult> {
    // Persistência local honesta (staging/demo): a solicitud fica arquivada no navegador.
    const reference = generateReference();
    try {
      const raw = window.localStorage.getItem(DEV_ARCHIVE_KEY);
      const archive: unknown = raw ? JSON.parse(raw) : [];
      const list = Array.isArray(archive) ? archive : [];
      list.push({
        reference,
        submittedAt: new Date().toISOString(),
        submission: stripSubmissionPii(submission),
      });
      const trimmed = list.slice(-DEV_ARCHIVE_MAX_ENTRIES);
      window.localStorage.setItem(DEV_ARCHIVE_KEY, JSON.stringify(trimmed));
    } catch {
      throw new Error("persistence_failed");
    }
    return { reference, mode: "demo" };
  }
}

interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export class SupabaseRequestRepository implements RequestRepository {
  readonly kind = "supabase" as const;

  constructor(private readonly config: SupabaseConfig) {}

  async submit(submission: PersonnelRequestSubmission): Promise<SubmitResult> {
    const reference = generateReference();
    const base = `${this.config.url.replace(/\/$/, "")}/rest/v1`;
    const headers: Record<string, string> = {
      apikey: this.config.anonKey,
      Authorization: `Bearer ${this.config.anonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    };

    const requestRow = {
      reference,
      status: "RECEIVED",
      locale: submission.locale,
      source: "web",
      mode: submission.mode,
      need_type: submission.needType,
      sector: submission.sector,
      project: submission.project,
      logistics: submission.logistics,
      certification_required: submission.certificationRequired,
      certification_requirements:
        submission.certificationRequirements.length > 0
          ? submission.certificationRequirements.join("\n")
          : null,
      job_description: submission.jobDescription,
      approximate_quantity: submission.approximateQuantity,
      company_name: submission.contact.company,
      contact_name: submission.contact.name,
      contact_email: submission.contact.email,
      contact_phone: submission.contact.phone,
    };

    const requestRes = await fetch(`${base}/personnel_requests`, {
      method: "POST",
      headers,
      body: JSON.stringify(requestRow),
    });
    if (!requestRes.ok) throw new Error(`supabase_request_${requestRes.status}`);
    const created = (await requestRes.json()) as { id: string }[];
    const requestId = created[0]?.id;
    if (!requestId) throw new Error("supabase_request_no_id");

    if (submission.profiles.length > 0) {
      const profileRows = submission.profiles.map((p) => ({
        request_id: requestId,
        profession: p.profession,
        specialization: p.specialization,
        quantity: p.quantity,
        requirements: p.requirements,
      }));
      const profilesRes = await fetch(`${base}/request_profiles`, {
        method: "POST",
        headers,
        body: JSON.stringify(profileRows),
      });
      if (!profilesRes.ok) throw new Error(`supabase_profiles_${profilesRes.status}`);
    }

    if (submission.attachments.length > 0) {
      const attachmentRows = submission.attachments.map((a) => ({
        request_id: requestId,
        file_name: a.name,
        size_bytes: a.size,
        mime_type: a.mimeType,
        status: "metadata_only",
      }));
      const attachRes = await fetch(`${base}/request_attachments`, {
        method: "POST",
        headers,
        body: JSON.stringify(attachmentRows),
      });
      if (!attachRes.ok) throw new Error(`supabase_attachments_${attachRes.status}`);
    }

    return { reference, mode: "production" };
  }
}

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

/**
 * Selector: produção exige backend configurado. Sem ele:
 * - dev/staging (NODE_ENV !== "production") → DevRequestRepository (modo demo sinalizado).
 * - produção → null → o envio online é desativado com caminho humano funcional (§85).
 */
export function getRequestRepository(): RequestRepository | null {
  const config = getSupabaseConfig();
  if (config) return new SupabaseRequestRepository(config);
  if (process.env.NODE_ENV !== "production") return new DevRequestRepository();
  // Demo estático controlado: NEXT_PUBLIC_DEMO_MODE=true permite o modo demo em build de produção
  // (preview/staging). Sem essa flag, produção sem backend NUNCA simula sucesso.
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") return new DevRequestRepository();
  return null;
}
