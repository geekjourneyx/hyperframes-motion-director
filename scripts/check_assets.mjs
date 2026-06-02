#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const targetArg = process.argv[2] || ".";
const root = resolve(process.cwd(), targetArg);

const textFiles = [
  "CREATIVE_BRIEF.md",
  "DESIGN.md",
  "SCRIPT.md",
  "STORYBOARD.md",
  "BEAT_MAP.json",
  "MOTION_MAP.json",
  "REVIEW_REPORT.md",
];

const localAssetPattern = /(?:assets\/[A-Za-z0-9._/@-]+\.(?:png|jpg|jpeg|webp|gif|svg|mp3|wav|m4a|mp4|mov|woff|woff2|ttf|otf))/g;
const remotePattern = /https?:\/\/[^\s)"']+/g;

let missing = [];
let remote = [];

for (const file of textFiles) {
  const path = join(root, file);
  if (!existsSync(path)) continue;
  const text = readFileSync(path, "utf8");
  const localRefs = text.match(localAssetPattern) || [];
  for (const ref of localRefs) {
    if (!existsSync(join(root, ref))) missing.push({ file, ref });
  }
  const remoteRefs = text.match(remotePattern) || [];
  for (const ref of remoteRefs) remote.push({ file, ref });
}

const assetDirs = ["assets/audio", "assets/fonts", "assets/images", "assets/video"];
const emptyAssetDirs = assetDirs
  .filter((dir) => existsSync(join(root, dir)))
  .filter((dir) => readdirSync(join(root, dir)).filter((name) => name !== ".gitkeep").length === 0);

if (missing.length > 0) {
  console.error("Missing local asset references:");
  for (const item of missing) console.error(`- ${item.file}: ${item.ref}`);
}

if (remote.length > 0) {
  console.warn("Remote asset references found. Vendor required render assets before final delivery:");
  for (const item of remote) console.warn(`- ${item.file}: ${item.ref}`);
}

if (emptyAssetDirs.length > 0) {
  console.warn("Empty asset directories:");
  for (const dir of emptyAssetDirs) console.warn(`- ${dir}`);
}

if (missing.length > 0) process.exit(1);

console.log("Asset check passed for required local references.");
