import type { Claim } from "@/domain/types";

/**
 * Claims registry (Prompt Supremo §126). `red` claims must NEVER appear in public content.
 * The check:claims script verifies no red claim text leaks into src/.
 */
export const claimsRegistry: readonly Claim[] = [
  { id: "suministro-personal", status: "green", source: "Formulario 7/9/2026", note: "Solo suministramos personal." },
  { id: "perfiles-confirmados", status: "green", source: "Formulario 7/9/2026", note: "6 perfiles profesionales confirmados." },
  { id: "modalidades", status: "green", source: "Formulario 7/9/2026", note: "Puntual, sustitución temporal, parada programada, parada urgente, trabajo continuado." },
  { id: "logistica", status: "green", source: "Formulario 7/9/2026", note: "Alojamiento, transporte, dietas (capacidad declarada)." },
  { id: "cobertura", status: "green", source: "Formulario 7/9/2026", note: "Barcelona, Tarragona, Valencia, Madrid, País Vasco, Portugal — zonas de proyecto, no oficinas." },
  { id: "sectores", status: "green", source: "Formulario 7/9/2026", note: "6 sectores confirmados." },
  { id: "prl-soldadura", status: "green", source: "Discovery + formulario", note: "PRL y certificados de soldadura, genérico." },
  { id: "trayectoria-2-anos", status: "amber", source: "Discovery", note: "~2 años de trayectoria. Wording conservador permitido." },
  { id: "postventa", status: "amber", source: "Discovery", note: "Acompañamiento post-venta valorizado. Describir como compromiso, sin métricas." },
  { id: "seriedad-transparencia", status: "amber", source: "Discovery", note: "Valores auto-declarados; usar con sobriedad." },
  { id: "headcount", status: "red", source: "Conflicto 54 vs 70", note: "PROIBIDO publicar total de profesionales." },
  { id: "disponibilidad-live", status: "red", source: "—", note: "No existe disponibilidad live confirmada." },
  { id: "sla-24-48", status: "red", source: "—", note: "Sin SLA ni plazos garantizados." },
  { id: "iso", status: "red", source: "—", note: "Sin certificación ISO documentada." },
  { id: "lider-numero-1", status: "red", source: "—", note: "Sin evidencia de liderazgo de mercado." },
  { id: "num-clientes-proyectos", status: "red", source: "—", note: "Sin cifras verificables de clientes/proyectos/éxito." },
] as const;

/** Literal fragments that must never appear in public copy (red claims). */
export const RED_CLAIM_FRAGMENTS: readonly string[] = [
  "54 profesionales",
  "70 profesionales",
  "disponibles ahora",
  "disponibilidad inmediata",
  "en 24 horas",
  "en 48 horas",
  "24 horas",
  "48 horas",
  "líder del sector",
  "líderes del sector",
  "número 1",
  "ISO 9001",
  "100% disponibilidad",
  "incorporación garantizada",
  "respuesta inmediata",
] as const;
