# Visual Standard

Use this as the single visual reference for proposal, layout, motion, and review.

## Style Lock

- Background: `#050505`.
- Palette: white, gray, restrained warm gold.
- Mood: low-brightness cinematic, high contrast, large negative space.
- Texture: subtle paper grain, shallow depth of field, volume haze, thin rim light, local metallic highlights.
- Composition: one dominant symbol or phrase per frame.
- Background imagery: default for new videos unless a supplied-asset or pure-code exception is documented. It must function as stage, symbol, texture, anchor, or transition plate.
- Visual objects: use a small set of project-specific props, marks, frames, stamps, brackets, rails, or texture pieces only when they compress meaning, guide attention, prove a claim, or create a memory hook.

Do not use ordinary illustration, ecommerce banner layout, icon piles, generic neon tech, multicolor palettes, busy collage, decorative particles, or explanatory diagrams.

## Metaphor First

Do not draw the surface topic. Extract:

- Core viewpoint.
- Largest conflict.
- Emotional center.
- Keyword to amplify.
- Visual metaphor.

The metaphor must be legible without labels. If the viewer needs explanatory icon labels to understand the frame, the frame is too literal or too noisy.

## Visual Objects

Visual objects are not decoration. They are small pieces of direction that replace words, direct the eye, or make the process believable.

Use:

- One primary object system per short video, such as source paper, film frame, product surface, lens, rail, scan path, artifact, map route, or timeline.
- 1-3 functional mark types, such as a confirmation stamp, inspection bracket, proof tick, crop guide, scan rail, underline, or lockup mark.
- Sparse texture pieces only when they belong to the metaphor, such as paper fragments for documents, dust for atmosphere, or light traces for scanning.

Avoid:

- Icon clusters, per-line icons, generic checkmarks, rockets, sparkles, lightning, AI chips, fake dashboards, and decorative badges.
- Objects that require text labels to make sense.
- Objects that duplicate the copy instead of reducing it.
- Multiple object languages in one 20s vertical promo.

Before implementation, run the removal test: if deleting the object changes nothing about comprehension, attention, trust, or memorability, remove it.

## Typography And Layout

- Default output format is Simplified Chinese vertical promotional video: 9:16, `1080x1920`, with platform-safe top and bottom zones.
- For text over or near background imagery, choose a layout contract before image generation. Use `references/text-over-background-layout.md`.
- Use one huge title, one quiet support line, and one CTA/brand lockup.
- Declare the first eye target for every hero frame. Hook text, emotional keywords, and central claims should usually own the center or upper-center attention zone. Do not demote important copy to the lower half unless the subject needs the center or the beat is a CTA/proof hold.
- Default maximums: title 1-2 lines, support text 1-2 lines, CTA 1 line, one proof/stat cluster.
- For Chinese copy, use fewer characters per beat, intentional line breaks, larger type, and stronger contrast than horizontal desktop layouts.
- Compress user content into the smallest readable claim. A beat should carry one idea, not a paragraph from the source.
- Use fixed font sizes per breakpoint. Do not scale font size with viewport width.
- Default letter spacing is `0`; tracking is allowed only for small all-caps labels.
- Set max width, max lines, line-height, and overflow behavior for every text block.
- Long words, mixed Chinese/English copy, subtitles, and CTA labels must not escape their containers.
- Keep safe margins platform-specific: larger center-safe zones and stronger bottom protection for 9:16, calmer bottom spacing for 16:9.
- Keep CTA, subtitles, proof notes, support lines, and brand lockups above the declared safe bottom boundary.
- Keep small text away from right-side short-video controls and top platform UI unless the delivery surface is known to be clean.
- Use no more than two type families unless brand assets require it. Avoid default-looking display typography when the title is the hero.

## Background Images

- The background must either carry meaning, create spatial depth, ground the product, or disappear behind the message.
- The background must match a declared layout contract with text rectangle, subject rectangle, quiet text zone, and crop-safe subject zone.
- Reserve a quiet text zone in the image crop. Type should not sit on high-frequency texture, bright edges, faces, product seams, or accidental tangents.
- Use vignette, mask, blur, shadow plate, darkening, or desaturation locally behind text before considering a card.
- Generated images must not include baked-in text, fake UI, fake logos, labels, explanatory icons, watermarks, or random decoration unless specifically required.
- More images are not better. Use one strong image stage for short motion videos; use 2-4 only when the story truly changes visual worlds.

## Motion

Motion should reveal meaning, not decorate the frame.

Use slow push, subtle parallax, focus pull, rim-light reveal, mask wipe, clip reveal, SVG path motion, CSS masks, scan-line bridges, and kinetic typography. Avoid repeated `y + opacity` entrances, empty fades between scenes, restless motion, and decorative effects.

Motion, background, type, and transition are one system. Background movement must preserve the quiet zone, text must land inside its rectangle before reading time, and transitions must bridge meaning through subject, axis, mask, light, or camera direction.

Text motion must have a transition idea: entry, readable lock, emphasis, exit, and bridge. The most important word should not merely appear; it should be revealed, assembled, scanned, split, compressed, expanded, or handed off in a way that matches the story.

For text/icon transition promos, use a kinetic relay standard:

- The viewer remembers a keyword chain, not paragraphs.
- Each major word gets one action object or visual behavior.
- Icons and objects must push, mask, scan, type, crop, reveal, compress, split, or hand off the next word.
- Direction changes should be designed: left/right push, up/down push, scan, wipe, type-on, crop, or hard cut with a visible relay.
- Empty black fades are allowed only for deliberate silence or final release.
- Every transition needs a midpoint that can be inspected as a designed frame, not an accidental blur.

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
- A good video should lose something important when reduced to screenshots. If screenshots tell the whole story, upgrade the motion craft.

## Review Gate

Reject the work if:

- It skips user confirmation after `BRIEF_DESIGN_PROPOSAL.md`.
- It looks like a banner, infographic, icon cluster, or generic tech poster.
- It has no background-image plan or explicit pure-code/supplied-asset reason.
- It has no layout contract, text rectangle, subject rectangle, title tier, motion bounds, or mobile safe boundary for text-over-background frames.
- The background image is interchangeable wallpaper, fights the text, or needs a card to rescue readability.
- It has more than one dominant message in a frame.
- The first eye target is unclear or the main hook is unnecessarily pushed into the lower half.
- Text overlaps, clips, shrinks unpredictably, or falls outside safe margins.
- The work silently defaults to 16:9, English copy, or desktop-style density when the prompt did not ask for that.
- It is only background plus text when the concept needs a product, process, proof, or memory object.
- Added visual objects are generic decoration, not part of the story.
- The first readable frame appears too late.
- The metaphor is surface-level or needs labels.
- All elements move at once, motion repeats the same entrance pattern, or important text never settles.
- It feels like PPT: static cards, repeated fade-ups, lower-third explanations, empty black fades, and no text transition or scene bridge.
- A text/icon transition promo has no keyword chain, no active action-object chain, no direction map, or no relay continuity between adjacent beats.
- The video passes render checks but fails still-frame review.
