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
  .private-page {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .private-card {
    max-width: 460px;
    padding: clamp(36px, 6vw, 56px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
  }
  .private-email { color: var(--ink-mute); font-size: 0.85rem; }
</style>
</head>
<body data-palette="sakura">
<div class="noise-overlay" aria-hidden="true"></div>
<div class="bg-glow" aria-hidden="true">
  <span class="glow glow-1"></span>
  <span class="glow glow-2"></span>
</div>
<main class="private-page">
  <div class="glass-panel private-card">
    <h1>Area privata</h1>
    <p class="muted">Sei dentro. Questa pagina la vede solo chi ha accesso.</p>
    <p class="private-email">Connesso come ${escapeHtml(email)}</p>
    <a class="btn btn-ghost" href="/api/logout">Esci</a>
  </div>
</main>
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
