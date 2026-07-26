# Design System

## Writing Standard
- Language: plain Chinese for user-facing notes unless the user asks otherwise
- Sentence style: short, direct, project-specific
- Avoid: repeated contrast phrasing, self-talk, generic praise, sales slogans, unrelated commentary, and long process narration
- Keep: stable visual rules, asset rules, layout contracts, motion rules, and validation notes

## Overview
3-4 sentences describing the essence metaphor, why it fits the brief, and how the video will feel as a readable vertical cinematic sequence with strong hold frames and transition-ready motion.

## Metaphor System
- Core viewpoint:
- Visual metaphor:
- Dominant symbol:
- Symbol meaning:
- What must stay implicit:
- Excluded visual content:

## Source-Driven Visual System
- Source phrases:
- Concrete nouns / entities:
- Process verbs / actions:
- Emotional tension:
- Numbers / modules / metrics:
- Core visual motif:
- Component families:
- Text-to-component map:
- Big text box replacement rule:
- Generic visual rejection list:
- Source recognition test:

## Reference Fidelity And Narrative Boundary
- Reference source type:
- Exact source inspected:
- Exact source reviewed:
- Observed visual grammar:
- Style controls:
- Product / source story remains primary:
- Narrative boundary:
- Forbidden drift:

## Colors
- Background: `#050505` deep black.
- Foreground: white / light gray.
- Accent: restrained warm gold only.
- Secondary: dark graphite / soft gray.
- Gradient / glow policy: no colorful gradients; use only subtle warm edge light or metallic glint when it supports the metaphor.

## Typography
- Display font: high-contrast serif or restrained cinematic grotesk, chosen for the theme.
- Body font: quiet neutral sans.
- Number / technical font: only if the structure uses a huge number or data shock.
- Type scale: one huge title, one quiet support line, one CTA/brand lockup.
- Copy language: Simplified Chinese promotional copy by default; preserve English brand/product terms only when useful.
- Chinese copy rules: low character count per beat, deliberate line breaks, large type, and no dense subtitle blocks.
- Font weight policy: avoid too many weights; title must dominate.
- Line height: tight but not colliding for display text; comfortable for support text.
- Letter spacing: default `0`; use tracking only for small all-caps labels.

## Layout
- Aspect ratio: 9:16 by default
- Pixel size: 1080x1920 by default
- Safe margins: protect top/bottom platform UI zones; keep primary copy center-safe
- Grid / alignment: one dominant symbol or title with large negative space.
- First eye target: define what the viewer notices first in each hero frame.
- Center-impact policy: hooks and amplified keywords should use center or upper-center impact unless the subject must own that zone.
- Lower-safe policy: use lower-middle/lower-third text mainly for CTA, proof notes, or when the subject occupies the center.
- Density: sparse; every visible element must earn its place.
- Hero frame rules: readable while paused; no explanatory icon clusters.

## Background Text Layout System
- Default layout strategy:
- Allowed layout contract variants:
- Title size tier:
- Text rectangle / subject rectangle:
- Title / support / CTA spacing:
- Mobile safe-zone handling:
- Motion bounds:
- Regenerate / recrop trigger:

## Background Image System
- Default background stage: generated / supplied / pure-code exception
- Visual asset floor for this video:
- Asset manifest path:
- Distinct visual worlds:
- Background count decision:
- Background count reason:
- Background inventory / scene ownership:
- Local background / screenshot / generated proof assets:
- Empty `assets/images` allowed: yes / no, with user-approved reason
- Pure-code exception reason, if any:
- Background role:
- Background source:
- Local asset path:
- Crop rules:
- Focal subject:
- Quiet text zone:
- Contrast treatment behind text:
- Forbidden content:

## Text Over Image
- Title placement:
- Support placement:
- CTA placement:
- Maximum line counts:
- Chinese line-break plan:
- Overflow fallback:
- Mixed Chinese / English fallback:
- Minimum contrast rule:
- When to regenerate or recrop the image:

## Components
- Center symbol:
- Primary visual object:
- Functional marks:
- Texture pieces:
- Object restraint:
- Removal test:
- Mandatory visual component library:
- Product visual component coverage:
- Source phrase required per component:
- Component inventory:
- Component count decision:
- Component count reason:
- Component sheet strategy:
- Component sheet count reason:
- Component sheet source / crop plan:
- Component sheet source phrases:
- Component sheet style system:
- Component state-change rule:
- Command / API card:
- Output / draft card:
- Stat / proof block:
- Module / provider chips:
- Product frame / screenshot surface:
- Anchored signal / route-node sequence:
- Connector / line policy:
- Connector allowed only when anchored to:
- Component-attached signal fallback:
- CTA badge / action pill:
- Separate hero object decision:
- Transparent cutout rule:
- Dark / light contact sheet rule:
- Component rejection tests:
- Static-component rejection tests:
- Big-text-box rejection tests:
- Title card:
- Product frame:
- Proof / stat moment:
- Caption:
- CTA / brand lockup:

## Motion-Role Asset Coverage
- Narrative anchor components:
- Product proof components:
- Transition carrier components:
- Additional motion roles:
- Combination test 1:
- Combination test 2:
- Duplicate component-set rejection:
- Same-silhouette rejection:
- Independent-entry-only rejection:

## Rendered-Frame Integrity
- Composite owner groups:
- Shared transform / opacity / clip / occlusion rule:
- Transparent assets requiring visible alpha bounds:
- Narrow text containers requiring exported font measurement:
- Entry checkpoint policy:
- Readable-hold checkpoint policy:
- Exit checkpoint policy:
- Browser / final-MP4 conflict policy: final MP4 wins

## Product Proof And Asset Library
- Product proof inventory:
- Existing repository assets:
- Official / supplied assets:
- Screenshots or rendered outputs:
- Generated product-safe mockups:
- Code-native SVG/CSS components:
- Icon library:
- Decorative element library:
- What each asset proves:
- Scene ownership per asset:
- Assets that must be deleted if decorative:

## Support Asset System
- Support asset decision: none / generated / supplied / code-generated / mixed
- Asset count decision:
- Asset count reason:
- Asset roles: symbol / texture / anchor / transition plate / semantic glyph / motion accent / product fragment
- Shared style lock: palette / lighting direction / texture language / perspective
- Generated asset sheet needed: yes / no
- Asset isolation / cutout plan:
- Code-generated elements:
- Bitmap-generated elements:
- Local asset paths after generation:
- Safe-zone rules:
- Motion purpose per asset:
- Deletion trigger:

## Kinetic Text Relay System
- Use kinetic relay mode:
- Keyword chain:
- Action object chain:
- Direction vocabulary:
- Relay / handoff rules:
- Icon policy:
- Connector policy:
- Push / wipe / scan policy:
- Type-on / cursor policy:
- Transition midpoint frame rules:
- Fade policy:
- Kinetic relay score target:
- PPT failure trigger:

## Motion Personality
- Default ease: `sine.inOut`, `expo.out`, or similarly controlled cinematic easing.
- Default entrance duration: deliberate, usually 0.8-1.6s for major reveals.
- Camera behavior: slow push, parallax, or controlled reveal; no restless motion.
- Transition energy: hide scene replacement and land on a readable hero frame.
- Audio hit behavior: structural hits only for title, symbol reveal, proof, and CTA.
- Motion budget: one primary motion idea per scene and one optional support motion.
- Background motion: slow push / parallax / focus pull / light sweep / none.
- Text stillness: major copy must settle before it needs to be read.
- Signature motion moment:
- Repeated animation pattern to avoid:

## Motion Craft System
- Anti-PPT diagnosis:
- Camera / spatial movement:
- Kinetic typography language:
- Text transition vocabulary:
- CSS3 layers:
- SVG layers:
- GSAP master timeline structure:
- Scene transition bridges:
- Anchored connector rules:
- Readable lock moments:
- Signature motion moment:
- Motion devices to avoid:

## Component Interaction System
- Command card interaction:
- Output card interaction:
- Stat block interaction:
- Chip group interaction:
- Screenshot / theme stack interaction:
- Proof card interaction:
- CTA interaction:
- Connector interaction:
- State-change rule:

## Image Generation Plan
- Asset manifest path:
- Visual-world inventory:
- Background count decision / reason:
- Background prompts / roles / scenes / sizes / quiet zones / acceptance tests:
- Movable foreground inventory:
- Component count decision / reason:
- Component sheet strategy / count reason:
- Separate hero-object generations:
- Texture / atmosphere:
- Texture role / size:
- Component sheets:
- Component sheet roles / cells / isolation margins:
- Transparent cutout output paths:
- Dark / light contact sheet paths:
- Semantic glyphs or motion accents:
- Which elements stay code-generated:
- Required negative space:
- Forbidden generated content:
- Prompt constraints:
- Codex Image Gen output path after confirmation:
- Keep final text, proof notes, CTA, masks, crops, parallax, focus pulls, and timing in HyperFrames unless exact baked-in content is required.

## Do
- Draw the essence metaphor.
- Use black, white, gray, and warm gold only.
- Keep one dominant idea per frame.
- Use paper grain, volume haze, shallow depth of field, rim light, and restrained metallic detail.
- Use support assets only when they strengthen meaning, depth, proof, or transition continuity.

## Don't
- Avoid ordinary illustration, ecommerce banner layout, icon piles, generic neon tech, multicolor palettes, and busy collage.
- Avoid decoration that only fills empty space.
- Avoid free-floating lines, arcs, rails, and underlines without visible anchors.
- Avoid labels that explain the metaphor.
- Do not generate a decorative asset sheet without named roles, safe zones, and motion purpose.

## Accessibility / Readability
- Contrast:
- Minimum text size:
- Vertical crop concerns:
- Bottom overlay / CTA collision:
