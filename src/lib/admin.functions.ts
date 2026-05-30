import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

async function assertStaff(supabase: any, userId: string) {
  const { data: roleRows } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  const roles = (roleRows ?? []).map((r: any) => r.role);
  if (!roles.includes("admin") && !roles.includes("consultant")) throw new Error("Forbidden");
}

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId, supabase } = context as { userId: string; supabase: any };
    await assertStaff(supabase, userId);

    const [
      casesRes,
      consultationsRes,
      quotesRes,
      onboardingRes,
      activityRes,
    ] = await Promise.all([
      supabaseAdmin.from("cases").select("id, company_name, current_stage, progress_percentage, status, updated_at").order("updated_at", { ascending: false }).limit(50),
      supabaseAdmin.from("consultations").select("*").order("created_at", { ascending: false }).limit(50),
      supabaseAdmin.from("quote_requests").select("*").order("created_at", { ascending: false }).limit(50),
      supabaseAdmin.from("onboarding_submissions").select("*").order("created_at", { ascending: false }).limit(50),
      supabaseAdmin.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(20),
    ]);

    const cases = casesRes.data ?? [];
    const consultations = consultationsRes.data ?? [];
    const quotes = quotesRes.data ?? [];
    const onboarding = onboardingRes.data ?? [];
    const activity = activityRes.data ?? [];

    const stats = {
      totalCases: cases.length,
      activeCases: cases.filter((c: any) => c.status === "active").length,
      pendingConsultations: consultations.filter((c: any) => c.status === "pending").length,
      totalConsultations: consultations.length,
      totalQuoteRequests: quotes.length,
      totalOnboarding: onboarding.length,
    };

    return { stats, cases, consultations, quotes, onboarding, activity };
  });
