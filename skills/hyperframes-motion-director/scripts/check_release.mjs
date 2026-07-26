#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

function readOption(args, name, fallback = "") {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1] ?? "";
}

const args = process.argv.slice(2);
const tag = args[0] ?? "";
const repo = resolve(readOption(args, "--repo", process.cwd()));
const notesOutput = readOption(args, "--notes-output");

if (!/^v\d+\.\d+\.\d+$/.test(tag)) {
  console.error("Stable tag must match vX.Y.Z.");
  process.exit(1);
}

const version = tag.slice(1);
const changelog = readFileSync(resolve(repo, "CHANGELOG.md"), "utf8");
const trackedResult = spawnSync("git", ["-C", repo, "ls-files", "-z"], {
  encoding: "utf8",
});

if (trackedResult.status !== 0) {
  console.error(trackedResult.stderr || "Unable to list tracked release files.");
  process.exit(1);
}

const trackedFiles = trackedResult.stdout.split("\0").filter(Boolean);
const noiseFile = trackedFiles.find(
  (path) =>
    /(^|\/)\.DS_Store$/.test(path) ||
    /\.(?:log|tmp|bak)$/.test(path) ||
    /~$/.test(path) ||
    path.startsWith("productions/"),
);

if (noiseFile) {
  console.error(`Tracked noise file is not allowed in a release: ${noiseFile}`);
  process.exit(1);
}

const environmentFile = trackedFiles.find(
  (path) =>
    /(^|\/)\.env(?:\.[^/]+)?$/.test(path) &&
    !/\.env\.(?:example|sample|template)$/.test(path),
);

if (environmentFile) {
  console.error(`Tracked environment file is not allowed in a release: ${environmentFile}`);
  process.exit(1);
}

for (const path of trackedFiles) {
  const content = readFileSync(resolve(repo, path));
  if (content.includes(0)) continue;
  const text = content.toString("utf8");
  if (
    /\/Users\/|\/home\/[^/\s]+\/|\/private\/var\/folders\/|\.codex\/sessions\/|\.claude\/projects\//i.test(
      text,
    )
  ) {
    console.error(`Sensitive local path found in tracked file: ${path}`);
    process.exit(1);
  }
  if (
    /BEGIN (?:RSA|OPENSSH|EC|DSA|PGP) PRIVATE KEY|github_pat_[A-Za-z0-9_]{12,}|\bgh[pousr]_[A-Za-z0-9]{20,}|\bglpat-[A-Za-z0-9_-]{12,}|\bxox[baprs]-[A-Za-z0-9-]{12,}|\b(?:AKIA|ASIA)[0-9A-Z]{12,}|\bsk-(?:proj-)?[A-Za-z0-9_-]{12,}|\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{8,}/.test(
      text,
    )
  ) {
    console.error(`Credential material found in tracked file: ${path}`);
    process.exit(1);
  }
}

const newestVersion = /^## \[(\d+\.\d+\.\d+)\]/m.exec(changelog)?.[1] ?? "";

if (newestVersion !== version) {
  console.error(
    `Tag ${tag} does not match newest changelog version ${newestVersion || "(missing)"}.`,
  );
  process.exit(1);
}

const releaseHeading = new RegExp(
  `^## \\[${version.replaceAll(".", "\\.")}\\][^\\n]*\\n`,
  "m",
).exec(changelog);

if (!releaseHeading) {
  console.error(`CHANGELOG.md does not contain release notes for ${tag}.`);
  process.exit(1);
}

const bodyStart = releaseHeading.index + releaseHeading[0].length;
const nextHeading = changelog.indexOf("\n## [", bodyStart);
const releaseBody = changelog.slice(
  bodyStart,
  nextHeading === -1 ? changelog.length : nextHeading,
);

if (!releaseBody.trim()) {
  console.error(`Release notes for ${tag} are empty.`);
  process.exit(1);
}

const notes = `## What's changed\n\n${releaseBody.trim()}\n`;

if (notesOutput) {
  writeFileSync(resolve(notesOutput), notes);
}

console.log(`Release gate passed for ${tag}.`);
