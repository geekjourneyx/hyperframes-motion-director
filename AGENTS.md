# Repository Guidelines

## Project Structure & Module Organization

This repository is an agent skill for directing HyperFrames cinematic motion-video production work.

- `SKILL.md` contains the primary agent instructions and quality gates.
- `templates/` holds production artifact templates such as `BRIEF_DESIGN_PROPOSAL.template.md`, `DESIGN.template.md`, `STORYBOARD.template.md`, `REVIEW_REPORT.template.md`, and optional `BEAT_MAP` / `MOTION_MAP` templates.
- `references/` contains supporting guidance for workflow, the unified visual standard, audio sync, and render stability.
- `scripts/` contains Node.js helpers for scaffolding projects and validating skill structure or production artifacts.
- `evals/` stores trigger prompts and evaluation cases.

## Build, Test, and Development Commands

Use Node.js 18 or newer.

```bash
node scripts/check-structure.mjs
```

Verifies the skill has all required files and key `SKILL.md` terms.

```bash
node scripts/create_project.mjs ./my-motion-film
```

Creates a HyperFrames motion production scaffold with the four core artifacts, asset folders, review folders, and placeholders. Use `--with-timing` for `BEAT_MAP.json` and `--with-motion` for `MOTION_MAP.json`.

```bash
node scripts/check_assets.mjs <project-dir>
node scripts/score_artifacts.mjs <project-dir>
```

Checks a generated project for asset readiness and the slim four-artifact production chain.

For implemented HyperFrames compositions, also run the strongest available local CLI checks, for example `npx hyperframes validate` and `npx hyperframes snapshot <composition> --at <times>`.

Rendered video outputs and generated project assets belong in generated project folders, not in this skill repository.

## Coding Style & Naming Conventions

Scripts use modern JavaScript modules (`import` syntax) and `.mjs` filenames. Keep helper scripts dependency-light and deterministic. Use two-space indentation in Markdown lists and JSON templates where practical. Template outputs should use uppercase artifact names such as `BRIEF_DESIGN_PROPOSAL.md` and `REVIEW_REPORT.md`; template files should keep the `.template.md` or `.template.json` suffix.

## Testing Guidelines

There is no formal test framework yet. Treat `node scripts/check-structure.mjs` as the release gate for this skill. When changing project-scaffold behavior, run `create_project.mjs` into a temporary directory and then run asset and artifact checks against that directory.

## Commit & Pull Request Guidelines

The current history uses Conventional Commit style, for example `docs: initialize motion director skill`. Keep commits terse and scoped: `docs:`, `fix:`, `feat:`, or `chore:`. Pull requests should describe what changed, why it changed, which validation commands ran, and include screenshots only when README visuals or rendered review assets changed.

## Agent-Specific Instructions

Do not start animation code before reading `SKILL.md` and the relevant files in `references/`. For new video work, preserve the two-phase gate: `BRIEF_DESIGN_PROPOSAL.md` first, user confirmation second, then production through `DESIGN.md`, `STORYBOARD.md`, optional generated images, validation, snapshots, render, and `REVIEW_REPORT.md`. `BEAT_MAP.json` and `MOTION_MAP.json` are optional only when timing or choreography complexity justifies them.
