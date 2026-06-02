#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.cwd(), process.argv[2] || ".");

function listFiles(dir) {
  const path = join(root, dir);
  if (!existsSync(path)) return [];
  return readdirSync(path)
    .filter((name) => name !== ".gitkeep")
    .sort()
    .map((name) => `${dir}/${name}`);
}

const artifacts = [
  "CREATIVE_BRIEF.md",
  "DESIGN.md",
  "SCRIPT.md",
  "STORYBOARD.md",
  "BEAT_MAP.json",
  "MOTION_MAP.json",
  "REVIEW_REPORT.md",
  "QUALITY_REPORT.json",
].filter((file) => existsSync(join(root, file)));

const renders = listFiles("renders");
const snapshots = listFiles("snapshots");
const compositions = listFiles("compositions");

let reviewReportExcerpt = "";
const reviewPath = join(root, "REVIEW_REPORT.md");
if (existsSync(reviewPath)) {
  reviewReportExcerpt = readFileSync(reviewPath, "utf8").slice(0, 4000);
}

const md = `# Review Pack

## Artifacts

${artifacts.map((file) => `- ${file}`).join("\n") || "- None"}

## Composition Files

${compositions.map((file) => `- ${file}`).join("\n") || "- None"}

## Renders

${renders.map((file) => `- ${file}`).join("\n") || "- None"}

## Snapshots

${snapshots.map((file) => `- ${file}`).join("\n") || "- None"}

## Review Report Excerpt

\`\`\`md
${reviewReportExcerpt || "No REVIEW_REPORT.md found."}
\`\`\`

## Human Review Order

1. Inspect hero snapshots or planned snapshot timestamps.
2. Watch muted, if a render exists.
3. Watch with audio, if audio exists.
4. Review validation blockers and remaining risks.
5. Choose one next edit.
`;

writeFileSync(join(root, "REVIEW_PACK.md"), md);
console.log(`Review pack written to ${join(root, "REVIEW_PACK.md")}`);
