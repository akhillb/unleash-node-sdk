---
title: Get client features
excerpt: Fetch every feature flag your API token can evaluate.
api:
  file: unleash-client-api.json
  operationId: getClientFeatures
---

The SDK calls this endpoint on the interval set by `refreshInterval`. Send the
previous response's ETag as `If-None-Match` to get a `304` when nothing has
changed, which keeps polling cheap.
