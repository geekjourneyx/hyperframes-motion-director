# Production Workflow

This workflow turns a vague ad request into a reviewable HyperFrames production. Follow it in order for new videos. For edits, change only the affected stage.

## 1. Intake

Capture the minimum viable production brief:

- Goal: what should the viewer do after watching?
- Audience: who is this for?
- Platform: YouTube, Shorts, LinkedIn, landing page hero, paid ad, internal demo.
- Aspect ratio and resolution: default to 16:9 1920x1080 unless the platform implies otherwise.
- Duration: default to 10-15 seconds for promo/kinetic typography.
- Product or offer: what is being promoted?
- Proof: what can be truthfully claimed?
- Style: examples include Apple-like, luxury, high-energy social, technical, cinematic, founder-led, SaaS clean.
- Assets: logo, screenshots, product footage, audio, fonts, brand colors.
- Hard constraints: required text, forbidden claims, legal copy, language, accessibility.

When details are missing, write assumptions instead of stalling. Ask only if the missing detail changes the whole production.

## 2. Creative Brief

The brief is the production contract. It should be concrete enough that another agent could continue the work without guessing.

Avoid vague goals such as "make it premium." Translate them:

- Premium means fewer elements, stronger type scale, slower camera movement, controlled contrast, and longer holds.
- High energy means faster cuts, stronger hits, shorter copy, and sharper transitions.
- Technical means explicit data, grids, monospace accents, and controlled reveal logic.

## 3. Design System

The design system prevents style drift.

Define:

- Background and foreground color.
- Accent color and whether gradients/glows are allowed.
- Display and body typography.
- Safe margins.
- Layout grid or placement logic.
- Component patterns such as title card, product frame, proof stat, and CTA.
- Motion personality.
- Do and don't rules.

If the user's product already has a brand system, respect it. If not, choose a restrained default and document the choice.

## 4. Script

For ads, script is compression. Prefer fewer words with more visual force.

Default short ad structures:

```text
10s: Hook -> Reveal -> Proof -> CTA
15s: Hook -> Tension -> Reveal -> Proof -> CTA
30s: Pattern interrupt -> Problem -> Reveal -> Feature montage -> Outcome -> CTA
```

For no-voiceover videos, script means screen text and timing. Every beat should have one job.

## 5. Storyboard

The storyboard is where direction happens. Do not skip it.

Every beat should specify:

- Start and end time.
- Main message.
- Hero frame timestamp.
- Layout and hierarchy.
- Motion.
- Transition out.
- Audio/rhythm note.
- Quality risk.

The hero frame is the timestamp where the scene best communicates its idea. If that frame is weak as a still image, the scene is not ready for animation.

## 6. Beat Map

Use `BEAT_MAP.json` when timing matters.

Include:

- FPS.
- Duration.
- Beat/hit timestamps.
- What should happen on each hit.
- Optional narration word timings.

Do not pretend automatic audio analysis has happened unless it actually has. Manual hit maps are acceptable for MVP work.

## 7. Static Build

Build static scene layouts before animation.

Check:

- Copy is legible.
- Visual hierarchy is obvious.
- Safe margins hold.
- The composition does not depend on motion to make sense.
- Product or brand appears with enough weight.

## 8. Motion Build

Add animation only after static layouts are strong.

Motion should:

- Order attention.
- Clarify cause and effect.
- Reinforce audio hits.
- Transition between ideas.
- Avoid decorative noise.

## 9. Validate

Run HyperFrames checks or the closest available substitute:

```bash
npx hyperframes doctor
npx hyperframes lint
npx hyperframes validate
npx hyperframes inspect
npx hyperframes snapshot <composition> --at <times>
```

For dense videos, snapshot hero frames and transition frames. A video can render while still failing visually; snapshots catch this earlier.

## 10. Render And Review

Render a draft before final:

```bash
npx hyperframes render --quality draft --output renders/draft.mp4
npx hyperframes render --quality standard --output renders/review.mp4
```

Use Docker/high quality for final delivery if available and appropriate.

Finish with `REVIEW_REPORT.md`:

- What was produced.
- Which checks passed.
- Which checks could not run.
- Watch notes by time range.
- Remaining risks.
- The next best edit.

## Editing Protocol

When revising, do not rewrite the whole composition unless the user asks for a new direction.

Map feedback to the smallest change:

- "Make it punchier" usually means timing, transition, or copy density.
- "More premium" usually means less clutter, stronger type, longer holds, fewer effects.
- "More clear" usually means script or hierarchy.
- "The product gets lost" means layout, contrast, or product scale.
- "Music doesn't hit" means beat map and timeline positions.

After revising, rerun validation relevant to the changed layer.
