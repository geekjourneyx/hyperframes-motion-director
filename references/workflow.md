# Production Workflow

This workflow turns a vague motion-video request into a reviewable HyperFrames production. Follow it in order for new videos. For edits, change only the affected stage.

The default creative direction is a Chinese-first vertical promotional film with black-background cinematic metaphor. Do not draw the surface topic. Extract the essence of the article, theme, product, or argument, then build a restrained symbol that carries the point.

New videos need a background stage by default. It can be generated, supplied, or pure code, but any exception must be written in the brief. The background is not decoration; it creates space, carries metaphor, protects text readability, or grounds the product.

For text over or near background imagery, use `references/text-over-background-layout.md`. Choose a candidate layout strategy before image generation, then lock the final per-beat layout contract after generated or supplied imagery is inspected. The final contract owns image ratio, text rectangle, subject rectangle, quiet text zone, title tier, mobile safe zones, and motion bounds.

For motion craft, use `references/motion-craft.md`. Static hero frames are necessary, but they are not enough. The finished piece must define where attention starts, how text moves, how scenes bridge, and which CSS/SVG/GSAP devices make it feel like motion rather than slides.

For text/icon transition references, use kinetic text relay as the default structure. This means the film is built from a keyword chain, small action objects, directional pushes/wipes/scans, readable holds, and transition midpoint snapshots. The key question is not "what does each card say?" but "how does one word physically hand attention to the next?"

New video work is two-phase: first produce a brief/design proposal and wait for user confirmation; only then produce images, HyperFrames source, snapshots, renders, and review artifacts.

## 1. Intake

Capture the minimum viable production brief:

- Source article, theme, or product idea.
- Goal: what should the viewer do after watching?
- Audience: who is this for?
- Language: default to Simplified Chinese promotional copy unless the user explicitly asks for another language.
- Platform: default to vertical social video, such as Douyin / TikTok / Reels / Shorts, unless the prompt names a different surface.
- Aspect ratio and resolution: default to 9:16 1080x1920. Use 16:9 or other sizes only when the user, platform, or delivery surface clearly requires it.
- Duration: default to 10-15 seconds for cinematic promotional motion video or kinetic typography.
- Product or offer: what is being promoted?
- Proof: what can be truthfully claimed?
- Style: default to black cinematic metaphor unless the user explicitly overrides it.
- Assets: logo, screenshots, product footage, audio, fonts, brand colors.
- Hard constraints: required text, forbidden claims, legal copy, language, accessibility.

When details are missing, write assumptions instead of stalling. Ask only if the missing detail changes the whole production.

## 1.5. Essence Extraction

Before design, extract:

- Core viewpoint.
- Largest conflict.
- Emotional center.
- The keyword that deserves visual amplification.
- A visual metaphor that can carry the video.

Translate abstract meaning into one restrained visual symbol:

- AI replacement -> erased human silhouette.
- Anxiety -> a thin line about to snap.
- Time -> countdown suspended in darkness.
- Growth -> micro-light inside a crack.
- Information overload -> data fragments pulled into a black void.
- Long-termism -> a single distant lamp.
- Platform migration -> black obelisk or data tower.
- Automation -> documents entering a silent machine.

Reject literal surface drawings unless the user explicitly asks for them.

## 2. Brief Design Proposal

Before any implementation, produce `BRIEF_DESIGN_PROPOSAL.md` or the equivalent response structure:

- Essence and metaphor.
- Structure choice.
- Language, platform, aspect ratio, pixel size, duration, FPS, safe margins.
- Image generation decision, including default background image role or the explicit reason it is not needed.
- Typography, layout, overflow handling, and mobile crop handling.
- Motion plan and risk gates.
- Background text layout plan: candidate layout strategy, likely text/subject relationship, title tier, mobile safe-zone risks, and regenerate/recrop trigger.
- Attention map: first eye target, center-impact decision, and rationale for center/upper-center/side/lower-safe text.
- Motion craft plan: camera behavior, kinetic typography, text transition style, SVG/CSS structure, GSAP timeline structure, signature motion moment, and anti-PPT risk.
- Kinetic text relay plan when relevant: keyword chain, action-object chain, directional transition map, relay object, readable holds, transition midpoint snapshots, target kinetic relay score of 100, and no-delivery threshold below 90.

Stop here and ask for confirmation. Do not generate images or write composition code until the user confirms.

## 3. Design System

The design system prevents style drift.

Define:

- Background and foreground color. Default to `#050505`, white/gray, and restrained warm gold.
- Accent color and whether any warm rim glow is allowed. Avoid colorful gradients by default.
- Display and body typography.
- Safe margins.
- First eye target and center-impact policy for hook, central claim, proof, and CTA frames.
- Layout grid or placement logic.
- Background image system: role, crop, focal subject, quiet text zone, contrast treatment, and local asset path plan.
- Background text layout system: default layout strategies, allowed final contract variants, image ratios, text rectangles, subject rectangles, title tiers, mobile safe zones, motion bounds, and regenerate/recrop triggers.
- Text-over-image rules: where type may sit, how the image will be darkened/blurred/desaturated behind text, and what crop is forbidden.
- Component patterns such as title card, product frame, proof stat, and CTA.
- Motion personality and motion budget.
- Motion craft system: camera movement, kinetic typography, text transitions, SVG/CSS layers, GSAP labels, and scene bridges.
- Kinetic text relay system when relevant: keywords, action objects, direction vocabulary, transition handoffs, midpoint snapshots, and scorecard target.
- Do and don't rules.
- The central metaphor symbol and how it is lit.
- Any generated image assets needed before HyperFrames composition.

If the user's product already has a brand system, respect it only where it does not destroy the requested cinematic metaphor. If not, use the strict house style and document the choice.

## 4. Storyboard And Copy

For short motion videos, script is compression. Put copy directly in the storyboard so text, timing, layout, and motion stay together.

Default short motion structures:

```text
10s: Hook -> Tension -> Metaphor Reveal -> CTA
15s: Hook -> Tension -> Metaphor Reveal -> Proof -> CTA
30s: Pattern interrupt -> Conflict -> Metaphor Reveal -> Proof -> Outcome -> CTA
```

For no-voiceover videos, script means screen text and timing. Every beat should have one job.

For kinetic text relay videos, script is a chain of memory words. Keep the copy short enough that each word can receive a designed action. Prefer 4-8 beats such as `Hook word -> product action -> proof word -> outcome word -> CTA` over explanatory sentences.

Choose structure by material:

- Center symbol for trends, insight, AI, platform, or philosophy.
- Huge title for conflict, suspense, emotion, or sharp viewpoint.
- Person anchor for tutorial, interview, personal brand, or methodology.
- Huge number for growth, milestone, or data shock.

## 5. Storyboard Detail

The storyboard is where direction happens. Do not skip it.

Every beat should specify:

- Start and end time.
- Main message.
- First eye target and whether the text should own center attention.
- Hero frame timestamp.
- Metaphor role.
- Layout and hierarchy.
- Layout contract, including textRect, subjectRect, safeBottomY, title tier, and motion bounds.
- Motion.
- Text transition: entry, readable lock, emphasis, exit, and bridge.
- Kinetic relay details when relevant: old word exit, new word entry, action object, transition direction, relay handoff, and midpoint snapshot.
- CSS/SVG/GSAP device used for motion structure.
- Transition out.
- Audio/rhythm note.
- Quality risk.

The hero frame is the timestamp where the scene best communicates its idea. If that frame is weak as a still image, the scene is not ready for animation.

## 6. Visual Asset Planning

If the metaphor needs generated bitmap source material, plan images before implementation. For new video work, default to one background stage unless a pure-code or supplied-asset exception is written in the brief.

- Background stage: atmosphere, depth, light, metaphor, or product context.
- Center symbol.
- Background texture or atmosphere.
- Optional person/object anchor.
- Default vertical key visual for 9:16 work.
- Horizontal key visual only when the brief documents a 16:9 target.

Generated images should be sparse. Avoid baked-in text unless exact text is required. Compose final titles, subtitles, proof notes, masks, crops, parallax, focus pulls, and timing in HyperFrames.

Each planned/generated image must specify:

- Role: stage, symbol, texture, anchor, or transition plate.
- Source: supplied, official, generated, or fallback pure-code.
- Aspect ratio and target size.
- Layout contract and image ratio.
- Focal subject location.
- Quiet text zone.
- Crop-safe subject zone, text rectangle, and subject rectangle.
- Safe bottom/right/top platform boundaries for any overlaid text.
- Local output path.
- Forbidden content: no text, fake logos, icons, labels, diagrams, decorative clutter, or watermark unless required.

Use Codex Image Gen by default after user confirmation when a generated bitmap is needed. Do not reference project-bound generated images until they have been moved into the project asset folders.

## 7. Optional Beat Map

Use `BEAT_MAP.json` when timing matters.

Include:

- FPS.
- Duration.
- Beat/hit timestamps.
- What should happen on each hit.
- Optional narration word timings.

Do not pretend automatic audio analysis has happened unless it actually has. Manual hit maps are acceptable for MVP work.

## 8. Static Build

Build static scene layouts before animation.

Check:

- Copy is legible.
- Chinese copy uses deliberate line breaks, large type, and low character count per beat.
- Visual hierarchy is obvious.
- Background image has one clear role and is not generic wallpaper.
- Text is placed on a planned quiet zone, not over high-frequency details.
- The selected layout contract matches the message and image shape.
- The image ratio is standard and matches the intended placement.
- The text rectangle groups title, support, CTA, subtitles, and proof notes into a readable hierarchy.
- The subject rectangle keeps faces, product edges, UI detail, and symbols out of unsafe crop areas.
- Safe bottom/right/top boundaries keep CTA, subtitles, support lines, and proof notes clear of vertical platform overlays.
- Local contrast treatment is present where text crosses imagery.
- Safe margins hold.
- Vertical platform overlay zones are respected, especially bottom UI / CTA collision risk.
- Text has max width, max lines, explicit overflow behavior, and stable breakpoints.
- Long words, mixed Chinese/English copy, CTA labels, and subtitles do not escape their containers.
- The composition does not depend on motion to make sense.
- Motion paths preserve the quiet zone and do not drag readable copy through unsafe mobile UI zones.
- Transitions use the image subject, text axis, mask, light direction, or camera move as a bridge; they are not separate decorative effects.
- Product or brand appears with enough weight.
- The metaphor can be understood without explanatory icon labels.
- The frame obeys the house style: black, sparse, cinematic, white/gray/warm gold.
- No ordinary illustration, ecommerce banner, icon pile, generic neon tech, multicolor palette, or busy collage appears.

## 9. Motion Build

Add animation only after static layouts are strong.

Motion should:

- Order attention.
- Reveal the metaphor.
- Clarify cause and effect.
- Reinforce audio hits.
- Transition between ideas.
- Avoid decorative noise.
- Make the work impossible to reduce to static screenshots without losing meaning.

For kinetic text relay promos, at least half of the scene changes should use directional or structural transitions: push left/right, push up/down, crop wipe, scan pass, split, compression, expansion, type-on handoff, or object-led cut. Fade may support a transition, but should not be the main transition language.

Motion budget:

- One primary motion idea per scene.
- One optional secondary motion for atmosphere or focus.
- Background motion should be slow push, parallax, focus pull, or light sweep only.
- Main text should settle before it needs to be read.
- Important reveals need a still hold, not continuous drift.
- Scene transitions should overlap or share an anchor; do not cut through empty black unless the black frame is the point.

Motion craft requirements:

- Build a labeled GSAP master timeline for multi-scene work.
- Use CSS3/SVG devices for structural reveals when appropriate: masks, clip paths, scan paths, underlines, frames, connectors, or perspective layers.
- Give important text a real transition pattern, not only opacity and y-position.
- Let hook or amplified keyword text occupy center or upper-center impact when it is the main subject.
- Reserve lower-safe placement for CTA, proof notes, or subject-dominant frames.
- Include at least one signature motion moment that belongs to the metaphor.
- Score text/icon transition promos with the kinetic relay scorecard from `references/motion-craft.md`; target 100, below 90 blocks final delivery, and below 70 requires revision before render.

## 10. Validate

Run HyperFrames checks or the closest available substitute:

```bash
npx hyperframes doctor
npx hyperframes lint
npx hyperframes validate
npx hyperframes inspect
npx hyperframes snapshot <composition> --at <times>
```

For dense videos, snapshot hero frames and transition frames. A video can render while still failing visually; snapshots catch this earlier.

## 11. Render And Review

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
