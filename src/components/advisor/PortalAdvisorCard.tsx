import * as React from "react";
import { AdvisorOrb } from "./AdvisorOrb";
import { FounderTwinPanel } from "./FounderTwinPanel";
import { Sparkles, ArrowRight } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getAdvisorContext } from "@/lib/advisor.functions";
import { STAGE_META, type StageKey } from "@/lib/case-stages";

export function PortalAdvisorCard() {
  const [open, setOpen] = React.useState(false);
  const fetchCtx = useServerFn(getAdvisorContext);
  const { data } = useQuery({
    queryKey: ["advisor-context"],
    queryFn: () => fetchCtx(),
    staleTime: 30_000,
  });

  const founder = data?.profile?.full_name || data?.profile?.email?.split("@")[0] || "Founder";
  const firstName = founder.split(" ")[0];
  const stage = (data?.case?.current_stage ?? "consultation") as StageKey;
  const stageLabel = STAGE_META[stage]?.label ?? "Consultation";
  const company = data?.case?.company_name || data?.client?.company_name;

  const greeting = data?.case
    ? `Welcome back, ${firstName}. ${company ? `Your ${company} file ` : "Your file "}is currently in ${stageLabel}. Ask me anything — next steps, banking options, timelines, or compliance.`
    : `Welcome ${firstName}. Let's get your UAE setup mapped out. Ask me about jurisdictions, costs, residency, or banking.`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative w-full text-left glass-strong rounded-3xl p-6 border border-primary/30 overflow-hidden hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_60px_oklch(0.66_0.22_285_/_0.25)]"
      >
        {/* ambient */}
        <div className="pointer-events-none absolute -top-20 -right-12 w-56 h-56 rounded-full bg-primary/30 blur-[100px] group-hover:bg-primary/40 transition" />
        <div className="pointer-events-none absolute -bottom-16 left-1/2 w-48 h-48 rounded-full bg-accent/20 blur-[100px]" />

        <div className="relative flex items-start gap-4">
          <AdvisorOrb size={64} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-primary/90">
              <Sparkles className="w-3 h-3" /> Founder Digital Twin™
            </div>
            <div className="font-display text-xl text-foreground mt-1">Your AI Advisor is online</div>
            <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{greeting}</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
              <span className="text-muted-foreground/60">·</span>
              <span className="text-muted-foreground">Memory engaged</span>
              <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
            </div>
          </div>
        </div>
      </button>

      <FounderTwinPanel
        open={open}
        onOpenChange={setOpen}
        greeting={greeting}
        founderName={founder}
        initialMessages={data?.messages?.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })) ?? []}
      />
    </>
  );
}
