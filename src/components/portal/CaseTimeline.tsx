import { Check, Clock, AlertTriangle, Loader2, Hourglass, ShieldCheck } from "lucide-react";
import { STAGE_LIST, type StageStatus, statusColor, statusLabel } from "@/lib/case-stages";

interface StageRow {
  stage_key: string;
  status: StageStatus;
  public_note: string | null;
  completed_at: string | null;
  client_action_required: string | null;
}

function statusIcon(s: StageStatus) {
  switch (s) {
    case "completed": return <Check className="w-3.5 h-3.5" />;
    case "in_progress": return <Loader2 className="w-3.5 h-3.5 animate-spin" />;
    case "waiting_client": return <Hourglass className="w-3.5 h-3.5" />;
    case "under_review": return <ShieldCheck className="w-3.5 h-3.5" />;
    case "issue": return <AlertTriangle className="w-3.5 h-3.5" />;
    default: return <Clock className="w-3.5 h-3.5" />;
  }
}

export function CaseTimeline({ stages }: { stages: StageRow[] }) {
  const byKey = new Map(stages.map((s) => [s.stage_key, s]));

  return (
    <ol className="relative grid gap-1">
      <div className="absolute left-[15px] top-3 bottom-3 w-px bg-white/8" />
      {STAGE_LIST.map((meta, i) => {
        const row = byKey.get(meta.key);
        const status: StageStatus = (row?.status as StageStatus) ?? "not_started";
        const color = statusColor(status);
        const active = status === "in_progress" || status === "waiting_client" || status === "under_review" || status === "issue";

        return (
          <li key={meta.key} className="relative pl-12 py-2.5">
            <span
              className={`absolute left-0 top-3 w-8 h-8 rounded-full flex items-center justify-center border ${color} ${
                active ? "shadow-[0_0_24px_-4px_currentColor]" : ""
              }`}
            >
              <span className="text-[11px] font-bold">{status === "completed" ? <Check className="w-4 h-4" /> : i + 1}</span>
            </span>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <div className={`text-sm font-medium ${status === "not_started" ? "text-muted-foreground" : "text-foreground"}`}>{meta.label}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{meta.short}</div>
              </div>
              <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${color}`}>
                {statusIcon(status)}{statusLabel(status)}
              </span>
            </div>
            {row?.public_note && (
              <p className="text-xs text-muted-foreground/90 mt-1.5 ml-0">{row.public_note}</p>
            )}
            {row?.client_action_required && status === "waiting_client" && (
              <div className="mt-2 text-xs text-amber-300 bg-amber-300/5 border border-amber-300/20 rounded-lg px-3 py-2">
                Action needed: {row.client_action_required}
              </div>
            )}
            {row?.completed_at && status === "completed" && (
              <p className="text-[10px] text-muted-foreground mt-1">Completed {new Date(row.completed_at).toLocaleDateString()}</p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
