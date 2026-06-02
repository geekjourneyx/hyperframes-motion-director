#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredFiles = [
  "SKILL.md",
  "references/workflow.md",
  "references/typography-composition.md",
  "references/motion-language.md",
  "references/audio-sync.md",
  "references/hyperframes-stability.md",
  "references/quality-rubric.md",
  "references/review-loop.md",
  "templates/CREATIVE_BRIEF.template.md",
  "templates/DESIGN.template.md",
  "templates/SCRIPT.template.md",
  "templates/STORYBOARD.template.md",
  "templates/BEAT_MAP.template.json",
  "templates/MOTION_MAP.template.json",
  "templates/REVIEW_REPORT.template.md",
  "scripts/create_project.mjs",
  "scripts/check_assets.mjs",
  "scripts/score_artifacts.mjs",
  "scripts/build_review_pack.mjs",
  "evals/evals.json",
  "evals/trigger-prompts.md",
];

const requiredSkillTerms = [
  "name: directing-hyperframes-ads",
  "description:",
  "Layout Before Animation",
  "Output Fidelity",
  "Hard Stability Rules",
  "Quality Gates",
  "scripts/create_project.mjs",
];

const missing = requiredFiles.filter((file) => !existsSync(join(root, file)));

const skillPath = join(root, "SKILL.md");
const skillText = existsSync(skillPath) ? readFileSync(skillPath, "utf8") : "";
const missingTerms = requiredSkillTerms.filter((term) => !skillText.includes(term));

if (missing.length > 0 || missingTerms.length > 0) {
  if (missing.length > 0) {
    console.error("Missing files:");
    for (const file of missing) console.error(`- ${file}`);
  }

  if (missingTerms.length > 0) {
    console.error("Missing required SKILL.md terms:");
    for (const term of missingTerms) console.error(`- ${term}`);
  }

  process.exit(1);
}

console.log("directing-hyperframes-ads structure check passed.");
