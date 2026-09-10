/**
 * check:claims — CI guard against red claims leaking into public copy (§126).
 *
 * Scans every user-facing source file (src/**\/*.{ts,tsx,json}) for each
 * fragment in RED_CLAIM_FRAGMENTS. Matching is case-insensitive and
 * accent-insensitive (NFD + diacritic strip), so "Líder del Sector" and
 * "lider del sector" are both caught.
 *
 * Exclusions:
 * - src/content/claims.ts (the fragment list definition itself)
 * - test files (*.test.*, *.spec.*, __tests__/)
 *
 * Exit 1 with file:line for each hit; exit 0 when clean.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { RED_CLAIM_FRAGMENTS } from "../src/content/claims";

const SRC_ROOT = join(__dirname, "..", "src");
const DEFINITION_FILE = join(SRC_ROOT, "content", "claims.ts");
const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".json"]);

/** Lowercase + strip diacritics for accent-insensitive matching. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isTestFile(path: string): boolean {
  return /(?:__tests__|\.test\.|\.spec\.)/.test(path);
}

function collectFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry.startsWith(".")) continue;
      collectFiles(full, out);
    } else if (SCAN_EXTENSIONS.has(full.slice(full.lastIndexOf(".")))) {
      out.push(full);
    }
  }
  return out;
}

interface Hit {
  file: string;
  line: number;
  fragment: string;
  excerpt: string;
}

function main(): void {
  const normalizedFragments = RED_CLAIM_FRAGMENTS.map((fragment) => ({
    fragment,
    normalized: normalize(fragment),
  }));

  const files = collectFiles(SRC_ROOT).filter(
    (file) => file !== DEFINITION_FILE && !isTestFile(file),
  );

  const hits: Hit[] = [];
  for (const file of files) {
    const content = readFileSync(file, "utf8");
    const lines = content.split("\n");
    lines.forEach((lineText, index) => {
      const normalizedLine = normalize(lineText);
      for (const { fragment, normalized } of normalizedFragments) {
        if (normalizedLine.includes(normalized)) {
          hits.push({
            file: relative(join(__dirname, ".."), file).split(sep).join("/"),
            line: index + 1,
            fragment,
            excerpt: lineText.trim().slice(0, 120),
          });
        }
      }
    });
  }

  console.log(
    `check:claims — scanned ${files.length} files for ${RED_CLAIM_FRAGMENTS.length} red-claim fragments.`,
  );

  if (hits.length > 0) {
    console.error(`\nFAIL: ${hits.length} red-claim fragment(s) found in public source:`);
    for (const hit of hits) {
      console.error(`  ${hit.file}:${hit.line}  ["${hit.fragment}"]  ${hit.excerpt}`);
    }
    process.exit(1);
  }

  console.log("OK: no red-claim fragments found in src/.");
  process.exit(0);
}

main();
