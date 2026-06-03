#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.cwd(), process.argv[2] || ".");

const checks = [
  {
    name: "Approval brief exists before production",
    file: "BRIEF_DESIGN_PROPOSAL.md",
    pattern: /## Essence[\s\S]*## Format[\s\S]*## Image Generation Decision[\s\S]*Default background stage:[\s\S]*Background role:[\s\S]*Quiet text zone:[\s\S]*Codex Image Gen after confirmation:[\s\S]*## Typography And Layout[\s\S]*Text-over-image contrast treatment:[\s\S]*## Motion Plan[\s\S]*Background motion:[\s\S]*Motion budget:[\s\S]*## Confirmation Needed/,
    fields: [
      "Background source",
      "Focal subject position",
      "Quiet text zone",
      "Text-over-image contrast treatment",
      "Background motion",
      "Main attention target",
      "Motion budget",
    ],
    points: 30,
  },
  {
    name: "Design system locks house style",
    file: "DESIGN.md",
    pattern: /## Metaphor System[\s\S]*#050505[\s\S]*warm gold[\s\S]*## Typography[\s\S]*## Layout[\s\S]*## Background Image System[\s\S]*Quiet text zone:[\s\S]*## Text Over Image[\s\S]*## Motion Personality[\s\S]*Motion budget:[\s\S]*## Image Generation Plan/,
    fields: [
      "Background role",
      "Background source",
      "Local asset path",
      "Quiet text zone",
      "Title placement",
      "Minimum contrast rule",
      "Signature motion moment",
      "Repeated animation pattern to avoid",
    ],
    points: 25,
  },
  {
    name: "Storyboard includes hero frames, metaphor roles, and visual asset breakdown",
    file: "STORYBOARD.md",
    pattern: /hero frame[\s\S]*Metaphor role[\s\S]*Background \/ main visual state:[\s\S]*Motion purpose:[\s\S]*Transition midpoint snapshot:[\s\S]*Poster-frame verdict:[\s\S]*Visual Asset Breakdown[\s\S]*Background stage:[\s\S]*Snapshot Plan[\s\S]*Expected dominant visual/i,
    fields: [
      "Background / main visual state",
      "Text-safe zone",
      "Attention target",
      "Must stay still",
      "Still hold duration",
      "Transition midpoint snapshot",
      "Poster-frame verdict",
      "Background stage",
    ],
    points: 20,
  },
  {
    name: "Review report records validation, style gate, and next edit",
    file: "REVIEW_REPORT.md",
    pattern: /## Validation[\s\S]*transition midpoints[\s\S]*layout overflow[\s\S]*## Style Gate[\s\S]*Background image or pure-code exception is verified:[\s\S]*Motion has a clear attention target:[\s\S]*Poster-frame verdict passed for hero frames:[\s\S]*## Recommended Next Edit[\s\S]*## Remaining Risks/,
    fields: [
      "Background image or pure-code exception is verified",
      "Background role supports meaning rather than decoration",
      "Text sits in a safe quiet zone",
      "Motion has a clear attention target",
      "Motion is not repeated template fade/slide",
      "Important text settles before it must be read",
      "Poster-frame verdict passed for hero frames",
    ],
    points: 15,
  },
  {
    name: "Composition or explicit blocker exists",
    file: "REVIEW_REPORT.md",
    pattern: /composition|render|blocked|not produced|not run/i,
    points: 10,
  },
];

const placeholderPatterns = [
  /What should the viewer/i,
  /Who is watching/i,
  /Target platform/i,
  /Product or offer/i,
  /Core viewpoint:\s*$/m,
  /Largest conflict:\s*$/m,
  /Emotional center:\s*$/m,
  /Visual metaphor:\s*$/m,
  /Selected structure:\s*center symbol \/ huge title \/ person anchor \/ huge number/m,
  /Generate images:\s*yes \/ no/m,
  /Default background stage:\s*generated \/ supplied \/ pure-code exception/m,
  /Background role:\s*stage \/ symbol \/ texture \/ anchor \/ transition plate/m,
  /Motion purpose:\s*reveal \/ transition \/ emphasis \/ hold/m,
  /Codex Image Gen after confirmation:\s*yes \/ no/m,
  /Overflow handling:\s*$/m,
  /Confirm this direction before image generation/i,
  /3-4 sentences describing/i,
  /If no voiceover/i,
  /List timestamps/i,
  /The smallest next edit/i,
  /\|\s+\|\s+\|\s+\|/,
  /-\s*$/,
];

const optionOnlyValues = [
  "generated / supplied / pure-code exception",
  "stage / symbol / texture / anchor / transition plate",
  "reveal / transition / emphasis / hold",
  "yes / no",
];

function hasTemplatePlaceholder(text) {
  return placeholderPatterns.some((pattern) => pattern.test(text));
}

function fieldValue(text, field) {
  const escaped = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = text.match(new RegExp(`^- ${escaped}:\\s*(.*)$`, "m"));
  return match ? match[1].trim() : null;
}

function missingFilledFields(text, fields = []) {
  return fields.filter((field) => {
    const value = fieldValue(text, field);
    return value === null || value === "" || optionOnlyValues.includes(value);
  });
}

let total = 0;
let earned = 0;
const results = [];

for (const check of checks) {
  total += check.points;
  const path = join(root, check.file);
  const text = existsSync(path) ? readFileSync(path, "utf8") : "";
  const missingFields = missingFilledFields(text, check.fields);
  const passed = check.pattern.test(text) && !hasTemplatePlaceholder(text) && missingFields.length === 0;
  if (passed) earned += check.points;
  results.push({
    name: check.name,
    file: check.file,
    points: check.points,
    passed,
    evidence: !existsSync(path)
      ? "File missing."
      : hasTemplatePlaceholder(text)
        ? "File still contains template placeholder text."
        : missingFields.length > 0
          ? `Required fields not filled: ${missingFields.join(", ")}.`
        : check.pattern.test(text)
          ? "Required sections found."
          : "Required sections missing.",
  });
}

const report = {
  score: earned,
  total,
  percent: total === 0 ? 0 : Number(((earned / total) * 100).toFixed(1)),
  results,
};

writeFileSync(join(root, "QUALITY_REPORT.json"), JSON.stringify(report, null, 2));

console.log(`Artifact score: ${earned}/${total} (${report.percent}%)`);
for (const result of results) {
  console.log(`${result.passed ? "PASS" : "FAIL"} ${result.points}pt - ${result.name} (${result.evidence})`);
}

if (earned < total) process.exitCode = 1;
