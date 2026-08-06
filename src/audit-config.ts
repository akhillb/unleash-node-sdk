export const LEGACY_AUDIT_ENV = 'UNLEASH_LEGACY_AUDIT';

const TRUTHY_VALUES = new Set(['1', 'true', 'yes']);

/**
 * Resolves the legacy audit opt-in from the environment. When enabled, flag
 * evaluation records ride along with the regular client metrics payload
 * instead of going to a dedicated audit sink.
 *
 * Unrecognised values resolve to `false` rather than throwing, so a typo in a
 * deployment environment degrades to the default instead of failing startup.
 *
 * @deprecated Configure an audit sink explicitly instead. This environment
 * variable will be removed in a future release.
 */
export function resolveLegacyAudit(env: NodeJS.ProcessEnv = process.env): boolean {
  const rawValue = env[LEGACY_AUDIT_ENV];
  if (rawValue === undefined) {
    return false;
  }
  return TRUTHY_VALUES.has(rawValue.trim().toLowerCase());
}
