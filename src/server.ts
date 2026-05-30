import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// On Cloudflare Workers, environment variables and secrets are passed via the
// `env` argument to fetch — they are NOT available on process.env by default.
// Copy string-valued bindings onto process.env at request time so server-side
// code that reads process.env.SUPABASE_URL etc. works without modification.
function hydrateProcessEnvFromWorkerEnv(env: unknown) {
  if (!env || typeof env !== "object") return;
  try {
    const target = (globalThis as { process?: { env?: Record<string, string> } })
      .process?.env;
    if (!target) return;
    for (const [key, value] of Object.entries(env as Record<string, unknown>)) {
      if (typeof value === "string" && target[key] === undefined) {
        target[key] = value;
      }
    }
  } catch {
    // ignore — process may not exist in some runtimes
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    hydrateProcessEnvFromWorkerEnv(env);
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
