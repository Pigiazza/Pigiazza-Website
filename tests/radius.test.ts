import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

function cssFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (name === 'node_modules' || name === '.next' || name === 'out') return [];
    if (statSync(full).isDirectory()) return cssFiles(full);
    return full.endsWith('.css') ? [full] : [];
  });
}

describe('radius scale', () => {
  const root = path.resolve(__dirname, '..');
  const dirs = ['app', 'components'].map((d) => path.join(root, d));

  it('uses only radius tokens (or 0) in every border-radius', () => {
    const offenders: string[] = [];
    for (const file of dirs.flatMap(cssFiles)) {
      const src = readFileSync(file, 'utf8');
      for (const m of src.matchAll(/border-radius\s*:\s*([^;]+);/g)) {
        const value = m[1].trim();
        if (value !== '0' && !value.includes('var(--r-')) offenders.push(`${file}: ${value}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it('defines exactly the four radius tokens', () => {
    const css = readFileSync(path.join(root, 'app/globals.css'), 'utf8');
    const tokens = [...css.matchAll(/--r-([a-z]+)\s*:\s*([^;]+);/g)].map((m) => `${m[1]}=${m[2].trim()}`);
    expect(tokens).toEqual(['sm=12px', 'md=20px', 'lg=32px', 'pill=999px']);
  });
});
