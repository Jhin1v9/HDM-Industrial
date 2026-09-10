/**
 * check:seo — post-build CI guard over the static export (out/).
 *
 * Walks EVERY exported HTML page — all `**\/index.html` plus root-level
 * `*.html` (e.g. aviso-legal.html, ca.html) — excluding build artifacts
 * (_next/, _not-found, 404.html), and verifies each page has:
 * - exactly one <h1>
 * - a non-empty <title>
 * - a canonical link (<link rel="canonical" href="...">)
 * - hreflang alternate links (all published pages are localized)
 *
 * If out/ does not exist, exits 1 with a clear message (run `npm run build` first).
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep, basename } from "node:path";

const OUT_ROOT = join(__dirname, "..", "out");

/** Paths (or segments) that are build artifacts, not indexable pages. */
function isArtifact(relativePath: string): boolean {
  const segments = relativePath.split(sep);
  if (segments.some((segment) => segment.startsWith("_"))) return true; // _next, _not-found
  const name = basename(relativePath).toLowerCase();
  return name === "404.html" || name === "500.html";
}

function collectHtmlPages(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      collectHtmlPages(full, out);
    } else if (entry.toLowerCase().endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

interface PageProblem {
  file: string;
  problems: string[];
}

function checkPage(html: string): string[] {
  const problems: string[] = [];

  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1Count !== 1) {
    problems.push(`expected exactly 1 <h1>, found ${h1Count}`);
  }

  const titleMatch = /<title[^>]*>([^<]*)<\/title>/i.exec(html);
  if (!titleMatch || (titleMatch[1] ?? "").trim().length === 0) {
    problems.push("missing or empty <title>");
  }

  const canonicalMatch = /<link[^>]*rel=["']canonical["'][^>]*>/i.exec(html);
  if (!canonicalMatch || !/href=["'][^"']+["']/i.test(canonicalMatch[0])) {
    problems.push('missing <link rel="canonical" href="...">');
  }

  const hreflangCount = (html.match(/<link[^>]*rel=["']alternate["'][^>]*hreflang=/gi) ?? []).length;
  if (hreflangCount === 0) {
    problems.push('missing hreflang alternate links (<link rel="alternate" hreflang="...">)');
  }

  return problems;
}

function main(): void {
  if (!existsSync(OUT_ROOT)) {
    console.error(
      "FAIL: out/ directory not found. Run `npm run build` (static export) before check:seo.",
    );
    process.exit(1);
  }

  const pages = collectHtmlPages(OUT_ROOT).filter(
    (page) => !isArtifact(relative(OUT_ROOT, page)),
  );
  if (pages.length === 0) {
    console.error("FAIL: out/ exists but contains no HTML pages — build output looks wrong.");
    process.exit(1);
  }

  const failures: PageProblem[] = [];
  for (const page of pages) {
    const html = readFileSync(page, "utf8");
    const problems = checkPage(html);
    if (problems.length > 0) {
      failures.push({
        file: relative(OUT_ROOT, page).split(sep).join("/"),
        problems,
      });
    }
  }

  console.log(`check:seo — verified ${pages.length} exported page(s) in out/.`);

  if (failures.length > 0) {
    console.error(`\nFAIL: ${failures.length} page(s) with SEO problems:`);
    for (const failure of failures) {
      for (const problem of failure.problems) {
        console.error(`  ${failure.file}: ${problem}`);
      }
    }
    process.exit(1);
  }

  console.log(
    "OK: every page has exactly one <h1>, a <title>, a canonical link and hreflang alternates.",
  );
  process.exit(0);
}

main();
