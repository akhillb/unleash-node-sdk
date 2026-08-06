import { expect, test } from 'vitest';
import { DEFAULT_BATCH_SIZE, DEFAULT_FLUSH_INTERVAL_MS, resolveAuditSink } from '../audit-config';

test('resolveAuditSink fills both defaults when only a url is given', () => {
  expect(resolveAuditSink({ url: 'https://audit.example.com/api/client/audit' })).toEqual({
    url: 'https://audit.example.com/api/client/audit',
    batchSize: DEFAULT_BATCH_SIZE,
    flushIntervalMs: DEFAULT_FLUSH_INTERVAL_MS,
  });
});

test('resolveAuditSink keeps explicit values', () => {
  expect(
    resolveAuditSink({
      url: 'https://audit.example.com/api/client/audit',
      batchSize: 5,
      flushIntervalMs: 250,
    }),
  ).toEqual({
    url: 'https://audit.example.com/api/client/audit',
    batchSize: 5,
    flushIntervalMs: 250,
  });
});

test('resolveAuditSink returns undefined when unconfigured', () => {
  expect(resolveAuditSink()).toBeUndefined();
  expect(resolveAuditSink({})).toBeUndefined();
});

test('resolveAuditSink rejects a non-positive batchSize or flushIntervalMs', () => {
  const url = 'https://audit.example.com/api/client/audit';
  expect(() => resolveAuditSink({ url, batchSize: 0 })).toThrow(/batchSize/);
  expect(() => resolveAuditSink({ url, flushIntervalMs: -1 })).toThrow(/flushIntervalMs/);
});

test('the removed legacy environment variable is inert', async () => {
  const auditConfig = await import('../audit-config.js');
  expect('resolveLegacyAudit' in auditConfig).toBe(false);
  expect('LEGACY_AUDIT_ENV' in auditConfig).toBe(false);
});
