# Image Gen Asset Pipeline

Use this reference for premium vertical productions that need generated scene backgrounds, foreground objects, component sheets, transparent cutouts, or an image asset manifest.

## Core Principle

Count meaning before counting images.

The asset set is derived from:

1. Distinct visual worlds.
2. Source-specific objects that must move independently.
3. Product or story claims that need visible proof.
4. Transition objects that physically hand attention between beats.
5. Resolution and isolation needs.

Do not begin from a target such as four backgrounds or twelve components. Those numbers may be correct for one film and wrong for the next.

## Phase 1 Asset Analysis

### Visual worlds

Group beats only when they can share all of these:

- The same spatial metaphor or product environment.
- The same lighting and camera logic.
- A compatible text-safe zone.
- The same story job.
- A transition that does not need a new reveal world.

Split a new visual world when:

- Hook, mechanism, proof, confidence, or CTA needs a different spatial meaning.
- Reusing the stage would make the film look like title cards over wallpaper.
- The subject position or quiet text zone changes materially.
- The transition needs a new object, opening, chamber, route, surface, or destination.

Premium multi-scene work normally needs multiple independent vertical backgrounds. The exact count equals the approved visual-world analysis, not the duration.

For every world, record:

- ID.
- Source beats.
- Why it cannot share another background.
- Background role.
- Focal subject.
- Quiet text zone.
- Target scenes.
- Transition entry and exit.

### Movable foreground inventory

List a foreground object only when it must:

- Replace explanation.
- Move independently.
- Prove a source claim.
- Carry attention into another beat.
- Change state.
- Create the main memory hook.

For every object, record:

- Exact source phrase.
- Story role.
- Target scene.
- Motion action.
- Expected on-screen scale.
- Whether it is a hero object.
- Deletion test.

The accepted list decides the transparent cutout count.

## Sheet Strategy

Premium vertical generated-image work uses at least one source-driven component sheet. A separately generated hero can supplement the sheet, but cannot replace it. If the entire foreground must remain official, supplied, or code-native and no Image Gen component is truthful, record a user-approved pipeline exception instead of silently setting the sheet count to zero.

Use one sheet when:

- Every object remains large enough to crop cleanly.
- Objects fit with generous separation.
- One perspective and lighting direction suit the whole inventory.
- No hero object needs a large on-screen scale.

Use multiple sheets when:

- The full inventory would crowd one sheet.
- Different component families need different perspective or material.
- Small marks and large product surfaces would waste each other's space.

Generate an object separately when:

- It is the hero.
- It fills a large part of the 1080×1920 frame.
- Fine material or edge detail matters.
- The sheet crop would need enlargement beyond its native resolution.

Sheet count is a resolution and isolation decision, not a style score.

Keep commands, screenshots, labels, UI states, and proof text official or code-native. Put only bitmap-suitable, product-specific objects, material shells, symbols, stamps, transition pieces, and other visually useful foreground elements on the generated sheet.

## Component Sheet Prompt Contract

Every component-sheet request states:

- Exact inventory and grid position.
- One coherent palette, material, border, shadow, perspective, and lighting direction.
- Large non-overlapping isolation space around every item.
- Flat transparent or declared matte background.
- No shared floor, connected shadow, overlap, or merged glow between cells.
- No final screen copy, fake UI text, fake logos, watermarks, labels, or decorative filler.
- One object per cell.
- Hero objects excluded when they need separate generation.

Do not ask Image Gen to label the cells. Map positions in `ASSET_MANIFEST.json`.

## Background Prompt Contract

Generate backgrounds independently at a native vertical ratio.

Every background request states:

- Visual-world ID and story job.
- 9:16 target.
- Focal subject and crop-safe region.
- Quiet text zone and platform-safe boundaries.
- Shared palette, material, lens, lighting, and contrast.
- What visually changes from the other worlds.
- No baked-in copy, logos, fake UI, watermarks, or random icons.

Accept the first strong background as a style anchor. Use it to keep later backgrounds and component sheets in the same visual world.

## Cutout Contract

Preserve source sheets under `assets/images/source/`.

For every accepted item:

1. Crop its cell without neighboring objects.
2. Remove the transparent or declared matte background.
3. Trim unused space without touching the object.
4. Add transparent padding.
5. Save a named PNG under `assets/images/components/`.
6. Check that transparency is real, not only an alpha channel with opaque pixels.
7. Check that every outer edge is fully transparent.
8. Check for green, blue, white, or black matte spill.
9. Check native resolution against expected display scale.
10. Record the path and source cell in the manifest.

Build two proof sheets:

- Dark background: catches light halos and pale matte residue.
- Light background: catches dark halos, lost shadows, and black matte residue.

Reject a cutout when:

- The object touches an outer edge.
- The alpha channel is fully opaque.
- Matte color remains in visible pixels.
- Another component leaks into the crop.
- Fine detail collapses at intended scale.
- The object needs a label to explain its role.

## Asset Manifest

Use `templates/ASSET_MANIFEST.template.json`.

The manifest records:

- Production decision, user-approved exception status, and exception reason.
- Background, component, sheet, and separate-hero count reasons.
- Visual-world inventory.
- Background IDs, paths, roles, scenes, and quiet zones.
- Component inventory.
- Sheet strategy plus every sheet ID, path, grid, transparent/matte background mode, matte color when applicable, and accepted ID.
- Cutout paths, generation method, source sheet/cell when applicable, source phrases, target scenes, motion actions, and hero status.
- Dark/light proof sheets.
- Revision history whenever the approved asset analysis changes.

The approved analysis owns the numbers. Phase 2 fills accepted local paths. If the count changes, update the reason and record the revision before animation.

Required item shapes:

```text
visual_world: id, source_beats[], reason, background_id
background: id, path, scene_ids[], role, quiet_zone
component_sheet: id, path, grid, background_mode, matte_color, accepted_component_ids[]
component: id, path, generation_method, source_sheet_id, source_cell, source_phrase, role, target_scenes[], motion_action, hero
revision: timestamp, field, previous_value, new_value, reason, approval_reference
```

Use `background_mode: "matte"` with a six-digit `matte_color`, or `background_mode: "transparent"` with `matte_color: null`. Use `generation_method: "sheet"` for cropped sheet items and `"separate"` only for supplemental hero generations. Keep `revisions` as an empty array until an approved decision changes.

## Validation

Run:

```bash
node scripts/validate_image_assets.mjs <project-dir>
node scripts/check_assets.mjs <project-dir> --strict --require-premium-assets
```

The validator checks:

- Declared worlds and generated backgrounds agree.
- Declared component inventory and transparent cutouts agree.
- Sheet strategy agrees with the number of sheets and any separately generated objects.
- Backgrounds are independent and approximately 9:16.
- PNG files are decodable.
- Cutouts contain real transparency and transparent outer edges.
- Declared matte color is removed.
- Proof sheets exist.
- Composition source uses backgrounds and cutouts.
- Composition source does not use the source sheet directly.

Validation proves asset integrity, not directing quality. Static hero frames and rendered video stills still decide whether the assets produce a strong film.

## Review Questions

- Does every background represent a genuinely different visual world?
- Could two backgrounds be merged without losing meaning? If yes, merge them.
- Does any beat reuse a background only to save work? If yes, regenerate.
- Does every cutout move, prove, transform, or hand off attention?
- Is the sheet crowded because of an arbitrary item target?
- Does a hero object need a separate high-resolution generation?
- Do the dark and light proof sheets show clean edges?
- Would the frame fall back to black background plus text if the cutouts were removed?
