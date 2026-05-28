import * as React from "react";
import { cn } from "@/lib/utils";

interface AdvisorOrbProps {
  size?: number;
  active?: boolean;
  className?: string;
}

/** Glowing holographic AI orb — premium AI assistant signature visual. */
export function AdvisorOrb({ size = 56, active = true, className }: AdvisorOrbProps) {
  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* outer halo */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-70 animate-pulse"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.74 0.18 290 / 0.8), oklch(0.66 0.22 285 / 0.4) 45%, transparent 70%)",
        }}
      />
      {/* core */}
      <div
        className="absolute inset-[15%] rounded-full overflow-hidden border border-white/20 shadow-[inset_0_0_20px_oklch(1_0_0_/_0.18)]"
        style={{
          background:
            "conic-gradient(from 220deg, oklch(0.74 0.18 290) 0%, oklch(0.55 0.20 280) 30%, oklch(0.82 0.14 290) 55%, oklch(0.66 0.22 285) 80%, oklch(0.74 0.18 290) 100%)",
        }}
      >
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "8s", background: "conic-gradient(transparent, oklch(1 0 0 / 0.18), transparent 60%)" }}
        />
        <div className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle_at_30%_25%,oklch(1_0_0_/_0.65),transparent_55%)]" />
      </div>
      {/* status dot */}
      {active && (
        <span
          className="absolute right-0 bottom-0 block rounded-full bg-emerald-400 ring-2 ring-background animate-pulse"
          style={{ width: size * 0.18, height: size * 0.18 }}
        />
      )}
    </div>
  );
}
