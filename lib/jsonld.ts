import en from '@/messages/en';
import { FIVERR_PROFILE, services } from './services';
import { socials } from './socials';

const SITE = 'https://pigiazza.com/';

export function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE}#person`,
        name: 'Tommaso',
        alternateName: 'Pigiazza',
        url: SITE,
        sameAs: socials.map((s) => s.href),
      },
      {
        '@type': 'ProfessionalService',
        name: 'Pigiazza — Minecraft commissions',
        url: SITE,
        provider: { '@id': `${SITE}#person` },
        areaServed: 'Worldwide',
        sameAs: FIVERR_PROFILE,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Minecraft development packages',
          itemListElement: services.map((s) => ({
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: s.packages[0].priceUsd,
            highPrice: s.packages[2].priceUsd,
            offerCount: s.packages.length,
            url: s.gigUrl,
            itemOffered: { '@type': 'Service', name: `Minecraft ${en.services.items[s.id].tab}` },
          })),
        },
      },
    ],
  };
}
