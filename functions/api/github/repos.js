import { requireSession } from "../../_shared/auth.js";
import { ALLOWED_EMAILS } from "../../_shared/allowlist.js";

const MAX_PAGES = 10; // 100 per pagina, tetto di sicurezza a 1000 repo

function mapRepo(r) {
  return {
    id: r.full_name,
    name: r.name,
    owner: r.owner?.login ?? "",
    description: r.description,
    language: r.language,
    stars: r.stargazers_count ?? 0,
    forks: r.forks_count ?? 0,
    openIssues: r.open_issues_count ?? 0,
    watchers: r.watchers_count ?? 0,
    updatedAt: r.updated_at,
    createdAt: r.created_at,
    pushedAt: r.pushed_at,
    private: !!r.private,
    htmlUrl: r.html_url,
    homepage: r.homepage || null,
    topics: Array.isArray(r.topics) ? r.topics : [],
    license: r.license?.spdx_id && r.license.spdx_id !== "NOASSERTION" ? r.license.spdx_id : (r.license?.name ?? null),
    defaultBranch: r.default_branch,
    archived: !!r.archived,
    fork: !!r.fork,
    size: r.size ?? 0,
  };
}

function parseNextLink(linkHeader) {
  if (!linkHeader) return null;
  const parts = linkHeader.split(",");
  for (const part of parts) {
    const [urlPart, relPart] = part.split(";");
    if (relPart && relPart.includes('rel="next"')) {
      return urlPart.trim().replace(/^<|>$/g, "");
    }
  }
  return null;
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

  const repos = [];
  let url = "https://api.github.com/user/repos?per_page=100&sort=full_name&direction=asc&affiliation=owner";
  let page = 0;

  try {
    while (url && page < MAX_PAGES) {
      const res = await fetch(url, {
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
          { status: 502, headers: { "Content-Type": "application/json" } }
        );
      }

      const batch = await res.json();
      repos.push(...batch.map(mapRepo));

      url = parseNextLink(res.headers.get("Link"));
      page += 1;
    }
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: "Impossibile contattare GitHub." }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, repos }), {
    headers: { "Content-Type": "application/json" },
  });
}
