// Modifica qui se i tuoi username sui vari servizi non coincidono tutti con "Pigiazza".
const CONFIG = {
  modrinthUsername: "Pigiazza",
  githubUsername: "Pigiazza",
  socials: [
    { key: "github", name: "GitHub", url: "https://github.com/Pigiazza", icon: "assets/github.png" },
    { key: "modrinth", name: "Modrinth", url: "https://modrinth.com/user/Pigiazza", icon: "assets/modrinth.png" },
    { key: "curseforge", name: "CurseForge", url: "https://www.curseforge.com/members/pigiazza", icon: "assets/curseforge.png" },
    { key: "kofi", name: "Ko-fi", url: "https://ko-fi.com/pigiazza", icon: "assets/kofi.png" },
  ],
};

const ICON_DOWNLOAD =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M5 21h14"/></svg>';

const ICON_HEART =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>';

const ICON_BOX =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>';

// --- Icone per il feed attività (eventi pubblici GitHub) ---

const ICON_COMMIT =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M3 12h6M15 12h6"/></svg>';

const ICON_PLUS =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>';

const ICON_GLOBE =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/></svg>';

const ICON_TAG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m20.6 12.6-7.9 7.9a2 2 0 0 1-2.8 0L3 13.6V3h10.6l7 7a2 2 0 0 1 0 2.6Z"/><circle cx="7.5" cy="7.5" r="1"/></svg>';

const ICON_ISSUE =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>';

const ICON_PR =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M6 8.5v7M8.5 6H14a4 4 0 0 1 4 4v2.5"/></svg>';

const ICON_FORK =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="5" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="12" cy="19" r="2"/><path d="M6 7v2a4 4 0 0 0 4 4M18 7v2a4 4 0 0 1-4 4M12 13v4"/></svg>';

const ICON_STAR =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2L7 14.2l-5-4.9 6.9-1z"/></svg>';

const ICON_BOOK =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>';

// Lingue: codice breve mostrato al posto delle bandiere, più nome esteso nel menu.
const LANGS = {
  en: { code: "EN", label: "English" },
  it: { code: "IT", label: "Italiano" },
};

// --- Traduzioni ---

const ROTATING_WORDS = {
  en: ["Mods", "Plugins", "Datapacks", "Servers"],
  it: ["Mod", "Plugin", "Datapack", "Server"],
};

const TRANSLATIONS = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.langLabel": "Language",
    "hero.headingPre": "The place to find",
    "hero.headingPost": "made by someone who lives and breathes Minecraft.",
    "hero.sub": "New to modding. I build things I actually want to use, test them properly, then publish them.",
    "hero.ctaProjects": "See what I’ve built",
    "hero.ctaContact": "Say hello",
    "about.statement": "Every project starts the same way: there’s something Minecraft doesn’t have yet, so I build it. Then I make sure it actually holds up before anyone else sees it.",
    "about.bio1": "I’m Tommaso, known online as Pigiazza, one person and one editor, no team. I picked up Java to fix something that annoyed me on my own server, and never really stopped.",
    "about.bio2": "No roadmap, no backers, no deadlines but my own. Just whatever Minecraft is missing this week, built until it’s solid enough to hand to strangers on the internet.",
    "about.bio3": "Fabric is home base, but every mod ships for Forge, NeoForge and Quilt too, across every Minecraft version that supports it, so nobody’s left out over a loader choice.",
    "about.step1Title": "Idea",
    "about.step1Text": "Something’s missing or annoying in my own world. That’s the whole brief.",
    "about.step2Title": "Build",
    "about.step2Text": "Heads-down in the code, running it on my own server the whole time.",
    "about.step3Title": "Ship",
    "about.step3Text": "Once it survives real play without breaking, it goes up on Modrinth.",
    "about.stackTitle": "What I build with",
    "nav.activity": "Activity",
    "nav.faq": "FAQ",
    "activity.heading": "What I’ve been doing",
    "activity.subtext": "A live feed straight from GitHub, commits, releases, whatever I touched last.",
    "activity.emptyText": "No public activity in the last few days. Check the profile directly.",
    "activity.push": "Pushed to {repo}",
    "activity.createRepo": "Created a new repository: {repo}",
    "activity.createRef": "Created a new branch on {repo}",
    "activity.public": "Made {repo} public",
    "activity.release": "Published a release on {repo}",
    "activity.issue": "Updated an issue on {repo}",
    "activity.pr": "Updated a pull request on {repo}",
    "activity.fork": "Forked {repo}",
    "activity.star": "Starred {repo}",
    "activity.wiki": "Updated the wiki on {repo}",
    "activity.generic": "Updated {repo}",
    "projects.heading": "Everything I’ve shipped",
    "projects.subtext": "New releases show up here the moment I publish them on Modrinth, no need to refresh or check back.",
    "projects.emptyTitle": "Nothing published yet",
    "projects.emptyText": "Still cooking. Check back soon, or follow along so you don’t miss the first drop.",
    "projects.emptyLink": "Visit my Modrinth profile",
    "projects.errorTitle": "Can’t reach Modrinth right now",
    "projects.errorText": "Try again in a moment, or check the profile directly.",
    "projects.filterEmpty": "Nothing here for this filter yet.",
    "stats.downloads": "downloads",
    "stats.projects": "projects",
    "stats.followers": "followers",
    "filter.all": "All",
    "faq.heading": "Questions people actually ask",
    "faq.q1": "Are your mods free?",
    "faq.a1": "Always. There’s a Ko-fi link below if you’d like to support the work, but it’s never required.",
    "faq.q2": "Do you take requests?",
    "faq.a2": "Sometimes — if it’s something I’d genuinely want to build myself, I’ll consider it.",
    "faq.q3": "How often do things get updated?",
    "faq.a3": "Whenever something breaks or I find a better way to do it. There’s no fixed schedule — it’s just me.",
    "faq.q4": "Found a bug?",
    "faq.a4": "Open an issue on the project’s GitHub repo. I read every one.",
    "faq.q5": "What do you build with?",
    "faq.a5": "Java, mainly on Fabric, then ported to Forge, NeoForge and Quilt for every supported version. Builds run through Gradle, everything lives in Git.",
    "faq.q6": "Is the source code public?",
    "faq.a6": "Yes. Every project card links straight to its GitHub repo, issues and pull requests included.",
    "contact.heading": "Find me elsewhere",
    "contact.subtext": "You’ll find the code on GitHub, downloads on Modrinth, and a coffee jar on Ko-fi if you’re feeling generous.",
    "footer.tagline": "Made solo, mostly at night.",
    "modal.close": "Close",
    "modal.openLink": "Open on Modrinth",
    "modal.loading": "Loading description…",
    "backToTop.aria": "Back to top",
    "theme.toLight": "Switch to light mode",
    "theme.toDark": "Switch to dark mode",
  },
  it: {
    "nav.home": "Home",
    "nav.about": "Chi sono",
    "nav.projects": "Progetti",
    "nav.contact": "Contatti",
    "nav.langLabel": "Lingua",
    "hero.headingPre": "Il posto dove trovare",
    "hero.headingPost": "creati da chi vive Minecraft in prima persona.",
    "hero.sub": "Sono alle prime armi con le mod. Creo cose che voglio usare io per primo, le testo sul serio, poi le pubblico.",
    "hero.ctaProjects": "Guarda cosa ho creato",
    "hero.ctaContact": "Scrivimi",
    "about.statement": "Ogni progetto nasce allo stesso modo: c'è qualcosa che Minecraft non ha ancora, quindi lo creo. Poi mi assicuro che regga davvero prima di farlo vedere a chiunque altro.",
    "about.bio1": "Sono Tommaso, conosciuto online come Pigiazza, una persona sola con un editor, nessun team. Ho imparato Java per sistemare una cosa che mi dava fastidio sul mio server, e non ho più smesso.",
    "about.bio2": "Nessuna roadmap, nessun finanziatore, nessuna scadenza se non le mie. Solo quello che manca a Minecraft questa settimana, costruito finché non regge abbastanza da darlo in mano a sconosciuti su internet.",
    "about.bio3": "Fabric è la base di partenza, ma ogni mod esce anche per Forge, NeoForge e Quilt, in ogni versione di Minecraft che quel tipo di progetto supporta, così nessuno resta escluso per una scelta di loader.",
    "about.step1Title": "Idea",
    "about.step1Text": "Manca qualcosa, o qualcosa dà fastidio nel mio mondo. Ecco tutto il brief.",
    "about.step2Title": "Costruzione",
    "about.step2Text": "Testa bassa sul codice, provandolo sul mio server per tutto il tempo.",
    "about.step3Title": "Pubblicazione",
    "about.step3Text": "Quando regge al gioco vero senza rompersi, va su Modrinth.",
    "about.stackTitle": "Con cosa costruisco",
    "nav.activity": "Attività",
    "nav.faq": "FAQ",
    "activity.heading": "Cosa sto facendo",
    "activity.subtext": "Uno stream in diretta da GitHub, commit, release, l'ultima cosa che ho toccato.",
    "activity.emptyText": "Nessuna attività pubblica negli ultimi giorni. Controlla direttamente il profilo.",
    "activity.push": "Push su {repo}",
    "activity.createRepo": "Creata una nuova repository: {repo}",
    "activity.createRef": "Creato un nuovo branch su {repo}",
    "activity.public": "Reso pubblico {repo}",
    "activity.release": "Pubblicata una release su {repo}",
    "activity.issue": "Aggiornata una issue su {repo}",
    "activity.pr": "Aggiornata una pull request su {repo}",
    "activity.fork": "Fork di {repo}",
    "activity.star": "Aggiunta una stella a {repo}",
    "activity.wiki": "Aggiornata la wiki su {repo}",
    "activity.generic": "Aggiornato {repo}",
    "projects.heading": "Tutto quello che ho pubblicato",
    "projects.subtext": "Ogni nuovo progetto compare qui non appena lo pubblico su Modrinth, non serve aggiornare la pagina.",
    "projects.emptyTitle": "Ancora nulla di pubblicato",
    "projects.emptyText": "Ancora in lavorazione. Torna a dare un'occhiata, o seguimi per non perderti il primo rilascio.",
    "projects.emptyLink": "Vai al mio profilo Modrinth",
    "projects.errorTitle": "Non riesco a contattare Modrinth in questo momento",
    "projects.errorText": "Riprova tra un attimo, oppure controlla direttamente il profilo.",
    "projects.filterEmpty": "Ancora nulla per questo filtro.",
    "stats.downloads": "download",
    "stats.projects": "progetti",
    "stats.followers": "follower",
    "filter.all": "Tutti",
    "faq.heading": "Le domande che fanno davvero",
    "faq.q1": "Le tue mod sono gratis?",
    "faq.a1": "Sempre. Qui sotto c'è un link a Ko-fi se vuoi supportare il lavoro, ma non è mai obbligatorio.",
    "faq.q2": "Accetti richieste?",
    "faq.a2": "A volte — se è qualcosa che vorrei davvero costruire anche per me, la considero.",
    "faq.q3": "Ogni quanto aggiorni le cose?",
    "faq.a3": "Quando qualcosa si rompe o trovo un modo migliore di farla. Non c'è un calendario fisso — sono solo io.",
    "faq.q4": "Hai trovato un bug?",
    "faq.a4": "Apri una issue sulla repo GitHub del progetto. Le leggo tutte.",
    "faq.q5": "Con cosa costruisci?",
    "faq.a5": "Java, soprattutto su Fabric, poi portato su Forge, NeoForge e Quilt per ogni versione supportata. Le build passano da Gradle, tutto vive su Git.",
    "faq.q6": "Il codice sorgente è pubblico?",
    "faq.a6": "Sì. Ogni progetto rimanda direttamente alla sua repo GitHub, issue e pull request comprese.",
    "contact.heading": "Dove trovarmi",
    "contact.subtext": "Trovi il codice su GitHub, i download su Modrinth, e un barattolo per il caffè su Ko-fi se ti va di essere generoso.",
    "footer.tagline": "Fatto da solo, soprattutto di notte.",
    "modal.close": "Chiudi",
    "modal.openLink": "Apri su Modrinth",
    "modal.loading": "Caricamento descrizione…",
    "backToTop.aria": "Torna in cima",
    "theme.toLight": "Passa alla modalità chiara",
    "theme.toDark": "Passa alla modalità scura",
  },
};

const LANG_STORAGE_KEY = "pigiazza-lang";
let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || "en";

function t(key) {
  return TRANSLATIONS[currentLang][key] ?? TRANSLATIONS.en[key] ?? key;
}

function applyLanguage(lang) {
  currentLang = TRANSLATIONS[lang] ? lang : "en";
  localStorage.setItem(LANG_STORAGE_KEY, currentLang);
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

  document.getElementById("lang-current-code").textContent = LANGS[currentLang].code;
  document.querySelectorAll(".lang-option").forEach((opt) => {
    opt.classList.toggle("active", opt.dataset.lang === currentLang);
  });

  const themeToggleEl = document.getElementById("theme-toggle");
  if (themeToggleEl) {
    themeToggleEl.setAttribute("aria-label", t(currentTheme === "light" ? "theme.toDark" : "theme.toLight"));
  }

  if (typeof showRotatingWord === "function") {
    rotatingWordIndex = 0;
    showRotatingWord();
  }

  renderProjectsUI();
  renderActivityUI();
}

// --- Dropdown lingua (codice testuale, niente bandiere) ---

const langDropdown = document.getElementById("lang-dropdown");
const langToggle = document.getElementById("lang-toggle");
const langMenu = document.getElementById("lang-menu");

langMenu.innerHTML = Object.entries(LANGS)
  .map(
    ([code, lang]) => `
    <li>
      <button type="button" class="lang-option" data-lang="${code}">
        <span class="lang-option-code">${lang.code}</span>
        <span class="lang-option-name">${escapeHtml(lang.label)}</span>
      </button>
    </li>`
  )
  .join("");

function openLangMenu() {
  langMenu.hidden = false;
  langToggle.setAttribute("aria-expanded", "true");
}

function closeLangMenu() {
  langMenu.hidden = true;
  langToggle.setAttribute("aria-expanded", "false");
}

langToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  if (langMenu.hidden) openLangMenu();
  else closeLangMenu();
});

langMenu.querySelectorAll(".lang-option").forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLanguage(btn.dataset.lang);
    closeLangMenu();
  });
});

document.addEventListener("click", (e) => {
  if (!langMenu.hidden && !langDropdown.contains(e.target)) closeLangMenu();
});

// --- Sole/luna: chiaro o scuro, salvato come la lingua. Se l'utente non ha
// mai scelto, si parte dalla preferenza di sistema. ---

const THEME_STORAGE_KEY = "pigiazza-theme";
const themeToggle = document.getElementById("theme-toggle");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
let currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || (prefersLight ? "light" : "dark");

function applyTheme(theme) {
  currentTheme = theme === "light" ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
  document.body.dataset.theme = currentTheme;
  themeToggle.setAttribute("aria-label", t(currentTheme === "light" ? "theme.toDark" : "theme.toLight"));
}

themeToggle.addEventListener("click", () => {
  applyTheme(currentTheme === "light" ? "dark" : "light");
});

applyTheme(currentTheme);

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

function renderSocials() {
  const grid = document.getElementById("contact-grid");
  grid.innerHTML = CONFIG.socials
    .map(
      (s) => `
      <a class="social-btn" href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">
        <img class="social-badge" src="${escapeHtml(s.icon)}" alt="" loading="lazy" />
        <span class="social-name">${escapeHtml(s.name)}</span>
      </a>`
    )
    .join("");
}

function projectCard(project) {
  const tags = (project.categories || []).slice(0, 4);
  const icon = project.icon_url || "";

  return `
    <button type="button" class="project-card glass-panel" data-slug="${escapeHtml(project.slug)}">
      <div class="project-head">
        ${icon ? `<img class="project-icon" src="${escapeHtml(icon)}" alt="" loading="lazy" />` : `<div class="project-icon"></div>`}
        <div class="project-title-wrap">
          <span class="project-title">${escapeHtml(project.title)}</span>
          <span class="project-type">${escapeHtml(project.project_type)}</span>
        </div>
      </div>
      <p class="project-desc">${escapeHtml(project.description)}</p>
      ${tags.length ? `<div class="project-tags">${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
      <div class="project-stats">
        <span class="stat">${ICON_DOWNLOAD} ${formatCount(project.downloads || 0)}</span>
        <span class="stat">${ICON_HEART} ${formatCount(project.followers || 0)}</span>
      </div>
    </button>`;
}

// Stato dei progetti, cosi possiamo ridisegnare i messaggi vuoti/errore quando cambia la lingua
// senza rifare la fetch a Modrinth.
let projectsState = { status: "loading", projects: [] };
let activeFilter = "all";

function animateCount(el, target) {
  if (prefersReducedMotion) {
    el.textContent = formatCount(target);
    return;
  }
  const duration = 900;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatCount(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Striscia di stat live, visibile solo quando c'e' almeno un progetto pubblicato:
// con zero progetti mostrerebbe solo zeri, meno onesto dello stato vuoto dedicato.
function renderStats(projects) {
  const row = document.getElementById("stats-row");
  if (!projects.length) {
    row.hidden = true;
    return;
  }
  const totals = projects.reduce(
    (acc, p) => {
      acc.downloads += p.downloads || 0;
      acc.followers += p.followers || 0;
      return acc;
    },
    { downloads: 0, followers: 0 }
  );

  row.hidden = false;
  row.querySelectorAll(".stat-chip-icon")[0].innerHTML = ICON_DOWNLOAD;
  row.querySelectorAll(".stat-chip-icon")[1].innerHTML = ICON_BOX;
  row.querySelectorAll(".stat-chip-icon")[2].innerHTML = ICON_HEART;
  animateCount(document.getElementById("stat-downloads"), totals.downloads);
  animateCount(document.getElementById("stat-projects"), projects.length);
  animateCount(document.getElementById("stat-followers"), totals.followers);
}

// Tab di filtro per tipo progetto, mostrate solo se ce n'e' piu' di uno:
// con un solo tipo la scelta sarebbe finta.
function renderFilterTabs(projects) {
  const wrap = document.getElementById("filter-tabs");
  const types = Array.from(new Set(projects.map((p) => p.project_type))).sort();

  if (types.length < 2) {
    wrap.hidden = true;
    wrap.innerHTML = "";
    return;
  }

  if (activeFilter !== "all" && !types.includes(activeFilter)) activeFilter = "all";

  wrap.hidden = false;
  wrap.innerHTML = [
    `<button type="button" class="filter-tab${activeFilter === "all" ? " is-active" : ""}" data-filter="all">${escapeHtml(t("filter.all"))}</button>`,
    ...types.map(
      (type) =>
        `<button type="button" class="filter-tab${activeFilter === type ? " is-active" : ""}" data-filter="${escapeHtml(type)}">${escapeHtml(type.charAt(0).toUpperCase() + type.slice(1))}</button>`
    ),
  ].join("");
}

document.getElementById("filter-tabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-tab");
  if (!btn) return;
  activeFilter = btn.dataset.filter;
  renderProjectsUI();
});

function renderProjectsUI() {
  const grid = document.getElementById("projects-grid");

  if (projectsState.status === "loading") {
    return; // resta lo skeleton già presente nell'HTML
  }

  if (projectsState.status === "empty") {
    document.getElementById("stats-row").hidden = true;
    document.getElementById("filter-tabs").hidden = true;
    grid.innerHTML = `
      <div class="projects-empty glass-panel">
        <h3>${escapeHtml(t("projects.emptyTitle"))}</h3>
        <p class="muted">${escapeHtml(t("projects.emptyText"))}</p>
        <a class="btn btn-primary" href="https://modrinth.com/user/${CONFIG.modrinthUsername}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("projects.emptyLink"))}</a>
      </div>`;
    return;
  }

  renderStats(projectsState.projects);
  renderFilterTabs(projectsState.projects);

  const filtered =
    activeFilter === "all"
      ? projectsState.projects
      : projectsState.projects.filter((p) => p.project_type === activeFilter);

  grid.innerHTML = filtered.length
    ? filtered.map(projectCard).join("")
    : `<div class="projects-empty glass-panel"><p class="muted">${escapeHtml(t("projects.filterEmpty"))}</p></div>`;
}

async function loadProjects() {
  try {
    const res = await fetch(`https://api.modrinth.com/v2/user/${CONFIG.modrinthUsername}/projects`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const projects = await res.json();

    if (!projects.length) {
      projectsState = { status: "empty", projects: [] };
      renderProjectsUI();
      return;
    }

    projects.forEach((p) => projectsBySlug.set(p.slug, p));
    projectsState = { status: "loaded", projects };
    renderProjectsUI();
  } catch (err) {
    console.warn("Impossibile caricare i progetti Modrinth:", err);
    projectsState = { status: "empty", projects: [] };
    renderProjectsUI();
  }
}

// slug -> project object, per aprire il modal senza rifare la fetch
const projectsBySlug = new Map();

// --- Attività: feed live degli eventi pubblici GitHub, stesso pattern di loadProjects ---

function formatRelativeTime(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffMin = Math.round(diffMs / 60000);
  const diffH = Math.round(diffMin / 60);
  const diffD = Math.round(diffH / 24);
  const rtf = new Intl.RelativeTimeFormat(currentLang, { numeric: "auto" });
  if (diffMin < 60) return rtf.format(-diffMin, "minute");
  if (diffH < 24) return rtf.format(-diffH, "hour");
  if (diffD < 30) return rtf.format(-diffD, "day");
  return rtf.format(-Math.round(diffD / 30), "month");
}

function activityLabel(event) {
  const [owner, repoShort] = event.repo.name.split("/");
  const repo = owner === CONFIG.githubUsername ? repoShort : event.repo.name;

  switch (event.type) {
    case "PushEvent":
      return { icon: ICON_COMMIT, text: t("activity.push").replace("{repo}", repo) };
    case "CreateEvent":
      return event.payload.ref_type === "repository"
        ? { icon: ICON_PLUS, text: t("activity.createRepo").replace("{repo}", repo) }
        : { icon: ICON_PLUS, text: t("activity.createRef").replace("{repo}", repo) };
    case "PublicEvent":
      return { icon: ICON_GLOBE, text: t("activity.public").replace("{repo}", repo) };
    case "ReleaseEvent":
      return { icon: ICON_TAG, text: t("activity.release").replace("{repo}", repo) };
    case "IssuesEvent":
      return { icon: ICON_ISSUE, text: t("activity.issue").replace("{repo}", repo) };
    case "PullRequestEvent":
      return { icon: ICON_PR, text: t("activity.pr").replace("{repo}", repo) };
    case "ForkEvent":
      return { icon: ICON_FORK, text: t("activity.fork").replace("{repo}", repo) };
    case "WatchEvent":
      return { icon: ICON_STAR, text: t("activity.star").replace("{repo}", repo) };
    case "GollumEvent":
      return { icon: ICON_BOOK, text: t("activity.wiki").replace("{repo}", repo) };
    default:
      return { icon: ICON_COMMIT, text: t("activity.generic").replace("{repo}", repo) };
  }
}

function activityRow(event) {
  const { icon, text } = activityLabel(event);
  return `
    <a class="activity-row" href="https://github.com/${escapeHtml(event.repo.name)}" target="_blank" rel="noopener noreferrer">
      <span class="activity-icon">${icon}</span>
      <span class="activity-text">${escapeHtml(text)}</span>
      <span class="activity-time">${escapeHtml(formatRelativeTime(event.created_at))}</span>
    </a>`;
}

let activityState = { status: "loading", events: [] };

function renderActivityUI() {
  const list = document.getElementById("activity-list");
  if (!list || activityState.status === "loading") return;

  if (activityState.status === "empty") {
    list.innerHTML = `<div class="activity-empty glass-panel"><p class="muted">${escapeHtml(t("activity.emptyText"))}</p></div>`;
    return;
  }

  list.innerHTML = activityState.events.map(activityRow).join("");
}

async function loadActivity() {
  try {
    const res = await fetch(`https://api.github.com/users/${CONFIG.githubUsername}/events/public?per_page=6`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const events = await res.json();

    if (!events.length) {
      activityState = { status: "empty", events: [] };
      renderActivityUI();
      return;
    }

    activityState = { status: "loaded", events: events.slice(0, 6) };
    renderActivityUI();
  } catch (err) {
    console.warn("Impossibile caricare l'attività GitHub:", err);
    activityState = { status: "empty", events: [] };
    renderActivityUI();
  }
}

// --- Modal con descrizione completa (Markdown renderizzato, come su Modrinth) ---

const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
let lastFocusedEl = null;

function openProjectModal(project) {
  lastFocusedEl = document.activeElement;

  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-type").textContent = project.project_type;
  document.getElementById("modal-icon").src =
    project.icon_url ||
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23322d47'/%3E%3C/svg%3E";

  document.getElementById("modal-stats").innerHTML = `
    <span class="stat">${ICON_DOWNLOAD} ${formatCount(project.downloads || 0)}</span>
    <span class="stat">${ICON_HEART} ${formatCount(project.followers || 0)}</span>`;

  document.getElementById("modal-link").href = `https://modrinth.com/${project.project_type}/${project.slug}`;
  document.getElementById("modal-link-label").textContent = t("modal.openLink");

  if (project.body && window.marked && window.DOMPurify) {
    const rawHtml = window.marked.parse(project.body);
    modalBody.innerHTML = window.DOMPurify.sanitize(rawHtml);
  } else {
    modalBody.innerHTML = `<p>${escapeHtml(project.description || "")}</p>`;
  }

  modal.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("modal-close").focus();
}

function closeProjectModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocusedEl) lastFocusedEl.focus();
}

document.getElementById("projects-grid").addEventListener("click", (e) => {
  const card = e.target.closest(".project-card[data-slug]");
  if (!card) return;
  const project = projectsBySlug.get(card.dataset.slug);
  if (project) openProjectModal(project);
});

document.getElementById("modal-close").addEventListener("click", closeProjectModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeProjectModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeProjectModal();
});

// --- Menu a comparsa (hamburger a sinistra, si espande dal centro del bottone) ---

const menuToggle = document.getElementById("menu-toggle");
const siteMenu = document.getElementById("site-menu");
let menuLastFocused = null;

function openMenu() {
  menuLastFocused = document.activeElement;
  menuToggle.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close menu");
  siteMenu.classList.add("is-open");
  siteMenu.removeAttribute("inert");
  siteMenu.setAttribute("aria-hidden", "false");
  siteHeader.classList.add("menu-open");
  document.body.style.overflow = "hidden";
  const firstLink = siteMenu.querySelector("a");
  if (firstLink) firstLink.focus({ preventScroll: true });
}

function closeMenu() {
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  siteMenu.classList.remove("is-open");
  siteMenu.setAttribute("inert", "");
  siteMenu.setAttribute("aria-hidden", "true");
  siteHeader.classList.remove("menu-open");
  document.body.style.overflow = "";
  closeLangMenu();
  if (menuLastFocused) menuLastFocused.focus();
}

menuToggle.addEventListener("click", () => {
  if (siteMenu.classList.contains("is-open")) closeMenu();
  else openMenu();
});

siteMenu.addEventListener("click", (e) => {
  if (e.target === siteMenu) closeMenu();
});

siteMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Clic ovunque fuori dal pannello (e fuori dal bottone stesso) lo chiude.
document.addEventListener("click", (e) => {
  if (!siteMenu.classList.contains("is-open")) return;
  if (siteMenu.contains(e.target) || menuToggle.contains(e.target)) return;
  closeMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!langMenu.hidden) closeLangMenu();
  else if (siteMenu.classList.contains("is-open")) closeMenu();
});

// --- Parola rotante nell'hero (Mods / Plugins / Datapacks / Servers) ---

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const rotatingWordEl = document.getElementById("rotating-word");
let rotatingWordIndex = 0;
let rotatingWordTimer = null;

function showRotatingWord() {
  const words = ROTATING_WORDS[currentLang] || ROTATING_WORDS.en;
  rotatingWordEl.textContent = words[rotatingWordIndex % words.length];
  if (prefersReducedMotion) return;
  // Web Animations API invece di CSS animation: ogni chiamata crea un'animazione
  // indipendente, quindi non serve nessun trucco di reset per farla ripartire.
  rotatingWordEl.animate(
    [
      { opacity: 0, transform: "translateY(-38%)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 450, easing: "cubic-bezier(0.25, 1, 0.5, 1)", fill: "both" }
  );
}

function startRotatingWord() {
  showRotatingWord();
  if (prefersReducedMotion) return;
  clearInterval(rotatingWordTimer);
  rotatingWordTimer = setInterval(() => {
    rotatingWordIndex += 1;
    showRotatingWord();
  }, 1500);
}

// --- Parallax: gli elementi decorativi si spostano leggermente allo scroll ---

const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));

function updateParallax() {
  const scrollY = window.scrollY;
  parallaxEls.forEach((el) => {
    const speed = parseFloat(el.dataset.parallax);
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
}

// --- Navbar: in cima alla pagina l'header è "volante" (nessuno sfondo);
// appena si scrolla oltre l'hero, prende una barra di vetro con una piccola entrata. ---

const siteHeader = document.getElementById("site-header");
const heroText = document.querySelector(".hero-text");

function updateHeaderNav() {
  const threshold = heroText ? heroText.offsetTop + heroText.offsetHeight * 0.7 : 120;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > threshold);
}

// --- Back to top: compare solo dopo aver superato l'hero. ---

const backToTop = document.getElementById("back-to-top");
backToTop.hidden = false;

function updateBackToTop() {
  backToTop.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.6);
}

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
});

let scrollTicking = false;
function onScroll() {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    if (!prefersReducedMotion) updateParallax();
    updateHeaderNav();
    updateBackToTop();
    scrollTicking = false;
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", updateHeaderNav);
updateHeaderNav();
updateBackToTop();

// --- Reveal on scroll: il contenuto è visibile di default (vedi .reveal in
// CSS), quindi qui si aggiunge lo stato "in attesa" solo se possiamo
// garantire che l'IntersectionObserver lo rimuova di nuovo. ---

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  revealEls.forEach((el) => el.classList.add("reveal-pending"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("reveal-pending");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}

document.getElementById("year").textContent = new Date().getFullYear();
applyLanguage(currentLang);
renderSocials();
loadProjects();
loadActivity();
startRotatingWord();
