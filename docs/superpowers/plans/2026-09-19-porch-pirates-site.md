# Porch Pirates One-Page Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old static site with a Next.js one-page featuring Porch Pirates, Bramble Games, an About section and Minecraft commissions, in a rounded Liquid Glass style with dark/light themes and IT/EN languages.

**Architecture:** Next.js App Router, static export, deployed on Cloudflare Pages. One `Glass` component is the single source of the glass look. Design tokens (radius scale, spacing, colours) live in `app/globals.css`. Theme and language are small client-side contexts persisted in `localStorage`; the HTML is rendered in English/light-safe defaults and an inline script sets the theme before paint.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, CSS Modules, Vitest (pure-logic tests only), `next/font`.

## Global Constraints

- Radius scale only: `--r-sm: 12px`, `--r-md: 20px`, `--r-lg: 32px`, `--r-pill: 999px`. No other `border-radius` values (nested radius = outer radius minus padding, via `calc(var(--r-*) - var(--s-*))`).
- Spacing scale in 4px steps: `--s-1` … `--s-16`.
- No Tailwind, no UI library, no i18n library.
- `output: 'export'` (fully static), hosted on Cloudflare Pages.
- Theme: `data-theme` on `<html>` (`light` | `dark`), follows `prefers-color-scheme` by default, manual toggle saved in `localStorage` key `theme`, set before first paint. Text contrast AA in both themes.
- Language: `en` (default) and `it`, saved in `localStorage` key `lang`; `<html lang>` follows it.
- Refraction (`backdrop-filter: url(#…)`) only inside `@supports`; `prefers-reduced-transparency` and `prefers-reduced-motion` respected.
- Plausible analytics kept: `<script defer data-domain="pigiazza.com" src="https://plausible.io/js/script.js">`.
- All non-real content is marked `// PLACEHOLDER` in code and is visibly a placeholder in the UI.
- Real links: `https://www.fiverr.com/sellers/pigiazza`, `https://modrinth.com/user/Pigiazza`, `https://github.com/Pigiazza`, `https://ko-fi.com/pigiazza`, `https://www.bramble-games.com`.
- Old site (HTML, private area, report-bug, `functions/`) is removed and lives only in git history.

## File Structure

```
package.json, tsconfig.json, next.config.mjs, vitest.config.ts, .gitignore
app/
  layout.tsx            # fonts, metadata, JSON-LD, Plausible, theme init script, providers
  page.tsx              # composes sections
  globals.css           # tokens, reset, base
  not-found.tsx         # styled 404
  sitemap.ts, robots.ts
components/
  Glass.tsx, Glass.module.css
  GlassFilters.tsx      # SVG refraction filter
  Background.tsx, Background.module.css
  Nav.tsx, Nav.module.css
  ThemeToggle.tsx, LangToggle.tsx, Toggles.module.css
  sections/
    Hero.tsx, Hero.module.css
    Screens.tsx, Screens.module.css
    Team.tsx, About.tsx, Commissions.tsx, Footer.tsx, Section.module.css
lib/
  theme.ts              # resolveTheme, THEME_KEY, themeInitScript, ThemeProvider/useTheme
  i18n.tsx              # resolveLang, LangProvider, useI18n
messages/en.ts, it.ts
public/                 # profile-icon.png, pigiazza.png, social icons
tests/
  theme.test.ts, i18n.test.ts, radius.test.ts
```

---

### Task 1: Clean slate and project scaffold

**Files:**
- Delete: `index.html`, `404.html`, `login.html`, `projects.html`, `report-bug.html`, `nav.js`, `script.js`, `projects.js`, `private-app.js`, `style.css`, `sitemap.xml`, `functions/`, tracked files in `assets/` (after moving the ones we keep)
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `vitest.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `public/*`
- Modify: `.gitignore`, `.claude/launch.json`

**Interfaces:**
- Produces: `npm run dev|build|test|typecheck` scripts; empty page that builds to `out/`.

- [ ] **Step 1: Move kept assets, remove the old site**

```bash
cd /Users/tommasopedrazzi/Desktop/DEV/WEBSITES/PIGIAZZA
mkdir public
git mv "assets/profile icon.png" public/profile-icon.png
git mv assets/pigiazza.png public/pigiazza.png
git mv assets/github.png public/github.png
git mv assets/modrinth.png public/modrinth.png
git mv assets/fiverr.jpg public/fiverr.jpg
git mv assets/kofi.png public/kofi.png
git rm -rq assets functions index.html 404.html login.html projects.html report-bug.html nav.js script.js projects.js private-app.js style.css sitemap.xml
```

Untracked `assets/icon.png` and `assets/landscape-day.png` stay where they are, untouched.

- [ ] **Step 2: Write `package.json`**

```json
{
  "name": "pigiazza",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "^15.5.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.6.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 3: Write config files**

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "out"]
}
```

`next.config.mjs`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
```

`vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  // tsconfig uses jsx: "preserve" for Next; Vitest needs JSX compiled to import lib/*.tsx.
  esbuild: { jsx: 'automatic' },
  resolve: { alias: { '@': path.resolve(__dirname) } },
  test: { include: ['tests/**/*.test.ts'] },
});
```

`.gitignore`:
```
node_modules
.next
out
.wrangler
.DS_Store
next-env.d.ts
```

`.claude/launch.json`:
```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "next-dev", "runtimeExecutable": "npm", "runtimeArgs": ["run", "dev"], "port": 3000 }
  ]
}
```

- [ ] **Step 4: Minimal app so the build passes**

`app/layout.tsx`:
```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`app/page.tsx`:
```tsx
export default function Page() {
  return <main>Porch Pirates</main>;
}
```

`app/globals.css`: empty file for now (`/* tokens in Task 2 */`).

- [ ] **Step 5: Install and verify the build**

Run: `npm install && npm run typecheck && npm run build`
Expected: no errors; `out/index.html` exists.

- [ ] **Step 6: Commit**

```bash
git add -A -- . ':!assets/icon.png' ':!assets/landscape-day.png' ':!.claude'
git commit -m "Reset to a Next.js scaffold, drop the old static site

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: Design tokens, theme logic and theme toggle

**Files:**
- Create: `lib/theme.ts`, `components/ThemeToggle.tsx`, `components/Toggles.module.css`, `tests/theme.test.ts`, `tests/radius.test.ts`
- Modify: `app/globals.css`, `app/layout.tsx`

**Interfaces:**
- Produces:
  - `type Theme = 'light' | 'dark'`
  - `THEME_KEY = 'theme'`
  - `resolveTheme(stored: string | null, prefersDark: boolean): Theme`
  - `themeInitScript: string` (inline script for `<head>`)
  - `ThemeProvider`, `useTheme(): { theme: Theme; toggle(): void }`
  - CSS tokens: `--r-*`, `--s-*`, `--font-display`, `--font-body`, `--step-*`, `--accent`, `--accent-ink`, `--bg`, `--text`, `--text-muted`, `--glass-bg`, `--glass-border`, `--glass-highlight`, `--glass-shadow`, `--blob-1..3`

- [ ] **Step 1: Write the failing tests**

`tests/theme.test.ts`:
```ts
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
```

`tests/radius.test.ts`:
```ts
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL (`@/lib/theme` not found; radius tokens missing).

- [ ] **Step 3: Implement `lib/theme.ts`**

```tsx
'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
export const THEME_KEY = 'theme';

export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  if (stored === 'light' || stored === 'dark') return stored;
  return prefersDark ? 'dark' : 'light';
}

// Runs before first paint (inline in <head>) so there is no theme flash.
export const themeInitScript = `(function(){try{var s=localStorage.getItem('${THEME_KEY}');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=(s==='light'||s==='dark')?s:(d?'dark':'light')}catch(e){}})();`;

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light',
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === 'dark' ? 'dark' : 'light');
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
```

- [ ] **Step 4: Implement tokens in `app/globals.css`**

```css
:root {
  --r-sm: 12px;
  --r-md: 20px;
  --r-lg: 32px;
  --r-pill: 999px;

  --s-1: 4px;
  --s-2: 8px;
  --s-3: 12px;
  --s-4: 16px;
  --s-5: 20px;
  --s-6: 24px;
  --s-8: 32px;
  --s-10: 40px;
  --s-12: 48px;
  --s-16: 64px;

  --font-display: var(--font-fredoka), system-ui, sans-serif;
  --font-body: var(--font-nunito), system-ui, sans-serif;
  --step-0: clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
  --step-1: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --step-2: clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem);
  --step-4: clamp(2.75rem, 1.9rem + 4vw, 5rem);

  --accent: #ff8a3d;
  --accent-ink: #1b0e00;
  --page-max: 1120px;

  /* light (default) */
  --bg: #eef1f8;
  --text: #14182a;
  --text-muted: #464d6b;
  --glass-bg: rgba(255, 255, 255, 0.5);
  --glass-border: rgba(255, 255, 255, 0.75);
  --glass-highlight: rgba(255, 255, 255, 0.9);
  --glass-shadow: rgba(30, 40, 90, 0.2);
  --blob-1: #ffb27a;
  --blob-2: #8fb4ff;
  --blob-3: #c9a2ff;
  color-scheme: light;
}

:root[data-theme='dark'] {
  --bg: #0b0e1a;
  --text: #f2f4ff;
  --text-muted: #b1b7d4;
  --glass-bg: rgba(22, 27, 50, 0.45);
  --glass-border: rgba(255, 255, 255, 0.16);
  --glass-highlight: rgba(255, 255, 255, 0.3);
  --glass-shadow: rgba(0, 0, 0, 0.55);
  --blob-1: #b4531a;
  --blob-2: #2a4a9e;
  --blob-3: #6a3fb0;
  color-scheme: dark;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 96px;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: var(--step-0);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3 {
  font-family: var(--font-display);
  line-height: 1.1;
  margin: 0;
}

a {
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}

:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 5: Implement `components/ThemeToggle.tsx` and `Toggles.module.css`**

```tsx
'use client';

import { useTheme } from '@/lib/theme';
import { useI18n } from '@/lib/i18n';
import styles from './Toggles.module.css';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  return (
    <button type="button" className={styles.toggle} onClick={toggle} aria-label={t.toggles.theme}>
      <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
    </button>
  );
}
```

`components/Toggles.module.css`:
```css
.toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 var(--s-3);
  border: 1px solid var(--glass-border);
  border-radius: var(--r-pill);
  background: var(--glass-bg);
  color: var(--text);
  font: 700 0.85rem var(--font-body);
  cursor: pointer;
}

.toggle:hover {
  border-color: var(--accent);
}
```

`ThemeToggle` depends on `useI18n` from Task 3; it will compile once Task 3 lands. Do not import it into the layout yet.

- [ ] **Step 6: Wire the init script into `app/layout.tsx`**

```tsx
import './globals.css';
import { themeInitScript } from '@/lib/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Run tests and commit**

Run: `npm test`
Expected: PASS (theme + radius tests). `ThemeToggle.tsx` is not yet type-checked clean, so skip `typecheck` until Task 3.

```bash
git add -A -- . ':!assets/icon.png' ':!assets/landscape-day.png' ':!.claude'
git commit -m "Add design tokens, radius scale and theme logic

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: i18n (IT/EN) and language toggle

**Files:**
- Create: `messages/en.ts`, `messages/it.ts`, `lib/i18n.tsx`, `components/LangToggle.tsx`, `tests/i18n.test.ts`

**Interfaces:**
- Produces:
  - `type Messages = typeof en` (from `messages/en.ts`, default export `en`)
  - `it: Messages` (default export of `messages/it.ts`)
  - `type Lang = 'en' | 'it'`, `LANG_KEY = 'lang'`
  - `resolveLang(stored: string | null, navigatorLang: string): Lang`
  - `LangProvider`, `useI18n(): { lang: Lang; setLang(l: Lang): void; t: Messages }`
  - Message keys used by later tasks: `t.nav.{game,screens,team,about,commissions}`, `t.toggles.{theme,lang,menu}`, `t.hero.*`, `t.screens.*`, `t.team.*`, `t.about.*`, `t.commissions.*`, `t.footer.*`, `t.notFound.*`

- [ ] **Step 1: Write the failing test**

`tests/i18n.test.ts`:
```ts
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
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- tests/i18n.test.ts`
Expected: FAIL (modules not found).

- [ ] **Step 3: Write `messages/en.ts`**

```ts
// PLACEHOLDER: game pitch, genre, status, bios and team copy are provisional.
const en = {
  nav: {
    game: 'Porch Pirates',
    screens: 'Screenshots',
    team: 'Bramble Games',
    about: 'About',
    commissions: 'Commissions',
  },
  toggles: { theme: 'Toggle light/dark theme', lang: 'Change language', menu: 'Open menu' },
  hero: {
    badge: 'In development',
    title: 'Porch Pirates',
    pitch: 'PLACEHOLDER — one sentence that sells the game goes here.',
    wishlist: 'Wishlist',
    discord: 'Join the Discord',
    trailer: 'Trailer coming soon',
  },
  screens: {
    heading: 'Screenshots',
    sub: 'PLACEHOLDER — real screenshots arrive once the game has something to show.',
    item: 'Screenshot',
  },
  team: {
    heading: 'Bramble Games',
    body: 'PLACEHOLDER — a few lines about the team behind Porch Pirates.',
    cta: 'Visit bramble-games.com',
  },
  about: {
    heading: 'About',
    name: 'Tommaso',
    alias: 'aka Pigiazza',
    body: 'PLACEHOLDER — game developer. Started with Java on a Minecraft server, now building Porch Pirates.',
  },
  commissions: {
    heading: 'Minecraft mods & plugins, on commission',
    body: 'Custom work for your server or community, delivered and supported.',
    items: ['Mods for Fabric, Forge, NeoForge and Quilt', 'Plugins for Paper and Folia', 'Fixes, ports and updates'],
    fiverr: 'Hire me on Fiverr',
    modrinth: 'See my mods on Modrinth',
  },
  footer: { rights: 'All rights reserved.' },
  notFound: { title: 'Page not found', back: 'Back to the porch' },
};

export default en;
```

- [ ] **Step 4: Write `messages/it.ts`**

```ts
import type en from './en';

// PLACEHOLDER: testi provvisori, da sostituire.
const it: typeof en = {
  nav: {
    game: 'Porch Pirates',
    screens: 'Screenshot',
    team: 'Bramble Games',
    about: 'Chi sono',
    commissions: 'Commissioni',
  },
  toggles: { theme: 'Cambia tema chiaro/scuro', lang: 'Cambia lingua', menu: 'Apri menu' },
  hero: {
    badge: 'In sviluppo',
    title: 'Porch Pirates',
    pitch: 'PLACEHOLDER — qui va una frase che venda il gioco.',
    wishlist: 'Wishlist',
    discord: 'Entra su Discord',
    trailer: 'Trailer in arrivo',
  },
  screens: {
    heading: 'Screenshot',
    sub: 'PLACEHOLDER — gli screenshot veri arrivano quando il gioco avrà qualcosa da mostrare.',
    item: 'Screenshot',
  },
  team: {
    heading: 'Bramble Games',
    body: 'PLACEHOLDER — qualche riga sul team dietro Porch Pirates.',
    cta: 'Visita bramble-games.com',
  },
  about: {
    heading: 'Chi sono',
    name: 'Tommaso',
    alias: 'aka Pigiazza',
    body: 'PLACEHOLDER — game developer. Ho iniziato con Java su un server Minecraft, ora sto costruendo Porch Pirates.',
  },
  commissions: {
    heading: 'Mod e plugin Minecraft su commissione',
    body: 'Lavori su misura per il tuo server o la tua community, consegnati e supportati.',
    items: ['Mod per Fabric, Forge, NeoForge e Quilt', 'Plugin per Paper e Folia', 'Fix, port e aggiornamenti'],
    fiverr: 'Ingaggiami su Fiverr',
    modrinth: 'Guarda le mie mod su Modrinth',
  },
  footer: { rights: 'Tutti i diritti riservati.' },
  notFound: { title: 'Pagina non trovata', back: 'Torna al portico' },
};

export default it;
```

- [ ] **Step 5: Write `lib/i18n.tsx`**

```tsx
'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import en from '@/messages/en';
import it from '@/messages/it';
import type { Messages } from '@/messages/types';

export type Lang = 'en' | 'it';
export const LANG_KEY = 'lang';

const dictionaries: Record<Lang, Messages> = { en, it };

export function resolveLang(stored: string | null, navigatorLang: string): Lang {
  if (stored === 'en' || stored === 'it') return stored;
  return navigatorLang.toLowerCase().startsWith('it') ? 'it' : 'en';
}

const I18nContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Messages }>({
  lang: 'en',
  setLang: () => {},
  t: en,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(LANG_KEY);
    } catch {}
    setLangState(resolveLang(stored, navigator.language));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {}
  }, []);

  return <I18nContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
```

Create `messages/types.ts`:
```ts
import type en from './en';

export type Messages = typeof en;
```

- [ ] **Step 6: Write `components/LangToggle.tsx`**

```tsx
'use client';

import { useI18n } from '@/lib/i18n';
import styles from './Toggles.module.css';

export function LangToggle() {
  const { lang, setLang, t } = useI18n();
  const next = lang === 'en' ? 'it' : 'en';
  return (
    <button type="button" className={styles.toggle} onClick={() => setLang(next)} aria-label={t.toggles.lang}>
      {next.toUpperCase()}
    </button>
  );
}
```

- [ ] **Step 7: Run tests, typecheck, commit**

Run: `npm test && npm run typecheck`
Expected: PASS, no type errors.

```bash
git add -A -- . ':!assets/icon.png' ':!assets/landscape-day.png' ':!.claude'
git commit -m "Add IT/EN dictionaries, language provider and toggles

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: Glass component and Background

**Files:**
- Create: `components/Glass.tsx`, `components/Glass.module.css`, `components/GlassFilters.tsx`, `components/Background.tsx`, `components/Background.module.css`

**Interfaces:**
- Produces:
  - `<Glass as? radius? className? {...html attrs}>` where `as: 'div'|'nav'|'section'|'article'|'header'|'footer'` (default `div`), `radius: 'sm'|'md'|'lg'|'pill'` (default `lg`)
  - `<GlassFilters />` renders the SVG `<filter id="glass-refract">`
  - `<Background />` fixed full-screen blobs, `aria-hidden`

- [ ] **Step 1: Write `components/Glass.tsx`**

```tsx
import type { HTMLAttributes } from 'react';
import styles from './Glass.module.css';

type Radius = 'sm' | 'md' | 'lg' | 'pill';
type Tag = 'div' | 'nav' | 'section' | 'article' | 'header' | 'footer';

type Props = HTMLAttributes<HTMLElement> & { as?: Tag; radius?: Radius };

export function Glass({ as: Tag = 'div', radius = 'lg', className, ...rest }: Props) {
  const classes = [styles.glass, styles[radius], className].filter(Boolean).join(' ');
  return <Tag className={classes} {...rest} />;
}
```

- [ ] **Step 2: Write `components/Glass.module.css`**

```css
.glass {
  position: relative;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  -webkit-backdrop-filter: blur(22px) saturate(160%);
  backdrop-filter: blur(22px) saturate(160%);
  box-shadow:
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 rgba(255, 255, 255, 0.06),
    0 12px 40px -12px var(--glass-shadow);
}

/* specular sheen, top-left */
.glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--glass-highlight) 0%, transparent 38%);
  opacity: 0.35;
  pointer-events: none;
}

.sm {
  border-radius: var(--r-sm);
}
.md {
  border-radius: var(--r-md);
}
.lg {
  border-radius: var(--r-lg);
}
.pill {
  border-radius: var(--r-pill);
}

/* Liquid refraction: Chromium only. Safari/Firefox keep the plain glass. */
@supports (backdrop-filter: url(#glass-refract)) {
  .glass {
    backdrop-filter: url(#glass-refract) blur(18px) saturate(160%);
  }
}

@media (prefers-reduced-transparency: reduce) {
  .glass {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    background: color-mix(in srgb, var(--bg) 88%, var(--text) 12%);
  }
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass {
    background: color-mix(in srgb, var(--bg) 88%, var(--text) 12%);
  }
}
```

- [ ] **Step 3: Write `components/GlassFilters.tsx`**

```tsx
// Hidden SVG holding the refraction filter referenced by Glass.module.css.
export function GlassFilters() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <filter id="glass-refract" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
```

- [ ] **Step 4: Write `components/Background.tsx` and its CSS**

```tsx
import styles from './Background.module.css';

// PLACEHOLDER: swap the blobs for Porch Pirates key art when it exists.
export function Background() {
  return (
    <div className={styles.bg} aria-hidden="true">
      <span className={`${styles.blob} ${styles.b1}`} />
      <span className={`${styles.blob} ${styles.b2}`} />
      <span className={`${styles.blob} ${styles.b3}`} />
    </div>
  );
}
```

`components/Background.module.css`:
```css
.bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background: var(--bg);
}

.blob {
  position: absolute;
  width: 55vmax;
  height: 55vmax;
  border-radius: var(--r-pill);
  filter: blur(80px);
  opacity: 0.85;
  animation: drift 28s ease-in-out infinite alternate;
}

.b1 {
  background: var(--blob-1);
  top: -15vmax;
  left: -10vmax;
}
.b2 {
  background: var(--blob-2);
  right: -15vmax;
  top: 10vmax;
  animation-delay: -9s;
}
.b3 {
  background: var(--blob-3);
  bottom: -20vmax;
  left: 20vmax;
  animation-delay: -18s;
}

@keyframes drift {
  to {
    transform: translate3d(6vmax, 4vmax, 0) scale(1.08);
  }
}

@media (prefers-reduced-motion: reduce) {
  .blob {
    animation: none;
  }
}
```

- [ ] **Step 5: Typecheck, radius test, commit**

Run: `npm run typecheck && npm test`
Expected: PASS (radius test now also scans the new CSS: every `border-radius` uses a token).

```bash
git add -A -- . ':!assets/icon.png' ':!assets/landscape-day.png' ':!.claude'
git commit -m "Add Glass component with refraction filter and animated background

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: Root layout, providers and Nav

**Files:**
- Create: `components/Nav.tsx`, `components/Nav.module.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `ThemeProvider`, `themeInitScript` (Task 2); `LangProvider`, `useI18n` (Task 3); `Glass`, `GlassFilters`, `Background` (Task 4)
- Produces: `<Nav />` with anchors `#game #screens #team #about #commissions`; layout mounting `<GlassFilters/>`, `<Background/>`, providers, fonts (`--font-fredoka`, `--font-nunito`).

- [ ] **Step 1: Write `app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import './globals.css';
import { themeInitScript, ThemeProvider } from '@/lib/theme';
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
```

- [ ] **Step 2: Write `components/Nav.tsx`**

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Glass } from './Glass';
import { ThemeToggle } from './ThemeToggle';
import { LangToggle } from './LangToggle';
import { useI18n } from '@/lib/i18n';
import styles from './Nav.module.css';

const links = [
  ['game', '#game'],
  ['screens', '#screens'],
  ['team', '#team'],
  ['about', '#about'],
  ['commissions', '#commissions'],
] as const;

export function Nav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.wrap}>
      <Glass as="nav" radius="pill" className={styles.bar} aria-label="Main">
        <a href="#game" className={styles.logo} aria-label="Pigiazza">
          <Image src="/pigiazza.png" alt="Pigiazza" width={96} height={28} />
        </a>
        <ul className={styles.links}>
          {links.map(([key, href]) => (
            <li key={key}>
              <a href={href}>{t.nav[key]}</a>
            </li>
          ))}
        </ul>
        <div className={styles.controls}>
          <LangToggle />
          <ThemeToggle />
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t.toggles.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </Glass>
      {open && (
        <Glass id="mobile-menu" radius="lg" className={styles.mobile}>
          <ul>
            {links.map(([key, href]) => (
              <li key={key}>
                <a href={href} onClick={() => setOpen(false)}>
                  {t.nav[key]}
                </a>
              </li>
            ))}
          </ul>
        </Glass>
      )}
    </header>
  );
}
```

- [ ] **Step 3: Write `components/Nav.module.css`**

```css
.wrap {
  position: fixed;
  top: var(--s-4);
  left: 50%;
  transform: translateX(-50%);
  width: min(var(--page-max), calc(100% - var(--s-8)));
  z-index: 50;
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-4);
  padding: var(--s-2) var(--s-3) var(--s-2) var(--s-5);
}

.logo img {
  height: 28px;
  width: auto;
}

.links {
  display: flex;
  gap: var(--s-1);
  list-style: none;
  margin: 0;
  padding: 0;
}

.links a {
  display: block;
  padding: var(--s-2) var(--s-4);
  border-radius: var(--r-pill);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
}

.links a:hover {
  background: var(--glass-bg);
}

.controls {
  display: flex;
  gap: var(--s-2);
}

.burger {
  display: none;
  width: 40px;
  height: 40px;
  border: 1px solid var(--glass-border);
  border-radius: var(--r-pill);
  background: var(--glass-bg);
  color: var(--text);
  font-size: 1.1rem;
  cursor: pointer;
}

.mobile {
  margin-top: var(--s-2);
  padding: var(--s-3);
}

.mobile ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile a {
  display: block;
  padding: var(--s-3) var(--s-4);
  border-radius: var(--r-md);
  text-decoration: none;
  font-weight: 700;
}

@media (max-width: 820px) {
  .links {
    display: none;
  }
  .burger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

@media (min-width: 821px) {
  .mobile {
    display: none;
  }
}
```

- [ ] **Step 4: Mount Nav in `app/page.tsx`**

```tsx
import { Nav } from '@/components/Nav';

export default function Page() {
  return (
    <>
      <Nav />
      <main>Porch Pirates</main>
    </>
  );
}
```

- [ ] **Step 5: Verify and commit**

Run: `npm run typecheck && npm test && npm run build`
Then start the `next-dev` preview and check: nav pill renders in glass, theme toggle switches `data-theme` and persists after reload, IT/EN toggle changes labels, hamburger opens the panel below 820px, no console errors.

```bash
git add -A -- . ':!assets/icon.png' ':!assets/landscape-day.png' ':!.claude'
git commit -m "Add root layout with providers and the glass nav

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 6: Hero and Screenshots sections

**Files:**
- Create: `components/sections/Hero.tsx`, `Hero.module.css`, `Screens.tsx`, `Screens.module.css`, `Section.module.css`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Glass`, `useI18n`, `t.hero.*`, `t.screens.*`
- Produces: `<Hero />` (`id="game"`), `<Screens />` (`id="screens"`), shared `Section.module.css` classes `.section`, `.inner`, `.heading`, `.sub`, `.btn`, `.btnPrimary`, `.btnGhost` used by later tasks.

- [ ] **Step 1: Write `components/sections/Section.module.css`**

```css
.section {
  padding: var(--s-16) var(--s-4);
}

.inner {
  width: min(var(--page-max), 100%);
  margin: 0 auto;
}

.heading {
  font-size: var(--step-2);
  margin-bottom: var(--s-4);
}

.sub {
  color: var(--text-muted);
  max-width: 60ch;
  margin: 0 0 var(--s-8);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--s-3) var(--s-6);
  border-radius: var(--r-pill);
  font-weight: 800;
  text-decoration: none;
  border: 1px solid transparent;
  transition: transform 0.15s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btnPrimary {
  background: var(--accent);
  color: var(--accent-ink);
}

.btnGhost {
  background: var(--glass-bg);
  border-color: var(--glass-border);
  color: var(--text);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
}

@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
  .btn:hover {
    transform: none;
  }
}
```

- [ ] **Step 2: Write `components/sections/Hero.tsx`**

```tsx
'use client';

import { Glass } from '../Glass';
import { useI18n } from '@/lib/i18n';
import section from './Section.module.css';
import styles from './Hero.module.css';

// PLACEHOLDER: wishlist and discord URLs, trailer/key art.
const WISHLIST_URL = '#';
const DISCORD_URL = '#';

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="game" className={`${section.section} ${styles.hero}`}>
      <div className={section.inner}>
        <Glass radius="pill" className={styles.badge}>
          {t.hero.badge}
        </Glass>
        <h1 className={styles.title}>{t.hero.title}</h1>
        <p className={styles.pitch}>{t.hero.pitch}</p>
        <div className={styles.actions}>
          <a href={WISHLIST_URL} className={`${section.btn} ${section.btnPrimary}`}>
            {t.hero.wishlist}
          </a>
          <a href={DISCORD_URL} className={`${section.btn} ${section.btnGhost}`}>
            {t.hero.discord}
          </a>
        </div>
        <Glass radius="lg" className={styles.trailer}>
          <div className={styles.trailerInner} role="img" aria-label={t.hero.trailer}>
            <span className={styles.play} aria-hidden="true">
              ▶
            </span>
            <span>{t.hero.trailer}</span>
          </div>
        </Glass>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write `components/sections/Hero.module.css`**

```css
.hero {
  padding-top: calc(var(--s-16) * 2);
  text-align: center;
}

.badge {
  display: inline-block;
  padding: var(--s-2) var(--s-5);
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.title {
  font-size: var(--step-4);
  margin: var(--s-5) 0 var(--s-4);
}

.pitch {
  max-width: 52ch;
  margin: 0 auto var(--s-8);
  color: var(--text-muted);
  font-size: var(--step-1);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-3);
  justify-content: center;
  margin-bottom: var(--s-12);
}

.trailer {
  padding: var(--s-3);
}

.trailerInner {
  display: grid;
  place-items: center;
  gap: var(--s-3);
  aspect-ratio: 16 / 9;
  border-radius: calc(var(--r-lg) - var(--s-3));
  background: linear-gradient(135deg, var(--blob-1), var(--blob-2));
  color: #fff;
  font-weight: 800;
}

.play {
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.25);
  font-size: 1.5rem;
}
```

- [ ] **Step 4: Write `Screens.tsx` and `Screens.module.css`**

```tsx
'use client';

import { Glass } from '../Glass';
import { useI18n } from '@/lib/i18n';
import section from './Section.module.css';
import styles from './Screens.module.css';

// PLACEHOLDER: replace with real screenshots (public/screens/*.png).
const COUNT = 6;

export function Screens() {
  const { t } = useI18n();
  return (
    <section id="screens" className={section.section}>
      <div className={section.inner}>
        <h2 className={section.heading}>{t.screens.heading}</h2>
        <p className={section.sub}>{t.screens.sub}</p>
        <div className={styles.grid}>
          {Array.from({ length: COUNT }, (_, i) => (
            <Glass key={i} radius="md" className={styles.card}>
              <div className={styles.shot} role="img" aria-label={`${t.screens.item} ${i + 1}`}>
                {t.screens.item} {i + 1}
              </div>
            </Glass>
          ))}
        </div>
      </div>
    </section>
  );
}
```

`Screens.module.css`:
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--s-4);
}

.card {
  padding: var(--s-2);
}

.shot {
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 10;
  border-radius: calc(var(--r-md) - var(--s-2));
  background: linear-gradient(135deg, var(--blob-3), var(--blob-2));
  color: #fff;
  font-weight: 800;
}
```

- [ ] **Step 5: Compose in `app/page.tsx`**

```tsx
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/sections/Hero';
import { Screens } from '@/components/sections/Screens';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Screens />
      </main>
    </>
  );
}
```

- [ ] **Step 6: Verify and commit**

Run: `npm run typecheck && npm test && npm run build`
Preview: hero centred with badge, title, pitch, two buttons and 16:9 trailer frame; screenshot grid wraps on mobile (375px); dark and light both readable; nested radii look concentric.

```bash
git add -A -- . ':!assets/icon.png' ':!assets/landscape-day.png' ':!.claude'
git commit -m "Add hero and screenshots sections

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 7: Team, About, Commissions, Footer

**Files:**
- Create: `components/sections/Team.tsx`, `About.tsx`, `Commissions.tsx`, `Footer.tsx`, `Footer.module.css`, `Cards.module.css`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Glass`, `useI18n`, `Section.module.css` classes, `t.team.*`, `t.about.*`, `t.commissions.*`, `t.footer.*`
- Produces: `<Team />` (`#team`), `<About />` (`#about`), `<Commissions />` (`#commissions`), `<Footer />`.

- [ ] **Step 1: Write `components/sections/Cards.module.css`**

```css
.card {
  padding: var(--s-8);
}

.row {
  display: grid;
  gap: var(--s-8);
  grid-template-columns: 1fr;
  align-items: center;
}

@media (min-width: 760px) {
  .row {
    grid-template-columns: 200px 1fr;
  }
}

.portrait {
  width: 200px;
  height: 200px;
  border-radius: var(--r-lg);
  object-fit: cover;
}

.alias {
  color: var(--accent);
  font-weight: 700;
}

.list {
  margin: 0 0 var(--s-6);
  padding-left: var(--s-5);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-3);
}
```

- [ ] **Step 2: Write `Team.tsx`**

```tsx
'use client';

import { Glass } from '../Glass';
import { useI18n } from '@/lib/i18n';
import section from './Section.module.css';
import cards from './Cards.module.css';

export function Team() {
  const { t } = useI18n();
  return (
    <section id="team" className={section.section}>
      <div className={section.inner}>
        <Glass radius="lg" className={cards.card}>
          <h2 className={section.heading}>{t.team.heading}</h2>
          <p className={section.sub}>{t.team.body}</p>
          <a
            href="https://www.bramble-games.com"
            className={`${section.btn} ${section.btnPrimary}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.team.cta}
          </a>
        </Glass>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write `About.tsx`**

```tsx
'use client';

import Image from 'next/image';
import { Glass } from '../Glass';
import { useI18n } from '@/lib/i18n';
import section from './Section.module.css';
import cards from './Cards.module.css';

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className={section.section}>
      <div className={section.inner}>
        <Glass radius="lg" className={cards.card}>
          <div className={cards.row}>
            <Image
              src="/profile-icon.png"
              alt="Pigiazza's dog, the closest thing this site has to a team photo"
              width={200}
              height={200}
              className={cards.portrait}
            />
            <div>
              <h2 className={section.heading}>
                {t.about.name} <span className={cards.alias}>{t.about.alias}</span>
              </h2>
              <p className={section.sub}>{t.about.body}</p>
            </div>
          </div>
        </Glass>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write `Commissions.tsx`**

```tsx
'use client';

import { Glass } from '../Glass';
import { useI18n } from '@/lib/i18n';
import section from './Section.module.css';
import cards from './Cards.module.css';

export function Commissions() {
  const { t } = useI18n();
  return (
    <section id="commissions" className={section.section}>
      <div className={section.inner}>
        <Glass radius="lg" className={cards.card}>
          <h2 className={section.heading}>{t.commissions.heading}</h2>
          <p className={section.sub}>{t.commissions.body}</p>
          <ul className={cards.list}>
            {t.commissions.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={cards.actions}>
            <a
              href="https://www.fiverr.com/sellers/pigiazza"
              className={`${section.btn} ${section.btnPrimary}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.commissions.fiverr}
            </a>
            <a
              href="https://modrinth.com/user/Pigiazza"
              className={`${section.btn} ${section.btnGhost}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.commissions.modrinth}
            </a>
          </div>
        </Glass>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Write `Footer.tsx` and `Footer.module.css`**

```tsx
'use client';

import Image from 'next/image';
import { Glass } from '../Glass';
import { useI18n } from '@/lib/i18n';
import styles from './Footer.module.css';

const socials = [
  ['GitHub', 'https://github.com/Pigiazza', '/github.png'],
  ['Modrinth', 'https://modrinth.com/user/Pigiazza', '/modrinth.png'],
  ['Fiverr', 'https://www.fiverr.com/sellers/pigiazza', '/fiverr.jpg'],
  ['Ko-fi', 'https://ko-fi.com/pigiazza', '/kofi.png'],
] as const;

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className={styles.footer}>
      <Glass radius="pill" className={styles.bar}>
        <ul className={styles.socials}>
          {socials.map(([name, href, icon]) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className={styles.social}>
                <Image src={icon} alt="" width={24} height={24} />
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Pigiazza. {t.footer.rights}
        </p>
      </Glass>
    </footer>
  );
}
```

`Footer.module.css`:
```css
.footer {
  padding: var(--s-8) var(--s-4) var(--s-12);
}

.bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-4);
  width: min(var(--page-max), 100%);
  margin: 0 auto;
  padding: var(--s-3) var(--s-6);
}

.socials {
  display: flex;
  gap: var(--s-2);
  list-style: none;
  margin: 0;
  padding: 0;
}

.social {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--r-pill);
}

.social:hover {
  background: var(--glass-bg);
}

.social img {
  border-radius: var(--r-sm);
}

.copy {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.9rem;
}
```

- [ ] **Step 6: Compose in `app/page.tsx`**

```tsx
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/sections/Hero';
import { Screens } from '@/components/sections/Screens';
import { Team } from '@/components/sections/Team';
import { About } from '@/components/sections/About';
import { Commissions } from '@/components/sections/Commissions';
import { Footer } from '@/components/sections/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Screens />
        <Team />
        <About />
        <Commissions />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 7: Verify and commit**

Run: `npm run typecheck && npm test && npm run build`
Preview: all sections visible, anchor links from the nav scroll to the right section, external links open in a new tab, IT toggle translates every section, dark/light both pass a visual contrast check, layout at 375px has no horizontal scroll.

```bash
git add -A -- . ':!assets/icon.png' ':!assets/landscape-day.png' ':!.claude'
git commit -m "Add team, about, commissions and footer sections

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 8: SEO, 404 and Cloudflare Pages readiness

**Files:**
- Create: `app/not-found.tsx`, `app/sitemap.ts`, `app/robots.ts`
- Modify: `app/layout.tsx` (Open Graph, JSON-LD)

**Interfaces:**
- Consumes: `Glass`, `useI18n`, `t.notFound.*`, `section` button classes.
- Produces: static `out/404.html`, `out/sitemap.xml`, `out/robots.txt`.

- [ ] **Step 1: Write `app/sitemap.ts` and `app/robots.ts`**

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://pigiazza.com/', changeFrequency: 'monthly', priority: 1 }];
}
```

```ts
// app/robots.ts
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: 'https://pigiazza.com/sitemap.xml' };
}
```

- [ ] **Step 2: Write `app/not-found.tsx`**

```tsx
'use client';

import { Glass } from '@/components/Glass';
import { useI18n } from '@/lib/i18n';
import section from '@/components/sections/Section.module.css';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <main className={section.section} style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <Glass radius="lg" style={{ padding: 'var(--s-12)', textAlign: 'center' }}>
        <h1>404</h1>
        <p className={section.sub}>{t.notFound.title}</p>
        <a href="/" className={`${section.btn} ${section.btnPrimary}`}>
          {t.notFound.back}
        </a>
      </Glass>
    </main>
  );
}
```

- [ ] **Step 3: Extend metadata and add JSON-LD in `app/layout.tsx`**

Replace the `metadata` export with:
```tsx
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
```

and add inside `<head>`, after the Plausible script:
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

- [ ] **Step 4: Build and inspect the static output**

Run: `npm run typecheck && npm test && npm run build && ls out`
Expected: `out/index.html`, `out/404.html`, `out/sitemap.xml`, `out/robots.txt` exist.

- [ ] **Step 5: Commit**

```bash
git add -A -- . ':!assets/icon.png' ':!assets/landscape-day.png' ':!.claude'
git commit -m "Add SEO metadata, JSON-LD, sitemap, robots and a styled 404

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 9: Final verification

**Files:** none (verification only; fix issues in the relevant file if found).

- [ ] **Step 1: Run the full checks**

Run: `npm test && npm run typecheck && npm run build`
Expected: all pass.

- [ ] **Step 2: Visual and behaviour pass in the preview**

Check, in dark and light, at 1440px and 375px:
- Theme: no flash on reload, toggle persists, follows system when nothing is stored.
- Language: IT/EN switch every string including nav, `<html lang>` updates, choice persists.
- Glass: blur visible over the blobs; on Chromium the refraction filter is active; no console errors.
- Radius: every card/button/image uses the scale; nested elements are concentric.
- Anchors from nav land on the right section under the fixed nav.
- No horizontal scroll at 375px.
- `prefers-reduced-motion` stops the blob drift; `prefers-reduced-transparency` gives opaque surfaces.

- [ ] **Step 3: Cloudflare Pages settings (manual, in the dashboard)**

Build command `npm run build`, output directory `out`, Node 20+. Confirm `pigiazza.com` points to the project. Not automated in this plan.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A -- . ':!assets/icon.png' ':!assets/landscape-day.png' ':!.claude'
git commit -m "Fix issues found in final verification

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```
