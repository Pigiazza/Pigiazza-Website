import { describe, expect, it } from 'vitest';
import en from '@/messages/en';
import it_ from '@/messages/it';
import { resolveLang } from '@/lib/i18n';

function shape(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) return [`${prefix}[${value.length}]`];
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => shape(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

describe('messages', () => {
  it('IT and EN have identical keys and array lengths', () => {
    expect(shape(it_)).toEqual(shape(en));
  });
});

describe('resolveLang', () => {
  it('prefers a valid stored value', () => {
    expect(resolveLang('it', 'en-US')).toBe('it');
  });
  it('detects Italian from the browser', () => {
    expect(resolveLang(null, 'it-IT')).toBe('it');
  });
  it('defaults to English', () => {
    expect(resolveLang(null, 'fr-FR')).toBe('en');
    expect(resolveLang('xx', 'de')).toBe('en');
  });
});
