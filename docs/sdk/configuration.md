---
title: Configuration
excerpt: Options accepted by initialize and startUnleash.
---

Every option below is a property on the object passed to `initialize()` or
`startUnleash()`. Only `url` and `appName` are required.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `url` | string | — | Base URL of the Unleash API, including `/api`. Required. |
| `appName` | string | — | Name this application reports as. Required. |
| `refreshInterval` | number | `15000` | Milliseconds between flag fetches. |
| `metricsInterval` | number | `60000` | Milliseconds between metrics uploads. |
| `disableMetrics` | boolean | `false` | Stop reporting usage metrics entirely. |
| `legacyAudit` | boolean | `false` | Deprecated. Send evaluation records with the metrics payload. See [Legacy audit opt-in](doc:legacy-audit-opt-in). |

## Example

```javascript
initialize({
  url: 'https://unleash.example.com/api',
  appName: 'my-app',
  refreshInterval: 10000,
});
```
