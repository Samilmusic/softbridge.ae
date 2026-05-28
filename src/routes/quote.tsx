import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitQuoteRequest } from "@/lib/quote.functions";
import { computeQuote, JURISDICTION_OPTIONS, formatAed } from "@/lib/quote-engine";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowRight, ArrowLeft, Check, Sparkles, Loader2, CalendarCheck, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { WA_LINK } from "@/lib/site";

export const Route = createFileRoute("/quote")({
  component: QuotePage,
  head: () => ({
    meta: [
      { title: "Get a UAE business setup quote — Soft Bridge FZE LLC" },
      { name: "description", content: "Instant estimate for your UAE company setup. Choose jurisdiction, visas, banking and tax — get a branded quotation emailed in seconds." },
    ],
  }),
});

type FormState = {
  fullName: string; email: string; whatsapp: string; nationality: string;
  businessActivity: string; jurisdiction: string; numberOfVisas: number;
  needsResidency: "yes" | "no" | "later";
  needsBanking: boolean; needsTax: boolean; needsDigital: boolean;
  officeRequirement: "flexi_desk" | "ejari" | "physical_office" | "not_sure";
  message: string;
};

const initial: FormState = {
  fullName: "", email: "", whatsapp: "", nationality: "",
  businessActivity: "", jurisdiction: "IFZA", numberOfVisas: 1,
  needsResidency: "yes", needsBanking: true, needsTax: false, needsDigital: false,
  officeRequirement: "flexi_desk", message: "",
};

function QuotePage() {
  const submit = useServerFn(submitQuoteRequest);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ quoteNumber: string; quote: ReturnType<typeof computeQuote> } | null>(null);

  const livePreview = useMemo(() => computeQuote({
    jurisdiction: form.jurisdiction,
    numberOfVisas: form.numberOfVisas,
    needsResidency: form.needsResidency,
    needsBanking: form.needsBanking,
    needsTax: form.needsTax,
    needsDigital: form.needsDigital,
    officeRequirement: form.officeRequirement,
  }), [form]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((s) => ({ ...s, [k]: v }));

  const onSubmit = async () => {
    if (!form.fullName || !form.email) { toast.error("Please fill in your name and email"); setStep(1); return; }
    setLoading(true);
    try {
      const res = await submit({ data: form });
      setResult(res);
      toast.success("Quote generated and emailed");
    } catch (e: any) { toast.error(e.message ?? "Could not generate quote"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-gold">Quote Builder</div>
            <h1 className="font-display text-3xl md:text-5xl text-foreground mt-2">Build your UAE setup quote</h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Answer a few questions. Get an instant estimate and a branded quotation in your inbox.</p>
          </div>

          {result ? (
            <SuccessCard result={result} name={form.fullName} email={form.email} />
          ) : (
            <div className="grid lg:grid-cols-[1fr_360px] gap-6">
              <div className="glass-strong rounded-3xl p-6 md:p-8 border border-border">
                <Stepper step={step} />

                {step === 1 && (
                  <div className="grid gap-3 mt-6">
                    <Field label="Full name" value={form.fullName} onChange={(v) => set("fullName", v)} required />
                    <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} required />
                    <Field label="WhatsApp" value={form.whatsapp} onChange={(v) => set("whatsapp", v)} placeholder="+971 …" />
                    <Field label="Nationality" value={form.nationality} onChange={(v) => set("nationality", v)} />
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-3 mt-6">
                    <Field label="Business activity" value={form.businessActivity} onChange={(v) => set("businessActivity", v)} placeholder="Consulting, e-commerce, trading…" />
                    <SelectField label="Preferred jurisdiction" value={form.jurisdiction} onChange={(v) => set("jurisdiction", v)} options={JURISDICTION_OPTIONS} />
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Number of visas</label>
                      <input type="range" min={0} max={10} value={form.numberOfVisas} onChange={(e) => set("numberOfVisas", Number(e.target.value))} className="w-full accent-amber-400 mt-2" />
                      <div className="text-sm text-gold mt-1">{form.numberOfVisas} visa{form.numberOfVisas === 1 ? "" : "s"}</div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-3 mt-6">
                    <ChoiceRow label="Need UAE residency?" value={form.needsResidency} onChange={(v) => set("needsResidency", v as any)} options={[["yes","Yes"],["later","Later"],["no","No"]]} />
                    <ChoiceRow label="Office requirement" value={form.officeRequirement} onChange={(v) => set("officeRequirement", v as any)} options={[["flexi_desk","Flexi-desk"],["ejari","Ejari office"],["physical_office","Physical"],["not_sure","Not sure"]]} />
                    <Toggle label="Bank account assistance" value={form.needsBanking} onChange={(v) => set("needsBanking", v)} />
                    <Toggle label="Tax / VAT registration" value={form.needsTax} onChange={(v) => set("needsTax", v)} />
                    <Toggle label="Website &amp; digital infrastructure" value={form.needsDigital} onChange={(v) => set("needsDigital", v)} />
                  </div>
                )}

                {step === 4 && (
                  <div className="mt-6">
                    <Field label="Anything else?" value={form.message} onChange={(v) => set("message", v)} multiline placeholder="Optional notes…" />
                    <div className="mt-4 grid gap-2 text-sm">
                      <Row k="Name" v={form.fullName} />
                      <Row k="Email" v={form.email} />
                      <Row k="Jurisdiction" v={form.jurisdiction} />
                      <Row k="Visas" v={String(form.numberOfVisas)} />
                      <Row k="Office" v={form.officeRequirement.replace("_"," ")} />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-8">
                  <button onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1} className="text-sm text-muted-foreground inline-flex items-center gap-1 disabled:opacity-30">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  {step < 4 ? (
                    <button onClick={() => setStep((s) => Math.min(4, s + 1))} className="inline-flex items-center gap-2 rounded-full gold-gradient px-6 py-2.5 text-sm font-semibold text-[oklch(0.15_0.02_260)]">
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button onClick={onSubmit} disabled={loading} className="inline-flex items-center gap-2 rounded-full gold-gradient px-6 py-2.5 text-sm font-semibold text-[oklch(0.15_0.02_260)] disabled:opacity-60">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Generate quote
                    </button>
                  )}
                </div>
              </div>

              {/* Live preview */}
              <aside className="glass-strong rounded-3xl p-6 border border-border h-fit lg:sticky lg:top-24">
                <div className="text-[10px] uppercase tracking-[0.22em] text-gold">Live estimate</div>
                <div className="font-display text-xl text-foreground mt-2">{livePreview.recommendedStructure}</div>
                <div className="text-xs text-muted-foreground">{livePreview.selectedJurisdiction} · {livePreview.timelineDays.min}–{livePreview.timelineDays.max} days</div>
                <div className="mt-4 p-4 rounded-2xl border border-gold/30 bg-gold/[0.06]">
                  <div className="text-[10px] uppercase tracking-wider text-gold">Total estimate</div>
                  <div className="font-display text-2xl text-foreground mt-1">{formatAed(livePreview.totalCost.min)} – {formatAed(livePreview.totalCost.max)}</div>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  Govt fees: {formatAed(livePreview.governmentFees.min)} – {formatAed(livePreview.governmentFees.max)}<br/>
                  Service fees: {formatAed(livePreview.serviceFees.min)} – {formatAed(livePreview.serviceFees.max)}
                </div>
                <ul className="mt-4 space-y-1 text-xs">
                  {livePreview.includedServices.slice(0, 5).map((s) => (
                    <li key={s} className="flex gap-2 text-foreground/80"><Check className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />{s}</li>
                  ))}
                </ul>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  const labels = ["Contact","Business","Services","Review"];
  return (
    <div className="flex items-center gap-2">
      {labels.map((l, i) => {
        const n = i + 1; const active = n === step; const done = n < step;
        return (
          <div key={l} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold border ${done ? "bg-gold/20 border-gold/40 text-gold" : active ? "gold-gradient text-[oklch(0.15_0.02_260)] border-gold" : "bg-background/40 border-border text-muted-foreground"}`}>
              {done ? <Check className="w-3.5 h-3.5" /> : n}
            </div>
            <div className={`text-xs ${active ? "text-foreground" : "text-muted-foreground"}`}>{l}</div>
            {i < labels.length - 1 && <div className="flex-1 h-px bg-border" />}
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, required, multiline }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; multiline?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}{required && <span className="text-gold"> *</span>}</span>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:border-gold/50 outline-none" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:border-gold/50 outline-none" />
      )}
    </label>
  );
}


function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:border-gold/50 outline-none">
        {options.map((o) => <option key={o} value={o} className="bg-background text-foreground">{o}</option>)}
      </select>
    </label>
  );
}

function ChoiceRow({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string,string][] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map(([v, l]) => (
          <button key={v} type="button" onClick={() => onChange(v)} className={`px-4 py-2 rounded-full text-sm border transition ${value === v ? "gold-gradient text-[oklch(0.15_0.02_260)] border-gold" : "bg-background/40 border-border text-foreground hover:border-gold/40"}`}>{l}</button>
        ))}
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!value)} className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3 text-sm hover:border-gold/40 transition">
      <span dangerouslySetInnerHTML={{ __html: label }} />
      <span className={`relative inline-block w-10 h-5 rounded-full transition ${value ? "bg-gold/80" : "bg-muted"}`}>
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${value ? "translate-x-5" : ""}`} />
      </span>
    </button>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-white/5 py-1.5">
      <span className="text-muted-foreground text-xs uppercase tracking-wider">{k}</span>
      <span className="text-foreground">{v || "—"}</span>
    </div>
  );
}

function SuccessCard({ result, name, email }: { result: { quoteNumber: string; quote: ReturnType<typeof computeQuote> }; name: string; email: string }) {
  const q = result.quote;
  return (
    <div className="glass-strong rounded-3xl p-8 border border-gold/30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300"><Check className="w-5 h-5" /></div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-gold">Quote {result.quoteNumber}</div>
          <div className="font-display text-2xl text-foreground">Sent to {email}</div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-3">{name ? `${name}, ` : ""}your branded quotation is on its way. Here's the summary:</p>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          <div className="text-[10px] uppercase tracking-wider text-gold">Recommended structure</div>
          <div className="font-display text-lg text-foreground mt-1">{q.recommendedStructure}</div>
          <div className="text-xs text-muted-foreground mt-1">{q.selectedJurisdiction} · {q.timelineDays.min}–{q.timelineDays.max} working days</div>

          <div className="mt-4">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Included</div>
            <ul className="space-y-1 text-xs">
              {q.includedServices.map((s) => <li key={s} className="flex gap-2 text-foreground/80"><Check className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />{s}</li>)}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-gold/30 bg-gold/[0.05] p-5">
          <div className="text-[10px] uppercase tracking-wider text-gold">Investment estimate</div>
          <div className="font-display text-3xl text-foreground mt-2">{formatAed(q.totalCost.min)} – {formatAed(q.totalCost.max)}</div>
          <div className="text-xs text-muted-foreground mt-2">
            Govt fees: {formatAed(q.governmentFees.min)} – {formatAed(q.governmentFees.max)}<br/>
            Service fees: {formatAed(q.serviceFees.min)} – {formatAed(q.serviceFees.max)}
          </div>
          {q.optionalAddons.length > 0 && (
            <div className="mt-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Optional add-ons</div>
              <ul className="space-y-0.5 text-xs">{q.optionalAddons.map((s) => <li key={s} className="text-muted-foreground">• {s}</li>)}</ul>
            </div>
          )}
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground mt-5">Disclaimer: Final quotation may vary depending on business activity, selected jurisdiction, visa requirements, office requirements, nationality, government authority approval, and third-party fees.</p>

      <div className="flex flex-wrap gap-3 mt-6">
        <Link to="/login" className="rounded-full gold-gradient px-5 py-2.5 text-sm font-semibold text-[oklch(0.15_0.02_260)] inline-flex items-center gap-2"><CalendarCheck className="w-4 h-4" />Create account &amp; track</Link>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm inline-flex items-center gap-2 text-foreground"><MessageCircle className="w-4 h-4 text-gold" />Talk on WhatsApp</a>
      </div>
    </div>
  );
}
