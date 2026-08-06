import { getCookie, verifySessionToken, SESSION_COOKIE_NAME } from "../_shared/auth.js";
import { ALLOWED_EMAILS } from "../_shared/allowlist.js";

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

// L'HTML vive qui dentro, non come file statico: cosi' il contenuto non
// lascia mai il server finche' il controllo di sessione qui sotto non passa.
// Il markup e' solo il guscio dell'app (toolbar, contenitore albero, modali):
// i dati veri (repo GitHub, struttura cartelle) arrivano via fetch dal
// browser, gia' autenticato dallo stesso cookie di sessione.
function renderPrivatePage(email) {
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow" />
<title>Area privata — Pigiazza</title>
<link rel="icon" href="/assets/profile icon.png" type="image/png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/style.css?v=10" />
<style>
  .organizer-app {
    max-width: 900px;
    margin: 0 auto;
    padding: clamp(120px, 16vw, 150px) clamp(16px, 4vw, 32px) 80px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .organizer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .organizer-top-identity {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .organizer-top-identity img { height: 28px; }
  .organizer-top-email { color: var(--ink-mute); font-size: 0.82rem; }

  .organizer-toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .organizer-search {
    flex: 1;
    min-width: 180px;
    position: relative;
  }

  .organizer-search svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: var(--ink-mute);
    pointer-events: none;
  }

  .field-input {
    width: 100%;
    font: inherit;
    font-size: 0.92rem;
    color: var(--ink);
    background: var(--glass-tint-strong);
    border: 1px solid var(--glass-edge-dim);
    border-radius: var(--radius-sm);
    padding: 10px 14px 10px 38px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .field-input::placeholder { color: var(--ink-mute); }
  .field-input:focus-visible {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--glow-a);
  }

  .icon-btn {
    width: 38px;
    height: 38px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--glass-edge-dim);
    background: var(--glass-tint-strong);
    color: var(--ink);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: transform 0.3s var(--ease-bounce), background 0.2s ease;
  }
  .icon-btn:hover { background: var(--glass-tint); transform: translateY(-1px); }
  .icon-btn:active { transform: scale(0.92); transition-duration: 0.15s; }
  .icon-btn svg { width: 17px; height: 17px; }

  .organizer-status {
    font-size: 0.78rem;
    color: var(--ink-mute);
    min-height: 1.2em;
  }
  .organizer-status.is-error { color: oklch(55% 0.18 25); }

  /* --- Albero --- */

  .tree-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .tree-section-label {
    margin: 10px 0 2px;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--ink-mute);
  }

  .tree-item { position: relative; }
  .tree-item.is-dragging-source { opacity: 0.35; }

  .tree-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px 8px calc(10px + var(--depth, 0) * 26px);
    border-radius: var(--radius-sm);
    transition: background 0.15s ease;
  }
  .tree-row:hover { background: var(--glass-tint); }

  .tree-row.is-drop-into { background: var(--glow-a); outline: 2px dashed var(--accent); outline-offset: -2px; }
  .tree-row.is-drop-before { box-shadow: inset 0 2px 0 0 var(--accent); }
  .tree-row.is-drop-after { box-shadow: inset 0 -2px 0 0 var(--accent); }

  .tree-row--skeleton { height: 44px; margin-bottom: 6px; border-radius: var(--radius-sm); }

  .row-handle {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink-mute);
    background: none;
    border: none;
    cursor: grab;
    border-radius: 6px;
  }
  .row-handle:hover { color: var(--ink-soft); background: var(--glass-tint-strong); }
  .row-handle:active { cursor: grabbing; }
  .row-handle svg { width: 15px; height: 15px; }

  .row-disclosure {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink-soft);
    background: none;
    border: none;
    cursor: pointer;
    transition: transform 0.3s var(--ease-out-quart);
  }
  .row-disclosure svg { width: 14px; height: 14px; }
  .row-disclosure.is-open { transform: rotate(90deg); }
  .row-disclosure--spacer { visibility: hidden; }

  .node-icon {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--badge-bg);
    color: var(--badge-ink);
    box-shadow: 0 6px 16px -8px var(--glow-a);
    transition: transform 0.35s var(--ease-bounce);
  }
  .tree-row:hover .node-icon { transform: scale(1.08); }
  .node-icon svg { width: 16px; height: 16px; }

  .row-main {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: baseline;
    gap: 10px;
    text-align: left;
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    cursor: pointer;
  }

  .row-name {
    font-weight: 700;
    font-size: 0.92rem;
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .row-meta {
    font-size: 0.78rem;
    color: var(--ink-mute);
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }

  .row-badge {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    padding: 2px 7px;
    border-radius: 999px;
    background: var(--glass-tint-strong);
    color: var(--ink-soft);
  }
  .row-badge--private { color: oklch(55% 0.15 60); background: oklch(90% 0.06 60); }

  .row-stats {
    flex-shrink: 0;
    display: flex;
    gap: 10px;
  }
  .row-stat {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--ink-soft);
  }
  .row-stat-icon { width: 13px; height: 13px; }

  .row-menu { position: relative; flex-shrink: 0; }
  .row-menu-toggle {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink-mute);
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 6px;
  }
  .row-menu-toggle:hover { color: var(--ink); background: var(--glass-tint-strong); }
  .row-menu-toggle svg { width: 15px; height: 15px; }

  .row-menu-list {
    position: absolute;
    right: 0;
    top: calc(100% + 4px);
    z-index: var(--z-dropdown);
    min-width: 190px;
    padding: 6px;
    border-radius: var(--radius-sm);
    background: var(--glass-tint-strong);
    border: 1px solid var(--glass-edge-dim);
    box-shadow: 0 16px 36px -12px var(--shadow-color);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  .row-menu-list[hidden] { display: none; }
  .row-menu-list li { list-style: none; }
  .row-menu-list button {
    width: 100%;
    text-align: left;
    padding: 8px 10px;
    border-radius: 6px;
    font-size: 0.85rem;
    color: var(--ink);
  }
  .row-menu-list button:hover { background: var(--glass-tint); }
  .row-menu-list button.is-danger { color: oklch(55% 0.18 25); }

  .tree-empty {
    padding: 40px 24px;
    text-align: center;
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .drag-ghost {
    position: fixed;
    z-index: 200;
    pointer-events: none;
    opacity: 0.92;
    box-shadow: 0 20px 40px -12px var(--shadow-color);
    border-radius: var(--radius-sm);
    background: var(--bg);
  }

  /* --- Modali: icona/colore, rinomina, nuova cartella, sposta --- */

  .field-label {
    display: block;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--ink-soft);
    margin-bottom: 8px;
  }

  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
    gap: 8px;
    max-height: 220px;
    overflow-y: auto;
    padding: 4px;
    margin-bottom: 18px;
  }
  .icon-pick {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid var(--glass-edge-dim);
    background: var(--glass-tint-strong);
    color: var(--ink-soft);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.25s var(--ease-bounce), border-color 0.2s ease, color 0.2s ease;
  }
  .icon-pick svg { width: 18px; height: 18px; }
  .icon-pick:hover { transform: translateY(-2px); color: var(--ink); }
  .icon-pick.is-selected { border-color: var(--accent); color: var(--accent-text); background: var(--glow-a); }

  .color-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 22px;
  }
  .color-pick {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--swatch);
    border: 2px solid transparent;
    cursor: pointer;
    transition: transform 0.25s var(--ease-bounce);
  }
  .color-pick:hover { transform: scale(1.12); }
  .color-pick.is-selected { border-color: var(--ink); transform: scale(1.15); }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  .move-option {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    padding-left: calc(12px + var(--depth, 0) * 20px);
    border-radius: var(--radius-sm);
    color: var(--ink);
    font-size: 0.9rem;
    font-family: inherit;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }
  .move-option:hover { background: var(--glass-tint); }
  .move-option svg { width: 16px; height: 16px; flex-shrink: 0; color: var(--ink-soft); }

  #move-modal-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-height: 320px;
    overflow-y: auto;
  }

  /* --- Vista repo a schermo intero: header, tab, pannelli --- */

  .repo-back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 4px;
    margin-bottom: 20px;
    font-family: inherit;
    font-weight: 700;
    font-size: 0.88rem;
    color: var(--ink-soft);
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 6px;
  }
  .repo-back-link:hover { color: var(--ink); }
  .repo-back-link svg { width: 16px; height: 16px; }

  .repo-view-head {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 28px;
  }

  .node-icon--lg {
    width: 52px;
    height: 52px;
  }
  .node-icon--lg svg { width: 26px; height: 26px; }

  .repo-view-heading { min-width: 0; }
  .repo-view-heading h1 {
    font-size: var(--fs-xl);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .repo-view-owner { font-size: 0.85rem; color: var(--ink-mute); }

  #repo-view-github { margin-left: auto; }

  .repo-tabs {
    display: flex;
    gap: 4px;
    border-bottom: 1px solid var(--glass-edge-dim);
    margin-bottom: 28px;
    overflow-x: auto;
  }

  .repo-tab {
    padding: 10px 16px;
    font-family: "Fredoka", sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--ink-mute);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.2s ease, border-color 0.2s ease;
  }
  .repo-tab:hover { color: var(--ink-soft); }
  .repo-tab.is-active { color: var(--ink); border-bottom-color: var(--accent); }

  #repo-view-desc { color: var(--ink-soft); line-height: 1.6; margin-bottom: 18px; }

  .fact-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
  .fact-row { display: flex; justify-content: space-between; gap: 12px; font-size: 0.86rem; }
  .fact-key { color: var(--ink-mute); }
  .fact-value { color: var(--ink); font-weight: 600; text-align: right; }

  #repo-view-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }
  #repo-view-topics:empty { display: none; }

  .repo-tab-panel-empty {
    padding: 56px 24px;
    text-align: center;
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }
  /* --- Sfoglia i file --- */

  .browse-toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    font-size: 0.88rem;
    min-width: 0;
  }

  .crumb {
    padding: 4px 8px;
    border-radius: 6px;
    color: var(--ink-soft);
    font-weight: 600;
    font-family: inherit;
    background: none;
    border: none;
    cursor: pointer;
    white-space: nowrap;
  }
  .crumb:hover { background: var(--glass-tint-strong); color: var(--ink); }
  .crumb:last-of-type { color: var(--ink); }

  .crumb-sep { color: var(--ink-mute); }

  .browse-row {
    width: 100%;
    text-align: left;
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    cursor: pointer;
  }

  .file-viewer {
    padding: clamp(24px, 4vw, 40px);
    line-height: 1.7;
  }
  .file-viewer :is(h1, h2, h3) { font-family: "Fredoka", sans-serif; margin: 24px 0 10px; }
  .file-viewer img { max-width: 100%; border-radius: var(--radius-sm); }
  .file-viewer pre {
    background: var(--glass-tint-strong);
    padding: 14px 16px;
    border-radius: var(--radius-sm);
    overflow-x: auto;
  }

  .code-viewer {
    padding: 20px 24px;
    overflow-x: auto;
    font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--ink);
    white-space: pre;
  }

  @media (prefers-reduced-motion: reduce) {
    .icon-btn, .icon-pick, .color-pick, .row-disclosure, .tree-row, .node-icon, .btn, .repo-tab {
      transition: none !important;
    }
  }
</style>
</head>
<body data-palette="sakura">
<div class="noise-overlay" aria-hidden="true"></div>
<div class="bg-glow" aria-hidden="true">
  <span class="glow glow-1"></span>
  <span class="glow glow-2"></span>
</div>

<div class="organizer-app">
  <div class="organizer-top">
    <div class="organizer-top-identity">
      <img src="/assets/pigiazza.png" alt="Pigiazza" />
      <span class="organizer-top-email">${escapeHtml(email)}</span>
    </div>
    <a class="btn btn-ghost" href="/api/logout">Esci</a>
  </div>

  <div id="organizer-main">
    <div class="organizer-toolbar">
      <label class="organizer-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
        <input type="search" class="field-input" id="organizer-search" placeholder="Cerca un repo…" aria-label="Cerca un repo" />
      </label>
      <button type="button" class="icon-btn" id="organizer-refresh" aria-label="Aggiorna">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" /></svg>
      </button>
      <button type="button" class="btn btn-primary" id="organizer-new-folder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        <span>Nuova cartella</span>
      </button>
    </div>

    <p class="organizer-status" id="organizer-status" role="status" aria-live="polite"></p>

    <div id="organizer-tree"></div>
  </div>

  <div id="repo-view" hidden>
    <button type="button" class="repo-back-link" id="repo-view-back">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
      <span>Torna ai repo</span>
    </button>

    <div class="repo-view-head">
      <span class="node-icon node-icon--lg" id="repo-view-icon-wrap"></span>
      <div class="repo-view-heading">
        <h1 id="repo-view-title"></h1>
        <span class="repo-view-owner" id="repo-view-owner"></span>
      </div>
      <span class="row-badge" id="repo-view-visibility"></span>
      <a class="btn btn-primary" id="repo-view-github" href="#" target="_blank" rel="noopener noreferrer">
        <span>Vai al repository</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>
      </a>
    </div>

    <nav class="repo-tabs" role="tablist" aria-label="Sezioni del repository">
      <button type="button" class="repo-tab is-active" data-repo-tab="overview" role="tab" aria-selected="true">Panoramica</button>
      <button type="button" class="repo-tab" data-repo-tab="files" role="tab" aria-selected="false">File</button>
      <button type="button" class="repo-tab" data-repo-tab="issues" role="tab" aria-selected="false">Issue</button>
      <button type="button" class="repo-tab" data-repo-tab="wiki" role="tab" aria-selected="false">Wiki</button>
      <button type="button" class="repo-tab" data-repo-tab="settings" role="tab" aria-selected="false">Impostazioni</button>
    </nav>

    <div class="repo-tab-panel" id="repo-tab-overview" role="tabpanel">
      <p id="repo-view-desc"></p>
      <div class="project-stats" id="repo-view-stats"></div>
      <div class="fact-list" id="repo-view-facts"></div>
      <div id="repo-view-topics"></div>
    </div>

    <div class="repo-tab-panel" id="repo-tab-files" role="tabpanel" hidden>
      <div class="browse-toolbar">
        <nav class="breadcrumb" id="browse-breadcrumb" aria-label="Percorso nel repository"></nav>
      </div>
      <div id="browse-body"></div>
    </div>

    <div class="repo-tab-panel" id="repo-tab-issues" role="tabpanel" hidden></div>
    <div class="repo-tab-panel" id="repo-tab-wiki" role="tabpanel" hidden></div>
    <div class="repo-tab-panel" id="repo-tab-settings" role="tabpanel" hidden></div>
  </div>
</div>

<!-- Icona e colore (cartella o repo) -->
<div class="modal-overlay" id="style-modal" hidden>
  <div class="modal-card glass-panel" role="dialog" aria-modal="true" aria-labelledby="style-modal-title">
    <button class="modal-close" data-close-modal aria-label="Chiudi">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </button>
    <h2 id="style-modal-title">Icona e colore</h2>
    <span class="field-label" style="margin-top:20px">Icona</span>
    <div class="icon-grid" id="style-modal-icons"></div>
    <span class="field-label">Colore</span>
    <div class="color-row" id="style-modal-colors"></div>
    <div class="modal-actions">
      <button type="button" class="btn btn-ghost" data-close-modal>Annulla</button>
      <button type="button" class="btn btn-primary" id="style-modal-save">Salva</button>
    </div>
  </div>
</div>

<!-- Rinomina cartella -->
<div class="modal-overlay" id="rename-modal" hidden>
  <div class="modal-card glass-panel" role="dialog" aria-modal="true" aria-labelledby="rename-modal-title">
    <button class="modal-close" data-close-modal aria-label="Chiudi">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </button>
    <h2 id="rename-modal-title">Rinomina cartella</h2>
    <form id="rename-modal-form" style="margin-top:20px">
      <label class="field-label" for="rename-modal-input">Nome</label>
      <input type="text" class="field-input" id="rename-modal-input" autofocus required style="margin-bottom:22px" />
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" data-close-modal>Annulla</button>
        <button type="submit" class="btn btn-primary">Salva</button>
      </div>
    </form>
  </div>
</div>

<!-- Nuova cartella -->
<div class="modal-overlay" id="new-folder-modal" hidden>
  <div class="modal-card glass-panel" role="dialog" aria-modal="true" aria-labelledby="new-folder-modal-title">
    <button class="modal-close" data-close-modal aria-label="Chiudi">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </button>
    <h2 id="new-folder-modal-title">Nuova cartella</h2>
    <form id="new-folder-modal-form" style="margin-top:20px">
      <label class="field-label" for="new-folder-modal-input">Nome</label>
      <input type="text" class="field-input" id="new-folder-modal-input" autofocus required style="margin-bottom:20px" />
      <span class="field-label">Icona</span>
      <div class="icon-grid" id="new-folder-modal-icons"></div>
      <span class="field-label">Colore</span>
      <div class="color-row" id="new-folder-modal-colors"></div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" data-close-modal>Annulla</button>
        <button type="submit" class="btn btn-primary">Crea</button>
      </div>
    </form>
  </div>
</div>

<!-- Sposta in cartella -->
<div class="modal-overlay" id="move-modal" hidden>
  <div class="modal-card glass-panel" role="dialog" aria-modal="true" aria-labelledby="move-modal-title">
    <button class="modal-close" data-close-modal aria-label="Chiudi">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </button>
    <h2 id="move-modal-title">Sposta in cartella</h2>
    <div id="move-modal-list" style="margin-top:20px"></div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.min.js"></script>
<script src="/private-app.js"></script>
</body>
</html>`;
}

export async function onRequestGet(context) {
  const { request, env } = context;

  if (!env.SESSION_SECRET) {
    return Response.redirect(new URL("/login", request.url), 302);
  }

  const token = getCookie(request, SESSION_COOKIE_NAME);
  const email = await verifySessionToken(token, env.SESSION_SECRET);
  const allowed = email && ALLOWED_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase());

  if (!allowed) {
    return Response.redirect(new URL("/login", request.url), 302);
  }

  return new Response(renderPrivatePage(email), {
    headers: { "Content-Type": "text/html; charset=UTF-8" },
  });
}
