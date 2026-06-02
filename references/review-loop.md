# Review Loop

A high-quality video workflow needs a review loop, not just a rendered file. The goal is to make feedback specific enough that the next edit changes the right layer and preserves everything else.

## Handoff Package

For any reviewable output, provide:

- Render path if available.
- Snapshot directory or planned snapshot timestamps.
- `CREATIVE_BRIEF.md`
- `DESIGN.md`
- `SCRIPT.md`
- `STORYBOARD.md`
- `BEAT_MAP.json` if used.
- `MOTION_MAP.json` if used.
- `REVIEW_REPORT.md`
- `REVIEW_PACK.md`

Use `scripts/build_review_pack.mjs <project-dir>` when possible.

## Review Passes

Ask reviewers to judge in this order:

1. Still frames: does each hero frame look intentional?
2. Silent playback: can the message and CTA be understood?
3. Full playback: does audio improve rhythm and emotion?
4. Editability: can the requested change be localized?

This order prevents teams from hiding weak design behind motion or music.

## Feedback Routing

Map feedback to a layer:

- Message unclear: `SCRIPT.md`
- Weak hierarchy: `DESIGN.md`, scene CSS.
- Cheap title: typography, spacing, effects, title entrance.
- Too slow: copy density, dead holds, transition timing.
- Too fast: hold time, stagger length, scene duration.
- Product lost: product frame scale, contrast, crop, background suppression.
- Music off: `BEAT_MAP.json`, timeline positions.
- Render unstable: deterministic timing, assets, validation errors.

## Patch Discipline

For existing projects:

- Read files before changing.
- Record current selectors, labels, timings, colors, and fonts.
- Touch the smallest file set that addresses the feedback.
- Keep unrelated beats and global tokens stable.
- Rerun validation relevant to the touched layer.
- Report changed files and unchanged surfaces.

## Review Report Standard

Every `REVIEW_REPORT.md` should answer:

- What exists?
- What was not produced and why?
- Which checks passed?
- Which checks were blocked?
- What should a human inspect first?
- What is the single highest-leverage next edit?

Do not bury blockers. A blocked render, missing asset, or absent CLI is an important production fact.
