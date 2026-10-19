import type { ReviewSubmission } from "./reviews";
import { companyFacts } from "@/content/company";

/**
 * Submit a review via the VPS relay (nexo_hdm_cv POST /hdm-cv/reviews).
 * The relay creates a GitHub Issue with the PAT server-side - the token
 * never reaches the browser (unlike jr-reformas NEXT_PUBLIC_ exposure).
 * Without PAT configured the relay answers 503 and we surface the honest
 * error; production never simulates success.
 */
export async function submitReview(
  data: ReviewSubmission,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${companyFacts.cvEndpoint}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string };
    if (!res.ok || !body.ok) {
      if (body.code === "reviews_not_configured") {
        return { ok: false, error: "reviews_not_configured" };
      }
      if (body.code === "rate_limited") {
        return { ok: false, error: "rate_limited" };
      }
      return { ok: false, error: `http_${res.status}` };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "network" };
  }
}
