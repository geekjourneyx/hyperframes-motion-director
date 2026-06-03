# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-06-03

### Added

- Added the default background-stage production rule for new video work, including generated, supplied, and pure-code exceptions.
- Added `references/motion-background-system.md` to define background image roles, image count guidance, text-over-image rules, motion budget, and visual review gates.
- Added background-stage, text-safe-zone, attention-target, stillness, and motion-purpose fields across the brief, design, storyboard, motion map, and review templates.
- Added stricter artifact scoring for background source, quiet text zones, motion budget, still holds, transition midpoint snapshots, and review verdicts.
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
- Confirmed blank templates score `0/100` as expected until production fields are filled.

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
- Updated scaffold, asset check, structure check, review pack, artifact scoring, README, AGENTS, and eval prompts to prevent drift back to the old artifact chain.

## [1.0.0] - 2026-06-02

### Added

- Initial `video-ad-director` agent skill for directing HyperFrames video ad productions.
- Production workflow covering intake, planning, design, storyboard, timing, motion, validation, render, and review.
- Initial template set for planning, design, storyboard, timing, motion, and review artifacts.
- Reference guides for workflow, visual quality, audio sync, HyperFrames stability, and review handoff.
- Node.js helper scripts for project scaffolding, structure checks, asset checks, artifact scoring, and review-pack assembly.
- README with installation, usage, and repository structure guidance.
- Contributor guide in `AGENTS.md`.
- MIT license.
