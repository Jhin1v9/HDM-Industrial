/**
 * Reviews domain (ported from jr-reformas, adapted to HDM B2B context).
 * NO invented testimonials (AGENTS.md) - the system ships EMPTY; only
 * submissions approved via GitHub moderation appear here.
 */

export interface Review {
  id: string;
  name: string;
  zone: string;
  project_type: string;
  stars: number;
  text: string;
  created_at: string;
  featured?: boolean;
  email?: string;
}

export interface ReviewSubmission {
  name: string;
  zone: string;
  project_type: string;
  stars: number;
  text: string;
  email?: string;
  gdpr: boolean;
  locale: string;
}

export interface ReviewsMeta {
  total: number;
  averageRating: number;
  lastUpdated?: string;
}

/**
 * Project types confirmed for HDM industrial context. Stored values are the
 * ES canonical strings (same convention as jr-reformas); labels are mapped
 * per locale via dict.reviews.projectTypes.
 */
export const PROJECT_TYPES = [
  "Parada de planta",
  "Refuerzo de equipo",
  "Montaje de estructuras",
  "Mantenimiento industrial",
  "Sustitución temporal",
  "Otro",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export function calculateReviewsMeta(reviews: Review[]): ReviewsMeta {
  const total = reviews.length;
  const averageRating = total
    ? Number((reviews.reduce((acc, r) => acc + r.stars, 0) / total).toFixed(1))
    : 0;
  return { total, averageRating };
}

/** Normalize pipeline placeholders ('-') to undefined. */
function normalizeReview(r: Review): Review {
  const email = r.email && r.email !== "-" ? r.email : undefined;
  return { ...r, email };
}

/**
 * Load approved reviews from the static JSON (client-side).
 * basePath-aware: under the VPS preview the site lives on a subpath.
 */
export async function loadReviews(): Promise<Review[]> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const res = await fetch(`${base}/data/reviews.json`, { cache: "no-store" });
    if (!res.ok) return [];
    return ((await res.json()) as Review[]).map(normalizeReview);
  } catch {
    return [];
  }
}

export async function loadReviewsWithMeta(): Promise<{
  reviews: Review[];
  meta: ReviewsMeta;
}> {
  const reviews = await loadReviews();
  return { reviews, meta: calculateReviewsMeta(reviews) };
}

/** Load reviews at build time (static export) via filesystem. */
export async function loadReviewsServer(): Promise<Review[]> {
  if (typeof window !== "undefined") return loadReviews();
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "public", "data", "reviews.json");
    const content = await fs.readFile(filePath, "utf-8");
    return (JSON.parse(content) as Review[]).map(normalizeReview);
  } catch {
    return [];
  }
}

export function findReviewById(reviews: Review[], id: string): Review | undefined {
  return reviews.find((r) => r.id === id);
}

/** Featured first, then rank by stars + recency. Never invents entries. */
export function getFeaturedReviews(reviews: Review[], count = 3): Review[] {
  const featured = reviews.filter((r) => r.featured);
  if (featured.length >= count) return featured.slice(0, count);
  const sorted = [...reviews].sort((a, b) => {
    if (b.stars !== a.stars) return b.stars - a.stars;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  const result = new Map<string, Review>();
  featured.forEach((r) => result.set(r.id, r));
  sorted.forEach((r) => {
    if (result.size < count) result.set(r.id, r);
  });
  return Array.from(result.values());
}
