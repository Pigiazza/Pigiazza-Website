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
