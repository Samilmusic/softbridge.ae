import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type GlobalWithRuntimeEnv = typeof globalThis & {
 __env__?: Record<string, unknown>;
 env?: Record<string, unknown>;
 process?: { env?: Record<string, string | undefined> };
};

const runtimeEnvKeys = [
 "SUPABASE_URL",
 "SUPABASE_SERVICE_ROLE_KEY",
 "SUPABASE_PUBLISHABLE_KEY",
 "VITE_SUPABASE_URL",
 "VITE_SUPABASE_PUBLISHABLE_KEY",
 "VITE_SUPABASE_PROJECT_ID",
 "RESEND_API_KEY",
 "RESEND_FROM_EMAIL",
 "LOVABLE_API_KEY",
] as const;

function hydrateProcessEnvFromWorkerEnv(env: unknown) {
 const runtimeGlobal = globalThis as GlobalWithRuntimeEnv;

 const workerEnv =
   env && typeof env === "object"
     ? (env as Record<string, unknown>)
     : runtimeGlobal.__env__ && typeof runtimeGlobal.__env__ === "object"
       ? runtimeGlobal.__env__
       : runtimeGlobal.env && typeof runtimeGlobal.env === "object"
         ? runtimeGlobal.env
         : undefined;

 if (!workerEnv) return;

 runtimeGlobal.__env__ = { ...(runtimeGlobal.__env__ ?? {}), ...workerEnv };
 runtimeGlobal.env = { ...(runtimeGlobal.env ?? {}), ...workerEnv };

 if (!runtimeGlobal.process) runtimeGlobal.process = { env: {} };
 if (!runtimeGlobal.process.env) runtimeGlobal.process.env = {};

 const target = runtimeGlobal.process.env;

 for (const [key, value] of Object.entries(workerEnv)) {
   if (typeof value === "string" && value) {
     target[key] = value;
   }
 }

 for (const key of runtimeEnvKeys) {
   const value = workerEnv[key];
   if (typeof value === "string" && value) {
     target[key] = value;
   }
 }
}

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

export default {
 async fetch(request: Request, env: unknown, ctx: unknown) {
   hydrateProcessEnvFromWorkerEnv(env);

   try {
     const m = await import("@tanstack/react-start/server-entry");
     const handler = (m.default ?? m) as {
       fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
     };

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
