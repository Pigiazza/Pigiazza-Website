import type en from './en';

// PLACEHOLDER: about.body e le risposte delle faq sono bozze da correggere.
const it: typeof en = {
  nav: {
    services: 'Servizi',
    process: 'Come funziona',
    portfolio: 'Portfolio',
    about: 'Chi sono',
    faq: 'FAQ',
    contact: 'Contatti',
    menuTitle: 'Menu',
    follow: 'Mi trovi su',
  },
  toggles: { lang: 'Lingua', menuOpen: 'Apri menu', menuClose: 'Chiudi menu' },
  langs: { en: 'English', it: 'Italiano' },
  hero: {
    pre: '',
    words: ['Mod', 'Plugin', 'Addon', 'Porting'],
    post: 'Minecraft su misura per il tuo server.',
    sub: 'Mod, plugin e addon personalizzati, o il tuo progetto portato su un’altra versione. Si ordina su Fiverr, lo costruisco io e ti seguo anche dopo la consegna.',
    ctaPrimary: 'Ordina su Fiverr',
    ctaSecondary: 'Vedi i pacchetti',
    trust: ['Recensioni a 5 stelle', 'Consegna da 2 giorni', 'Revisioni incluse'],
    carousel: 'I miei profili',
    carouselGo: 'Mostra',
  },
  tech: { label: 'Costruito con' },
  services: {
    heading: 'Scegli cosa ti serve',
    sub: 'Quattro servizi, tre pacchetti ciascuno. Ogni ordine passa da Fiverr, quindi pagamento e consegna sono protetti.',
    tablist: 'Servizi',
    delivery: 'Consegna',
    days: '{n} giorni',
    revisions: 'Revisioni',
    cta: 'Scegli su Fiverr',
    items: {
      mod: {
        tab: 'Mod',
        lead: 'Nuovi item, blocchi, mob e meccaniche, costruiti come una vera mod.',
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
        lead: 'Funzioni lato server che i giocatori hanno senza installare niente.',
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
        lead: 'Estendi una mod che già ami, come Create, con contenuti che si integrano alla perfezione.',
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
        lead: 'La tua mod o il tuo plugin, spostati sulla versione o sul loader che ti serve.',
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
  process: {
    heading: 'Come funziona',
    steps: [
      { title: 'Raccontami l’idea', body: 'Scrivimi su Fiverr cosa vuoi, la versione di Minecraft e il loader.' },
      { title: 'La costruisco', body: 'La scrivo e la testo sul mio server, e ti aggiorno mentre lavoro.' },
      { title: 'Ci giochi', body: 'Ricevi i file finiti, con revisioni incluse e aiuto anche dopo la consegna.' },
    ],
  },
  portfolio: {
    heading: 'Lavori recenti',
    sub: 'Due commissioni su Fiverr, e cosa ne hanno detto i clienti.',
    imagePlaceholder: 'Screenshot in arrivo',
    stars: '5 stelle su 5',
    outOf: 'su 5',
    translatedNote: '',
    scores: {
      communication: 'Livello di comunicazione del venditore',
      quality: 'Qualità della consegna',
      value: 'Valore della consegna',
    },
    items: {
      hugMarry: {
        kind: 'Porting di versione',
        title: 'Hug & Marry',
        target: 'Minecraft 1.21.1 → 1.20',
        body: 'Porting completo della mod Hug & Marry da Minecraft 1.21.1 alla 1.20 per il mio primo cliente Fiverr: registri, chiamate API e rendering adattati alla versione precedente, poi testati in gioco.',
        review:
          'Molto veloce nelle risposte, sempre cortese e disponibile per ulteriori aggiunte e correzioni di bug anche dopo la consegna',
        imageAlt: '',
      },
      createRaw: {
        kind: 'Addon per Create',
        title: 'Create: Raw',
        target: 'Nuovo blocco: il Rawer',
        body: 'Un addon per Create che aggiunge il Rawer, un blocco che funziona come una fornace al contrario e riporta gli oggetti cotti allo stato grezzo. Si integra con tutti i meccanismi di Create, compatibile al 100%.',
        review: 'Bravissimo creatore di mod. Lo consiglio sicuramente',
        imageAlt: 'Il blocco Rawer di Create: Raw, una macchina in legno con cornice di pietra',
      },
    },
  },
  about: {
    heading: 'Ciao, sono Tommaso',
    alias: 'aka Pigiazza',
    body: 'Sviluppatore Minecraft italiano. Ho imparato Java per sistemare una cosa sul mio server e non mi sono più fermato. Oggi creo mod, addon e plugin su commissione, da un singolo blocco personalizzato al porting di un’intera mod su un’altra versione.',
    facts: ['Dall’Italia', 'Java e Kotlin', 'Fabric, Forge, NeoForge, Quilt, Paper', 'Rispondo entro un giorno'],
    avatarAlt: 'Il cane di Pigiazza, la cosa più vicina a una foto del team che questo sito abbia',
  },
  faq: {
    heading: 'Domande',
    items: [
      {
        q: 'Come ordino?',
        a: 'Scegli un pacchetto qui sopra e aprilo su Fiverr. Se non sai quale fa per te, scrivimi lì prima e te lo dico io.',
      },
      {
        q: 'Con quali versioni e loader lavori?',
        a: 'Fabric, Forge, NeoForge e Quilt per le mod, Paper per i plugin. Dimmi la versione esatta di Minecraft e te la confermo prima dell’ordine.',
      },
      {
        q: 'Cosa ti devo mandare?',
        a: 'Cosa deve fare la funzione, la versione di Minecraft, il loader e le mod con cui deve funzionare. Screenshot o esempi aiutano tantissimo.',
      },
      {
        q: 'E se dopo la consegna qualcosa non va?',
        a: 'Ogni pacchetto include revisioni, e continuo ad aiutarti con le correzioni anche dopo la consegna.',
      },
    ],
  },
  contact: {
    heading: 'Hai un’idea per il tuo server?',
    sub: 'Raccontamela su Fiverr. Di solito rispondo entro un giorno.',
    cta: 'Scrivimi su Fiverr',
  },
  footer: { rights: 'Tutti i diritti riservati.', top: 'Torna su', tagline: 'Fatto da solo, soprattutto di notte.' },
  notFound: { title: 'Pagina non trovata', back: 'Torna alla home' },
};

export default it;
