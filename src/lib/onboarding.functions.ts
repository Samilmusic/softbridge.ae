import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";
import { z } from "zod";
import crypto from "crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { sendEmail } from "./email/send.server";


const OTP_TTL_MIN = 10;
const OTP_MAX_ATTEMPTS = 5;
const OTP_RESEND_COOLDOWN_SEC = 60;
const OTP_PER_HOUR = 5;

function hashCode(code: string) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

function generateCode() {
  // 4-digit, leading zeros allowed
  const n = crypto.randomInt(0, 10_000);
  return n.toString().padStart(4, "0");
}

function originFromRequest(): string {
  try {
    const host = getRequestHost();
    return host ? `https://${host}` : "https://softbridge.ae";
  } catch {
    return "https://softbridge.ae";
  }
}

const step1Schema = z.object({
  fullName: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320).transform((v) => v.toLowerCase()),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  nationality: z.string().trim().min(1).max(100),
});

const internalEmail = "info@softbridge.ae";

async function issueOtp(email: string, name: string) {
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { data: recent } = await supabaseAdmin
    .from("otp_codes")
    .select("created_at")
    .eq("email", email)
    .eq("purpose", "onboarding")
    .gte("created_at", since)
    .order("created_at", { ascending: false });

  if (recent && recent.length >= OTP_PER_HOUR) {
    throw new Error("Too many verification codes requested. Please try again later.");
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
    purpose: "onboarding",
    expires_at: expiresAt,
  });
  if (error) throw new Error(error.message);

  await sendEmail(email, {
    name: "otp",
    subject: "Your Soft Bridge verification code",
    props: { name, code, expiresMinutes: OTP_TTL_MIN },
  });
}

// 1. Step 1 — create/update submission & send OTP
export const startOnboarding = createServerFn({ method: "POST" })
  .inputValidator((data) => step1Schema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("onboarding_submissions")
      .upsert(
        {
          email: data.email,
          full_name: data.fullName,
          whatsapp: data.whatsapp || null,
          nationality: data.nationality,
          status: "draft",
        },
        { onConflict: "email" },
      );
    if (error) throw new Error(error.message);

    await issueOtp(data.email, data.fullName);
    return { ok: true, email: data.email };
  });

// 2. Resend
export const resendOnboardingOtp = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ email: z.string().trim().email().max(320).transform((v) => v.toLowerCase()) }).parse(data))
  .handler(async ({ data }) => {
    const { data: sub } = await supabaseAdmin
      .from("onboarding_submissions")
      .select("full_name, email")
      .eq("email", data.email)
      .maybeSingle();
    if (!sub) throw new Error("Please start the onboarding from the beginning.");
    await issueOtp(sub.email, sub.full_name);
    return { ok: true };
  });

// 3. Verify OTP — creates auth user (idempotent), returns magic-link tokens
const verifySchema = z.object({
  email: z.string().trim().email().max(320).transform((v) => v.toLowerCase()),
  code: z.string().trim().regex(/^\d{4}$/),
});

export const verifyOnboardingOtp = createServerFn({ method: "POST" })
  .inputValidator((data) => verifySchema.parse(data))
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("otp_codes")
      .select("id, code_hash, expires_at, used_at, attempts")
      .eq("email", data.email)
      .eq("purpose", "onboarding")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) return { ok: false as const, error: error.message };
    if (!row) return { ok: false as const, error: "No verification code on file. Please request a new one." };
    if (row.used_at) return { ok: false as const, error: "This code has already been used. Request a new one." };
    if (new Date(row.expires_at).getTime() < Date.now()) {
      return { ok: false as const, error: "This code has expired. Request a new one." };
    }
    if (row.attempts >= OTP_MAX_ATTEMPTS) {
      return { ok: false as const, error: "Too many failed attempts. Request a new code." };
    }

    const expected = row.code_hash;
    const got = hashCode(data.code);
    if (got !== expected) {
      await supabaseAdmin.from("otp_codes").update({ attempts: row.attempts + 1 }).eq("id", row.id);
      return { ok: false as const, error: `Incorrect code. ${OTP_MAX_ATTEMPTS - (row.attempts + 1)} attempts remaining.` };
    }

    // Mark used
    await supabaseAdmin.from("otp_codes").update({ used_at: new Date().toISOString() }).eq("id", row.id);

    // Load submission
    const { data: sub } = await supabaseAdmin
      .from("onboarding_submissions")
      .select("*")
      .eq("email", data.email)
      .maybeSingle();
    if (!sub) throw new Error("Onboarding record missing. Please start again.");

    // Create or fetch auth user (idempotent)
    const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
    let user = list?.users.find((u) => (u.email || "").toLowerCase() === data.email);
    if (!user) {
      const created = await supabaseAdmin.auth.admin.createUser({
        email: data.email,
        email_confirm: true,
        user_metadata: {
          full_name: sub.full_name,
          phone: sub.whatsapp,
          company_name: "My Company",
        },
      });
      if (created.error) throw new Error(created.error.message);
      user = created.data.user!;
    }

    // Patch submission
    await supabaseAdmin
      .from("onboarding_submissions")
      .update({ status: "verified", user_id: user.id })
      .eq("id", sub.id);

    // Generate a magic link the client can verify to establish a session
    const redirectTo = `${originFromRequest()}/portal`;
    const link = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: data.email,
      options: { redirectTo },
    });
    if (link.error) throw new Error(link.error.message);

    return {
      ok: true,
      email: data.email,
      // Returned so the client can call supabase.auth.verifyOtp() to establish a session
      // without a second email round trip.
      tokenHash: link.data.properties?.hashed_token ?? null,
      actionLink: link.data.properties?.action_link ?? null,
    };
  });

// 4. Complete onboarding (auth required)
const completeSchema = z.object({
  businessActivity: z.string().trim().max(500).optional().or(z.literal("")),
  preferredJurisdiction: z.string().trim().max(120).optional().or(z.literal("")),
  numberOfVisas: z.number().int().min(0).max(50).default(0),
  residencyRequired: z.enum(["yes", "no", "later"]).optional(),
  bankAccountRequired: z.enum(["yes", "no", "not_sure"]).optional(),
  taxRegistrationRequired: z.enum(["yes", "no"]).optional(),
  websiteRequired: z.boolean().optional(),
  officeRequirement: z.enum(["flexi_desk", "ejari", "physical_office", "not_sure"]).optional(),
  setupGoals: z.array(z.string().trim().max(80)).max(2).default([]),
});




export const completeOnboarding = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => completeSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { userId, claims } = context;
    const email = (claims?.email as string | undefined)?.toLowerCase();
    if (!email) throw new Error("Missing email on session");

    // Update onboarding row
    const { data: sub } = await supabaseAdmin
      .from("onboarding_submissions")
      .update({
        business_activity: data.businessActivity || null,
        preferred_jurisdiction: data.preferredJurisdiction || null,
        number_of_visas: data.numberOfVisas,
        residency_required: data.residencyRequired ?? null,
        bank_account_required: data.bankAccountRequired ?? null,
        tax_registration_required: data.taxRegistrationRequired ?? null,
        website_required: data.websiteRequired ?? null,
        office_requirement: data.officeRequirement ?? null,
        setup_goals: data.setupGoals,
        status: "completed",
        user_id: userId,
      })
      .eq("email", email)
      .select("*")
      .maybeSingle();

    // Patch client + case
    const { data: client } = await supabaseAdmin
      .from("clients")
      .select("id, company_name")
      .eq("user_id", userId)
      .maybeSingle();

    if (client) {
      await supabaseAdmin
        .from("clients")
        .update({
          notes: [
            data.businessActivity && `Activity: ${data.businessActivity}`,
            data.preferredJurisdiction && `Jurisdiction: ${data.preferredJurisdiction}`,
            data.setupGoals.length > 0 && `Goals: ${data.setupGoals.join(", ")}`,
          ].filter(Boolean).join(" · ") || null,
        })
        .eq("id", client.id);

      await supabaseAdmin
        .from("cases")
        .update({
          business_activity: data.businessActivity || null,
          jurisdiction: data.preferredJurisdiction || null,
          expected_next_step: data.setupGoals.length > 0
            ? `Priorities: ${data.setupGoals.join(", ")}`
            : null,
        })
        .eq("client_id", client.id);

      if (sub) {
        await supabaseAdmin
          .from("onboarding_submissions")
          .update({ client_id: client.id })
          .eq("id", sub.id);
      }
    }

    const portalUrl = `${originFromRequest()}/portal`;
    const bookingUrl = `${originFromRequest()}/#contact`;

    // Send branded confirmations (best-effort)
    try {
      await sendEmail(email, {
        name: "setup_received",
        subject: "We Received Your UAE Business Setup Request",
        props: {
          name: sub?.full_name || "there",
          jurisdiction: data.preferredJurisdiction || undefined,
          activity: data.businessActivity || undefined,
          visas: data.numberOfVisas,
          goals: data.setupGoals,
          portalUrl,
          bookingUrl,
        },
      });
    } catch (e) {
      console.error("setup_received email failed", e);
    }
    try {
      await sendEmail(email, {
        name: "welcome_magic_link",
        subject: "Welcome to Your Soft Bridge Client Portal",
        props: { name: sub?.full_name || "there", magicLink: portalUrl },
      });
    } catch (e) {
      console.error("welcome email failed", e);
    }
    try {
      await sendEmail(internalEmail, {
        name: "internal_setup_notice",
        subject: "New Setup Request Submitted",
        props: {
          name: sub?.full_name || "Unknown",
          email,
          whatsapp: sub?.whatsapp || undefined,
          nationality: sub?.nationality || undefined,
          activity: data.businessActivity || undefined,
          jurisdiction: data.preferredJurisdiction || undefined,
          visas: data.numberOfVisas,
          residency: data.residencyRequired,
          bank: data.bankAccountRequired,
          tax: data.taxRegistrationRequired,
          office: data.officeRequirement,
          website: data.websiteRequired,
          goals: data.setupGoals,
        },
      });
    } catch (e) {
      console.error("internal notice email failed", e);
    }

    return { ok: true };
  });
