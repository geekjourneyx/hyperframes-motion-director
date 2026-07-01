#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.cwd(), process.argv[2] || ".");

const checks = [
  {
    name: "Approval brief exists before production",
    file: "BRIEF_DESIGN_PROPOSAL.md",
    pattern: /## Writing Standard[\s\S]*Sentence style:[\s\S]*Avoid:[\s\S]*Keep:[\s\S]*## Essence[\s\S]*## Format[\s\S]*## Visual Direction[\s\S]*First eye target:[\s\S]*Center-impact text decision:[\s\S]*## Image Generation Decision[\s\S]*Default background stage:[\s\S]*Background role:[\s\S]*Layout strategy:[\s\S]*Quiet text zone:[\s\S]*Codex Image Gen after confirmation:[\s\S]*## Kinetic Text Relay Plan[\s\S]*Keyword chain:[\s\S]*Action object chain:[\s\S]*Direction map:[\s\S]*Relay object \/ handoff logic:[\s\S]*Target kinetic relay score:[\s\S]*## Typography And Layout[\s\S]*Title size tier:[\s\S]*Text spacing:[\s\S]*Text-over-image contrast treatment:[\s\S]*Mobile safe-zone handling:[\s\S]*Regenerate \/ recrop trigger:[\s\S]*## Motion Plan[\s\S]*Background motion:[\s\S]*Text transition style:[\s\S]*Kinetic typography plan:[\s\S]*CSS3 \/ SVG structure:[\s\S]*GSAP choreography:[\s\S]*Signature motion moment:[\s\S]*Motion budget:[\s\S]*Motion bounds:[\s\S]*Anti-PPT prevention:[\s\S]*## Confirmation Needed/,
    fields: [
      "Layout strategy",
      "Sentence style",
      "Avoid",
      "Keep",
      "Background source",
      "Focal subject position",
      "Quiet text zone",
      "First eye target",
      "Center-impact text decision",
      "First 0-2s scroll-stop event",
      "Biggest word or object",
      "Keyword chain",
      "Action object chain",
      "Direction map",
      "Relay object / handoff logic",
      "Target kinetic relay score",
      "Title size tier",
      "Visual impact line",
      "First-screen attention zone",
      "Hook text zone",
      "Text spacing",
      "Text-over-image contrast treatment",
      "Mobile safe-zone handling",
      "Regenerate / recrop trigger",
      "Background motion",
      "Main attention target",
      "Text transition style",
      "Kinetic typography plan",
      "CSS3 / SVG structure",
      "GSAP choreography",
      "Signature motion moment",
      "Motion budget",
      "Motion bounds",
      "Anti-PPT prevention",
    ],
    validators: ["layoutStrategy", "titleTier", "scoreTarget"],
  },
  {
    name: "Design system locks house style",
    file: "DESIGN.md",
    pattern: /## Writing Standard[\s\S]*Sentence style:[\s\S]*Avoid:[\s\S]*Keep:[\s\S]*## Overview[\s\S]*## Metaphor System[\s\S]*#050505[\s\S]*warm gold[\s\S]*## Typography[\s\S]*## Layout[\s\S]*First eye target:[\s\S]*Center-impact policy:[\s\S]*Lower-safe policy:[\s\S]*## Background Text Layout System[\s\S]*Default layout strategy:[\s\S]*Allowed layout contract variants:[\s\S]*Title size tier:[\s\S]*Text rectangle \/ subject rectangle:[\s\S]*Title \/ support \/ CTA spacing:[\s\S]*Mobile safe-zone handling:[\s\S]*Motion bounds:[\s\S]*## Background Image System[\s\S]*Quiet text zone:[\s\S]*## Text Over Image[\s\S]*Minimum contrast rule:[\s\S]*## Components[\s\S]*## Kinetic Text Relay System[\s\S]*Keyword chain:[\s\S]*Action object chain:[\s\S]*Direction vocabulary:[\s\S]*Relay \/ handoff rules:[\s\S]*Kinetic relay score target:[\s\S]*## Motion Personality[\s\S]*Motion budget:[\s\S]*## Motion Craft System[\s\S]*Anti-PPT diagnosis:[\s\S]*Kinetic typography language:[\s\S]*Text transition vocabulary:[\s\S]*CSS3 layers:[\s\S]*SVG layers:[\s\S]*GSAP master timeline structure:[\s\S]*Scene transition bridges:[\s\S]*## Image Generation Plan/,
    fields: [
      "Default layout strategy",
      "Sentence style",
      "Avoid",
      "Keep",
      "Allowed layout contract variants",
      "First eye target",
      "Center-impact policy",
      "Lower-safe policy",
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
      "Keyword chain",
      "Action object chain",
      "Direction vocabulary",
      "Relay / handoff rules",
      "Kinetic relay score target",
      "Signature motion moment",
      "Repeated animation pattern to avoid",
      "Anti-PPT diagnosis",
      "Camera / spatial movement",
      "Kinetic typography language",
      "Text transition vocabulary",
      "CSS3 layers",
      "SVG layers",
      "GSAP master timeline structure",
      "Scene transition bridges",
      "Readable lock moments",
      "Motion devices to avoid",
    ],
    validators: ["layoutStrategy", "titleTier", "scoreTarget"],
  },
  {
    name: "Storyboard includes hero frames, metaphor roles, and visual asset breakdown",
    file: "STORYBOARD.md",
    pattern: /## Writing Standard[\s\S]*Sentence style:[\s\S]*Avoid:[\s\S]*Keep:[\s\S]*hero frame[\s\S]*Text role:[\s\S]*First eye target:[\s\S]*Center-impact decision:[\s\S]*Hero text zone:[\s\S]*Why this zone owns attention:[\s\S]*Metaphor role[\s\S]*Background \/ main visual state:[\s\S]*Layout contract:[\s\S]*Title size tier:[\s\S]*Readable hold:[\s\S]*Text transition:[\s\S]*Text transition device:[\s\S]*Kinetic relay:[\s\S]*Directional transition:[\s\S]*Transition midpoint frame:[\s\S]*Kinetic relay score note:[\s\S]*What changes if this motion is removed:[\s\S]*Choreography:[\s\S]*Motion bounds:[\s\S]*Transition midpoint snapshot:[\s\S]*Anti-PPT risk:[\s\S]*Hold-frame verdict:[\s\S]*Visual Asset Breakdown[\s\S]*Kinetic relay keyword chain:[\s\S]*Direction map:[\s\S]*Relay continuity rules:[\s\S]*Background stage:[\s\S]*Layout contracts:[\s\S]*Snapshot Plan[\s\S]*Expected dominant visual/i,
    fields: [
      "Background / main visual state",
      "Sentence style",
      "Avoid",
      "Keep",
      "Text role",
      "Text-safe zone",
      "First eye target",
      "Center-impact decision",
      "Hero text zone",
      "Why this zone owns attention",
      "Layout contract",
      "Title size tier",
      "Readable hold",
      "Text transition",
      "Text transition device",
      "Kinetic relay",
      "Directional transition",
      "Transition midpoint frame",
      "Kinetic relay score note",
      "What changes if this motion is removed",
      "Choreography",
      "Motion bounds",
      "Attention target",
      "Transition midpoint snapshot",
      "Anti-PPT risk",
      "Hold-frame verdict",
      "Background stage",
      "Kinetic relay keyword chain",
      "Direction map",
      "Relay continuity rules",
      "Layout contracts",
    ],
    validators: ["layoutContract", "titleTier"],
  },
  {
    name: "Scene schema enforces layout, primitive, and snapshot contracts",
    file: "SCENE_SCHEMA.json",
    pattern: /"compiler_policy"[\s\S]*"llm_may_invent_svg_geometry": false[\s\S]*"requires_browser_text_measurement": true[\s\S]*"requires_snapshot_validation": true[\s\S]*"scenes"[\s\S]*"template_id"[\s\S]*"layout_contract"[\s\S]*"textRect"[\s\S]*"safeBottomY"[\s\S]*"primitive_chain"[\s\S]*"selection_reason"[\s\S]*"snapshot_tests"/,
  },
  {
    name: "Vector template library defines approved SVG scene systems",
    file: "VECTOR_TEMPLATES.json",
    pattern: /"templates"[\s\S]*"quote_card"[\s\S]*"data_point"[\s\S]*"comparison"[\s\S]*"allowed_primitives"[\s\S]*"rejection_tests"[\s\S]*"icon_and_decoration_rules"/,
  },
  {
    name: "Motion primitive library defines semantic GSAP/SVG vocabulary",
    file: "MOTION_PRIMITIVES.json",
    pattern: /"timeline_policy"[\s\S]*"master_timeline_required": true[\s\S]*"primitives"[\s\S]*"maskReveal"[\s\S]*"pathDraw"[\s\S]*"clipWipe"[\s\S]*"staggerText"[\s\S]*"numberCount"[\s\S]*"selection_rules"/,
  },
  {
    name: "GSAP choreography policy defines labels, plugins, and performance rules",
    file: "MOTION_PRIMITIVES.json",
    pattern: /"labels_required"[\s\S]*"hook"[\s\S]*"reveal"[\s\S]*"proof"[\s\S]*"cta"[\s\S]*"gsap_policy"[\s\S]*"prefer_autoAlpha_over_opacity": true[\s\S]*"plugin_policy"[\s\S]*"DrawSVGPlugin"[\s\S]*"MorphSVGPlugin"[\s\S]*"MotionPathPlugin"[\s\S]*"SplitText"[\s\S]*"CustomEase"[\s\S]*"splitTextReveal"[\s\S]*"drawSvgAccent"[\s\S]*"morphSymbol"[\s\S]*"motionPathHandoff"[\s\S]*"customEaseSignature"/,
  },
  {
    name: "Review report records validation, style gate, and next edit",
    file: "REVIEW_REPORT.md",
    pattern: /## Writing Standard[\s\S]*Sentence style:[\s\S]*Avoid:[\s\S]*Keep:[\s\S]*## Output[\s\S]*## Validation[\s\S]*first eye target[\s\S]*transition midpoints[\s\S]*layout overflow[\s\S]*kinetic typography[\s\S]*SVG \/ CSS3 motion structure[\s\S]*anti-PPT verdict[\s\S]*## Kinetic Relay Score[\s\S]*First-eye impact \/ 20[\s\S]*Relay continuity \/ 20[\s\S]*Total \/ 100[\s\S]*## Style Gate[\s\S]*Background image or pure-code exception is verified:[\s\S]*Layout contract matches the image and message shape:[\s\S]*TextRect, subjectRect, and safeBottomY are verified:[\s\S]*Mobile safe zones are respected:[\s\S]*Motion bounds preserve readability:[\s\S]*Motion has a clear attention target:[\s\S]*Text transitions define entry, lock, emphasis, exit, and bridge:[\s\S]*Kinetic relay keyword chain is visible when relevant:[\s\S]*Action objects participate in transitions when relevant:[\s\S]*Video would lose meaning if reduced to screenshots:[\s\S]*Hold-frame verdict passed for hero frames:[\s\S]*## No-Go Gates[\s\S]*Kinetic relay promos target 100 before final delivery:[\s\S]*Kinetic relay promos below 90 are blocked from final delivery:[\s\S]*Anti-PPT verdict:[\s\S]*## Layout Contract Revisions[\s\S]*## Recommended Next Edit[\s\S]*## Remaining Risks/,
    fields: [
      "Background image or pure-code exception is verified",
      "Sentence style",
      "Avoid",
      "Keep",
      "Background role supports meaning rather than decoration",
      "Layout contract matches the image and message shape",
      "TextRect, subjectRect, and safeBottomY are verified",
      "Text sits in a safe quiet zone",
      "Mobile safe zones are respected",
      "Motion bounds preserve readability",
      "Motion has a clear attention target",
      "Motion is not repeated template fade/translate",
      "Hook or amplified keyword owns the right attention zone",
      "Text transitions define entry, lock, emphasis, exit, and bridge",
      "Kinetic relay keyword chain is visible when relevant",
      "Action objects participate in transitions when relevant",
      "Direction map avoids repeated static card sequencing",
      "Transition midpoint frames are inspectable",
      "Fade is support only when kinetic relay mode is active",
      "CSS3 / SVG layers carry structure rather than decoration",
      "GSAP timeline uses labels and meaningful scene bridges",
      "Video would lose meaning if reduced to screenshots",
      "Important text settles before it must be read",
      "Hold-frame verdict passed for hero frames",
      "Kinetic relay promos target 100 before final delivery",
      "Kinetic relay promos below 90 are blocked from final delivery",
      "Adjacent kinetic beats have a visible or logical relay object",
      "Anti-PPT verdict",
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
  "center / upper-center / side / lower-safe / split",
  "mask / scan / split / compression / assembly / handoff / deliberate stillness",
  "pass / revise before delivery",
  "yes / no",
];

const layoutContractRules = [
  { name: "layout intent", pattern: /\b(?:cinematic|side-title|center symbol|symbol|product|claim|evidence|proof|cutaway|panel|kinetic|type|stage|split|sequence|beat)\b/i },
  { name: "standard ratio", pattern: /\b(?:9:16|21:9|16:10|16:9|4:3|3:2|1:1|none)\b/ },
  { name: "text axis", pattern: /\b(?:left|right|center|top|bottom-safe|split)\s+axis\b/i },
  { name: "textRect", pattern: /\btextRect\b/i },
  { name: "subjectRect", pattern: /\bsubjectRect\b/i },
  { name: "safeBottomY", pattern: /\bsafeBottomY\s*(?:<=|≤)?\s*\d+(?:%|px)?\b|safeBottomY\s*(?:<=|≤)\s*\d+%/i },
  { name: "title tier", pattern: /\btitle tier\s+(?:hero|large|main|reduced|compact)\b/i },
  { name: "motion bounds", pattern: /\bmotion\b[\s\S]*\b(?:bounds|inside|safe|textRect|zone)\b/i },
];

const titleTierPattern = /\b(?:hero|large|main|reduced|compact)\b/i;
const layoutStrategyPattern = /\b(?:cinematic|side-title|center|symbol|product|claim|evidence|proof|cutaway|panel|kinetic|type|stage|split|sequence|beat|text|subject|quiet|safe|mobile|crop)\b/i;
const scoreTargetPattern = /\b100\s*(?:\/\s*100|points?|分)?\b/i;

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

  if (validators.includes("scoreTarget")) {
    const targets = [...fieldValues(text, "Target kinetic relay score"), ...fieldValues(text, "Kinetic relay score target")];
    if (targets.length === 0) {
      errors.push("Kinetic relay score target missing.");
    } else {
      for (const [index, target] of targets.entries()) {
        if (!scoreTargetPattern.test(target)) errors.push(`Kinetic relay score target ${index + 1} must target 100.`);
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
