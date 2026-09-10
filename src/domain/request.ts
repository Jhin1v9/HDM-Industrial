import type {
  PersonnelRequest,
  RequestProfile,
  RequestLogistics,
  RequestProject,
  RequestContact,
  Locale,
} from "./types";

/** Pure domain helpers — unit tested, locale-independent. */

export function createEmptyRequest(locale: Locale, id: string, now: string): PersonnelRequest {
  return {
    id,
    reference: null,
    status: "draft",
    source: "web",
    locale,
    mode: "expert",
    needType: null,
    profiles: [],
    sector: null,
    project: {
      timing: null,
      startDate: null,
      duration: { value: null, unit: null },
      shift: null,
      coverageArea: null,
      city: null,
      address: null,
      description: null,
    },
    logistics: {
      displacement: "to_be_defined",
      displacementScope: null,
      accommodation: "to_be_defined",
      transport: "to_be_defined",
      allowances: "to_be_defined",
      notes: null,
    },
    certificationRequired: null,
    certificationRequirements: [],
    attachments: [],
    jobDescription: null,
    approximateQuantity: null,
    contact: { company: "", name: "", phone: "", email: "" },
    createdAt: now,
    updatedAt: now,
  };
}

export function totalProfessionals(profiles: readonly RequestProfile[]): number {
  return profiles.reduce((sum, p) => sum + p.quantity, 0);
}

export function totalProfileLines(profiles: readonly RequestProfile[]): number {
  return profiles.length;
}

export function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(500, Math.max(1, Math.round(quantity)));
}

/**
 * Human-readable reference, e.g. HDM-A7F2.
 * NOT an access token — must never authorize reading request data (§95).
 */
export function generateReference(random: () => number = Math.random): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i += 1) {
    suffix += alphabet[Math.floor(random() * alphabet.length)];
  }
  return `HDM-${suffix}`;
}

/** Stable line id without external deps. */
export function generateLineId(random: () => number = Math.random): string {
  return `line-${Date.now().toString(36)}-${Math.floor(random() * 1e6).toString(36)}`;
}

export function isRequestEmpty(request: PersonnelRequest): boolean {
  const hasDescription = Boolean(
    request.jobDescription && request.jobDescription.trim().length >= 10,
  );
  if (request.mode === "expert") {
    return request.profiles.length === 0;
  }
  return request.profiles.length === 0 && !hasDescription;
}

/**
 * Serialization for persistence (Doc 09 §22–26):
 * - PII (nombre, teléfono, email) lives ONLY in memory — never in localStorage.
 * - Draft has schemaVersion + expiry.
 */
export const REQUEST_SCHEMA_VERSION = 2;
export const REQUEST_DRAFT_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 días

interface StoredEnvelope {
  schemaVersion: number;
  storedAt: string;
  request: PersonnelRequest;
}

export function stripPii(request: PersonnelRequest): PersonnelRequest {
  return {
    ...request,
    contact: { company: "", name: "", phone: "", email: "" },
  };
}

export function serializeRequest(request: PersonnelRequest): string {
  const envelope: StoredEnvelope = {
    schemaVersion: REQUEST_SCHEMA_VERSION,
    storedAt: new Date().toISOString(),
    request: stripPii(request),
  };
  return JSON.stringify(envelope);
}

/** Rascunhos legados podiam ter logística booleana — migra para tri-state. */
function migrateLegacyLogistics(request: unknown): void {
  if (typeof request !== "object" || request === null) return;
  const logistics = (request as { logistics?: Record<string, unknown> }).logistics;
  if (typeof logistics !== "object" || logistics === null) return;
  for (const key of ["displacement", "accommodation", "transport", "allowances"]) {
    const value = logistics[key];
    if (typeof value === "boolean") {
      logistics[key] = value ? "required" : "to_be_defined";
    }
  }
}

export function parseStoredRequest(raw: string | null, now: Date = new Date()): PersonnelRequest | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const envelope = parsed as Partial<StoredEnvelope>;
    // v1 aceite para migração (logística booleana → tri-state); mais antigo, descarta.
    if (envelope.schemaVersion !== REQUEST_SCHEMA_VERSION && envelope.schemaVersion !== 1) {
      return null;
    }
    migrateLegacyLogistics(envelope.request);
    if (typeof envelope.storedAt !== "string" || !envelope.request) return null;
    const storedAt = new Date(envelope.storedAt).getTime();
    if (Number.isNaN(storedAt) || now.getTime() - storedAt > REQUEST_DRAFT_TTL_MS) return null;
    const candidate = envelope.request as Partial<PersonnelRequest>;
    if (typeof candidate.id !== "string" || !Array.isArray(candidate.profiles)) return null;
    // Defesa adicional: um rascunho antigo (pré-PII-strip) nunca pode reintroduzir PII.
    candidate.contact = { company: "", name: "", phone: "", email: "" };
    if (candidate.status === "submitting" || candidate.status === "failed") {
      candidate.status = "draft";
    }
    if (candidate.status === "submitted") {
      candidate.status = "draft";
      candidate.reference = null;
    }
    return candidate as PersonnelRequest;
  } catch {
    return null;
  }
}

export function hasContactData(contact: RequestContact): boolean {
  return Boolean(
    contact.company.trim() || contact.name.trim() || contact.phone.trim() || contact.email.trim(),
  );
}

export type { RequestLogistics, RequestProject };
