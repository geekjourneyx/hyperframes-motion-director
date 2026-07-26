# Repository Guidelines

## Project Structure & Module Organization

This repository packages an agent skill for directing HyperFrames cinematic motion-video production work.

- `skills/hyperframes-motion-director/SKILL.md` contains the primary agent instructions and quality gates.
- `skills/hyperframes-motion-director/templates/` holds production artifact templates such as `BRIEF_DESIGN_PROPOSAL.template.md`, `DESIGN.template.md`, `STORYBOARD.template.md`, `REVIEW_REPORT.template.md`, design-engineering contracts, and optional `BEAT_MAP` / `MOTION_MAP` templates.
- `skills/hyperframes-motion-director/references/` contains supporting guidance for workflow, the unified visual standard, GSAP choreography, audio sync, and render stability.
- `skills/hyperframes-motion-director/scripts/` contains Node.js helpers for scaffolding projects and validating skill structure or production artifacts.
- `skills/hyperframes-motion-director/evals/` stores trigger prompts and evaluation cases.

## Build, Test, and Development Commands

Use Node.js 18 or newer.

```bash
node skills/hyperframes-motion-director/scripts/check-structure.mjs
```

Verifies the skill has all required files and key `SKILL.md` terms.

```bash
node skills/hyperframes-motion-director/scripts/create_project.mjs ./my-motion-film
```

Creates a HyperFrames motion production scaffold with the core artifacts, design-engineering contracts, asset folders, review folders, and placeholders. Use `--with-timing` for `BEAT_MAP.json` and `--with-motion` for `MOTION_MAP.json`.

```bash
node skills/hyperframes-motion-director/scripts/check_assets.mjs <project-dir>
node skills/hyperframes-motion-director/scripts/validate_artifacts.mjs <project-dir>
node skills/hyperframes-motion-director/scripts/validate_design_engineering.mjs <project-dir>
```

Checks a generated project for asset readiness, artifact completeness, scene schema validity, approved vector templates, approved motion primitives, GSAP choreography policy, semantic primitive selection reasons, and snapshot tests. These scripts do not prove visual or directing quality.

For implemented HyperFrames compositions, also run the strongest available local CLI checks, for example `npx hyperframes validate` and `npx hyperframes snapshot <composition> --at <times>`.

Rendered video outputs and generated project assets belong in generated project folders, not in this skill repository.

## Coding Style & Naming Conventions

Scripts use modern JavaScript modules (`import` syntax) and `.mjs` filenames. Keep helper scripts dependency-light and deterministic. Use two-space indentation in Markdown lists and JSON templates where practical. Template outputs should use uppercase artifact names such as `BRIEF_DESIGN_PROPOSAL.md` and `REVIEW_REPORT.md`; template files should keep the `.template.md` or `.template.json` suffix.

## Testing Guidelines

There is no formal test framework yet. Treat `node skills/hyperframes-motion-director/scripts/check-structure.mjs` as the release gate for this skill. When changing project-scaffold behavior, run `create_project.mjs` into a temporary directory and then run asset, artifact, and design-engineering checks against that directory.

For repository releases, also run `node skills/hyperframes-motion-director/scripts/check_release.mjs vX.Y.Z`. Push `main` and the annotated version tag atomically; `.github/workflows/release.yml` creates or reconciles the GitHub Release. Do not move or force-push a public version tag.

## Commit & Pull Request Guidelines

The current history uses Conventional Commit style, for example `docs: initialize motion director skill`. Keep commits terse and scoped: `docs:`, `fix:`, `feat:`, or `chore:`. Pull requests should describe what changed, why it changed, which validation commands ran, and include screenshots only when README visuals or rendered review assets changed.

## Agent-Specific Instructions

Do not start animation code before reading `skills/hyperframes-motion-director/SKILL.md` and the relevant files in `skills/hyperframes-motion-director/references/`. For new video work, preserve the two-phase gate: `BRIEF_DESIGN_PROPOSAL.md` first, user confirmation second, then production through `DESIGN.md`, `STORYBOARD.md`, `SCENE_SCHEMA.json`, `VECTOR_TEMPLATES.json`, `MOTION_PRIMITIVES.json`, optional generated images, validation, snapshots, render, and `REVIEW_REPORT.md`. `BEAT_MAP.json` and `MOTION_MAP.json` are optional only when timing or choreography complexity justifies them.
