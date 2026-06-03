# Visual Standard

Use this as the single visual reference for proposal, layout, motion, and review.

## Style Lock

- Background: `#050505`.
- Palette: white, gray, restrained warm gold.
- Mood: low-brightness cinematic, high contrast, large negative space.
- Texture: subtle paper grain, shallow depth of field, volume haze, thin rim light, local metallic highlights.
- Composition: one dominant symbol or phrase per frame.
- Background imagery: default for new videos unless a supplied-asset or pure-code exception is documented. It must function as stage, symbol, texture, anchor, or transition plate.

Do not use ordinary illustration, ecommerce banner layout, icon piles, generic neon tech, multicolor palettes, busy collage, decorative particles, or explanatory diagrams.

## Metaphor First

Do not draw the surface topic. Extract:

- Core viewpoint.
- Largest conflict.
- Emotional center.
- Keyword to amplify.
- Visual metaphor.

The metaphor must be legible without labels. If the viewer needs icon captions to understand the frame, the frame is too literal or too noisy.

## Typography And Layout

- Use one huge title, one quiet support line, and one CTA/brand lockup.
- Default maximums: title 1-2 lines, support text 1-2 lines, CTA 1 line, one proof/stat cluster.
- Use fixed font sizes per breakpoint. Do not scale font size with viewport width.
- Default letter spacing is `0`; tracking is allowed only for small all-caps labels.
- Set max width, max lines, line-height, and overflow behavior for every text block.
- Long words, mixed Chinese/English copy, subtitles, and CTA labels must not escape their containers.
- Keep safe margins platform-specific: larger center-safe zones for 9:16, calmer bottom spacing for 16:9.
- Use no more than two type families unless brand assets require it. Avoid default-looking display typography when the title is the hero.

## Background Images

- The background must either carry meaning, create spatial depth, ground the product, or disappear behind the message.
- Reserve a quiet text zone in the image crop. Type should not sit on high-frequency texture, bright edges, faces, product seams, or accidental tangents.
- Use vignette, mask, blur, shadow plate, darkening, or desaturation locally behind text before considering a card.
- Generated images must not include baked-in text, fake UI, fake logos, labels, explanatory icons, watermarks, or random decoration unless specifically required.
- More images are not better. Use one strong image stage for short ads; use 2-4 only when the story truly changes visual worlds.

## Motion

Motion should reveal meaning, not decorate the frame.

Use slow push, subtle parallax, focus pull, rim-light reveal, mask wipe, or clip reveal. Avoid repeated `y + opacity` entrances, empty fades between scenes, restless motion, and decorative effects.

Typical timing:

- Premium reveal: 0.8-1.6s, `expo.out` or `sine.inOut`.
- Title hold: 0.6-1.2s after entrance.
- Proof/stat hold: 0.8-1.5s.
- CTA hold: 1.0s or more.

Motion budget:

- One primary motion idea per scene.
- One optional support motion for atmosphere, focus, or transition.
- Background motion should be slow and camera-like.
- Text must become still before the viewer needs to read it.
- At least one signature motion moment per video is enough; every element trying to be special looks cheap.

## Review Gate

Reject the work if:

- It skips user confirmation after `BRIEF_DESIGN_PROPOSAL.md`.
- It looks like a banner, infographic, icon cluster, or generic tech poster.
- It has no background-image plan or explicit pure-code/supplied-asset reason.
- The background image is interchangeable wallpaper, fights the text, or needs a card to rescue readability.
- It has more than one dominant message in a frame.
- Text overlaps, clips, shrinks unpredictably, or falls outside safe margins.
- The first readable frame appears too late.
- The metaphor is surface-level or needs labels.
- All elements move at once, motion repeats the same entrance pattern, or important text never settles.
- The video passes render checks but fails still-frame review.
