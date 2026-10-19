import type { Review } from "./reviews";

export interface FilterState {
  stars: number[];
  zone: string | null;
  projectType: string | null;
  sortBy: "recent" | "rating";
}

export const DEFAULT_FILTERS: FilterState = {
  stars: [],
  zone: null,
  projectType: null,
  sortBy: "recent",
};

export function filterReviews(reviews: Review[], filters: FilterState): Review[] {
  const filtered = reviews.filter((r) => {
    const matchStars = filters.stars.length === 0 || filters.stars.includes(r.stars);
    const matchZone = !filters.zone || r.zone === filters.zone;
    const matchType = !filters.projectType || r.project_type === filters.projectType;
    return matchStars && matchZone && matchType;
  });
  return sortReviews(filtered, filters.sortBy);
}

export function sortReviews(reviews: Review[], sortBy: FilterState["sortBy"]): Review[] {
  const sorted = [...reviews];
  if (sortBy === "rating") {
    sorted.sort((a, b) => {
      if (b.stars !== a.stars) return b.stars - a.stars;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  } else {
    sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
  return sorted;
}

export function getAvailableFilters(reviews: Review[]) {
  const zones = Array.from(new Set(reviews.map((r) => r.zone))).sort();
  const projectTypes = Array.from(new Set(reviews.map((r) => r.project_type))).sort();
  const starCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.stars === stars).length,
  }));
  return { zones, projectTypes, starCounts };
}
