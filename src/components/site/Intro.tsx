import { Building2, Globe2 } from "lucide-react";

export function Intro() {
  return (
    <section className="relative py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> One Strategic Bridge
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.1]">
            From Company Setup to{" "}
            <span className="gradient-text">Digital Growth</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
            Company formation, residency support, banking preparation, web development, and
            advertising — all aligned under one strategic bridge.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 reveal">
          {[
            { icon: Building2, title: "Formation & Compliance", text: "Licensing, residency, banking, and AML readiness handled with regulatory clarity." },
            { icon: Globe2, title: "Digital Growth", text: "Websites, landing pages, and performance ads designed to convert and scale." },
          ].map((c) => (
            <div key={c.title} className="glass rounded-2xl p-6 hover:border-white/20 transition">
              <div className="w-11 h-11 rounded-xl glass flex items-center justify-center mb-4">
                <c.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
