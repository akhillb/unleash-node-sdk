export const DEFAULT_BATCH_SIZE = 50;

export const DEFAULT_FLUSH_INTERVAL_MS = 10_000;

export const DEFAULT_COMPRESS = false;

export interface AuditSinkOptions {
  /** Absolute URL of the audit endpoint, e.g. `https://host/api/client/audit`. */
  url: string;
  /** Records buffered before a flush is triggered. */
  batchSize: number;
  /** Milliseconds between flushes when the batch has not filled. */
  flushIntervalMs: number;
  /** Gzips the request body sent to `POST /api/client/audit`. */
  compress: boolean;
}

function assertPositive(fieldName: string, value: number): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Audit sink "${fieldName}" must be a positive number, got ${value}`);
  }
}

/**
 * Resolves audit sink configuration, applying defaults for any field the
 * caller left out. Returns `undefined` when no sink is configured, which
 * disables audit reporting.
 *
 * Unlike the environment-variable opt-in this replaces, invalid numbers throw:
 * an explicit option set to a nonsense value is a programming error, not a
 * deployment typo, so it should fail loudly at startup.
 */
export function resolveAuditSink(config?: Partial<AuditSinkOptions>): AuditSinkOptions | undefined {
  if (!config?.url) {
    return undefined;
  }

  const batchSize = config.batchSize ?? DEFAULT_BATCH_SIZE;
  const flushIntervalMs = config.flushIntervalMs ?? DEFAULT_FLUSH_INTERVAL_MS;
  const compress = config.compress ?? DEFAULT_COMPRESS;

  assertPositive('batchSize', batchSize);
  assertPositive('flushIntervalMs', flushIntervalMs);

  return { url: config.url, batchSize, flushIntervalMs, compress };
}
