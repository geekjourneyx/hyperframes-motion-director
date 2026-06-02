# Changelog

All notable changes to this project will be documented in this file.

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
