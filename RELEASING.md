# Release SOP

GitHub Releases are created automatically. Do not publish through the browser; there is no separate release push command.

## Normal release

1. Start from a clean, current `main`.
2. Add the new `X.Y.Z` section at the top of `CHANGELOG.md`.
3. Run the release gates:

   ```bash
   node skills/hyperframes-motion-director/scripts/check_release.mjs vX.Y.Z
   node skills/hyperframes-motion-director/scripts/check-structure.mjs
   node --test skills/hyperframes-motion-director/scripts/tests/*.test.mjs
   ```

4. Commit the release changes.
5. Create an annotated tag:

   ```bash
   git tag -a vX.Y.Z -m "vX.Y.Z"
   ```

6. Push the commit and tag together:

   ```bash
   git push --atomic origin main vX.Y.Z
   ```

The tag push triggers `.github/workflows/release.yml`. GitHub validates the tagged source and creates the matching Release from that version's changelog notes.

## Automatic repair

Every push to `main` checks the newest stable tag reachable from `main`.

- If its Release exists, the workflow exits successfully without changing it.
- If its Release is missing, the workflow validates the tag and creates the Release.

This repairs tag events that were missed or failed without deleting, moving, or force-pushing a public tag.

## Manual recovery

Run the `Release` workflow with the existing stable tag as its `tag` input. The same validation and publishing gates apply.

Use manual recovery only when waiting for the next `main` push is undesirable.

## Failure rules

- Never move or force-push a public version tag.
- If tagged source is wrong, fix it and publish a new patch version.
- If validation fails, no Release is created.
- If Release creation fails temporarily, rerun the workflow or let the next `main` push reconcile it.
- If a Release already exists but contains incorrect information, stop and review it explicitly; automation will not overwrite it.
