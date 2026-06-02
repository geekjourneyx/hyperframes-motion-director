# HyperFrames Stability

HyperFrames rendering is frame-based and should be deterministic. A composition that previews once is not necessarily safe to render. Build timelines so any frame can be captured independently and consistently.

## Deterministic Contract

For render-critical visuals:

- Use fixed width, height, fps, and duration.
- Use local assets or assets guaranteed to exist before rendering.
- Use seeded randomness if randomness is needed.
- Use explicit timeline times.
- Build timelines synchronously before rendering starts.
- Keep media timing controlled by HyperFrames/runtime expectations.

## GSAP Pattern

Use paused timelines:

```js
const tl = gsap.timeline({ paused: true });

tl.from(".title", {
  y: 80,
  opacity: 0,
  duration: 0.8,
  ease: "expo.out"
}, 0.2);

window.__timelines = window.__timelines || {};
window.__timelines["root"] = tl;
```

Prefer absolute position parameters so timing can be reviewed and adjusted:

```js
tl.to(".product", { scale: 1, opacity: 1, duration: 0.7 }, 2.4);
tl.to(".stat", { y: 0, opacity: 1, duration: 0.5 }, 5.8);
```

## Avoid

Do not use these for main animation timing:

- `Date.now()`
- Unseeded `Math.random()`
- `setTimeout`
- `setInterval`
- `requestAnimationFrame`
- Asynchronous timeline creation
- Runtime network fetches for required assets
- Infinite repeats such as `repeat: -1`
- Manual `video.play()` or uncontrolled `currentTime` changes

These can make frame capture inconsistent or unavailable when rendering frames out of real-time order.

## Asset Discipline

Before rendering:

- Confirm required images, videos, audio, and fonts exist locally or are vendored.
- Avoid depending on remote fonts at render time.
- Use stable file names.
- Prefer explicit dimensions for images/video containers.
- Include fallbacks only when they preserve layout.

## Validation Commands

Use the installed CLI's syntax. Start with:

```bash
npx hyperframes doctor
npx hyperframes lint
npx hyperframes validate
npx hyperframes inspect
npx hyperframes snapshot <composition> --at <times>
```

If a command fails because of missing dependencies, report the blocker and continue with checks that can run.

## Snapshot Strategy

Capture:

- First frame.
- Each scene's hero frame.
- Each transition midpoint.
- CTA lockup.
- Any frame where dense text or product imagery appears.

Snapshots catch layout and readability issues earlier than full review renders.

## Common Failure Diagnosis

- Preview works but render differs: check time-dependent code and asynchronous timeline setup.
- Text cut off: inspect bounding boxes, safe margins, fixed container sizes, responsive font rules.
- Missing image or font: check asset paths and render-time network calls.
- Transition cuts to empty frame: remove premature exit animation or move transition earlier.
- Motion feels random: replace implicit timing with explicit positions and beat-map timestamps.
