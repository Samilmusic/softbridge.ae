import { useEffect, useState } from "react";

const STAGES = [
  "Reviewing business model",
  "Evaluating banking suitability",
  "Comparing UAE jurisdictions",
  "Calculating operational efficiency",
  "Generating recommendation",
];

export function AdvisorProcessing({ onDone }: { onDone: () => void }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    STAGES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setActive(i + 1), (i + 1) * 600));
    });
    timers.push(window.setTimeout(onDone, STAGES.length * 600 + 700));
    return () => timers.forEach((t) => clearTimeout(t));
  }, [onDone]);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* AI background */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.20_0.04_260)_0%,transparent_70%)]" />
        <svg className="absolute inset-0 w-full h-full opacity-25" preserveAspectRatio="none" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="netLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.84 0.10 82)" stopOpacity="0.0" />
              <stop offset="50%" stopColor="oklch(0.84 0.10 82)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="oklch(0.55 0.16 250)" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1={0} y1={50 + i * 50} x2={1200} y2={80 + i * 55} stroke="url(#netLine)" strokeWidth="0.6" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`v${i}`} x1={80 + i * 80} y1={0} x2={100 + i * 78} y2={800} stroke="url(#netLine)" strokeWidth="0.4" />
          ))}
        </svg>

        {/* particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              background: "oklch(0.84 0.10 82)",
              opacity: 0.5,
              boxShadow: "0 0 8px oklch(0.84 0.10 82 / 0.7)",
              animation: `pulse-soft ${2 + (i % 4)}s ease-in-out ${i * 0.1}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative text-center max-w-2xl px-6">
        {/* scanning ring */}
        <div className="relative w-44 h-44 md:w-56 md:h-56 mx-auto">
          <div aria-hidden className="absolute inset-0 rounded-full border border-white/10" />
          <div aria-hidden className="absolute inset-3 rounded-full border border-white/15" />
          <div aria-hidden className="absolute inset-6 rounded-full border border-gold/30" />
          <div
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent 0deg, oklch(0.84 0.10 82 / 0.5) 80deg, transparent 160deg)",
              animation: "spin 2.4s linear infinite",
              WebkitMask: "radial-gradient(closest-side, transparent 60%, black 62%)",
              mask: "radial-gradient(closest-side, transparent 60%, black 62%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Soft Bridge</div>
              <div className="mt-1 text-2xl font-semibold gold-text-gradient">AI</div>
            </div>
          </div>
          {/* orbiting dot */}
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            style={{ animation: "spin 4s linear infinite" }}
          >
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_16px_oklch(0.84_0.10_82/0.9)]" />
          </div>
        </div>

        <h2 className="mt-10 text-2xl md:text-3xl font-semibold">
          Analyzing Your Business Structure<span className="gold-text-gradient">…</span>
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Cross-referencing jurisdictions, banking signals, compliance posture, and operational fit.
        </p>

        <ul className="mt-10 space-y-2 text-left max-w-md mx-auto">
          {STAGES.map((s, i) => {
            const done = i < active;
            const cur = i === active;
            return (
              <li
                key={s}
                className={`glass rounded-xl px-4 py-3 flex items-center gap-3 transition-all ${
                  done ? "border-emerald-300/30" : cur ? "border-gold/40" : "opacity-60"
                }`}
              >
                <span className={`relative w-4 h-4 rounded-full flex items-center justify-center ${
                  done ? "bg-emerald-400/90" : cur ? "bg-gold" : "bg-white/15"
                }`}>
                  {cur && <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-60" />}
                  {done && <span className="text-[9px] text-[oklch(0.15_0.02_260)] font-bold">✓</span>}
                </span>
                <span className={`text-sm ${cur ? "text-foreground" : done ? "text-foreground/80" : "text-muted-foreground"}`}>
                  {s}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
