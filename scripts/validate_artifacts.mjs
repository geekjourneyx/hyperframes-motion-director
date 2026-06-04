#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.cwd(), process.argv[2] || ".");

const checks = [
  {
    name: "Approval brief exists before production",
    file: "BRIEF_DESIGN_PROPOSAL.md",
    pattern: /## Essence[\s\S]*## Format[\s\S]*## Image Generation Decision[\s\S]*Default background stage:[\s\S]*Background role:[\s\S]*Layout strategy:[\s\S]*Quiet text zone:[\s\S]*Codex Image Gen after confirmation:[\s\S]*## Typography And Layout[\s\S]*Title size tier:[\s\S]*Text spacing:[\s\S]*Text-over-image contrast treatment:[\s\S]*Mobile safe-zone handling:[\s\S]*Regenerate \/ recrop trigger:[\s\S]*## Motion Plan[\s\S]*Background motion:[\s\S]*Motion budget:[\s\S]*Motion bounds:[\s\S]*## Confirmation Needed/,
    fields: [
      "Layout strategy",
      "Background source",
      "Focal subject position",
      "Quiet text zone",
      "Title size tier",
      "Text spacing",
      "Text-over-image contrast treatment",
      "Mobile safe-zone handling",
      "Regenerate / recrop trigger",
      "Background motion",
      "Main attention target",
      "Motion budget",
      "Motion bounds",
    ],
    validators: ["layoutStrategy", "titleTier"],
  },
  {
    name: "Design system locks house style",
    file: "DESIGN.md",
    pattern: /## Metaphor System[\s\S]*#050505[\s\S]*warm gold[\s\S]*## Typography[\s\S]*## Layout[\s\S]*## Background Text Layout System[\s\S]*Default layout strategy:[\s\S]*Allowed layout contract variants:[\s\S]*Title size tier:[\s\S]*Text rectangle \/ subject rectangle:[\s\S]*Title \/ support \/ CTA spacing:[\s\S]*Mobile safe-zone handling:[\s\S]*Motion bounds:[\s\S]*## Background Image System[\s\S]*Quiet text zone:[\s\S]*## Text Over Image[\s\S]*Minimum contrast rule:[\s\S]*## Motion Personality[\s\S]*Motion budget:[\s\S]*## Image Generation Plan/,
    fields: [
      "Default layout strategy",
      "Allowed layout contract variants",
      "Title size tier",
      "Text rectangle / subject rectangle",
      "Title / support / CTA spacing",
      "Mobile safe-zone handling",
      "Motion bounds",
      "Background role",
      "Background source",
      "Local asset path",
      "Quiet text zone",
      "Title placement",
      "Minimum contrast rule",
      "Signature motion moment",
      "Repeated animation pattern to avoid",
    ],
    validators: ["layoutStrategy", "titleTier"],
  },
  {
    name: "Storyboard includes hero frames, metaphor roles, and visual asset breakdown",
    file: "STORYBOARD.md",
    pattern: /hero frame[\s\S]*Text role:[\s\S]*Metaphor role[\s\S]*Background \/ main visual state:[\s\S]*Layout contract:[\s\S]*Title size tier:[\s\S]*Readable hold:[\s\S]*Choreography:[\s\S]*Motion bounds:[\s\S]*Transition midpoint snapshot:[\s\S]*Hold-frame verdict:[\s\S]*Visual Asset Breakdown[\s\S]*Background stage:[\s\S]*Layout contracts:[\s\S]*Snapshot Plan[\s\S]*Expected dominant visual/i,
    fields: [
      "Background / main visual state",
      "Text role",
      "Text-safe zone",
      "Layout contract",
      "Title size tier",
      "Readable hold",
      "Choreography",
      "Motion bounds",
      "Attention target",
      "Transition midpoint snapshot",
      "Hold-frame verdict",
      "Background stage",
      "Layout contracts",
    ],
    validators: ["layoutContract", "titleTier"],
  },
  {
    name: "Review report records validation, style gate, and next edit",
    file: "REVIEW_REPORT.md",
    pattern: /## Validation[\s\S]*transition midpoints[\s\S]*layout overflow[\s\S]*## Style Gate[\s\S]*Background image or pure-code exception is verified:[\s\S]*Layout contract matches the image and message shape:[\s\S]*TextRect, subjectRect, and safeBottomY are verified:[\s\S]*Mobile safe zones are respected:[\s\S]*Motion bounds preserve readability:[\s\S]*Motion has a clear attention target:[\s\S]*Hold-frame verdict passed for hero frames:[\s\S]*## Layout Contract Revisions[\s\S]*## Recommended Next Edit[\s\S]*## Remaining Risks/,
    fields: [
      "Background image or pure-code exception is verified",
      "Background role supports meaning rather than decoration",
      "Layout contract matches the image and message shape",
      "TextRect, subjectRect, and safeBottomY are verified",
      "Text sits in a safe quiet zone",
      "Mobile safe zones are respected",
      "Motion bounds preserve readability",
      "Motion has a clear attention target",
      "Motion is not repeated template fade/translate",
      "Important text settles before it must be read",
      "Hold-frame verdict passed for hero frames",
    ],
  },
  {
    name: "Composition or explicit blocker exists",
    file: "REVIEW_REPORT.md",
    pattern: /composition|render|blocked|not produced|not run/i,
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

const layoutContractRules = [
  { name: "layout intent", pattern: /\b(?:cinematic|side-title|center symbol|symbol|product|claim|evidence|proof|cutaway|panel|kinetic|type|stage|split|sequence|beat)\b/i },
  { name: "standard ratio", pattern: /\b(?:9:16|21:9|16:10|16:9|4:3|3:2|1:1|none)\b/ },
  { name: "text axis", pattern: /\b(?:left|right|center|top|bottom-safe|split)\s+axis\b/i },
  { name: "textRect", pattern: /\btextRect\b/i },
  { name: "subjectRect", pattern: /\bsubjectRect\b/i },
  { name: "safeBottomY", pattern: /\bsafeBottomY\s*(?:<=|≤)?\s*\d+(?:%|px)\b/i },
  { name: "title tier", pattern: /\btitle tier\s+(?:hero|large|main|reduced|compact)\b/i },
  { name: "motion bounds", pattern: /\bmotion\b[\s\S]*\b(?:bounds|inside|safe|textRect|zone)\b/i },
];

const titleTierPattern = /\b(?:hero|large|main|reduced|compact)\b/i;
const layoutStrategyPattern = /\b(?:cinematic|side-title|center|symbol|product|claim|evidence|proof|cutaway|panel|kinetic|type|stage|split|sequence|beat|text|subject|quiet|safe|mobile|crop)\b/i;

function hasTemplatePlaceholder(text) {
  return placeholderPatterns.some((pattern) => pattern.test(text));
}

function fieldValue(text, field) {
  const escaped = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = text.match(new RegExp(`^- ${escaped}:\\s*(.*)$`, "m"));
  return match ? match[1].trim() : null;
}

function fieldValues(text, field) {
  const escaped = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [...text.matchAll(new RegExp(`^- ${escaped}:\\s*(.*)$`, "gm"))].map((match) => match[1].trim());
}

function missingFilledFields(text, fields = []) {
  return fields.filter((field) => {
    const value = fieldValue(text, field);
    return value === null || value === "" || optionOnlyValues.includes(value);
  });
}

function semanticErrors(text, validators = []) {
  const errors = [];

  if (validators.includes("layoutStrategy")) {
    const strategies = [...fieldValues(text, "Layout strategy"), ...fieldValues(text, "Default layout strategy"), ...fieldValues(text, "Allowed layout contract variants")];
    if (strategies.length === 0) {
      errors.push("Layout strategy missing.");
    } else {
      for (const [index, strategy] of strategies.entries()) {
        if (!layoutStrategyPattern.test(strategy)) errors.push(`Layout strategy ${index + 1} is too vague.`);
      }
    }
  }

  if (validators.includes("layoutContract")) {
    const contracts = fieldValues(text, "Layout contract");
    if (contracts.length === 0) {
      errors.push("Layout contract missing.");
    } else {
      for (const [index, contract] of contracts.entries()) {
        for (const rule of layoutContractRules) {
          if (rule.name === "subjectRect" && /\b(?:kinetic|type)\b/i.test(contract) && /\bsubjectRect\s+none\b/i.test(contract)) continue;
          if (!rule.pattern.test(contract)) {
            errors.push(`Layout contract ${index + 1} missing ${rule.name}.`);
          }
        }
      }
    }
  }

  if (validators.includes("titleTier")) {
    const tiers = [...fieldValues(text, "Title size tier"), ...fieldValues(text, "Title tier")];
    if (tiers.length === 0) {
      errors.push("Title size tier missing.");
    } else {
      for (const [index, tier] of tiers.entries()) {
        if (!titleTierPattern.test(tier)) errors.push(`Title size tier ${index + 1} is not one of hero/large/main/reduced/compact.`);
      }
    }
  }

  return errors;
}

const results = [];

for (const check of checks) {
  const path = join(root, check.file);
  const text = existsSync(path) ? readFileSync(path, "utf8") : "";
  const missingFields = missingFilledFields(text, check.fields);
  const semantic = semanticErrors(text, check.validators || []);
  const passed = check.pattern.test(text) && !hasTemplatePlaceholder(text) && missingFields.length === 0 && semantic.length === 0;
  results.push({
    name: check.name,
    file: check.file,
    passed,
    evidence: !existsSync(path)
      ? "File missing."
      : hasTemplatePlaceholder(text)
        ? "File still contains template placeholder text."
        : missingFields.length > 0
          ? `Required fields not filled: ${missingFields.join(", ")}.`
        : semantic.length > 0
          ? `Semantic validation failed: ${semantic.join(" ")}`
          : check.pattern.test(text)
            ? "Required sections found."
            : "Required sections missing.",
  });
}

const passedCount = results.filter((result) => result.passed).length;
const failedCount = results.length - passedCount;
const report = {
  valid: failedCount === 0,
  passed: passedCount,
  failed: failedCount,
  results,
};

writeFileSync(join(root, "ARTIFACT_VALIDATION.json"), JSON.stringify(report, null, 2));

console.log(`Artifact validation ${report.valid ? "passed" : "failed"}.`);
for (const result of results) {
  console.log(`${result.passed ? "PASS" : "FAIL"} - ${result.name} (${result.evidence})`);
}

if (!report.valid) process.exitCode = 1;
