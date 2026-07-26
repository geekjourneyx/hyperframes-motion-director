# Asset Choreography And Render QA

Use this reference when a user supplies a visual reference, asks for richer visual materials, or reports overlap, overflow, weak contrast, transparency, crop, or export differences.

## Why This Gate Exists

Three false positives repeatedly create avoidable rework:

1. File count is mistaken for visual range.
2. A named style is mistaken for the exact reference.
3. Browser snapshots are mistaken for final rendered evidence.

The correct unit of quality is a visible story action that survives export.

## 1. Inspect The Exact Reference

Resolve the source before interpreting it:

- Attachment or pasted prompt: read the full local source.
- Local repository or directory: inspect that exact path, not a similarly named remote project.
- Image: inspect the pixels, not only the filename or style label.
- Named style without an attachment: record the house interpretation and its uncertainty.

Write the result into `asset_analysis.style_reference`:

- `source_type`
- `exact_source`
- `reviewed`
- `visual_grammar`
- `narrative_boundary`
- `forbidden_drift`

`visual_grammar` contains observable properties, not praise words. Prefer:

- Palette and ink/material behavior.
- Edge, crop, outline, grain, halftone, shadow, and depth treatment.
- Composition density and dominant-mass placement.
- Relationship between type, image, and negative space.
- Transition behavior implied by the material.

Reject vague entries such as "premium", "advanced", "cinematic", or "Riso-like" unless they are followed by visible properties from the exact source.

## 2. Separate Style From Story

Define two independent contracts:

- Style contract: how surfaces, edges, colors, materials, depth, and transitions look.
- Narrative contract: which product actions, source claims, characters, objects, and proof states the viewer must understand.

The style contract may transform the narrative objects. It may not replace them.

Examples:

- Riso can control ink colors, halftone, paper, registration offset, and wipes. It must not turn a publishing workflow into a film about printing machinery.
- Collage can control torn edges, taped layers, paper depth, and assembly. It must not replace product proof with decorative stationery.
- Cinematic black can control lighting, contrast, and pacing. It must not reduce a product promo to titles on a dark background.

## 3. Build Assets By Motion Job

Start from source nouns and verbs, then assign each accepted foreground component one or more motion jobs.

Required jobs for premium multi-scene work:

| Job | Question | Typical evidence |
| --- | --- | --- |
| Narrative anchor | What remains recognizably the same across beats? | person, article, hero object, product surface |
| Product proof | What makes the claim visible and believable? | command, screenshot, state, result, number, choice |
| Transition carrier | What physically carries material into the next beat? | tear, fold, route, wipe, stamp, rail, scan, fan |

Additional source-derived jobs are allowed, such as counterweight, depth frame, inspection mark, or CTA resolver. They do not replace the three core jobs.

The minimum of three independent foreground components for premium multi-scene work is mathematical, not stylistic: it is the smallest library that can form two distinct two-object combinations.

## 4. Combination Proof

Before animation, record at least two distinct combination tests for premium multi-scene work:

```json
{
  "id": "article-to-preview",
  "scene_id": "preview",
  "component_ids": ["article-paper", "phone-frame", "scan-rail"],
  "choreography": "The article folds into the phone while the scan rail confirms the preview state.",
  "snapshot_timestamp": 11.4,
  "deletion_test": "Without the phone or rail, the viewer cannot see that the same article became a checked preview."
}
```

A valid second test changes the component set and the relationship between objects. These do not count:

- The same cards with different labels.
- The same component set at another timestamp.
- Independent fade-ins with no handoff or shared action.
- A decorative pile that does not prove a claim or bridge a scene.

## 5. Composite Ownership

A composite component is one semantic object even when implemented with many layers.

Examples:

- Terminal shell + command text + cursor + status light.
- Search field + query + icon + border.
- Product card + title + metadata + image + shadow.
- Paper ring + logo + highlight + texture.

All children share one owner for:

- Transform.
- Opacity.
- Clip or mask.
- Occlusion and stacking.

If the shell goes behind a paper, its text and controls go behind the paper with it. A child may animate internally, but it may not cross the owner's external occlusion boundary.

Record every risky group in `render_qa_contract.composite_groups`.

## 6. Visible Alpha Bounds

Transparent PNG placement must use the visible subject, not the file canvas.

For every transparent asset aligned to text, a frame, a safe zone, or another object:

1. Measure the smallest rectangle containing meaningful non-transparent pixels.
2. Position and clear the asset from that visible rectangle.
3. Preserve outer transparent padding for motion and filtering.
4. Recheck the rendered frame after scale, perspective, and filter changes.

This prevents a visually large transparent margin from making code coordinates appear correct while the visible paper, ring, or badge overlaps nearby text.

## 7. Exported Text Fit

Any narrow text container needs an export-parity check:

- Search fields.
- Pills and badges.
- Buttons.
- Small cards.
- Terminal rows.
- CTA labels.
- Chinese/English mixed text.

Measure with the font actually used by the renderer. If the renderer substitutes a font, use the exported width as the source of truth.

Pass conditions:

- Text remains inside the visible container, not only its CSS box.
- Intended padding survives export.
- No glyph clips at entry, hold, or exit.
- Contrast remains readable over the exported background and opacity.

## 8. Entry / Hold / Exit Evidence

For each layered or text-rich scene, inspect three final-MP4 checkpoints:

- Entry: ownership, clipping, initial overlap.
- Hold: reading, contrast, font fit, visible bounds.
- Exit: moving overflow, child desynchronization, transition collision.

Each evidence row names:

- Scene and phase.
- Timestamp.
- Rendered MP4 frame path.
- Assertion.
- Result.
- Fix and rerun path when failed.

Browser snapshots remain useful for fast iteration. They do not replace final-MP4 evidence.

## 9. Failure Routing

Fix the earliest faulty contract:

| Failure | Update first |
| --- | --- |
| Style looks adjacent but not faithful | exact reference analysis and asset prompt |
| Style mechanism hides the product | narrative boundary and storyboard |
| Many assets still feel repetitive | motion-role coverage and combination tests |
| Text floats through another object | composite ownership |
| Transparent object overlaps nearby text | visible alpha bounds |
| Browser fits but export overflows | exported font measurement and layout contract |
| Hold looks good but motion clips | entry/exit checkpoints and motion bounds |

After any fix, rerender the full affected path and re-extract the final MP4 frame. Do not close a render defect with browser-only evidence.
