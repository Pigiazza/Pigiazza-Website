# Pigiazza — Rebuild One-Page (Porch Pirates) — Design

Data: 2026-09-19

## Obiettivo

Rifare da zero il sito di Tommaso (aka Pigiazza) come one-page in Next.js. Il sito passa da "Minecraft dev" a **Game developer**: Porch Pirates (gioco in sviluppo col team Bramble Games, www.bramble-games.com) è il protagonista; mod e plugin Minecraft su commissione sono una sezione secondaria.

## Scelte già prese

- One-page, Next.js (App Router) + TypeScript.
- Tutto stondato con una scala di raggi unica.
- Stile Liquid Glass, con tema **dark e light**.
- Porch Pirates in primo piano.
- Contenuti nuovi, tutti **segnaposto** marcati finché non esiste materiale reale.
- Il vecchio sito (HTML statico, area privata, report-bug, `functions/`) non viene portato: resta nella cronologia git.

## Stack e hosting

- Next.js App Router, TypeScript, `output: 'export'` (statico).
- Hosting: Cloudflare Pages.
- Stile: CSS Modules + variabili CSS globali. Nessun Tailwind né librerie UI.
- Font via `next/font` (self-hosted).
- Nessun backend. Se in futuro servono form o feed Modrinth live, si aggiunge una Function separata.

## Design system

### Token
Definiti in `app/globals.css` su `:root`, ridefiniti per tema.

- **Raggi** (unica scala, nessun valore fuori scala): `--r-sm: 12px`, `--r-md: 20px`, `--r-lg: 32px`, `--r-pill: 999px`.
  - Elementi annidati: raggio interno = raggio esterno − padding, per evitare curve disallineate.
  - Bottoni, badge, nav: pill. Card: lg. Immagini e input: md. Elementi minori: sm.
- **Spaziatura**: scala a passi di 4px (`--s-1`…`--s-12`).
- **Colori**: superficie vetro, bordo vetro, highlight, testo, testo attenuato, accento. Palette segnaposto, da rivedere quando esisterà l'identità del gioco.
- **Tipografia**: un font display + un font testo, scala fluida con `clamp()`.

### Tema dark/light
- Segue `prefers-color-scheme` di default; toggle manuale in nav (sole/luna), scelta salvata in `localStorage`.
- Applicato via `data-theme` su `<html>`. Script inline in `<head>` lo imposta prima del paint per evitare il flash.
- Ogni token colore ha valore dark e light; il vetro cambia tinta e opacità per mantenere contrasto AA del testo.

### Liquid Glass
Componente `Glass` riutilizzabile, unica fonte dello stile:
- `backdrop-filter: blur() saturate()` con prefisso `-webkit-`.
- Bordo sottile semitrasparente + highlight speculare (gradient in alto-sinistra, `box-shadow inset`) + ombra morbida.
- **Rifrazione**: filtro SVG `feDisplacementMap` applicato al backdrop solo su Chromium, dietro `@supports`. Su Safari/Firefox resta il vetro CSS senza rifrazione.
- `prefers-reduced-transparency` e `prefers-reduced-motion`: superficie più opaca, niente animazione.
- Fallback senza `backdrop-filter`: superficie opaca leggermente tinta.

### Sfondo
Gradiente animato lentamente (blob sfocati) come segnaposto, dietro a tutto, necessario perché il vetro abbia qualcosa da rifrangere. Sostituibile con arte del gioco. Animazione ferma con `prefers-reduced-motion`.

## Struttura pagina

Ordine dall'alto, ancore per la navigazione:

1. **Nav**: pillola flottante in vetro, ancore alle sezioni, toggle lingua (IT/EN) e tema. Su mobile diventa un menu a scomparsa in vetro.
2. **Hero Porch Pirates** (`#game`): titolo, pitch in una frase, cornice trailer/key art segnaposto (16:9, raggio lg), CTA "Wishlist" e "Discord" (link segnaposto), badge stato ("In sviluppo").
3. **Screenshot** (`#screens`): griglia o carosello di 3–6 segnaposto, raggio md.
4. **Bramble Games** (`#team`): chi è il team, link a www.bramble-games.com.
5. **Chi sono** (`#about`): Tommaso aka Pigiazza, ruolo, breve bio segnaposto.
6. **Mod e plugin su commissione** (`#commissions`): cosa offri (mod Fabric/Forge/NeoForge/Quilt, plugin Paper/Folia), CTA Fiverr e Modrinth (link reali già noti: fiverr.com/sellers/pigiazza, modrinth.com/user/Pigiazza).
7. **Footer/Contatti**: link social (GitHub, Modrinth, Fiverr, Ko-fi), copyright.

## i18n

- IT/EN, inglese di default, rilevamento da `navigator.language` alla prima visita, scelta salvata in `localStorage`.
- Dizionari `messages/en.ts` e `messages/it.ts` tipizzati (le chiavi mancanti sono errore di compilazione). Nessuna libreria i18n.
- Sito statico: il testo viene renderizzato in inglese nell'HTML e aggiornato lato client se la lingua è italiana. Attributo `lang` su `<html>` aggiornato di conseguenza.

## Segnaposto

Ogni contenuto non reale è marcato nel codice con `// PLACEHOLDER` e contenuti evidenti nel testo. Da sostituire: pitch/genere/stato/piattaforme del gioco, link wishlist e Discord, trailer, screenshot, logo, palette del gioco, bio, testi del team.

## Struttura file

```
app/
  layout.tsx          # font, metadata, script tema, provider
  page.tsx            # compone le sezioni
  globals.css         # token, reset, sfondo
components/
  Glass.tsx           # unico componente vetro
  Nav.tsx, ThemeToggle.tsx, LangToggle.tsx
  sections/           # Hero, Screens, Team, About, Commissions, Footer
  Background.tsx
messages/en.ts, it.ts
lib/i18n.tsx, lib/theme.ts
public/               # asset riusati (icone, logo) e og image
```

Ogni sezione è un componente isolato che riceve solo i testi dal dizionario.

## SEO e accessibilità

- Metadata, Open Graph, JSON-LD (Person + VideoGame segnaposto), sitemap e robots statici.
- Analytics Plausible mantenuto come nel vecchio sito, se vuoi tenerlo (da confermare).
- HTML semantico, un solo `h1`, navigazione da tastiera, focus visibile, contrasto AA in entrambi i temi.
- Immagini con `alt`; segnaposto con `alt` descrittivo.

## Errori e test

- 404 statico coerente con lo stile.
- Verifica: `next build` senza errori, `tsc --noEmit`, lint, controllo visivo in dark/light su desktop e mobile, test che le chiavi i18n IT/EN coincidano, controllo contrasto dei token.

## Fuori scope

Area privata, report-bug, pagina progetti separata, FAQ, feed Modrinth live, form contatti, CMS.
