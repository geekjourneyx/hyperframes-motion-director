# Motion Craft

Use this reference when a video risks feeling like a slide deck, static poster sequence, or text pasted over a background. The goal is not more motion everywhere. The goal is directed motion: movement that changes what the viewer understands, where they look, and why they keep watching.

## First Principles

A motion video is not a sequence of decorated still frames. It has four moving systems:

- Camera: where the viewer is in the space.
- Light: what becomes important.
- Type: how language arrives, transforms, exits, and leaves memory.
- Transition: how one idea turns into the next without resetting attention.

If only opacity and vertical position change, the work will feel like a PPT export. A frame can be still during its readable hold, but the video around that hold needs spatial movement, typographic behavior, and transition logic.

## Anti-PPT Failure Modes

Reject or revise when:

- Every scene is a centered text block over the same background.
- The only animation is `opacity` plus `y`.
- Transitions are black fades or hard cuts with no shared visual anchor.
- Text appears as completed lines instead of being revealed, assembled, masked, scanned, split, or transformed.
- Background images are static wallpaper with no camera, focus, light, or mask behavior.
- SVG/CSS shapes are absent even when a simple line, mask, frame, grid, path, or underline could carry the transition.
- All beats have the same layout and rhythm.
- The film can be represented as four screenshots without losing much.

## Motion Vocabulary

Use a small set of deliberate motion devices. Pick one signature device for the whole video, then vary it per beat.

### Kinetic Text Relay

Use this vocabulary when the film is driven by text, icons, and fast transitions. The goal is not to show more elements. The goal is to make every word feel acted upon.

Define the chain before implementation:

- Keyword: the word or short phrase that owns the beat.
- Action object: the icon, cursor, waveform, timeline, frame, brush, scan rail, stamp, product tile, or line that gives the keyword a physical behavior.
- Direction: left push, right push, upward lift, downward press, type-on, wipe, scan, split, compression, expansion, orbit, or hard cut.
- Relay: the outgoing word must hand attention to the incoming word through the action object, direction, mask, line, camera move, or sound hit.
- Hold: after the action lands, the word must become readable before the next hit.

Strong examples:

- A waveform grows through "Record" and pushes the word aside to reveal "Edit".
- A timeline strip crosses the center line and becomes the mask that reveals the next title.
- A cursor types the first letters, then the blinking caret becomes a vertical scan line.
- A product tile slides upward, crops the old word, and locks as the frame for the next word.
- A brush stroke reveals the word, then exits as a curved path that pulls in the next word.

Weak examples:

- Each word fades up in the same position.
- Icons appear beside labels but do not move, mask, push, scan, or reveal anything.
- A transition happens through empty black with no visual handoff.
- Every beat uses the same direction, same center position, and same timing.

### Camera And Space

- Slow push into the subject.
- Parallax between background, symbol, type, and dust/grain layers.
- Rack focus or blur-to-sharp reveal.
- 2.5D pan across a generated image or product surface.
- Crop-window move that discovers the subject.

### Light And Material

- Rim-light sweep that reveals the metaphor.
- Gold scan line that also becomes a mask, underline, divider, or CTA guide.
- Volumetric haze drift behind the subject, never over readable text.
- Specular glint on one meaningful edge.
- Vignette or shadow plate that opens and closes with the message.

### Kinetic Typography

- Masked line reveal with `clip-path`, not only opacity.
- Word-level stagger only for the keyword, not every character.
- Split-line handoff where the outgoing word becomes the incoming word's anchor.
- Highlight sweep on one amplified term.
- Text assembly from fragments when the story is about synthesis.
- Type compression/expansion when the story is about pressure or release.
- Baseline slide or vertical wipe when the story is about progress or replacement.
- SVG path text or curved underline only when the path carries meaning.

### SVG And CSS3 Layers

Use SVG/CSS when they can carry structure more crisply than bitmap assets:

- SVG masks for wipes, reveals, circular scans, slash cuts, iris opens, and logo lockups.
- SVG paths for motion trails, timeline arcs, underlines, map routes, scan curves, and proof connectors.
- CSS `clip-path`, `mask-image`, `filter`, `mix-blend-mode`, `transform`, `perspective`, and `will-change` for deterministic visual depth.
- CSS variables for timing, color, spacing, and safe-zone geometry.
- Avoid complex SVG illustrations that become decorative diagrams.

### GSAP Choreography

Use GSAP as the timing engine, not as a pile of isolated effects:

- Build one paused master timeline.
- Use labels for beats: `hook`, `tension`, `reveal`, `proof`, `cta`.
- Use absolute positions or labels so edits are easy.
- Register the timeline for HyperFrames control.
- Animate transforms, opacity, filters, masks, and CSS variables; avoid layout-thrashing properties.
- Keep text still during readable holds.
- Use scene-level timelines only when they are nested into the master timeline.

## Text Transition Rules

Every beat with screen copy must define:

- Entry: how the text arrives.
- Lock: when it becomes still and readable.
- Emphasis: which word or line receives the visual hit.
- Exit: how it leaves without dragging through unsafe zones.
- Bridge: what visual element connects it to the next beat.

Bad: `title fades up`.

Better: `title reveals through a left-to-right mask; README receives a gold scan highlight; the scan line exits as the next beat's divider`.

For kinetic text relay promos, also define:

- Old word exit direction.
- New word entry direction.
- Action object that bridges them.
- Transition midpoint snapshot timestamp.
- Whether fade is support or the main transition. If fade is the main transition, redesign unless deliberate stillness is the concept.

## Short Vertical Hard Gates

For promos 20 seconds or shorter:

- One hook or core-viewpoint frame must use center or upper-center text impact unless a stronger visual subject clearly owns that zone.
- The first 0-2 seconds must name the first eye target, biggest word/object, and scroll-stop motion event.
- Three or more beats using the same textRect, same entry, and same rhythm is a PPT risk and should trigger storyboard revision.
- At least one important text moment must use a real transition device: mask, scan, split, compression, assembly, path handoff, or an equally specific alternative.
- A report that says "pass" while all important text lives in the lower half is too lenient unless every center zone is owned by a stronger subject.
- If adjacent frames show only opacity/position changes, add stronger motion craft or explain why stillness is the concept.

## Rhythm Shape

For short vertical promos:

- First readable hook should appear by 0.8-1.2s.
- Use a strong movement before or during the hook, then stillness.
- Alternate high-motion and low-motion beats.
- Give the proof beat a crisp mechanical rhythm.
- Give the CTA the calmest hold in the video.
- Do not let all beats last the same visual length unless the repetition itself is the concept.

## Review Gate

Score the video harshly:

- 0-30: static slides, decorative fades, no motion idea.
- 31-55: readable but PPT-like; weak transitions and repeated entrances.
- 56-75: coherent motion, but no memorable signature moment.
- 76-90: strong typography, spatial movement, and meaningful transitions.
- 91-100: one clear cinematic idea, one memorable motion device, every transition earns its place.

Before delivery, inspect still frames and moving frames. A good still frame is necessary, but not sufficient. If the video loses little when reduced to screenshots, it needs stronger motion craft.

## Kinetic Relay Scorecard

Use this 100-point score when the requested result is a text/icon transition promo:

- 20: first 0-2 seconds have a clear largest word/object and a real scroll-stop motion event.
- 20: important words are revealed, pushed, typed, scanned, compressed, split, or otherwise acted upon.
- 20: icons or objects participate in transitions instead of sitting as decoration.
- 20: adjacent beats have relay continuity through direction, object, mask, line, cursor, scan, or camera movement.
- 10: rhythm alternates between motion hits and readable holds.
- 10: brand/CTA resolves cleanly and feels like the end of the chain.

Interpretation:

- 100: target state; ready for polished render if snapshots and readability pass.
- 90-99: usable draft only if the report names the missing points and the next edit; do not call it perfect.
- 70-89: promising, but revise the weakest transition or rhythm beat.
- 60-69: rebuild the transition map before render.
- Below 60: still PPT-like; do not call it a motion promo.
