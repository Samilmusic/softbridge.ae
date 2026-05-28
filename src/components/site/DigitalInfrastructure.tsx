import { Cpu, Workflow, BarChart3, Sparkles, Globe, Database } from "lucide-react";

export function DigitalInfrastructure() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/5 overflow-hidden">
      <div aria-hidden className="absolute -top-32 left-1/3 w-[600px] h-[600px] rounded-full bg-indigo-500/8 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-amber-400/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> Digital Infrastructure
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
            Technology That{" "}
            <span className="gradient-text">Compounds</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Beyond setup, we build the digital systems that turn operations into growth — modern
            websites, CRM and automation, advertising dashboards, AI workflows, and analytics
            that show you what's working.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            {[
              { icon: Globe, t: "Websites & Landing" },
              { icon: Database, t: "CRM & Pipelines" },
              { icon: Workflow, t: "Automations" },
              { icon: BarChart3, t: "Ad Dashboards" },
              { icon: Cpu, t: "AI Workflows" },
              { icon: Sparkles, t: "Analytics" },
            ].map((b) => (
              <div key={b.t} className="glass rounded-xl px-4 py-3 flex items-center gap-3 hover:border-gold/40 transition">
                <b.icon className="w-4 h-4 text-gold" />
                <span className="text-sm">{b.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Holographic dashboard */}
        <div className="lg:col-span-7 reveal" style={{ transitionDelay: "120ms" }}>
          <div className="relative">
            <div aria-hidden className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-amber-400/10 via-indigo-500/8 to-transparent blur-3xl" />

            <div className="relative glass-strong rounded-3xl p-6 md:p-7 overflow-hidden ring-glow">
              {/* scan line */}
              <div aria-hidden className="absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent animate-scan" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">infrastructure / overview</div>
                <div className="text-[10px] text-emerald-300/90">● realtime</div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { k: "Active Sites", v: "12", d: "+2" },
                  { k: "Pipelines", v: "38", d: "+11" },
                  { k: "Automations", v: "126", d: "+19" },
                ].map((s) => (
                  <div key={s.k} className="glass rounded-xl p-4">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{s.k}</div>
                    <div className="mt-1 flex items-end gap-2">
                      <div className="text-2xl font-semibold">{s.v}</div>
                      <div className="text-[11px] text-emerald-300/90 mb-1">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* chart */}
              <div className="mt-5 glass rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Lead Quality Index</div>
                    <div className="text-xl font-semibold gold-text-gradient">+42% MoM</div>
                  </div>
                  <div className="flex gap-1.5 text-[10px] text-muted-foreground">
                    {["1W","1M","3M","1Y"].map((t,i) => (
                      <span key={t} className={`px-2 py-0.5 rounded-md ${i===1 ? "bg-white/10 text-foreground" : ""}`}>{t}</span>
                    ))}
                  </div>
                </div>
                <svg viewBox="0 0 600 140" className="mt-3 w-full h-32">
                  <defs>
                    <linearGradient id="chartArea" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.84 0.10 82)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="oklch(0.84 0.10 82)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g stroke="oklch(1 0 0 / 0.08)" strokeWidth="0.5">
                    {[0,1,2,3,4].map((i) => <line key={i} x1="0" x2="600" y1={i*30} y2={i*30} />)}
                  </g>
                  <path
                    d="M0,110 C40,100 80,90 120,80 C160,70 200,86 240,72 C280,56 320,64 360,42 C400,22 440,36 480,28 C520,22 560,14 600,8 L600,140 L0,140 Z"
                    fill="url(#chartArea)"
                  />
                  <path
                    d="M0,110 C40,100 80,90 120,80 C160,70 200,86 240,72 C280,56 320,64 360,42 C400,22 440,36 480,28 C520,22 560,14 600,8"
                    fill="none"
                    stroke="oklch(0.92 0.06 86)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {[[120,80],[240,72],[360,42],[480,28],[600,8]].map(([x,y]) => (
                    <circle key={`${x}`} cx={x} cy={y} r="3" fill="oklch(0.92 0.06 86)" />
                  ))}
                </svg>
              </div>

              {/* automation chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {["lead → CRM", "form → WhatsApp", "renewal reminders", "doc OCR", "AI follow-up", "report digest"].map((t) => (
                  <span key={t} className="glass rounded-full px-3 py-1 text-[11px] text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
