#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const skillRoot = resolve(scriptDir, "..");

const targetArg = process.argv[2];
if (!targetArg) {
  console.error("Usage: node scripts/create_project.mjs <target-dir> [--force] [--with-timing] [--with-motion]");
  process.exit(1);
}

const force = process.argv.includes("--force");
const withTiming = process.argv.includes("--with-timing");
const withMotion = process.argv.includes("--with-motion");
const target = resolve(process.cwd(), targetArg);

const dirs = [
  "assets/audio",
  "assets/fonts",
  "assets/images",
  "assets/video",
  "compositions",
  "renders",
  "snapshots",
  "review",
];

mkdirSync(target, { recursive: true });
for (const dir of dirs) mkdirSync(join(target, dir), { recursive: true });

const templateMap = {
  "BRIEF_DESIGN_PROPOSAL.template.md": "BRIEF_DESIGN_PROPOSAL.md",
  "DESIGN.template.md": "DESIGN.md",
  "STORYBOARD.template.md": "STORYBOARD.md",
  "REVIEW_REPORT.template.md": "REVIEW_REPORT.md",
};

if (withTiming) templateMap["BEAT_MAP.template.json"] = "BEAT_MAP.json";
if (withMotion) templateMap["MOTION_MAP.template.json"] = "MOTION_MAP.json";

const templateDir = join(skillRoot, "templates");
for (const [template, outFile] of Object.entries(templateMap)) {
  const src = join(templateDir, template);
  const dest = join(target, outFile);
  if (existsSync(dest) && !force) continue;
  copyFileSync(src, dest);
}

const readmePath = join(target, "README.md");
if (!existsSync(readmePath) || force) {
  writeFileSync(readmePath, `# HyperFrames Ad Production

This project was scaffolded by the video-ad-director skill.

## Artifact Flow

1. BRIEF_DESIGN_PROPOSAL.md
2. DESIGN.md
3. STORYBOARD.md
4. REVIEW_REPORT.md
5. compositions/
6. snapshots/
7. renders/
8. REVIEW_PACK.md (generated after review assets exist)

Optional:

- BEAT_MAP.json via \`--with-timing\`
- MOTION_MAP.json via \`--with-motion\`

## Suggested Checks

\`\`\`bash
node ${skillRoot}/scripts/check_assets.mjs .
node ${skillRoot}/scripts/check_assets.mjs . --strict
node ${skillRoot}/scripts/score_artifacts.mjs .
npx hyperframes lint
npx hyperframes validate
npx hyperframes inspect
npx hyperframes snapshot <composition> --at <times>
\`\`\`
`);
}

const gitkeepDirs = dirs.filter((dir) => readdirSync(join(target, dir)).length === 0);
for (const dir of gitkeepDirs) {
  writeFileSync(join(target, dir, ".gitkeep"), "");
}

console.log(`Created HyperFrames ad production scaffold at ${target}`);
console.log("Next: fill BRIEF_DESIGN_PROPOSAL.md and get confirmation before generating images or implementing composition source.");
if (!withTiming) console.log("Optional: rerun with --with-timing if music, voiceover, or exact beat hits matter.");
if (!withMotion) console.log("Optional: rerun with --with-motion if GSAP choreography needs a separate motion map.");
