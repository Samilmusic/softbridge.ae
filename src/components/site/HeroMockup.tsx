import { Building2, Landmark, Globe, ShieldCheck, CheckCircle2 } from "lucide-react";

export function HeroMockup() {
  return (
    <div className="relative w-full">
      {/* outer glow / floor */}
      <div aria-hidden className="absolute -inset-10 rounded-[3rem] bg-gradient-to-br from-amber-400/10 via-indigo-500/5 to-transparent blur-3xl" />
      <div aria-hidden className="absolute inset-x-10 -bottom-10 h-20 bg-gradient-to-t from-amber-400/15 to-transparent blur-2xl rounded-full" />

      <div className="relative animate-float-soft">
        {/* main dashboard card */}
        <div className="glass-strong rounded-2xl p-5 ring-glow overflow-hidden">
          {/* topbar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400/70" />
              <span className="w-2 h-2 rounded-full bg-amber-400/70" />
              <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">softbridge.os / setup</div>
            <div className="text-[10px] text-gold">● live</div>
          </div>

          {/* setup pipeline */}
          <div className="mt-4 space-y-2.5">
            {[
              { icon: Building2, label: "Company Formation", state: "Done", pct: 100 },
              { icon: ShieldCheck, label: "AML & Compliance", state: "Done", pct: 100 },
              { icon: Landmark, label: "Banking Preparation", state: "In review", pct: 72 },
              { icon: Globe, label: "Website Launch", state: "Building", pct: 48 },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3 glass rounded-lg px-3 py-2.5">
                <div className="w-7 h-7 rounded-md glass flex items-center justify-center flex-shrink-0">
                  <row.icon className="w-3.5 h-3.5 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[12px] font-medium truncate">{row.label}</div>
                    <div className={`text-[10px] ${row.pct === 100 ? "text-emerald-300/90" : "text-muted-foreground"}`}>
                      {row.state}
                    </div>
                  </div>
                  <div className="mt-1.5 h-1 rounded-full bg-white/8 overflow-hidden">
                    <div
                      className="h-full gold-gradient"
                      style={{ width: `${row.pct}%`, transition: "width 1s ease" }}
                    />
                  </div>
                </div>
                {row.pct === 100 && <CheckCircle2 className="w-4 h-4 text-emerald-300/80" />}
              </div>
            ))}
          </div>

          {/* metric strip */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { k: "Setup", v: "Day 7/14" },
              { k: "Docs", v: "12/12" },
              { k: "Status", v: "On track" },
            ].map((m, i) => (
              <div key={i} className="glass rounded-lg p-2.5">
                <div className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{m.k}</div>
                <div className="mt-0.5 text-[13px] font-semibold">{m.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* floating sub-card: approval */}
        <div className="hidden sm:block absolute -left-16 md:-left-24 lg:-left-32 -bottom-10 w-56 glass-strong rounded-xl p-4 shadow-2xl animate-float-soft" style={{ animationDelay: "1.4s" }}>
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Authority Approval</div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
          </div>
          <div className="mt-2 text-sm font-semibold">License #BR-04822</div>
          <div className="mt-1 text-[11px] text-emerald-300/90">Approved · 02 min ago</div>
        </div>

        {/* floating sub-card: KPI */}
        <div className="absolute -right-4 md:-right-8 -top-8 w-52 glass-strong rounded-xl p-4 shadow-2xl animate-float-soft" style={{ animationDelay: "0.6s" }}>
          <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Ad Performance</div>
          <div className="mt-1 flex items-end gap-2">
            <div className="text-xl font-semibold gold-text-gradient">+38%</div>
            <div className="text-[10px] text-muted-foreground mb-1">qualified leads / mo</div>
          </div>
          <svg viewBox="0 0 120 32" className="mt-2 w-full h-8">
            <path
              d="M0,24 L15,20 L30,22 L45,14 L60,16 L75,8 L90,12 L105,4 L120,6"
              fill="none"
              stroke="oklch(0.84 0.10 82)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
