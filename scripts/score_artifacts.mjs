#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.cwd(), process.argv[2] || ".");

const checks = [
  {
    name: "Creative brief exists",
    file: "CREATIVE_BRIEF.md",
    pattern: /## Goal[\s\S]*## Audience[\s\S]*## CTA/,
    points: 10,
  },
  {
    name: "Design system covers typography and layout",
    file: "DESIGN.md",
    pattern: /## Typography[\s\S]*## Layout[\s\S]*## Motion Personality/,
    points: 15,
  },
  {
    name: "Script includes ad structure",
    file: "SCRIPT.md",
    pattern: /hook|reveal|proof|cta/i,
    points: 10,
  },
  {
    name: "Storyboard includes hero frames and transitions",
    file: "STORYBOARD.md",
    pattern: /hero frame|transition out|snapshot plan/i,
    points: 15,
  },
  {
    name: "Beat map exists with hits and snapshots",
    file: "BEAT_MAP.json",
    pattern: /"hits"[\s\S]*"snapshot_times"/,
    points: 10,
  },
  {
    name: "Motion map documents deterministic GSAP timing",
    file: "MOTION_MAP.json",
    pattern: /"paused"[\s\S]*"uses_absolute_positions"[\s\S]*"stability_notes"/,
    points: 15,
  },
  {
    name: "Review report records validation and next edit",
    file: "REVIEW_REPORT.md",
    pattern: /## Validation[\s\S]*## Recommended Next Edit[\s\S]*## Remaining Risks/,
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
  /What is being promoted/i,
  /3-4 sentences describing/i,
  /If no voiceover/i,
  /List timestamps/i,
  /The smallest next edit/i,
  /\|\s+\|\s+\|\s+\|/,
  /-\s*$/,
];

function hasTemplatePlaceholder(text) {
  return placeholderPatterns.some((pattern) => pattern.test(text));
}

let total = 0;
let earned = 0;
const results = [];

for (const check of checks) {
  total += check.points;
  const path = join(root, check.file);
  const text = existsSync(path) ? readFileSync(path, "utf8") : "";
  const passed = check.pattern.test(text) && !hasTemplatePlaceholder(text);
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
