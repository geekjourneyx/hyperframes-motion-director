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

Avoid ordinary illustration, ecommerce banner layout, icon piles, generic neon tech, multicolor palettes, busy collage, decorative particles, and explanatory diagrams.

## Metaphor First

Extract the underlying idea before choosing imagery:

- Core viewpoint.
- Largest conflict.
- Emotional center.
- Keyword to amplify.
- Visual metaphor.

The metaphor must be legible without labels. If the viewer needs explanatory icon labels to understand the frame, the frame is too literal or too noisy.

## Source Text To Visuals

Do not design from an asset pack first. Design from the source text, product mechanism, and proof claims first.

Before implementation, write a visual lexicon:

- Exact source phrases that deserve visual treatment.
- Nouns/entities that can become objects, surfaces, chips, cards, marks, or stages.
- Verbs/actions that can become motion, state changes, routes, stamps, locks, reveals, or handoffs.
- Numbers/modules/metrics that can become proof moments.
- One motif and three to five component families that repeat across scenes.
- A rejection list for attractive but generic visuals.

Large text can be a hook, but large text boxes cannot be the default substitute for visual design. Replace paragraphs with product surfaces, object systems, kinetic keywords, proof fragments, chips, or diagrams. If a still frame cannot reveal what source material inspired it without reading a paragraph, the frame is visually generic.

## Visual Objects

Visual objects replace words, direct the eye, or make the process believable.

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

## Support Assets

Support assets are the production form of visual objects: generated bitmaps, supplied crops, SVG marks, code-generated masks, or motion accents used by the renderer. They may improve cinematic quality only when they remain subordinate to the dominant idea.

Use support assets for:

- A recurring symbol or anchor that carries the metaphor.
- Texture, haze, light falloff, shadow plate, material detail, or proof-safe crop that makes the frame tactile.
- Mask, matte, glint, trace, rail, path, or transition plate that gives motion a physical bridge.
- Product/UI fragment, data object, or evidence crop when the beat needs proof.
- Minimal semantic glyphs when they compress meaning without explaining the frame.

Reject support assets when:

- They fill empty space without changing meaning.
- They form an icon pile, diagram, or second visual language.
- They compete with title, symbol, product, or CTA.
- Their lighting, texture, perspective, or contrast does not match the scene.
- Their motion can be removed without changing attention, reveal, proof, or transition.
- They enter `textRect`, bottom platform overlays, or other declared safe zones.

## Typography And Layout

- Default output format is Simplified Chinese vertical promotional video: 9:16, `1080x1920`, with platform-safe top and bottom zones.
- For text over or near background imagery, choose a layout contract before image generation. Use `references/text-over-background-layout.md`.
- Use one huge title, one quiet support line, and one CTA/brand lockup.
- Declare the first eye target for every hero frame. Hook text, emotional keywords, and central claims usually own the center or upper-center attention zone. Use lower-half copy for CTA/proof holds or subject-dominant frames.
- Default maximums: title 1-2 lines, support text 1-2 lines, CTA 1 line, one proof/stat cluster.
- For Chinese copy, use fewer characters per beat, intentional line breaks, larger type, and stronger contrast than horizontal desktop layouts.
- Compress user content into the smallest readable claim. A beat should carry one idea instead of a source paragraph.
- Use fixed font sizes per breakpoint. Avoid viewport-width font scaling.
- Default letter spacing is `0`; tracking is allowed only for small all-caps labels.
- Set max width, max lines, line-height, and overflow behavior for every text block.
- Long words, mixed Chinese/English copy, subtitles, and CTA labels must stay inside their containers.
- Keep safe margins platform-specific: larger center-safe zones and stronger bottom protection for 9:16, calmer bottom spacing for 16:9.
- Keep CTA, subtitles, proof notes, support lines, and brand lockups above the declared safe bottom boundary.
- Keep small text away from right-side short-video controls and top platform UI unless the delivery surface is known to be clean.
- Use no more than two type families unless brand assets require it. Avoid default-looking display typography when the title is the hero.

## Background Images

- The background must either carry meaning, create spatial depth, ground the product, or disappear behind the message.
- The background must match a declared layout contract with text rectangle, subject rectangle, quiet text zone, and crop-safe subject zone.
- Reserve a quiet text zone in the image crop. Type should not sit on high-frequency texture, bright edges, faces, product seams, or accidental tangents.
- Use vignette, mask, blur, shadow plate, darkening, or desaturation locally behind text before considering a card.
- Generated images should avoid baked-in text, fake UI, fake logos, labels, explanatory icons, watermarks, and random decoration unless specifically required.
- Each Codex Image Gen asset needs one declared role, target scene, standard ratio, focal subject position, quiet text zone, crop-safe region, and accepted local path.
- Inspect generated images before motion work. Regenerate or crop when busy detail, bright edges, faces, product seams, fake UI, or accidental text enters the quiet text zone.
- More images are not better, and fixed counts are not direction. Generate one independent vertical background per declared visual world. Merge worlds that genuinely share space and story job; split them when reuse would turn the film into text over wallpaper.
- Derive transparent foreground components from the accepted source-driven object inventory. Use multiple sheets or supplemental separate hero generations when one sheet would crowd the assets or reduce usable resolution.

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
- Every transition needs a midpoint that can be inspected as a designed frame.

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
- One signature motion moment per video is enough; too many special elements weaken the frame.
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
- The first-frame or hero-frame dominant visual mass is accidentally off-center, clipped, or balanced only by hidden/offscreen elements.
- Text overlaps, clips, shrinks unpredictably, or falls outside safe margins.
- The work defaults to 16:9, English copy, or desktop-style density without a user or platform reason.
- It is only background plus text when the concept needs a product, process, proof, or memory object.
- It uses generic office, AI, productivity, dashboard, paper, or desk assets that are not mapped to source phrases, nouns, verbs, numbers, or product states.
- It has many visual components but no shared motif, component family system, or source-text mapping.
- Large paragraph cards or oversized text boxes carry beats that should have been converted into objects or proof surfaces.
- It claims a visual asset system while `assets/images` has only placeholders, or every beat uses the same dark stage with text and translucent cards.
- Added visual objects are generic decoration, not part of the story.
- The first readable frame appears too late.
- The metaphor is surface-level or needs labels.
- All elements move at once, motion repeats the same entrance pattern, or important text never settles.
- It feels like PPT: static cards, repeated fade-ups, lower-third explanations, empty black fades, and no text transition or scene bridge.
- A text/icon transition promo has no keyword chain, no active action-object chain, no direction map, or no relay continuity between adjacent beats.
- The video passes render checks but fails still-frame review.
