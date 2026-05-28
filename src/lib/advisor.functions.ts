import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getAdvisorContext = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const userId = context.userId;

    const [profileRes, clientRes, convRes] = await Promise.all([
      supabaseAdmin.from("profiles").select("full_name,email").eq("id", userId).maybeSingle(),
      supabaseAdmin.from("clients").select("id,company_name,stage").eq("user_id", userId).maybeSingle(),
      supabaseAdmin.from("ai_conversations").select("id").eq("user_id", userId).order("updated_at", { ascending: false }).limit(1).maybeSingle(),
    ]);

    let cas: any = null;
    let messages: { role: string; content: string; created_at: string }[] = [];

    if (clientRes.data?.id) {
      const { data } = await supabaseAdmin
        .from("cases")
        .select("id,company_name,jurisdiction,current_stage,progress_percentage,assigned_consultant")
        .eq("client_id", clientRes.data.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      cas = data;
    }

    if (convRes.data?.id) {
      const { data } = await supabaseAdmin
        .from("ai_messages")
        .select("role,content,created_at")
        .eq("conversation_id", convRes.data.id)
        .order("created_at", { ascending: true })
        .limit(50);
      messages = data ?? [];
    }

    return {
      profile: profileRes.data,
      client: clientRes.data,
      case: cas,
      messages,
    };
  });
