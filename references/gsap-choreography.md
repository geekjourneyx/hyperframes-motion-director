# GSAP Choreography

Use this reference when a HyperFrames production needs premium motion, not just movement. It adapts GSAP Skills guidance for deterministic promo-video rendering.

## First Principles

Premium motion comes from controlled attention over time.

GSAP choreography must decide:

- What appears first.
- What waits.
- What bridges the next scene.
- What becomes still for reading.
- What motion would be missed if the video were reduced to screenshots.

Use GSAP as a timeline engine, not as a pile of independent tweens.

## Timeline Contract

Every implemented composition needs one master timeline.

Required:

- `gsap.timeline({ paused: true, defaults: { duration, ease } })`
- timeline labels such as `hook`, `reveal`, `proof`, `cta`
- position parameters for every important tween
- nested scene timelines only when they are added to the master timeline
- registration to HyperFrames control, usually `window.__timelines`

Avoid chained `delay` values. Use timeline labels and position parameters so the edit is readable and maintainable.

Good pattern:

```javascript
const tl = gsap.timeline({ paused: true, defaults: { duration: 0.6, ease: "power2.out" } });
tl.addLabel("hook", 0)
  .from(".title-mask", { clipPath: "inset(0 100% 0 0)", autoAlpha: 0 }, "hook")
  .to(".accent-path", { strokeDashoffset: 0, duration: 0.8 }, "hook+=0.25")
  .addLabel("proof", 2.4)
  .to(".scene-hook", { autoAlpha: 0 }, "proof-=0.2")
  .from(".proof-number", { y: 32, autoAlpha: 0 }, "proof");
```

## Core Tween Rules

Use:

- `gsap.to()`, `gsap.from()`, and `gsap.fromTo()` intentionally.
- `gsap.set()` for deterministic initial state.
- `autoAlpha` instead of raw opacity when elements should disappear from visibility.
- transform aliases such as `x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`, and `svgOrigin`.
- `immediateRender: false` when multiple `from()` or `fromTo()` tweens affect the same target/property later in a timeline.

Avoid:

- raw `transform` strings when GSAP transform aliases can express the movement.
- layout properties such as `top`, `left`, `width`, `height`, `margin`, or `padding` for motion.
- invalid ease names.
- uncontrolled repeat loops in render timelines.

## Plugin Registration

Register each plugin once before use.

This plugin registration rule is part of the production contract, not a styling preference.

```javascript
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, SplitText, CustomEase);
```

All GSAP plugins are available from the public `gsap` npm package. Do not add private registry or old Club GSAP authentication instructions.

## Premium Promo Primitives

### SplitText

Use SplitText when text itself is the hero.

Use cases:

- large Chinese hook reveal
- word-by-word capability chain
- line-by-line manifesto
- CTA lockup entrance

Rules:

- Split only short, intentional copy.
- Preserve readable holds.
- Revert or clean up split structures when the environment requires it.
- Do not split dense paragraphs.

### DrawSVG

Use DrawSVG for line-based proof and premium accents.

Use cases:

- logo stroke reveal
- underline or scan rail
- route/path/process trace
- inspection bracket
- proof connector

Rules:

- The path must guide attention or prove a relationship.
- Stroke width must match the vector template system.
- A midpoint snapshot must show an intentional partial draw.

### MorphSVG

Use MorphSVG when one idea visibly becomes another.

Use cases:

- problem shape morphs into solution symbol
- rough note becomes clean decision artifact
- scattered fragments become product mark
- old workflow becomes new workflow

Rules:

- Morph only between visually compatible simplified paths.
- Use `shapeIndex` when the morph twists.
- Simplify SVG path complexity before blaming GSAP.
- Do not use morphing as decorative magic.

### MotionPath

Use MotionPath when a visual object should physically carry attention.

Use cases:

- cursor travels along a workflow
- scan dot follows a route
- proof tick follows a connector
- product tile rides a transition rail

Rules:

- Align the moving target to the path when appropriate.
- Use `autoRotate` only when rotation clarifies direction.
- A path follower should hand attention to the next scene, not wander.

### CustomEase

Use CustomEase for one signature motion moment.

Use cases:

- brand reveal snap
- scan settle
- title compression release
- proof lock

Rules:

- Prefer built-in eases for ordinary movement.
- Use one custom curve per video unless the design system requires more.
- Name the custom ease and document what emotional beat it serves.

## Performance

Use performance as part of taste. Jank makes premium motion feel cheap.

Rules:

- Prefer transform aliases and `autoAlpha`.
- Use `will-change` only for elements that actually animate.
- Use stagger instead of many separate tweens with manual delays.
- Do not create hundreds of overlapping tweens.
- Batch layout reads before writes when measuring text.
- Kill or avoid offscreen/inactive animations.

## Reduced Motion

For interactive previews or web surfaces, use `gsap.matchMedia()` and respect `prefers-reduced-motion`.

For rendered videos, document whether reduced-motion is irrelevant because the output is a fixed video file. Do not silently copy web accessibility rules into render timelines where they do not apply.

## Review Gate

Reject GSAP implementation if:

- important tweens are not on the master timeline
- labels are missing
- position parameters are replaced by delay chains
- all reveals use only opacity plus y
- SVG paths, masks, or clips do not participate in transitions
- SplitText is used on dense copy
- plugin usage is undocumented or unregistered
- layout-heavy properties drive motion
- transition midpoint snapshots are blank or accidental
