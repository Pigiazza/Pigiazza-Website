// Header, menu a comparsa, dropdown lingua e back-to-top: l'unica roba
// identica su tutte le pagine del sito (index, report-bug, wiki). Ogni
// pagina estende window.PIGIAZZA_STRINGS con le proprie chiavi PRIMA che
// questo file giri, poi chiama applyLanguage(currentLang) alla fine del
// proprio script — nav.js non lo fa da solo, altrimenti renderizzerebbe la
// pagina prima che le chiavi specifiche siano state unite al dizionario.

const LANGS = {
  en: { code: "EN", label: "English" },
  it: { code: "IT", label: "Italiano" },
};

window.PIGIAZZA_STRINGS = window.PIGIAZZA_STRINGS || { en: {}, it: {} };
Object.assign(window.PIGIAZZA_STRINGS.en, {
  "nav.projects": "Projects",
  "nav.reportBug": "Report a bug",
  "nav.wiki": "Wiki",
  "nav.langLabel": "Language",
  "backToTop.aria": "Back to top",
  "footer.tagline": "Made solo, mostly at night.",
});
Object.assign(window.PIGIAZZA_STRINGS.it, {
  "nav.projects": "Progetti",
  "nav.reportBug": "Segnala un bug",
  "nav.wiki": "Wiki",
  "nav.langLabel": "Lingua",
  "backToTop.aria": "Torna in cima",
  "footer.tagline": "Fatto da solo, soprattutto di notte.",
});

const LANG_STORAGE_KEY = "pigiazza-lang";
let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || "en";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function t(key) {
  return window.PIGIAZZA_STRINGS[currentLang][key] ?? window.PIGIAZZA_STRINGS.en[key] ?? key;
}

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

// Ogni pagina puo' definire window.onLangChange per ridisegnare i propri
// contenuti dinamici (es. i progetti su index.html) quando cambia la lingua.
function applyLanguage(lang) {
  currentLang = window.PIGIAZZA_STRINGS[lang] ? lang : "en";
  localStorage.setItem(LANG_STORAGE_KEY, currentLang);
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

  const langCode = document.getElementById("lang-current-code");
  if (langCode) langCode.textContent = LANGS[currentLang].code;
  document.querySelectorAll(".lang-option").forEach((opt) => {
    opt.classList.toggle("active", opt.dataset.lang === currentLang);
  });

  if (typeof window.onLangChange === "function") window.onLangChange();
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

// --- Menu a comparsa (hamburger a sinistra, si espande dal centro del bottone) ---

const menuToggle = document.getElementById("menu-toggle");
const siteMenu = document.getElementById("site-menu");
const siteHeader = document.getElementById("site-header");
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

// --- Back to top: compare solo dopo aver superato la prima schermata. ---

const backToTop = document.getElementById("back-to-top");

if (backToTop) {
  backToTop.hidden = false;

  function updateBackToTop() {
    backToTop.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.6);
  }

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
