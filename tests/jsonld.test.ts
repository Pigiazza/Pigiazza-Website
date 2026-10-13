import { describe, expect, it } from 'vitest';
import { buildJsonLd } from '@/lib/jsonld';

type Node = Record<string, any>;

describe('buildJsonLd', () => {
  const graph = buildJsonLd()['@graph'] as Node[];
  const person = graph.find((n) => n['@type'] === 'Person')!;
  const service = graph.find((n) => n['@type'] === 'ProfessionalService')!;

  it('links the person to exactly the four socials', () => {
    expect(person.sameAs).toEqual([
      'https://www.fiverr.com/sellers/pigiazza',
      'https://github.com/Pigiazza',
      'https://www.youtube.com/channel/UCt-khCdmSNPxp9ktgGB0o-A',
      'https://ko-fi.com/pigiazza',
    ]);
  });

  it('offers the four services with USD price ranges', () => {
    const offers = service.hasOfferCatalog.itemListElement as Node[];
    expect(offers.map((o) => [o.itemOffered.name, o.lowPrice, o.highPrice])).toEqual([
      ['Minecraft Mods', 25, 60],
      ['Minecraft Plugins', 20, 50],
      ['Minecraft Addons', 20, 50],
      ['Minecraft Porting', 15, 35],
    ]);
    for (const o of offers) expect(o.priceCurrency).toBe('USD');
  });

  it('has no Porch Pirates, Modrinth or review data', () => {
    const json = JSON.stringify(buildJsonLd());
    expect(json).not.toMatch(/Porch|Bramble|modrinth|Review|AggregateRating/i);
  });
});
