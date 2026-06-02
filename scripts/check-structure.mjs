#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredFiles = [
  "SKILL.md",
  "references/workflow.md",
  "references/visual-standard.md",
  "references/audio-sync.md",
  "references/hyperframes-stability.md",
  "templates/BRIEF_DESIGN_PROPOSAL.template.md",
  "templates/DESIGN.template.md",
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
  "name: video-ad-director",
  "description:",
  "Layout Before Animation",
  "Two-Phase Rule",
  "Hard Stability Rules",
  "BRIEF_DESIGN_PROPOSAL.md",
  "Quality Gates",
  "scripts/create_project.mjs",
];

const missing = requiredFiles.filter((file) => !existsSync(join(root, file)));

const skillPath = join(root, "SKILL.md");
const skillText = existsSync(skillPath) ? readFileSync(skillPath, "utf8") : "";
const missingTerms = requiredSkillTerms.filter((term) => !skillText.includes(term));
const frontmatterMatch = skillText.match(/^---\n([\s\S]*?)\n---/);
const frontmatterErrors = [];

if (!frontmatterMatch) {
  frontmatterErrors.push("Missing YAML frontmatter block.");
} else {
  const lines = frontmatterMatch[1].split("\n");
  for (const [index, line] of lines.entries()) {
    if (line.trim() === "") continue;
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      frontmatterErrors.push(`Line ${index + 2} is not a simple key/value YAML field.`);
      continue;
    }

    const [, key, value] = match;
    const quoted = /^".*"$/.test(value) || /^'.*'$/.test(value);
    if (!quoted && /:\s/.test(value)) {
      frontmatterErrors.push(`Line ${index + 2} (${key}) contains an unquoted ': ' sequence.`);
    }
  }
}

if (missing.length > 0 || missingTerms.length > 0 || frontmatterErrors.length > 0) {
  if (missing.length > 0) {
    console.error("Missing files:");
    for (const file of missing) console.error(`- ${file}`);
  }

  if (missingTerms.length > 0) {
    console.error("Missing required SKILL.md terms:");
    for (const term of missingTerms) console.error(`- ${term}`);
  }

  if (frontmatterErrors.length > 0) {
    console.error("Invalid SKILL.md frontmatter:");
    for (const error of frontmatterErrors) console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log("video-ad-director structure check passed.");
