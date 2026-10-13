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
