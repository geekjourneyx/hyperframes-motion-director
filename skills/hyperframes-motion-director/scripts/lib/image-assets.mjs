import { createHash } from "node:crypto";
import {
  existsSync,
  realpathSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { inflateSync } from "node:zlib";

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const COMPOSITION_EXTENSIONS = /\.(?:html|js|jsx|ts|tsx|css|json)$/i;
const IMAGE_EXTENSIONS = /\.(?:png|jpe?g|webp|gif|svg)$/i;

function paethPredictor(left, up, upLeft) {
  const prediction = left + up - upLeft;
  const leftDistance = Math.abs(prediction - left);
  const upDistance = Math.abs(prediction - up);
  const upLeftDistance = Math.abs(prediction - upLeft);
  if (leftDistance <= upDistance && leftDistance <= upLeftDistance) return left;
  if (upDistance <= upLeftDistance) return up;
  return upLeft;
}

function unfilterScanlines(raw, width, height, bytesPerPixel) {
  const stride = width * bytesPerPixel;
  const expectedLength = (stride + 1) * height;
  if (raw.length !== expectedLength) {
    throw new Error(`Unexpected PNG data length: expected ${expectedLength}, received ${raw.length}.`);
  }

  const pixels = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y += 1) {
    const inputRow = y * (stride + 1);
    const outputRow = y * stride;
    const filter = raw[inputRow];

    for (let x = 0; x < stride; x += 1) {
      const value = raw[inputRow + 1 + x];
      const left = x >= bytesPerPixel ? pixels[outputRow + x - bytesPerPixel] : 0;
      const up = y > 0 ? pixels[outputRow - stride + x] : 0;
      const upLeft = y > 0 && x >= bytesPerPixel
        ? pixels[outputRow - stride + x - bytesPerPixel]
        : 0;

      if (filter === 0) pixels[outputRow + x] = value;
      else if (filter === 1) pixels[outputRow + x] = (value + left) & 0xff;
      else if (filter === 2) pixels[outputRow + x] = (value + up) & 0xff;
      else if (filter === 3) pixels[outputRow + x] = (value + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) pixels[outputRow + x] = (value + paethPredictor(left, up, upLeft)) & 0xff;
      else throw new Error(`Unsupported PNG filter type ${filter}.`);
    }
  }
  return pixels;
}

export function inspectPng(filePath) {
  const buffer = readFileSync(filePath);
  if (buffer.length < 33 || !buffer.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error("File is not a valid PNG.");
  }

  let offset = 8;
  let header = null;
  let palette = null;
  let transparency = null;
  const idat = [];
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString("ascii");
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    if (dataEnd + 4 > buffer.length) throw new Error("PNG chunk exceeds file length.");
    const data = buffer.subarray(dataStart, dataEnd);

    if (type === "IHDR") {
      header = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        bitDepth: data[8],
        colorType: data[9],
        interlace: data[12],
      };
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "PLTE") {
      palette = data;
    } else if (type === "tRNS") {
      transparency = data;
    } else if (type === "IEND") {
      break;
    }
    offset = dataEnd + 4;
  }

  if (!header || idat.length === 0) throw new Error("PNG is missing IHDR or IDAT data.");
  if (header.bitDepth !== 8) throw new Error(`Unsupported PNG bit depth ${header.bitDepth}; expected 8.`);
  if (header.interlace !== 0) throw new Error("Interlaced PNG files are not supported by asset validation.");

  const channelsByColorType = new Map([
    [2, 3],
    [3, 1],
    [4, 2],
    [6, 4],
  ]);
  const channels = channelsByColorType.get(header.colorType);
  if (!channels) {
    throw new Error(`Unsupported PNG color type ${header.colorType}; use RGB, grayscale-alpha, or RGBA.`);
  }

  const raw = inflateSync(Buffer.concat(idat));
  let pixels = unfilterScanlines(raw, header.width, header.height, channels);
  let outputChannels = channels;
  let outputColorType = header.colorType;
  let hasAlphaChannel = header.colorType === 4 || header.colorType === 6;

  if (header.colorType === 3) {
    if (!palette || palette.length === 0 || palette.length % 3 !== 0) {
      throw new Error("Indexed PNG is missing a valid PLTE palette.");
    }
    const expanded = Buffer.alloc(header.width * header.height * 4);
    for (let index = 0; index < pixels.length; index += 1) {
      const paletteIndex = pixels[index];
      const paletteOffset = paletteIndex * 3;
      if (paletteOffset + 2 >= palette.length) {
        throw new Error(`Indexed PNG references missing palette entry ${paletteIndex}.`);
      }
      const outputOffset = index * 4;
      expanded[outputOffset] = palette[paletteOffset];
      expanded[outputOffset + 1] = palette[paletteOffset + 1];
      expanded[outputOffset + 2] = palette[paletteOffset + 2];
      expanded[outputOffset + 3] = transparency?.[paletteIndex] ?? 255;
    }
    pixels = expanded;
    outputChannels = 4;
    outputColorType = 6;
    hasAlphaChannel = Boolean(transparency && [...transparency].some((alpha) => alpha < 255));
  }

  return {
    ...header,
    originalColorType: header.colorType,
    colorType: outputColorType,
    channels: outputChannels,
    pixels,
    hasAlphaChannel,
    hash: createHash("sha256").update(buffer).digest("hex"),
  };
}

export function listFilesRecursive(root, predicate = () => true) {
  if (!existsSync(root)) return [];
  const output = [];
  for (const name of readdirSync(root)) {
    const path = join(root, name);
    const stat = statSync(path);
    if (stat.isDirectory()) output.push(...listFilesRecursive(path, predicate));
    else if (predicate(path)) output.push(path);
  }
  return output;
}

export function listVisualAssetFiles(root) {
  return listFilesRecursive(root, (path) => IMAGE_EXTENSIONS.test(path));
}

function resolveLocalPath(root, value, label, errors) {
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${label} must be a non-empty local path.`);
    return null;
  }
  if (isAbsolute(value)) {
    errors.push(`${label} must be project-relative: ${value}`);
    return null;
  }
  const resolved = resolve(root, value);
  const relativePath = relative(root, resolved);
  if (relativePath === ".." || relativePath.startsWith(`..${sep}`)) {
    errors.push(`${label} escapes the project directory: ${value}`);
    return null;
  }
  if (!existsSync(resolved)) {
    errors.push(`${label} is missing: ${value}`);
    return null;
  }
  const realRoot = realpathSync(root);
  const realTarget = realpathSync(resolved);
  const realRelativePath = relative(realRoot, realTarget);
  if (realRelativePath === ".." || realRelativePath.startsWith(`..${sep}`)) {
    errors.push(`${label} resolves outside the project directory through a symlink: ${value}`);
    return null;
  }
  return resolved;
}

function requireText(value, label, errors) {
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${label} must be filled.`);
  } else if (/\b(?:replace with|replace after|todo|tbd)\b|<[^>]+>/i.test(value)) {
    errors.push(`${label} still contains placeholder text.`);
  }
}

function parseHexColor(value) {
  if (typeof value !== "string") return null;
  const match = value.match(/^#([0-9a-f]{6})$/i);
  if (!match) return null;
  const number = Number.parseInt(match[1], 16);
  return [(number >> 16) & 0xff, (number >> 8) & 0xff, number & 0xff];
}

function inspectCutout(image, matteColor) {
  const { width, height, channels, pixels, colorType } = image;
  if (!image.hasAlphaChannel) {
    return {
      hasRealTransparency: false,
      transparentEdges: false,
      matteSpillPixels: 0,
      maximumAlpha: 255,
      minimumTransparentPadding: 0,
      visiblePixelRatio: 1,
      transparentPixelRatio: 0,
      visibleBoundsWidth: width,
      visibleBoundsHeight: height,
    };
  }

  const alphaIndex = colorType === 6 ? 3 : 1;
  let minimumAlpha = 255;
  let maximumAlpha = 0;
  let edgeOpaquePixels = 0;
  let matteSpillPixels = 0;
  let minimumVisibleX = width;
  let minimumVisibleY = height;
  let maximumVisibleX = -1;
  let maximumVisibleY = -1;
  let visiblePixelCount = 0;
  let transparentPixelCount = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * channels;
      const alpha = pixels[offset + alphaIndex];
      minimumAlpha = Math.min(minimumAlpha, alpha);
      maximumAlpha = Math.max(maximumAlpha, alpha);
      if (alpha > 16) {
        visiblePixelCount += 1;
        minimumVisibleX = Math.min(minimumVisibleX, x);
        minimumVisibleY = Math.min(minimumVisibleY, y);
        maximumVisibleX = Math.max(maximumVisibleX, x);
        maximumVisibleY = Math.max(maximumVisibleY, y);
      }
      if (alpha <= 16) transparentPixelCount += 1;
      if ((x === 0 || y === 0 || x === width - 1 || y === height - 1) && alpha > 0) {
        edgeOpaquePixels += 1;
      }

      if (matteColor && colorType === 6 && alpha > 16) {
        const distance = Math.hypot(
          pixels[offset] - matteColor[0],
          pixels[offset + 1] - matteColor[1],
          pixels[offset + 2] - matteColor[2],
        );
        if (distance <= 72) matteSpillPixels += 1;
      }
    }
  }

  return {
    hasRealTransparency: minimumAlpha < 255 && maximumAlpha > 0,
    transparentEdges: edgeOpaquePixels === 0,
    matteSpillPixels,
    maximumAlpha,
    minimumTransparentPadding: maximumVisibleX < 0
      ? 0
      : Math.min(
        minimumVisibleX,
        minimumVisibleY,
        width - 1 - maximumVisibleX,
        height - 1 - maximumVisibleY,
      ),
    visiblePixelRatio: visiblePixelCount / (width * height),
    transparentPixelRatio: transparentPixelCount / (width * height),
    visibleBoundsWidth: maximumVisibleX < 0 ? 0 : maximumVisibleX - minimumVisibleX + 1,
    visibleBoundsHeight: maximumVisibleY < 0 ? 0 : maximumVisibleY - minimumVisibleY + 1,
  };
}

function stripSourceComments(text) {
  const withoutHtml = text.replace(/<!--[\s\S]*?-->/g, "");
  let output = "";
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = 0; index < withoutHtml.length; index += 1) {
    const char = withoutHtml[index];
    const next = withoutHtml[index + 1];

    if (lineComment) {
      if (char === "\n") {
        lineComment = false;
        output += char;
      }
      continue;
    }
    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      } else if (char === "\n") {
        output += char;
      }
      continue;
    }
    if (quote) {
      output += char;
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      output += char;
    } else if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
    } else if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
    } else {
      output += char;
    }
  }
  return output;
}

function readCompositionText(root) {
  const compositionRoot = join(root, "compositions");
  const files = listFilesRecursive(compositionRoot, (path) => COMPOSITION_EXTENSIONS.test(path));
  return {
    files,
    text: stripSourceComments(files.map((path) => readFileSync(path, "utf8")).join("\n")),
  };
}

export function validateImageAssets(rootArg, options = {}) {
  const root = resolve(rootArg);
  const manifestRelativePath = options.manifestPath || "ASSET_MANIFEST.json";
  const errors = [];
  const warnings = [];
  const manifestPath = resolveLocalPath(root, manifestRelativePath, "Asset manifest", errors);
  if (!manifestPath) {
    return {
      valid: false,
      errors,
      warnings,
      summary: { backgrounds: 0, components: 0, compositions: 0 },
    };
  }

  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (error) {
    errors.push(`Asset manifest is not valid JSON: ${error.message}`);
    return {
      valid: false,
      errors,
      warnings,
      summary: { backgrounds: 0, components: 0, compositions: 0 },
    };
  }

  if (manifest.schema_version !== 2) errors.push("Asset manifest schema_version must be 2.");
  const production = manifest.production || {};
  const requirements = manifest.requirements || {};
  const assetAnalysis = manifest.asset_analysis || {};
  const backgrounds = Array.isArray(manifest.backgrounds) ? manifest.backgrounds : [];
  const components = Array.isArray(manifest.components) ? manifest.components : [];
  const componentSheets = Array.isArray(manifest.component_sheets)
    ? manifest.component_sheets
    : manifest.component_sheet
      ? [{ id: "sheet-1", ...manifest.component_sheet }]
      : [];
  const exception = typeof production.exception === "string" && production.exception.trim() !== ""
    ? production.exception.trim()
    : null;
  const premiumRequired = production.premium_vertical_promo === true && !exception;

  if (production.premium_vertical_promo !== true && production.premium_vertical_promo !== false) {
    errors.push("production.premium_vertical_promo must be true or false.");
  }
  if (!Number.isFinite(production.duration_seconds) || production.duration_seconds <= 0) {
    errors.push("production.duration_seconds must be a positive number.");
  }
  if (!Number.isInteger(production.scene_count) || production.scene_count <= 0) {
    errors.push("production.scene_count must be a positive integer.");
  }
  if (exception && production.exception_approved_by_user !== true) {
    errors.push("production.exception_approved_by_user must be true when an image asset exception is declared.");
  }
  const allowedExceptions = new Set(["typography_only", "supplied_assets", "narrow_edit"]);
  if (exception && !allowedExceptions.has(exception)) {
    errors.push("production.exception must be one of typography_only, supplied_assets, or narrow_edit.");
  }
  if (exception) {
    requireText(production.exception_reason, "production.exception_reason", errors);
    requireText(production.approval_reference, "production.approval_reference", errors);
  }
  if (exception) {
    warnings.push(`Image asset pipeline exception: ${exception}`);
    const compositions = readCompositionText(root);
    if (compositions.files.length === 0) {
      errors.push("An approved image asset exception still requires at least one composition source file.");
    }
    if (exception === "supplied_assets") {
      const suppliedRefs = [
        ...compositions.text.matchAll(/assets\/images\/[A-Za-z0-9._/@-]+\.(?:png|jpe?g|webp|gif|svg)/gi),
      ].map((match) => match[0]);
      if (suppliedRefs.length === 0) {
        errors.push("supplied_assets exception requires a real local image reference in composition source.");
      }
      for (const [index, ref] of suppliedRefs.entries()) {
        resolveLocalPath(root, ref, `supplied_assets reference[${index}]`, errors);
      }
    }
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      summary: {
        backgrounds: backgrounds.length,
        components: components.length,
        componentSheets: componentSheets.length,
        separateComponents: components.filter((item) => item?.generation_method === "separate").length,
        compositions: compositions.files.length,
        premiumRequired,
        exception,
      },
    };
  }

  const visualWorlds = Array.isArray(assetAnalysis.visual_worlds) ? assetAnalysis.visual_worlds : [];
  const componentInventory = Array.isArray(assetAnalysis.component_inventory)
    ? assetAnalysis.component_inventory
    : [];
  const styleReference = assetAnalysis.style_reference;
  const motionRoleCoverage = assetAnalysis.motion_role_coverage;
  const requiredBackgrounds = Number.isInteger(requirements.approved_background_count)
    ? requirements.approved_background_count
    : 0;
  const requiredComponents = Number.isInteger(requirements.approved_component_count)
    ? requirements.approved_component_count
    : 0;

  if (premiumRequired && requiredBackgrounds < 2) {
    errors.push("Premium multi-scene image generation must declare at least two independent visual worlds, or record an exception.");
  }
  if (premiumRequired && production.scene_count > 1 && requiredComponents < 3) {
    errors.push("Premium multi-scene image generation must declare at least three movable foreground components so two distinct component combinations can exist, or record an exception.");
  } else if (premiumRequired && requiredComponents < 1) {
    errors.push("Premium image generation must declare at least one source-driven movable foreground component, or record an exception.");
  }
  if (premiumRequired && componentSheets.length < 1) {
    errors.push("Premium image generation requires at least one source-driven component sheet, or a user-approved pipeline exception.");
  }
  if (!Number.isInteger(requirements.approved_background_count) || requiredBackgrounds < 0) {
    errors.push("requirements.approved_background_count must be a non-negative integer.");
  }
  if (!Number.isInteger(requirements.approved_component_count) || requiredComponents < 0) {
    errors.push("requirements.approved_component_count must be a non-negative integer.");
  }
  requireText(assetAnalysis.background_count_reason, "asset_analysis.background_count_reason", errors);
  requireText(assetAnalysis.component_count_reason, "asset_analysis.component_count_reason", errors);
  requireText(assetAnalysis.sheet_count_reason, "asset_analysis.sheet_count_reason", errors);
  requireText(assetAnalysis.hero_generation_reason, "asset_analysis.hero_generation_reason", errors);
  if (!styleReference || typeof styleReference !== "object") {
    errors.push("asset_analysis.style_reference must record the exact style source and narrative boundary.");
  } else {
    requireText(styleReference.source_type, "asset_analysis.style_reference.source_type", errors);
    requireText(styleReference.exact_source, "asset_analysis.style_reference.exact_source", errors);
    requireText(
      styleReference.narrative_boundary,
      "asset_analysis.style_reference.narrative_boundary",
      errors,
    );
    if (styleReference.reviewed !== true) {
      errors.push("asset_analysis.style_reference.reviewed must be true after inspecting the exact source.");
    }
    if (!Array.isArray(styleReference.visual_grammar) || styleReference.visual_grammar.length < 3) {
      errors.push("asset_analysis.style_reference.visual_grammar must contain at least three source-observed style rules.");
    } else {
      for (const [index, rule] of styleReference.visual_grammar.entries()) {
        requireText(rule, `asset_analysis.style_reference.visual_grammar[${index}]`, errors);
      }
    }
    if (!Array.isArray(styleReference.forbidden_drift) || styleReference.forbidden_drift.length === 0) {
      errors.push("asset_analysis.style_reference.forbidden_drift must name at least one forbidden substitution or narrative drift.");
    } else {
      for (const [index, rule] of styleReference.forbidden_drift.entries()) {
        requireText(rule, `asset_analysis.style_reference.forbidden_drift[${index}]`, errors);
      }
    }
  }

  const requiredMotionRoleIds = ["narrative_anchor", "product_proof", "transition_carrier"];
  const motionRoles = Array.isArray(motionRoleCoverage?.roles) ? motionRoleCoverage.roles : [];
  const combinationTests = Array.isArray(motionRoleCoverage?.combination_tests)
    ? motionRoleCoverage.combination_tests
    : [];
  const motionRoleIds = new Set();
  const roleComponentIds = new Set();
  const motionRoleCoverageRequired = premiumRequired || Boolean(motionRoleCoverage);
  if (premiumRequired && (!motionRoleCoverage || typeof motionRoleCoverage !== "object")) {
    errors.push("asset_analysis.motion_role_coverage must prove role diversity and component combinations.");
  }
  for (const [index, role] of motionRoles.entries()) {
    const label = `asset_analysis.motion_role_coverage.roles[${index}]`;
    requireText(role?.id, `${label}.id`, errors);
    requireText(role?.reason, `${label}.reason`, errors);
    if (role?.id && motionRoleIds.has(role.id)) {
      errors.push(`Motion role id is duplicated: ${role.id}.`);
    }
    motionRoleIds.add(role?.id);
    if (!Array.isArray(role?.component_ids) || role.component_ids.length === 0) {
      errors.push(`${label}.component_ids must name at least one accepted component.`);
    } else {
      for (const componentId of role.component_ids) roleComponentIds.add(componentId);
    }
  }
  if (premiumRequired) {
    for (const roleId of requiredMotionRoleIds) {
      if (!motionRoleIds.has(roleId)) {
        errors.push(`Premium multi-scene asset libraries require motion role "${roleId}".`);
      }
    }
  }
  const combinationSignatures = new Set();
  const minimumCombinationTests = premiumRequired && production.scene_count > 1
    ? 2
    : motionRoleCoverageRequired
      ? 1
      : 0;
  if (combinationTests.length < minimumCombinationTests) {
    errors.push(
      `asset_analysis.motion_role_coverage.combination_tests must contain at least ${minimumCombinationTests} distinct assembly proofs.`,
    );
  }
  for (const [index, combination] of combinationTests.entries()) {
    const label = `asset_analysis.motion_role_coverage.combination_tests[${index}]`;
    requireText(combination?.id, `${label}.id`, errors);
    requireText(combination?.scene_id, `${label}.scene_id`, errors);
    requireText(combination?.choreography, `${label}.choreography`, errors);
    requireText(combination?.deletion_test, `${label}.deletion_test`, errors);
    if (!Number.isFinite(combination?.snapshot_timestamp) || combination.snapshot_timestamp < 0) {
      errors.push(`${label}.snapshot_timestamp must be a non-negative number.`);
    }
    if (!Array.isArray(combination?.component_ids) || combination.component_ids.length < 2) {
      errors.push(`${label}.component_ids must name at least two components; otherwise it is not a combination.`);
      continue;
    }
    const uniqueIds = new Set(combination.component_ids);
    if (uniqueIds.size !== combination.component_ids.length) {
      errors.push(`${label}.component_ids must not repeat a component.`);
    }
    const signature = [...uniqueIds].sort().join("|");
    if (combinationSignatures.has(signature)) {
      errors.push(`${label} duplicates an earlier component combination.`);
    }
    combinationSignatures.add(signature);
  }
  if (!Array.isArray(manifest.revisions)) errors.push("revisions must be an array.");
  if (visualWorlds.length !== requiredBackgrounds) {
    errors.push(
      `asset_analysis.visual_worlds must contain exactly ${requiredBackgrounds} entries; found ${visualWorlds.length}.`,
    );
  }
  if (componentInventory.length !== requiredComponents) {
    errors.push(
      `asset_analysis.component_inventory must contain exactly ${requiredComponents} entries; found ${componentInventory.length}.`,
    );
  }
  if (backgrounds.length < requiredBackgrounds) {
    errors.push(
      `The approved asset analysis declared ${requiredBackgrounds} independent 9:16 backgrounds; found ${backgrounds.length}.`,
    );
  } else if (backgrounds.length > requiredBackgrounds) {
    errors.push(
      `The approved asset analysis declares exactly ${requiredBackgrounds} independent backgrounds; found ${backgrounds.length}. Update the analysis instead of adding unexplained assets.`,
    );
  }
  const allowedSheetStrategies = new Set([
    "one_sheet",
    "multiple_sheets",
    "mixed",
  ]);
  const sheetStrategy = requirements.component_sheet_strategy;
  if (!allowedSheetStrategies.has(sheetStrategy)) {
    errors.push(
      "requirements.component_sheet_strategy must be one_sheet, multiple_sheets, or mixed.",
    );
  }
  if (sheetStrategy === "one_sheet" && componentSheets.length !== 1) {
    errors.push(`one_sheet strategy requires exactly one component sheet; found ${componentSheets.length}.`);
  }
  if (sheetStrategy === "multiple_sheets" && componentSheets.length < 2) {
    errors.push(`multiple_sheets strategy requires at least two component sheets; found ${componentSheets.length}.`);
  }
  if (sheetStrategy === "mixed" && componentSheets.length < 1) {
    errors.push("mixed strategy requires at least one component sheet.");
  }
  if (components.length < requiredComponents) {
    errors.push(`The approved component inventory requires ${requiredComponents} transparent cutouts; found ${components.length}.`);
  } else if (components.length > requiredComponents) {
    errors.push(
      `The approved component inventory declares exactly ${requiredComponents} transparent cutouts; found ${components.length}. Update the analysis instead of adding unexplained assets.`,
    );
  }

  const backgroundHashes = new Map();
  const backgroundPaths = [];
  const backgroundIds = new Set();
  for (const [index, background] of backgrounds.entries()) {
    const label = `backgrounds[${index}]`;
    requireText(background?.id, `${label}.id`, errors);
    if (backgroundIds.has(background?.id)) errors.push(`${label}.id is duplicated: ${background.id}`);
    backgroundIds.add(background?.id);
    requireText(background?.role, `${label}.role`, errors);
    requireText(background?.quiet_zone, `${label}.quiet_zone`, errors);
    if (!Array.isArray(background?.scene_ids) || background.scene_ids.length === 0) {
      errors.push(`${label}.scene_ids must name at least one scene.`);
    }
    const path = resolveLocalPath(root, background?.path, `${label}.path`, errors);
    if (!path) continue;
    backgroundPaths.push(background.path);
    try {
      const image = inspectPng(path);
      const ratio = image.width / image.height;
      if (Math.abs(ratio - 9 / 16) > 0.015) {
        errors.push(`${label}.path must be approximately 9:16; found ${image.width}x${image.height}.`);
      }
      const minimumLongEdge = Number(requirements.minimum_background_long_edge) || 1280;
      if (Math.max(image.width, image.height) < minimumLongEdge) {
        errors.push(`${label}.path long edge must be at least ${minimumLongEdge}px.`);
      }
      const previous = backgroundHashes.get(image.hash);
      if (previous) errors.push(`${label}.path duplicates ${previous}; exact duplicates are not independent backgrounds.`);
      else backgroundHashes.set(image.hash, background.path);
    } catch (error) {
      errors.push(`${label}.path cannot be inspected: ${error.message}`);
    }
  }

  const worldBackgroundIds = new Set();
  const worldIds = new Set();
  for (const [index, world] of visualWorlds.entries()) {
    const label = `asset_analysis.visual_worlds[${index}]`;
    requireText(world?.id, `${label}.id`, errors);
    requireText(world?.reason, `${label}.reason`, errors);
    requireText(world?.background_id, `${label}.background_id`, errors);
    if (world?.id && worldIds.has(world.id)) errors.push(`Visual world id is duplicated: ${world.id}.`);
    worldIds.add(world?.id);
    if (!Array.isArray(world?.source_beats) || world.source_beats.length === 0) {
      errors.push(`${label}.source_beats must name at least one source beat.`);
    }
    if (world?.background_id && !backgroundIds.has(world.background_id)) {
      errors.push(`${label}.background_id does not match a generated background: ${world.background_id}`);
    }
    if (world?.background_id && worldBackgroundIds.has(world.background_id)) {
      errors.push(`Visual worlds map more than once to background ${world.background_id}.`);
    }
    worldBackgroundIds.add(world?.background_id);
  }
  for (const backgroundId of backgroundIds) {
    if (!worldBackgroundIds.has(backgroundId)) {
      errors.push(`Generated background is not owned by a declared visual world: ${backgroundId}`);
    }
  }

  const sheetById = new Map();
  const sheetPaths = [];
  const sheetPathOwners = new Map();
  const sheetHashOwners = new Map();
  for (const [index, sheet] of componentSheets.entries()) {
    const label = `component_sheets[${index}]`;
    requireText(sheet?.id, `${label}.id`, errors);
    if (sheetById.has(sheet?.id)) errors.push(`${label}.id is duplicated: ${sheet.id}`);
    const path = resolveLocalPath(root, sheet?.path, `${label}.path`, errors);
    const previousPathOwner = sheetPathOwners.get(sheet?.path);
    if (previousPathOwner) {
      errors.push(`${label}.path duplicates source sheet ${previousPathOwner}: ${sheet.path}`);
    } else if (sheet?.path) {
      sheetPathOwners.set(sheet.path, sheet?.id || label);
    }
    requireText(sheet?.grid, `${label}.grid`, errors);
    const backgroundMode = sheet?.background_mode || (sheet?.matte_color ? "matte" : null);
    if (!["matte", "transparent"].includes(backgroundMode)) {
      errors.push(`${label}.background_mode must be matte or transparent.`);
    }
    const matteColor = backgroundMode === "matte" ? parseHexColor(sheet?.matte_color) : null;
    if (backgroundMode === "matte" && !matteColor) {
      errors.push(`${label}.matte_color must be a six-digit hex color in matte mode.`);
    }
    if (backgroundMode === "transparent" && sheet?.matte_color !== null) {
      errors.push(`${label}.matte_color must be null in transparent mode.`);
    }
    const gridMatch = typeof sheet?.grid === "string" ? sheet.grid.match(/^(\d+)x(\d+)$/) : null;
    if (!Array.isArray(sheet?.accepted_component_ids)) {
      errors.push(`${label}.accepted_component_ids must be an array.`);
    } else if (sheet.accepted_component_ids.length === 0) {
      errors.push(`${label}.accepted_component_ids must contain at least one component.`);
    }
    const capacity = gridMatch ? Number(gridMatch[1]) * Number(gridMatch[2]) : 0;
    if (!gridMatch || capacity <= 0) errors.push(`${label}.grid must use a positive COLSxROWS format.`);
    sheetById.set(sheet?.id, { sheet, path, matteColor, capacity, backgroundMode });
    if (path) {
      sheetPaths.push(sheet.path);
      try {
        const image = inspectPng(path);
        const previousHashOwner = sheetHashOwners.get(image.hash);
        if (previousHashOwner) {
          errors.push(`${label}.path duplicates source sheet content from ${previousHashOwner}.`);
        } else {
          sheetHashOwners.set(image.hash, sheet?.id || label);
        }
        const minimumLongEdge = Number(requirements.minimum_sheet_long_edge) || 1280;
        if (Math.max(image.width, image.height) < minimumLongEdge) {
          errors.push(`${label}.path long edge must be at least ${minimumLongEdge}px.`);
        }
        if (backgroundMode === "transparent") {
          const transparency = inspectCutout(image, null);
          if (!transparency.hasRealTransparency) {
            errors.push(`${label}.path must contain real transparency in transparent mode.`);
          }
          if (!transparency.transparentEdges) {
            errors.push(`${label}.path must have fully transparent outer edges in transparent mode.`);
          }
          if (transparency.transparentPixelRatio < 0.1) {
            errors.push(`${label}.path transparent coverage must be at least 10% in transparent mode.`);
          }
        }
      } catch (error) {
        errors.push(`${label}.path cannot be inspected: ${error.message}`);
      }
    }
  }

  const componentIds = new Set();
  const componentPaths = [];
  const componentPathOwners = new Map();
  const componentHashOwners = new Map();
  const occupiedSourceCells = new Set();
  for (const [index, component] of components.entries()) {
    const label = `components[${index}]`;
    for (const field of ["id", "source_phrase", "role", "motion_action"]) {
      requireText(component?.[field], `${label}.${field}`, errors);
    }
    if (component?.hero !== true && component?.hero !== false) {
      errors.push(`${label}.hero must be true or false.`);
    }
    if (componentIds.has(component?.id)) errors.push(`${label}.id is duplicated: ${component.id}`);
    componentIds.add(component?.id);
    if (!["sheet", "separate"].includes(component?.generation_method)) {
      errors.push(`${label}.generation_method must be sheet or separate.`);
    }
    const sourceSheet = component?.generation_method === "sheet"
      ? sheetById.get(component?.source_sheet_id)
      : null;
    if (component?.generation_method === "sheet") {
      requireText(component?.source_sheet_id, `${label}.source_sheet_id`, errors);
      if (component?.source_sheet_id && !sourceSheet) {
        errors.push(`${label}.source_sheet_id does not match a declared sheet: ${component.source_sheet_id}`);
      }
      if (!Number.isInteger(component?.source_cell) || component.source_cell <= 0) {
        errors.push(`${label}.source_cell must be a positive integer for sheet-generated components.`);
      } else if (component?.source_sheet_id) {
        if (sourceSheet?.capacity && component.source_cell > sourceSheet.capacity) {
          errors.push(
            `${label}.source_cell ${component.source_cell} exceeds sheet ${component.source_sheet_id} capacity ${sourceSheet.capacity}.`,
          );
        }
        const cellKey = `${component.source_sheet_id}:${component.source_cell}`;
        if (occupiedSourceCells.has(cellKey)) {
          errors.push(
            `Source cell ${component.source_cell} is assigned more than once on sheet ${component.source_sheet_id}.`,
          );
        }
        occupiedSourceCells.add(cellKey);
      }
    } else if (component?.source_sheet_id !== null || component?.source_cell !== null) {
      errors.push(`${label} must use null source_sheet_id and source_cell when generated separately.`);
    }
    if (!Array.isArray(component?.target_scenes) || component.target_scenes.length === 0) {
      errors.push(`${label}.target_scenes must name at least one scene.`);
    }

    const path = resolveLocalPath(root, component?.path, `${label}.path`, errors);
    if (!path) continue;
    const previousPathOwner = componentPathOwners.get(component.path);
    if (previousPathOwner) {
      errors.push(`${label}.path duplicates accepted component ${previousPathOwner}: ${component.path}`);
    } else {
      componentPathOwners.set(component.path, component?.id || label);
    }
    componentPaths.push(component.path);
    try {
      const image = inspectPng(path);
      const previousHashOwner = componentHashOwners.get(image.hash);
      if (previousHashOwner) {
        errors.push(`${label}.path duplicates accepted component content from ${previousHashOwner}.`);
      } else {
        componentHashOwners.set(image.hash, component?.id || label);
      }
      const minimumLongEdge = component?.hero === true
        ? Math.max(512, Number(requirements.minimum_component_long_edge) || 192)
        : Number(requirements.minimum_component_long_edge) || 192;
      if (Math.max(image.width, image.height) < minimumLongEdge) {
        errors.push(`${label}.path long edge must be at least ${minimumLongEdge}px.`);
      }
      const cutout = inspectCutout(image, sourceSheet?.matteColor || null);
      if (!cutout.hasRealTransparency) errors.push(`${label}.path must contain real alpha transparency.`);
      if (!cutout.transparentEdges) errors.push(`${label}.path must have fully transparent outer edges.`);
      if (cutout.maximumAlpha < 128) {
        errors.push(`${label}.path visible alpha must reach at least 128.`);
      }
      const minimumVisibleWidth = Math.max(4, Math.floor(image.width * 0.02));
      const minimumVisibleHeight = Math.max(4, Math.floor(image.height * 0.02));
      if (
        cutout.visiblePixelRatio < 0.005
        || cutout.visibleBoundsWidth < minimumVisibleWidth
        || cutout.visibleBoundsHeight < minimumVisibleHeight
      ) {
        errors.push(`${label}.path visible subject coverage is too small for a usable component.`);
      }
      const minimumPadding = Math.max(2, Math.floor(Math.min(image.width, image.height) * 0.005));
      if (cutout.minimumTransparentPadding < minimumPadding) {
        errors.push(`${label}.path transparent padding must be at least ${minimumPadding}px.`);
      }
      const spillLimit = Math.max(2, Math.floor(image.width * image.height * 0.0001));
      if (cutout.matteSpillPixels > spillLimit) {
        errors.push(`${label}.path contains matte-color spill (${cutout.matteSpillPixels} pixels).`);
      }
    } catch (error) {
      errors.push(`${label}.path cannot be inspected: ${error.message}`);
    }
  }

  const inventoryIds = new Set();
  for (const [index, item] of componentInventory.entries()) {
    const label = `asset_analysis.component_inventory[${index}]`;
    requireText(item?.id, `${label}.id`, errors);
    requireText(item?.source_phrase, `${label}.source_phrase`, errors);
    requireText(item?.reason, `${label}.reason`, errors);
    if (item?.id && !componentIds.has(item.id)) {
      errors.push(`${label}.id does not match an accepted transparent component: ${item.id}`);
    }
    if (item?.id && inventoryIds.has(item.id)) {
      errors.push(`Component inventory id is duplicated: ${item.id}.`);
    }
    inventoryIds.add(item?.id);
  }
  for (const componentId of componentIds) {
    if (!inventoryIds.has(componentId)) {
      errors.push(`Accepted component is missing from the approved component inventory: ${componentId}`);
    }
    if (motionRoleCoverageRequired && !roleComponentIds.has(componentId)) {
      errors.push(`Accepted component is missing from motion-role coverage: ${componentId}`);
    }
  }
  for (const componentId of roleComponentIds) {
    if (!componentIds.has(componentId)) {
      errors.push(`Motion-role coverage references unknown component: ${componentId}`);
    }
  }
  for (const combination of combinationTests) {
    if (!Array.isArray(combination?.component_ids)) continue;
    for (const componentId of combination.component_ids) {
      if (!componentIds.has(componentId)) {
        errors.push(`Component combination ${combination.id || "missing-id"} references unknown component: ${componentId}`);
      }
    }
  }
  const componentById = new Map(components.map((component) => [component?.id, component]));
  for (const item of componentInventory) {
    const component = componentById.get(item?.id);
    if (
      component
      && typeof item?.source_phrase === "string"
      && typeof component?.source_phrase === "string"
      && item.source_phrase.trim() !== component.source_phrase.trim()
    ) {
      errors.push(`Source phrase mismatch between component inventory and component ${item.id}.`);
    }
  }

  const sheetAcceptedIds = new Set();
  for (const [index, sheet] of componentSheets.entries()) {
    if (!Array.isArray(sheet.accepted_component_ids)) continue;
    for (const id of sheet.accepted_component_ids) {
      if (sheetAcceptedIds.has(id)) {
        errors.push(`component_sheets[${index}].accepted_component_ids duplicates ${id} across sheets.`);
      }
      sheetAcceptedIds.add(id);
      if (!componentIds.has(id)) {
        errors.push(`component_sheets[${index}].accepted_component_ids contains unknown component ${id}.`);
      }
      const component = components.find((item) => item?.id === id);
      if (component?.generation_method !== "sheet" || component?.source_sheet_id !== sheet.id) {
        errors.push(`Component ${id} is not mapped back to component sheet ${sheet.id}.`);
      }
    }
  }
  for (const component of components) {
    if (component?.generation_method === "sheet" && !sheetAcceptedIds.has(component.id)) {
      errors.push(`Component sheet inventory is missing sheet-generated component ${component.id}.`);
    }
    if (component?.generation_method === "separate" && sheetAcceptedIds.has(component.id)) {
      errors.push(`Separately generated component ${component.id} must not appear in a sheet inventory.`);
    }
  }
  const sheetGeneratedCount = components.filter((item) => item?.generation_method === "sheet").length;
  const separatelyGeneratedCount = components.filter((item) => item?.generation_method === "separate").length;
  if (["one_sheet", "multiple_sheets"].includes(sheetStrategy) && separatelyGeneratedCount > 0) {
    errors.push(`${sheetStrategy} strategy cannot include separately generated components; use mixed.`);
  }
  if (sheetStrategy === "mixed" && (sheetGeneratedCount === 0 || separatelyGeneratedCount === 0)) {
    errors.push("mixed strategy requires both sheet-generated and separately generated components.");
  }
  if (premiumRequired && sheetGeneratedCount < 1) {
    errors.push("Premium image generation requires at least one accepted component cropped from a source sheet.");
  }

  const proof = manifest.proof || {};
  const darkProofPath = resolveLocalPath(root, proof.dark_contact_sheet, "proof.dark_contact_sheet", errors);
  const lightProofPath = resolveLocalPath(root, proof.light_contact_sheet, "proof.light_contact_sheet", errors);
  if (proof.reviewed !== true) errors.push("proof.reviewed must be true after inspecting both contact sheets.");
  requireText(proof.review_notes, "proof.review_notes", errors);
  if (darkProofPath && lightProofPath) {
    try {
      const darkProof = inspectPng(darkProofPath);
      const lightProof = inspectPng(lightProofPath);
      if (darkProof.hash === lightProof.hash) {
        errors.push("Dark and light contact sheets must be distinct review images.");
      }
    } catch (error) {
      errors.push(`Cutout contact sheets cannot be inspected: ${error.message}`);
    }
  }
  if (Array.isArray(manifest.revisions)) {
    for (const [index, revision] of manifest.revisions.entries()) {
      const label = `revisions[${index}]`;
      for (const field of ["timestamp", "field", "reason", "approval_reference"]) {
        requireText(revision?.[field], `${label}.${field}`, errors);
      }
      if (!Object.hasOwn(revision || {}, "previous_value")) {
        errors.push(`${label}.previous_value must be present.`);
      }
      if (!Object.hasOwn(revision || {}, "new_value")) {
        errors.push(`${label}.new_value must be present.`);
      }
    }
  }

  const compositions = readCompositionText(root);
  if (premiumRequired && compositions.files.length === 0) {
    errors.push("Premium image asset validation requires at least one composition source file.");
  }
  for (const sheetPath of sheetPaths) {
    if (compositions.text.includes(sheetPath)) {
      errors.push(`Composition source must not reference the source component sheet ${sheetPath}; use cropped transparent components.`);
    }
  }
  for (const path of backgroundPaths) {
    if (!compositions.text.includes(path)) errors.push(`Background is listed but not referenced by a composition: ${path}`);
  }
  for (const path of componentPaths) {
    if (!compositions.text.includes(path)) errors.push(`Accepted component is listed but not referenced by a composition: ${path}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    summary: {
      backgrounds: backgrounds.length,
      components: components.length,
      componentSheets: componentSheets.length,
      separateComponents: separatelyGeneratedCount,
      compositions: compositions.files.length,
      premiumRequired,
      exception,
    },
  };
}
