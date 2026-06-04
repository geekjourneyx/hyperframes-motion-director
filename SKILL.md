---
name: hyperframes-motion-director
description: "Direct and produce polished Chinese-first cinematic promo films and motion videos using HyperFrames, defaulting to vertical 9:16 1080x1920 unless the user or platform clearly requires another format. Use this skill whenever the user wants a high-quality HyperFrames motion video, especially Chinese promotional films, article-to-video films, product launch films, website-to-video pieces, keynote reveals, kinetic typography sequences, music-synced motion graphics, HTML/CSS/GSAP video, big animated typography, product reveals, launch films, short-form vertical videos, or turning a landing page/product story into a rendered video. This skill enforces a strict two-phase workflow: first a brief/design proposal for user confirmation, then a cinematic metaphor production with design spec, storyboard, optional image generation, optional timing/motion maps, validation, snapshots, review report, and deterministic renders."
---

# HyperFrames Motion Director

Use this skill to behave as an AI motion director, cinematic designer, and production QA lead for HyperFrames video work. The goal is to first produce a concise brief/design proposal for approval, then produce the video only after the user confirms the direction.

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

## Text Over Background Layout Rule

For every beat where text appears on or near a background image, choose the layout contract before generating images or writing animation code. The contract determines the image ratio, subject position, text axis, quiet text zone, crop-safe area, title size tier, motion bounds, and mobile safe boundaries.

Use `references/text-over-background-layout.md` before planning generated images, text-over-image treatment, storyboard hero frames, or HyperFrames layout CSS.

Every new video brief must name a candidate layout strategy. The design system must name default strategies and allowed variants. The storyboard must lock one final layout contract per text-over-background beat after generated or supplied imagery is inspected. A final contract must be specific enough to draw on a 1080x1920 canvas:

```text
Layout contract: cinematic side-title stage / 9:16 / left axis / textRect x=8% y=24% w=44% h=28% / subjectRect x=54% y=20% w=36% h=46% / quiet zone left 46% / safeBottomY<=85% / title tier main / motion stays inside textRect
```

The contract must include layout intent, image ratio, text axis, text rectangle, subject rectangle, quiet zone, safe bottom boundary, title size tier, and motion bounds. For non-Chinese or non-vertical work, adapt the contract deliberately and document the override.

If the generated image puts detail, faces, product edges, UI text, or high contrast texture inside the quiet text zone, regenerate or recrop before motion. Motion cannot rescue a broken text-over-background composition.

## Default Language And Format

Default new video work to a Chinese promotional film unless the user explicitly asks for another language or format. This default matters because Chinese copy, vertical framing, and social-video viewing habits change the whole layout:

- Language: Simplified Chinese screen copy by default. Keep English product names, model names, code terms, or brand words only when they are part of the source material.
- Format: vertical 9:16 by default.
- Size: `1080x1920` by default.
- Platform assumption: Douyin / TikTok / Reels / Shorts style vertical viewing unless the prompt clearly names a horizontal surface such as YouTube long-form, keynote screen, website hero, or desktop landing page.
- Duration: 10-15 seconds by default for short promotional motion video; use 15 seconds when proof or CTA needs breathing room.
- Safe margins: reserve stronger top/bottom margins for platform UI, subtitles, and CTA. Avoid placing important text in the bottom overlay zone.
- Copy density: Chinese vertical video should use fewer characters per beat, stronger line breaks, and larger type than a horizontal desktop film.

If a user asks for a YouTube, website hero, keynote, or widescreen film, change the format deliberately and write the reason into the brief. Do not silently drift to horizontal because examples or tools default that way.

## Two-Phase Rule

Always split new video work into two phases:

### Phase 1: Brief / Design Proposal

Produce a compact proposal and stop for user confirmation. Do not generate images, create animation code, render video, or build a full HyperFrames composition before confirmation.

The proposal must include:

- Essence: core viewpoint, largest conflict, emotional center, amplified keyword, visual metaphor.
- Structure: center symbol / huge title / person anchor / huge number.
- Format: language, platform, aspect ratio, pixel size, duration, FPS, safe margins. Default to Simplified Chinese, vertical 9:16, and `1080x1920` unless overridden.
- Image decision: whether generated bitmap images are needed, what each image should be, image ratio, and what must stay in HyperFrames.
- Background plan: image role, layout contract, subject position, quiet text zone, crop risks, and whether Codex Image Gen will be used after confirmation.
- Typography: title/support/CTA scale, title size tier, line-height, letter-spacing, maximum lines, text spacing, overflow handling.
- Layout: dominant visual mass, layout contract, grid/alignment, crop-safe zones, mobile overlay risks.
- Motion: main reveal, background motion, transition style, hold times, easing, audio hit plan, motion bounds, and what must remain still.
- Risk gates: what could make it look cheap, unreadable, noisy, or off-style.

End Phase 1 with a clear confirmation request. Production starts only after the user confirms, revises, or explicitly says to proceed.

### Phase 2: Production

After confirmation, create or update the production artifacts, generate needed images, implement HyperFrames composition files, validate, snapshot, render, and write review outputs as the task requires.

## When To Use

Use this skill for:

- HyperFrames video compositions.
- Product launch videos, website-to-video projects, article-to-video pieces, keynote reveals, social motion videos, or YouTube-ready motion pieces.
- Kinetic typography, large animated text, typewriter sequences, restrained logo lockups, and transition-heavy motion videos.
- HTML/CSS/GSAP/Lottie/Three.js motion graphics intended to render as MP4.
- Requests like "cinematic metaphor video", "article-to-video", "product reveal", "make this landing page into a video", "music synced", "big text animation", or "launch film".
- Editing an existing HyperFrames motion video where the user wants targeted changes without breaking the rest of the video.

Do not use this skill for simple video copywriting without production, ordinary landing pages, static posters, generic ad copy, or editing raw MP4 footage without code.

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
- Language and platform. Default to Simplified Chinese promotional copy for vertical social video when unspecified.
- Aspect ratio and pixel size. Default to 9:16 and `1080x1920` unless the platform or user asks otherwise.
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
- One visual metaphor that can carry the whole video.

Translate the abstract idea into a restrained symbol. Examples: AI replacement becomes an erased human silhouette; anxiety becomes a thread about to snap; time becomes a countdown in darkness; growth becomes light inside a crack; information overload becomes data fragments pulled into a black hole; long-termism becomes the only distant lamp; platform migration becomes a black obelisk or data tower; automation becomes documents entering a silent machine.

### 2. Approval Brief

Create `BRIEF_DESIGN_PROPOSAL.md` from `templates/BRIEF_DESIGN_PROPOSAL.template.md` or present the same structure in the response.

Keep it short and decisive. It is a production contract, not a brainstorm. Stop after this proposal and ask for confirmation.

### 3. Design System

Create `DESIGN.md` from `templates/DESIGN.template.md`.

The design system must specify typography, color, spacing, density, metaphor symbol, background-image system, generated-image plan, text-over-image rules, and motion personality. This prevents downstream steps from improvising a new visual language.

Read `references/visual-standard.md` before judging visual quality, typography, layout, or motion.
Read `references/motion-background-system.md` before deciding image count, background roles, animation grammar, or text-over-image treatment.
Read `references/text-over-background-layout.md` before deciding layout contracts, image ratios, text rectangles, subject rectangles, title tiers, crop-safe zones, or bottom-safe boundaries.

### 4. Storyboard And Copy

Create `STORYBOARD.md` from `templates/STORYBOARD.template.md`.

Default short motion arc:

```text
Hook -> Tension -> Metaphor Reveal -> Proof -> CTA
```

For a 10 second no-voiceover kinetic typography video, keep text sparse. One idea per beat is usually enough.

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
- Layout contract, including textRect, subjectRect, title tier, safeBottomY, and motion bounds.
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

Build readable hold frames first. A frame should communicate clearly while paused before motion is added.

For each scene, verify:

- Main message is readable at the target platform size.
- Background image has a clear role and does not fight the text.
- Text sits in a designed quiet zone, not on high-frequency detail.
- The selected layout contract matches the image and message shape.
- Image ratio is standard and does not copy a random source-image ratio.
- Text rectangle keeps title, support, CTA, and proof note in one readable group unless a split is intentional.
- Subject rectangle keeps faces, product edges, UI text, and symbols out of unsafe crop areas.
- Title size tier matches the actual character count, language, line count, and phone viewing distance.
- Safe bottom and right/top platform zones keep CTA, subtitle, proof note, support line, and brand lockup clear.
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
node scripts/validate_artifacts.mjs <project-dir>
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

- New video defaults are honored or explicitly overridden: Simplified Chinese promotional copy, 9:16, `1080x1920`, and vertical safe margins.
- New video work received user confirmation after `BRIEF_DESIGN_PROPOSAL.md` before production began.
- The artifact chain exists or the skipped artifacts are explained.
- If the task asked to build a video, a scaffold or composition source exists, not only prose.
- Static hero frames are coherent before animation.
- Text fits inside safe margins on the target aspect ratio.
- Each text-over-background beat declares a layout contract with textRect, subjectRect, safeBottomY, title tier, and motion bounds.
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

Use seeded randomness, fixed duration, fixed fps, fixed dimensions, local assets, and explicit timeline positions. Default new-video dimensions are `1080x1920` for 9:16 vertical output unless the brief documents another target.

## References

- Read `references/workflow.md` for the full production workflow.
- Read `references/visual-standard.md` when judging style, typography, layout, and motion.
- Read `references/text-over-background-layout.md` when planning layout contracts, text rectangles, subject rectangles, title tiers, crop-safe zones, and mobile safe boundaries.
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
node scripts/validate_artifacts.mjs <project-dir>
node scripts/build_review_pack.mjs <project-dir>
```

`check-structure.mjs` checks the skill package. The other scripts help with project scaffolding, local asset checks, artifact completeness validation, and optional review pack generation. These scripts do not prove visual quality; they only catch workflow, structure, and reproducibility problems.
