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
  en: {
    "nav.home": "Home",
    "nav.craft": "Craft",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.langLabel": "Language",
    "hero.heading": "I build Minecraft mods like someone’s going to notice.",
    "hero.sub": "One developer. Mods, plugins, and datapacks built with more care than they probably need — then shipped anyway.",
    "hero.ctaProjects": "See what I’ve built",
    "hero.ctaContact": "Say hello",
    "craft.heading": "How I build",
    "craft.step1Title": "Prototype",
    "craft.step1Text": "A quick, ugly, functional first pass — just enough to prove the idea holds up.",
    "craft.step2Title": "Playtest",
    "craft.step2Text": "Real worlds, real bugs, real friends breaking things on purpose.",
    "craft.step3Title": "Ship",
    "craft.step3Text": "Polished, versioned, documented — then straight onto Modrinth.",
    "projects.heading": "Everything I’ve shipped",
    "projects.subtext": "Pulled straight from Modrinth — publish something new and it lands here on its own.",
    "projects.emptyTitle": "Nothing public yet",
    "projects.emptyText": "The first release is on its way. Follow along on Modrinth, or check back soon.",
    "projects.emptyLink": "Visit my Modrinth profile",
    "projects.errorTitle": "Can’t reach Modrinth right now",
    "projects.errorText": "Try again in a moment, or check the profile directly.",
    "contact.heading": "Find me elsewhere",
    "contact.subtext": "GitHub for the code, Modrinth for the downloads, Ko-fi if you’d like to buy me a coffee.",
    "footer.tagline": "Built solo, shipped with care.",
    "modal.close": "Close",
    "modal.openLink": "Open on Modrinth",
    "modal.loading": "Loading description…",
  },
  it: {
    "nav.home": "Home",
    "nav.craft": "Metodo",
    "nav.projects": "Progetti",
    "nav.contact": "Contatti",
    "nav.langLabel": "Lingua",
    "hero.heading": "Creo mod per Minecraft come se qualcuno le notasse davvero.",
    "hero.sub": "Un solo sviluppatore. Mod, plugin e datapack curati più del necessario — e pubblicati comunque.",
    "hero.ctaProjects": "Guarda cosa ho creato",
    "hero.ctaContact": "Scrivimi",
    "craft.heading": "Come lavoro",
    "craft.step1Title": "Prototipo",
    "craft.step1Text": "Una prima versione rapida, grezza, che serve solo a dimostrare che l'idea funziona.",
    "craft.step2Title": "Playtest",
    "craft.step2Text": "Mondi veri, bug veri, amici che rompono tutto apposta.",
    "craft.step3Title": "Rilascio",
    "craft.step3Text": "Rifinito, versionato, documentato — poi dritto su Modrinth.",
    "projects.heading": "Tutto quello che ho pubblicato",
    "projects.subtext": "Preso in tempo reale da Modrinth: pubblica qualcosa di nuovo e comparirà qui da solo.",
    "projects.emptyTitle": "Ancora nulla di pubblico",
    "projects.emptyText": "Il primo rilascio è in arrivo. Seguimi su Modrinth, o torna a controllare tra un po'.",
    "projects.emptyLink": "Vai al mio profilo Modrinth",
    "projects.errorTitle": "Non riesco a contattare Modrinth in questo momento",
    "projects.errorText": "Riprova tra un attimo, oppure controlla direttamente il profilo.",
    "contact.heading": "Dove trovarmi",
    "contact.subtext": "GitHub per il codice, Modrinth per i download, Ko-fi se vuoi offrirmi un caffè.",
    "footer.tagline": "Costruito da solo, rilasciato con cura.",
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

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

  document.querySelectorAll(".lang-opt").forEach((opt) => {
    opt.classList.toggle("active", opt.dataset.lang === currentLang);
  });

  renderProjectsUI();
}

document.querySelectorAll(".lang-opt").forEach((btn) => {
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
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
    // La copy del sito è scritta a mano nelle traduzioni sopra, non presa dal bio di Modrinth.
  } catch (err) {
    console.warn("Impossibile caricare il profilo Modrinth:", err);
  }
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

// --- Menu a scomparsa (hamburger con bounce, pannello da sinistra) ---

const menuToggle = document.getElementById("menu-toggle");
const menuBackdrop = document.getElementById("menu-backdrop");
const siteMenu = document.getElementById("site-menu");
let menuLastFocused = null;

function openMenu() {
  menuLastFocused = document.activeElement;
  menuToggle.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuBackdrop.hidden = false;
  requestAnimationFrame(() => {
    menuBackdrop.classList.add("is-visible");
    siteMenu.classList.add("is-open");
  });
  siteMenu.removeAttribute("inert");
  siteMenu.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const firstLink = siteMenu.querySelector("a");
  if (firstLink) firstLink.focus({ preventScroll: true });
}

function closeMenu() {
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuBackdrop.classList.remove("is-visible");
  siteMenu.classList.remove("is-open");
  siteMenu.setAttribute("inert", "");
  siteMenu.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  setTimeout(() => {
    if (!siteMenu.classList.contains("is-open")) menuBackdrop.hidden = true;
  }, 450);
  if (menuLastFocused) menuLastFocused.focus();
}

menuToggle.addEventListener("click", () => {
  if (siteMenu.classList.contains("is-open")) closeMenu();
  else openMenu();
});

menuBackdrop.addEventListener("click", closeMenu);

siteMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && siteMenu.classList.contains("is-open")) closeMenu();
});

// --- Palette picker (widget temporaneo per confrontare le 4 combinazioni colore) ---

document.querySelectorAll(".palette-swatch").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.body.dataset.palette = btn.dataset.palette;
    document.querySelectorAll(".palette-swatch").forEach((b) => b.classList.toggle("active", b === btn));
  });
});

document.querySelector(`.palette-swatch[data-palette="${document.body.dataset.palette}"]`)?.classList.add("active");

document.getElementById("year").textContent = new Date().getFullYear();
applyLanguage(currentLang);
renderSocials();
loadProfile();
loadProjects();
