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

type GlobalWithRuntimeEnv = typeof globalThis & {
  __env__?: Record<string, unknown>;
};

const runtimeEnvKeys = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_PUBLISHABLE_KEY",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
] as const;

// On Cloudflare Workers, environment variables and secrets are passed as runtime
// bindings. Nitro exposes them on globalThis.__env__; direct Worker entries pass
// them as the fetch `env` argument. Hydrate process.env before importing app code
// so existing server-side clients can read SUPABASE_URL, RESEND_API_KEY, etc.
function hydrateProcessEnvFromWorkerEnv(env: unknown) {
  const workerEnv =
    env && typeof env === "object" ? env : (globalThis as GlobalWithRuntimeEnv).__env__;
  if (!workerEnv || typeof workerEnv !== "object") return;
  try {
    const runtimeGlobal = globalThis as GlobalWithRuntimeEnv & {
      process?: { env?: Record<string, string | undefined> };
    };
    const target = runtimeGlobal.process?.env;
    if (!target) return;
    for (const [key, value] of Object.entries(workerEnv as Record<string, unknown>)) {
      if (typeof value === "string" && value && !target[key]) {
        target[key] = value;
      }
    }
    for (const key of runtimeEnvKeys) {
      const value = (workerEnv as Record<string, unknown>)[key];
      if (typeof value === "string" && value && !target[key]) {
        target[key] = value;
      }
    }
  } catch {
    // ignore — process may be read-only in some runtimes
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
