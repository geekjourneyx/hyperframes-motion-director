# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

- Added a tag-triggered GitHub Release workflow with automatic reconciliation for missing Releases on `main`.
- Added a deterministic release gate for version alignment, changelog extraction, tracked noise, personal local paths, environment files, and high-confidence credential material.
- Added a browser-free release SOP with atomic branch-and-tag pushing and manual recovery guidance.

## [2.8.0] - 2026-07-26

### Added

- Added exact-reference fidelity and narrative-boundary rules so supplied prompts, images, repositories, and local paths are inspected directly instead of reduced to a generic style label.
- Added motion-role asset coverage for narrative anchors, product proof, and transition carriers, plus distinct component-combination proofs.
- Added rendered-frame integrity contracts for composite ownership, visible alpha bounds, exported font fit, and entry/hold/exit MP4 evidence.
- Added regression evaluations based on real asset-monotony, style-drift, transparency, occlusion, and exported-overflow feedback.

### Changed

- Upgraded `ASSET_MANIFEST.json` to schema version 2 and made style-source evidence, narrative boundaries, motion-role coverage, and combination tests enforceable.
- Upgraded `SCENE_SCHEMA.json` to require rendered-MP4 text checks, alpha-visible-bounds measurement, occlusion-group validation, and export checkpoints.
- Expanded brief, design, storyboard, and review templates so the new rules produce auditable evidence rather than prose-only quality claims.

## [2.7.0] - 2026-07-24

### Added

- Added a content-derived Image Gen asset workflow: distinct visual worlds determine independent vertical backgrounds, while a source-driven movable-object inventory determines component count.
- Added one-or-more component-sheet planning, separate hero-object generation when needed, transparent cutout requirements, dark/light contact-sheet review, and a ban on composing with the source sheet.
- Added `ASSET_MANIFEST.json` scaffolding and image-asset validation for background coverage, component inventory coverage, real transparency, clean outer edges, matte spill, minimum resolution, composition usage, and source-sheet leakage.
- Added regression tests that prove small and large valid inventories pass while missing worlds, missing components, opaque cutouts, edge-touching cutouts, matte spill, and direct source-sheet use fail.

### Changed

- Replaced fixed background and component quotas with explicit count reasons derived from the current source and approved visual plan.
- Updated the brief, design, storyboard, review, workflow, promo, visual-standard, and background-system guidance to use the same dynamic asset contract.
- Updated project scaffolding with dedicated background, component, source, proof, and style-reference folders.

## [2.6.2] - 2026-07-05

### Added

- Added a source-driven visual system rule so product, article, workflow, and knowledge promos must extract source phrases, nouns, verbs, numbers, motif families, text-to-component maps, big-text-box replacement plans, and generic visual rejection lists before implementation.
- Added brief, design, storyboard, and review fields that force every major visual component and generated component sheet item to map back to source text or product mechanism.
- Added review gates for source-text recognition, big text box replacement, motif cohesion, and rejecting generic office/AI/productivity visuals that could fit another project.

### Changed

- Strengthened artifact validation so future productions fail when visual richness is only an attractive asset pack without source-specific component mapping.

## [2.6.1] - 2026-07-05

### Added

- Made visible product visual components mandatory for product promos, with a component floor covering product surfaces, taxonomy components, final action components, snapshot proof, and state-change actions.
- Added support for generated visual component sheets: multi-component asset sheets must have named roles, crop/isolation plans, local paths, target scenes, motion actions, and deletion tests.
- Added brief, design, storyboard, and review fields for component state-change actions, component sheet crop plans, component snapshot timestamps, and static-component rejection.

### Changed

- Strengthened product promo validation so component plans must be visible, product-specific, action-bearing, and not just prose, generic cards, or decorative collages.

## [2.6.0] - 2026-07-05

### Added

- Added a first-frame visual center gate so hero cards, screenshots, CTA, and product surfaces must be optically centered or intentionally offset and checked in rendered MP4 stills.
- Added a pure-code exception rule so black gradients, big text, translucent cards, and thin lines cannot masquerade as a premium visual system.
- Added a visual asset floor for non-typography videos: background stages, screenshots, generated proof plates, or concrete workflow/product visuals must exist unless a typography-only exception is explicitly approved.
- Added review, brief, design, and storyboard fields for visual asset floor, empty `assets/images` handling, pure-code exception approval, and "black background plus title/cards" regression checks.
- Added `--require-visual-assets` to `scripts/check_assets.mjs` so productions that need visuals fail when `assets/images` contains only placeholders.

### Changed

- Strengthened artifact validation so the new visual asset and pure-code exception fields are required in production reports.
- Updated visual standards to flag placeholder-only image folders and repeated dark-stage card scenes as quality failures.

### Validation

- Ran `node skills/hyperframes-motion-director/scripts/check-structure.mjs`.
- Ran `node skills/hyperframes-motion-director/scripts/create_project.mjs /private/tmp/hf-skill-asset-floor-check --with-timing --with-motion`.
- Ran `node skills/hyperframes-motion-director/scripts/validate_design_engineering.mjs /private/tmp/hf-skill-asset-floor-check`.
- Confirmed the 2026-07-04 failed video copy is now blocked by `node skills/hyperframes-motion-director/scripts/check_assets.mjs /private/tmp/hf-failcheck-20260704 --require-visual-assets`.
- Confirmed the 2026-07-04 failed video copy is now blocked by artifact validation for missing visual asset floor and pure-code exception fields.

## [2.5.2] - 2026-07-03

### Fixed

- Fixed `npx skills add geekjourneyx/hyperframes-motion-director` installation discovery by moving the installable skill package into `skills/hyperframes-motion-director/`.
- Kept bundled `references/`, `templates/`, `scripts/`, and `assets/` inside the skill directory so agents can load the skill's supporting resources after installation.
- Updated repository documentation and agent instructions to reference the nested skill path.
- Made `scripts/check-structure.mjs` resolve the skill root from its own location, so validation works from the repository root or another working directory.

### Validation

- Ran `node skills/hyperframes-motion-director/scripts/check-structure.mjs`.
- Generated a temporary project scaffold from the nested skill path.
- Ran asset and design-engineering validation against the generated scaffold.

## [2.5.1] - 2026-07-01

### Fixed

- Wired the support-asset system into the v2.4 design-engineering contracts instead of leaving it only in prose artifacts.
- Added `support_assets` to `SCENE_SCHEMA.template.json` with decision, role, source, style lock, safe zones, motion purpose, entrance/exit timing, and deletion trigger.
- Added `support_asset_policy` to `VECTOR_TEMPLATES.template.json` so vector templates constrain support asset roles, style-lock fields, required contract fields, and rejection tests.
- Strengthened `scripts/validate_design_engineering.mjs` so missing support-asset contracts fail design-engineering validation.
- Updated artifact validation and design-engineering guidance so support assets remain part of the structured Motion Design Compiler workflow.

### Validation

- Ran `node --check scripts/validate_design_engineering.mjs`.
- Ran `node --check scripts/validate_artifacts.mjs`.
- Ran `node scripts/check-structure.mjs`.
- Generated `/tmp/hfmd-support-green` with timing and motion templates.
- Ran `node scripts/validate_design_engineering.mjs /tmp/hfmd-support-green`.
- Ran `node scripts/check_assets.mjs /tmp/hfmd-support-green`.
- Confirmed blank Markdown production templates still fail artifact completeness validation as expected, while all structured design-engineering contract checks pass.

## [2.5.0] - 2026-07-01

### Added

- Added support-asset decision rules for generated, supplied, code-generated, or mixed symbol, texture, transition plate, semantic glyph, product/UI fragment, and motion accent assets.
- Added support-asset planning fields to the brief, design, storyboard, and review templates.
- Added support-asset completeness checks to `scripts/validate_artifacts.mjs`.

### Changed

- Expanded motion/background guidance from image-count planning to asset-role planning with source, style lock, safe zones, motion purpose, and deletion-trigger requirements.
- Clarified when to use Codex Image Gen for bitmap support assets versus HyperFrames/CSS/SVG for sharper code-generated marks, masks, traces, and motion accents.
- Updated visual review guidance so extra assets must add meaning, depth, proof, transition continuity, or readability rather than fill empty space.

### Validation

- Ran `node scripts/check-structure.mjs`.
- Generated a temporary project scaffold with timing and motion templates.
- Ran strict asset checks against the temporary scaffold.
- Confirmed blank templates fail artifact completeness validation as expected until production fields are filled.
- Ran syntax checks for the changed helper scripts.
- Ran `git diff --check`.

## [2.4.0] - 2026-07-01

### Added

- Added `references/design-engineering.md` to define the Motion Design Compiler production model: scene schema, vector templates, motion primitives, GSAP timeline, browser snapshots, and render.
- Added `references/gsap-choreography.md` to turn GSAP Skills guidance into production rules for timeline labels, position parameters, transform aliases, `autoAlpha`, plugin registration, premium SVG/text plugins, and performance.
- Added `SCENE_SCHEMA.template.json`, `VECTOR_TEMPLATES.template.json`, and `MOTION_PRIMITIVES.template.json` so new projects start with structured design-engineering contracts instead of prose-only direction.
- Added `scripts/validate_design_engineering.mjs` to validate scene schemas, approved vector templates, approved motion primitives, semantic primitive selection reasons, GSAP choreography policy, plugin policy, and snapshot tests.

### Changed

- Updated `SKILL.md` with Design Engineering Contract and GSAP Choreography Contract rules.
- Updated project scaffolding so generated productions include `SCENE_SCHEMA.json`, `VECTOR_TEMPLATES.json`, and `MOTION_PRIMITIVES.json` by default.
- Expanded artifact validation, asset checks, review-pack assembly, README, and AGENTS guidance to include design-engineering contracts.
- Upgraded the motion primitive contract with premium promo primitives: `splitTextReveal`, `drawSvgAccent`, `morphSymbol`, `motionPathHandoff`, and `customEaseSignature`.

### Validation

- Ran `node scripts/check-structure.mjs`.
- Ran syntax checks for `scripts/validate_design_engineering.mjs`, `scripts/create_project.mjs`, and `scripts/validate_artifacts.mjs`.
- Generated `/tmp/hfmd-gsap-smoke` with timing and motion templates.
- Ran `node scripts/validate_design_engineering.mjs /tmp/hfmd-gsap-smoke`.
- Ran `node scripts/check_assets.mjs /tmp/hfmd-gsap-smoke`.
- Confirmed blank Markdown production templates still fail artifact completeness validation as expected, while scene schema, vector template, motion primitive, and GSAP choreography contract checks pass.

## [2.3.0] - 2026-06-05

### Added

- Added `references/motion-craft.md` for anti-PPT motion direction, kinetic typography, CSS3 / SVG / GSAP scene bridges, and center-impact attention planning.
- Added a visual-object discipline to `SKILL.md`, templates, and review gates so videos can use restrained props, marks, frames, stamps, rails, and texture pieces without drifting into icon decoration.
- Added attention-map, first-eye-target, center-impact, kinetic typography, and anti-PPT fields across the brief, design, storyboard, motion map, and review templates.
- Added eval coverage for PPT-like video criticism, lower-half hook placement, weak text transitions, CSS/SVG/GSAP motion planning, and anti-PPT review gates.

### Changed

- Reworked the skill flow from a three-layer model to a four-layer model: background, typography, visual objects, and motion.
- Strengthened existing-video edit guidance for videos that feel static, low-impact, under-animated, or too much like slides.
- Expanded artifact validation so generated projects must document stronger motion craft, attention placement, readable holds, and anti-PPT decisions.
- Simplified README language for non-specialist readers while keeping the publishing and validation commands intact.
- Ignored generated `productions/` folders so rendered video work does not enter the skill release.

### Validation

- Ran `node scripts/check-structure.mjs`.
- Generated a temporary project scaffold with timing and motion templates.
- Ran strict asset checks against the temporary scaffold.
- Confirmed blank templates fail artifact completeness validation as expected until production fields are filled.
- Ran `node scripts/build_review_pack.mjs` against the temporary scaffold.
- Ran `git diff --check`.

## [2.2.0] - 2026-06-04

### Added

- Added `references/text-over-background-layout.md` for motion-native text-over-background layout contracts, including `textRect`, `subjectRect`, `safeBottomY`, title tiers, motion bounds, readable holds, and transition integration.
- Added layout-contract fields across the brief, design, storyboard, and review templates so background imagery, copy, mobile safe zones, and motion are planned as one system.

### Changed

- Reframed static poster language into readable hold-frame and transition-ready motion language for HyperFrames vertical video work.
- Replaced `scripts/score_artifacts.mjs` with `scripts/validate_artifacts.mjs`, removing percent/points scoring in favor of artifact completeness validation.
- Simplified `scripts/check-structure.mjs` so it checks package integrity and deprecated positioning drift instead of policing broad template wording.
- Updated README, AGENTS, scaffold guidance, and review-pack generation around artifact validation rather than artifact scoring.
- Changed the project license from MIT to GNU Affero General Public License v3.0.

### Validation

- Ran `node scripts/check-structure.mjs`.
- Generated a temporary project scaffold with timing and motion templates.
- Ran strict asset checks against the temporary scaffold.
- Confirmed blank templates fail artifact completeness validation as expected until production fields are filled.
- Ran `node scripts/build_review_pack.mjs` against the temporary scaffold.
- Ran `git diff --check`.

## [2.1.0] - 2026-06-04

### Added

- Added README visual assets generated with Codex Image Gen and referenced as stable `assets/banner.png` and `assets/features.png`.
- Added a default production assumption for new videos: Simplified Chinese promotional copy, vertical 9:16, `1080x1920`, and platform-safe top/bottom zones.
- Added eval coverage and structure-check guards for the Chinese vertical-video default.

### Changed

- Reworked README layout into a clearer portfolio-style project entry with faster positioning, shorter sections, and visual examples.
- Updated skill guidance, workflow reference, visual standard, production templates, and scaffold README so unspecified new work defaults to Chinese vertical promotional films instead of horizontal or language-neutral output.

## [2.0.0] - 2026-06-04

### Changed

- Renamed the internal skill slug from `video-ad-director` to `hyperframes-motion-director` to match the public `HyperFrames Motion Director` positioning.
- Updated install guidance, eval metadata, and structure checks to enforce the new internal slug.
- Renamed the GitHub repository target to `geekjourneyx/hyperframes-motion-director`.

## [1.2.0] - 2026-06-04

### Changed

- Repositioned the public project name from `Video Ad Director` to `HyperFrames Motion Director`.
- Calibrated README, skill description, agent guidance, scaffold wording, workflow references, and evaluation prompts around HyperFrames cinematic motion-video production instead of video advertising.
- Added structure-check guards to prevent public documentation from drifting back to the deprecated `Video Ad Director` / video-ad-only framing.

## [1.1.0] - 2026-06-03

### Added

- Added the default background-stage production rule for new video work, including generated, supplied, and pure-code exceptions.
- Added `references/motion-background-system.md` to define background image roles, image count guidance, text-over-image rules, motion budget, and visual review gates.
- Added background-stage, text-safe-zone, attention-target, stillness, and motion-purpose fields across the brief, design, storyboard, motion map, and review templates.
- Added artifact completeness checks for background source, quiet text zones, motion budget, still holds, transition midpoint snapshots, and review verdicts.
- Added strict asset-check mode and composition file scanning to catch remote or missing render assets before final delivery.

### Changed

- Calibrated the core skill flow around three coordinated layers: background as stage, typography as message, and motion as attention direction.
- Updated the production workflow, visual standard, README, and scaffold README guidance to reflect the new background and motion gates.
- Tightened scaffold check commands so generated projects point back to this skill's helper scripts.

### Validation

- Ran `node scripts/check-structure.mjs`.
- Ran syntax checks for the changed helper scripts.
- Generated a temporary project scaffold with timing and motion templates.
- Ran strict asset checks against the temporary scaffold.
- Confirmed blank templates fail artifact completeness validation as expected until production fields are filled.

## [1.0.2] - 2026-06-02

### Fixed

- Quoted `SKILL.md` frontmatter `description` to prevent YAML parsing errors from the `workflow: first...` colon sequence.
- Added a frontmatter guard to `scripts/check-structure.mjs` so unquoted `: ` sequences are caught before release.

## [1.0.1] - 2026-06-02

### Changed

- Calibrated all docs around the slim two-phase workflow: `BRIEF_DESIGN_PROPOSAL.md` first, user confirmation second, then production.
- Reduced the default production chain to four core artifacts: `BRIEF_DESIGN_PROPOSAL.md`, `DESIGN.md`, `STORYBOARD.md`, and `REVIEW_REPORT.md`.
- Made `BEAT_MAP.json` and `MOTION_MAP.json` optional artifacts generated only with `--with-timing` or `--with-motion`.
- Replaced separate visual review references with one unified `references/visual-standard.md`.
- Removed obsolete README image assets and duplicate legacy planning templates.
- Updated scaffold, asset check, structure check, review pack, artifact validation, README, AGENTS, and eval prompts to prevent drift back to the old artifact chain.

## [1.0.0] - 2026-06-02

### Added

- Initial `video-ad-director` agent skill for directing HyperFrames video ad productions.
- Production workflow covering intake, planning, design, storyboard, timing, motion, validation, render, and review.
- Initial template set for planning, design, storyboard, timing, motion, and review artifacts.
- Reference guides for workflow, visual quality, audio sync, HyperFrames stability, and review handoff.
- Node.js helper scripts for project scaffolding, structure checks, asset checks, artifact validation, and review-pack assembly.
- README with installation, usage, and repository structure guidance.
- Contributor guide in `AGENTS.md`.
- MIT license.
