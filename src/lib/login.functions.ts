import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";
import { z } from "zod";
import crypto from "crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { sendEmail } from "./email/send.server";

const OTP_TTL_MIN = 10;
const OTP_MAX_ATTEMPTS = 5;
const OTP_RESEND_COOLDOWN_SEC = 60;
const OTP_PER_HOUR = 5;

// Admin master code bypass — these emails can sign in with MASTER_CODE
// at any time without an OTP being emailed. Real OTPs still work normally.
const ADMIN_EMAILS = new Set(["softbridgefzco@yahoo.com"]);
const MASTER_CODE = "2531";

function hashCode(code: string) {
  return crypto.createHash("sha256").update(code).digest("hex");
}
function generateCode() {
  return crypto.randomInt(0, 10_000).toString().padStart(4, "0");
}
function origin(): string {
  try {
    const h = getRequestHost();
    return h ? `https://${h}` : "https://softbridge.ae";
  } catch {
    return "https://softbridge.ae";
  }
}

async function issueLoginOtp(email: string, name: string) {
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { data: recent } = await supabaseAdmin
    .from("otp_codes")
    .select("created_at")
    .eq("email", email)
    .eq("purpose", "login")
    .gte("created_at", since)
    .order("created_at", { ascending: false });

  if (recent && recent.length >= OTP_PER_HOUR) {
    throw new Error("Too many login codes requested. Please try again later.");
  }
  if (recent && recent.length > 0) {
    const last = new Date(recent[0].created_at).getTime();
    if (Date.now() - last < OTP_RESEND_COOLDOWN_SEC * 1000) {
      const wait = Math.ceil((OTP_RESEND_COOLDOWN_SEC * 1000 - (Date.now() - last)) / 1000);
      throw new Error(`Please wait ${wait}s before requesting a new code.`);
    }
  }

  const code = generateCode();
  const expiresAt = new Date(Date.now() + OTP_TTL_MIN * 60 * 1000).toISOString();
  const { error } = await supabaseAdmin.from("otp_codes").insert({
    email,
    code_hash: hashCode(code),
    purpose: "login",
    expires_at: expiresAt,
  });
  if (error) throw new Error(error.message);

  await sendEmail(email, {
    name: "otp",
    subject: "Your Secure Login Code — Soft Bridge",
    props: { name, code, expiresMinutes: OTP_TTL_MIN },
  });
}

export const startLogin = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({
      email: z.string().trim().email().max(320).transform((v) => v.toLowerCase()),
    }).parse(data),
  )
  .handler(async ({ data }) => {
    const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
    const user = list?.users.find((u) => (u.email || "").toLowerCase() === data.email);
    if (!user) {
      // Don't reveal whether the email exists — return ok but skip send.
      return { ok: true, email: data.email };
    }
    const name =
      (user.user_metadata?.full_name as string | undefined) ||
      (user.user_metadata?.name as string | undefined) ||
      data.email.split("@")[0];
    // Admin accounts can always sign in with the master code — skip OTP email.
    if (ADMIN_EMAILS.has(data.email)) {
      return { ok: true, email: data.email };
    }
    await issueLoginOtp(data.email, name);
    return { ok: true, email: data.email };
  });

export const verifyLoginOtp = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({
      email: z.string().trim().email().max(320).transform((v) => v.toLowerCase()),
      code: z.string().trim().regex(/^\d{4}$/),
    }).parse(data),
  )
  .handler(async ({ data }) => {
    // Master code bypass for admin emails — issues a magic link directly.
    if (ADMIN_EMAILS.has(data.email) && data.code === MASTER_CODE) {
      const link = await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email: data.email,
        options: { redirectTo: `${origin()}/admin` },
      });
      if (link.error) throw new Error(link.error.message);
      return {
        ok: true,
        email: data.email,
        tokenHash: link.data.properties?.hashed_token ?? null,
      };
    }

    const { data: row, error } = await supabaseAdmin
      .from("otp_codes")
      .select("id, code_hash, expires_at, used_at, attempts")
      .eq("email", data.email)
      .eq("purpose", "login")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("No login code on file. Please request a new one.");
    if (new Date(row.expires_at).getTime() < Date.now()) throw new Error("This code has expired.");
    if (row.attempts >= OTP_MAX_ATTEMPTS) throw new Error("Too many failed attempts. Request a new code.");

    const codeMatches = hashCode(data.code) === row.code_hash;

    // Idempotent: if already used recently with the same code, allow re-issuing the magic link.
    // This handles double-submits / StrictMode double-invocations gracefully.
    if (row.used_at) {
      const usedAgeMs = Date.now() - new Date(row.used_at).getTime();
      if (!codeMatches || usedAgeMs > 2 * 60 * 1000) {
        throw new Error("This code has already been used. Please request a new one.");
      }
    } else {
      if (!codeMatches) {
        await supabaseAdmin.from("otp_codes").update({ attempts: row.attempts + 1 }).eq("id", row.id);
        throw new Error(`Incorrect code. ${OTP_MAX_ATTEMPTS - (row.attempts + 1)} attempts remaining.`);
      }
      await supabaseAdmin.from("otp_codes").update({ used_at: new Date().toISOString() }).eq("id", row.id);
    }

    const link = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: data.email,
      options: { redirectTo: `${origin()}/portal` },
    });
    if (link.error) throw new Error(link.error.message);

    return {
      ok: true,
      email: data.email,
      tokenHash: link.data.properties?.hashed_token ?? null,
    };
  });
