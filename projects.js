// Modifica qui se lo username Modrinth non coincide con quello configurato in script.js.
const CONFIG = {
  modrinthUsername: "Pigiazza",
};

const ICON_DOWNLOAD =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M5 21h14"/></svg>';

const ICON_HEART =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>';

const ICON_BOX =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>';

Object.assign(window.PIGIAZZA_STRINGS.en, {
  "pg.title": "Projects — Pigiazza",
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
  "modal.close": "Close",
  "modal.openLink": "Open on Modrinth",
  "modal.loading": "Loading description…",
});

Object.assign(window.PIGIAZZA_STRINGS.it, {
  "pg.title": "Progetti — Pigiazza",
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
  "modal.close": "Chiudi",
  "modal.openLink": "Apri su Modrinth",
  "modal.loading": "Caricamento descrizione…",
});

window.onLangChange = function () {
  document.title = t("pg.title");
  renderProjectsUI();
};

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

function projectCard(project, index) {
  const tags = (project.categories || []).slice(0, 4);
  const icon = project.icon_url || "";

  return `
    <button type="button" class="project-card glass-panel stagger-in" style="--i:${index}" data-slug="${escapeHtml(project.slug)}">
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

applyLanguage(currentLang);
loadProjects();
