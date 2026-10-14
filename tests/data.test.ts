import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { FIVERR_PROFILE, services } from '@/lib/services';
import { projects } from '@/lib/projects';
import { socials } from '@/lib/socials';

const publicFile = (p: string) => path.resolve(__dirname, '..', 'public', p.replace(/^\//, ''));

describe('services', () => {
  it('lists mod, plugin, addon and port in order', () => {
    expect(services.map((s) => s.id)).toEqual(['mod', 'plugin', 'addon', 'port']);
  });

  it('has basic, standard, premium packages with strictly rising prices', () => {
    for (const s of services) {
      expect(s.packages.map((p) => p.tier)).toEqual(['basic', 'standard', 'premium']);
      const prices = s.packages.map((p) => p.priceUsd);
      expect(prices[0]).toBeLessThan(prices[1]);
      expect(prices[1]).toBeLessThan(prices[2]);
      for (const p of s.packages) {
        expect(Number.isInteger(p.days) && p.days > 0).toBe(true);
        expect(Number.isInteger(p.revisions) && p.revisions > 0).toBe(true);
      }
    }
  });

  it('matches the Fiverr gig prices', () => {
    const prices = Object.fromEntries(services.map((s) => [s.id, s.packages.map((p) => p.priceUsd)]));
    expect(prices).toEqual({ mod: [25, 40, 60], plugin: [20, 35, 50], addon: [20, 35, 50], port: [15, 25, 35] });
  });

  it('uses https gig URLs', () => {
    expect(FIVERR_PROFILE).toBe('https://www.fiverr.com/sellers/pigiazza');
    for (const s of services) expect(s.gigUrl.startsWith('https://')).toBe(true);
  });
});

describe('projects', () => {
  it('lists Hug & Marry and Create: Raw', () => {
    expect(projects.map((p) => p.id)).toEqual(['hugMarry', 'createRaw']);
  });

  it('has 5 stars and three integer scores between 1 and 5', () => {
    for (const p of projects) {
      expect(p.stars).toBe(5);
      const scores = [p.scores.communication, p.scores.quality, p.scores.value];
      for (const v of scores) expect(Number.isInteger(v) && v >= 1 && v <= 5).toBe(true);
    }
  });

  it('points images at files that exist', () => {
    for (const p of projects) if (p.image) expect(existsSync(publicFile(p.image))).toBe(true);
  });
});

describe('socials', () => {
  it('lists exactly Fiverr, GitHub, Modrinth, Ko-fi over https', () => {
    expect(socials.map((s) => s.name)).toEqual(['Fiverr', 'GitHub', 'Modrinth', 'Ko-fi']);
    for (const s of socials) expect(s.href.startsWith('https://')).toBe(true);
  });

  it('has an icon file for every social', () => {
    for (const s of socials) expect(existsSync(publicFile(s.icon))).toBe(true);
  });
});
