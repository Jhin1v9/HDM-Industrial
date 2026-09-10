/**
 * HDM Industrial — Domain contracts (CONTRACT FREEZE, Prompt Supremo §136).
 * All identifiers are locale-independent. Only labels change with language.
 */

export const LOCALES = ["es", "ca", "en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

/** Locales with complete, natural translations — only these are published/indexed. */
export const PUBLISHED_LOCALES: readonly Locale[] = ["es", "ca", "en", "pt"];

/* ---------------------------------- profiles --------------------------------- */

export type ProfessionId =
  | "soldador"
  | "calderero"
  | "montador"
  | "electricista"
  | "constructor"
  | "supervisor";

export type WeldingSpecialization = "tig" | "mig-mag" | "electrodo";

export interface ProfessionalProfile {
  id: ProfessionId;
  /** Specializations only where confirmed (soldadores). */
  specializations: readonly WeldingSpecialization[];
  /** Pictogram key (proprietary technical signage, src/components/pictograms). */
  pictogram: string;
  /** Editorial media slot (mediaManifest). */
  mediaId: string;
  /** SEO slug under /personal-industrial/ */
  slug: string;
}

/* ---------------------------------- coverage --------------------------------- */

export type CoverageAreaId =
  | "barcelona"
  | "tarragona"
  | "valencia"
  | "madrid"
  | "pais-vasco"
  | "portugal";

export interface CoverageArea {
  id: CoverageAreaId;
  country: "ES" | "PT";
  slug: string;
  /** Approximate anchor for the proprietary SVG map (viewBox 0 0 100 100). */
  mapPoint: { x: number; y: number };
}

/* ----------------------------------- sectors ---------------------------------- */

export type SectorId =
  | "industria"
  | "construccion"
  | "mantenimiento-industrial"
  | "energia"
  | "fabricacion"
  | "petroquimica";

export interface Sector {
  id: SectorId;
  slug: string;
  /**
   * Doc 07 §104 / Doc 10 §109: petroquímica sem substância própria ainda
   * não pode ser página forte só para SEO → indexable false até ter prova real.
   */
  indexable: boolean;
}

/* ------------------------------- operating modes ------------------------------ */

export type NeedTypeId =
  | "trabajo-puntual"
  | "sustitucion-temporal"
  | "parada-programada"
  | "parada-urgente"
  | "trabajo-continuado";

export interface OperatingMode {
  id: NeedTypeId;
  slug: string;
}

/* --------------------------------- logistics ---------------------------------- */

/** Tri-state (Doc 06 §41–44): nunca asumir logística pelo cliente. */
export type LogisticsValue = "required" | "not_required" | "to_be_defined";

export interface RequestLogistics {
  /** ¿El proyecto requiere desplazamiento del personal? Tri-state: nunca asumir por el cliente. */
  displacement: LogisticsValue;
  displacementScope: "espana" | "portugal" | null;
  accommodation: LogisticsValue;
  transport: LogisticsValue;
  allowances: LogisticsValue;
  notes: string | null;
}

/* ------------------------------ request profiles ------------------------------ */

export interface RequestProfile {
  /** Stable client-side line id (not locale dependent). */
  lineId: string;
  profession: ProfessionId;
  specialization: WeldingSpecialization | null;
  quantity: number;
  requirements: string[];
}

/* --------------------------------- attachments -------------------------------- */

export type AttachmentStatus = "pending" | "ready" | "failed";

export interface AttachmentMeta {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  status: AttachmentStatus;
}

/* ----------------------------------- project ---------------------------------- */

/** Doc 06 §28–30: incluye "sin fecha" — no saber responder está permitido. */
export type TimingOption =
  | "urgente"
  | "esta-semana"
  | "este-mes"
  | "fecha-concreta"
  | "sin-fecha";

export type DurationUnit = "dias" | "semanas" | "meses" | "continuado" | "por-definir";

export interface RequestDuration {
  value: number | null;
  unit: DurationUnit | null;
}

export interface RequestProject {
  timing: TimingOption | null;
  startDate: string | null; // ISO yyyy-mm-dd
  duration: RequestDuration;
  shift: string | null;
  coverageArea: CoverageAreaId | null;
  city: string | null;
  address: string | null;
  description: string | null;
}

/* ----------------------------------- contact ---------------------------------- */

export interface RequestContact {
  company: string;
  name: string;
  phone: string;
  email: string;
}

/* ------------------------------ personnel request ----------------------------- */

export type RequestMode = "expert" | "assisted";
export type RequestStatus = "draft" | "submitting" | "submitted" | "failed";
export type RequestSource = "web";

export interface PersonnelRequest {
  id: string;
  reference: string | null;
  status: RequestStatus;
  source: RequestSource;
  /** Locale in which the request was started (state itself is locale-independent). */
  locale: Locale;
  mode: RequestMode;
  needType: NeedTypeId | null;
  profiles: RequestProfile[];
  sector: SectorId | null;
  project: RequestProject;
  logistics: RequestLogistics;
  /** ¿Su proyecto exige alguna certificación específica? (Doc 06 §46–47) */
  certificationRequired: "si" | "no" | "no-se" | null;
  certificationRequirements: string[];
  attachments: AttachmentMeta[];
  /** Assisted mode: free description of the job. */
  jobDescription: string | null;
  approximateQuantity: number | null;
  contact: RequestContact;
  createdAt: string;
  updatedAt: string;
}

/* ----------------------------------- misc ------------------------------------- */

export interface Certification {
  id: "prl" | "soldadura";
}

export interface CaseStudy {
  id: string;
  confidential: true;
  sector: SectorId | null;
  area: CoverageAreaId | null;
  needType: NeedTypeId | null;
  profiles: { profession: ProfessionId; quantity: number }[];
  duration: string | null;
}

export type PlaceholderPriority = "P0" | "P1" | "P2";

export interface MediaPlaceholder {
  id: string;
  type: "photo" | "video" | "document" | "testimonial";
  page: string;
  purpose: string;
  format: string;
  aspectRatio: string;
  priority: PlaceholderPriority;
  releaseBlocking: boolean;
  status: "pending" | "filled";
}

export type ClaimStatus = "green" | "amber" | "red";

export interface Claim {
  id: string;
  status: ClaimStatus;
  source: string;
  note: string;
}
