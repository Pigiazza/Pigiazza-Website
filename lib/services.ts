export type ServiceId = 'mod' | 'plugin' | 'addon' | 'port';
export type Tier = 'basic' | 'standard' | 'premium';
export type Package = { tier: Tier; priceUsd: number; days: number; revisions: number };
export type Service = { id: ServiceId; gigUrl: string; packages: [Package, Package, Package] };

export const FIVERR_PROFILE = 'https://www.fiverr.com/sellers/pigiazza';

// PLACEHOLDER: replace each gigUrl with the real Fiverr gig URL.
export const services: Service[] = [
  {
    id: 'mod',
    gigUrl: FIVERR_PROFILE,
    packages: [
      { tier: 'basic', priceUsd: 25, days: 3, revisions: 1 },
      { tier: 'standard', priceUsd: 40, days: 5, revisions: 2 },
      { tier: 'premium', priceUsd: 60, days: 10, revisions: 3 },
    ],
  },
  {
    id: 'plugin',
    gigUrl: FIVERR_PROFILE,
    packages: [
      { tier: 'basic', priceUsd: 20, days: 3, revisions: 1 },
      { tier: 'standard', priceUsd: 35, days: 5, revisions: 2 },
      { tier: 'premium', priceUsd: 50, days: 10, revisions: 3 },
    ],
  },
  {
    id: 'addon',
    gigUrl: FIVERR_PROFILE,
    packages: [
      { tier: 'basic', priceUsd: 20, days: 3, revisions: 1 },
      { tier: 'standard', priceUsd: 35, days: 5, revisions: 2 },
      { tier: 'premium', priceUsd: 50, days: 10, revisions: 3 },
    ],
  },
  {
    id: 'port',
    gigUrl: FIVERR_PROFILE,
    packages: [
      { tier: 'basic', priceUsd: 15, days: 2, revisions: 1 },
      { tier: 'standard', priceUsd: 25, days: 5, revisions: 2 },
      { tier: 'premium', priceUsd: 35, days: 7, revisions: 3 },
    ],
  },
];
