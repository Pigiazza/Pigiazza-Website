import { requireSession } from "../../_shared/auth.js";
import { ALLOWED_EMAILS } from "../../_shared/allowlist.js";

const BINARY_EXTENSIONS = new Set([
  "png", "jpg", "jpeg", "gif", "webp", "bmp", "ico", "icns",
  "woff", "woff2", "ttf", "otf", "eot",
  "zip", "tar", "gz", "7z", "rar", "jar",
  "mp3", "mp4", "wav", "ogg", "webm", "mov", "avi",
  "pdf", "exe", "dll", "so", "dylib", "class", "bin",
  "db", "sqlite", "sqlite3",
]);

function encodePath(path) {
  return path
    .split("/")
    .filter(Boolean)
    .map(encodeURIComponent)
    .join("/");
}

function isBinaryPath(path) {
  const ext = path.split(".").pop()?.toLowerCase();
  return BINARY_EXTENSIONS.has(ext || "");
}

// atob non digerisce gli \n che GitHub intercala nel base64 ogni 60 caratteri.
function decodeBase64Utf8(b64) {
  const clean = b64.replace(/\n/g, "");
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
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
  if (!repoMatch || !path) {
    return new Response(JSON.stringify({ ok: false, error: "Repo o path non validi." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (isBinaryPath(path)) {
    return new Response(
      JSON.stringify({ ok: true, isBinary: true, htmlUrl: `https://github.com/${repo}/blob/${ref || "HEAD"}/${path}` }),
      { headers: { "Content-Type": "application/json" } }
    );
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

  if (Array.isArray(data) || data.type !== "file") {
    return new Response(JSON.stringify({ ok: false, error: "Il path indicato non e' un file." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (typeof data.content !== "string") {
    // File oltre il tetto di ~1MB della Contents API: niente anteprima, solo link.
    return new Response(
      JSON.stringify({ ok: true, tooLarge: true, htmlUrl: data.html_url, downloadUrl: data.download_url }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({
      ok: true,
      isBinary: false,
      tooLarge: false,
      content: decodeBase64Utf8(data.content),
      size: data.size,
      htmlUrl: data.html_url,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
