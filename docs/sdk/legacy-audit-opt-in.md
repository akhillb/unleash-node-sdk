---
title: Legacy audit opt-in
excerpt: Enable audit reporting through the UNLEASH_LEGACY_AUDIT environment variable.
deprecated: true
---

> 🚧 Deprecated
>
> This environment variable will be removed. It has no replacement that is
> configured through the environment — a future release replaces it with an
> explicit SDK option.

## Enabling it

Set the environment variable before your process starts:

```bash
export UNLEASH_LEGACY_AUDIT=1
```

Accepted truthy values are `1`, `true`, and `yes`, matched case-insensitively
and after trimming whitespace. Any other value — including an empty string or a
typo — leaves legacy audit **disabled** rather than failing startup.

You can override the environment variable per client with the `legacyAudit`
option, which takes precedence:

```javascript
initialize({
  url: 'https://unleash.example.com/api',
  appName: 'my-app',
  legacyAudit: true,
});
```

## Verifying it

```javascript
console.log(unleash.isLegacyAuditEnabled());
```

## What it changes

Evaluation records are appended to the regular client metrics upload rather
than being delivered to a dedicated audit endpoint.
