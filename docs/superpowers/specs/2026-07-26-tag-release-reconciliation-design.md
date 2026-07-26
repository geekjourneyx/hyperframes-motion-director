# Tag-Triggered Release Reconciliation Design

## Goal

Make GitHub Releases a deterministic result of version tags instead of a manual browser step.

The normal release path is:

1. Prepare and validate the version on `main`.
2. Create an annotated `vX.Y.Z` tag.
3. Push `main` and the tag atomically.
4. GitHub Actions validates the exact tagged commit.
5. GitHub Actions creates the matching GitHub Release from that version's changelog entry.

The workflow must also repair a missing Release when a valid tag already exists, including the current `v2.8.0` tag.

## First-Principles Invariants

- A version tag is the release intent and the immutable source revision.
- A GitHub Release is a derived publishing record for that tag, not a separate version source.
- Validation always runs against the tagged commit, never implicitly against the latest `main`.
- The version in the tag and the first version in `CHANGELOG.md` must match.
- Re-running the workflow must not create duplicate Releases.
- A failure before Release creation leaves the tag intact and the Release absent.
- A missing Release for the latest valid tag is repairable without deleting or moving the tag.
- Release automation must not depend on a developer's browser session or personal access token.

## Scope

### Included

- A GitHub Actions workflow for stable semantic-version tags matching `vX.Y.Z`.
- Automatic reconciliation of the latest reachable stable tag when `main` is pushed.
- A manual recovery input for an explicit existing tag.
- Release notes extracted from the matching `CHANGELOG.md` section.
- Existing structural and asset-validator tests as release gates.
- A deterministic release-safety audit for tracked noise and high-confidence sensitive data.
- A written local release SOP.

### Excluded

- Pre-release tags such as `v2.9.0-beta.1`.
- Publishing packages to npm, marketplaces, or other registries.
- Deleting, moving, or force-pushing tags.
- Automatically changing version numbers.
- Automatically creating tags from commits.

## Trigger And Reconciliation Model

The workflow has three entry paths:

### Tag Push

When a tag matching `v*` is pushed, the workflow resolves that tag and then enforces the strict `vX.Y.Z` format.

This is the normal path for all future releases.

### Main Push Reconciliation

When `main` is pushed, the workflow finds the newest stable semantic-version tag reachable from `main`.

- If the matching GitHub Release already exists, the run exits successfully without further work.
- If the Release is missing, the workflow validates and publishes that tag.
- If no stable tag exists, the run exits successfully without publishing.

This is a repair path, not a second version source. It closes the gap created when a tag was pushed before the workflow existed or when an earlier Release attempt failed.

For the initial rollout, the workflow commit pushed to `main` will discover the existing `v2.8.0` tag and create its missing Release.

### Manual Recovery

`workflow_dispatch` accepts an explicit stable tag. It uses the same validation and publishing path as automatic triggers.

This is reserved for recovery and audit, not the normal SOP.

## Workflow Stages

### 1. Resolve

Determine exactly one candidate tag:

- tag event: the pushed tag;
- manual event: the supplied tag;
- `main` event: the highest stable semantic-version tag merged into `main`.

Reject tags that do not match `^v[0-9]+\.[0-9]+\.[0-9]+$`.

### 2. No-Op Check

Query GitHub for an existing Release with the candidate tag.

- Existing Release: exit successfully and report that no action was needed.
- Missing Release: continue.

### 3. Checkout Exact Tag

Checkout the candidate tag with full tag history available. Confirm that the checked-out commit is the commit referenced by the tag.

### 4. Release Metadata Validation

- Strip the leading `v` and compare the result with the first version heading in `CHANGELOG.md`.
- Extract only that version's changelog body.
- Fail if the version heading is absent or the notes are empty.
- Confirm the tag is reachable from `origin/main`.

### 5. Safety Audit

Audit tracked release content only.

Reject:

- `.DS_Store`, logs, temporary files, editor backups, and generated production output;
- personal local paths, local session-history paths, and local cache paths;
- private-key blocks and high-confidence credential prefixes;
- newly tracked environment files or obvious credential dumps.

The audit avoids broad low-confidence matching that would reject normal documentation words such as "token" or "API key" without an actual credential value.

### 6. Quality Gates

Run the strongest deterministic repository checks that are valid without a completed video project:

- Markdown and patch whitespace checks where applicable;
- JSON parsing for eval and template files;
- Node syntax checks for release-relevant scripts;
- skill structure check;
- all image-asset validator tests;
- fresh project scaffold creation;
- scaffold asset check;
- scaffold design-engineering check;
- assertions that the generated asset and scene schemas contain the current required contracts.

The completed-artifact validator is not run against an untouched scaffold because that scaffold deliberately contains approval and production placeholders. A failure there would prove only that an empty project is incomplete.

### 7. Publish

Use the GitHub-provided workflow token with only `contents: write` permission.

Create a non-draft, non-prerelease GitHub Release:

- tag: candidate tag;
- title: candidate tag;
- notes: extracted changelog section;
- latest: normal GitHub stable-release behavior.

Use the GitHub CLI already present on GitHub-hosted runners. Do not add a third-party release action.

### 8. Verify

Read the Release back from GitHub and verify:

- tag matches;
- state is published;
- state is not draft;
- state is not prerelease;
- URL is available.

## Concurrency And Idempotency

- Use one concurrency group per tag.
- Do not cancel a publishing run that has already started.
- Check for an existing Release before expensive validation and again before creation.
- Treat an already-existing valid Release as success.
- If two runs race, one may create the Release and the other must recover by reading the created Release instead of failing the overall release state.

## Permissions And Security

- Default workflow permissions are read-only.
- Only the publishing job receives `contents: write`.
- No personal GitHub token, browser login, repository secret, or external release service is required.
- Shell variables are quoted, and tag input is validated before it is used.
- The workflow never deletes or moves a tag.
- Third-party Actions are avoided; official checkout/setup actions must be pinned to stable major versions.

## Local Release SOP

1. Ensure the worktree is clean and `main` matches `origin/main`.
2. Add the new version section at the top of `CHANGELOG.md`.
3. Run the local release gate with `vX.Y.Z`.
4. Commit using a GitHub no-reply email if the repository is public.
5. Create an annotated `vX.Y.Z` tag.
6. Push branch and tag atomically:

   `git push --atomic origin main vX.Y.Z`

7. Wait for the GitHub Actions release workflow.
8. Verify that the published Release points to the same tag and commit.

There is no separate `git push release` step.

## Failure Handling

- Validation failure: fix on a new commit and publish a new patch version. Do not move a public tag.
- Release API transient failure: rerun with the manual recovery input or allow the next `main` push reconciliation to repair it.
- Release exists but is incorrect: stop and review manually; do not overwrite published notes automatically.
- Tag exists on a commit without the workflow: `main` reconciliation can still validate that historical tag using the workflow from `main`.
- GitHub Actions unavailable: keep the tag; reconciliation remains safe to run later.

## Acceptance Criteria

- Pushing a new stable version tag creates exactly one matching Release.
- Pushing `main` with an unreleased latest stable tag creates the missing Release.
- Pushing `main` when the latest tag already has a Release is a successful no-op.
- Manual recovery can publish an existing valid tag.
- A malformed tag, changelog mismatch, failed audit, or failed test blocks Release creation.
- The initial rollout creates the missing `v2.8.0` Release without moving or deleting its tag.
- The repository documents one normal release command sequence and one recovery path.
