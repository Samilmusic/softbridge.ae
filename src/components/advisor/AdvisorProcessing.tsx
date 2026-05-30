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
      {/* Premium light background — soft white-to-violet gradient with glass aurora */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #faf7ff 45%, #f3edff 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 600px at 18% 12%, rgba(167,139,250,0.22), transparent 60%), radial-gradient(700px 500px at 82% 88%, rgba(124,58,237,0.16), transparent 60%), radial-gradient(500px 400px at 50% 50%, rgba(196,181,253,0.18), transparent 65%)",
        }}
      />
      {/* Subtle grid for depth, very faint */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 70%)",
        }}
      />

      <div className="relative text-center max-w-2xl px-6">
        {/* scanning ring */}
        <div className="relative w-44 h-44 md:w-56 md:h-56 mx-auto">
          <div aria-hidden className="absolute inset-0 rounded-full border border-violet-300/40 bg-white/60 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(124,58,237,0.35)]" />
          <div aria-hidden className="absolute inset-3 rounded-full border border-violet-300/40" />
          <div aria-hidden className="absolute inset-6 rounded-full border border-violet-400/50" />
          <div
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(124,58,237,0.55) 80deg, transparent 160deg)",
              animation: "spin 2.4s linear infinite",
              WebkitMask: "radial-gradient(closest-side, transparent 60%, black 62%)",
              mask: "radial-gradient(closest-side, transparent 60%, black 62%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-[0.3em] text-violet-700/70">Soft Bridge</div>
              <div
                className="mt-1 text-2xl font-semibold"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#7c3aed 0%,#a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                AI
              </div>
            </div>
          </div>
          {/* orbiting dot */}
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            style={{ animation: "spin 4s linear infinite" }}
          >
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-violet-600 shadow-[0_0_16px_rgba(124,58,237,0.9)]" />
          </div>
        </div>

        <h2 className="mt-10 text-2xl md:text-3xl font-semibold text-slate-900">
          Analyzing Your Business Structure
          <span
            style={{
              backgroundImage: "linear-gradient(135deg,#7c3aed,#a78bfa)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            …
          </span>
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Cross-referencing jurisdictions, banking signals, compliance posture, and operational fit.
        </p>

        <ul className="mt-10 space-y-2 text-left max-w-md mx-auto">
          {STAGES.map((s, i) => {
            const done = i < active;
            const cur = i === active;
            return (
              <li
                key={s}
                className={`rounded-xl px-4 py-3 flex items-center gap-3 transition-all border bg-white/70 backdrop-blur-md shadow-[0_8px_24px_-16px_rgba(124,58,237,0.25)] ${
                  done
                    ? "border-emerald-300/70"
                    : cur
                    ? "border-violet-400/70"
                    : "border-violet-200/60 opacity-80"
                }`}
              >
                <span
                  className={`relative w-4 h-4 rounded-full flex items-center justify-center ${
                    done ? "bg-emerald-500" : cur ? "bg-violet-600" : "bg-slate-300"
                  }`}
                >
                  {cur && (
                    <span className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-60" />
                  )}
                  {done && <span className="text-[9px] text-white font-bold">✓</span>}
                </span>
                <span
                  className={`text-sm ${
                    cur
                      ? "text-slate-900 font-medium"
                      : done
                      ? "text-slate-800"
                      : "text-slate-600"
                  }`}
                >
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
