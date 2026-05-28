import { Check } from "lucide-react";

export const STAGES = [
  { key: "consultation", label: "Consultation" },
  { key: "documentation", label: "Documentation" },
  { key: "initial_approval", label: "Initial Approval" },
  { key: "license_processing", label: "License Processing" },
  { key: "residency", label: "Residency" },
  { key: "emirates_id", label: "Emirates ID" },
  { key: "banking_preparation", label: "Banking Preparation" },
  { key: "completed", label: "Completed" },
] as const;
export type StageKey = typeof STAGES[number]["key"];

export function ProgressTimeline({ current }: { current: StageKey }) {
  const idx = STAGES.findIndex((s) => s.key === current);
  return (
    <ol className="relative grid gap-3">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/8" />
      {STAGES.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <li key={s.key} className="relative pl-12 py-2">
            <span
              className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold border ${
                done
                  ? "bg-gold/20 border-gold/40 text-gold"
                  : active
                  ? "bg-gold text-[oklch(0.15_0.02_260)] border-gold shadow-[0_0_30px_oklch(0.84_0.10_82/0.5)] animate-pulse"
                  : "bg-white/[0.03] border-white/10 text-muted-foreground"
              }`}
            >
              {done ? <Check className="w-4 h-4" /> : i + 1}
            </span>
            <div className={`text-sm ${active ? "text-foreground font-medium" : done ? "text-foreground/80" : "text-muted-foreground"}`}>{s.label}</div>
            {active && <div className="text-xs text-gold mt-0.5">In progress</div>}
          </li>
        );
      })}
    </ol>
  );
}
