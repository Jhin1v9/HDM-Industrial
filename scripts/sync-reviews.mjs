#!/usr/bin/env node
/**
 * Sync GitHub Issues (label:approved) → public/data/reviews.json
 * Runs in the GitHub Action (or manually with GITHUB_TOKEN set).
 * Parses the fenced ```json block the hdm-cv relay embeds in each issue.
 * Preserves existing reviews not backed by an issue (manual additions).
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const REPO = process.env.GITHUB_REPOSITORY || "Jhin1v9/HDM-Industrial";
const TOKEN = process.env.GITHUB_TOKEN;
const OUTPUT = process.env.SYNC_OUTPUT || path.join(process.cwd(), "public", "data", "reviews.json");
const [OWNER, REPO_NAME] = REPO.split("/");

function loadExisting() {
  try {
    const parsed = JSON.parse(fs.readFileSync(OUTPUT, "utf-8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function githubFetch(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "hdm-reviews-sync",
    },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

/** Extract the JSON payload the relay embedded in the issue body. */
function parseIssueBody(body) {
  if (!body) return null;
  const m = body.match(/```json\s*([\s\S]*?)```/);
  if (!m) return null;
  try {
    const data = JSON.parse(m[1]);
    if (!data.name || !data.text) return null;
    return {
      id: String(data.id || ""),
      name: String(data.name).slice(0, 120),
      zone: String(data.zone || "").slice(0, 120),
      project_type: String(data.project_type || "").slice(0, 120),
      stars: Math.min(5, Math.max(1, Number(data.stars) || 5)),
      text: String(data.text).slice(0, 500),
      created_at: data.created_at || new Date().toISOString().slice(0, 10),
      locale: String(data.locale || "es").slice(0, 5),
      email: data.email || undefined,
    };
  } catch {
    return null;
  }
}

async function fetchApproved() {
  if (!TOKEN) throw new Error("GITHUB_TOKEN not set");
  const issues = await githubFetch(
    `https://api.github.com/repos/${OWNER}/${REPO_NAME}/issues?state=all&labels=approved&per_page=100`,
  );
  const reviews = [];
  for (const issue of issues) {
    if (issue.pull_request) continue;
    const parsed = parseIssueBody(issue.body);
    if (parsed) {
      if (!parsed.id) parsed.id = `issue-${issue.number}`;
      reviews.push(parsed);
    }
  }
  reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return reviews;
}

function merge(existing, approved) {
  const byId = new Map(approved.map((r) => [r.id, r]));
  const kept = existing.filter((r) => !byId.has(r.id));
  const merged = [...approved, ...kept];
  merged.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return merged;
}

async function main() {
  const existing = loadExisting();
  let approved = [];
  try {
    approved = await fetchApproved();
  } catch (err) {
    console.error("⚠️  GitHub fetch failed. Keeping existing JSON.");
    console.error(err.message);
    approved = null;
  }
  if (approved === null || (approved.length === 0 && existing.length > 0)) {
    console.log(`📦 Keeping ${existing.length} existing reviews.`);
    return;
  }
  const merged = merge(existing, approved);
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(merged, null, 2) + "\n");
  console.log(`✅ ${merged.length} reviews synced → ${OUTPUT}`);
  try {
    execSync(`git diff --quiet ${OUTPUT}`);
    console.log("📭 No changes.");
  } catch {
    console.log("📝 Changes detected. Committing...");
    execSync('git config user.name "github-actions[bot]"');
    execSync('git config user.email "github-actions[bot]@users.noreply.github.com"');
    execSync(`git add ${OUTPUT}`);
    execSync('git commit -m "chore: sync approved reviews [skip ci]"');
    execSync("git push");
    console.log("🚀 Committed and pushed.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
