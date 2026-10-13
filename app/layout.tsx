import type { Metadata } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/lib/i18n';
import { GlassFilters } from '@/components/GlassFilters';
import { Background } from '@/components/Background';
import { buildJsonLd } from '@/lib/jsonld';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-fredoka' });
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-nunito' });

const title = 'Pigiazza — Minecraft Mod, Plugin, Addon & Porting Commissions';
const description =
  'Custom Minecraft mods, plugins, addons and version ports on commission via Fiverr. Clear packages from $15, 5-star reviews.';

export const metadata: Metadata = {
  metadataBase: new URL('https://pigiazza.com'),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://pigiazza.com/',
    title,
    description,
    images: ['/projects/create-raw.webp'],
  },
  twitter: { card: 'summary' },
  icons: { icon: '/profile-icon.png', apple: '/profile-icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        <script defer data-domain="pigiazza.com" src="https://plausible.io/js/script.js" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }} />
      </head>
      <body>
        <LangProvider>
          <GlassFilters />
          <Background />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
