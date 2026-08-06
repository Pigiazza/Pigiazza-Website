// Verifica dei Google ID token e gestione della sessione firmata via HMAC.
// Nessuna libreria esterna: le Cloudflare Pages Functions girano su Workers,
// che espone Web Crypto nativamente, quindi RS256/HMAC si verificano a mano.

const GOOGLE_JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs";
const GOOGLE_ISSUERS = ["accounts.google.com", "https://accounts.google.com"];
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 giorni

export const SESSION_COOKIE_NAME = "pigiazza_session";
export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;

function base64UrlDecode(input) {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(input.length + ((4 - (input.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function base64UrlEncode(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeJwtPart(part) {
  return JSON.parse(new TextDecoder().decode(base64UrlDecode(part)));
}

// Le chiavi pubbliche di Google ruotano di rado: una cache per-isolate basta
// a evitare una fetch extra ad ogni richiesta calda, senza bisogno di KV.
let cachedJwks = null;
let cachedJwksAt = 0;

async function getGoogleJwks() {
  const now = Date.now();
  if (cachedJwks && now - cachedJwksAt < 10 * 60 * 1000) return cachedJwks;
  const res = await fetch(GOOGLE_JWKS_URL);
  if (!res.ok) throw new Error("Impossibile scaricare le chiavi pubbliche di Google");
  const data = await res.json();
  cachedJwks = data.keys;
  cachedJwksAt = now;
  return cachedJwks;
}

// Verifica firma, issuer, audience, scadenza ed email verificata di un ID
// token Google (JWT RS256). Lancia un errore se qualcosa non torna, altrimenti
// ritorna il payload decodificato.
export async function verifyGoogleIdToken(idToken, clientId) {
  const parts = idToken.split(".");
  if (parts.length !== 3) throw new Error("Token malformato");
  const [headerPart, payloadPart, signaturePart] = parts;

  const header = decodeJwtPart(headerPart);
  const payload = decodeJwtPart(payloadPart);
  const signature = base64UrlDecode(signaturePart);

  const jwks = await getGoogleJwks();
  const jwk = jwks.find((k) => k.kid === header.kid);
  if (!jwk) throw new Error("Chiave di firma sconosciuta");

  const key = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const signedData = new TextEncoder().encode(`${headerPart}.${payloadPart}`);
  const valid = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, signature, signedData);
  if (!valid) throw new Error("Firma non valida");

  if (!GOOGLE_ISSUERS.includes(payload.iss)) throw new Error("Issuer non valido");
  if (payload.aud !== clientId) throw new Error("Audience non valida");
  if (!payload.exp || Date.now() / 1000 > payload.exp) throw new Error("Token scaduto");
  if (!payload.email_verified) throw new Error("Email non verificata da Google");

  return payload;
}

async function hmacSign(secret, data) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return base64UrlEncode(new Uint8Array(sig));
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Firma una sessione minimale (email + scadenza) con HMAC-SHA256: dopo il
// login non serve richiamare Google ad ogni richiesta, basta ricontrollare
// la firma del cookie con il nostro segreto.
export async function createSessionToken(email, secret) {
  const payload = JSON.stringify({ email, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS });
  const encodedPayload = base64UrlEncode(new TextEncoder().encode(payload));
  const signature = await hmacSign(secret, encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export async function verifySessionToken(token, secret) {
  if (!token) return null;
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = await hmacSign(secret, encodedPayload);
  if (!timingSafeEqual(signature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(encodedPayload)));
    if (!payload.exp || Date.now() / 1000 > payload.exp) return null;
    return payload.email;
  } catch {
    return null;
  }
}

export function getCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

// Helper condiviso da ogni endpoint API privato: ritorna l'email autorizzata
// o null. Ricontrolla l'allowlist qui (non solo alla creazione del cookie)
// cosi' togliere un'email dalla lista revoca l'accesso da subito.
export async function requireSession(request, env, allowedEmails) {
  if (!env.SESSION_SECRET) return null;
  const token = getCookie(request, SESSION_COOKIE_NAME);
  const email = await verifySessionToken(token, env.SESSION_SECRET);
  if (!email) return null;
  const allowed = allowedEmails.map((e) => e.toLowerCase()).includes(email.toLowerCase());
  return allowed ? email : null;
}
