import { requireSession } from "../../_shared/auth.js";
import { ALLOWED_EMAILS } from "../../_shared/allowlist.js";

const KV_KEY = "organizer-tree";
const MAX_BODY_BYTES = 500 * 1024; // 500 KB, ben oltre quanto serve per qualche centinaio di repo

const EMPTY_TREE = { folders: {}, root: { children: [] }, repoMeta: {} };

function isValidTree(data) {
  if (!data || typeof data !== "object") return false;
  if (typeof data.folders !== "object" || data.folders === null) return false;
  if (!data.root || !Array.isArray(data.root.children)) return false;
  if (typeof data.repoMeta !== "object" || data.repoMeta === null) return false;
  for (const folder of Object.values(data.folders)) {
    if (typeof folder.id !== "string" || typeof folder.name !== "string") return false;
    if (!Array.isArray(folder.children)) return false;
  }
  return true;
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

  if (!env.ORGANIZER_KV) {
    return new Response(JSON.stringify({ ok: false, error: "ORGANIZER_KV non configurato sul server." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const stored = await env.ORGANIZER_KV.get(KV_KEY, "json");
  return new Response(JSON.stringify({ ok: true, tree: stored ?? EMPTY_TREE }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPut(context) {
  const { request, env } = context;

  const email = await requireSession(request, env, ALLOWED_EMAILS);
  if (!email) {
    return new Response(JSON.stringify({ ok: false, error: "Non autorizzato." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!env.ORGANIZER_KV) {
    return new Response(JSON.stringify({ ok: false, error: "ORGANIZER_KV non configurato sul server." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return new Response(JSON.stringify({ ok: false, error: "Struttura troppo grande." }), {
      status: 413,
      headers: { "Content-Type": "application/json" },
    });
  }

  let tree;
  try {
    tree = JSON.parse(raw);
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "JSON non valido." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!isValidTree(tree)) {
    return new Response(JSON.stringify({ ok: false, error: "Struttura non valida." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await env.ORGANIZER_KV.put(KV_KEY, JSON.stringify(tree));

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
