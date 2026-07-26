---
name: hyperframes-motion-director
description: "Direct and produce Chinese-first cinematic motion videos with HyperFrames. Use this skill when the user wants a rendered promo film, article-to-video piece, product launch film, website-to-video piece, keynote reveal, kinetic typography sequence, text/icon transition promo, music-synced motion graphic, HTML/CSS/SVG/GSAP video, short-form vertical video, or a landing page/product story turned into motion. Default to Simplified Chinese, vertical 9:16, and 1080x1920 unless the user or platform clearly requires another format. The skill enforces a two-phase workflow: brief first, confirmation second, then assets, composition, validation, snapshots, render, and review report."
---

# HyperFrames Motion Director

Use this skill to turn a vague video request into a reviewable HyperFrames production. First produce a concise brief/design proposal. Continue to assets, composition, snapshots, render, and review only after the user confirms the direction.

HyperFrames handles rendering. This skill handles direction, assets, layout, motion planning, and delivery checks.

When the film promotes a concrete product, tool, skill, CLI, app, API, workflow, template library, or creative system, treat the work as a premium product promo, not only a cinematic metaphor short. The video must show product proof: commands, cards, screenshots, output previews, modules, numbers, chips, icons, marks, or workflow states that make the claim visible.

## Core Principle

Work from the final viewing experience backward:

1. What should the viewer remember?
2. What metaphor carries the point?
3. Which image stage gives the frame depth, context, or tension?
4. Which frame proves the visual direction is strong?
5. Which movement makes the viewer keep watching?
6. Which beat carries the hook, reveal, proof, and CTA?
7. Which motion choices guide attention through those beats?
8. Which visual objects compress meaning better than more words?
9. Which validation proves the video will render deterministically?

Start with legible still frames and timing. Write animation code only after the frame plan works.

A strong still frame is a gate. The finished video should lose meaning when reduced to screenshots; otherwise the motion is only presentation polish.

## House Style

Default to one strict style unless the user explicitly overrides it:

- Deep black background `#050505`.
- Minimal cinematic lighting, high contrast, large negative space, low brightness.
- White, gray, and warm gold only. Keep warm gold as a restrained accent.
- Magazine-cover composition: one dominant symbol or phrase, no explanatory clusters.
- Subtle paper grain, shallow depth of field, volume haze, thin rim light, local metallic highlights.
- Text, image, composition, and color must express one point together.
- Default to a generated or supplied background image stage for new videos. It must create depth, metaphor, or product context.

Forbidden by default:

- Ordinary illustration, ecommerce banner composition, icon piles, generic tech dashboards, neon cyberpunk, multicolor palettes, gradient clutter, decorative particles, explain-the-concept diagrams, and busy collage.
- Literal article-surface drawings when a metaphor would be clearer.
- PPT-like sequencing: static title cards, repeated fade-up scenes, identical centered layouts, empty black fades, or text pasted over wallpaper.

## Premium Product Promo Rule

For product, tool, CLI, SaaS, API, skill, template, workflow, or system promos, black cinematic style is only the base layer. It is not enough.

Visual components are mandatory for premium product promos. Do not proceed to implementation with only a background image, big titles, scan lines, and one symbol. That produces a single-note film. A premium promo needs a reusable component library that makes the product feel real.

A product promo with no visual components is blocked. A "visual component" is a visible, reusable product-specific surface with content slots, style rules, state, motion interaction, and a snapshot proof. Generic text boxes, isolated labels, decorative borders, floating lines, background gradients, and unanchored icons do not count.

The film must build a product proof ecosystem:

- Product proof artifacts: commands, UI surfaces, output cards, screenshots, generated examples, module labels, theme stacks, provider chips, numbers, validations, reports, or before/after states.
- Component library: command card, output/draft card, stat block, module chip group, provider chip group, proof card, product frame, anchored route/signal, theme/output stack, CTA badge, or equivalent product-specific surfaces.
- Icon and decorative system: marks, chips, rails, brackets, glows, fragments, panels, shadows, and texture must be named, reusable, and tied to meaning.
- Motion interactions: each major component must reveal a product state change, not only enter the scene.
- Copy ladder: pain -> mechanism -> proof -> confidence -> CTA. If a line could fit any product, rewrite it.

Content-derived product visual component coverage:

- Derive the component count from source phrases, product mechanisms, proof claims, and actions. Do not target a fixed number such as 4, 6, or 12.
- Include a concrete product surface when the claim depends on a real or faithful product state.
- Include taxonomy components only when the source contains modules, providers, features, themes, modes, or statuses.
- Include a final action component when the film has a CTA.
- Show the important mechanism or proof components early enough that the first half is not only titles and atmosphere.
- Every product component defines role, source, content slots, visual state, motion interaction, snapshot timestamp, and deletion test.
- Every visible product component must perform an action: type, route, fan, assemble, reveal, scan, validate, transform, count, lock, export, publish, save, collapse, or hand off. Static placement alone does not count.
- For premium vertical generated-image work, generate at least one source-driven visual component sheet. Its inventory size comes from the content, not a preset quota. Every sheet must contain product-specific components with clean isolation boundaries, consistent style, named roles, target scenes, crop boxes, motion purpose, and deletion tests. Crop every accepted component into an independent transparent local asset before implementation.
- Generate a hero object separately when a crowded sheet would not provide enough usable resolution or isolation space, but treat separate hero generation as a supplement rather than a replacement for the component sheet.
- Keep text-rich commands, screenshots, UI, and proof states faithful by using official assets or code-native reconstruction. That fidelity requirement does not waive the source-driven component sheet; use it for the bitmap objects, material pieces, proof-safe shells, symbols, stamps, transition objects, and product-specific foreground elements that benefit from Image Gen.

Block product promo delivery when the component library is only prose, when components are not visible in snapshots, when all components are generic cards with different labels, when components merely sit on screen without action, or when motion does not show product state change.

Use `references/premium-product-promo.md` before proposing, storyboarding, implementing, or reviewing a product promo, especially when the user provides a premium reference or complains about missing icon libraries, decorative elements, image resources, animation interaction, or top-tier design quality.

The brief must derive its asset inventory from the product. Include the product/brand lockup, concrete surfaces, proof artifacts, taxonomy, and recurring motion objects only when the source and story require them. If the visual inventory cannot prove the product mechanism, inspect the project, use existing assets, generate product-safe mockups, capture screenshots, or state that the result will be a concept film rather than a premium product promo.

## Source-Driven Visual System Rule

Visual richness is not the same as visual quality. More assets, icons, cards, or generated props still fail when they are generic, mismatched to the copy, or interchangeable with another project.

Before proposing visual components, extract a source-driven visual system from the user's text, project, article, README, product surface, or confirmed copy:

- Source phrases: the exact lines, claims, nouns, verbs, numbers, and emotional tensions that deserve visual form.
- Concrete nouns/entities: product surfaces, files, folders, commands, screenshots, documents, people, modules, metrics, platforms, or states.
- Process verbs: write, route, collect, check, publish, save, export, compare, collapse, recover, grow, hand off, or equivalent action language.
- Visual motif: one core metaphor and three to five component families that can repeat across scenes.
- Text-to-component map: every major visual component names the source phrase it translates.
- Big-text-box replacement plan: long text blocks become objects, chips, diagrams, proof surfaces, kinetic words, or short captions.
- Generic rejection list: props and icons that could fit any unrelated product are forbidden unless the text makes them literal.

Do not count a big text box, paragraph card, or generic office prop as a premium visual component. A title can be the hero, but it cannot be the whole visual system unless the user explicitly asked for a typography-only film.

For article-to-video and knowledge/workflow promos, the source text is the asset brief. If a visual element cannot point back to a source phrase, claim, noun, verb, or number, remove it or redesign it. If still frames cannot reveal what the source material was about without reading a paragraph, the visual system is too generic.

Generated component sheets must be source-driven. Each accepted item needs a source phrase, component family, crop/isolation plan, target scene, motion action, and deletion test. Reject sheets that are only attractive icon sets, generic stationery, random UI cards, or mixed-style decorations.

Block delivery when:

- Most hero frames are dominated by large text boxes with weak product or source-specific visual translation.
- Visual assets are ordinary office, desk, paper, dashboard, AI, or productivity imagery that could serve a different video.
- The component library is rich in quantity but lacks one coherent motif, style lock, and source phrase mapping.
- Components repeat as same-shaped cards with different labels instead of distinct roles and actions.
- The review report passes "asset floor" while failing source-text recognition, motif cohesion, or big-text replacement.

## Reference Fidelity And Narrative Boundary Rule

When the user supplies a style prompt, image, repository, local path, or named reference, inspect that exact source before describing or generating the visual system. A style label such as Riso, editorial collage, or premium tech is not evidence that the source was understood.

Record in `ASSET_MANIFEST.json`:

- Exact source: the attachment, text prompt, repository, path, screenshot, or house-style section actually inspected.
- Observed visual grammar: at least three concrete properties visible in that source, such as palette, material, edge treatment, composition, typography relationship, depth, or transition behavior.
- Narrative boundary: what the reference controls and what it must not replace.
- Forbidden drift: generic substitutions, adjacent styles, or attractive mechanisms that would erase the product story.

Style is a rendering language. Product actions, source claims, characters, objects, and proof states remain the story. Do not turn a product promo into a demonstration of printing, collage, scanning, machinery, or another style mechanism unless that mechanism is itself the product claim.

If the user corrects the reference source or says the style has overtaken the story, return to the brief and asset manifest before generating more assets. Do not patch the mistake only in animation.

## Background And Motion Rule

For new video work, plan background imagery by default. Phase 1 defines what is needed; Phase 2 generates or sources the assets after confirmation. Use Codex Image Gen for project-bound bitmap assets unless the user supplied strong assets or the confirmed direction is pure kinetic typography.

Treat each frame as four coordinated layers:

1. Background image as stage: atmosphere, depth, light, metaphor, or product context.
2. Typography as message: readable hierarchy, fixed safe zones, controlled line counts, no accidental overlap with busy image regions.
3. Visual objects as meaning compression: restrained symbols, functional icons, props, frames, marks, or texture pieces that replace explanation, guide attention, or prove the process.
4. Motion as attention direction: one primary motion idea per scene, one optional support motion, and stillness after each important reveal.

Use `references/motion-background-system.md` for image counts, text-over-image layout, motion grammar, and review gates.

## Content-Derived Image Asset Architecture Rule

Do not choose background or component counts from duration alone. Derive the asset architecture from the confirmed source, storyboard, and motion jobs:

- Visual worlds: group adjacent beats that can truthfully share one spatial stage. Generate one independent vertical background for each genuinely different world. Premium multi-scene work normally needs multiple backgrounds, but the approved analysis decides the count.
- Movable foreground inventory: list every source-specific object that must move independently, prove a claim, or carry a transition. That list decides the transparent component count.
- Sheet strategy: premium vertical generated-image work uses at least one component sheet. Use one when the complete inventory fits with generous isolation space and usable resolution. Split it across multiple sheets, or add separately generated hero objects, when one sheet would crowd or shrink the assets.
- Cutout contract: preserve each source sheet, crop every accepted item into a named transparent PNG, keep fully transparent outer edges, remove matte spill, and review the cutouts on both dark and light contact sheets.
- Manifest: write `ASSET_MANIFEST.json` after the Phase 1 asset decision and update it with accepted local paths in Phase 2. It is the source of truth for visual worlds, background ownership, component inventory, sheet cells, cutouts, target scenes, motion actions, and proof sheets.

Phase 1 must state why the chosen counts are necessary. A fixed target such as "4 backgrounds and 12 components" without source-driven analysis is a template failure. Phase 2 must not silently rewrite the approved counts; record a revision and reason when the asset analysis changes.

Use `references/imagegen-asset-pipeline.md` before planning, generating, cutting, validating, or reviewing bitmap assets for premium vertical work.

## Motion-Role Asset Coverage Rule

Do not judge a visual asset library by count alone. A large sheet of same-shaped cards is still one visual idea.

For premium multi-scene work, the accepted component inventory must cover three different jobs:

- Narrative anchor: preserves the same subject, article, person, product surface, or hero object across beats.
- Product proof: makes a claim visible as a real state, result, command, screenshot, number, choice, or validation.
- Transition carrier: tears, folds, routes, wipes, stamps, fans, assembles, scans, or otherwise moves story material between scenes.

One component may cover more than one job when the mapping is explicit, but premium multi-scene work needs at least three independent movable components. This is not an inventory target; it is the smallest library that can prove two distinct two-object combinations.

Before implementation, record at least two distinct combination tests for premium multi-scene work. Each test names the component set, scene, choreography, snapshot timestamp, and deletion test. Reusing the same component set with a different label is not a second combination.

Block animation when the library has many files but only one motion job, when all proof surfaces share one silhouette, or when components can only enter independently and cannot hand off, assemble, replace, reveal, or transform together.

Use `references/asset-choreography-and-render-qa.md` before approving an asset inventory or component sheet.

## Pure-Code Exception Rule

Pure-code black stages are an exception, not the default production shortcut. Do not mark a video premium or ready when it is only dark gradients, big text, translucent cards, and thin lines unless the user explicitly requested a typography-only motion study.

For article-to-video, content-system, workflow, product, tutorial, personal knowledge-base, local-folder, or tool-comparison promos, Phase 1 and Phase 2 must include a content-derived visual asset floor:

- Enough independent background stages, product screenshots, workspace/file-tree captures, generated metaphor plates, or supplied images to cover the declared visual worlds.
- Enough scene-specific proof visuals beyond text boxes to cover the declared source phrases, mechanisms, and proof claims.
- A local asset path for every bitmap or screenshot, or an explicit user-approved reason why a custom SVG/3D/vector system is stronger than bitmap assets.
- A screenshot review that proves frames do not reduce to "black background + title + cards".

Block final delivery when:

- `assets/images` contains only placeholders and the report claims a rich background or visual asset system.
- The same dark background stage carries every beat without a changing subject, scene depth, or concrete proof surface.
- A pure-code exception is justified only by convenience, missing dependencies, or "code-generated" labels.
- Motion is mostly text/card translate and opacity while the subject needs a visual environment, generated image, product screenshot, or artifact library.

## Image Gen Asset Discipline

Codex Image Gen is used to create source material for compositing, not finished posters. HyperFrames owns final typography, timing, masks, crops, parallax, focus pulls, and text contrast.

Before generating, write an asset brief for each image:

- Role: stage, symbol, texture, anchor, or transition plate.
- Use in scene: which beat uses it and what it must communicate.
- Aspect ratio and target size: usually vertical 9:16 for new vertical work; use standard ratios for cutaways or panels.
- Layout contract: textRect, subjectRect, quiet text zone, safe bottom boundary, and motion bounds.
- Focal subject: side, center, top, lower field, or background-only.
- Empty space: where text can sit without a card.
- Lighting and palette: dark base, controlled contrast, restrained warm gold only when needed.
- Forbidden content: baked-in text, fake UI, fake logos, labels, explanatory icons, watermarks, decorative clutter, random symbols, and high-frequency detail in text zones.

After generation, inspect the actual image before implementation:

- Keep only assets with a clear role.
- Regenerate or crop when text would fight detail, faces, product edges, bright seams, or platform overlays.
- Move final assets into the project asset folder before referencing them.
- Document the local path and the accepted crop in `DESIGN.md` or `STORYBOARD.md`.
- Replace extra images that repeat the same role with one stronger image.

## Visual Object Discipline

A strong motion video usually needs more than background plus text. Add objects only when they reduce explanation, direct attention, prove a claim, or create a memory hook.

Before implementation, define a small visual object system:

- Primary object: the one prop, symbol, product surface, frame, or material that the viewer should remember.
- Functional marks: 1-3 small icons, stamps, brackets, ticks, rails, labels, or guide marks that replace explanation, direct attention, or show proof.
- Texture pieces: sparse fragments, dust, paper, grain, light, or depth cues that create atmosphere without becoming confetti.
- Object motion: how the object enters, transforms, hands off, or proves the beat.
- Removal test: what meaning is lost if the object is deleted.

Hard rules:

- Avoid icon piles. One visual language per video is enough.
- Avoid small icons beside every line of text.
- Avoid generic symbols such as rockets, lightning, sparkles, AI chips, and random checkmarks unless the brief makes them literal and necessary.
- Avoid icons as labels for an unclear metaphor. If the object needs a label to make sense, redesign the metaphor.
- Prefer project-specific objects: source paper, film frame, scan rail, confirmation stamp, inspection bracket, product surface, timeline, lens, cursor, map route, seal, or artifact.
- Add at most one primary object system and three functional mark types in a 20s vertical promo.
- The review report must state whether added visual objects are necessary, restrained, and removable without harming the story.

## Anchored Connector Rule

Lines, route paths, rails, scan lines, arcs, underlines, brackets, and connector glows are not automatically premium. They are support objects. Use them only when they are anchored to a concrete object, word, component edge, node, cursor, status mark, or CTA.

Before keeping any connector, name:

- Start anchor: the exact object or word it leaves.
- End anchor: the exact object, word, node, or component it reaches.
- Job: reveal, route, compare, focus, validate, hand off, or close.
- Motion: how it changes state rather than floats as decoration.
- Safe zone: where it cannot cross text, CTA, product surfaces, or platform overlays.
- Deletion test: what meaning, proof, or attention direction is lost if it is removed.

Reject or replace connectors when:

- The line floats in empty space without a visible start and end.
- The line is only an elegant divider, flourish, or curve.
- The line competes with the title or product proof.
- The same connection is clearer as a card edge, status dot, node sequence, chip state, frame corner, progress strip, cursor, highlight, or CTA border.
- The viewer would understand the scene equally well without it.

Prefer component-attached signals for premium product promos: card top/bottom highlights, node sequences, status dots, short progress strips, inspection corners, screenshot check marks, and CTA edge lighting. These usually feel more built and less decorative than free-floating arcs.

## Support Asset Decision Rule

Do not require decorative assets. Require a support-asset decision. A strong motion video often needs more than a single background, but every extra bitmap, SVG, mark, texture, or shape must have a semantic role, a visual-system relationship, and a motion purpose.

For every new video brief, decide whether the direction needs support assets beyond the background stage:

- Symbol: the central metaphor, product silhouette, number object, or visual anchor.
- Texture: grain, haze, material surface, shadow plate, dust, or light falloff that makes the frame tactile.
- Light / mask / transition plate: sweep, aperture, wipe source, matte, focus layer, or morph source used to reveal or bridge beats.
- Semantic glyph: a minimal meaning-bearing mark that compresses an idea; not an icon set.
- Product / UI fragment: a faithful product, interface, chart, or proof crop used only when the story needs evidence.
- Motion accent: line, glint, trace, path, bracket, rail, or particle-like detail with a defined attention or transition job.

Use Codex Image Gen after confirmation for support bitmap assets when they cannot be made more cleanly in HyperFrames/CSS/SVG. Prefer code-generated lines, masks, simple glyphs, vector marks, and typography whenever they will be sharper, more controllable, or easier to animate than a generated image.

Each support asset must declare: role, source, local path if bitmap-based, visual relationship to the background, safe zones, motion purpose, entrance/exit timing, and deletion trigger. Delete or omit any support asset that does not strengthen meaning, depth, transition continuity, product proof, or readability.

Content-derived support-asset guidance:

- Count visual worlds, not seconds. Adjacent beats may share a background only when their spatial world, text-safe zone, and story job are genuinely the same.
- Count movable objects from source nouns, process verbs, proof claims, and transition jobs. Do not add or remove assets to hit a preset number.
- Use official product/UI assets first. Generate atmosphere, metaphor plates, masks, component sheets, hero objects, or proof-safe crops only when the declared inventory needs them.
- Keep simple lines, masks, typography, and sharp vector marks code-generated when they do not benefit from bitmap material.

All generated assets in one video must share the same art direction: palette, lighting direction, lens/texture language, contrast level, and negative-space discipline. A generated asset sheet is acceptable only when every cut-out element has a named role and will be isolated before animation. Use additional sheets or separate hero generations when a single sheet would reduce crop safety or usable resolution.

## Anti-PPT Motion Craft Rule

Weak motion work often becomes a static poster sequence with opacity fades. Treat that as a quality failure.

Before implementation, every multi-beat video must define a motion craft plan:

- Camera behavior: push, pan, parallax, focus pull, crop discovery, or deliberate stillness.
- Type behavior: how text enters, locks, receives emphasis, exits, and bridges into the next beat.
- SVG/CSS3 structure: which masks, paths, scan lines, frames, underlines, clip paths, blend modes, filters, or CSS variables carry transitions.
- GSAP choreography: a paused master timeline with labels, absolute timing, meaningful transitions, and still readable holds.
- Signature motion moment: one memorable movement that belongs to the idea.

Use `references/motion-craft.md` before deciding text transitions, SVG/CSS layers, GSAP timelines, or whether a video feels too much like a PPT.

Good motion changes meaning. It reveals, compares, transforms, compresses, releases, directs, or proves. If motion can be removed without changing the story, redesign it.

Hard gates for short vertical promos:

- In videos 20 seconds or shorter, at least one hook or core-viewpoint frame must use center or upper-center text impact. If it does not, document what stronger visual subject owns that zone and why that is better for attention.
- The first 0-2 seconds must state the first eye target, the biggest word or object, and the motion event that stops the scroll.
- If three or more beats use the same textRect, same text entry, and same rhythm, mark the storyboard as PPT-risk and redesign the layout or motion before implementation.
- At least one important text moment must use a real transition device: mask, scan, split, compression, assembly, path handoff, or equivalent. Plain opacity plus y-position is only a supporting move.
- The review report must include an anti-PPT verdict. If the video loses almost no meaning when reduced to screenshots, it is not ready.

## Kinetic Text Relay Rule

When the user asks for text, icons, cool transitions, left/right push, up/down push, wipe, scan, typing, word-by-word motion, or a reference that behaves like kinetic typography, default to a kinetic text relay promo instead of a background-image-led cinematic short.

A strong kinetic promo is a chain of visual events. Words, icons, objects, and transition devices pass attention from one beat to the next.

Before proposing or implementing this style, define the relay grammar:

- Keyword chain: the 4-8 words or short phrases the viewer will remember.
- Action object per keyword: icon, cursor, waveform, timeline, frame, brush, scan rail, stamp, product tile, code cursor, or another small object that turns an abstract capability into a visual event.
- Direction per beat: left push, right push, upward lift, downward press, radial burst, crop reveal, scan pass, type-on, compression, expansion, wipe, dissolve, or deliberate hard cut.
- Relay object: what carries the outgoing beat into the incoming beat. It must be visible or logically implied.
- Hero frame and transition midpoint: each beat needs one readable hold frame and each transition needs one inspectable midpoint.
- Motion loss test: if removing motion leaves the story mostly unchanged, the beat is under-directed.

Use one text relay language per video. Avoid per-line icons and decorative sticker clusters. Each object must push, mask, scan, reveal, compress, split, type, or hand off the next word.

For a 10-18 second kinetic promo, use this default scorecard before delivery:

- 20 points: first-eye impact and largest word/object stop the viewer in the first 0-2 seconds.
- 20 points: important text has a designed action beyond fade/translate.
- 20 points: icons or small objects participate in transitions.
- 20 points: adjacent beats have relay continuity through direction, object, mask, line, cursor, scan, or camera movement.
- 10 points: rhythm alternates between motion hits and readable holds.
- 10 points: the final brand/CTA lands cleanly and feels like the end of the chain.

Target 100. Below 100 requires a named next edit. Below 90 blocks final delivery. Below 70 requires revision before render. Below 60 requires rebuilding the transition map.

## Text Over Background Layout Rule

For every beat where text appears on or near a background image, choose the layout contract before generating images or writing animation code. The contract determines the image ratio, subject position, text axis, quiet text zone, crop-safe area, title size tier, motion bounds, and mobile safe boundaries.

Use `references/text-over-background-layout.md` before planning generated images, text-over-image treatment, storyboard hero frames, or HyperFrames layout CSS.

Reserve lower-half copy for CTA, proof holds, or subject-dominant frames. Hooks, central viewpoints, and amplified keywords usually need center or upper-center impact. Decide where the viewer's eyes should land in the first second before choosing the text zone.

Every new video brief must name a candidate layout strategy. The design system must name default strategies and allowed variants. The storyboard must lock one final layout contract per text-over-background beat after generated or supplied imagery is inspected. A final contract must be specific enough to draw on a 1080x1920 canvas:

```text
Layout contract: cinematic side-title stage / 9:16 / left axis / textRect x=8% y=24% w=44% h=28% / subjectRect x=54% y=20% w=36% h=46% / quiet zone left 46% / safeBottomY<=85% / title tier main / motion stays inside textRect
```

The contract must include layout intent, image ratio, text axis, text rectangle, subject rectangle, quiet zone, safe bottom boundary, title size tier, and motion bounds. For non-Chinese or non-vertical work, adapt the contract intentionally and document the override.

If the generated image puts detail, faces, product edges, UI text, or high contrast texture inside the quiet text zone, regenerate or recrop before motion. Motion cannot rescue a broken text-over-background composition.

## Rendered-Frame Integrity Gate

Browser previews are planning evidence. Rendered MP4 frames are delivery evidence.

For every scene, declare entry, readable-hold, and exit checkpoints in `SCENE_SCHEMA.json`. Extract and inspect the matching frames from the final MP4 when the scene contains text, transparent assets, product UI, layered cards, or composite components.

Hard rules:

- A component's container, text, controls, shadows, highlights, and decorative shell share one owner group for transform, opacity, clipping, and occlusion. Children may not cross in front of an object while their container sits behind it.
- Position transparent assets by their visible alpha bounds when aligning them to text, frames, or safe zones. The PNG canvas rectangle is not the visible object.
- Measure exported font metrics when text must fit inside a control, card, badge, search field, or narrow frame. Browser fit does not waive rendered-frame overflow.
- Check entry, hold, and exit, not only the hero hold. Motion can create clipping or overlap between approved still frames.
- A review pass without the rendered frame path, timestamp, and named assertion is not evidence.

If browser and MP4 disagree, the MP4 wins. Update the layout contract, composite ownership, alpha-bound placement, or font sizing, then rerender and re-extract the frame.

Use `references/asset-choreography-and-render-qa.md` for the full occlusion, visible-bounds, export-parity, and evidence workflow.

## Design Engineering Contract Rule

Treat SVG, CSS, and GSAP research as production infrastructure, not as a larger bag of effects. The goal is a small Motion Design Compiler:

```text
brief -> scene schema -> vector templates -> motion primitives -> GSAP timeline -> browser snapshots -> render
```

For new production work, create or update these contracts before implementation:

- `SCENE_SCHEMA.json`: structured scenes, content slots, layout contracts, timing, primitive chains, semantic selection reasons, readable holds, and snapshot tests.
- `VECTOR_TEMPLATES.json`: approved SVG scene systems, such as `quote_card`, `data_point`, and `comparison`, with fixed slots, safe geometry, icon/decor rules, allowed primitives, and rejection tests.
- `MOTION_PRIMITIVES.json`: approved motion vocabulary, such as `maskReveal`, `pathDraw`, `clipWipe`, `staggerText`, and `numberCount`, with semantic use cases, required selectors, GSAP properties, midpoint requirements, and rejection tests.

The LLM may choose templates, fill slots, and select legal primitives. It must not freely invent SVG geometry, motion primitives, or timing grammar for production frames unless the brief explicitly calls for exploratory art and the risk is documented.

Use `references/design-engineering.md` before deciding whether to add a new template, primitive, transition device, icon system, or batch generation mode.

Hard rules:

- Start with a small approved vocabulary before expanding style range.
- Choose primitives by semantic role, not by visual novelty.
- Mask, clipPath, path, SVG stroke, or CSS structure must carry at least one important reveal or transition in short promos.
- Chinese text layout must be measured in browser snapshots before final delivery.
- A transition midpoint must be inspectable. Blank midpoint frames are a quality failure.
- If a project can pass with only natural-language artifacts and no structured contracts, it is still prompt-driven and not production-ready.

## GSAP Choreography Contract Rule

Use GSAP as the choreography engine for premium motion. Do not scatter independent tweens through the composition.

Every implemented composition should use:

- One paused master timeline registered for HyperFrames control.
- Timeline labels such as `hook`, `reveal`, `proof`, and `cta`.
- Position parameters instead of chained `delay` values.
- Timeline defaults for shared duration and easing.
- GSAP transform aliases such as `x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`, and `svgOrigin`.
- `autoAlpha` instead of raw opacity when hiding/revealing elements.
- `immediateRender: false` when stacking later `from()` / `fromTo()` tweens on the same target/property.
- Plugin registration before use.

Use premium GSAP plugins only when they serve the beat:

- `SplitText` for large Chinese hook lines, keyword chains, and CTA lockups.
- `DrawSVGPlugin` for logo strokes, anchored proof connectors, scan rails, route-node signals, and inspection brackets.
- `MorphSVGPlugin` when one idea visibly becomes another.
- `MotionPathPlugin` when an object carries attention along a rail or path.
- `CustomEase` for one named signature motion moment.

All GSAP plugins come from the public `gsap` package. Do not add old private registry, Club GSAP, or auth-token instructions.

Use `references/gsap-choreography.md` before implementing GSAP timelines, plugin usage, premium text reveals, SVG path drawing, morphing, motion paths, custom eases, or performance-sensitive motion.

## Default Language And Format

Default new video work to a Chinese promotional film unless the user explicitly asks for another language or format. This default matters because Chinese copy, vertical framing, and social-video viewing habits change the whole layout:

- Language: Simplified Chinese screen copy by default. Keep English product names, model names, code terms, or brand words only when they are part of the source material.
- Format: vertical 9:16 by default.
- Size: `1080x1920` by default.
- Platform assumption: Douyin / TikTok / Reels / Shorts style vertical viewing unless the prompt clearly names a horizontal surface such as YouTube long-form, keynote screen, website hero, or desktop landing page.
- Duration: 10-15 seconds by default for short promotional motion video; use 15 seconds when proof or CTA needs breathing room.
- Safe margins: reserve stronger top/bottom margins for platform UI, subtitles, and CTA. Avoid placing important text in the bottom overlay zone.
- Copy density: Chinese vertical video should use fewer characters per beat, stronger line breaks, and larger type than a horizontal desktop film.

If a user asks for a YouTube, website hero, keynote, or widescreen film, change the format intentionally and write the reason into the brief. Avoid silent drift to horizontal defaults.

## Output Writing Standard

All produced artifacts must read like direct production notes, especially `BRIEF_DESIGN_PROPOSAL.md`, `DESIGN.md`, `STORYBOARD.md`, and `REVIEW_REPORT.md`.

Use:

- Short, concrete sentences.
- Project-specific facts, decisions, and constraints.
- Direct statements of what will appear on screen, what will move, what will be generated, and what will be checked.
- Plain Chinese for user-facing proposal copy unless the user asks for another language.

Avoid:

- Repeated contrast-pivot phrasing in Chinese or English.
- AI-flavored self-description, self-talk, process narration, or internal reasoning.
- Generic hype, sales language, slogans, and inflated adjectives.
- Unrelated visual theory, platform commentary, or design noise.
- Long explanations when a decision, rule, or risk can be stated in one line.

For Phase 1 proposals, keep the writing compact. The proposal should help the user approve direction quickly: essence, visual plan, asset plan, layout, motion, risks, and confirmation request. It should not sound like a pitch deck or a brainstorming transcript.

## Two-Phase Rule

Always split new video work into two phases:

### Phase 1: Brief / Design Proposal

Produce a compact proposal and stop for user confirmation. Wait to generate images, create animation code, render video, or build a full HyperFrames composition.

The proposal must include:

- Essence: core viewpoint, largest conflict, emotional center, amplified keyword, visual metaphor.
- Product proof inventory when relevant: existing assets, product surfaces, commands, screenshots, output examples, numbers, modules, taxonomies, providers, checks, and gaps.
- Source-driven visual system: source phrases, concrete nouns, process verbs, motif families, text-to-component map, big-text-box replacement plan, and generic visual rejection list.
- Structure: center symbol / huge title / person anchor / huge number.
- Format: language, platform, aspect ratio, pixel size, duration, FPS, safe margins. Default to Simplified Chinese, vertical 9:16, and `1080x1920` unless overridden.
- Image decision: whether generated bitmap images are needed, each asset role, image ratio, quiet text zone, forbidden content, and what must stay in HyperFrames.
- Asset count analysis: distinct visual worlds, movable foreground inventory, count rationale, sheet count, separately generated hero objects, and the planned `ASSET_MANIFEST.json`.
- Background plan: image role, layout contract, subject position, text-safe area, crop risks, and whether Codex Image Gen will be used after confirmation.
- Writing standard: terse, project-specific, no self-talk, no generic hype, no repeated contrast-connector phrasing.
- Visual object plan: primary object, functional marks, texture pieces, why each object is necessary, and excluded object types.
- Support asset plan: whether the video needs symbol, texture, transition plate, semantic glyph, product/UI fragment, or motion accent assets; what stays code-generated; and what must be deleted if it becomes decoration.
- Mandatory visual component library for product promos: command cards, output cards, stat blocks, chips, proof cards, anchored signals, route-node sequences, screenshots, icons, marks, panels, and CTA badges with semantic roles.
- Connector / line decision: whether any route, rail, arc, underline, scan line, or path is needed; its anchors, job, safe zone, deletion test, and component-attached fallback.
- Icon / decorative system: what icons, marks, fragments, glows, panels, borders, chips, or texture layers are required and what they prove.
- Copy strategy: pain, mechanism, proof, confidence, CTA; rewrite any generic line that could fit a different product.
- Typography: title/support/CTA scale, title size tier, line-height, letter-spacing, maximum lines, text spacing, overflow handling.
- Layout: dominant visual mass, layout contract, grid/alignment, crop-safe zones, mobile overlay risks.
- Motion: main reveal, background motion, support asset choreography, transition style, hold times, easing, audio hit plan, motion bounds, and what must remain still.
- Motion craft: camera behavior, kinetic typography, text transition pattern, SVG/CSS3 layers, GSAP timeline structure, and signature motion moment.
- Kinetic text relay plan when relevant: keyword chain, action object chain, push/wipe/scan direction map, relay object, transition midpoint snapshots, and 100-point anti-PPT score target.
- Risk gates: what could make it unreadable, noisy, off-style, or visually generic.
- Anti-PPT risk: what would make the piece feel like slides rather than a film, and how the direction avoids it.
- Attention map: first eye target, center-impact decision, and why text is center, upper-center, side-title, or lower-safe.

End Phase 1 with a clear confirmation request. Production starts only after the user confirms, revises, or explicitly says to proceed.

### Phase 2: Production

After confirmation, create or update the production artifacts, generate needed images, implement HyperFrames composition files, validate, snapshot, render, and write review outputs as the task requires.

## Scope

Use this skill for HyperFrames compositions, product launch videos, website-to-video projects, article-to-video films, keynote reveals, kinetic typography, transition-heavy text/icon promos, music-synced motion graphics, and existing HyperFrames video edits.

Skip it for simple copywriting, static posters, ordinary landing pages, generic ad copy, and raw MP4 editing without code.

For new videos, create `BRIEF_DESIGN_PROPOSAL.md` first and wait for confirmation. After confirmation, create or update `DESIGN.md`, `STORYBOARD.md`, needed assets, HyperFrames composition files, `REVIEW_REPORT.md`, and optionally `REVIEW_PACK.md`.

Use `BEAT_MAP.json` when timing depends on music, voiceover, or exact hits. Use `MOTION_MAP.json` when choreography, background motion, masks, or transitions need a separate map. Multi-scene videos longer than 8 seconds usually need one.

For existing edits, read the project first, keep the current visual system unless the request requires a change, edit the smallest affected artifact, and rerun relevant validation.

When user feedback exposes a visual defect after delivery, do not treat the fix as a one-off patch. Add the defect to `REVIEW_REPORT.md`, name the root cause, update the upstream contract or template that allowed it, rerun snapshots/render checks, and decide whether `SKILL.md`, templates, or validation scripts need a small rule update.

## Required Workflow

### 1. Intake

Extract or infer:

- Source article, topic, or product theme.
- Goal and CTA.
- Audience.
- Language and platform. Default to Simplified Chinese promotional copy for vertical social video when unspecified.
- Aspect ratio and pixel size. Default to 9:16 and `1080x1920` unless the platform or user asks otherwise.
- Duration.
- Product or offer.
- Required proof points.
- Tone and style.
- Available assets.
- Hard constraints.

If details are missing, make conservative assumptions and write them into the brief. Ask only when the missing item prevents production.

Read `references/workflow.md` when planning a full video.

### 1.5. Essence Extraction

Before design, extract:

- Core viewpoint.
- Largest conflict.
- Emotional center.
- The keyword that deserves visual amplification.
- One visual metaphor that can carry the whole video.

Translate the abstract idea into a restrained symbol. Examples: AI replacement becomes an erased human silhouette; anxiety becomes a thread about to snap; time becomes a countdown in darkness; growth becomes light inside a crack; information overload becomes data fragments pulled into a black hole; long-termism becomes the only distant lamp; platform migration becomes a black obelisk or data tower; automation becomes documents entering a silent machine.

### 2. Approval Brief

Create `BRIEF_DESIGN_PROPOSAL.md` from `templates/BRIEF_DESIGN_PROPOSAL.template.md` or present the same structure in the response.

Keep it short and decisive. Treat it as a production contract. Stop after this proposal and ask for confirmation.

### 3. Design System

Create `DESIGN.md` from `templates/DESIGN.template.md`.

The design system must specify typography, color, spacing, density, metaphor symbol, visual object system, background-image system, generated-image plan, text-over-image rules, and motion personality. This prevents downstream steps from improvising a new visual language.

For product promos, the design system must also specify the product proof inventory, source-driven visual system, mandatory visual component library, icon/decorative system, asset library, copy ladder, and motion interaction rules. A one-background-plus-title design system is insufficient for a premium product promo unless the user explicitly asks for a minimal concept film.

Read `references/visual-standard.md` before judging visual quality, typography, layout, or motion.
Read `references/premium-product-promo.md` before product, tool, CLI, API, workflow, skill, template, or reference-driven promo work.
Read `references/motion-background-system.md` before deciding image count, background roles, animation grammar, or text-over-image treatment.
Read `references/text-over-background-layout.md` before deciding layout contracts, image ratios, text rectangles, subject rectangles, title tiers, crop-safe zones, or bottom-safe boundaries.
Read `references/motion-craft.md` before deciding kinetic typography, CSS/SVG layers, scene transitions, GSAP structure, or anti-PPT quality gates.
Read `references/design-engineering.md` before deciding scene schemas, vector templates, motion primitives, template selection rules, render validation, or batch templates.
Read `references/gsap-choreography.md` before implementing timelines, labels, position parameters, GSAP plugin usage, SplitText, DrawSVG, MorphSVG, MotionPath, CustomEase, or performance rules.
Read `references/asset-choreography-and-render-qa.md` before approving style references, asset role coverage, composite ownership, transparent-asset alignment, or rendered-frame evidence.

### 4. Storyboard And Copy

Create `STORYBOARD.md` from `templates/STORYBOARD.template.md`.

Default short motion arc:

```text
Hook -> Tension -> Metaphor Reveal -> Proof -> CTA
```

For a 10 second no-voiceover kinetic typography video, keep text sparse. One idea per beat is usually enough.

Choose the structure from the material:

- Center symbol: trends, insight, AI, platform, philosophy.
- Huge title: conflict, suspense, emotion, viewpoint.
- Person anchor: tutorial, interview, personal brand, methodology.
- Huge number: growth, milestone, data shock.

Every beat needs:

- Timing.
- Screen text or visual action.
- Hero frame timestamp.
- Layout and visual hierarchy.
- Attention map: first eye target, primary focal zone, and whether text should dominate center or defer to the subject.
- Hero text zone: center, upper-center, side, lower-safe, or split, with a reason.
- Background image state and text-safe zone.
- Layout contract, including textRect, subjectRect, title tier, safeBottomY, and motion bounds.
- Text transition: entry, lock, emphasis, exit, and bridge.
- Text transition device: mask, scan, split, compression, assembly, handoff, or explicit reason for stillness.
- What changes if motion is removed.
- Motion direction: camera, background, symbol, text, SVG/CSS layer, and transition movement.
- Attention target and stillness/hold requirement.
- Transition out.
- Audio or rhythm notes when relevant.
- Quality note.
- Metaphor role: what part of the abstract idea this frame carries.
- Product proof role when relevant: what product-specific artifact, component, number, screenshot, output, command, chip, icon, or mark makes the claim believable.
- Source phrase and visual translation when relevant: which exact source phrase the beat converts into a component, motion, symbol, or proof surface.
- Component interaction when relevant: what state change the component performs, such as typing, routing, fanning, assembling, checking, locking, publishing, saving, or exporting.
- Connector anchoring when relevant: what exact objects any line, rail, path, underline, or arc connects, and what component-attached signal replaces it if the connector floats.

Read `references/audio-sync.md` when music, sound design, voiceover, beat hits, or captions matter.

### 5. Design Engineering Contracts

Create or update the production contracts from templates:

- `SCENE_SCHEMA.json` from `templates/SCENE_SCHEMA.template.json`.
- `VECTOR_TEMPLATES.json` from `templates/VECTOR_TEMPLATES.template.json`.
- `MOTION_PRIMITIVES.json` from `templates/MOTION_PRIMITIVES.template.json`.

The contracts must lock:

- Approved scene templates and their slots.
- Layout geometry, `textRect`, `subjectRect`, `safeBottomY`, title tier, and optical-centering tolerance.
- Motion primitive chain per scene.
- Semantic selection reason for every primitive.
- GSAP labels, position parameters, transform aliases, plugin requirements, and `autoAlpha` policy.
- Transition midpoint snapshot requirements.
- Composite ownership, alpha-visible-bounds decisions, and entry/hold/exit export checkpoints.
- Rejection tests for templates and primitives.
- Whether content can be batch-replaced without changing layout, SVG geometry, or timing grammar.

For new work, do not let the implementation invent SVG geometry or GSAP timing directly from prose. Convert the storyboard into the contracts first, then implement from the contracts.

Run:

```bash
node scripts/validate_design_engineering.mjs <project-dir>
```

### 6. Visual Asset Plan

If the confirmed proposal calls for bitmap assets, generate or source them before HyperFrames implementation. For premium multi-scene vertical work, generate the content-derived set of independent vertical backgrounds and foreground objects declared in `ASSET_MANIFEST.json`; do not default to one reusable background or a fixed asset count.

For product promos, do not stop at background images. Build an asset library that can include official assets, repository assets, screenshots, generated mockups, code-native cards, SVG icons, chip groups, panels, anchored signals, and output previews. Each asset must prove a product claim or support a motion interaction. A product promo with no visual component library is not ready for implementation.

For content-system, workflow, local-folder, knowledge-base, tutorial, or article-to-video promos, do not accept an empty image asset folder by default. Derive enough concrete visual stages and proof visuals to cover every declared visual world and every source claim that needs visible evidence, unless the user explicitly approves a typography-only film. Real local workflow material is usually stronger than abstract cards: file-tree crops, draft screenshots, gate reports, metric tables, workspace panels, product surfaces, or generated symbolic background plates.

For each Codex Image Gen request:

- Generate only assets needed for the background stage, center symbol, texture, product/person/object anchor, transition plate, semantic glyph, product/UI fragment, or motion accent.
- Give each image or support asset one role and one target scene.
- Specify aspect ratio, target size, focal subject position, quiet text zone, crop-safe region, platform-safe boundaries, and forbidden content.
- Specify support asset style lock, safe zones, motion purpose, entrance/exit timing, and deletion trigger before generation.
- Carry the exact inspected reference grammar and narrative boundary into the prompt; do not rely on the style name alone.
- Name the component's motion role: narrative anchor, product proof, transition carrier, or an explicit source-derived extension.
- Ask for sparse composition, usable negative space, dark contrast, and no baked-in text unless exact title text is required.
- Keep typography, proof notes, CTA, logos, masks, crops, parallax, focus pulls, and timing in HyperFrames whenever possible.

After generation:

- Inspect the returned image against the layout contract.
- Reject images with text in the quiet zone, fake UI, fake logos, labels, watermarks, random icons, busy detail, or unclear subject placement.
- Recrop or regenerate before implementation when the image cannot hold readable text.
- Preserve component-sheet sources, crop every accepted item into a named transparent PNG, verify transparent outer edges and matte cleanup, and build dark/light contact sheets.
- Reject a visually rich sheet when all accepted items repeat one silhouette or one motion job.
- Run the declared component combination tests before animation implementation.
- Run `node scripts/validate_image_assets.mjs <project-dir>` before animation code.
- Save accepted assets into project asset folders before referencing them.

### 7. Layout Before Animation

Build readable hold frames first. A frame should communicate clearly while paused before motion is added.

For each scene, verify:

- Main message is readable at the target platform size.
- Background image has a clear role and does not fight the text.
- Text sits in a designed quiet zone, not on high-frequency detail.
- The selected layout contract matches the image and message shape.
- Image ratio is standard and does not copy a random source-image ratio.
- Text rectangle keeps title, support, CTA, and proof note in one readable group unless a split is intentional.
- Subject rectangle keeps faces, product edges, UI text, and symbols out of unsafe crop areas.
- Title size tier matches the actual character count, language, line count, and phone viewing distance.
- Safe bottom and right/top platform zones keep CTA, subtitle, proof note, support line, and brand lockup clear.
- Text does not overlap or leave safe margins.
- Text containers have max width, max lines, and overflow behavior.
- Long words, Chinese/English mixed text, and CTA labels cannot escape their boxes.
- Font sizes are fixed per breakpoint; do not scale text with viewport width.
- Hierarchy is clear.
- The scene has one dominant idea.
- The scene has one dominant visual mass and no unowned decoration.
- Any connector, line, rail, arc, underline, or path has visible anchors and a semantic job; otherwise it is replaced by a component-attached signal.
- CTA or brand lockup is not visually weak.
- The metaphor is understandable without icon labels.
- The frame obeys the house style: black, sparse, cinematic, white/gray/warm gold.

Only add GSAP or other motion after layout works.

### 8. Motion

Read `references/visual-standard.md` and `references/motion-background-system.md` before adding animation.

Use motion to clarify sequence and emphasis. Avoid applying the same y-plus-opacity entrance to every element. Give major text enough hold time to be read.

Before animating each scene, answer:

- What is the attention target?
- Which background, symbol, text, or product layer moves first?
- Which elements must remain still so the viewer can read?
- Where is the stillness after the reveal?
- How does this motion change meaning rather than add noise?
- Which CSS3/SVG device carries structure: mask, path, clip, scan line, frame, underline, perspective layer, or blend?
- If using a line, path, rail, arc, or underline, what exact object anchors it, and why is it better than a card edge, node, status dot, progress strip, or CTA border?
- How does the outgoing text become the next scene's bridge instead of disappearing into a generic fade?

For GSAP in HyperFrames:

- Use a paused timeline.
- Register timelines for HyperFrames control.
- Use explicit position parameters for timing.
- Keep timeline construction synchronous and deterministic.
- Prefer a labeled master timeline over unrelated per-element effects.
- Animate transforms, opacity, filters, masks, clip paths, and CSS variables; avoid layout-shifting properties for render-critical motion.

Read `references/motion-craft.md` before judging whether the movement is strong enough. Read `references/hyperframes-stability.md` before rendering.

Create optional `MOTION_MAP.json` from `templates/MOTION_MAP.template.json` only when selectors, labels, timing, easing, and transitions would otherwise become hard to review.

### 9. Validation

Run the strongest available checks for the project. Prefer:

```bash
npx hyperframes doctor
npx hyperframes lint
npx hyperframes validate
npx hyperframes inspect
npx hyperframes snapshot <composition> --at <times>
```

If the project or installed HyperFrames version uses different command syntax, inspect the local package docs or CLI help and adapt.

Validation is not optional for final delivery. If a command cannot run because dependencies are missing, state that clearly and still perform any available static checks.

For local deterministic checks, use bundled scripts where helpful:

```bash
node scripts/check_assets.mjs <project-dir>
node scripts/validate_artifacts.mjs <project-dir>
node scripts/validate_design_engineering.mjs <project-dir>
```

### 10. Render

Use a draft render for review and a higher-quality or Docker render for final delivery when available:

```bash
npx hyperframes render --quality draft --output renders/draft.mp4
npx hyperframes render --quality standard --output renders/review.mp4
npx hyperframes render --docker --quality high --output renders/final.mp4
```

Adjust flags to match the installed CLI.

### 11. Review Report

Create `REVIEW_REPORT.md` from `templates/REVIEW_REPORT.template.md`.

The report should include:

- Output files.
- Validation status.
- Snapshot timestamps.
- Watch notes by time range.
- Issues.
- Recommended next edit.

Create `REVIEW_PACK.md` with `scripts/build_review_pack.mjs <project-dir>` when outputs, snapshots, and reports exist.

## Quality Gates

Before claiming the video is ready, verify:

- Defaults or overrides are explicit: Simplified Chinese, 9:16, `1080x1920`, and vertical safe margins.
- New-video production started only after `BRIEF_DESIGN_PROPOSAL.md` confirmation.
- Required artifacts exist, or skipped artifacts are explained.
- `SCENE_SCHEMA.json`, `VECTOR_TEMPLATES.json`, and `MOTION_PRIMITIVES.json` exist for new production work, or the exception is documented.
- Scene schema references approved vector templates and approved motion primitives.
- Motion primitives include semantic selection reasons and rejection tests.
- GSAP timelines use labels, position parameters, defaults, transform aliases, and `autoAlpha` where appropriate.
- GSAP plugin use is registered, documented, and chosen by semantic role.
- The implementation does not freely invent production SVG geometry when an approved template exists.
- A requested build produced scaffold/composition source, not prose alone.
- Static hero frames work before animation.
- First-frame and hero-frame dominant visual masses are optically centered or intentionally offset, stay inside edge-safe bounds, and are checked in both browser snapshots and rendered MP4 stills.
- The visual asset floor is met for non-typography videos: background or proof assets exist locally, screenshots/rendered frames show more than black background plus text/cards, and any pure-code exception is explicitly approved.
- Text fits safe margins, max lines, overflow rules, crop-safe areas, and platform overlay zones.
- Text-over-background beats declare textRect, subjectRect, safeBottomY, title tier, quiet zone, and motion bounds.
- Generated images have a role, target scene, quiet text zone, accepted local path, and usable crop before use.
- Product promos include a product proof inventory, mandatory visual component library, icon/decorative system, asset library, copy ladder, and component interaction plan.
- Product, article, workflow, and knowledge promos include a source-driven visual system: source phrases, nouns, process verbs, motif families, text-to-component mapping, big-text-box replacement, and generic visual rejection.
- Product promos fulfill the approved source-driven component inventory, including every required concrete surface, taxonomy, proof, or final action component and snapshot proof for each major component.
- Hero frames prove source-text recognition. A viewer should see source-specific objects, actions, numbers, or product states, not only generic office props, large text boxes, or attractive asset packs.
- Product promo storyboards name every concrete visual component required by the source and explain the count; a preset component number is not accepted as analysis.
- Product promo copy is specific: pain, mechanism, proof, confidence, and CTA are not generic.
- Product promo snapshots look like product proof frames, not only title cards.
- Product promo connectors are anchored to visible product components or replaced by card-attached signals; no floating arcs or decorative lines remain.
- Support asset decision is documented for new videos, even when the decision is none.
- `ASSET_MANIFEST.json` records the approved visual worlds, background count decision, component inventory, sheet strategy, cutout paths, and proof sheets when generated bitmaps are used.
- `ASSET_MANIFEST.json` records the exact style source, observed visual grammar, narrative boundary, forbidden drift, motion-role coverage, and distinct component combination tests.
- Premium multi-scene image work uses independent vertical backgrounds for every declared visual world; fixed duration-based counts and one-background shortcuts are rejected.
- Every accepted component-sheet item exists as an independent transparent asset, passes dark/light contact-sheet review, and is referenced by the composition.
- Support assets have role, source, style lock, safe zones, motion purpose, entrance/exit timing, and deletion trigger before they are generated or animated.
- No support asset competes with the dominant text, symbol, product, or CTA.
- Multi-scene work has meaningful scene bridges, readable holds, and a motion craft plan.
- Kinetic relay work includes keyword chain, action-object chain, direction map, relay continuity, midpoint snapshots, and a score of 90 or higher.
- Design engineering validation has run, including scene schema, vector template, and motion primitive checks.
- Composite children share one owner for transform, opacity, clipping, and occlusion.
- Transparent asset placement uses visible alpha bounds where canvas padding would change alignment.
- Entry, readable-hold, and exit checkpoints were extracted from the final MP4 for text-rich or layered scenes.
- Narrow text containers pass exported font measurement and rendered-frame overflow review.
- Typography, visual objects, image stages, and motion all support the extracted essence.
- The work avoids repeated fade-ups, identical centered layouts, empty black gaps, generic icon clutter, and interchangeable wallpaper.
- Timing is deterministic; HyperFrames validation or the best available substitute has run.
- Hero-frame snapshots and review outputs exist, or the blocker is reported.
- Any user-reported visual defect is recorded with root cause, upstream artifact changed, rerun evidence, and whether the skill/template/validator needs a rule update.

### First-Frame Visual Center Gate

The first 0-2 seconds decide whether the video feels intentional. For every vertical promo, inspect the first readable hold and the first product-proof hold:

- Name the dominant visual mass: title block, number, card stack, product surface, screenshot, symbol, CTA, or route object.
- Check optical center, not only CSS center: the perceived group center should sit on the intended axis, or the storyboard must explain the offset.
- Check edge clearance: no important card, screenshot, product edge, label, or CTA may be clipped unless the crop is an intentional transition.
- Check actual rendered MP4 stills, not only browser snapshots, because render scale, transforms, and perspective can reveal crop errors.
- If a hero element is intentionally off-center, record the counterweight that balances it: title, symbol, light, card, negative space, or motion direction.

## Hard Stability Rules

Do not use:

- Wall-clock animation state such as `Date.now()` for render-critical motion.
- Unseeded `Math.random()` for render-critical visuals.
- `setTimeout`, `setInterval`, or `requestAnimationFrame` as the source of truth for main animation timing.
- Asynchronous construction of core timelines.
- Render-time network requests for required assets.
- Manual `video.play()`, `video.pause()`, or uncontrolled media time changes.
- Infinite animation repeats in a render timeline.

Use seeded randomness, fixed duration, fixed fps, fixed dimensions, local assets, and explicit timeline positions. Default new-video dimensions are `1080x1920` for 9:16 vertical output unless the brief documents another target.

## References

- Read `references/workflow.md` for the full production workflow.
- Read `references/imagegen-asset-pipeline.md` when planning generated background sets, component sheets, transparent cutouts, asset manifests, or image asset validation.
- Read `references/asset-choreography-and-render-qa.md` when using a supplied style reference, approving asset-role coverage, testing component combinations, aligning transparent assets, or validating rendered MP4 frames.
- Read `references/visual-standard.md` when judging style, typography, layout, and motion.
- Read `references/text-over-background-layout.md` when planning layout contracts, text rectangles, subject rectangles, title tiers, crop-safe zones, and mobile safe boundaries.
- Read `references/motion-craft.md` when planning kinetic typography, CSS3/SVG structure, GSAP choreography, scene transitions, or anti-PPT improvements.
- Read `references/design-engineering.md` when planning scene schemas, SVG template libraries, motion primitive catalogs, selection rules, browser validation, or batch template mode.
- Read `references/gsap-choreography.md` when planning GSAP timelines, plugin registration, SplitText, DrawSVG, MorphSVG, MotionPath, CustomEase, position parameters, and performance.
- Read `references/audio-sync.md` when timing to music, voiceover, or captions.
- Read `references/hyperframes-stability.md` before implementing or debugging render behavior.

## Templates

Use the templates in `templates/` for production artifacts:

- `BRIEF_DESIGN_PROPOSAL.template.md`
- `DESIGN.template.md`
- `STORYBOARD.template.md`
- `REVIEW_REPORT.template.md`
- `SCENE_SCHEMA.template.json`
- `VECTOR_TEMPLATES.template.json`
- `MOTION_PRIMITIVES.template.json`
- `ASSET_MANIFEST.template.json`

Optional templates:

- `BEAT_MAP.template.json`
- `MOTION_MAP.template.json`

## Local Skill Checks

This skill includes deterministic utility scripts:

```bash
node scripts/check-structure.mjs
node scripts/create_project.mjs <target-dir>
node scripts/check_assets.mjs <project-dir>
node scripts/validate_image_assets.mjs <project-dir>
node scripts/validate_artifacts.mjs <project-dir>
node scripts/validate_design_engineering.mjs <project-dir>
node scripts/build_review_pack.mjs <project-dir>
```

`check-structure.mjs` checks the skill package. The other scripts help with project scaffolding, local asset checks, artifact completeness validation, design engineering contract validation, and optional review pack generation. These scripts do not prove visual quality; they only catch workflow, structure, and reproducibility problems.
