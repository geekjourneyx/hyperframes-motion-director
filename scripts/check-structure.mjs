#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredFiles = [
  "SKILL.md",
  "references/workflow.md",
  "references/visual-standard.md",
  "references/motion-background-system.md",
  "references/motion-craft.md",
  "references/design-engineering.md",
  "references/gsap-choreography.md",
  "references/text-over-background-layout.md",
  "references/audio-sync.md",
  "references/hyperframes-stability.md",
  "templates/BRIEF_DESIGN_PROPOSAL.template.md",
  "templates/DESIGN.template.md",
  "templates/STORYBOARD.template.md",
  "templates/BEAT_MAP.template.json",
  "templates/MOTION_MAP.template.json",
  "templates/SCENE_SCHEMA.template.json",
  "templates/VECTOR_TEMPLATES.template.json",
  "templates/MOTION_PRIMITIVES.template.json",
  "templates/REVIEW_REPORT.template.md",
  "scripts/create_project.mjs",
  "scripts/check_assets.mjs",
  "scripts/validate_artifacts.mjs",
  "scripts/validate_design_engineering.mjs",
  "scripts/build_review_pack.mjs",
  "evals/evals.json",
  "evals/trigger-prompts.md",
];

const requiredSkillTerms = [
  "name: hyperframes-motion-director",
  "# HyperFrames Motion Director",
  "description:",
  "Two-Phase Rule",
  "Hard Stability Rules",
  "Background And Motion Rule",
  "Text Over Background Layout Rule",
  "Kinetic Text Relay Rule",
  "Design Engineering Contract Rule",
  "GSAP Choreography Contract Rule",
  "Motion Design Compiler",
  "BRIEF_DESIGN_PROPOSAL.md",
  "SCENE_SCHEMA.json",
  "VECTOR_TEMPLATES.json",
  "MOTION_PRIMITIVES.json",
  "scripts/create_project.mjs",
];

const positioningChecks = [
  {
    file: "README.md",
    required: ["# HyperFrames Motion Director"],
    forbidden: ["# Video Ad Director", "面向 HyperFrames 视频广告", "Video Ad Director 是一个用于制作"],
  },
  {
    file: "SKILL.md",
    required: ["name: hyperframes-motion-director", "# HyperFrames Motion Director", "Text Over Background Layout Rule", "text-over-background-layout.md"],
    forbidden: ["name: video-ad-director", "# Video Ad Director", "AI video ad or promo", "HyperFrames advertising work"],
  },
  {
    file: "AGENTS.md",
    required: ["HyperFrames cinematic motion-video production work"],
    forbidden: ["HyperFrames video advertising work", "HyperFrames ad production scaffold"],
  },
  {
    file: "scripts/create_project.mjs",
    required: ["HyperFrames Motion Production", "HyperFrames Motion Director"],
    forbidden: ["HyperFrames Ad Production"],
  },
  {
    file: "references/design-engineering.md",
    required: ["Motion Design Compiler", "scene schema", "motion primitives", "vector templates", "selection rules", "render validation"],
    forbidden: [],
  },
  {
    file: "references/gsap-choreography.md",
    required: ["GSAP choreography", "timeline labels", "position parameters", "transform aliases", "autoAlpha", "plugin registration", "DrawSVG", "MorphSVG", "MotionPath", "SplitText", "performance"],
    forbidden: [],
  },
];

const missing = requiredFiles.filter((file) => !existsSync(join(root, file)));

const skillPath = join(root, "SKILL.md");
const skillText = existsSync(skillPath) ? readFileSync(skillPath, "utf8") : "";
const missingTerms = requiredSkillTerms.filter((term) => !skillText.includes(term));
const frontmatterMatch = skillText.match(/^---\n([\s\S]*?)\n---/);
const frontmatterErrors = [];
const positioningErrors = [];

for (const check of positioningChecks) {
  const path = join(root, check.file);
  const text = existsSync(path) ? readFileSync(path, "utf8") : "";
  for (const term of check.required) {
    if (!text.includes(term)) positioningErrors.push(`${check.file} missing required positioning term: ${term}`);
  }
  for (const term of check.forbidden) {
    if (text.includes(term)) positioningErrors.push(`${check.file} contains deprecated positioning term: ${term}`);
  }
}

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

if (missing.length > 0 || missingTerms.length > 0 || frontmatterErrors.length > 0 || positioningErrors.length > 0) {
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

  if (positioningErrors.length > 0) {
    console.error("Invalid public positioning:");
    for (const error of positioningErrors) console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log("hyperframes-motion-director structure check passed.");
