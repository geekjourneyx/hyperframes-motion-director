#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.cwd(), process.argv[2] || ".");

const checks = [
  {
    name: "Approval brief exists before production",
    file: "BRIEF_DESIGN_PROPOSAL.md",
    pattern: /## Writing Standard[\s\S]*Sentence style:[\s\S]*Avoid:[\s\S]*Keep:[\s\S]*## Essence[\s\S]*## Source Text To Visual System[\s\S]*Source phrases to visualize:[\s\S]*Text-to-component map:[\s\S]*Big text box replacement plan:[\s\S]*Generic visual rejection list:[\s\S]*## Format[\s\S]*## Visual Direction[\s\S]*First eye target:[\s\S]*Center-impact text decision:[\s\S]*## Image Generation Decision[\s\S]*Asset manifest path:[\s\S]*Distinct visual worlds:[\s\S]*Background count decision:[\s\S]*Background count reason:[\s\S]*Background inventory \/ scene ownership:[\s\S]*Movable foreground inventory:[\s\S]*Component count decision:[\s\S]*Component count reason:[\s\S]*Component sheet strategy:[\s\S]*Component sheet count reason:[\s\S]*Dark \/ light cutout proof plan:[\s\S]*Asset plan revision policy:[\s\S]*## Visual Object Plan[\s\S]*Support asset decision:[\s\S]*Support asset roles:[\s\S]*Support asset motion purpose:[\s\S]*Support asset deletion trigger:[\s\S]*## Mandatory Visual Component Library[\s\S]*Component coverage decision:[\s\S]*Component inventory:[\s\S]*Generated visual component sheet plan:[\s\S]*Component sheet crop \/ isolation plan:[\s\S]*Transparent cutout requirement:[\s\S]*Dark \/ light contact sheet requirement:[\s\S]*Per-component source phrase \/ role \/ proof \/ motion \/ state-change map:[\s\S]*Big-text-box rejection rule:[\s\S]*Static-component rejection rule:[\s\S]*## Kinetic Text Relay Plan[\s\S]*Keyword chain:[\s\S]*Action object chain:[\s\S]*Direction map:[\s\S]*Relay object \/ handoff logic:[\s\S]*Target kinetic relay score:[\s\S]*## Typography And Layout[\s\S]*Title size tier:[\s\S]*Text spacing:[\s\S]*Text-over-image contrast treatment:[\s\S]*Mobile safe-zone handling:[\s\S]*Regenerate \/ recrop trigger:[\s\S]*## Motion Plan[\s\S]*Background motion:[\s\S]*Text transition style:[\s\S]*Kinetic typography plan:[\s\S]*CSS3 \/ SVG structure:[\s\S]*GSAP choreography:[\s\S]*Signature motion moment:[\s\S]*Motion budget:[\s\S]*Motion bounds:[\s\S]*Support asset choreography:[\s\S]*Anti-PPT prevention:[\s\S]*## Confirmation Needed/,
    fields: [
      "Layout strategy",
      "Sentence style",
      "Avoid",
      "Keep",
      "Background source",
      "Visual asset floor",
      "Local background / screenshot / generated proof assets planned",
      "Pure-code exception reason, if any",
      "Why pure-code is stronger than screenshots or generated plates, if claimed",
      "Focal subject position",
      "Quiet text zone",
      "First eye target",
      "Center-impact text decision",
      "First 0-2s scroll-stop event",
      "Biggest word or object",
      "Source phrases to visualize",
      "Concrete nouns / entities",
      "Process verbs / actions",
      "Emotional tension to visualize",
      "Numbers / modules / metrics to visualize",
      "Core visual motif",
      "Component families",
      "Text-to-component map",
      "Big text box replacement plan",
      "Generic visual rejection list",
      "Reference source type",
      "Exact source inspected",
      "Exact source reviewed",
      "Observed visual grammar",
      "Narrative boundary",
      "Forbidden style drift or generic substitutions",
      "Support asset decision",
      "Support asset roles",
      "Support asset style lock",
      "Support asset motion purpose",
      "Support asset deletion trigger",
      "Asset manifest path",
      "Distinct visual worlds",
      "Background count decision",
      "Background count reason",
      "Background inventory / scene ownership",
      "Movable foreground inventory",
      "Component coverage decision",
      "Component inventory",
      "Component count decision",
      "Component count reason",
      "Generated visual component sheet plan",
      "Component sheet inventory by sheet",
      "Component sheet source phrases",
      "Component sheet style system",
      "Component sheet crop / isolation plan",
      "Component sheet count reason",
      "Separate hero object decision",
      "Transparent cutout requirement",
      "Dark / light contact sheet requirement",
      "Per-component source phrase / role / proof / motion / state-change map",
      "Asset plan revision policy",
      "Big-text-box rejection rule",
      "Static-component rejection rule",
      "Narrative anchor components",
      "Product proof components",
      "Transition carrier components",
      "Combination test 1",
      "Combination test 2",
      "Repeated silhouette or same-card rejection",
      "Independent fade-in rejection",
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
      "Support asset choreography",
      "Anti-PPT prevention",
    ],
    validators: ["layoutStrategy", "titleTier", "scoreTarget"],
  },
  {
    name: "Design system locks house style",
    file: "DESIGN.md",
    pattern: /## Writing Standard[\s\S]*Sentence style:[\s\S]*Avoid:[\s\S]*Keep:[\s\S]*## Overview[\s\S]*## Metaphor System[\s\S]*## Source-Driven Visual System[\s\S]*Source phrases:[\s\S]*Text-to-component map:[\s\S]*Big text box replacement rule:[\s\S]*Generic visual rejection list:[\s\S]*#050505[\s\S]*warm gold[\s\S]*## Typography[\s\S]*## Layout[\s\S]*First eye target:[\s\S]*Center-impact policy:[\s\S]*Lower-safe policy:[\s\S]*## Background Text Layout System[\s\S]*Default layout strategy:[\s\S]*Allowed layout contract variants:[\s\S]*Title size tier:[\s\S]*Text rectangle \/ subject rectangle:[\s\S]*Title \/ support \/ CTA spacing:[\s\S]*Mobile safe-zone handling:[\s\S]*Motion bounds:[\s\S]*## Background Image System[\s\S]*Asset manifest path:[\s\S]*Distinct visual worlds:[\s\S]*Background count decision:[\s\S]*Background count reason:[\s\S]*Background inventory \/ scene ownership:[\s\S]*## Text Over Image[\s\S]*Minimum contrast rule:[\s\S]*## Components[\s\S]*Product visual component coverage:[\s\S]*Component inventory:[\s\S]*Component count decision:[\s\S]*Component count reason:[\s\S]*Component sheet strategy:[\s\S]*Component sheet count reason:[\s\S]*Transparent cutout rule:[\s\S]*Dark \/ light contact sheet rule:[\s\S]*Big-text-box rejection tests:[\s\S]*Static-component rejection tests:[\s\S]*## Product Proof And Asset Library[\s\S]*## Support Asset System[\s\S]*Support asset decision:[\s\S]*Asset roles:[\s\S]*Motion purpose per asset:[\s\S]*Deletion trigger:[\s\S]*## Kinetic Text Relay System[\s\S]*Keyword chain:[\s\S]*Action object chain:[\s\S]*Direction vocabulary:[\s\S]*Relay \/ handoff rules:[\s\S]*Kinetic relay score target:[\s\S]*## Motion Personality[\s\S]*Motion budget:[\s\S]*## Motion Craft System[\s\S]*Anti-PPT diagnosis:[\s\S]*Kinetic typography language:[\s\S]*Text transition vocabulary:[\s\S]*CSS3 layers:[\s\S]*SVG layers:[\s\S]*GSAP master timeline structure:[\s\S]*Scene transition bridges:[\s\S]*## Image Generation Plan[\s\S]*Background inventory \/ local paths:[\s\S]*Component inventory \/ local paths:[\s\S]*Dark \/ light contact sheet paths:/,
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
      "Visual asset floor for this video",
      "Local background / screenshot / generated proof assets",
      "Empty `assets/images` allowed",
      "Pure-code exception reason, if any",
      "Local asset path",
      "Quiet text zone",
      "Title placement",
      "Minimum contrast rule",
      "Source phrases",
      "Concrete nouns / entities",
      "Process verbs / actions",
      "Emotional tension",
      "Numbers / modules / metrics",
      "Core visual motif",
      "Component families",
      "Text-to-component map",
      "Big text box replacement rule",
      "Generic visual rejection list",
      "Source recognition test",
      "Reference source type",
      "Exact source inspected",
      "Exact source reviewed",
      "Observed visual grammar",
      "Narrative boundary",
      "Forbidden drift",
      "Asset manifest path",
      "Distinct visual worlds",
      "Background count decision",
      "Background count reason",
      "Background inventory / scene ownership",
      "Product visual component coverage",
      "Source phrase required per component",
      "Component inventory",
      "Component count decision",
      "Component count reason",
      "Component sheet strategy",
      "Component sheet count reason",
      "Component sheet source / crop plan",
      "Component sheet source phrases",
      "Component sheet style system",
      "Component state-change rule",
      "Separate hero object decision",
      "Transparent cutout rule",
      "Dark / light contact sheet rule",
      "Big-text-box rejection tests",
      "Support asset decision",
      "Asset roles",
      "Shared style lock",
      "Safe-zone rules",
      "Motion purpose per asset",
      "Deletion trigger",
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
      "Static-component rejection tests",
      "Narrative anchor components",
      "Product proof components",
      "Transition carrier components",
      "Combination test 1",
      "Combination test 2",
      "Composite owner groups",
      "Shared transform / opacity / clip / occlusion rule",
      "Transparent assets requiring visible alpha bounds",
      "Narrow text containers requiring exported font measurement",
      "Browser / final-MP4 conflict policy",
    ],
    validators: ["layoutStrategy", "titleTier", "scoreTarget"],
  },
  {
    name: "Storyboard includes hero frames, metaphor roles, and visual asset breakdown",
    file: "STORYBOARD.md",
    pattern: /## Writing Standard[\s\S]*Sentence style:[\s\S]*Avoid:[\s\S]*Keep:[\s\S]*hero frame[\s\S]*Text role:[\s\S]*First eye target:[\s\S]*Center-impact decision:[\s\S]*Hero text zone:[\s\S]*Why this zone owns attention:[\s\S]*Metaphor role[\s\S]*Source phrase:[\s\S]*Visual translation:[\s\S]*Component family:[\s\S]*Big text box replacement:[\s\S]*Background \/ main visual state:[\s\S]*Primary visual object:[\s\S]*Functional visual marks:[\s\S]*Support assets active:[\s\S]*Support asset motion purpose:[\s\S]*Layout contract:[\s\S]*Title size tier:[\s\S]*Readable hold:[\s\S]*Text transition:[\s\S]*Text transition device:[\s\S]*Kinetic relay:[\s\S]*Directional transition:[\s\S]*Transition midpoint frame:[\s\S]*Kinetic relay score note:[\s\S]*What changes if this motion is removed:[\s\S]*Choreography:[\s\S]*Motion bounds:[\s\S]*Transition midpoint snapshot:[\s\S]*Anti-PPT risk:[\s\S]*Hold-frame verdict:[\s\S]*Visual Asset Breakdown[\s\S]*Asset manifest path:[\s\S]*Distinct visual worlds \/ source beats:[\s\S]*Background count decision \/ reason:[\s\S]*Generated background inventory \/ roles \/ sizes \/ layout contracts \/ local paths:[\s\S]*Component inventory \/ count decision \/ reason:[\s\S]*Component sheet strategy \/ count reason:[\s\S]*Separate hero object generations:[\s\S]*Component source phrase mapping:[\s\S]*Component state-change actions:[\s\S]*Component snapshot timestamps:[\s\S]*Component sheet source \/ crop boxes \/ accepted local paths:[\s\S]*Transparent outer-edge \/ matte-spill verdict:[\s\S]*Dark \/ light contact sheet paths:[\s\S]*Asset plan revisions after approval:[\s\S]*Static components rejected:[\s\S]*Support asset plan:[\s\S]*Support asset roles \/ source \/ local paths:[\s\S]*Kinetic relay keyword chain:[\s\S]*Direction map:[\s\S]*Relay continuity rules:[\s\S]*Background stage:[\s\S]*Layout contracts:[\s\S]*Snapshot Plan[\s\S]*Expected dominant visual/i,
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
      "Source phrase",
      "Visual translation",
      "Component family",
      "Big text box replacement",
      "Support assets active",
      "Support asset motion purpose",
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
      "Visual asset floor verdict",
      "Pure-code exception approved by user",
      "Why snapshots will not reduce to black background plus title/cards",
      "Source phrases visualized",
      "Text-to-component map",
      "Big text boxes replaced by",
      "Generic visual assets rejected",
      "Asset manifest path",
      "Distinct visual worlds / source beats",
      "Background count decision / reason",
      "Generated background inventory / roles / sizes / layout contracts / local paths",
      "Component inventory / count decision / reason",
      "Component sheet strategy / count reason",
      "Separate hero object generations",
      "Component source phrase mapping",
      "Component state-change actions",
      "Component snapshot timestamps",
      "Component sheet source / crop boxes / accepted local paths",
      "Component sheet style system",
      "Transparent outer-edge / matte-spill verdict",
      "Dark / light contact sheet paths",
      "Asset plan revisions after approval",
      "Static components rejected",
      "Support asset plan",
      "Support asset roles / source / local paths",
      "Support asset safe zones",
      "Support asset deletion triggers",
      "Kinetic relay keyword chain",
      "Direction map",
      "Relay continuity rules",
      "Layout contracts",
      "Exact style source inspected",
      "Observed reference grammar",
      "Narrative boundary",
      "Forbidden style drift",
      "Narrative anchor components",
      "Product proof components",
      "Transition carrier components",
      "Combination test 1 / scene / timestamp / deletion test",
      "Combination test 2 / scene / timestamp / deletion test",
      "Composite owner groups",
      "Transparent assets using visible alpha bounds",
      "Narrow text containers using exported font measurement",
    ],
    validators: ["layoutContract", "titleTier"],
  },
  {
    name: "Scene schema enforces layout, primitive, and snapshot contracts",
    file: "SCENE_SCHEMA.json",
    pattern: /"compiler_policy"[\s\S]*"llm_may_invent_svg_geometry": false[\s\S]*"requires_browser_text_measurement": true[\s\S]*"requires_snapshot_validation": true[\s\S]*"scenes"[\s\S]*"template_id"[\s\S]*"layout_contract"[\s\S]*"textRect"[\s\S]*"safeBottomY"[\s\S]*"support_assets"[\s\S]*"deletion_trigger"[\s\S]*"primitive_chain"[\s\S]*"selection_reason"[\s\S]*"snapshot_tests"/,
  },
  {
    name: "Vector template library defines approved SVG scene systems",
    file: "VECTOR_TEMPLATES.json",
    pattern: /"templates"[\s\S]*"quote_card"[\s\S]*"data_point"[\s\S]*"comparison"[\s\S]*"allowed_primitives"[\s\S]*"rejection_tests"[\s\S]*"icon_and_decoration_rules"[\s\S]*"support_asset_policy"[\s\S]*"required_contract_fields"[\s\S]*"deletion_trigger"/,
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
    pattern: /## Writing Standard[\s\S]*Sentence style:[\s\S]*Avoid:[\s\S]*Keep:[\s\S]*## Output[\s\S]*## Validation[\s\S]*asset count analysis[\s\S]*asset manifest[\s\S]*distinct visual world coverage[\s\S]*component inventory coverage[\s\S]*component sheet crop \/ isolation[\s\S]*transparent component edges[\s\S]*dark \/ light cutout contact sheets[\s\S]*anti-PPT verdict[\s\S]*## Kinetic Relay Score[\s\S]*First-eye impact \/ 20[\s\S]*Relay continuity \/ 20[\s\S]*Total \/ 100[\s\S]*## Style Gate[\s\S]*Product visual component coverage is complete:[\s\S]*Asset manifest records the approved analysis and accepted local paths:[\s\S]*Background count is derived from distinct visual worlds:[\s\S]*Component count is derived from the movable foreground inventory:[\s\S]*Component sheet count is based on isolation space and usable resolution:[\s\S]*Separate hero objects are generated when sheet resolution is insufficient:[\s\S]*Generated component sheets were cropped into named local assets before use:[\s\S]*Transparent cutouts have real alpha and fully transparent outer edges:[\s\S]*Declared matte color is removed from visible pixels:[\s\S]*Dark and light cutout contact sheets were reviewed:[\s\S]*Source component sheets are not referenced by compositions:[\s\S]*## No-Go Gates[\s\S]*Fixed asset targets such as 4 backgrounds or 12 components are rejected unless the source analysis independently produces them:[\s\S]*Every declared visual world has an accepted independent background:[\s\S]*Every accepted movable foreground item has a named transparent local asset:[\s\S]*Source component sheets are never used directly in compositions:[\s\S]*Anti-PPT verdict:[\s\S]*## Layout Contract Revisions[\s\S]*## User Feedback Regression Review[\s\S]*## Recommended Next Edit[\s\S]*## Remaining Risks/,
    fields: [
      "Background image or pure-code exception is verified",
      "Visual asset floor is met for non-typography videos",
      "Local background / screenshot / generated proof assets exist when needed",
      "Empty `assets/images` is blocked unless pure-code exception is explicitly approved",
      "Snapshots show more than black background plus title/cards",
      "Sentence style",
      "Avoid",
      "Keep",
      "Background role supports meaning rather than decoration",
      "Source phrases are translated into visuals",
      "Visual assets are derived from source nouns, verbs, numbers, or claims",
      "Text-to-component map is documented",
      "Big text boxes were replaced by objects, chips, proof surfaces, kinetic words, or short captions",
      "Generic office / AI / productivity / dashboard props were rejected unless source-specific",
      "Visual component families share one motif and style system",
      "Exact style source was inspected instead of inferred from a label",
      "Observed visual grammar is recorded",
      "Style controls rendering language without replacing product narrative",
      "Forbidden style drift is recorded",
      "Product visual component coverage is complete",
      "Asset manifest records the approved analysis and accepted local paths",
      "Background count is derived from distinct visual worlds",
      "Component count is derived from the movable foreground inventory",
      "Narrative anchor, product proof, and transition carrier roles are covered",
      "At least two distinct component combinations are proven for premium multi-scene work",
      "Component sheet count is based on isolation space and usable resolution",
      "Separate hero objects are generated when sheet resolution is insufficient",
      "Each major product component performs a state-change action",
      "Generated component sheets were cropped into named local assets before use",
      "Transparent cutouts have real alpha and fully transparent outer edges",
      "Declared matte color is removed from visible pixels",
      "Dark and light cutout contact sheets were reviewed",
      "Source component sheets are not referenced by compositions",
      "Component snapshot timestamps prove visibility",
      "Support asset decision is documented",
      "Support assets share style lock with the background",
      "Support assets have role, source, motion purpose, safe zones, and deletion triggers",
      "Unneeded support assets were omitted or removed",
      "Layout contract matches the image and message shape",
      "First-frame dominant visual mass is optically centered or intentionally offset",
      "Hero-frame product cards, screenshots, symbols, and CTA clear edge-safe bounds",
      "Rendered MP4 stills match the browser snapshot layout",
      "Composite children share transform, opacity, clipping, and occlusion ownership",
      "Transparent asset placement uses visible alpha bounds where canvas padding changes alignment",
      "Entry, hold, and exit frames were extracted from the final MP4",
      "Exported font fit passes inside narrow visible containers",
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
      "First-frame or hero-frame dominant visual object is not accidentally off-center or clipped",
      "Non-typography videos do not ship with placeholder-only image assets",
      "Pure-code exception is user-approved and stronger than using screenshots or generated plates",
      "Product promo visuals are source-specific and not an attractive generic asset pack",
      "Hero frames would reveal the source topic without reading paragraph boxes",
      "Component sheets map every accepted item to a source phrase and component family",
      "Product promo components are visible, product-specific, and action-bearing",
      "Product promo component sheets are not decorative collages",
      "Fixed asset targets such as 4 backgrounds or 12 components are rejected unless the source analysis independently produces them",
      "Asset libraries with many files but only one motion role are rejected",
      "Reusing the same component set does not count as a second combination",
      "Named style labels never substitute for inspecting the exact reference source",
      "Style mechanisms do not replace the product or source story",
      "Browser-only layout evidence does not close a rendered-frame defect",
      "Composite child layers never cross their owner's external occlusion boundary",
      "Every declared visual world has an accepted independent background",
      "Every accepted movable foreground item has a named transparent local asset",
      "Source component sheets are never used directly in compositions",
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
  /Visual asset floor:\s*required \/ not required \/ typography-only user-approved exception/m,
  /Component sheet strategy:\s*one sheet \/ multiple sheets \/ mixed with separate hero objects \/ user-approved pipeline exception/m,
  /Generated visual component sheet plan:\s*one \/ multiple \/ user-approved pipeline exception/m,
  /Pure-code exception approved by user:\s*yes \/ no \/ not applicable/m,
  /Background role:\s*stage \/ symbol \/ texture \/ anchor \/ transition plate/m,
  /Support asset decision:\s*none \/ generated \/ supplied \/ code-generated \/ mixed/m,
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
  "none / generated / supplied / code-generated / mixed",
  "symbol / texture / anchor / transition plate / semantic glyph / motion accent / product fragment",
  "reveal / transition / emphasis / hold",
  "center / upper-center / side / lower-safe / split",
  "mask / scan / split / compression / assembly / handoff / deliberate stillness",
  "pass / revise before delivery",
  "yes / no",
  "yes / no / not applicable",
  "required / not required / typography-only user-approved exception",
      "one sheet / multiple sheets / mixed with separate hero objects / user-approved pipeline exception",
      "one / multiple / user-approved pipeline exception",
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
