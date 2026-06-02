#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const skillRoot = resolve(scriptDir, "..");

const targetArg = process.argv[2];
if (!targetArg) {
  console.error("Usage: node scripts/create_project.mjs <target-dir> [--force]");
  process.exit(1);
}

const force = process.argv.includes("--force");
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
  "CREATIVE_BRIEF.template.md": "CREATIVE_BRIEF.md",
  "DESIGN.template.md": "DESIGN.md",
  "SCRIPT.template.md": "SCRIPT.md",
  "STORYBOARD.template.md": "STORYBOARD.md",
  "BEAT_MAP.template.json": "BEAT_MAP.json",
  "MOTION_MAP.template.json": "MOTION_MAP.json",
  "REVIEW_REPORT.template.md": "REVIEW_REPORT.md",
};

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

This project was scaffolded by the directing-hyperframes-ads skill.

## Artifact Flow

1. CREATIVE_BRIEF.md
2. DESIGN.md
3. SCRIPT.md
4. STORYBOARD.md
5. BEAT_MAP.json
6. MOTION_MAP.json
7. compositions/
8. snapshots/
9. renders/
10. REVIEW_REPORT.md and REVIEW_PACK.md

## Suggested Checks

\`\`\`bash
node scripts/check_assets.mjs .
node scripts/score_artifacts.mjs .
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
console.log("Next: fill CREATIVE_BRIEF.md, DESIGN.md, SCRIPT.md, STORYBOARD.md, BEAT_MAP.json, and MOTION_MAP.json before implementing composition source.");
