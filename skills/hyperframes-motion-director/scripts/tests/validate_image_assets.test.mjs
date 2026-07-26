import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { deflateSync } from "node:zlib";
import test from "node:test";

const skillRoot = resolve(import.meta.dirname, "../..");
const validatorPath = join(skillRoot, "scripts/validate_image_assets.mjs");
const assetCheckerPath = join(skillRoot, "scripts/check_assets.mjs");

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value;
  for (let bit = 0; bit < 8; bit += 1) {
    crc = (crc & 1) ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  }
  return crc >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, checksum]);
}

function encodePng(width, height, {
  alpha = false,
  edgeOpaque = false,
  matteSpill = false,
  variant = 0,
  alphaValue = 255,
  padding = 8,
  singleOpaquePixel = false,
  singleTransparentPixel = false,
} = {}) {
  const channels = alpha ? 4 : 3;
  const stride = width * channels;
  const raw = Buffer.alloc((stride + 1) * height);

  for (let y = 0; y < height; y += 1) {
    const row = y * (stride + 1);
    raw[row] = 0;
    for (let x = 0; x < width; x += 1) {
      const offset = row + 1 + x * channels;
      const border = x < padding || x >= width - padding || y < padding || y >= height - padding;
      let opaque = edgeOpaque ? true : !border;
      if (singleOpaquePixel) opaque = x === Math.floor(width / 2) && y === Math.floor(height / 2);
      if (singleTransparentPixel) opaque = !(x === Math.floor(width / 2) && y === Math.floor(height / 2));
      const spill = matteSpill && x >= 8 && x < 16 && y >= 8 && y < height - 8;
      raw[offset] = spill ? 0 : 38 + variant;
      raw[offset + 1] = spill ? 255 : 30;
      raw[offset + 2] = spill ? 0 : 20;
      if (alpha) raw[offset + 3] = opaque ? alphaValue : 0;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = alpha ? 6 : 2;
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", deflateSync(raw)),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

function encodeIndexedPng(width, height) {
  const raw = Buffer.alloc((width + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * (width + 1);
    raw[row] = 0;
    for (let x = 0; x < width; x += 1) {
      const border = x < 8 || x >= width - 8 || y < 8 || y >= height - 8;
      raw[row + 1 + x] = border ? 0 : 1;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 3;
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    pngChunk("IHDR", ihdr),
    pngChunk("PLTE", Buffer.from([0, 0, 0, 38, 30, 20])),
    pngChunk("tRNS", Buffer.from([0, 255])),
    pngChunk("IDAT", deflateSync(raw)),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

function writeAsset(root, relativePath, png) {
  const target = join(root, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, png);
}

function buildFixture(overrides = {}) {
  const root = mkdtempSync(join(tmpdir(), "hf-image-assets-"));
  const backgroundPaths = Array.from({ length: overrides.backgroundCount ?? 2 }, (_, index) => (
    `assets/images/backgrounds/0${index + 1}-stage.png`
  ));
  const componentPaths = Array.from({ length: overrides.componentCount ?? 3 }, (_, index) => (
    `assets/images/components/0${index + 1}-component.png`
  ));
  const declaredBackgroundCount = overrides.declaredBackgroundCount ?? backgroundPaths.length;
  const declaredComponentCount = overrides.declaredComponentCount ?? componentPaths.length;
  const separateAll = overrides.separateAll === true;
  const sheetCount = separateAll ? 0 : overrides.sheetCount ?? 1;
  const separateHeroIndex = overrides.separateHeroIndex ?? -1;
  const isSeparate = (index) => separateAll || index === separateHeroIndex;

  for (const [index, path] of backgroundPaths.entries()) {
    writeAsset(root, path, encodePng(720, 1280, {
      variant: overrides.duplicateBackgrounds ? 0 : index,
    }));
  }

  const sheetPaths = Array.from(
    { length: sheetCount },
    (_, index) => `assets/images/source/component-sheet-${index + 1}.png`,
  );
  for (const [index, path] of sheetPaths.entries()) {
    writeAsset(root, path, encodePng(900, 1280, {
      alpha: overrides.transparentSheet && !overrides.transparentSheetOpaque,
      variant: index,
      singleTransparentPixel: overrides.almostOpaqueTransparentSheet,
      padding: overrides.transparentSheet ? 64 : 8,
    }));
  }

  for (const [index, path] of componentPaths.entries()) {
    const hero = index === separateHeroIndex;
    writeAsset(root, path, encodePng(hero ? 560 : 220 + index, hero ? 620 : 240, {
      alpha: overrides.opaqueComponent !== index,
      edgeOpaque: overrides.edgeOpaqueComponent === index,
      matteSpill: overrides.matteSpillComponent === index,
      alphaValue: overrides.lowAlphaComponent === index ? 3 : 255,
      padding: overrides.thinPaddingComponent === index ? 1 : 8,
      singleOpaquePixel: overrides.singlePixelComponent === index,
    }));
  }
  if (overrides.indexedComponent) {
    writeAsset(root, componentPaths[0], encodeIndexedPng(220, 240));
  }

  const manifest = {
    schema_version: 2,
    production: {
      premium_vertical_promo: true,
      duration_seconds: 15,
      scene_count: 5,
      exception: overrides.exception ?? null,
      exception_approved_by_user: overrides.exceptionApproved ?? false,
      exception_reason: overrides.exceptionReason ?? null,
      approval_reference: overrides.approvalReference ?? null,
    },
    requirements: {
      approved_background_count: declaredBackgroundCount,
      component_sheet_strategy: separateAll
        ? "separate_generation"
        : separateHeroIndex >= 0
          ? "mixed"
          : sheetCount > 1
            ? "multiple_sheets"
            : "one_sheet",
      approved_component_count: declaredComponentCount,
      minimum_background_long_edge: 1280,
      minimum_sheet_long_edge: 1280,
      minimum_component_long_edge: 192,
    },
    asset_analysis: {
      background_count_reason: "Two source beats require two genuinely different visual worlds.",
      component_count_reason: "Every accepted source noun that must move is listed once.",
      sheet_count_reason: "One sheet preserves style while keeping every accepted cell large enough.",
      hero_generation_reason: separateHeroIndex >= 0 ? "The hero needs independent native resolution." : "No separate hero is needed.",
      style_reference: overrides.omitStyleReference ? null : {
        source_type: "house_style",
        exact_source: "skills/hyperframes-motion-director/SKILL.md#House-Style",
        reviewed: true,
        visual_grammar: [
          "deep black stage",
          "restrained warm-gold accents",
          "one dominant visual mass",
        ],
        narrative_boundary: "The style shapes material and transitions; product actions remain the story.",
        forbidden_drift: [
          "Do not replace product proof with a style-mechanism demonstration.",
          "Do not substitute a generic interpretation of the named style.",
        ],
      },
      visual_worlds: Array.from({ length: declaredBackgroundCount }, (_, index) => ({
        id: overrides.duplicateWorldIds ? "world-1" : `world-${index + 1}`,
        source_beats: [`scene-${index + 1}`],
        reason: `Distinct visual job ${index + 1}`,
        background_id: overrides.duplicateWorldMapping ? "stage-1" : `stage-${index + 1}`,
      })),
      component_inventory: Array.from({ length: declaredComponentCount }, (_, index) => ({
        id: overrides.duplicateInventoryMapping ? "component-1" : `component-${index + 1}`,
        source_phrase: `source phrase ${index + 1}`,
        reason: `Must perform action ${index + 1}`,
      })),
      motion_role_coverage: {
        roles: overrides.insufficientMotionRoles
          ? [
            {
              id: "product_proof",
              reason: "Every component only repeats the same proof-card job.",
              component_ids: Array.from(
                { length: declaredComponentCount },
                (_, index) => `component-${index + 1}`,
              ),
            },
          ]
          : [
            {
              id: "narrative_anchor",
              reason: "Keeps the same source object recognizable across the story.",
              component_ids: ["component-1"],
            },
            {
              id: "product_proof",
              reason: "Makes the product claim visible as a concrete state.",
              component_ids: ["component-2"],
            },
            {
              id: "transition_carrier",
              reason: "Hands visual material from one beat into the next.",
              component_ids: declaredComponentCount > 2
                ? Array.from(
                  { length: declaredComponentCount - 2 },
                  (_, index) => `component-${index + 3}`,
                )
                : ["component-1"],
            },
          ],
        combination_tests: [
          {
            id: "assembly-a",
            scene_id: "scene-1",
            component_ids: declaredComponentCount > 1
              ? ["component-1", "component-2"]
              : ["component-1"],
            choreography: "The narrative anchor hands the claim into the proof surface.",
            snapshot_timestamp: 2.4,
            deletion_test: "Deleting either object breaks the action-to-proof handoff.",
          },
          {
            id: "assembly-b",
            scene_id: "scene-2",
            component_ids: overrides.duplicateCombinationTests
              ? (declaredComponentCount > 1
                ? ["component-1", "component-2"]
                : ["component-1"])
              : declaredComponentCount > 2
                ? ["component-2", "component-3"]
                : ["component-2", "component-1"],
            choreography: "The proof surface exits through a transition carrier.",
            snapshot_timestamp: 5.2,
            deletion_test: "Deleting the carrier turns the bridge into a generic cut.",
          },
        ],
      },
    },
    backgrounds: backgroundPaths.map((path, index) => ({
      id: `stage-${index + 1}`,
      path,
      scene_ids: [`scene-${index + 1}`],
      role: `stage role ${index + 1}`,
      quiet_zone: "upper-center",
    })),
    component_sheets: sheetPaths.map((path, sheetIndex) => ({
      id: `sheet-${sheetIndex + 1}`,
      path: overrides.duplicateSheetFiles && sheetIndex === 1 ? sheetPaths[0] : path,
      grid: `${Math.max(1, Math.ceil((componentPaths.length - (separateAll ? componentPaths.length : separateHeroIndex >= 0 ? 1 : 0)) / sheetCount))}x1`,
      background_mode: overrides.transparentSheet ? "transparent" : "matte",
      matte_color: overrides.transparentSheet ? null : "#00ff00",
      accepted_component_ids: componentPaths
        .map((_, index) => ({ id: `component-${index + 1}`, index }))
        .filter(({ index }) => (
          !isSeparate(index)
          && (
            overrides.unusedSecondSheet
              ? sheetIndex === 0
              : index % sheetCount === sheetIndex
          )
        ))
        .map(({ id }) => id),
    })),
    components: componentPaths.map((path, index) => ({
      id: `component-${index + 1}`,
      path: overrides.duplicateComponentFiles && index === 1 ? componentPaths[0] : path,
      generation_method: isSeparate(index) ? "separate" : "sheet",
      source_sheet_id: isSeparate(index)
        ? null
        : overrides.unusedSecondSheet
          ? "sheet-1"
          : `sheet-${(index % sheetCount) + 1}`,
      source_cell: isSeparate(index)
        ? null
        : overrides.duplicateSourceCells
          ? 1
          : overrides.unusedSecondSheet
            ? index + 1
            : componentPaths
              .slice(0, index + 1)
              .filter((_, candidateIndex) => (
                !isSeparate(candidateIndex)
                && candidateIndex % sheetCount === index % sheetCount
              ))
              .length,
      source_phrase: `source phrase ${index + 1}`,
      role: `proof role ${index + 1}`,
      target_scenes: [`scene-${(index % 3) + 1}`],
      motion_action: "assemble",
      hero: index === separateHeroIndex,
    })),
    proof: {
      dark_contact_sheet: "assets/images/proof/components-dark.png",
      light_contact_sheet: "assets/images/proof/components-light.png",
      reviewed: true,
      review_notes: "Edges remain clean on both dark and light fields.",
    },
    revisions: [],
  };

  writeAsset(root, manifest.proof.dark_contact_sheet, encodePng(720, 1280));
  writeAsset(root, manifest.proof.light_contact_sheet, encodePng(720, 1280, { variant: 1 }));
  writeFileSync(join(root, "ASSET_MANIFEST.json"), JSON.stringify(manifest, null, 2));
  if (overrides.invalidSheet) {
    writeFileSync(join(root, sheetPaths[0]), "not a png");
  }

  const references = [...backgroundPaths, ...componentPaths];
  if (overrides.referenceSourceSheet) references.push(sheetPaths[0]);
  mkdirSync(join(root, "compositions"), { recursive: true });
  writeFileSync(
    join(root, "compositions/index.html"),
    overrides.commentOnlyReferences
      ? `<!-- ${references.join(" ")} -->`
      : overrides.inlineCommentReferences
        ? `const ready = true; // ${references.join(" ")}`
        : overrides.suppliedFakeReference
          ? '<img src="../assets/images/does-not-exist.png">'
      : references.map((path) => `<img src="../${path}">`).join("\n"),
  );

  return root;
}

function runValidator(root) {
  return spawnSync(process.execPath, [validatorPath, root, "--json"], {
    encoding: "utf8",
  });
}

test("accepts a complete content-derived premium image asset pipeline", () => {
  const result = runValidator(buildFixture());
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.valid, true);
  assert.equal(report.summary.backgrounds, 2);
  assert.equal(report.summary.components, 3);
});

test("rejects premium work that never records the exact style source and narrative boundary", () => {
  const result = runValidator(buildFixture({ omitStyleReference: true }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /style_reference/i);
});

test("rejects an asset library whose components all repeat one motion role", () => {
  const result = runValidator(buildFixture({ insufficientMotionRoles: true }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /narrative_anchor|transition_carrier|motion role/i);
});

test("rejects repeated component combinations that do not prove compositional range", () => {
  const result = runValidator(buildFixture({ duplicateCombinationTests: true }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /combination.*duplicate|duplicate.*combination/i);
});

test("accepts CLI flags before the project directory", () => {
  const root = buildFixture();
  const result = spawnSync(process.execPath, [validatorPath, "--json", root], {
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(JSON.parse(result.stdout).valid, true);
});

test("accepts a larger content-derived asset inventory without a fixed target", () => {
  const result = runValidator(buildFixture({ backgroundCount: 5, componentCount: 8 }));
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.summary.backgrounds, 5);
  assert.equal(report.summary.components, 8);
});

test("accepts multiple component sheets when inventory size needs more isolation space", () => {
  const result = runValidator(buildFixture({ componentCount: 8, sheetCount: 2 }));
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.summary.componentSheets, 2);
});

test("accepts a separately generated hero alongside a component sheet", () => {
  const result = runValidator(buildFixture({ componentCount: 4, separateHeroIndex: 0 }));
  assert.equal(result.status, 0, result.stderr || result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.summary.separateComponents, 1);
});

test("accepts a valid indexed-color PNG cutout with palette transparency", () => {
  const result = runValidator(buildFixture({ indexedComponent: true }));
  assert.equal(result.status, 0, result.stderr || result.stdout);
});

test("accepts a transparent source sheet without a matte color", () => {
  const result = runValidator(buildFixture({ transparentSheet: true }));
  assert.equal(result.status, 0, result.stderr || result.stdout);
});

test("rejects transparent sheet mode when the sheet is fully opaque", () => {
  const result = runValidator(buildFixture({
    transparentSheet: true,
    transparentSheetOpaque: true,
  }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /must contain real transparency in transparent mode/i);
});

test("rejects transparent sheet mode without meaningful transparent coverage", () => {
  const result = runValidator(buildFixture({
    transparentSheet: true,
    almostOpaqueTransparentSheet: true,
  }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /transparent coverage must be at least/i);
});

test("rejects premium image work that replaces the component collection with only separate generations", () => {
  const result = runValidator(buildFixture({ componentCount: 3, separateAll: true }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /requires at least one source-driven component sheet/i);
});

test("rejects a production that does not fulfill its declared visual worlds", () => {
  const result = runValidator(buildFixture({ backgroundCount: 1, declaredBackgroundCount: 2 }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /declared 2 independent 9:16 backgrounds/i);
});

test("rejects a production that does not fulfill its declared component inventory", () => {
  const result = runValidator(buildFixture({ componentCount: 2, declaredComponentCount: 3 }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /component inventory requires 3 transparent cutouts/i);
});

test("rejects unexplained assets beyond the approved content-derived inventory", () => {
  const result = runValidator(buildFixture({
    backgroundCount: 3,
    componentCount: 4,
    declaredBackgroundCount: 2,
    declaredComponentCount: 3,
  }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /approved asset analysis declares exactly 2.*found 3/i);
  assert.match(result.stderr, /approved component inventory declares exactly 3.*found 4/i);
});

test("rejects duplicate world and component inventory mappings", () => {
  const result = runValidator(buildFixture({
    duplicateWorldMapping: true,
    duplicateInventoryMapping: true,
  }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /visual worlds map more than once to background stage-1/i);
  assert.match(result.stderr, /component inventory id is duplicated: component-1/i);
});

test("rejects duplicate visual-world IDs and duplicate source cells on one sheet", () => {
  const result = runValidator(buildFixture({
    duplicateWorldIds: true,
    duplicateSourceCells: true,
  }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /visual world id is duplicated: world-1/i);
  assert.match(result.stderr, /source cell 1 is assigned more than once on sheet sheet-1/i);
});

test("rejects a source sheet that is not a valid PNG", () => {
  const result = runValidator(buildFixture({ invalidSheet: true }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /component_sheets\[0\].path cannot be inspected/i);
});

test("rejects an unused declared component sheet", () => {
  const result = runValidator(buildFixture({
    componentCount: 4,
    sheetCount: 2,
    unusedSecondSheet: true,
  }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /component_sheets\[1\].accepted_component_ids must contain at least one component/i);
});

test("rejects duplicate source sheets by path or exact content", () => {
  const result = runValidator(buildFixture({
    componentCount: 4,
    sheetCount: 2,
    duplicateSheetFiles: true,
  }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /duplicates source sheet/i);
});

test("rejects component cutouts without real transparency", () => {
  const result = runValidator(buildFixture({ opaqueComponent: 0 }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /real alpha transparency/i);
});

test("rejects component cutouts that touch the outer edge", () => {
  const result = runValidator(buildFixture({ edgeOpaqueComponent: 0 }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /transparent outer edges/i);
});

test("rejects nearly invisible or insufficiently padded component cutouts", () => {
  const lowAlpha = runValidator(buildFixture({ lowAlphaComponent: 0 }));
  assert.notEqual(lowAlpha.status, 0);
  assert.match(lowAlpha.stderr, /visible alpha must reach at least 128/i);

  const thinPadding = runValidator(buildFixture({ thinPaddingComponent: 0 }));
  assert.notEqual(thinPadding.status, 0);
  assert.match(thinPadding.stderr, /transparent padding must be at least/i);
});

test("rejects a transparent component containing only one visible pixel", () => {
  const result = runValidator(buildFixture({ singlePixelComponent: 0 }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /visible subject coverage is too small/i);
});

test("rejects duplicate accepted component cutouts by path or exact content", () => {
  const result = runValidator(buildFixture({ duplicateComponentFiles: true }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /duplicates accepted component/i);
});

test("rejects declared matte-color spill in component cutouts", () => {
  const result = runValidator(buildFixture({ matteSpillComponent: 0 }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /matte-color spill/i);
});

test("rejects compositions that reference the source component sheet", () => {
  const result = runValidator(buildFixture({ referenceSourceSheet: true }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /source component sheet/i);
});

test("does not count asset paths found only in source comments as composition usage", () => {
  const result = runValidator(buildFixture({ commentOnlyReferences: true }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /listed but not referenced by a composition/i);
});

test("does not count asset paths found only in inline comments as composition usage", () => {
  const result = runValidator(buildFixture({ inlineCommentReferences: true }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /listed but not referenced by a composition/i);
});

test("rejects an unsupported or unauditable pipeline exception", () => {
  const result = runValidator(buildFixture({
    exception: "skip because assets take time",
    exceptionApproved: true,
    exceptionReason: "Convenience",
    approvalReference: "unknown",
  }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /exception must be one of/i);
});

test("supplied-assets exception requires a real referenced local image", () => {
  const result = runValidator(buildFixture({
    exception: "supplied_assets",
    exceptionApproved: true,
    exceptionReason: "The user supplied finished product imagery.",
    approvalReference: "Phase 1 confirmation message",
    suppliedFakeReference: true,
  }));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /is missing: assets\/images\/does-not-exist.png/i);
});

test("rejects an asset symlink that resolves outside the production directory", () => {
  const root = buildFixture();
  const outside = join(tmpdir(), `hf-outside-${process.pid}.png`);
  writeFileSync(outside, encodePng(720, 1280));
  const background = join(root, "assets/images/backgrounds/01-stage.png");
  unlinkSync(background);
  symlinkSync(outside, background);
  const result = runValidator(root);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /resolves outside the project directory through a symlink/i);
});

test("recursive asset checking accepts images stored in nested image folders", () => {
  const root = mkdtempSync(join(tmpdir(), "hf-nested-assets-"));
  writeAsset(root, "assets/images/backgrounds/stage.png", encodePng(720, 1280));
  const result = spawnSync(process.execPath, [assetCheckerPath, root, "--require-visual-assets"], {
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
});

test("asset checker accepts flags before the project directory", () => {
  const root = mkdtempSync(join(tmpdir(), "hf-nested-assets-flags-"));
  writeAsset(root, "assets/images/backgrounds/stage.png", encodePng(720, 1280));
  const result = spawnSync(process.execPath, [assetCheckerPath, "--require-visual-assets", root], {
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
});
