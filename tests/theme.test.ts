import { describe, expect, it } from 'vitest';
import { resolveTheme } from '@/lib/theme';

describe('resolveTheme', () => {
  it('uses the stored choice when valid', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });
  it('falls back to the system preference', () => {
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme(null, false)).toBe('light');
  });
  it('ignores invalid stored values', () => {
    expect(resolveTheme('purple', true)).toBe('dark');
  });
});
