// Modifica qui se i tuoi username sui vari servizi non coincidono tutti con "Pigiazza".
const CONFIG = {
  modrinthUsername: "Pigiazza",
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

// Bandiere disegnate come SVG (niente emoji).
const FLAGS = {
  en: {
    label: "English",
    svg: '<svg viewBox="0 0 60 36" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="36" fill="#0a3d91"/><g stroke="#fff" stroke-width="7"><path d="M0,0 L60,36 M60,0 L0,36"/></g><g stroke="#cf142b" stroke-width="3"><path d="M0,0 L60,36 M60,0 L0,36"/></g><g stroke="#fff" stroke-width="11"><path d="M30,0 V36 M0,18 H60"/></g><g stroke="#cf142b" stroke-width="6.5"><path d="M30,0 V36 M0,18 H60"/></g></svg>',
  },
  it: {
    label: "Italiano",
    svg: '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="2" x="0" fill="#009246"/><rect width="1" height="2" x="1" fill="#f1f2f1"/><rect width="1" height="2" x="2" fill="#ce2b37"/></svg>',
  },
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
    "projects.heading": "Everything I’ve shipped",
    "projects.subtext": "New releases show up here the moment I publish them on Modrinth — no need to refresh or check back.",
    "projects.emptyTitle": "Nothing published yet",
    "projects.emptyText": "Still cooking. Check back soon, or follow along so you don’t miss the first drop.",
    "projects.emptyLink": "Visit my Modrinth profile",
    "projects.errorTitle": "Can’t reach Modrinth right now",
    "projects.errorText": "Try again in a moment, or check the profile directly.",
    "contact.heading": "Find me elsewhere",
    "contact.subtext": "You’ll find the code on GitHub, downloads on Modrinth, and a coffee jar on Ko-fi if you’re feeling generous.",
    "footer.tagline": "Made solo, mostly at night.",
    "modal.close": "Close",
    "modal.openLink": "Open on Modrinth",
    "modal.loading": "Loading description…",
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
    "projects.heading": "Tutto quello che ho pubblicato",
    "projects.subtext": "Ogni nuovo progetto compare qui non appena lo pubblico su Modrinth — non serve aggiornare la pagina.",
    "projects.emptyTitle": "Ancora nulla di pubblicato",
    "projects.emptyText": "Ancora in lavorazione. Torna a dare un'occhiata, o seguimi per non perderti il primo rilascio.",
    "projects.emptyLink": "Vai al mio profilo Modrinth",
    "projects.errorTitle": "Non riesco a contattare Modrinth in questo momento",
    "projects.errorText": "Riprova tra un attimo, oppure controlla direttamente il profilo.",
    "contact.heading": "Dove trovarmi",
    "contact.subtext": "Trovi il codice su GitHub, i download su Modrinth, e un barattolo per il caffè su Ko-fi se ti va di essere generoso.",
    "footer.tagline": "Fatto da solo, soprattutto di notte.",
    "modal.close": "Chiudi",
    "modal.openLink": "Apri su Modrinth",
    "modal.loading": "Caricamento descrizione…",
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

  document.getElementById("lang-current-flag").innerHTML = FLAGS[currentLang].svg;
  document.querySelectorAll(".lang-option").forEach((opt) => {
    opt.classList.toggle("active", opt.dataset.lang === currentLang);
  });

  if (typeof showRotatingWord === "function") {
    rotatingWordIndex = 0;
    showRotatingWord();
  }

  renderProjectsUI();
}

// --- Dropdown lingua (bandiere SVG) ---

const langDropdown = document.getElementById("lang-dropdown");
const langToggle = document.getElementById("lang-toggle");
const langMenu = document.getElementById("lang-menu");

langMenu.innerHTML = Object.entries(FLAGS)
  .map(
    ([code, flag]) => `
    <li>
      <button type="button" class="lang-option" data-lang="${code}">
        <span class="flag-icon">${flag.svg}</span>
        ${flag.label}
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

function renderProjectsUI() {
  const grid = document.getElementById("projects-grid");

  if (projectsState.status === "loading") {
    return; // resta lo skeleton già presente nell'HTML
  }

  if (projectsState.status === "empty") {
    grid.innerHTML = `
      <div class="projects-empty glass-panel">
        <h3>${escapeHtml(t("projects.emptyTitle"))}</h3>
        <p class="muted">${escapeHtml(t("projects.emptyText"))}</p>
        <a class="btn btn-primary" href="https://modrinth.com/user/${CONFIG.modrinthUsername}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("projects.emptyLink"))}</a>
      </div>`;
    return;
  }

  if (projectsState.status === "error") {
    grid.innerHTML = `
      <div class="projects-empty glass-panel">
        <h3>${escapeHtml(t("projects.errorTitle"))}</h3>
        <p class="muted">${escapeHtml(t("projects.errorText"))}</p>
        <a class="btn btn-primary" href="https://modrinth.com/user/${CONFIG.modrinthUsername}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("projects.emptyLink"))}</a>
      </div>`;
    return;
  }

  grid.innerHTML = projectsState.projects.map(projectCard).join("");
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
    projectsState = { status: "error", projects: [] };
    renderProjectsUI();
  }
}

// slug -> project object, per aprire il modal senza rifare la fetch
const projectsBySlug = new Map();

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

  const link = `https://modrinth.com/${project.project_type}/${project.slug}`;
  document.getElementById("modal-link").href = link;

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

function bumpMenuToggle() {
  menuToggle.classList.remove("is-bumping");
  void menuToggle.offsetWidth; // forza il reflow cosi l'animazione riparte ogni volta
  menuToggle.classList.add("is-bumping");
}

function openMenu() {
  menuLastFocused = document.activeElement;
  bumpMenuToggle();
  menuToggle.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close menu");
  requestAnimationFrame(() => siteMenu.classList.add("is-open"));
  siteMenu.removeAttribute("inert");
  siteMenu.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const firstLink = siteMenu.querySelector("a");
  if (firstLink) firstLink.focus({ preventScroll: true });
}

function closeMenu() {
  bumpMenuToggle();
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  siteMenu.classList.remove("is-open");
  siteMenu.setAttribute("inert", "");
  siteMenu.setAttribute("aria-hidden", "true");
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
      { opacity: 0, transform: "translateY(-55%)" },
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

if (!prefersReducedMotion && parallaxEls.length) {
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
    },
    { passive: true }
  );
}

document.getElementById("year").textContent = new Date().getFullYear();
applyLanguage(currentLang);
renderSocials();
loadProjects();
startRotatingWord();
