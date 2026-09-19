import type { Metadata } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import './globals.css';
import { themeInitScript } from '@/lib/theme-script';
import { ThemeProvider } from '@/lib/theme';
import { LangProvider } from '@/lib/i18n';
import { GlassFilters } from '@/components/GlassFilters';
import { Background } from '@/components/Background';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-fredoka' });
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-nunito' });

export const metadata: Metadata = {
  metadataBase: new URL('https://pigiazza.com'),
  title: 'Pigiazza — Game Developer',
  description: 'Porch Pirates by Bramble Games, plus Minecraft mods and plugins on commission.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://pigiazza.com/',
    title: 'Pigiazza — Game Developer',
    description: 'Porch Pirates by Bramble Games, plus Minecraft mods and plugins on commission.',
    images: ['/profile-icon.png'], // PLACEHOLDER: replace with Porch Pirates key art
  },
  twitter: { card: 'summary' },
  icons: { icon: '/profile-icon.png', apple: '/profile-icon.png' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Tommaso',
      alternateName: 'Pigiazza',
      url: 'https://pigiazza.com/',
      sameAs: [
        'https://github.com/Pigiazza',
        'https://modrinth.com/user/Pigiazza',
        'https://www.fiverr.com/sellers/pigiazza',
        'https://ko-fi.com/pigiazza',
      ],
    },
    // PLACEHOLDER: complete genre, platform and release info when known
    { '@type': 'VideoGame', name: 'Porch Pirates', publisher: { '@type': 'Organization', name: 'Bramble Games', url: 'https://www.bramble-games.com' } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script defer data-domain="pigiazza.com" src="https://plausible.io/js/script.js" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>
            <GlassFilters />
            <Background />
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
