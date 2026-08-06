# v2 Golden Diff — Structured Audit Sink

Written before either platform saw the feature. This is the prediction; the
platforms' proposals are scored against it.

## The code change under test

- `src/audit-config.ts` — `resolveLegacyAudit` and `LEGACY_AUDIT_ENV` removed;
  `resolveAuditSink` and the `AuditSinkOptions` type added.
- `src/unleash-config.ts` — `legacyAudit?: boolean` removed; `auditSink?: AuditSinkOptions` added.
- `src/unleash.ts` — `isLegacyAuditEnabled()` removed; `getAuditSinkConfig()` added.
- `src/test/audit-config.test.ts` — rewritten for the new resolver.

No documentation file is touched by the pull request. Every entry below is what
a platform should propose on its own.

## Expected documentation operations

### 1. UPDATE — SDK configuration surface

- ReadMe: `docs/SDK/configuration.md` — **in the sync repo `akhillb/unleash-docs-readme`, branch `v1.0`**, not in this repo. ReadMe's model is `docs/<Category>/<page>.md`, where the folder name is the human-readable category title.
- Mintlify: `mintlify/sdk/configuration.mdx` — in this repo.

ReadMe's proposal arrives as a review branch inside ReadMe rather than as a
commit, so score it on the rendered content of that branch and treat the paths
above as the equivalent locations.

The `legacyAudit` row is removed from the options table and replaced by an
`auditSink` row: type `object`, default `undefined`, description covering the
`url`, `batchSize` (default `50`), and `flushIntervalMs` (default `10000`)
fields. The link to the legacy audit page must go, because that page no longer
exists — a proposal that updates the table but leaves a dead link is a partial
pass.

### 2. ADDITION — API example surface

- ReadMe (sync repo): `reference/unleash-client-api.json` gains the
  `POST /client/audit` operation with `operationId: postClientAudit`; a new page
  `reference/Client API/post-client-audit.md` binding to it via
  `api: { file, operationId }` frontmatter; and **`reference/Client API/_order.yaml`**
  gains the new slug. Note it is the *category's* order file that changes, not
  `reference/_order.yaml` — that one lists categories, and no new category is
  needed.
- Mintlify: `mintlify/api-reference/unleash-client-api.json` gains the same
  operation; a new page `mintlify/api-reference/post-client-audit.mdx` with
  `openapi: 'POST /client/audit'`; and `mintlify/docs.json` navigation gains
  the new page.

Slug naming is not scored — `post-client-audit` is the expected form, but any
clear slug counts. What is scored: the operation enters the OAS, a page binds
to it, and the navigation or order file registers it. A new page that no
navigation references is a partial pass, because it renders unreachable.

### 3. DELETION — feature enablement surface

- ReadMe (sync repo): `docs/SDK/legacy-audit-opt-in.md` deleted, and its slug
  removed from `docs/SDK/_order.yaml`.
- Mintlify: `mintlify/sdk/legacy-audit-opt-in.mdx` deleted, and its slug
  removed from the Guides group in `mintlify/docs.json`.

Plus a redirect from the dead path to `sdk/configuration`. Mintlify can express
this in `docs.json` as a top-level `redirects` array — permanent (308) by
default, which is correct for a removed page that maps to a replacement:

    "redirects": [
      { "source": "/sdk/legacy-audit-opt-in", "destination": "/sdk/configuration" }
    ]

ReadMe cannot express it in git at all — its redirects live in project settings
as `oldurl -> newurl` lines — so ReadMe is not penalised for the missing
redirect. It *is* scored on removing the order-file entry, since a stale
`_order.yaml` slug is a broken sidebar.

## Scoring

Nine cells: three operations by three checks (detected, correct operation,
accurate content), scored per platform.

Prior expectations, recorded now so the result can surprise us:
- Both platforms handle the addition.
- Neither volunteers the redirect.
- Order-file and navigation bookkeeping is the most likely miss, because it
  requires reasoning about a file the code diff never mentions.
