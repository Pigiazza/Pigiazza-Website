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

// --- Traduzioni ---

const TRANSLATIONS = {
  it: {
    "nav.home": "Home",
    "nav.projects": "Progetti",
    "nav.contact": "Contatti",
    "hero.eyebrow": "MINECRAFT DEVELOPER",
    "hero.heading": 'CIAO, SONO<br /><span class="accent">PIGIAZZA</span>',
    "hero.bioFallback": "Minecraft and coding enthusiast che unisce le due cose per creare mod, plugin, datapack e altro ancora 💚",
    "hero.ctaProjects": "Guarda i progetti",
    "hero.ctaContact": "Contattami",
    "projects.eyebrow": "LIVE DA MODRINTH",
    "projects.heading": "I MIEI PROGETTI",
    "projects.subtext": "Sincronizzati automaticamente da Modrinth: pubblica un progetto e comparirà qui da solo.",
    "projects.emptyTitle": "Ancora nessun progetto pubblico",
    "projects.emptyText": "Appena pubblichi qualcosa su Modrinth comparirà qui automaticamente.",
    "projects.emptyLink": "Vai al profilo Modrinth",
    "projects.errorTitle": "Non riesco a contattare Modrinth in questo momento",
    "projects.errorText": "Riprova più tardi, oppure dai un'occhiata diretta al profilo.",
    "contact.eyebrow": "SEGUIMI",
    "contact.heading": "RESTIAMO IN CONTATTO",
    "contact.subtext": "Trovi tutto il mio lavoro e i modi per supportarmi sulle piattaforme qui sotto.",
    "footer.tagline": "Fatto con 💚 per la community Minecraft.",
    "modal.close": "Chiudi",
    "modal.openLink": "Apri su Modrinth",
    "modal.loading": "Caricamento descrizione...",
  },
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.eyebrow": "MINECRAFT DEVELOPER",
    "hero.heading": 'HI, I\'M<br /><span class="accent">PIGIAZZA</span>',
    "hero.bioFallback": "Minecraft and coding enthusiast who's combined the two to create mods, plugins, datapacks and more 💚",
    "hero.ctaProjects": "View projects",
    "hero.ctaContact": "Contact me",
    "projects.eyebrow": "LIVE FROM MODRINTH",
    "projects.heading": "MY PROJECTS",
    "projects.subtext": "Synced automatically from Modrinth: publish a project and it'll show up here on its own.",
    "projects.emptyTitle": "No public projects yet",
    "projects.emptyText": "As soon as you publish something on Modrinth, it'll appear here automatically.",
    "projects.emptyLink": "Go to Modrinth profile",
    "projects.errorTitle": "Can't reach Modrinth right now",
    "projects.errorText": "Try again later, or check the profile directly.",
    "contact.eyebrow": "FOLLOW ME",
    "contact.heading": "LET'S STAY IN TOUCH",
    "contact.subtext": "Find all my work and ways to support me on the platforms below.",
    "footer.tagline": "Made with 💚 for the Minecraft community.",
    "modal.close": "Close",
    "modal.openLink": "Open on Modrinth",
    "modal.loading": "Loading description...",
  },
};

const LANG_STORAGE_KEY = "pigiazza-lang";
let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || "it";

const FLAGS = { it: "🇮🇹", en: "🇬🇧" };

function t(key) {
  return TRANSLATIONS[currentLang][key] ?? TRANSLATIONS.it[key] ?? key;
}

function applyLanguage(lang) {
  currentLang = TRANSLATIONS[lang] ? lang : "it";
  localStorage.setItem(LANG_STORAGE_KEY, currentLang);
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

  document.getElementById("lang-flag").textContent = FLAGS[currentLang];
  document.querySelectorAll(".lang-option").forEach((opt) => {
    opt.classList.toggle("active", opt.dataset.lang === currentLang);
  });

  renderProjectsUI();
}

const langToggle = document.getElementById("lang-toggle");
const langMenu = document.getElementById("lang-menu");

function closeLangMenu() {
  langMenu.hidden = true;
  langToggle.setAttribute("aria-expanded", "false");
}

function openLangMenu() {
  langMenu.hidden = false;
  langToggle.setAttribute("aria-expanded", "true");
}

langToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  if (langMenu.hidden) openLangMenu();
  else closeLangMenu();
});

document.querySelectorAll(".lang-option").forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLanguage(btn.dataset.lang);
    closeLangMenu();
  });
});

document.addEventListener("click", (e) => {
  if (!langMenu.hidden && !e.target.closest(".lang-dropdown")) closeLangMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !langMenu.hidden) closeLangMenu();
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

async function loadProfile() {
  try {
    const res = await fetch(`https://api.modrinth.com/v2/user/${CONFIG.modrinthUsername}`);
    if (!res.ok) return;
    const user = await res.json();
    if (user.avatar_url) {
      document.getElementById("avatar-img").src = user.avatar_url;
    }
    // La bio del sito è quella scritta a mano nelle traduzioni (hero.bioFallback),
    // non quella del profilo Modrinth: qui prendiamo solo la foto, non il testo.
  } catch (err) {
    console.warn("Impossibile caricare il profilo Modrinth:", err);
  }
}

function projectCard(project) {
  const tags = (project.categories || []).slice(0, 4);
  const icon = project.icon_url || "";

  return `
    <button type="button" class="project-card glass" data-slug="${escapeHtml(project.slug)}">
      <div class="project-head">
        ${icon ? `<img class="project-icon" src="${escapeHtml(icon)}" alt="" loading="lazy" />` : `<div class="project-icon"></div>`}
        <div class="project-title-wrap">
          <span class="project-title">${escapeHtml(project.title)}</span>
          <span class="project-type">${escapeHtml(project.project_type)}</span>
        </div>
      </div>
      <p class="project-desc">${escapeHtml(project.description)}</p>
      ${tags.length ? `<div class="project-tags">${tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>` : ""}
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
      <div class="projects-empty glass">
        <h3>${escapeHtml(t("projects.emptyTitle"))}</h3>
        <p class="muted">${escapeHtml(t("projects.emptyText"))}</p>
        <a class="btn btn-primary" href="https://modrinth.com/user/${CONFIG.modrinthUsername}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("projects.emptyLink"))}</a>
      </div>`;
    return;
  }

  if (projectsState.status === "error") {
    grid.innerHTML = `
      <div class="projects-empty glass">
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
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23c7d2e6'/%3E%3C/svg%3E";

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

document.getElementById("year").textContent = new Date().getFullYear();
applyLanguage(currentLang);
renderSocials();
loadProfile();
loadProjects();
