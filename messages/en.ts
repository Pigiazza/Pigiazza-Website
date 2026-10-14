// PLACEHOLDER: about.body and the faq answers are drafts for Tommaso to correct.
const en = {
  nav: {
    services: 'Services',
    process: 'How it works',
    portfolio: 'Portfolio',
    about: 'About',
    faq: 'FAQ',
    contact: 'Contact',
    menuTitle: 'Menu',
    follow: 'Find me on',
  },
  toggles: { lang: 'Language', menuOpen: 'Open menu', menuClose: 'Close menu' },
  langs: { en: 'English', it: 'Italiano' },
  hero: {
    pre: 'Minecraft',
    words: ['mods', 'plugins', 'addons', 'ports'],
    post: 'made for your server.',
    sub: 'Custom mods, plugins and addons, or your existing project ported to another version. Ordered on Fiverr, built by me, supported after delivery.',
    ctaPrimary: 'Order on Fiverr',
    ctaSecondary: 'See the packages',
    trust: ['5-star reviews', 'Delivery from 2 days', 'Revisions included'],
    carousel: 'My profiles',
    carouselGo: 'Show',
  },
  services: {
    heading: 'Pick what you need',
    sub: 'Four services, three packages each. Every order goes through Fiverr, so payment and delivery are protected.',
    tablist: 'Services',
    delivery: 'Delivery',
    days: '{n} days',
    revisions: 'Revisions',
    cta: 'Choose on Fiverr',
    from: 'from ${n}',
    items: {
      mod: {
        tab: 'Mods',
        lead: 'New items, blocks, mobs and mechanics, built as a real mod.',
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
        lead: 'Server-side features your players get without installing anything.',
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
        lead: 'Extend a mod you already love, like Create, with new content that fits right in.',
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
        lead: 'Your mod or plugin, moved to the Minecraft version or loader you need.',
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
  process: {
    heading: 'How it works',
    steps: [
      { title: 'Tell me the idea', body: 'Message me on Fiverr with what you want, the Minecraft version and the loader.' },
      { title: 'I build it', body: 'I write and test it on my own server, and keep you posted along the way.' },
      { title: 'You play it', body: 'You get the finished files, with revisions included and help after delivery.' },
    ],
  },
  portfolio: {
    heading: 'Recent work',
    sub: 'Two Fiverr commissions, and what the clients said about them.',
    imagePlaceholder: 'Screenshot coming soon',
    stars: '5 out of 5 stars',
    outOf: 'out of 5',
    translatedNote: 'Review translated from Italian',
    scores: {
      communication: 'Seller communication level',
      quality: 'Quality of delivery',
      value: 'Value of delivery',
    },
    items: {
      hugMarry: {
        kind: 'Version port',
        title: 'Hug & Marry',
        target: 'Minecraft 1.21.1 → 1.20',
        body: 'A full port of the Hug & Marry mod from Minecraft 1.21.1 back to 1.20 for my first Fiverr client: registries, API calls and rendering adapted to the older version, then tested in game.',
        review:
          'Very quick to reply, always polite and available for extra additions and bug fixes even after delivery.',
        imageAlt: '',
      },
      createRaw: {
        kind: 'Addon for Create',
        title: 'Create: Raw',
        target: 'New block: the Rawer',
        body: 'An addon for Create that adds the Rawer, a block that works like a furnace in reverse and turns smelted items back into their raw form. It plugs into every Create mechanic, 100% compatible.',
        review: 'Great mod creator. Definitely recommended.',
        imageAlt: 'The Rawer block from Create: Raw, a wooden machine with a stone frame',
      },
    },
  },
  about: {
    heading: 'Hi, I’m Tommaso',
    alias: 'aka Pigiazza',
    body: 'Italian Minecraft developer. I picked up Java to fix something on my own server and never really stopped. Today I build mods, addons and server plugins on commission, from a single custom block to porting a whole mod to another version.',
    facts: ['Based in Italy', 'Java & Kotlin', 'Fabric, Forge, NeoForge, Quilt, Paper', 'Replies within a day'],
    clockLabel: 'Time in Italy',
    awake: 'Probably awake, expect a reply soon',
    asleep: 'Probably asleep, I’ll reply in the morning',
    avatarAlt: "Pigiazza's dog, the closest thing this site has to a team photo",
  },
  faq: {
    heading: 'Questions',
    items: [
      {
        q: 'How do I order?',
        a: 'Pick a package above and open it on Fiverr. If you are not sure which one fits, send me a message there first and I will tell you.',
      },
      {
        q: 'Which versions and loaders do you work with?',
        a: 'Fabric, Forge, NeoForge and Quilt for mods, Paper for plugins. Tell me the exact Minecraft version and I will confirm before you order.',
      },
      {
        q: 'What should I send you?',
        a: 'What the feature should do, the Minecraft version, the loader and any mods it has to work with. Screenshots or examples help a lot.',
      },
      {
        q: 'What if something breaks after delivery?',
        a: 'Every package includes revisions, and I keep helping with bug fixes after delivery too.',
      },
    ],
  },
  contact: {
    heading: 'Got an idea for your server?',
    sub: 'Tell me about it on Fiverr. I usually reply within a day.',
    cta: 'Message me on Fiverr',
  },
  footer: { rights: 'All rights reserved.', top: 'Back to top', tagline: 'Made solo, mostly at night.' },
  notFound: { title: 'Page not found', back: 'Back to the homepage' },
};

export default en;
