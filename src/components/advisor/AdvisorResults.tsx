import { useState } from "react";
import { Award, Download, ArrowLeft, MessageCircle, Send, Sparkles, Landmark, ShieldCheck, IdCard, TrendingUp, Wallet, MapPin } from "lucide-react";
import type { Answers, Recommendation } from "@/lib/advisor";
import { bankingLabel, complianceLabel, visaLabel } from "@/lib/advisor";
import { buildAdvisorPdf } from "@/lib/advisor-pdf";
import { WA_LINK, SITE } from "@/lib/site";
import { toast } from "sonner";
import { PhoneField } from "@/components/ui/phone-field";

interface Props {
  answers: Answers;
  recs: Recommendation[];
  onRestart: () => void;
}

export function AdvisorResults({ answers, recs, onRestart }: Props) {
  const top = recs[0];
  const alts = recs.slice(1, 3);
  const [form, setForm] = useState({ name: "", email: "", phone: "", activity: "" });

  const downloadPdf = () => {
    const pdf = buildAdvisorPdf(answers, recs);
    pdf.save(`SoftBridge_Setup_Report_${top.jurisdiction.id}.pdf`);
    toast.success("Your setup report is downloading.");
  };

  const requestConsult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }
    const text =
      `Hello Soft Bridge,%0A%0AI completed the AI Structure Advisor and would like a human review.` +
      `%0A%0ARecommended structure: ${top.jurisdiction.name} (${top.confidence}% match)` +
      `%0AName: ${encodeURIComponent(form.name)}` +
      `%0AEmail: ${encodeURIComponent(form.email)}` +
      `%0AWhatsApp: ${encodeURIComponent(form.phone)}` +
      `%0AActivity: ${encodeURIComponent(form.activity)}`;
    window.open(`https://wa.me/${SITE.phoneRaw}?text=${text}`, "_blank");
    toast.success("Opening WhatsApp to send your request…");
  };

  return (
    <section className="relative pt-28 pb-24 overflow-hidden">
      {/* bg */}
      <div aria-hidden className="absolute inset-0 grid-pattern opacity-[0.10] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div aria-hidden className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full bg-gradient-to-br from-amber-500/12 via-indigo-500/8 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold">
              <Sparkles className="w-3.5 h-3.5" /> AI Analysis Complete
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-[1.05]">
              Your Recommended <span className="gradient-text">UAE Structure</span>
            </h1>
          </div>
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-2.5 text-sm hover:border-gold/40 transition"
          >
            <ArrowLeft className="w-4 h-4" /> New analysis
          </button>
        </div>

        {/* Main recommendation card */}
        <div className="mt-10 relative glass-strong rounded-3xl p-7 md:p-10 ring-1 ring-gold/40 overflow-hidden shadow-[0_40px_120px_-40px_oklch(0.84_0.10_82/0.45)]">
          <div aria-hidden className="absolute -inset-1 rounded-3xl opacity-60"
               style={{ background: "radial-gradient(800px circle at 0% 0%, oklch(0.84 0.10 82 / 0.12), transparent 50%)" }} />
          <div className="relative grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] gold-gradient text-[oklch(0.15_0.02_260)] px-3 py-1 rounded-full font-semibold">
                <Award className="w-3.5 h-3.5" /> Recommended
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-semibold gold-text-gradient">{top.jurisdiction.name}</h2>
              <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold" /> {top.jurisdiction.region}
              </div>
              <p className="mt-4 text-foreground/90 leading-relaxed max-w-xl">{top.jurisdiction.tagline}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full gold-gradient px-5 py-2.5 text-sm font-semibold text-[oklch(0.15_0.02_260)] hover:opacity-95 transition"
                >
                  <MessageCircle className="w-4 h-4" /> Talk to an advisor
                </a>
                <button
                  onClick={downloadPdf}
                  className="inline-flex items-center gap-2 rounded-full glass-strong px-5 py-2.5 text-sm font-semibold hover:border-gold/40 transition"
                >
                  <Download className="w-4 h-4 text-gold" /> Download PDF
                </button>
              </div>
            </div>

            {/* Confidence radial */}
            <div className="lg:col-span-1 flex justify-center lg:justify-end">
              <ConfidenceDial value={top.confidence} />
            </div>
          </div>
        </div>

        {/* Analytics row */}
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Panel title="Why This Structure Fits" icon={Sparkles}>
            <ul className="space-y-2.5">
              {top.reasons.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Banking Compatibility" icon={Landmark}>
            <Meter value={top.axes.banking} labels={["Low", "Medium", "High"]} />
            <div className="mt-3 text-xs text-muted-foreground">{bankingLabel(top.axes.banking)} acceptance for your activity profile.</div>
          </Panel>

          <Panel title="Compliance Complexity" icon={ShieldCheck}>
            <Meter value={top.axes.compliance} labels={["Simple", "Moderate", "Advanced"]} variant="cool" />
            <div className="mt-3 text-xs text-muted-foreground">{complianceLabel(top.axes.compliance)} compliance footprint.</div>
          </Panel>

          <Panel title="Estimated Setup Cost" icon={Wallet}>
            <div className="text-2xl font-semibold gold-text-gradient">
              AED {top.axes.cost[0].toLocaleString()} – {top.axes.cost[1].toLocaleString()}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">Indicative range — refined after consultation.</div>
          </Panel>

          <Panel title="Visa Suitability" icon={IdCard}>
            <div className="text-2xl font-semibold">{visaLabel(top.axes.visa)}</div>
            <div className="mt-2 text-xs text-muted-foreground">Investor visa pathway availability for this structure.</div>
          </Panel>

          <Panel title="Growth Potential" icon={TrendingUp}>
            <Bar value={top.axes.growth} max={5} />
            <div className="mt-3 text-xs text-muted-foreground">{top.axes.growth}/5 long-term scalability score.</div>
          </Panel>
        </div>

        {/* Alternatives */}
        <div className="mt-14">
          <div className="text-[11px] uppercase tracking-[0.22em] text-gold mb-3">Alternative Options</div>
          <div className="grid md:grid-cols-2 gap-5">
            {alts.map((alt) => (
              <div key={alt.jurisdiction.id} className="glass-card grad-border rounded-2xl p-6 hover-lift">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{alt.jurisdiction.name}</h3>
                    <div className="text-xs text-muted-foreground">{alt.jurisdiction.region}</div>
                  </div>
                  <div className="text-xs text-gold font-mono">{alt.confidence}% match</div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{alt.jurisdiction.tagline}</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
                  <div className="glass rounded-lg px-3 py-2">
                    <div className="text-muted-foreground">Cost</div>
                    <div className="mt-0.5 font-semibold">AED {alt.axes.cost[0]/1000}k–{alt.axes.cost[1]/1000}k</div>
                  </div>
                  <div className="glass rounded-lg px-3 py-2">
                    <div className="text-muted-foreground">Banking</div>
                    <div className="mt-0.5 font-semibold">{bankingLabel(alt.axes.banking)}</div>
                  </div>
                  <div className="glass rounded-lg px-3 py-2">
                    <div className="text-muted-foreground">Visa</div>
                    <div className="mt-0.5 font-semibold">{visaLabel(alt.axes.visa)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead capture */}
        <div className="mt-16 grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-2">
            <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
              Want a Human Review of{" "}
              <span className="gradient-text">This Structure?</span>
            </h3>
            <p className="mt-4 text-muted-foreground">
              Receive a personalized setup roadmap from the Soft Bridge team — built on your AI
              analysis and refined for your real-world goals.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {["30-min discovery", "Structured roadmap", "No commitment"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-[11px] text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" /> {t}
                </span>
              ))}
            </div>
          </div>

          <form onSubmit={requestConsult} className="lg:col-span-3 glass-strong rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div aria-hidden className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-4">
              <Input label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your full name" />
              <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@email.com" />
              <Input label="WhatsApp" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+971…" />
              <Input label="Business Activity" value={form.activity} onChange={(v) => setForm({ ...form, activity: v })} placeholder="e.g. SaaS, agency, trading" />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="submit" className="inline-flex items-center gap-2 rounded-full gold-gradient px-6 py-3.5 text-sm font-semibold text-[oklch(0.15_0.02_260)] hover:opacity-95 transition">
                <Send className="w-4 h-4" /> Request Personalized Consultation
              </button>
              <button type="button" onClick={downloadPdf} className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3.5 text-sm font-semibold hover:border-gold/40 transition">
                <Download className="w-4 h-4 text-gold" /> Download My Setup Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="glass-card grad-border rounded-2xl p-6 hover-lift">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg glass flex items-center justify-center">
          <Icon className="w-4 h-4 text-gold" />
        </div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{title}</div>
      </div>
      {children}
    </div>
  );
}

function Meter({ value, labels, variant = "warm" }: { value: 1 | 2 | 3; labels: [string, string, string]; variant?: "warm" | "cool" }) {
  const pct = (value / 3) * 100;
  return (
    <div>
      <div className="relative h-2 rounded-full bg-white/8 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full transition-[width] duration-700"
          style={{
            width: `${pct}%`,
            background: variant === "warm"
              ? "linear-gradient(90deg, oklch(0.84 0.10 82), oklch(0.92 0.06 86))"
              : "linear-gradient(90deg, oklch(0.65 0.13 250), oklch(0.78 0.10 260))",
          }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {labels.map((l, i) => (
          <span key={l} className={value === i + 1 ? "text-foreground" : ""}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function Bar({ value, max }: { value: number; max: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`h-3 flex-1 rounded-sm transition-all ${i < value ? "gold-gradient" : "bg-white/8"}`}
          style={{ transitionDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  );
}

function ConfidenceDial({ value }: { value: number }) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative w-40 h-40">
      <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="oklch(1 0 0 / 0.08)" strokeWidth="10" fill="none" />
        <circle
          cx="70" cy="70" r={r}
          stroke="url(#cgrad)" strokeWidth="10" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)" }}
        />
        <defs>
          <linearGradient id="cgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.84 0.10 82)" />
            <stop offset="100%" stopColor="oklch(0.92 0.06 86)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Confidence</div>
        <div className="text-3xl font-semibold gold-text-gradient mt-0.5">{value}%</div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20 transition"
      />
    </div>
  );
}
