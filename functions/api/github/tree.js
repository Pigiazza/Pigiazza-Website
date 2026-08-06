import { requireSession } from "../../_shared/auth.js";
import { ALLOWED_EMAILS } from "../../_shared/allowlist.js";

// Incapsula ogni pezzo del path separatamente, cosi' gli slash restano
// separatori di cartella invece di finire encodati o dare adito a segmenti
// tipo ".." che escano dal path richiesto.
function encodePath(path) {
  return path
    .split("/")
    .filter(Boolean)
    .map(encodeURIComponent)
    .join("/");
}

export async function onRequestGet(context) {
  const { request, env } = context;

  const email = await requireSession(request, env, ALLOWED_EMAILS);
  if (!email) {
    return new Response(JSON.stringify({ ok: false, error: "Non autorizzato." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!env.GITHUB_TOKEN) {
    return new Response(JSON.stringify({ ok: false, error: "GITHUB_TOKEN non configurato sul server." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const url = new URL(request.url);
  const repo = url.searchParams.get("repo") || "";
  const path = url.searchParams.get("path") || "";
  const ref = url.searchParams.get("ref") || "";

  const repoMatch = repo.match(/^[^/]+\/[^/]+$/);
  if (!repoMatch) {
    return new Response(JSON.stringify({ ok: false, error: "Repo non valido." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let apiUrl = `https://api.github.com/repos/${repo}/contents/${encodePath(path)}`;
  if (ref) apiUrl += `?ref=${encodeURIComponent(ref)}`;

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "pigiazza-site-organizer",
    },
  });

  if (!res.ok) {
    const body = await res.text();
    return new Response(
      JSON.stringify({ ok: false, error: `GitHub ha risposto ${res.status}: ${body.slice(0, 200)}` }),
      { status: res.status === 404 ? 404 : 502, headers: { "Content-Type": "application/json" } }
    );
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    // Il path puntava dritto a un file: lo segnaliamo, il client apre la vista file.
    return new Response(JSON.stringify({ ok: true, isFile: true, entry: { name: data.name, path: data.path } }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const entries = data
    .map((e) => ({ name: e.name, path: e.path, type: e.type === "dir" ? "dir" : "file", size: e.size }))
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

  return new Response(JSON.stringify({ ok: true, isFile: false, entries }), {
    headers: { "Content-Type": "application/json" },
  });
}
