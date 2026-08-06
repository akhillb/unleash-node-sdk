import { expect, test } from 'vitest';
import {
  DEFAULT_BATCH_SIZE,
  DEFAULT_COMPRESS,
  DEFAULT_FLUSH_INTERVAL_MS,
  resolveAuditSink,
} from '../audit-config';

test('resolveAuditSink fills every default when only a url is given', () => {
  expect(resolveAuditSink({ url: 'https://audit.example.com/api/client/audit' })).toEqual({
    url: 'https://audit.example.com/api/client/audit',
    batchSize: DEFAULT_BATCH_SIZE,
    flushIntervalMs: DEFAULT_FLUSH_INTERVAL_MS,
    compress: DEFAULT_COMPRESS,
  });
});

test('resolveAuditSink keeps explicit values', () => {
  expect(
    resolveAuditSink({
      url: 'https://audit.example.com/api/client/audit',
      batchSize: 5,
      flushIntervalMs: 250,
      compress: true,
    }),
  ).toEqual({
    url: 'https://audit.example.com/api/client/audit',
    batchSize: 5,
    flushIntervalMs: 250,
    compress: true,
  });
});

test('resolveAuditSink defaults compress to false when omitted', () => {
  const url = 'https://audit.example.com/api/client/audit';
  expect(DEFAULT_COMPRESS).toBe(false);
  expect(resolveAuditSink({ url })?.compress).toBe(DEFAULT_COMPRESS);
});

test('resolveAuditSink keeps an explicit compress of true', () => {
  const url = 'https://audit.example.com/api/client/audit';
  expect(resolveAuditSink({ url, compress: true })?.compress).toBe(true);
});

test('resolveAuditSink keeps an explicit compress of false', () => {
  const url = 'https://audit.example.com/api/client/audit';
  expect(resolveAuditSink({ url, compress: false })?.compress).toBe(false);
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
