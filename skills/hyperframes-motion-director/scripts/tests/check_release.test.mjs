import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import test from "node:test";

const scriptPath = fileURLToPath(new URL("../check_release.mjs", import.meta.url));

function run(command, args, cwd) {
  return spawnSync(command, args, {
    cwd,
    encoding: "utf8",
  });
}

function createReleaseRepo() {
  const root = mkdtempSync(join(tmpdir(), "hyperframes-release-test-"));
  mkdirSync(join(root, "skills"), { recursive: true });
  writeFileSync(
    join(root, "CHANGELOG.md"),
    [
      "# Changelog",
      "",
      "## [2.8.0] - 2026-07-26",
      "",
      "- Added deterministic release reconciliation.",
      "- Added a tracked-content safety audit.",
      "",
      "## [2.7.0] - 2026-07-24",
      "",
      "- Previous release.",
      "",
    ].join("\n"),
  );
  writeFileSync(join(root, "README.md"), "# Fixture\n");
  run("git", ["init", "-q"], root);
  run("git", ["config", "user.name", "Release Test"], root);
  run("git", ["config", "user.email", "release-test@example.invalid"], root);
  run("git", ["add", "CHANGELOG.md", "README.md"], root);
  run("git", ["commit", "-qm", "fixture"], root);
  return root;
}

function checkRelease(root, tag = "v2.8.0") {
  const notesPath = join(root, "release-notes.md");
  const result = run(
    process.execPath,
    [scriptPath, tag, "--repo", root, "--notes-output", notesPath],
    dirname(scriptPath),
  );
  return { ...result, notesPath };
}

test("accepts a matching stable tag and extracts only its changelog notes", () => {
  const root = createReleaseRepo();
  const result = checkRelease(root);

  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    readFileSync(result.notesPath, "utf8"),
    [
      "## What's changed",
      "",
      "- Added deterministic release reconciliation.",
      "- Added a tracked-content safety audit.",
      "",
    ].join("\n"),
  );
});

test("rejects a tag that is not a stable vX.Y.Z version", () => {
  const root = createReleaseRepo();
  const result = checkRelease(root, "release-2.8");

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /stable tag must match vX\.Y\.Z/i);
});

test("rejects a tag that does not match the newest changelog version", () => {
  const root = createReleaseRepo();
  const changelogPath = join(root, "CHANGELOG.md");
  writeFileSync(
    changelogPath,
    readFileSync(changelogPath, "utf8").replace(
      "## [2.8.0] - 2026-07-26",
      "## [2.9.0] - 2026-07-26",
    ),
  );
  const result = checkRelease(root);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /tag v2\.8\.0 does not match newest changelog version 2\.9\.0/i);
});

test("rejects tracked operating-system and temporary noise", () => {
  const root = createReleaseRepo();
  writeFileSync(join(root, ".DS_Store"), "noise");
  run("git", ["add", "-f", ".DS_Store"], root);
  const result = checkRelease(root);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /tracked noise file.*\.DS_Store/i);
});

test("rejects personal and local session paths in tracked text", () => {
  const root = createReleaseRepo();
  const privateSessionPath = [
    "",
    "Users",
    "private-person",
    ".codex",
    "sessions",
    "2026",
    "example.jsonl",
  ].join("/");
  writeFileSync(
    join(root, "notes.md"),
    `Session source: ${privateSessionPath}\n`,
  );
  run("git", ["add", "notes.md"], root);
  const result = checkRelease(root);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /sensitive local path.*notes\.md/i);
});

test("rejects high-confidence credential material in tracked text", () => {
  const root = createReleaseRepo();
  const fakeCredential = ["github", "_pat_", "FAKE1234567890EXAMPLE"].join("");
  writeFileSync(
    join(root, "credentials.txt"),
    `GITHUB_TOKEN=${fakeCredential}\n`,
  );
  run("git", ["add", "credentials.txt"], root);
  const result = checkRelease(root);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /credential material.*credentials\.txt/i);
});

test("rejects tracked environment files but allows environment examples", () => {
  const root = createReleaseRepo();
  writeFileSync(join(root, ".env.example"), "API_KEY=your-key-here\n");
  writeFileSync(join(root, ".env"), "API_KEY=local-value\n");
  run("git", ["add", "-f", ".env", ".env.example"], root);
  const result = checkRelease(root);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /tracked environment file.*\.env/i);
  assert.doesNotMatch(result.stderr, /\.env\.example/i);
});

test("rejects an empty changelog section", () => {
  const root = createReleaseRepo();
  const changelogPath = join(root, "CHANGELOG.md");
  writeFileSync(
    changelogPath,
    readFileSync(changelogPath, "utf8").replace(
      "- Added deterministic release reconciliation.\n- Added a tracked-content safety audit.",
      "",
    ),
  );
  const result = checkRelease(root);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /release notes for v2\.8\.0 are empty/i);
});

test("does not flag the release scanner's own detection rules", () => {
  const root = createReleaseRepo();
  writeFileSync(join(root, "check_release.mjs"), readFileSync(scriptPath, "utf8"));
  run("git", ["add", "check_release.mjs"], root);
  const result = checkRelease(root);

  assert.equal(result.status, 0, result.stderr);
});
