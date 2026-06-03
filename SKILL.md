---
name: video-ad-director
description: "Direct and produce polished cinematic marketing videos, article-to-video promos, product launch ads, YouTube promos, keynote reveal films, kinetic typography sequences, and music-synced motion graphics using HyperFrames. Use this skill whenever the user wants a high-quality AI video ad or promo, especially requests involving HyperFrames, HTML/CSS/GSAP video, big animated typography, article/theme-to-video work, product promos, launch films, music beat sync, transitions, short-form ads, or turning a landing page/product story into a rendered video. This skill enforces a strict two-phase workflow: first a brief/design proposal for user confirmation, then a black-background cinematic metaphor production with design spec, storyboard, optional image generation, optional timing/motion maps, validation, snapshots, review report, and deterministic renders."
---

# Video Ad Director

Use this skill to behave as an AI video director, motion designer, and production QA lead for HyperFrames advertising work. The goal is to first produce a concise brief/design proposal for approval, then produce the video only after the user confirms the direction.

HyperFrames handles HTML/CSS/JS rendering. This skill handles the production discipline around it.

## Core Principle

Work from the final viewing experience backward:

1. What should the viewer remember?
2. What is the underlying metaphor, not the surface content?
3. Which background image or visual stage gives the frame depth and meaning?
4. Which frame proves the visual direction is strong?
5. Which beat carries the hook, reveal, proof, and CTA?
6. Which motion choices guide attention through those beats?
7. Which validation proves the video will render deterministically?

Do not begin by writing animation code. First make the intended still frames and timing legible.

## House Style

Default to one strict style unless the user explicitly overrides it:

- Deep black background `#050505`.
- Minimal cinematic lighting, high contrast, large negative space, low brightness.
- White, gray, and warm gold only. Use warm gold as a restrained accent, not a wash.
- Premium magazine-cover composition: one dominant symbol or phrase, not a cluster of explanatory graphics.
- Subtle paper grain, shallow depth of field, volume haze, thin rim light, local metallic highlights.
- Text, image, composition, and color must express one point together.
- Default to a generated or supplied background image stage for new videos. It must create depth, metaphor, or product context; it must not be decorative wallpaper.

Forbidden by default:

- Ordinary illustration, ecommerce banner composition, icon piles, generic tech dashboards, neon cyberpunk, multicolor palettes, gradient clutter, decorative particles, explain-the-concept diagrams, and busy collage.
- Drawing the article surface. Always draw the essence metaphor.

## Background And Motion Rule

For new video work, plan background imagery by default. Do not generate it during Phase 1. After confirmation, use Codex Image Gen for needed project-bound bitmap assets unless the user supplied strong assets or the confirmed direction is intentionally pure kinetic typography.

Treat each frame as three coordinated layers:

1. Background image as stage: atmosphere, depth, light, metaphor, or product context.
2. Typography as message: readable hierarchy, fixed safe zones, controlled line counts, no accidental overlap with busy image regions.
3. Motion as attention direction: one primary motion idea per scene, one optional support motion, and enough stillness after each important reveal.

Use `references/motion-background-system.md` for image counts, text-over-image layout, motion grammar, and review gates.

## Two-Phase Rule

Always split new video work into two phases:

### Phase 1: Brief / Design Proposal

Produce a compact proposal and stop for user confirmation. Do not generate images, create animation code, render video, or build a full HyperFrames composition before confirmation.

The proposal must include:

- Essence: core viewpoint, largest conflict, emotional center, amplified keyword, visual metaphor.
- Structure: center symbol / huge title / person anchor / huge number.
- Format: platform, aspect ratio, pixel size, duration, FPS, safe margins.
- Image decision: whether generated bitmap images are needed, what each image should be, and what must stay in HyperFrames.
- Background plan: image role, subject position, quiet text zone, crop risks, and whether Codex Image Gen will be used after confirmation.
- Typography: title/support/CTA scale, line-height, letter-spacing, maximum lines, overflow handling.
- Layout: dominant visual mass, grid/alignment, crop-safe zones, mobile overlay risks.
- Motion: main reveal, background motion, transition style, hold times, easing, audio hit plan, and what must remain still.
- Risk gates: what could make it look cheap, unreadable, noisy, or off-style.

End Phase 1 with a clear confirmation request. Production starts only after the user confirms, revises, or explicitly says to proceed.

### Phase 2: Production

After confirmation, create or update the production artifacts, generate needed images, implement HyperFrames composition files, validate, snapshot, render, and write review outputs as the task requires.

## When To Use

Use this skill for:

- HyperFrames video compositions.
- Product launch videos, YouTube ads, social ads, or website-to-video projects.
- Kinetic typography, large animated text, typewriter sequences, restrained logo lockups, and transition-heavy promo videos.
- HTML/CSS/GSAP/Lottie/Three.js motion graphics intended to render as MP4.
- Requests like "cinematic metaphor promo", "article-to-video", "cool product ad", "make this landing page into a video", "music synced", "big text animation", or "YouTube promo".
- Editing an existing HyperFrames ad where the user wants targeted changes without breaking the rest of the video.

Do not use this skill for simple video copywriting without production, ordinary landing pages, static posters, or editing raw MP4 footage without code.

## Operating Modes

### New Video

Phase 1 creates or updates:

1. `BRIEF_DESIGN_PROPOSAL.md`

After user confirmation, create or update:

1. `DESIGN.md`
2. `STORYBOARD.md`
3. Background, symbol, texture, product, or anchor image assets when the confirmed direction needs bitmap source material.
4. HyperFrames composition files.
5. `REVIEW_REPORT.md`
6. `REVIEW_PACK.md` for handoff.

Use `BEAT_MAP.json` only when music, voiceover, or exact timing matters. Use `MOTION_MAP.json` when GSAP choreography, background parallax, focus pulls, masks, or scene transitions are complex enough to need a separate map.

Use the templates in `templates/`.

### Existing Video Edit

First read the actual project files. Treat the existing composition as the current spec. Do not invent colors, fonts, selectors, timings, or easing values.

Map the user's request to the smallest artifact that should change:

- Copy or CTA issue: update `STORYBOARD.md` and the relevant text nodes.
- Visual style issue: update `DESIGN.md` and relevant CSS variables.
- Scene composition issue: update the scene HTML/CSS.
- Timing or rhythm issue: update `STORYBOARD.md`, optional `BEAT_MAP.json`, and timeline positions.
- Motion issue: update only the relevant GSAP timeline.
- Stability issue: update code and rerun validation.

After editing, report exactly what changed and which validation steps ran.

## Required Workflow

### 1. Intake

Extract or infer:

- Source article, topic, or product theme.
- Goal and CTA.
- Audience.
- Platform and aspect ratio.
- Duration.
- Product or offer.
- Required proof points.
- Tone and style.
- Available assets.
- Hard constraints.

If details are missing, make conservative assumptions and write them into the brief. Do not block unless the missing item prevents production.

Read `references/workflow.md` when planning a full video.

### 1.5. Essence Extraction

Before design, extract:

- Core viewpoint.
- Largest conflict.
- Emotional center.
- The keyword that deserves visual amplification.
- One visual metaphor that can carry the whole promo.

Translate the abstract idea into a restrained symbol. Examples: AI replacement becomes an erased human silhouette; anxiety becomes a thread about to snap; time becomes a countdown in darkness; growth becomes light inside a crack; information overload becomes data fragments pulled into a black hole; long-termism becomes the only distant lamp; platform migration becomes a black obelisk or data tower; automation becomes documents entering a silent machine.

### 2. Approval Brief

Create `BRIEF_DESIGN_PROPOSAL.md` from `templates/BRIEF_DESIGN_PROPOSAL.template.md` or present the same structure in the response.

Keep it short and decisive. It is a production contract, not a brainstorm. Stop after this proposal and ask for confirmation.

### 3. Design System

Create `DESIGN.md` from `templates/DESIGN.template.md`.

The design system must specify typography, color, spacing, density, metaphor symbol, background-image system, generated-image plan, text-over-image rules, and motion personality. This prevents downstream steps from improvising a new visual language.

Read `references/visual-standard.md` before judging visual quality, typography, layout, or motion.
Read `references/motion-background-system.md` before deciding image count, background roles, animation grammar, or text-over-image treatment.

### 4. Storyboard And Copy

Create `STORYBOARD.md` from `templates/STORYBOARD.template.md`.

Default ad arc:

```text
Hook -> Tension -> Metaphor Reveal -> Proof -> CTA
```

For a 10 second no-voiceover kinetic typography ad, keep text sparse. One idea per beat is usually enough.

Choose the structure from the material:

- Center symbol: trends, insight, AI, platform, philosophy.
- Huge title: conflict, suspense, emotion, viewpoint.
- Person anchor: tutorial, interview, personal brand, methodology.
- Huge number: growth, milestone, data shock.

Every beat needs:

- Timing.
- Screen text or visual action.
- Hero frame timestamp.
- Layout and visual hierarchy.
- Background image state and text-safe zone.
- Motion direction.
- Attention target and stillness/hold requirement.
- Transition out.
- Audio or rhythm notes when relevant.
- Quality note.
- Metaphor role: what part of the abstract idea this frame carries.

Read `references/audio-sync.md` when music, sound design, voiceover, beat hits, or captions matter.

### 5. Visual Asset Plan

If the confirmed proposal calls for bitmap assets, generate or source them before HyperFrames implementation. For new videos, default to at least one background image stage unless the brief explicitly justifies a pure-code or supplied-asset approach:

- Generate only the images needed for the background stage, center symbol, texture, or product/person/object anchor.
- Give each image one role: stage, symbol, texture, anchor, or transition plate.
- Specify quiet text zones, focal subject position, crop-safe regions, and forbidden content before generation.
- Keep each generated image sparse enough to compose in HyperFrames.
- Avoid baked-in explanatory text unless exact title text is required.
- Save project-bound generated images into the project asset folders before referencing them.

Use Codex Image Gen by default for needed bitmap source images after confirmation. HyperFrames owns typography, timing, compositing, masks, parallax, focus pulls, and motion.

### 6. Layout Before Animation

Build static hero frames first. A frame should already work as a poster before motion is added.

For each scene, verify:

- Main message is readable at the target platform size.
- Background image has a clear role and does not fight the text.
- Text sits in a designed quiet zone, not on high-frequency detail.
- Text does not overlap or leave safe margins.
- Text containers have max width, max lines, and overflow behavior.
- Long words, Chinese/English mixed text, and CTA labels cannot escape their boxes.
- Font sizes are fixed per breakpoint; do not scale text with viewport width.
- Hierarchy is clear.
- The scene has one dominant idea.
- The scene has one dominant visual mass and no unowned decoration.
- CTA or brand lockup is not visually weak.
- The metaphor is understandable without icon labels.
- The frame obeys the house style: black, sparse, cinematic, white/gray/warm gold.

Only add GSAP or other motion after layout works.

### 7. Motion

Read `references/visual-standard.md` and `references/motion-background-system.md` before adding animation.

Use motion to clarify sequence and emphasis. Avoid applying the same y-plus-opacity entrance to every element. Give major text enough hold time to be read.

Before animating each scene, answer:

- What is the attention target?
- Which background, symbol, text, or product layer moves first?
- Which elements must remain still so the viewer can read?
- Where is the stillness after the reveal?
- How does this motion change meaning rather than add noise?

For GSAP in HyperFrames:

- Use a paused timeline.
- Register timelines for HyperFrames control.
- Use explicit position parameters for timing.
- Keep timeline construction synchronous and deterministic.

Read `references/hyperframes-stability.md` before rendering.

Create optional `MOTION_MAP.json` from `templates/MOTION_MAP.template.json` only when selectors, labels, timing, easing, and transitions would otherwise become hard to review.

### 8. Validation

Run the strongest available checks for the project. Prefer:

```bash
npx hyperframes doctor
npx hyperframes lint
npx hyperframes validate
npx hyperframes inspect
npx hyperframes snapshot <composition> --at <times>
```

If the project or installed HyperFrames version uses different command syntax, inspect the local package docs or CLI help and adapt.

Validation is not optional for final delivery. If a command cannot run because dependencies are missing, state that clearly and still perform any available static checks.

For local deterministic checks, use bundled scripts where helpful:

```bash
node scripts/check_assets.mjs <project-dir>
node scripts/score_artifacts.mjs <project-dir>
```

### 9. Render

Use a draft render for review and a higher-quality or Docker render for final delivery when available:

```bash
npx hyperframes render --quality draft --output renders/draft.mp4
npx hyperframes render --quality standard --output renders/review.mp4
npx hyperframes render --docker --quality high --output renders/final.mp4
```

Adjust flags to match the installed CLI.

### 10. Review Report

Create `REVIEW_REPORT.md` from `templates/REVIEW_REPORT.template.md`.

The report should include:

- Output files.
- Validation status.
- Snapshot timestamps.
- Watch notes by time range.
- Issues.
- Recommended next edit.

Create `REVIEW_PACK.md` with `scripts/build_review_pack.mjs <project-dir>` when outputs, snapshots, and reports exist.

## Quality Gates

Before claiming the video is ready:

- New video work received user confirmation after `BRIEF_DESIGN_PROPOSAL.md` before production began.
- The artifact chain exists or the skipped artifacts are explained.
- If the task asked to build a video, a scaffold or composition source exists, not only prose.
- Static hero frames are coherent before animation.
- Text fits inside safe margins on the target aspect ratio.
- Text overflow, max lines, responsive layout, and crop-safe areas are explicitly handled.
- At least one meaningful transition connects scenes in a multi-scene video.
- Important copy has enough hold time to read.
- Background imagery exists by default for new videos or the pure-code/supplied-asset exception is explained.
- Each generated image has a role, quiet text zone, and local project path before it is referenced.
- Motion uses a clear attention target, a limited motion budget, and at least one still hold after important reveals.
- Typography avoids lazy defaults and documents type scale, line height, and hierarchy.
- The essence extraction exists and every visual choice supports it.
- The final visual language obeys the house style unless the user explicitly changed it.
- The video avoids forbidden generic styles: noisy collage, ecommerce banner, icon pile, neon tech clutter, and multicolor effects.
- The composition uses deterministic timing.
- HyperFrames validation or the best available substitute has run.
- Snapshots at hero frames have been captured or the blocker is reported.
- A review pack exists or the missing render/snapshot blocker is reported.
- The final answer names outputs and remaining risks.

## Hard Stability Rules

Do not use:

- Wall-clock animation state such as `Date.now()` for render-critical motion.
- Unseeded `Math.random()` for render-critical visuals.
- `setTimeout`, `setInterval`, or `requestAnimationFrame` as the source of truth for main animation timing.
- Asynchronous construction of core timelines.
- Render-time network requests for required assets.
- Manual `video.play()`, `video.pause()`, or uncontrolled media time changes.
- Infinite animation repeats in a render timeline.

Use seeded randomness, fixed duration, fixed fps, fixed dimensions, local assets, and explicit timeline positions.

## References

- Read `references/workflow.md` for the full production workflow.
- Read `references/visual-standard.md` when judging style, typography, layout, and motion.
- Read `references/audio-sync.md` when timing to music, voiceover, or captions.
- Read `references/hyperframes-stability.md` before implementing or debugging render behavior.

## Templates

Use the templates in `templates/` for production artifacts:

- `BRIEF_DESIGN_PROPOSAL.template.md`
- `DESIGN.template.md`
- `STORYBOARD.template.md`
- `REVIEW_REPORT.template.md`

Optional templates:

- `BEAT_MAP.template.json`
- `MOTION_MAP.template.json`

## Local Skill Checks

This skill includes deterministic utility scripts:

```bash
node scripts/check-structure.mjs
node scripts/create_project.mjs <target-dir>
node scripts/check_assets.mjs <project-dir>
node scripts/score_artifacts.mjs <project-dir>
node scripts/build_review_pack.mjs <project-dir>
```

`check-structure.mjs` checks the skill package. The other scripts help with project scaffolding, local asset checks, artifact scoring, and review pack generation.
