---
name: directing-hyperframes-ads
description: Direct and produce polished marketing videos, product launch ads, YouTube promos, Apple-style reveal films, kinetic typography sequences, social ads, caption-led product videos, website-to-video explainers, and music-synced motion graphics using HyperFrames. Use this skill whenever the user wants a high-quality video or ad, especially requests involving HyperFrames, HTML/CSS/GSAP video, big animated typography, product promos, launch films, music beat sync, transitions, short-form ads, or turning a landing page/product story into a rendered video. This skill guides creative brief, design system, script, storyboard, hero frames, GSAP motion choreography, validation, snapshots, review loops, and final deterministic renders.
---

# Directing HyperFrames Ads

Use this skill to behave as an AI video director, motion designer, and production QA lead for HyperFrames advertising work. The goal is not merely to create a composition that renders. The goal is to produce a short video that is clear, visually intentional, rhythmically controlled, editable, technically reproducible, and reviewable by a human.

HyperFrames handles HTML/CSS/JS rendering. This skill handles the production discipline around it.

## Core Principle

Work from the final viewing experience backward:

1. What should the viewer remember?
2. Which frame proves the visual direction is strong?
3. Which beat carries the hook, reveal, proof, and CTA?
4. Which motion choices support those beats?
5. Which validation proves the video will render deterministically?

Do not begin by writing animation code. First make the intended still frames and timing legible.

## Output Fidelity

Match the output to what the user asked for:

- **Plan-only**: If the user asks for strategy, critique, or planning, produce the artifact chain and review protocol.
- **Production scaffold**: If the user asks to create, build, or start a video, create a project scaffold with artifacts, asset folders, composition folders, and review-pack structure. Use `scripts/create_project.mjs` when possible.
- **Implemented composition**: If a HyperFrames project exists or the user clearly asks for implementation, create or edit composition source files, then run available validation.
- **Final delivery**: If assets and HyperFrames tooling are available, produce draft/review/final renders plus snapshots and a review pack.

Do not stop at markdown artifacts when the user asked for a build and the workspace can support files. Markdown artifacts are the planning layer, not the finished production.

## When To Use

Use this skill for:

- HyperFrames video compositions.
- Product launch videos, YouTube ads, social ads, or website-to-video projects.
- Kinetic typography, large animated text, typewriter sequences, gradient text, logo lockups, and transition-heavy promo videos.
- HTML/CSS/GSAP/Lottie/Three.js motion graphics intended to render as MP4.
- Requests like "Apple keynote style", "cool product ad", "make this landing page into a video", "music synced", "big text animation", or "YouTube promo".
- Editing an existing HyperFrames ad where the user wants targeted changes without breaking the rest of the video.

Do not use this skill for simple video copywriting without production, ordinary landing pages, static posters, or editing raw MP4 footage without code.

## Operating Modes

### New Video

Create or update these artifacts before implementation:

1. `CREATIVE_BRIEF.md`
2. `DESIGN.md`
3. `SCRIPT.md`
4. `STORYBOARD.md`
5. `BEAT_MAP.json` when music, voiceover, or precise timing matters.
6. `MOTION_MAP.json` when GSAP choreography needs to be explicit.
7. HyperFrames composition files.
8. `REVIEW_REPORT.md`
9. `REVIEW_PACK.md` for handoff.

Use the templates in `templates/`.

### Existing Video Edit

First read the actual project files. Treat the existing composition as the current spec. Do not invent colors, fonts, selectors, timings, or easing values.

Map the user's request to the smallest artifact that should change:

- Copy or CTA issue: update `SCRIPT.md` and the relevant text nodes.
- Visual style issue: update `DESIGN.md` and relevant CSS variables.
- Scene composition issue: update the scene HTML/CSS.
- Timing or rhythm issue: update `STORYBOARD.md`, `BEAT_MAP.json`, and timeline positions.
- Motion issue: update only the relevant GSAP timeline.
- Stability issue: update code and rerun validation.

After editing, report exactly what changed and which validation steps ran.

## Required Workflow

### 1. Intake

Extract or infer:

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

### 2. Brief

Create `CREATIVE_BRIEF.md` from `templates/CREATIVE_BRIEF.template.md`.

Keep it practical. The brief should tell the next step what must be true, not sound like marketing filler.

### 3. Design System

Create `DESIGN.md` from `templates/DESIGN.template.md`.

The design system must specify typography, color, spacing, density, and motion personality. This prevents downstream steps from improvising a new visual language.

Read `references/quality-rubric.md` before judging visual quality.
Read `references/typography-composition.md` when the user asks for premium, Apple-like, cinematic, luxury, or "less template" visuals.

### 4. Script

Create `SCRIPT.md` from `templates/SCRIPT.template.md`.

Default ad structure:

```text
Hook -> Tension -> Reveal -> Proof -> CTA
```

For a 10 second no-voiceover kinetic typography ad, keep text sparse. One idea per beat is usually enough.

### 5. Storyboard

Create `STORYBOARD.md` from `templates/STORYBOARD.template.md`.

Every beat needs:

- Timing.
- Screen text or visual action.
- Hero frame timestamp.
- Layout and visual hierarchy.
- Motion direction.
- Transition out.
- Audio or rhythm notes when relevant.
- Quality note.

Read `references/audio-sync.md` when music, sound design, voiceover, beat hits, or captions matter.

### 6. Layout Before Animation

Build static hero frames first. A frame should already work as a poster before motion is added.

For each scene, verify:

- Main message is readable at the target platform size.
- Text does not overlap or leave safe margins.
- Hierarchy is clear.
- The scene has one dominant idea.
- CTA or brand lockup is not visually weak.

Only add GSAP or other motion after layout works.

### 7. Motion

Read `references/motion-language.md` before adding animation.

Use motion to clarify sequence and emphasis. Avoid applying the same y-plus-opacity entrance to every element. Give major text enough hold time to be read.

For GSAP in HyperFrames:

- Use a paused timeline.
- Register timelines for HyperFrames control.
- Use explicit position parameters for timing.
- Keep timeline construction synchronous and deterministic.

Read `references/hyperframes-stability.md` before rendering.

Create or update `MOTION_MAP.json` from `templates/MOTION_MAP.template.json` when a video has multiple animated beats. This keeps selectors, labels, timing, easing, and transitions reviewable before code changes.

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

- The artifact chain exists or the skipped artifacts are explained.
- If the task asked to build a video, a scaffold or composition source exists, not only prose.
- Static hero frames are coherent before animation.
- Text fits inside safe margins on the target aspect ratio.
- At least one meaningful transition connects scenes in a multi-scene video.
- Important copy has enough hold time to read.
- Typography avoids lazy defaults and documents type scale, line height, and hierarchy.
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
- Read `references/typography-composition.md` when judging or designing premium frames.
- Read `references/motion-language.md` when designing animation and transitions.
- Read `references/audio-sync.md` when timing to music, voiceover, or captions.
- Read `references/hyperframes-stability.md` before implementing or debugging render behavior.
- Read `references/quality-rubric.md` before scoring or reviewing output.
- Read `references/review-loop.md` before handing off outputs or applying user feedback.

## Templates

Use the templates in `templates/` for production artifacts:

- `CREATIVE_BRIEF.template.md`
- `DESIGN.template.md`
- `SCRIPT.template.md`
- `STORYBOARD.template.md`
- `BEAT_MAP.template.json`
- `MOTION_MAP.template.json`
- `REVIEW_REPORT.template.md`

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
