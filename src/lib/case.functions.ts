import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { getRequestHost } from "@tanstack/react-start/server";
import { sendEmail } from "./email/send.server";
import { STAGE_META, type StageKey, type StageStatus } from "./case-stages";

export const getMyCase = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context as { supabase: any; userId: string };
    const { data: client } = await supabase.from("clients").select("*").eq("user_id", userId).maybeSingle();
    if (!client) return { client: null, case: null, stages: [], activity: [], documents: [], quotes: [] };

    const { data: cas } = await supabase.from("cases").select("*").eq("client_id", client.id).maybeSingle();
    if (!cas) return { client, case: null, stages: [], activity: [], documents: [], quotes: [] };

    const [{ data: stages }, { data: activity }, { data: documents }, { data: quotes }] = await Promise.all([
      supabase.from("case_stages").select("*").eq("case_id", cas.id).order("position"),
      supabase.from("activity_logs").select("*").eq("case_id", cas.id).order("created_at", { ascending: false }).limit(50),
      supabase.from("documents").select("*").eq("case_id", cas.id).order("created_at"),
      supabase.from("quotes").select("*").eq("client_id", client.id).order("created_at", { ascending: false }),
    ]);

    return {
      client,
      case: cas,
      stages: stages ?? [],
      activity: activity ?? [],
      documents: documents ?? [],
      quotes: quotes ?? [],
    };
  });

const updateStageSchema = z.object({
  caseId: z.string().uuid(),
  stageKey: z.string().min(1).max(60),
  status: z.enum(["not_started","in_progress","waiting_client","under_review","completed","issue"]),
  publicNote: z.string().max(2000).optional().or(z.literal("")),
  internalNote: z.string().max(4000).optional().or(z.literal("")),
  sendEmail: z.boolean().default(true),
});

export const updateStage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => updateStageSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { userId, supabase } = context as { userId: string; supabase: any };

    // Must be admin or consultant
    const { data: roleRows } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    const roles = (roleRows ?? []).map((r: any) => r.role);
    if (!roles.includes("admin") && !roles.includes("consultant")) {
      throw new Error("Forbidden");
    }

    const { error: upErr } = await supabaseAdmin
      .from("case_stages")
      .update({
        status: data.status as StageStatus,
        public_note: data.publicNote || null,
        internal_note: data.internalNote || null,
        started_at: data.status === "in_progress" ? new Date().toISOString() : undefined,
      })
      .eq("case_id", data.caseId)
      .eq("stage_key", data.stageKey as any);
    if (upErr) throw new Error(upErr.message);

    if (data.sendEmail) {
      const { data: cas } = await supabaseAdmin
        .from("cases")
        .select("id, client_id")
        .eq("id", data.caseId)
        .maybeSingle();

      const { data: clientRow } = cas?.client_id
        ? await supabaseAdmin
            .from("clients")
            .select("user_id, company_name")
            .eq("id", cas.client_id)
            .maybeSingle()
        : { data: null as any };


      const { data: profile } = clientRow?.user_id
        ? await supabaseAdmin.from("profiles").select("email, full_name").eq("id", clientRow.user_id).maybeSingle()
        : { data: null as any };

      if (profile?.email) {
        const meta = STAGE_META[data.stageKey as StageKey];
        let host = "";
        try { host = getRequestHost(); } catch { /* noop */ }
        const portalUrl = host ? `https://${host}/portal` : "https://softbridgefze.com/portal";

        // Find next non-completed stage label
        const { data: nextStage } = await supabaseAdmin
          .from("case_stages").select("stage_key").eq("case_id", data.caseId)
          .neq("status","completed").order("position").limit(1).maybeSingle();
        const nextLabel = nextStage ? STAGE_META[nextStage.stage_key as StageKey].label : "Lifetime Support";

        try {
          await sendEmail(profile.email, {
            name: "status_update",
            subject: `Update: ${meta?.label ?? data.stageKey}`,
            props: {
              name: profile.full_name || "there",
              stageLabel: meta?.label ?? data.stageKey,
              completed: data.status === "completed" ? meta?.short : undefined,
              nextStep: nextLabel,
              note: data.publicNote || undefined,
              portalUrl,
            },
          }, { caseId: data.caseId, clientId: clientRow?.user_id });
        } catch (e) { console.error("status email failed", e); }
      }
    }

    return { ok: true };
  });

export const listAllCases = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId, supabase } = context as { userId: string; supabase: any };
    const { data: roleRows } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    const roles = (roleRows ?? []).map((r: any) => r.role);
    if (!roles.includes("admin") && !roles.includes("consultant")) throw new Error("Forbidden");

    const { data } = await supabaseAdmin
      .from("cases")
      .select("id, company_name, current_stage, progress_percentage, status, assigned_consultant, updated_at, client_id, clients:client_id(user_id, company_name)")
      .order("updated_at", { ascending: false });
    return { cases: data ?? [] };
  });
