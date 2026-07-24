#!/usr/bin/env node

import { resolve } from "node:path";
import { validateImageAssets } from "./lib/image-assets.mjs";

const args = process.argv.slice(2);
const json = args.includes("--json");
const manifestFlag = args.indexOf("--manifest");
if (manifestFlag >= 0 && (!args[manifestFlag + 1] || args[manifestFlag + 1].startsWith("--"))) {
  console.error("Usage: node validate_image_assets.mjs [project-dir] [--json] [--manifest relative-path]");
  process.exit(2);
}
const manifestPath = manifestFlag >= 0 ? args[manifestFlag + 1] : undefined;
const manifestValueIndex = manifestFlag >= 0 ? manifestFlag + 1 : -1;
const targetArg = args.find((arg, index) => (
  !arg.startsWith("--")
  && index !== manifestValueIndex
)) || ".";
const root = resolve(process.cwd(), targetArg);
const report = validateImageAssets(root, { manifestPath });

if (json) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  console.log(`Image asset validation ${report.valid ? "passed" : "failed"}.`);
  console.log(`Backgrounds: ${report.summary.backgrounds}`);
  console.log(`Transparent components: ${report.summary.components}`);
  for (const warning of report.warnings) console.warn(`WARN - ${warning}`);
}

if (!report.valid) {
  for (const error of report.errors) console.error(`FAIL - ${error}`);
  process.exitCode = 1;
}
