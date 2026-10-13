# Fiverr Commissions One-Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing Porch Pirates one-page into a Fiverr storefront for Minecraft mod, plugin, addon and porting commissions: hero, services with 12 packages, portfolio of 2 reviewed projects, about, footer. One warm "gig cover" theme with Liquid Glass, IT/EN.

**Architecture:** Same Next.js static export. Numbers and URLs live in typed data modules in `lib/` (`services.ts`, `projects.ts`, `socials.ts`, `jsonld.ts`), all copy lives in `messages/en.ts` + `messages/it.ts` keyed by the same ids, and section components only join the two. The light/dark theme system is deleted; tokens become a single theme. The background is the autumn Minecraft screenshot, blurred and darkened, with orange SVG waves in the hero and footer.

**Tech Stack:** Next.js 15 (App Router, `output: 'export'`), React 19, TypeScript strict, CSS Modules, Vitest (pure logic only), `next/font` (Fredoka + Nunito), `cwebp`/`sips` for image conversion.

Spec: `docs/superpowers/specs/2026-10-13-fiverr-commissions-site-design.md`.

## Global Constraints

- Radius scale only: `--r-sm: 12px`, `--r-md: 20px`, `--r-lg: 32px`, `--r-pill: 999px`. Every `border-radius` in `app/` and `components/` CSS is `0` or contains `var(--r-` (enforced by `tests/radius.test.ts`).
- Spacing scale `--s-1` … `--s-16` (existing tokens).
- No Tailwind, no UI library, no i18n library, no new npm dependencies.
- `output: 'export'`, hosted on Cloudflare Pages. Plausible script kept as is.
- **One theme only.** No `data-theme`, no theme toggle, no theme script, no light values.
- Languages: `en` default + `it`, `localStorage` key `lang` (existing `lib/i18n.tsx`, unchanged). IT and EN dictionaries must have identical shape (enforced by `tests/i18n.test.ts`).
- Fonts unchanged: Fredoka (display) + Nunito (body).
- Prices shown only in service packages, in USD, format `$25`. Never on project cards.
- Socials exactly: Fiverr `https://www.fiverr.com/sellers/pigiazza`, GitHub `https://github.com/Pigiazza`, YouTube `https://www.youtube.com/channel/UCt-khCdmSNPxp9ktgGB0o-A`, Ko-fi `https://ko-fi.com/pigiazza`. No Modrinth anywhere.
- Every service `gigUrl` = `https://www.fiverr.com/sellers/pigiazza` for now, marked `// PLACEHOLDER`.
- Placeholders marked `// PLACEHOLDER` in code: gig URLs, Hug & Marry image, About bio.
- Text contrast AA on glass. Decorations `aria-hidden`. `prefers-reduced-motion` stops all animation; `prefers-reduced-transparency` handled by existing `Glass`.
- Commits end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## File Structure

```
lib/
  services.ts        # NEW  ServiceId, Tier, Package, Service, services[], FIVERR_PROFILE
  projects.ts        # NEW  ProjectId, Project, projects[]
  socials.ts         # NEW  Social, socials[]
  tabs.ts            # NEW  nextTabIndex() for the services tablist
  jsonld.ts          # NEW  buildJsonLd()
  i18n.tsx           # unchanged
  theme.tsx          # DELETE
  theme-script.ts    # DELETE
messages/
  en.ts, it.ts       # REWRITE  all copy
  types.ts           # unchanged
app/
  globals.css        # MODIFY  single-theme tokens
  layout.tsx         # MODIFY  drop theme, new metadata + JSON-LD
  page.tsx           # MODIFY  Hero, Services, Portfolio, About
  not-found.tsx      # unchanged (copy changes via messages)
components/
  Background.tsx/.module.css   # REWRITE  autumn photo + floating squares
  Wave.tsx/.module.css         # NEW  orange SVG wave (top | bottom)
  Nav.tsx/.module.css          # MODIFY  new links, Fiverr button, no theme toggle
  ThemeToggle.tsx              # DELETE
  sections/
    Section.module.css         # MODIFY  block-shadow heading
    Hero.tsx/.module.css       # REWRITE
    Services.tsx/.module.css   # NEW
    PackageCard.tsx            # NEW (styles in Services.module.css)
    Portfolio.tsx/.module.css  # NEW
    ProjectCard.tsx            # NEW (styles in Portfolio.module.css)
    ReviewBlock.tsx            # NEW (styles in Portfolio.module.css)
    About.tsx                  # MODIFY  avatar alt from messages
    Footer.tsx/.module.css     # MODIFY  socials from lib, bottom wave
    Screens.*, Team.tsx, Commissions.tsx   # DELETE
public/
  bg/autumn.webp, bg/autumn.jpg     # NEW from assets/landscape-day.png
  projects/create-raw.webp          # NEW from assets/create-raw.png
  youtube.svg                       # NEW
  modrinth.png                      # DELETE
tests/
  data.test.ts       # NEW
  tabs.test.ts       # NEW
  jsonld.test.ts     # NEW
  theme.test.ts      # DELETE
```

---

### Task 1: Data layer (services, projects, socials)

**Files:**
- Create: `lib/services.ts`, `lib/projects.ts`, `lib/socials.ts`, `public/youtube.svg`
- Test: `tests/data.test.ts`

**Interfaces:**
- Produces:
  - `type ServiceId = 'mod' | 'plugin' | 'addon' | 'port'`
  - `type Tier = 'basic' | 'standard' | 'premium'`
  - `type Package = { tier: Tier; priceUsd: number; days: number; revisions: number }`
  - `type Service = { id: ServiceId; gigUrl: string; packages: [Package, Package, Package] }`
  - `const FIVERR_PROFILE: string`, `const services: Service[]`
  - `type ProjectId = 'hugMarry' | 'createRaw'`
  - `type Scores = { communication: number; quality: number; value: number }`
  - `type Project = { id: ProjectId; kind: ServiceId; image: string | null; stars: number; scores: Scores }`
  - `const projects: Project[]`
  - `type Social = { name: 'Fiverr' | 'GitHub' | 'YouTube' | 'Ko-fi'; href: string; icon: string }`, `const socials: Social[]`

- [ ] **Step 1: Write the failing test** — `tests/data.test.ts`

```ts
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
  it('lists exactly Fiverr, GitHub, YouTube, Ko-fi over https', () => {
    expect(socials.map((s) => s.name)).toEqual(['Fiverr', 'GitHub', 'YouTube', 'Ko-fi']);
    for (const s of socials) expect(s.href.startsWith('https://')).toBe(true);
  });

  it('has an icon file for every social', () => {
    for (const s of socials) expect(existsSync(publicFile(s.icon))).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/data.test.ts`
Expected: FAIL — `Failed to resolve import "@/lib/services"`.

- [ ] **Step 3: Write `lib/services.ts`**

```ts
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
```

- [ ] **Step 4: Write `lib/projects.ts`**

```ts
import type { ServiceId } from './services';

export type ProjectId = 'hugMarry' | 'createRaw';
export type Scores = { communication: number; quality: number; value: number };
export type Project = { id: ProjectId; kind: ServiceId; image: string | null; stars: number; scores: Scores };

export const projects: Project[] = [
  // PLACEHOLDER: image for Hug & Marry
  { id: 'hugMarry', kind: 'port', image: null, stars: 5, scores: { communication: 5, quality: 5, value: 5 } },
  {
    id: 'createRaw',
    kind: 'addon',
    image: '/projects/create-raw.webp',
    stars: 5,
    scores: { communication: 5, quality: 5, value: 5 },
  },
];
```

- [ ] **Step 5: Write `lib/socials.ts`**

```ts
import { FIVERR_PROFILE } from './services';

export type Social = { name: 'Fiverr' | 'GitHub' | 'YouTube' | 'Ko-fi'; href: string; icon: string };

export const socials: Social[] = [
  { name: 'Fiverr', href: FIVERR_PROFILE, icon: '/fiverr.jpg' },
  { name: 'GitHub', href: 'https://github.com/Pigiazza', icon: '/github.png' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCt-khCdmSNPxp9ktgGB0o-A', icon: '/youtube.svg' },
  { name: 'Ko-fi', href: 'https://ko-fi.com/pigiazza', icon: '/kofi.png' },
];
```

- [ ] **Step 6: Create `public/youtube.svg` and the project image**

`public/youtube.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect x="1" y="4" width="22" height="16" rx="5" fill="#FF0000"/><path d="M10 8.5v7l6-3.5z" fill="#fff"/></svg>
```

Run:

```bash
mkdir -p public/projects && cwebp -quiet -q 85 -resize 640 640 assets/create-raw.png -o public/projects/create-raw.webp && ls -la public/projects
```

Expected: `create-raw.webp` exists (tens of KB).

- [ ] **Step 7: Run test to verify it passes**

Run: `npx vitest run tests/data.test.ts`
Expected: PASS, 9 tests.

- [ ] **Step 8: Commit**

```bash
git add lib/services.ts lib/projects.ts lib/socials.ts public/youtube.svg public/projects/create-raw.webp tests/data.test.ts
git commit -m "Add typed data for services, projects and socials

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Single warm theme and autumn background

Removes the light/dark system and replaces the blob background with the blurred autumn screenshot plus floating orange squares. The old Hero still renders (it will look off until Task 3; that is expected).

**Files:**
- Delete: `lib/theme.tsx`, `lib/theme-script.ts`, `components/ThemeToggle.tsx`, `tests/theme.test.ts`
- Modify: `app/globals.css`, `app/layout.tsx`, `components/Nav.tsx`, `components/Background.tsx`, `components/Background.module.css`
- Create: `public/bg/autumn.webp`, `public/bg/autumn.jpg`

**Interfaces:**
- Produces CSS tokens used by later tasks: `--bg`, `--text`, `--text-muted`, `--accent`, `--accent-2`, `--accent-ink`, `--accent-text`, `--ember`, `--focus`, `--glass-bg`, `--glass-border`, `--glass-highlight`, `--glass-shadow`, `--glass-strong`, `--page-max`.

- [ ] **Step 1: Delete the theme system**

```bash
git rm -q lib/theme.tsx lib/theme-script.ts components/ThemeToggle.tsx tests/theme.test.ts
```

- [ ] **Step 2: Remove theme wiring from `app/layout.tsx`**

Delete these two imports:

```tsx
import { themeInitScript } from '@/lib/theme-script';
import { ThemeProvider } from '@/lib/theme';
```

Delete this line inside `<head>`:

```tsx
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
```

Replace the `<body>` contents so `ThemeProvider` is gone:

```tsx
      <body>
        <LangProvider>
          <GlassFilters />
          <Background />
          {children}
        </LangProvider>
      </body>
```

- [ ] **Step 3: Remove the theme toggle from `components/Nav.tsx`**

Delete `import { ThemeToggle } from './ThemeToggle';` and the `<ThemeToggle />` line. (Task 3 rewrites the rest of Nav.)

- [ ] **Step 4: Replace the colour block in `app/globals.css`**

Replace everything from `  --accent: #ff8a3d;` through the end of the `:root[data-theme='dark'] { … }` block with:

```css
  --page-max: 1120px;

  /* single warm theme, from the Fiverr gig covers */
  --bg: #1a0f08;
  --text: #fff7ea;
  --text-muted: #f1d9bd;
  --accent: #ff8a00;
  --accent-2: #ffb000;
  --accent-ink: #1b0e00;
  --accent-text: #ffb547;
  --ember: #8a2a0a;
  --focus: #ffd27a;
  --glass-bg: rgba(42, 22, 10, 0.5);
  --glass-strong: rgba(42, 22, 10, 0.72);
  --glass-border: rgba(255, 220, 180, 0.22);
  --glass-highlight: rgba(255, 236, 210, 0.35);
  --glass-shadow: rgba(0, 0, 0, 0.5);
  color-scheme: dark;
}
```

(The `:root {` opening, radius, spacing and font tokens above it stay as they are; this block now closes `:root`.)

- [ ] **Step 5: Convert the background image**

```bash
mkdir -p public/bg
cwebp -quiet -q 72 -resize 1600 0 assets/landscape-day.png -o public/bg/autumn.webp
sips -s format jpeg -s formatOptions 70 -Z 1600 assets/landscape-day.png --out public/bg/autumn.jpg >/dev/null
ls -la public/bg
```

Expected: both files exist, each well under 500 KB.

- [ ] **Step 6: Rewrite `components/Background.tsx`**

```tsx
import styles from './Background.module.css';

const squares = [
  { top: '14%', left: '6%', size: 28, delay: '0s' },
  { top: '24%', left: '44%', size: 14, delay: '-4s' },
  { top: '64%', left: '3%', size: 40, delay: '-8s' },
  { top: '72%', left: '56%', size: 18, delay: '-2s' },
  { top: '40%', left: '90%', size: 22, delay: '-6s' },
];

// Autumn Minecraft biome from the Fiverr gig covers, blurred, plus floating orange squares.
export function Background() {
  return (
    <div className={styles.bg} aria-hidden="true">
      <div className={styles.photo} />
      <div className={styles.shade} />
      {squares.map((s) => (
        <span
          key={`${s.top}-${s.left}`}
          className={styles.square}
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 7: Rewrite `components/Background.module.css`**

```css
.bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background: var(--bg);
}

.photo {
  position: absolute;
  inset: -24px;
  background: var(--bg) url('/bg/autumn.jpg') center / cover no-repeat;
  background-image: image-set(url('/bg/autumn.webp') type('image/webp'), url('/bg/autumn.jpg') type('image/jpeg'));
  filter: blur(8px) saturate(115%);
}

/* darken for text contrast, warmer at the bottom */
.shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(26, 15, 8, 0.45) 0%, rgba(26, 15, 8, 0.62) 60%, rgba(26, 15, 8, 0.78) 100%);
}

.square {
  position: absolute;
  border-radius: 0;
  background: linear-gradient(135deg, var(--accent-2), var(--accent));
  box-shadow: 0 6px 18px rgba(255, 138, 0, 0.35);
  opacity: 0.85;
  transform: rotate(12deg);
  animation: float 9s ease-in-out infinite alternate;
}

@keyframes float {
  to {
    transform: translate3d(0, -24px, 0) rotate(28deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .square {
    animation: none;
  }
}
```

- [ ] **Step 8: Verify**

Run: `npm run verify`
Expected: tests PASS (i18n, radius, data), typecheck clean, build succeeds. If typecheck complains about `t.toggles.theme`, it is unused now and harmless; it is removed in Task 3.

- [ ] **Step 9: Commit**

```bash
git add -A app/globals.css app/layout.tsx components/Nav.tsx components/Background.tsx components/Background.module.css public/bg
git commit -m "Switch to a single warm theme with the autumn background

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: New copy, Nav, Hero, waves, About and Footer

Rewrites both dictionaries for the whole site (including Services and Portfolio copy used in Tasks 4–5), replaces the old sections, and adds the orange waves.

**Files:**
- Rewrite: `messages/en.ts`, `messages/it.ts`, `components/sections/Hero.tsx`, `components/sections/Hero.module.css`
- Create: `components/Wave.tsx`, `components/Wave.module.css`
- Modify: `components/Nav.tsx`, `components/Nav.module.css`, `components/sections/Section.module.css`, `components/sections/About.tsx`, `components/sections/Footer.tsx`, `components/sections/Footer.module.css`, `app/page.tsx`
- Delete: `components/sections/Screens.tsx`, `components/sections/Screens.module.css`, `components/sections/Team.tsx`, `components/sections/Commissions.tsx`, `public/modrinth.png`

**Interfaces:**
- Consumes: `socials`, `FIVERR_PROFILE` (Task 1); tokens (Task 2).
- Produces:
  - `Messages` shape (via `typeof en`) with `t.services.items[ServiceId].tab`, `t.services.items[ServiceId].packages[Tier].{name,desc}`, `t.services.{heading,sub,tablist,featured,delivery,days,revisions,cta}`, `t.portfolio.items[ProjectId].{badge,title,target,body,review,imageAlt}`, `t.portfolio.{heading,sub,imagePlaceholder,stars,translatedNote,scores.{communication,quality,value}}`.
  - `Wave({ position }: { position: 'top' | 'bottom' })`.
  - Section ids: `#top` (hero), `#services`, `#portfolio`, `#about`.

- [ ] **Step 1: Rewrite `messages/en.ts`**

```ts
// PLACEHOLDER: about.body is a draft for Tommaso to correct.
const en = {
  nav: { services: 'Services', portfolio: 'Portfolio', about: 'About', fiverr: 'Fiverr' },
  toggles: { lang: 'Change language', menu: 'Open menu' },
  hero: {
    eyebrow: 'Minecraft commissions',
    titleTop: 'Custom Minecraft',
    titleAccent: 'mods, plugins & addons',
    titleBottom: 'made for you',
    sub: 'Mods, plugins, addons and version ports built to your spec, delivered through Fiverr with revisions and support after delivery.',
    signature: 'by Pigiazza',
    ctaPrimary: 'Order on Fiverr',
    ctaSecondary: 'See the packages',
  },
  services: {
    heading: 'Services & packages',
    sub: 'Pick a service, then a package. Every order goes through Fiverr, so payment and delivery are protected.',
    tablist: 'Services',
    featured: 'Recommended',
    delivery: 'Delivery',
    days: '{n} days',
    revisions: 'Revisions',
    cta: 'Choose on Fiverr',
    items: {
      mod: {
        tab: 'Mods',
        packages: {
          basic: {
            name: 'Simple Mod',
            desc: 'A simple custom mod (custom item, block, or basic command) for your Minecraft server.',
          },
          standard: {
            name: 'Custom Mod',
            desc: 'A more advanced custom mod with multiple features (custom mobs, events, commands, or GUI).',
          },
          premium: {
            name: 'Advanced Mod Package',
            desc: 'A complex custom mod or plugin with advanced features, full testing, and priority support.',
          },
        },
      },
      plugin: {
        tab: 'Plugins',
        packages: {
          basic: {
            name: 'Simple Plugin',
            desc: 'A simple custom plugin (basic command, GUI, or feature) for your Minecraft server.',
          },
          standard: {
            name: 'Custom Plugin',
            desc: 'A more advanced custom plugin with multiple features (economy, ranks, events, or GUI).',
          },
          premium: {
            name: 'Advanced Plugin Package',
            desc: 'A complex custom plugin with advanced features, full testing, and priority support.',
          },
        },
      },
      addon: {
        tab: 'Addons',
        packages: {
          basic: { name: 'Simple Addon', desc: 'A simple addon for an existing mod (one new block, item, or recipe type).' },
          standard: {
            name: 'Custom Addon',
            desc: 'A more advanced addon with multiple features (new machines, recipes, or mod compatibility).',
          },
          premium: {
            name: 'Advanced Addon Package',
            desc: 'A complex addon with advanced features, full testing, and priority support.',
          },
        },
      },
      port: {
        tab: 'Porting',
        packages: {
          basic: { name: 'Simple Port', desc: 'Port a small mod or plugin (few features) to one Minecraft version.' },
          standard: {
            name: 'Standard Port',
            desc: 'Port a medium-sized mod or plugin with multiple features to one Minecraft version.',
          },
          premium: {
            name: 'Advanced Port',
            desc: 'Port a large or complex mod or plugin, including mod loader switch and full testing.',
          },
        },
      },
    },
  },
  portfolio: {
    heading: 'Portfolio',
    sub: 'Recent Fiverr commissions, and what the clients said.',
    imagePlaceholder: 'Image coming soon',
    stars: '5 out of 5 stars',
    translatedNote: 'Translated from Italian',
    scores: {
      communication: 'Seller communication level',
      quality: 'Quality of delivery',
      value: 'Value of delivery',
    },
    items: {
      hugMarry: {
        badge: 'Port',
        title: 'Hug & Marry',
        target: 'Minecraft 1.21.1 → 1.20',
        body: 'A full port of the Hug & Marry mod from Minecraft 1.21.1 back to 1.20 for my first Fiverr client: registries, API calls and rendering adapted to the older version, then tested in game.',
        review:
          'Very quick to reply, always polite and available for extra additions and bug fixes even after delivery.',
        imageAlt: '',
      },
      createRaw: {
        badge: 'Addon',
        title: 'Create: Raw',
        target: 'Addon for the Create mod',
        body: 'An addon for Create that adds the Rawer, a block that works like a furnace in reverse and turns smelted items back into their raw form. It plugs into every Create mechanic, 100% compatible.',
        review: 'Great mod creator. Definitely recommended.',
        imageAlt: 'The Rawer block from Create: Raw',
      },
    },
  },
  about: {
    heading: 'About',
    name: 'Tommaso',
    alias: 'aka Pigiazza',
    body: 'Italian Minecraft developer. I build mods, addons and server plugins in Java and take commissions on Fiverr, from a single custom block to porting a whole mod to another version. Fast replies, clean code, and support after delivery.',
    avatarAlt: "Pigiazza's dog, the closest thing this site has to a team photo",
  },
  footer: { rights: 'All rights reserved.' },
  notFound: { title: 'Page not found', back: 'Back to the homepage' },
};

export default en;
```

- [ ] **Step 2: Rewrite `messages/it.ts`**

```ts
import type en from './en';

// PLACEHOLDER: about.body è una bozza da correggere.
const it: typeof en = {
  nav: { services: 'Servizi', portfolio: 'Portfolio', about: 'Chi sono', fiverr: 'Fiverr' },
  toggles: { lang: 'Cambia lingua', menu: 'Apri menu' },
  hero: {
    eyebrow: 'Commissioni Minecraft',
    titleTop: 'Mod, plugin e addon',
    titleAccent: 'Minecraft su misura',
    titleBottom: 'fatti per te',
    sub: 'Mod, plugin, addon e porting di versione costruiti su richiesta, consegnati tramite Fiverr con revisioni e supporto anche dopo la consegna.',
    signature: 'by Pigiazza',
    ctaPrimary: 'Ordina su Fiverr',
    ctaSecondary: 'Vedi i pacchetti',
  },
  services: {
    heading: 'Servizi e pacchetti',
    sub: 'Scegli un servizio, poi un pacchetto. Ogni ordine passa da Fiverr, quindi pagamento e consegna sono protetti.',
    tablist: 'Servizi',
    featured: 'Consigliato',
    delivery: 'Consegna',
    days: '{n} giorni',
    revisions: 'Revisioni',
    cta: 'Scegli su Fiverr',
    items: {
      mod: {
        tab: 'Mod',
        packages: {
          basic: {
            name: 'Simple Mod',
            desc: 'Una mod personalizzata semplice (item, blocco o comando base) per il tuo server Minecraft.',
          },
          standard: {
            name: 'Custom Mod',
            desc: 'Una mod più avanzata con più funzioni (mob personalizzati, eventi, comandi o GUI).',
          },
          premium: {
            name: 'Advanced Mod Package',
            desc: 'Una mod o un plugin complesso con funzioni avanzate, test completi e supporto prioritario.',
          },
        },
      },
      plugin: {
        tab: 'Plugin',
        packages: {
          basic: {
            name: 'Simple Plugin',
            desc: 'Un plugin personalizzato semplice (comando base, GUI o funzione) per il tuo server Minecraft.',
          },
          standard: {
            name: 'Custom Plugin',
            desc: 'Un plugin più avanzato con più funzioni (economia, gradi, eventi o GUI).',
          },
          premium: {
            name: 'Advanced Plugin Package',
            desc: 'Un plugin complesso con funzioni avanzate, test completi e supporto prioritario.',
          },
        },
      },
      addon: {
        tab: 'Addon',
        packages: {
          basic: {
            name: 'Simple Addon',
            desc: 'Un addon semplice per una mod esistente (un nuovo blocco, item o tipo di ricetta).',
          },
          standard: {
            name: 'Custom Addon',
            desc: 'Un addon più avanzato con più funzioni (nuove macchine, ricette o compatibilità con altre mod).',
          },
          premium: {
            name: 'Advanced Addon Package',
            desc: 'Un addon complesso con funzioni avanzate, test completi e supporto prioritario.',
          },
        },
      },
      port: {
        tab: 'Porting',
        packages: {
          basic: {
            name: 'Simple Port',
            desc: 'Porting di una mod o di un plugin piccolo (poche funzioni) a una versione di Minecraft.',
          },
          standard: {
            name: 'Standard Port',
            desc: 'Porting di una mod o di un plugin di medie dimensioni, con più funzioni, a una versione di Minecraft.',
          },
          premium: {
            name: 'Advanced Port',
            desc: 'Porting di una mod o di un plugin grande o complesso, incluso il cambio di mod loader e test completi.',
          },
        },
      },
    },
  },
  portfolio: {
    heading: 'Portfolio',
    sub: 'Commissioni recenti su Fiverr, e cosa ne hanno detto i clienti.',
    imagePlaceholder: 'Immagine in arrivo',
    stars: '5 stelle su 5',
    translatedNote: '',
    scores: {
      communication: 'Livello di comunicazione del venditore',
      quality: 'Qualità della consegna',
      value: 'Valore della consegna',
    },
    items: {
      hugMarry: {
        badge: 'Porting',
        title: 'Hug & Marry',
        target: 'Minecraft 1.21.1 → 1.20',
        body: 'Porting completo della mod Hug & Marry da Minecraft 1.21.1 alla 1.20 per il mio primo cliente Fiverr: registri, chiamate API e rendering adattati alla versione precedente, poi testati in gioco.',
        review:
          'Molto veloce nelle risposte, sempre cortese e disponibile per ulteriori aggiunte e correzioni di bug anche dopo la consegna',
        imageAlt: '',
      },
      createRaw: {
        badge: 'Addon',
        title: 'Create: Raw',
        target: 'Addon per la mod Create',
        body: 'Un addon per Create che aggiunge il Rawer, un blocco che funziona come una fornace al contrario e riporta gli oggetti cotti allo stato grezzo. Si integra con tutti i meccanismi di Create, compatibile al 100%.',
        review: 'Bravissimo creatore di mod. Lo consiglio sicuramente',
        imageAlt: 'Il blocco Rawer di Create: Raw',
      },
    },
  },
  about: {
    heading: 'Chi sono',
    name: 'Tommaso',
    alias: 'aka Pigiazza',
    body: 'Sviluppatore Minecraft italiano. Creo mod, addon e plugin per server in Java e lavoro su commissione su Fiverr, da un singolo blocco personalizzato al porting di un’intera mod su un’altra versione. Risposte rapide, codice pulito e supporto dopo la consegna.',
    avatarAlt: 'Il cane di Pigiazza, la cosa più vicina a una foto del team che questo sito abbia',
  },
  footer: { rights: 'Tutti i diritti riservati.' },
  notFound: { title: 'Pagina non trovata', back: 'Torna alla home' },
};

export default it;
```

- [ ] **Step 3: Run the dictionary shape test**

Run: `npx vitest run tests/i18n.test.ts`
Expected: PASS (identical keys in IT and EN).

- [ ] **Step 4: Create `components/Wave.tsx`**

```tsx
import styles from './Wave.module.css';

// Orange swoosh from the Fiverr gig covers. Decorative only.
export function Wave({ position }: { position: 'top' | 'bottom' }) {
  const id = `wave-${position}`;
  if (position === 'top') {
    return (
      <svg className={`${styles.wave} ${styles.top}`} viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffb000" />
            <stop offset="1" stopColor="#ff6a00" />
          </linearGradient>
        </defs>
        <path d="M600 0H170C250 70 300 170 420 225C500 262 560 300 600 400Z" fill={`url(#${id})`} opacity="0.92" />
        <path d="M600 0H300C360 50 410 125 485 165C545 197 580 235 600 285Z" fill="#ffc94d" opacity="0.5" />
      </svg>
    );
  }
  return (
    <svg className={`${styles.wave} ${styles.bottom}`} viewBox="0 0 1200 240" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff6a00" />
          <stop offset="1" stopColor="#ffb000" />
        </linearGradient>
      </defs>
      <path d="M0 240V120C200 40 420 200 640 140C860 80 1000 20 1200 60V240Z" fill={`url(#${id})`} />
      <path d="M0 240V170C240 110 460 230 700 190C920 150 1060 110 1200 130V240Z" fill="#ff6a00" opacity="0.7" />
    </svg>
  );
}
```

- [ ] **Step 5: Create `components/Wave.module.css`**

```css
.wave {
  position: absolute;
  z-index: -1;
  pointer-events: none;
}

.top {
  top: 0;
  right: 0;
  width: min(55vw, 720px);
  height: min(60vh, 520px);
}

.bottom {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 160px;
}
```

- [ ] **Step 6: Add the block-shadow heading to `components/sections/Section.module.css`**

Replace the `.heading` rule with:

```css
.heading {
  font-size: var(--step-2);
  margin-bottom: var(--s-4);
  color: var(--text);
  text-shadow:
    0 2px 0 var(--accent),
    0 4px 0 var(--ember),
    0 10px 18px rgba(0, 0, 0, 0.35);
}
```

And replace `.btnGhost`'s `background: var(--glass-bg);` with `background: var(--glass-strong);` so the ghost button keeps contrast on the photo.

- [ ] **Step 7: Rewrite `components/sections/Hero.tsx`**

```tsx
'use client';

import { Wave } from '../Wave';
import { useI18n } from '@/lib/i18n';
import { FIVERR_PROFILE } from '@/lib/services';
import section from './Section.module.css';
import styles from './Hero.module.css';

type CubeProps = { x: number; y: number; s: number; top: string; left: string; right: string };

// Isometric block, a nod to the command blocks on the gig covers.
function Cube({ x, y, s, top, left, right }: CubeProps) {
  const h = s / 2;
  return (
    <g>
      <polygon points={`${x},${y} ${x + s},${y + h} ${x},${y + s} ${x - s},${y + h}`} fill={top} />
      <polygon points={`${x - s},${y + h} ${x},${y + s} ${x},${y + 2 * s} ${x - s},${y + s + h}`} fill={left} />
      <polygon points={`${x},${y + s} ${x + s},${y + h} ${x + s},${y + s + h} ${x},${y + 2 * s}`} fill={right} />
    </g>
  );
}

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className={`${section.section} ${styles.hero}`}>
      <Wave position="top" />
      <div className={`${section.inner} ${styles.grid}`}>
        <div>
          <p className={styles.eyebrow}>{t.hero.eyebrow}</p>
          <h1 className={styles.title}>
            <span>{t.hero.titleTop}</span>
            <span className={styles.accent}>{t.hero.titleAccent}</span>
            <span>{t.hero.titleBottom}</span>
          </h1>
          <p className={styles.sub}>{t.hero.sub}</p>
          <div className={styles.actions}>
            <a
              href={FIVERR_PROFILE}
              className={`${section.btn} ${section.btnPrimary}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.hero.ctaPrimary}
            </a>
            <a href="#services" className={`${section.btn} ${section.btnGhost}`}>
              {t.hero.ctaSecondary}
            </a>
          </div>
          <p className={styles.signature}>{t.hero.signature}</p>
        </div>
        <svg className={styles.blocks} viewBox="0 0 320 300" aria-hidden="true" focusable="false">
          <Cube x={200} y={20} s={80} top="#9b7bff" left="#6f4fd8" right="#5236b0" />
          <Cube x={250} y={130} s={64} top="#a8e6c8" left="#6cc49c" right="#4a9f7a" />
          <Cube x={130} y={110} s={80} top="#ffb36b" left="#e8853a" right="#c2621f" />
        </svg>
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Rewrite `components/sections/Hero.module.css`**

```css
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-top: calc(var(--s-16) * 2);
  min-height: 88vh;
  display: grid;
  align-items: center;
}

.grid {
  display: grid;
  gap: var(--s-8);
  align-items: center;
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: 1.3fr 1fr;
  }
}

.eyebrow {
  margin: 0 0 var(--s-3);
  color: var(--accent-text);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.title {
  display: grid;
  gap: var(--s-1);
  font-size: var(--step-4);
  font-weight: 700;
  color: var(--text);
  text-shadow:
    0 3px 0 #2a3a66,
    0 6px 0 #1a2448,
    0 14px 24px rgba(0, 0, 0, 0.4);
}

.accent {
  color: var(--accent-2);
  text-shadow:
    0 3px 0 var(--accent),
    0 6px 0 var(--ember),
    0 14px 24px rgba(0, 0, 0, 0.4);
}

.sub {
  max-width: 52ch;
  margin: var(--s-6) 0 var(--s-8);
  color: var(--text-muted);
  font-size: var(--step-1);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-3);
}

.signature {
  margin: var(--s-8) 0 0;
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text);
  text-shadow: 0 2px 0 #1a2448;
}

.blocks {
  width: min(100%, 420px);
  justify-self: center;
  filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.45));
  animation: bob 6s ease-in-out infinite alternate;
}

@keyframes bob {
  to {
    transform: translateY(-14px);
  }
}

@media (max-width: 899px) {
  .blocks {
    width: min(70%, 300px);
    order: -1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .blocks {
    animation: none;
  }
}
```

- [ ] **Step 9: Update `components/Nav.tsx`**

Replace the `links` array, the logo `href`, and add the Fiverr button. Full file:

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Glass } from './Glass';
import { LangToggle } from './LangToggle';
import { useI18n } from '@/lib/i18n';
import { FIVERR_PROFILE } from '@/lib/services';
import styles from './Nav.module.css';

const links = [
  ['services', '#services'],
  ['portfolio', '#portfolio'],
  ['about', '#about'],
] as const;

export function Nav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.wrap}>
      <Glass as="nav" radius="pill" className={styles.bar} aria-label="Main">
        <a href="#top" className={styles.logo} aria-label="Pigiazza">
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
          <a href={FIVERR_PROFILE} className={styles.cta} target="_blank" rel="noopener noreferrer">
            {t.nav.fiverr}
          </a>
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

Append to `components/Nav.module.css`:

```css
.cta {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 var(--s-5);
  border-radius: var(--r-pill);
  background: var(--accent);
  color: var(--accent-ink);
  font-weight: 800;
  text-decoration: none;
}

.cta:hover {
  background: var(--accent-2);
}
```

- [ ] **Step 10: Update `components/sections/About.tsx`**

Replace the hard-coded `alt="Pigiazza's dog, …"` with `alt={t.about.avatarAlt}`. Nothing else changes.

- [ ] **Step 11: Rewrite `components/sections/Footer.tsx`**

```tsx
'use client';

import Image from 'next/image';
import { Glass } from '../Glass';
import { Wave } from '../Wave';
import { useI18n } from '@/lib/i18n';
import { socials } from '@/lib/socials';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className={styles.footer}>
      <Wave position="bottom" />
      <Glass radius="pill" className={styles.bar}>
        <ul className={styles.socials}>
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className={styles.social}>
                <Image src={s.icon} alt="" width={24} height={24} />
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.copy} suppressHydrationWarning>
          © {new Date().getFullYear()} Pigiazza. {t.footer.rights}
        </p>
      </Glass>
    </footer>
  );
}
```

In `components/sections/Footer.module.css` replace the `.footer` rule with:

```css
.footer {
  position: relative;
  isolation: isolate;
  padding: var(--s-16) var(--s-4) var(--s-12);
}
```

and change `.social:hover { background: var(--glass-bg); }` to `background: var(--glass-strong);`.

- [ ] **Step 12: Delete old sections and assets, update `app/page.tsx`**

```bash
git rm -q components/sections/Screens.tsx components/sections/Screens.module.css components/sections/Team.tsx components/sections/Commissions.tsx public/modrinth.png
```

`app/page.tsx` (Services and Portfolio are added in Tasks 4 and 5):

```tsx
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Footer } from '@/components/sections/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 13: Verify**

Run: `npm run verify`
Expected: all tests PASS, typecheck clean, build succeeds. `grep -rn "modrinth\|Porch\|Bramble\|data-theme" app components lib messages` returns nothing (except `layout.tsx` metadata/JSON-LD, fixed in Task 6).

- [ ] **Step 14: Commit**

```bash
git add -A messages components app/page.tsx public
git commit -m "Rewrite copy, nav, hero, about and footer for Fiverr commissions

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Services section with tabbed packages

**Files:**
- Create: `lib/tabs.ts`, `components/sections/Services.tsx`, `components/sections/PackageCard.tsx`, `components/sections/Services.module.css`
- Modify: `app/page.tsx`
- Test: `tests/tabs.test.ts`

**Interfaces:**
- Consumes: `services`, `Service`, `Package`, `ServiceId` (Task 1); `t.services.*` (Task 3).
- Produces: `nextTabIndex(current: number, key: string, length: number): number | null`; `<Services />` rendering `section#services`.

- [ ] **Step 1: Write the failing test** — `tests/tabs.test.ts`

```ts
import { describe, expect, it } from 'vitest';
import { nextTabIndex } from '@/lib/tabs';

describe('nextTabIndex', () => {
  it('moves right and wraps to the first tab', () => {
    expect(nextTabIndex(0, 'ArrowRight', 4)).toBe(1);
    expect(nextTabIndex(3, 'ArrowRight', 4)).toBe(0);
  });
  it('moves left and wraps to the last tab', () => {
    expect(nextTabIndex(2, 'ArrowLeft', 4)).toBe(1);
    expect(nextTabIndex(0, 'ArrowLeft', 4)).toBe(3);
  });
  it('jumps with Home and End', () => {
    expect(nextTabIndex(2, 'Home', 4)).toBe(0);
    expect(nextTabIndex(1, 'End', 4)).toBe(3);
  });
  it('ignores other keys', () => {
    expect(nextTabIndex(1, 'Enter', 4)).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/tabs.test.ts`
Expected: FAIL — cannot resolve `@/lib/tabs`.

- [ ] **Step 3: Write `lib/tabs.ts`**

```ts
// Roving-focus index for a horizontal tablist (WAI-ARIA tabs pattern).
export function nextTabIndex(current: number, key: string, length: number): number | null {
  switch (key) {
    case 'ArrowRight':
      return (current + 1) % length;
    case 'ArrowLeft':
      return (current - 1 + length) % length;
    case 'Home':
      return 0;
    case 'End':
      return length - 1;
    default:
      return null;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/tabs.test.ts`
Expected: PASS, 4 tests.

- [ ] **Step 5: Write `components/sections/PackageCard.tsx`**

```tsx
import { Glass } from '../Glass';
import type { Package } from '@/lib/services';
import section from './Section.module.css';
import styles from './Services.module.css';

type Labels = { delivery: string; days: string; revisions: string; cta: string; featured: string };

type Props = { pkg: Package; tierLabel: string; name: string; desc: string; gigUrl: string; featured: boolean; labels: Labels };

export function PackageCard({ pkg, tierLabel, name, desc, gigUrl, featured, labels }: Props) {
  return (
    <Glass as="article" radius="lg" className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <div className={styles.cardHead}>
        <span className={styles.tier}>{tierLabel}</span>
        {featured && <span className={styles.badge}>{labels.featured}</span>}
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.price}>${pkg.priceUsd}</p>
      <p className={styles.desc}>{desc}</p>
      <dl className={styles.facts}>
        <div>
          <dt>{labels.delivery}</dt>
          <dd>{labels.days.replace('{n}', String(pkg.days))}</dd>
        </div>
        <div>
          <dt>{labels.revisions}</dt>
          <dd>{pkg.revisions}</dd>
        </div>
      </dl>
      <a
        href={gigUrl}
        className={`${section.btn} ${featured ? section.btnPrimary : section.btnGhost} ${styles.cardCta}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {labels.cta}
      </a>
    </Glass>
  );
}
```

The tier label ("Basic" / "Standard" / "Premium") comes from a fixed map in `Services.tsx` because Fiverr uses those English words in both languages.

- [ ] **Step 6: Write `components/sections/Services.tsx`**

```tsx
'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { Glass } from '../Glass';
import { PackageCard } from './PackageCard';
import { useI18n } from '@/lib/i18n';
import { services, type Tier } from '@/lib/services';
import { nextTabIndex } from '@/lib/tabs';
import section from './Section.module.css';
import styles from './Services.module.css';

const TIER_LABEL: Record<Tier, string> = { basic: 'Basic', standard: 'Standard', premium: 'Premium' };

export function Services() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const service = services[index];
  const copy = t.services.items[service.id];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const next = nextTabIndex(index, e.key, services.length);
    if (next === null) return;
    e.preventDefault();
    setIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="services" className={section.section}>
      <div className={section.inner}>
        <h2 className={section.heading}>{t.services.heading}</h2>
        <p className={section.sub}>{t.services.sub}</p>

        <Glass radius="pill" className={styles.tabs}>
          <div role="tablist" aria-label={t.services.tablist} onKeyDown={onKeyDown} className={styles.tablist}>
            {services.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={i === index}
                aria-controls={`panel-${s.id}`}
                tabIndex={i === index ? 0 : -1}
                className={styles.tab}
                onClick={() => setIndex(i)}
              >
                {t.services.items[s.id].tab}
              </button>
            ))}
          </div>
        </Glass>

        <div role="tabpanel" id={`panel-${service.id}`} aria-labelledby={`tab-${service.id}`} className={styles.grid}>
          {service.packages.map((pkg) => (
            <PackageCard
              key={`${service.id}-${pkg.tier}`}
              pkg={pkg}
              tierLabel={TIER_LABEL[pkg.tier]}
              name={copy.packages[pkg.tier].name}
              desc={copy.packages[pkg.tier].desc}
              gigUrl={service.gigUrl}
              featured={pkg.tier === 'standard'}
              labels={t.services}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Write `components/sections/Services.module.css`**

```css
.tabs {
  display: inline-block;
  max-width: 100%;
  padding: var(--s-1);
  margin-bottom: var(--s-8);
}

.tablist {
  display: flex;
  gap: var(--s-1);
  overflow-x: auto;
  scrollbar-width: none;
}

.tab {
  padding: var(--s-2) var(--s-5);
  border: 0;
  border-radius: var(--r-pill);
  background: transparent;
  color: var(--text);
  font: 800 0.95rem var(--font-body);
  white-space: nowrap;
  cursor: pointer;
}

.tab:hover {
  background: var(--glass-strong);
}

.tab[aria-selected='true'] {
  background: var(--accent);
  color: var(--accent-ink);
}

.grid {
  display: grid;
  gap: var(--s-6);
  align-items: stretch;
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  padding: var(--s-8);
  background: var(--glass-strong);
}

.featured {
  border-color: var(--accent);
  box-shadow:
    inset 0 1px 0 var(--glass-highlight),
    0 0 0 2px var(--accent),
    0 18px 50px -14px rgba(255, 138, 0, 0.55);
}

.cardHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-2);
}

.tier {
  color: var(--accent-text);
  font-weight: 800;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.badge {
  padding: var(--s-1) var(--s-3);
  border-radius: var(--r-pill);
  background: var(--accent);
  color: var(--accent-ink);
  font-weight: 800;
  font-size: 0.75rem;
}

.name {
  font-size: var(--step-1);
}

.price {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--step-2);
  color: var(--accent-2);
  text-shadow: 0 2px 0 var(--ember);
}

.desc {
  margin: 0;
  color: var(--text-muted);
  flex: 1;
}

.facts {
  display: grid;
  gap: var(--s-2);
  margin: 0;
  padding: var(--s-3) 0;
  border-top: 1px solid var(--glass-border);
}

.facts div {
  display: flex;
  justify-content: space-between;
}

.facts dt {
  color: var(--text-muted);
}

.facts dd {
  margin: 0;
  font-weight: 800;
}

.cardCta {
  width: 100%;
}
```

- [ ] **Step 8: Add Services to `app/page.tsx`**

Add `import { Services } from '@/components/sections/Services';` and render `<Services />` right after `<Hero />`.

- [ ] **Step 9: Verify**

Run: `npm run verify`
Expected: all tests PASS (including `radius.test.ts`), typecheck clean, build succeeds.

- [ ] **Step 10: Commit**

```bash
git add lib/tabs.ts tests/tabs.test.ts components/sections/Services.tsx components/sections/PackageCard.tsx components/sections/Services.module.css app/page.tsx
git commit -m "Add services section with tabbed Fiverr packages

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Portfolio section with reviews

**Files:**
- Create: `components/sections/Portfolio.tsx`, `components/sections/ProjectCard.tsx`, `components/sections/ReviewBlock.tsx`, `components/sections/Portfolio.module.css`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `projects`, `Project`, `Scores` (Task 1); `t.portfolio.*` (Task 3).
- Produces: `<Portfolio />` rendering `section#portfolio`; `ReviewBlock({ stars, scores, quote })`.

- [ ] **Step 1: Write `components/sections/ReviewBlock.tsx`**

```tsx
'use client';

import type { Scores } from '@/lib/projects';
import { useI18n } from '@/lib/i18n';
import styles from './Portfolio.module.css';

type Props = { stars: number; scores: Scores; quote: string };

export function ReviewBlock({ stars, scores, quote }: Props) {
  const { t } = useI18n();
  const rows = [
    [t.portfolio.scores.communication, scores.communication],
    [t.portfolio.scores.quality, scores.quality],
    [t.portfolio.scores.value, scores.value],
  ] as const;

  return (
    <figure className={styles.review}>
      <p className={styles.stars} role="img" aria-label={t.portfolio.stars}>
        {'★'.repeat(stars)}
      </p>
      <blockquote className={styles.quote}>
        <p>“{quote}”</p>
      </blockquote>
      {t.portfolio.translatedNote && <figcaption className={styles.note}>{t.portfolio.translatedNote}</figcaption>}
      <dl className={styles.scores}>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>
              <span aria-hidden="true">★ </span>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
```

- [ ] **Step 2: Write `components/sections/ProjectCard.tsx`**

```tsx
'use client';

import Image from 'next/image';
import { Glass } from '../Glass';
import { ReviewBlock } from './ReviewBlock';
import { useI18n } from '@/lib/i18n';
import type { Project } from '@/lib/projects';
import styles from './Portfolio.module.css';

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n();
  const copy = t.portfolio.items[project.id];

  return (
    <Glass as="article" radius="lg" className={styles.card}>
      {project.image ? (
        <Image src={project.image} alt={copy.imageAlt} width={640} height={640} className={styles.image} />
      ) : (
        <div className={`${styles.image} ${styles.placeholder}`}>{t.portfolio.imagePlaceholder}</div>
      )}
      <div className={styles.meta}>
        <span className={styles.badge}>{copy.badge}</span>
        <span className={styles.target}>{copy.target}</span>
      </div>
      <h3 className={styles.title}>{copy.title}</h3>
      <p className={styles.body}>{copy.body}</p>
      <ReviewBlock stars={project.stars} scores={project.scores} quote={copy.review} />
    </Glass>
  );
}
```

- [ ] **Step 3: Write `components/sections/Portfolio.tsx`**

```tsx
'use client';

import { ProjectCard } from './ProjectCard';
import { useI18n } from '@/lib/i18n';
import { projects } from '@/lib/projects';
import section from './Section.module.css';
import styles from './Portfolio.module.css';

export function Portfolio() {
  const { t } = useI18n();
  return (
    <section id="portfolio" className={section.section}>
      <div className={section.inner}>
        <h2 className={section.heading}>{t.portfolio.heading}</h2>
        <p className={section.sub}>{t.portfolio.sub}</p>
        <div className={styles.grid}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write `components/sections/Portfolio.module.css`**

```css
.grid {
  display: grid;
  gap: var(--s-6);
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card {
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  padding: var(--s-6);
  background: var(--glass-strong);
}

.image {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: contain;
  border-radius: calc(var(--r-lg) - var(--s-6));
  background: rgba(0, 0, 0, 0.25);
}

.placeholder {
  display: grid;
  place-items: center;
  color: var(--text-muted);
  font-weight: 800;
  border: 2px dashed var(--glass-border);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--s-3);
  margin-top: var(--s-2);
}

.badge {
  padding: var(--s-1) var(--s-3);
  border-radius: var(--r-pill);
  background: var(--accent);
  color: var(--accent-ink);
  font-weight: 800;
  font-size: 0.8rem;
}

.target {
  color: var(--accent-text);
  font-weight: 700;
  font-size: 0.9rem;
}

.title {
  font-size: var(--step-1);
}

.body {
  margin: 0;
  color: var(--text-muted);
}

.review {
  margin: var(--s-3) 0 0;
  padding: var(--s-5);
  border-radius: calc(var(--r-lg) - var(--s-6));
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid var(--glass-border);
}

.stars {
  margin: 0;
  color: var(--accent-2);
  font-size: 1.25rem;
  letter-spacing: 0.15em;
}

.quote {
  margin: var(--s-2) 0 0;
  font-style: italic;
}

.quote p {
  margin: 0;
}

.note {
  margin-top: var(--s-1);
  color: var(--text-muted);
  font-size: 0.8rem;
}

.scores {
  display: grid;
  gap: var(--s-2);
  margin: var(--s-4) 0 0;
  padding-top: var(--s-3);
  border-top: 1px solid var(--glass-border);
}

.scores div {
  display: flex;
  justify-content: space-between;
  gap: var(--s-3);
}

.scores dt {
  color: var(--text-muted);
}

.scores dd {
  margin: 0;
  font-weight: 800;
  color: var(--accent-2);
  white-space: nowrap;
}
```

- [ ] **Step 5: Add Portfolio to `app/page.tsx`**

Add `import { Portfolio } from '@/components/sections/Portfolio';` and render `<Portfolio />` right after `<Services />`. Final order: `Hero, Services, Portfolio, About`.

- [ ] **Step 6: Verify**

Run: `npm run verify`
Expected: all tests PASS, typecheck clean, build succeeds.

- [ ] **Step 7: Commit**

```bash
git add components/sections/Portfolio.tsx components/sections/ProjectCard.tsx components/sections/ReviewBlock.tsx components/sections/Portfolio.module.css app/page.tsx
git commit -m "Add portfolio section with Fiverr reviews and scores

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: SEO metadata, JSON-LD and final browser check

**Files:**
- Create: `lib/jsonld.ts`
- Modify: `app/layout.tsx`
- Test: `tests/jsonld.test.ts`

**Interfaces:**
- Consumes: `services`, `socials` (Task 1); `en.services.items[id].tab` (Task 3).
- Produces: `buildJsonLd(): Record<string, unknown>`.

- [ ] **Step 1: Write the failing test** — `tests/jsonld.test.ts`

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/jsonld.test.ts`
Expected: FAIL — cannot resolve `@/lib/jsonld`.

- [ ] **Step 3: Write `lib/jsonld.ts`**

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/jsonld.test.ts`
Expected: PASS, 3 tests.

- [ ] **Step 5: Update `app/layout.tsx`**

Add `import { buildJsonLd } from '@/lib/jsonld';`, delete the whole `const jsonLd = { … };` block, and change the JSON-LD script to:

```tsx
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }} />
```

Replace the `metadata` export with:

```tsx
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
```

- [ ] **Step 6: Full verification**

Run: `npm run verify`
Expected: all test files PASS (`data`, `tabs`, `jsonld`, `i18n`, `radius`), typecheck clean, static build in `out/`.

Run: `grep -rniE "modrinth|porch|bramble|data-theme|ThemeToggle" app components lib messages public`
Expected: no output.

- [ ] **Step 7: Browser check**

Start the preview with `preview_start { name: "next-dev" }`, then:
1. `read_console_messages` with `onlyErrors: true` → no errors.
2. Screenshot desktop at the top: hero with wave top-right, blocks on the right, nav with Fiverr button.
3. Click each service tab (Mods, Plugins, Addons, Porting) and confirm prices `$25/$40/$60`, `$20/$35/$50`, `$20/$35/$50`, `$15/$25/$35`. Focus a tab and press ArrowRight: the next tab gets focus and selection.
4. Portfolio: both cards show ★★★★★, the quote and three scores of 5; Create: Raw shows the Rawer image, Hug & Marry shows "Image coming soon"; no prices on project cards.
5. Toggle language to IT: headings switch, reviews show the original Italian with no "Translated" note.
6. `resize_window { preset: "mobile" }`, reload, screenshot: no horizontal scroll (`document.documentElement.scrollWidth <= innerWidth` via `javascript_tool`), burger menu opens. Then `resize_window { preset: "desktop" }`.
7. Footer shows exactly Fiverr, GitHub, YouTube, Ko-fi with the bottom wave.

Fix anything found, re-run `npm run verify`.

- [ ] **Step 8: Commit**

```bash
git add lib/jsonld.ts tests/jsonld.test.ts app/layout.tsx
git commit -m "Update SEO metadata and JSON-LD for the commissions site

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```
