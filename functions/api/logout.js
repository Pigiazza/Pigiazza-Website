import { SESSION_COOKIE_NAME } from "../_shared/auth.js";

export async function onRequestGet(context) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie": `${SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}
