/**
 * check:placeholders — CI guard for the placeholder registry (§22).
 *
 * Prints the registry grouped by priority (P0/P1/P2) and status, and fails
 * (exit 1) when a release-blocking placeholder is still unfilled while running
 * in a production context (CI=true or NODE_ENV=production).
 *
 * In non-production contexts unfilled release-blocking placeholders are
 * reported as warnings and the script exits 0.
 */
import { placeholdersRegistry } from "../src/content/placeholders";
import type { MediaPlaceholder, PlaceholderPriority } from "../src/domain/types";

const PRIORITIES: readonly PlaceholderPriority[] = ["P0", "P1", "P2"];
const STATUSES: readonly MediaPlaceholder["status"][] = ["pending", "filled"];

const isProductionContext =
  process.env.CI === "true" || process.env.NODE_ENV === "production";

function pad(value: string, width: number): string {
  return value.length >= width ? value : value + " ".repeat(width - value.length);
}

function printTable(rows: readonly MediaPlaceholder[]): void {
  const header = `${pad("ID", 26)} ${pad("PRIO", 5)} ${pad("STATUS", 8)} ${pad("BLOCKING", 9)} ${pad("PAGE", 38)} PURPOSE`;
  console.log(header);
  console.log("-".repeat(header.length + 20));
  for (const p of rows) {
    console.log(
      `${pad(p.id, 26)} ${pad(p.priority, 5)} ${pad(p.status, 8)} ${pad(
        p.releaseBlocking ? "YES" : "no",
        9,
      )} ${pad(p.page, 38)} ${p.purpose}`,
    );
  }
}

function main(): void {
  console.log("HDM Industrial — placeholder registry report");
  console.log(
    `Context: ${isProductionContext ? "PRODUCTION (CI/NODE_ENV)" : "development"} — ${placeholdersRegistry.length} placeholders\n`,
  );

  const blockingUnfilled: MediaPlaceholder[] = [];

  for (const priority of PRIORITIES) {
    const inPriority = placeholdersRegistry.filter((p) => p.priority === priority);
    console.log(`== Priority ${priority} (${inPriority.length}) ==`);
    for (const status of STATUSES) {
      const rows = inPriority.filter((p) => p.status === status);
      if (rows.length === 0) continue;
      console.log(`-- ${status} (${rows.length}) --`);
      printTable(rows);
      console.log("");
    }
    for (const p of inPriority) {
      if (p.releaseBlocking && p.status !== "filled") blockingUnfilled.push(p);
    }
  }

  const totalFilled = placeholdersRegistry.filter((p) => p.status === "filled").length;
  console.log(
    `Summary: ${totalFilled}/${placeholdersRegistry.length} filled, ${placeholdersRegistry.length - totalFilled} pending, ${blockingUnfilled.length} release-blocking unfilled.`,
  );

  if (blockingUnfilled.length > 0) {
    const ids = blockingUnfilled.map((p) => p.id).join(", ");
    if (isProductionContext) {
      console.error(
        `\nFAIL: ${blockingUnfilled.length} release-blocking placeholder(s) unfilled in production context: ${ids}`,
      );
      process.exit(1);
    }
    console.warn(
      `\nWARN: release-blocking placeholder(s) unfilled (allowed outside production): ${ids}`,
    );
  }

  console.log("\nOK: no release-blocking placeholder blocks this context.");
  process.exit(0);
}

main();
