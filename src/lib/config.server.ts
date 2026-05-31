import process from "node:process";

type RuntimeGlobal = typeof globalThis & {
  __env__?: Record<string, unknown>;
  __cf_env__?: Record<string, unknown>;
  env?: Record<string, unknown>;
};

function getRuntimeEnv(key: string): string | undefined {
  return (
    process.env?.[key] ||
    (globalThis as RuntimeGlobal).__cf_env__?.[key]?.toString() ||
    (globalThis as RuntimeGlobal).__env__?.[key]?.toString() ||
    (globalThis as RuntimeGlobal).env?.[key]?.toString()
  );
}

export function getServerConfig() {
  return {
    nodeEnv: getRuntimeEnv("NODE_ENV"),
    supabaseUrl: getRuntimeEnv("SUPABASE_URL"),
    supabaseServiceRoleKey: getRuntimeEnv("SUPABASE_SERVICE_ROLE_KEY"),
    supabasePublishableKey: getRuntimeEnv("SUPABASE_PUBLISHABLE_KEY"),
    resendApiKey: getRuntimeEnv("RESEND_API_KEY"),
    resendFromEmail: getRuntimeEnv("RESEND_FROM_EMAIL"),
  };
}

export { getRuntimeEnv };
