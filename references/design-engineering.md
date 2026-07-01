# Design Engineering

Use this reference when upgrading a HyperFrames motion project from taste guidance to repeatable production behavior.

## Motion Design Compiler

The skill should behave like a small Motion Design Compiler:

```text
brief -> scene schema -> vector templates -> motion primitives -> GSAP timeline -> browser snapshots -> render
```

Natural language names the direction. The compiler contracts preserve it.

The compiler has four hard responsibilities:

- Turn the storyboard into a scene schema with explicit slots, layout contracts, and beat timing.
- Select approved vector templates instead of inventing new SVG geometry for every video.
- Select legal motion primitives with semantic reasons and rejection tests.
- Run render validation before final video export.

## Required Production Contracts

Every new production scaffold includes these files:

- `SCENE_SCHEMA.json`: the structured scene contract for content, slots, layout, timing, motion, and snapshots.
- `VECTOR_TEMPLATES.json`: approved SVG composition families and their slots, geometry rules, icon/decor rules, and rejection tests.
- `MOTION_PRIMITIVES.json`: approved GSAP/SVG/CSS motion primitives, their semantic use cases, required parameters, and failure modes.

These files are not optional polish. They reduce random generation.

## Scene Schema

The scene schema is the bridge between direction and implementation.

Each scene must declare:

- `template_id`: one approved vector template.
- `content_slots`: title, support, proof, data, icon, CTA, or empty.
- `layout_contract`: textRect, subjectRect, title tier, safeBottomY, motion bounds, and quiet zone.
- `primitive_chain`: the approved motion primitives used by the scene.
- `selection_reason`: why each primitive fits the meaning of the beat.
- `readable_hold`: start and end timestamps for text stillness.
- `snapshot_tests`: hero frame, transition midpoint, overflow check, and CTA lock.

If a scene cannot be represented as structured data, it is not ready for implementation.

## Vector Templates

Start with a small approved set:

- `quote_card`: huge claim or quote, minimal support line, one accent path.
- `data_point`: one number or fact, proof label, counter or path emphasis.
- `comparison`: before/after or tension/resolution, split axis, shared transition rail.

Each vector template must define:

- Slots and maximum text density.
- Fixed layout zones and safe margins.
- Allowed icon/decor roles.
- SVG parts that can animate.
- Disallowed uses.
- Snapshot acceptance rules.

Do not let the LLM freely invent SVG geometry for production frames. It may choose and fill approved templates.

## Motion Primitives

Use motion primitives as the legal animation vocabulary.

The first set:

- `maskReveal`: reveal a title, claim, subject, or CTA through a mask.
- `pathDraw`: draw a connector, underline, route, signature, proof trace, or logo stroke.
- `clipWipe`: move between scenes using a clipPath or mask edge.
- `staggerText`: reveal a short keyword chain while preserving readable holds.
- `numberCount`: animate a data value with a crisp proof lock.

Every primitive must include:

- Semantic use cases.
- Required selectors.
- Required timing fields.
- GSAP property guidance.
- Snapshot midpoint requirements.
- Rejection tests.

Avoid primitives that exist only because they look exciting.

## Selection Rules

The project needs selection rules, not a bigger effects menu.

- Use `maskReveal` when the concept is disclosure, reveal, proof, or emergence.
- Use `pathDraw` when the viewer should follow a route, process, trace, signature, connection, or proof line.
- Use `clipWipe` when one scene physically replaces another through an axis, rail, frame, or window.
- Use `staggerText` only for short keyword chains. Do not stagger dense paragraphs.
- Use `numberCount` only when a number is the proof object. Do not count decorative numbers.

If two primitives could work, choose the one with the clearer semantic role and lower visual noise.

## Layout Engine Requirements

Chinese text must be measured in the browser before render.

Required checks:

- Text bounding box stays inside `textRect`.
- Optical vertical center is within the configured tolerance.
- Title tier matches line count and character count.
- Mixed Chinese/English terms do not overflow.
- CTA and support text stay above `safeBottomY`.
- Motion paths do not move readable text through unsafe top, right, or bottom zones.

Markdown layout contracts are not enough. Final implementation needs measured geometry.

## Render Validation

Render validation must inspect frame output, not only files.

At minimum, capture:

- First frame.
- Each hero frame.
- Each transition midpoint.
- Each data/proof lock.
- CTA lock.

Reject the production if:

- Important text is clipped, off-center, or outside safe zones.
- A transition midpoint is blank or visually accidental.
- Motion is only opacity plus y-position for all important beats.
- SVG exists only as decoration and does not carry structure.
- Icons or decorative marks do not have a semantic role.
- The video loses no important meaning when reduced to screenshots.

## 100-Point Design Engineering Gate

Use this score before final delivery:

| Category | Points |
| --- | ---: |
| Scene schema filled with valid slots, layout contracts, and timing | 15 |
| Approved vector templates used without ad hoc SVG geometry | 15 |
| Chinese text measurement and safe-zone checks pass | 20 |
| Motion primitives selected by semantic rules | 15 |
| Mask/clipPath/path/SVG structure participates in transitions | 15 |
| Browser snapshots inspect hero frames and transition midpoints | 15 |
| Batch repeatability is preserved through structured data | 5 |

Below 90 blocks final delivery. Below 75 means the project is still a prompt-driven draft.
