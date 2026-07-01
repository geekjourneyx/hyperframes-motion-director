#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.cwd(), process.argv[2] || ".");

const requiredFiles = {
  scene: "SCENE_SCHEMA.json",
  templates: "VECTOR_TEMPLATES.json",
  primitives: "MOTION_PRIMITIVES.json",
};

const requiredTemplateIds = ["quote_card", "data_point", "comparison"];
const requiredPrimitiveIds = ["maskReveal", "pathDraw", "clipWipe", "staggerText", "numberCount"];
const premiumPrimitiveIds = ["splitTextReveal", "drawSvgAccent", "morphSymbol", "motionPathHandoff", "customEaseSignature"];
const requiredGsapLabels = ["hook", "reveal", "proof", "cta"];
const requiredGsapPlugins = ["DrawSVGPlugin", "MorphSVGPlugin", "MotionPathPlugin", "SplitText", "CustomEase"];
const titleTiers = new Set(["hero", "large", "main", "reduced", "compact"]);

function readJson(label, file) {
  const path = join(root, file);
  if (!existsSync(path)) {
    return { ok: false, error: `${file} is missing.`, value: null };
  }

  try {
    return { ok: true, error: "", value: JSON.parse(readFileSync(path, "utf8")) };
  } catch (error) {
    return { ok: false, error: `${file} is not valid JSON: ${error.message}`, value: null };
  }
}

function hasRect(rect) {
  return rect && typeof rect === "object" && ["x", "y", "w", "h"].every((key) => Number.isFinite(rect[key]));
}

function validateScene(scene, index, templateIds, primitiveIds) {
  const errors = [];
  const prefix = `Scene ${index + 1} (${scene?.id || "missing-id"})`;

  if (!scene || typeof scene !== "object") {
    return [`${prefix} is not an object.`];
  }

  if (!scene.id) errors.push(`${prefix} missing id.`);
  if (!templateIds.has(scene.template_id)) errors.push(`${prefix} references unknown template_id "${scene.template_id}".`);

  const contract = scene.layout_contract || {};
  if (!contract.intent) errors.push(`${prefix} missing layout_contract.intent.`);
  if (!contract.text_axis) errors.push(`${prefix} missing layout_contract.text_axis.`);
  if (!hasRect(contract.textRect) && !hasRect(contract.leftTextRect)) errors.push(`${prefix} missing measured textRect or leftTextRect.`);
  if (!Number.isFinite(contract.safeBottomY)) errors.push(`${prefix} missing numeric layout_contract.safeBottomY.`);
  if (!titleTiers.has(contract.title_tier)) errors.push(`${prefix} title_tier must be one of hero/large/main/reduced/compact.`);
  if (!contract.motion_bounds) errors.push(`${prefix} missing motion_bounds.`);
  if (!Number.isFinite(contract.vertical_center_tolerance_px)) errors.push(`${prefix} missing vertical_center_tolerance_px.`);

  const chain = Array.isArray(scene.primitive_chain) ? scene.primitive_chain : [];
  if (chain.length === 0) {
    errors.push(`${prefix} has no primitive_chain.`);
  }
  if (chain.length > 2) {
    errors.push(`${prefix} uses more than two primary primitives.`);
  }

  for (const [primitiveIndex, primitive] of chain.entries()) {
    if (!primitiveIds.has(primitive.primitive_id)) {
      errors.push(`${prefix} primitive ${primitiveIndex + 1} references unknown primitive_id "${primitive.primitive_id}".`);
    }
    if (!primitive.selection_reason) {
      errors.push(`${prefix} primitive ${primitiveIndex + 1} missing selection_reason.`);
    }
  }

  const supportAssets = scene.support_assets;
  if (!supportAssets || typeof supportAssets !== "object") {
    errors.push(`${prefix} missing support_assets contract.`);
  } else {
    if (!["none", "generated", "supplied", "code-generated", "mixed"].includes(supportAssets.decision)) {
      errors.push(`${prefix} support_assets.decision must be none/generated/supplied/code-generated/mixed.`);
    }
    if (!Array.isArray(supportAssets.roles)) errors.push(`${prefix} support_assets.roles must be an array.`);
    if (!supportAssets.style_lock) errors.push(`${prefix} support_assets missing style_lock.`);
    if (!supportAssets.safe_zones) errors.push(`${prefix} support_assets missing safe_zones.`);
    if (!supportAssets.motion_purpose) errors.push(`${prefix} support_assets missing motion_purpose.`);
    if (!supportAssets.deletion_trigger) errors.push(`${prefix} support_assets missing deletion_trigger.`);
  }

  const snapshots = Array.isArray(scene.snapshot_tests) ? scene.snapshot_tests : [];
  if (snapshots.length === 0) {
    errors.push(`${prefix} has no snapshot_tests.`);
  }
  for (const [snapshotIndex, snapshot] of snapshots.entries()) {
    if (!Number.isFinite(snapshot.at)) errors.push(`${prefix} snapshot ${snapshotIndex + 1} missing numeric at.`);
    if (!Array.isArray(snapshot.assertions) || snapshot.assertions.length === 0) {
      errors.push(`${prefix} snapshot ${snapshotIndex + 1} missing assertions.`);
    }
  }

  return errors;
}

const jsonResults = Object.entries(requiredFiles).map(([label, file]) => ({ label, file, ...readJson(label, file) }));
const errors = jsonResults.filter((result) => !result.ok).map((result) => result.error);

const sceneDoc = jsonResults.find((result) => result.label === "scene")?.value;
const templateDoc = jsonResults.find((result) => result.label === "templates")?.value;
const primitiveDoc = jsonResults.find((result) => result.label === "primitives")?.value;

if (templateDoc) {
  const templates = Array.isArray(templateDoc.templates) ? templateDoc.templates : [];
  const ids = new Set(templates.map((template) => template.id));
  if (templates.length < 3) errors.push("VECTOR_TEMPLATES.json must define at least three templates.");
  for (const id of requiredTemplateIds) {
    if (!ids.has(id)) errors.push(`VECTOR_TEMPLATES.json missing required template "${id}".`);
  }
  for (const template of templates) {
    if (!template.purpose) errors.push(`Template ${template.id || "missing-id"} missing purpose.`);
    if (!template.slots || typeof template.slots !== "object") errors.push(`Template ${template.id || "missing-id"} missing slots.`);
    if (!template.layout || typeof template.layout !== "object") errors.push(`Template ${template.id || "missing-id"} missing layout.`);
    if (!Array.isArray(template.allowed_primitives) || template.allowed_primitives.length === 0) {
      errors.push(`Template ${template.id || "missing-id"} missing allowed_primitives.`);
    }
    if (!Array.isArray(template.rejection_tests) || template.rejection_tests.length === 0) {
      errors.push(`Template ${template.id || "missing-id"} missing rejection_tests.`);
    }
  }
  if (!templateDoc.support_asset_policy || typeof templateDoc.support_asset_policy !== "object") {
    errors.push("VECTOR_TEMPLATES.json missing support_asset_policy.");
  } else {
    for (const field of ["allowed_decisions", "allowed_roles", "style_lock_fields", "required_contract_fields", "rejection_tests"]) {
      if (!Array.isArray(templateDoc.support_asset_policy[field]) || templateDoc.support_asset_policy[field].length === 0) {
        errors.push(`VECTOR_TEMPLATES.json support_asset_policy.${field} must be a non-empty array.`);
      }
    }
  }
}

if (primitiveDoc) {
  const primitives = Array.isArray(primitiveDoc.primitives) ? primitiveDoc.primitives : [];
  const ids = new Set(primitives.map((primitive) => primitive.id));
  if (primitives.length < 10) errors.push("MOTION_PRIMITIVES.json must define at least ten primitives after GSAP choreography upgrade.");
  for (const id of requiredPrimitiveIds) {
    if (!ids.has(id)) errors.push(`MOTION_PRIMITIVES.json missing required primitive "${id}".`);
  }
  for (const id of premiumPrimitiveIds) {
    if (!ids.has(id)) errors.push(`MOTION_PRIMITIVES.json missing premium primitive "${id}".`);
  }
  if (!primitiveDoc.timeline_policy?.master_timeline_required) errors.push("MOTION_PRIMITIVES.json must require a master timeline.");
  if (!primitiveDoc.timeline_policy?.position_parameters_required) errors.push("MOTION_PRIMITIVES.json must require position parameters.");
  if (!primitiveDoc.timeline_policy?.delay_chains_forbidden) errors.push("MOTION_PRIMITIVES.json must forbid delay chains.");
  for (const label of requiredGsapLabels) {
    if (!primitiveDoc.timeline_policy?.labels_required?.includes(label)) {
      errors.push(`MOTION_PRIMITIVES.json missing required timeline label "${label}".`);
    }
  }
  if (!primitiveDoc.gsap_policy?.prefer_autoAlpha_over_opacity) errors.push("MOTION_PRIMITIVES.json must prefer autoAlpha over opacity.");
  if (!primitiveDoc.gsap_policy?.plugin_registration_required) errors.push("MOTION_PRIMITIVES.json must require plugin registration.");
  if (!primitiveDoc.gsap_policy?.plugins_from_public_gsap_package) errors.push("MOTION_PRIMITIVES.json must require plugins from the public gsap package.");
  for (const prop of ["x", "y", "scale", "svgOrigin"]) {
    if (!primitiveDoc.gsap_policy?.prefer_transform_aliases?.includes(prop)) {
      errors.push(`MOTION_PRIMITIVES.json missing transform alias policy for "${prop}".`);
    }
  }
  for (const plugin of requiredGsapPlugins) {
    if (!primitiveDoc.plugin_policy?.allowed_plugins?.includes(plugin)) {
      errors.push(`MOTION_PRIMITIVES.json missing allowed plugin "${plugin}".`);
    }
  }
  for (const primitive of primitives) {
    if (!Array.isArray(primitive.semantic_use) || primitive.semantic_use.length === 0) {
      errors.push(`Primitive ${primitive.id || "missing-id"} missing semantic_use.`);
    }
    if (premiumPrimitiveIds.includes(primitive.id) && (!Array.isArray(primitive.required_plugins) || primitive.required_plugins.length === 0)) {
      errors.push(`Premium primitive ${primitive.id} missing required_plugins.`);
    }
    if (!Array.isArray(primitive.required_selectors) || primitive.required_selectors.length === 0) {
      errors.push(`Primitive ${primitive.id || "missing-id"} missing required_selectors.`);
    }
    if (!Array.isArray(primitive.rejection_tests) || primitive.rejection_tests.length === 0) {
      errors.push(`Primitive ${primitive.id || "missing-id"} missing rejection_tests.`);
    }
  }
}

if (sceneDoc && templateDoc && primitiveDoc) {
  const templateIds = new Set((templateDoc.templates || []).map((template) => template.id));
  const primitiveIds = new Set((primitiveDoc.primitives || []).map((primitive) => primitive.id));
  const scenes = Array.isArray(sceneDoc.scenes) ? sceneDoc.scenes : [];

  if (!sceneDoc.compiler_policy?.requires_browser_text_measurement) {
    errors.push("SCENE_SCHEMA.json must require browser text measurement.");
  }
  if (!sceneDoc.compiler_policy?.requires_snapshot_validation) {
    errors.push("SCENE_SCHEMA.json must require snapshot validation.");
  }
  if (scenes.length === 0) errors.push("SCENE_SCHEMA.json must define at least one scene.");
  for (const [index, scene] of scenes.entries()) {
    errors.push(...validateScene(scene, index, templateIds, primitiveIds));
  }
}

const report = {
  valid: errors.length === 0,
  checked_files: Object.values(requiredFiles),
  errors,
};

writeFileSync(join(root, "DESIGN_ENGINEERING_VALIDATION.json"), JSON.stringify(report, null, 2));

if (report.valid) {
  console.log("Design engineering validation passed.");
} else {
  console.error("Design engineering validation failed.");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
}
