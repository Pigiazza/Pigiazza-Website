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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script defer data-domain="pigiazza.com" src="https://plausible.io/js/script.js" />
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
