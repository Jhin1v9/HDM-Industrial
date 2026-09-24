import { z } from "zod";

/**
 * Submission schema — same conceptual schema on client, server adapters and tests.
 * Server (provider) must revalidate everything (Prompt Supremo §87).
 */

export const professionSchema = z.enum([
  "soldador",
  "calderero",
  "montador",
  "electricista",
  "constructor",
  "supervisor",
  "eletromecanico",
  "mecanico-industrial",
]);

export const weldingSpecializationSchema = z.enum(["tig", "mig-mag", "electrodo"]);

export const needTypeSchema = z.enum([
  "trabajo-puntual",
  "sustitucion-temporal",
  "parada-programada",
  "parada-urgente",
  "trabajo-continuado",
]);

export const sectorSchema = z.enum([
  "industria",
  "construccion",
  "mantenimiento-industrial",
  "energia",
  "fabricacion",
  "petroquimica",
]);

export const coverageAreaSchema = z.enum([
  "barcelona",
  "tarragona",
  "valencia",
  "madrid",
  "pais-vasco",
  "portugal",
]);

export const timingSchema = z.enum([
  "urgente",
  "esta-semana",
  "este-mes",
  "fecha-concreta",
  "sin-fecha",
]);

export const durationSchema = z.object({
  value: z.number().int().min(1).max(3650).nullable(),
  unit: z.enum(["dias", "semanas", "meses", "continuado", "por-definir"]).nullable(),
});

export const requestProfileSchema = z.object({
  lineId: z.string().min(1).max(64),
  profession: professionSchema,
  specialization: weldingSpecializationSchema.nullable(),
  quantity: z.number().int().min(1).max(500),
  requirements: z.array(z.string().max(200)).max(20),
});

export const logisticsValueSchema = z.enum(["required", "not_required", "to_be_defined"]);

export const logisticsSchema = z.object({
  displacement: z.enum(["required", "not_required", "to_be_defined"]),
  displacementScope: z.enum(["espana", "portugal"]).nullable(),
  accommodation: logisticsValueSchema,
  transport: logisticsValueSchema,
  allowances: logisticsValueSchema,
  notes: z.string().max(1000).nullable(),
});

export const attachmentMetaSchema = z.object({
  id: z.string().min(1).max(64),
  name: z.string().min(1).max(255),
  size: z.number().int().nonnegative().max(25 * 1024 * 1024),
  mimeType: z.string().min(1).max(100),
  status: z.enum(["pending", "ready", "failed"]),
});

export const projectSchema = z
  .object({
    timing: timingSchema.nullable(),
    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .nullable(),
    duration: durationSchema,
    shift: z.string().max(120).nullable(),
    coverageArea: coverageAreaSchema.nullable(),
    city: z.string().max(120).nullable(),
    address: z.string().max(255).nullable(),
    description: z.string().max(4000).nullable(),
  })
  .superRefine((value, ctx) => {
    if (value.timing === "fecha-concreta" && value.startDate) {
      const date = new Date(`${value.startDate}T00:00:00Z`);
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      if (Number.isNaN(date.getTime())) {
        ctx.addIssue({ code: "custom", message: "invalid_date", path: ["startDate"] });
      } else if (date < today) {
        ctx.addIssue({ code: "custom", message: "past_date", path: ["startDate"] });
      }
    }
  });

export const contactSchema = z.object({
  company: z.string().trim().min(2).max(160),
  name: z.string().trim().min(2).max(160),
  phone: z
    .string()
    .trim()
    .min(6)
    .max(32)
    .regex(/^[+0-9 ().-]+$/, "invalid_phone"),
  email: z
    .string()
    .trim()
    .max(254)
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "invalid_email"),
});

export const personnelRequestSubmissionSchema = z
  .object({
    id: z.string().min(1).max(64),
    locale: z.enum(["es", "ca", "en", "pt"]),
    mode: z.enum(["expert", "assisted"]),
    needType: needTypeSchema.nullable(),
    profiles: z.array(requestProfileSchema).max(24),
    sector: sectorSchema.nullable(),
    project: projectSchema,
    logistics: logisticsSchema,
    certificationRequired: z.enum(["si", "no", "no-se"]).nullable(),
    certificationRequirements: z.array(z.string().max(200)).max(20),
    attachments: z.array(attachmentMetaSchema).max(10),
    jobDescription: z.string().max(4000).nullable(),
    approximateQuantity: z.number().int().min(1).max(500).nullable(),
    contact: contactSchema,
    /** Honeypot — must remain empty (§115). */
    website: z.string().max(0).optional().or(z.literal("").optional()),
  })
  .superRefine((value, ctx) => {
    if (value.mode === "expert" && value.profiles.length === 0) {
      ctx.addIssue({ code: "custom", message: "empty_request", path: ["profiles"] });
    }
    if (value.mode === "assisted") {
      const hasDescription = (value.jobDescription ?? "").trim().length >= 10;
      if (!hasDescription && value.profiles.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "empty_request",
          path: ["jobDescription"],
        });
      }
    }
  });

export type PersonnelRequestSubmission = z.infer<typeof personnelRequestSubmissionSchema>;

export const UPLOAD_LIMITS = {
  maxSizeBytes: 25 * 1024 * 1024,
  maxFiles: 10,
  allowedMimeTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "image/jpeg",
    "image/png",
  ] as const,
} as const;

export function isAllowedUpload(mimeType: string, sizeBytes: number): boolean {
  return (
    (UPLOAD_LIMITS.allowedMimeTypes as readonly string[]).includes(mimeType) &&
    sizeBytes > 0 &&
    sizeBytes <= UPLOAD_LIMITS.maxSizeBytes
  );
}
