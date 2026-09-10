import type { MediaPlaceholder } from "@/domain/types";

/**
 * Placeholder registry (§22) — single source of truth.
 * `filled` = replaced by verified real media (see mediaManifest.json) or real asset.
 * Editorial photos in public/images are "filled" as ambience — never presented as HDM proof.
 */
export const placeholdersRegistry: readonly MediaPlaceholder[] = [
  { id: "PH-VIDEO-HERO-01", type: "video", page: "home", purpose: "Vídeo hero de operación industrial", format: "mp4/webm 1920", aspectRatio: "16:9", priority: "P1", releaseBlocking: false, status: "pending" },
  { id: "PH-PHOTO-HERO-01", type: "photo", page: "home", purpose: "Imagen editorial hero (soldadura industrial)", format: "jpg 1920", aspectRatio: "16:9", priority: "P0", releaseBlocking: false, status: "filled" },
  { id: "PH-PHOTO-HERO-MOBILE-01", type: "photo", page: "home", purpose: "Hero editorial vertical", format: "jpg 1080x1600", aspectRatio: "2:3", priority: "P1", releaseBlocking: false, status: "filled" },
  { id: "PH-PHOTO-MATHEUS-01", type: "photo", page: "empresa", purpose: "Foto real del responsable HDM", format: "jpg 1200", aspectRatio: "4:5", priority: "P1", releaseBlocking: false, status: "pending" },
  { id: "PH-PHOTO-TEAM-01", type: "photo", page: "empresa", purpose: "Foto real del equipo HDM", format: "jpg 1920", aspectRatio: "16:9", priority: "P1", releaseBlocking: false, status: "pending" },
  { id: "PH-PHOTO-EPI-01", type: "photo", page: "certificaciones", purpose: "EPI / seguridad (editorial)", format: "jpg 1600", aspectRatio: "4:3", priority: "P2", releaseBlocking: false, status: "filled" },
  { id: "PH-PHOTO-TIG-01", type: "photo", page: "personal-industrial/soldadores", purpose: "Soldadura TIG (editorial)", format: "jpg 1600", aspectRatio: "4:3", priority: "P1", releaseBlocking: false, status: "filled" },
  { id: "PH-PHOTO-MIGMAG-01", type: "photo", page: "personal-industrial/soldadores", purpose: "Soldadura MIG/MAG (editorial)", format: "jpg 1600", aspectRatio: "4:3", priority: "P1", releaseBlocking: false, status: "filled" },
  { id: "PH-PHOTO-ELECTRODO-01", type: "photo", page: "personal-industrial/soldadores", purpose: "Soldadura electrodo (editorial)", format: "jpg 1600", aspectRatio: "4:3", priority: "P1", releaseBlocking: false, status: "filled" },
  { id: "PH-PHOTO-CALDERERO-01", type: "photo", page: "personal-industrial/caldereros", purpose: "Calderería (editorial)", format: "jpg 1600", aspectRatio: "4:3", priority: "P1", releaseBlocking: false, status: "filled" },
  { id: "PH-PHOTO-MONTADOR-01", type: "photo", page: "personal-industrial/montadores", purpose: "Montaje de estructuras (editorial)", format: "jpg 1600", aspectRatio: "4:3", priority: "P1", releaseBlocking: false, status: "filled" },
  { id: "PH-PHOTO-ELECTRICISTA-01", type: "photo", page: "personal-industrial/electricistas", purpose: "Electricista industrial (editorial)", format: "jpg 1600", aspectRatio: "4:3", priority: "P1", releaseBlocking: false, status: "filled" },
  { id: "PH-PHOTO-PLANT-01", type: "photo", page: "sectores", purpose: "Planta industrial (editorial)", format: "jpg 1920", aspectRatio: "16:9", priority: "P2", releaseBlocking: false, status: "filled" },
  { id: "PH-PHOTO-STRUCTURE-01", type: "photo", page: "sectores/construccion", purpose: "Estructura metálica (editorial)", format: "jpg 1600", aspectRatio: "4:3", priority: "P2", releaseBlocking: false, status: "filled" },
  { id: "PH-PHOTO-MOBILIZATION-01", type: "photo", page: "soluciones/desplazamiento", purpose: "Logística / movilización (editorial)", format: "jpg 1600", aspectRatio: "4:3", priority: "P2", releaseBlocking: false, status: "filled" },
  { id: "PH-PROJECT-01", type: "photo", page: "proyectos", purpose: "Proyecto real HDM 1", format: "jpg 1600", aspectRatio: "4:3", priority: "P1", releaseBlocking: false, status: "pending" },
  { id: "PH-PROJECT-02", type: "photo", page: "proyectos", purpose: "Proyecto real HDM 2", format: "jpg 1600", aspectRatio: "4:3", priority: "P1", releaseBlocking: false, status: "pending" },
  { id: "PH-PROJECT-03", type: "photo", page: "proyectos", purpose: "Proyecto real HDM 3", format: "jpg 1600", aspectRatio: "4:3", priority: "P1", releaseBlocking: false, status: "pending" },
  { id: "PH-CERT-PRL-01", type: "document", page: "certificaciones", purpose: "Escaneo certificado PRL", format: "pdf/jpg", aspectRatio: "3:4", priority: "P1", releaseBlocking: false, status: "pending" },
  { id: "PH-CERT-WELDING-01", type: "document", page: "certificaciones", purpose: "Escaneo certificado de soldadura", format: "pdf/jpg", aspectRatio: "3:4", priority: "P1", releaseBlocking: false, status: "pending" },
  { id: "PH-TESTIMONIAL-01", type: "testimonial", page: "proyectos", purpose: "Testimonio real cliente 1", format: "texto", aspectRatio: "-", priority: "P2", releaseBlocking: false, status: "pending" },
  { id: "PH-TESTIMONIAL-02", type: "testimonial", page: "proyectos", purpose: "Testimonio real cliente 2", format: "texto", aspectRatio: "-", priority: "P2", releaseBlocking: false, status: "pending" },
] as const;

export function getPlaceholder(id: string): MediaPlaceholder | undefined {
  return placeholdersRegistry.find((p) => p.id === id);
}
