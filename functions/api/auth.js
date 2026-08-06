import { verifyGoogleIdToken, createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "../_shared/auth.js";
import { ALLOWED_EMAILS } from "../_shared/allowlist.js";

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.GOOGLE_CLIENT_ID || !env.SESSION_SECRET) {
    return new Response(JSON.stringify({ ok: false, error: "Configurazione mancante sul server." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let credential;
  try {
    const body = await request.json();
    credential = body.credential;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Richiesta non valida." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!credential) {
    return new Response(JSON.stringify({ ok: false, error: "Credenziale mancante." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let payload;
  try {
    payload = await verifyGoogleIdToken(credential, env.GOOGLE_CLIENT_ID);
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Accesso Google non valido." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const email = (payload.email || "").toLowerCase();
  const allowed = ALLOWED_EMAILS.map((e) => e.toLowerCase());
  if (!allowed.includes(email)) {
    return new Response(JSON.stringify({ ok: false, error: "Questo account non ha accesso a quest'area." }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const sessionToken = await createSessionToken(email, env.SESSION_SECRET);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `${SESSION_COOKIE_NAME}=${sessionToken}; Path=/; Max-Age=${SESSION_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}
