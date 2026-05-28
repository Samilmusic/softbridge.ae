import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, ShoppingBag, Megaphone, Cpu, Briefcase, Package, Plane, GraduationCap,
  Bitcoin, Camera, User, MoreHorizontal, Globe, MapPin, Building2, Sofa, Wifi,
  DollarSign, Landmark, Zap, Award, IdCard, Receipt, TrendingUp,
} from "lucide-react";
import type { Answers, BusinessType, ClientRegion, OfficeType, Priority, RevenueBand, YesNoMaybe } from "@/lib/advisor";

interface Props {
  answers: Answers;
  setAnswers: (a: Answers) => void;
  onComplete: () => void;
  onExit: () => void;
}

const BUSINESS: { id: BusinessType; label: string; icon: any }[] = [
  { id: "ecommerce", label: "E-Commerce", icon: ShoppingBag },
  { id: "agency", label: "Marketing Agency", icon: Megaphone },
  { id: "it", label: "IT / Software", icon: Cpu },
  { id: "consulting", label: "Consulting", icon: Briefcase },
  { id: "trading", label: "Trading", icon: Package },
  { id: "tourism", label: "Tourism", icon: Plane },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "crypto", label: "Crypto / Web3", icon: Bitcoin },
  { id: "creator", label: "Content Creator", icon: Camera },
  { id: "freelancer", label: "Freelancer", icon: User },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

const CLIENTS: { id: ClientRegion; label: string; icon: any }[] = [
  { id: "uae", label: "UAE", icon: MapPin },
  { id: "europe", label: "Europe", icon: Globe },
  { id: "uk", label: "United Kingdom", icon: Globe },
  { id: "us", label: "United States", icon: Globe },
  { id: "world", label: "Worldwide", icon: Globe },
];

const YN: { id: YesNoMaybe; label: string }[] = [
  { id: "yes", label: "Yes" }, { id: "no", label: "No" }, { id: "maybe", label: "Maybe Later" },
];

const BANK: { id: YesNoMaybe; label: string }[] = [
  { id: "yes", label: "Yes" }, { id: "no", label: "No" }, { id: "maybe", label: "Not Sure Yet" },
];

const REVENUE: { id: RevenueBand; label: string }[] = [
  { id: "u100k", label: "Under AED 100K" },
  { id: "100to500", label: "AED 100K – 500K" },
  { id: "500to1m", label: "AED 500K – 1M" },
  { id: "1mplus", label: "AED 1M+" },
];

const OFFICE: { id: OfficeType; label: string; icon: any }[] = [
  { id: "office", label: "Physical Office", icon: Building2 },
  { id: "flexi", label: "Flexi Desk", icon: Sofa },
  { id: "remote", label: "Remote Only", icon: Wifi },
];

const PRIORITY: { id: Priority; label: string; icon: any }[] = [
  { id: "cost", label: "Lowest Setup Cost", icon: DollarSign },
  { id: "banking", label: "Banking Friendliness", icon: Landmark },
  { id: "speed", label: "Fast Setup", icon: Zap },
  { id: "credibility", label: "International Credibility", icon: Award },
  { id: "visa", label: "Visa Flexibility", icon: IdCard },
  { id: "tax", label: "Tax Optimization", icon: Receipt },
  { id: "scale", label: "Scalability", icon: TrendingUp },
];

const STEPS = [
  "Business type", "Clients", "Residency", "Banking", "Revenue", "Office", "Priorities", "Support",
];

export function AdvisorWizard({ answers, setAnswers, onComplete, onExit }: Props) {
  const [step, setStep] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const next = () => {
    if (step === STEPS.length - 1) return onComplete();
    setStep((s) => s + 1);
    setAnimKey((k) => k + 1);
  };
  const back = () => {
    if (step === 0) return onExit();
    setStep((s) => s - 1);
    setAnimKey((k) => k + 1);
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  const canContinue = useMemo(() => {
    switch (step) {
      case 0: return !!answers.business;
      case 1: return !!answers.clients;
      case 2: return !!answers.residency;
      case 3: return !!answers.bank;
      case 4: return !!answers.revenue;
      case 5: return !!answers.office;
      case 6: return answers.priorities.length > 0;
      case 7: return true;
      default: return false;
    }
  }, [step, answers]);

  return (
    <section className="relative min-h-[100svh] pt-28 pb-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-pattern opacity-[0.10] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div aria-hidden className="absolute -top-40 left-1/3 w-[700px] h-[700px] rounded-full bg-amber-500/8 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Progress */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-1 rounded-full bg-white/8 overflow-hidden">
            <div className="h-full gold-gradient transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground tabular-nums">
            Step <span className="text-foreground">{String(step + 1).padStart(2, "0")}</span> / 08
          </div>
        </div>
        <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-gold">{STEPS[step]}</div>

        {/* Step content */}
        <div key={animKey} className="mt-10 animate-fade-in">
          {step === 0 && (
            <StepShell title="What best describes your business?">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {BUSINESS.map((opt) => (
                  <Card
                    key={opt.id}
                    selected={answers.business === opt.id}
                    onClick={() => setAnswers({ ...answers, business: opt.id })}
                  >
                    <opt.icon className="w-5 h-5 text-gold" />
                    <div className="mt-3 text-sm font-medium">{opt.label}</div>
                  </Card>
                ))}
              </div>
            </StepShell>
          )}

          {step === 1 && (
            <StepShell title="Where are your clients mainly located?">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {CLIENTS.map((opt) => (
                  <Card
                    key={opt.id}
                    selected={answers.clients === opt.id}
                    onClick={() => setAnswers({ ...answers, clients: opt.id })}
                  >
                    <opt.icon className="w-5 h-5 text-gold" />
                    <div className="mt-3 text-sm font-medium">{opt.label}</div>
                  </Card>
                ))}
              </div>
            </StepShell>
          )}

          {step === 2 && (
            <StepShell title="Do you require UAE residency?">
              <div className="grid sm:grid-cols-3 gap-3">
                {YN.map((opt) => (
                  <Card
                    key={opt.id}
                    selected={answers.residency === opt.id}
                    onClick={() => setAnswers({ ...answers, residency: opt.id })}
                    tall
                  >
                    <div className="text-lg font-semibold">{opt.label}</div>
                  </Card>
                ))}
              </div>
            </StepShell>
          )}

          {step === 3 && (
            <StepShell title="Will you need a UAE business bank account?">
              <div className="grid sm:grid-cols-3 gap-3">
                {BANK.map((opt) => (
                  <Card
                    key={opt.id}
                    selected={answers.bank === opt.id}
                    onClick={() => setAnswers({ ...answers, bank: opt.id })}
                    tall
                  >
                    <div className="text-lg font-semibold">{opt.label}</div>
                  </Card>
                ))}
              </div>
            </StepShell>
          )}

          {step === 4 && (
            <StepShell title="Expected yearly business revenue?">
              <RevenueSlider value={answers.revenue} onChange={(v) => setAnswers({ ...answers, revenue: v })} />
            </StepShell>
          )}

          {step === 5 && (
            <StepShell title="Do you require physical office space?">
              <div className="grid sm:grid-cols-3 gap-3">
                {OFFICE.map((opt) => (
                  <Card
                    key={opt.id}
                    selected={answers.office === opt.id}
                    onClick={() => setAnswers({ ...answers, office: opt.id })}
                    tall
                  >
                    <opt.icon className="w-5 h-5 text-gold" />
                    <div className="mt-3 text-base font-semibold">{opt.label}</div>
                  </Card>
                ))}
              </div>
            </StepShell>
          )}

          {step === 6 && (
            <StepShell title="What matters most to your business?" subtitle="Pick up to 2">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {PRIORITY.map((opt) => {
                  const selected = answers.priorities.includes(opt.id);
                  return (
                    <Card
                      key={opt.id}
                      selected={selected}
                      onClick={() => {
                        const set = new Set(answers.priorities);
                        if (set.has(opt.id)) set.delete(opt.id);
                        else if (set.size < 2) set.add(opt.id);
                        setAnswers({ ...answers, priorities: Array.from(set) });
                      }}
                    >
                      <opt.icon className="w-5 h-5 text-gold" />
                      <div className="mt-3 text-sm font-medium">{opt.label}</div>
                      {selected && (
                        <span className="absolute top-3 right-3 w-5 h-5 rounded-full gold-gradient flex items-center justify-center text-[10px] font-bold text-[oklch(0.15_0.02_260)]">
                          ✓
                        </span>
                      )}
                    </Card>
                  );
                })}
              </div>
            </StepShell>
          )}

          {step === 7 && (
            <StepShell title="How important is long-term support?">
              <SupportSlider value={answers.support} onChange={(v) => setAnswers({ ...answers, support: v })} />
            </StepShell>
          )}
        </div>

        {/* Footer nav */}
        <div className="mt-10 flex items-center justify-between gap-3">
          <button
            onClick={back}
            className="inline-flex items-center gap-2 rounded-full glass-strong px-5 py-3 text-sm font-medium hover:border-gold/40 transition"
          >
            <ArrowLeft className="w-4 h-4" /> {step === 0 ? "Exit" : "Back"}
          </button>
          <button
            onClick={next}
            disabled={!canContinue}
            className="group inline-flex items-center gap-2 rounded-full gold-gradient px-7 py-3 text-sm font-semibold text-[oklch(0.15_0.02_260)] hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_20px_60px_-15px_oklch(0.84_0.10_82/0.45)]"
          >
            {step === STEPS.length - 1 ? "Run AI Analysis" : "Continue"}
            <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function StepShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-semibold leading-tight max-w-3xl">{title}</h2>
      {subtitle && <div className="mt-2 text-sm text-muted-foreground">{subtitle}</div>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Card({
  selected, onClick, children, tall,
}: { selected: boolean; onClick: () => void; children: React.ReactNode; tall?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`relative text-left rounded-2xl p-5 ${tall ? "py-8" : ""} transition group hover-lift overflow-hidden grad-border
        ${selected
          ? "glass-strong border-gold/50 ring-1 ring-gold/40 shadow-[0_20px_60px_-25px_oklch(0.84_0.10_82/0.6)]"
          : "glass-card hover:border-gold/30"}`}
    >
      <div
        aria-hidden
        className={`absolute inset-0 opacity-0 ${selected ? "opacity-100" : "group-hover:opacity-100"} transition pointer-events-none`}
        style={{ background: "radial-gradient(400px circle at 50% 0%, oklch(0.84 0.10 82 / 0.10), transparent 60%)" }}
      />
      <div className="relative">{children}</div>
    </button>
  );
}

function RevenueSlider({ value, onChange }: { value: RevenueBand | null; onChange: (v: RevenueBand) => void }) {
  const order: RevenueBand[] = ["u100k", "100to500", "500to1m", "1mplus"];
  const idx = value ? order.indexOf(value) : -1;
  return (
    <div className="glass-strong rounded-3xl p-7 md:p-9">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Selected band</div>
          <div className="mt-1 text-3xl md:text-4xl font-semibold gold-text-gradient">
            {value ? REVENUE.find((r) => r.id === value)!.label : "—"}
          </div>
        </div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">AED / year</div>
      </div>

      <div className="relative h-2 rounded-full bg-white/8 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full gold-gradient transition-[width] duration-300"
          style={{ width: idx >= 0 ? `${((idx + 1) / order.length) * 100}%` : "0%" }}
        />
      </div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {REVENUE.map((r) => (
          <button
            key={r.id}
            onClick={() => onChange(r.id)}
            className={`rounded-xl px-3 py-3 text-[13px] font-medium transition ${
              value === r.id ? "gold-gradient text-[oklch(0.15_0.02_260)]" : "glass hover:border-gold/40"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SupportSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="glass-strong rounded-3xl p-7 md:p-9">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Importance</div>
          <div className="mt-1 text-3xl md:text-4xl font-semibold gold-text-gradient">
            {["Minimal", "Light", "Useful", "Important", "Essential"][value - 1]}
          </div>
        </div>
        <div className="text-2xl font-mono text-gold tabular-nums">{value}/5</div>
      </div>

      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 appearance-none bg-white/8 rounded-full outline-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[oklch(0.92_0.06_86)]
          [&::-webkit-slider-thumb]:shadow-[0_0_20px_oklch(0.84_0.10_82/0.7)]
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[oklch(0.84_0.10_82)]
          [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-[oklch(0.92_0.06_86)] [&::-moz-range-thumb]:border-2
          [&::-moz-range-thumb]:border-[oklch(0.84_0.10_82)]"
        style={{
          background: `linear-gradient(90deg, oklch(0.84 0.10 82) 0%, oklch(0.92 0.06 86) ${((value - 1) / 4) * 100}%, oklch(1 0 0 / 0.08) ${((value - 1) / 4) * 100}%)`,
        }}
      />
      <div className="mt-3 flex justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>Minimal</span><span>Essential</span>
      </div>
    </div>
  );
}
