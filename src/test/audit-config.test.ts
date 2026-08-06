import { expect, test } from 'vitest';
import { LEGACY_AUDIT_ENV, resolveLegacyAudit } from '../audit-config';

test('resolveLegacyAudit enables legacy audit when the env var is set to 1', () => {
  expect(resolveLegacyAudit({ [LEGACY_AUDIT_ENV]: '1' })).toBe(true);
});

test('resolveLegacyAudit accepts true and yes, case-insensitively and untrimmed', () => {
  expect(resolveLegacyAudit({ [LEGACY_AUDIT_ENV]: 'TRUE' })).toBe(true);
  expect(resolveLegacyAudit({ [LEGACY_AUDIT_ENV]: '  yes  ' })).toBe(true);
});

test('resolveLegacyAudit defaults to disabled when the env var is absent', () => {
  expect(resolveLegacyAudit({})).toBe(false);
});

test('resolveLegacyAudit defaults to disabled when the env var is empty', () => {
  expect(resolveLegacyAudit({ [LEGACY_AUDIT_ENV]: '' })).toBe(false);
  expect(resolveLegacyAudit({ [LEGACY_AUDIT_ENV]: '   ' })).toBe(false);
});

test('resolveLegacyAudit rejects a malformed value without throwing', () => {
  expect(() => resolveLegacyAudit({ [LEGACY_AUDIT_ENV]: 'banana' })).not.toThrow();
  expect(resolveLegacyAudit({ [LEGACY_AUDIT_ENV]: 'banana' })).toBe(false);
  expect(resolveLegacyAudit({ [LEGACY_AUDIT_ENV]: '0' })).toBe(false);
});
