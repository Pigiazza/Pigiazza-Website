# Pigiazza — Redesign One-Page "Vetrina Fiverr" — Design

Data: 2026-10-13
Sostituisce: `2026-09-19-porch-pirates-site-design.md` (Porch Pirates esce dal sito).

## Obiettivo

Il sito di Tommaso (aka Pigiazza) diventa la vetrina del lavoro su commissione via Fiverr: **mod, plugin, addon e porting di versione per Minecraft**. Deve far capire in pochi secondi cosa offre, quanto costa e che i clienti sono soddisfatti, e portare il visitatore su Fiverr.

## Scelte prese

- One-page, ordine "percorso cliente": Hero → Servizi → Portfolio → Chi sono → Footer.
- Stile ispirato alle copertine delle gig Fiverr (non identico) + Liquid Glass.
- **Un solo tema** (niente chiaro/scuro). Lingue **IT/EN** mantenute.
- Font attuali mantenuti: Fredoka (titoli) + Nunito (testo).
- Prezzi dei singoli progetti **non** mostrati; i prezzi compaiono solo nei pacchetti dei servizi.
- Social: Fiverr, GitHub, YouTube, Ko-fi. Modrinth rimosso.

## Stack (invariato)

Next.js App Router + TypeScript, `output: 'export'`, Cloudflare Pages, CSS Modules + variabili globali, nessuna libreria UI, `next/font`. Si riusano `Glass`, `GlassFilters`, i18n, SEO, 404, `_redirects`.

## Stile visivo

- **Sfondo**: `assets/landscape-day.png` (bioma autunnale Minecraft, 1920×1080) a tutta pagina, fisso, sfocato e leggermente scurito per il contrasto. Spostato in `public/bg/` come WebP + JPEG di fallback (`image-set`).
- **Onde arancioni**: SVG in gradiente arancio come nelle copertine — in alto a destra nell'hero e in basso nel footer. Restano fedeli alle copertine.
- **Quadratini arancioni** fluttuanti (pochi, lenti), solo decorativi (`aria-hidden`). Fermi con `prefers-reduced-motion`.
- **Liquid Glass** su nav, card pacchetti, card progetti, bio: vetro caldo ambrato scuro, bordo chiaro semitrasparente, riflesso speculare in alto. Rifrazione SVG solo su Chromium come oggi.
- **Palette** (token su `:root`): accento arancio delle copertine (≈ `#FF8A00` → `#FFB000` in gradiente), rosso scuro per ombre/estrusioni (≈ `#8A2A0A`), testo crema/bianco, testo attenuato crema al 75%. Contrasto testo/vetro AA verificato.
- **Titoli**: Fredoka 700 con ombra "a blocchi" in CSS (più `text-shadow` sfalsati arancio/rosso scuro) che richiama l'estrusione Minecraft senza copiarla.
- Raggi e spaziature: scala esistente (`--r-sm/md/lg/pill`, `--s-*`).
- Rimossi: toggle tema, logica `data-theme`, valori light dei token, script anti-flash del tema.

## Struttura pagina

1. **Nav**: pillola di vetro flottante. Ancore: Servizi (`#services`), Portfolio (`#portfolio`), Chi sono (`#about`). Toggle IT/EN, pulsante "Fiverr" (accento). Su mobile menu a scomparsa in vetro.
2. **Hero**: titolo "Mod, plugin, addon e porting Minecraft su commissione", sottotitolo di una riga, firma "by Pigiazza". CTA primaria "Ordina su Fiverr" (profilo), secondaria "Vedi i pacchetti" (`#services`). A destra gruppo di tre blocchi stilizzati in CSS/SVG (viola, arancio, verde) che richiama i command block delle copertine.
3. **Servizi** (`#services`): selettore a pillola Mod · Plugin · Addon · Porting (tablist accessibile, frecce da tastiera). Per il servizio selezionato, 3 card Basic / Standard / Premium con nome pacchetto, descrizione, giorni di consegna, revisioni, prezzo in $, pulsante "Scegli su Fiverr". Standard evidenziata ("Più scelto"). Su mobile le card vanno in colonna.
4. **Portfolio** (`#portfolio`): 2 card progetto. Ogni card: immagine (o segnaposto), badge tipo, titolo, versioni/target, descrizione, poi blocco recensione statico: ★★★★★, citazione del cliente, e i tre punteggi in stile Fiverr (Livello di comunicazione del venditore 5 · Qualità della consegna 5 · Valore della consegna 5).
5. **Chi sono** (`#about`): avatar `public/profile-icon.png` (quello attuale) + bio breve. Bio scritta come segnaposto da correggere.
6. **Footer**: icone/link Fiverr, GitHub, YouTube, Ko-fi; copyright "© 2026 Pigiazza".

## Contenuti

### Pacchetti (prezzi in USD)

| Servizio | Basic | Standard | Premium |
|---|---|---|---|
| Mod | Simple Mod — $25, 3 gg, 1 rev. — "A simple custom mod (custom item, block, or basic command) for your Minecraft server." | Custom Mod — $40, 5 gg, 2 rev. — "A more advanced custom mod with multiple features (custom mobs, events, commands, or GUI)." | Advanced Mod Package — $60, 10 gg, 3 rev. — "A complex custom mod or plugin with advanced features, full testing, and priority support." |
| Plugin | Simple Plugin — $20, 3 gg, 1 rev. — "A simple custom plugin (basic command, GUI, or feature) for your Minecraft server." | Custom Plugin — $35, 5 gg, 2 rev. — "A more advanced custom plugin with multiple features (economy, ranks, events, or GUI)." | Advanced Plugin Package — $50, 10 gg, 3 rev. — "A complex custom plugin with advanced features, full testing, and priority support." |
| Addon | Simple Addon — $20, 3 gg, 1 rev. — "A simple addon for an existing mod (one new block, item, or recipe type)." | Custom Addon — $35, 5 gg, 2 rev. — "A more advanced addon with multiple features (new machines, recipes, or mod compatibility)." | Advanced Addon Package — $50, 10 gg, 3 rev. — "A complex addon with advanced features, full testing, and priority support." |
| Porting | Simple Port — $15, 2 gg, 1 rev. — "Port a small mod or plugin (few features) to one Minecraft version." | Standard Port — $25, 5 gg, 2 rev. — "Port a medium-sized mod or plugin with multiple features to one Minecraft version." | Advanced Port — $35, 7 gg, 3 rev. — "Port a large or complex mod or plugin, including mod loader switch and full testing." |

Le descrizioni sono in inglese da Fiverr; la versione IT è una traduzione. La riga Fiverr "Number of plugins" non viene mostrata.

Link: ogni servizio ha un campo `gigUrl`. **Per ora tutti puntano a `https://www.fiverr.com/sellers/pigiazza`** finché non arrivano gli URL delle 4 gig (marcati `// PLACEHOLDER`).

### Progetti

1. **Hug & Marry** — Porting. Porting completo della mod dalla 1.21.1 alla 1.20 per il primo cliente Fiverr: adattamento di API, registri, rendering e dati alle differenze tra le due versioni, con test in gioco. Immagine: segnaposto.
   Recensione 5★: "Molto veloce nelle risposte, sempre cortese e disponibile per ulteriori aggiunte e correzioni di bug anche dopo la consegna". Punteggi 5 / 5 / 5.
2. **Create: Raw** — Addon per la mod Create. Nuovo blocco **Rawer**, che fa il lavoro opposto della fornace (riporta i materiali cotti allo stato grezzo), compatibile al 100% con i meccanismi di Create. Immagine: `assets/create-raw.png` (icona del blocco su cerchio blu, 1000×1000).
   Recensione 5★: "Bravissimo creatore di mod. Lo consiglio sicuramente". Punteggi 5 / 5 / 5.

Le recensioni restano originali in IT; in EN si mostra una traduzione con la nota "translated from Italian".

### Social

- Fiverr: `https://www.fiverr.com/sellers/pigiazza`
- GitHub: `https://github.com/Pigiazza`
- YouTube: `https://www.youtube.com/channel/UCt-khCdmSNPxp9ktgGB0o-A`
- Ko-fi: `https://ko-fi.com/pigiazza`

## Struttura file

```
lib/
  services.ts     # 4 servizi × 3 pacchetti: id, prezzo, giorni, revisioni, gigUrl
  projects.ts     # 2 progetti: id, tipo, immagine, punteggi recensione
  socials.ts      # 4 link social
messages/
  en.ts, it.ts, types.ts   # tutti i testi: nav, hero, nomi/descrizioni pacchetti, progetti, recensioni, bio
components/
  Background.tsx  # foto autunnale + onde SVG + quadratini
  Nav.tsx, LangToggle.tsx, Glass.tsx, GlassFilters.tsx
  sections/
    Hero.tsx
    Services.tsx      # tablist + PackageCard
    PackageCard.tsx
    Portfolio.tsx     # ProjectCard + ReviewBlock
    ProjectCard.tsx
    ReviewBlock.tsx
    About.tsx
    Footer.tsx
```

Rimossi: `ThemeToggle.tsx`, `sections/Screens.*`, `sections/Team.tsx`, `public/modrinth.png`, chiavi i18n di gioco/team/screens.

I dati numerici (prezzi, giorni, punteggi, URL) stanno in `lib/`; i testi traducibili in `messages/`, indicizzati per id. Le chiavi mancanti restano errore di compilazione.

## SEO

- Title/description: "Pigiazza — Minecraft mod, plugin, addon & porting commissions".
- JSON-LD: `Person` (Pigiazza, `sameAs` i 4 social) + `ProfessionalService` con `OfferCatalog` dei 4 servizi e prezzi min–max. Niente `Review`/`AggregateRating` in JSON-LD (recensioni non verificabili da Google sul sito).
- Sitemap, robots, 404 mantenuti; 404 restilizzata col nuovo tema.

## Accessibilità

- Selettore servizi: `role="tablist"`/`tab`/`tabpanel`, `aria-selected`, frecce sinistra/destra.
- Stelle con testo alternativo ("5 stelle su 5").
- Decorazioni (onde, quadratini, blocchi hero) `aria-hidden`.
- Focus ring visibile su vetro, contrasto AA, `prefers-reduced-motion` e `prefers-reduced-transparency` rispettati.

## Segnaposto

Marcati `// PLACEHOLDER` nel codice: URL delle 4 gig, immagine Hug & Marry, bio di Chi sono.

## Test

- Vitest su `lib/`: 4 servizi; ogni servizio ha esattamente 3 pacchetti con prezzi strettamente crescenti e giorni/revisioni positivi; ogni progetto ha 3 punteggi interi 1–5; tutti gli URL sono `https://`.
- Allineamento chiavi IT/EN garantito dai tipi (`npm run typecheck`).
- `npm run verify` (test + typecheck + build) verde.
- Verifica nel browser: desktop e mobile, cambio servizio da mouse e tastiera, cambio lingua, nessun errore in console.
