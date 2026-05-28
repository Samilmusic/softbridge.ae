import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ShieldCheck,
  Globe,
  Building2,
  CreditCard,
  FileCheck2,
  MessageSquare,
  User,
  Activity,
  Zap,
  ArrowRight,
} from "lucide-react";

interface AiCommandCenterProps {
  onStartSetup?: () => void;
}

type StageStatus = "completed" | "in_progress" | "pending" | "review";

const STAGES: { name: string; status: StageStatus }[] = [
  { name: "Consultation", status: "completed" },
  { name: "Initial Approval", status: "completed" },
  { name: "Trade Name Reservation", status: "completed" },
  { name: "License Issuance", status: "in_progress" },
  { name: "Establishment Card", status: "review" },
  { name: "UAE Residency", status: "pending" },
  { name: "Medical Test", status: "pending" },
  { name: "Emirates ID", status: "pending" },
  { name: "Tax Registration", status: "pending" },
  { name: "Banking Assistance", status: "pending" },
  { name: "Website Launch", status: "pending" },
  { name: "Lifetime Support", status: "pending" },
];

const FEED = [
  { t: "just now", text: "License application under review", tone: "violet" },
  { t: "2m", text: "Trade name reserved", tone: "emerald" },
  { t: "12m", text: "Initial approval submitted", tone: "violet" },
  { t: "1h", text: "Banking preparation started", tone: "sky" },
  { t: "3h", text: "Website workspace prepared", tone: "violet" },
  { t: "Today", text: "Consultant note added", tone: "amber" },
];

const DOCS = [
  { name: "Passport Copy", status: "Verified", tone: "emerald" },
  { name: "Business Activity", status: "Completed", tone: "emerald" },
  { name: "Visa Copy", status: "Pending", tone: "amber" },
  { name: "Passport Photo", status: "Required", tone: "rose" },
  { name: "Bank Statement", status: "Optional", tone: "slate" },
];

const FLOAT_CARDS = [
  { icon: Sparkles, title: "AI Advisor Online", sub: "Responding in real-time" },
  { icon: CreditCard, title: "Corporate Banking", sub: "Preparation active" },
  { icon: Globe, title: "Remote Setup", sub: "Available worldwide" },
  { icon: Clock, title: "5–10 Business Days", sub: "Estimated completion" },
  { icon: ShieldCheck, title: "Client Portal Active", sub: "Secure access" },
  { icon: Zap, title: "Free Website Included", sub: "Workspace prepared" },
];

function StatusDot({ status }: { status: StageStatus }) {
  if (status === "completed")
    return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
  if (status === "in_progress")
    return (
      <span className="relative flex w-3 h-3">
        <span className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-60" />
        <span className="relative rounded-full w-3 h-3 bg-violet-600" />
      </span>
    );
  if (status === "review")
    return <Clock className="w-4 h-4 text-amber-500" />;
  return <Circle className="w-3 h-3 text-slate-300" />;
}

function toneClasses(tone: string) {
  switch (tone) {
    case "emerald":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    case "amber":
      return "bg-amber-50 text-amber-700 ring-amber-200";
    case "rose":
      return "bg-rose-50 text-rose-700 ring-rose-200";
    case "sky":
      return "bg-sky-50 text-sky-700 ring-sky-200";
    case "violet":
      return "bg-violet-50 text-violet-700 ring-violet-200";
    default:
      return "bg-slate-50 text-slate-600 ring-slate-200";
  }
}

export function AiCommandCenter({ onStartSetup }: AiCommandCenterProps) {
  const [feedIdx, setFeedIdx] = useState(0);
  const [bankScore, setBankScore] = useState(0);


  useEffect(() => {
    const id = setInterval(() => setFeedIdx((i) => (i + 1) % FEED.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const target = 86;
    let v = 0;
    const id = setInterval(() => {
      v += 2;
      setBankScore(Math.min(target, v));
      if (v >= target) clearInterval(id);
    }, 24);
    return () => clearInterval(id);
  }, []);

  const orderedFeed = [...FEED.slice(feedIdx), ...FEED.slice(0, feedIdx)];

  return (
    <>
    <section
      id="command-center"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-violet-50/40 to-white" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-300/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-fuchsia-300/15 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 ring-1 ring-violet-200 backdrop-blur-sm text-xs font-medium text-violet-700 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI Business Command Center
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-slate-900 leading-[1.05]">
            Your UAE Business,
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
              Managed Like a System.
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From company formation to residency, banking, tax registration, website setup, and long-term support — Soft Bridge turns your UAE business journey into a transparent AI-powered command center.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setOnboarding(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 text-white font-medium shadow-[0_10px_40px_-10px_rgba(124,58,237,0.6)] hover:shadow-[0_15px_50px_-10px_rgba(124,58,237,0.8)] hover:-translate-y-0.5 transition-all"
            >
              Start Your Setup
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/portal"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/80 backdrop-blur ring-1 ring-slate-200 text-slate-900 font-medium hover:bg-white hover:ring-violet-300 transition-all"
            >
              View Client Portal
            </Link>
          </div>
        </div>

        {/* Dashboard + floating cards */}
        <div className="relative max-w-7xl mx-auto">
          {/* Floating cards — desktop only */}
          <div className="hidden xl:block">
            {FLOAT_CARDS.slice(0, 3).map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="absolute z-20 animate-float"
                  style={{
                    left: "-80px",
                    top: `${80 + i * 180}px`,
                    animationDelay: `${i * 0.6}s`,
                  }}
                >
                  <FloatCard icon={Icon} title={c.title} sub={c.sub} />
                </div>
              );
            })}
            {FLOAT_CARDS.slice(3).map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="absolute z-20 animate-float"
                  style={{
                    right: "-80px",
                    top: `${80 + i * 180}px`,
                    animationDelay: `${i * 0.6 + 0.3}s`,
                  }}
                >
                  <FloatCard icon={Icon} title={c.title} sub={c.sub} />
                </div>
              );
            })}
          </div>

          {/* Main dashboard */}
          <div className="relative rounded-[2rem] bg-white/80 backdrop-blur-xl ring-1 ring-slate-200/80 shadow-[0_30px_120px_-30px_rgba(91,33,182,0.35)] p-6 md:p-10">
            {/* top bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Soft Bridge OS</div>
                  <div className="text-xs text-slate-500">Client: Acme Holdings · License IFZA-2026</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-slate-600 font-medium">Live</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
              {/* Timeline */}
              <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-slate-50 to-violet-50/40 ring-1 ring-slate-100 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-slate-900">Setup Progress</h3>
                  <span className="text-xs text-slate-500">3 of 12 completed</span>
                </div>
                <div className="relative">
                  <div className="absolute left-[7px] top-1 bottom-1 w-px bg-slate-200" />
                  <div
                    className="absolute left-[7px] top-1 w-px bg-gradient-to-b from-violet-500 to-fuchsia-500 transition-all duration-1000"
                    style={{ height: "28%" }}
                  />
                  <ul className="space-y-3.5">
                    {STAGES.map((s) => (
                      <li key={s.name} className="flex items-center gap-4">
                        <div className="relative z-10 flex items-center justify-center w-4">
                          <StatusDot status={s.status} />
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          <span
                            className={`text-sm ${
                              s.status === "completed"
                                ? "text-slate-900 font-medium"
                                : s.status === "in_progress"
                                ? "text-violet-700 font-semibold"
                                : s.status === "review"
                                ? "text-amber-700 font-medium"
                                : "text-slate-400"
                            }`}
                          >
                            {s.name}
                          </span>
                          {s.status === "in_progress" && (
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 font-semibold">
                              In progress
                            </span>
                          )}
                          {s.status === "review" && (
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">
                              Under review
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right column */}
              <div className="lg:col-span-5 space-y-6">
                {/* AI Recommendation */}
                <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-[1px] shadow-[0_20px_50px_-15px_rgba(124,58,237,0.4)]">
                  <div className="rounded-[15px] bg-white p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-violet-600" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                          AI Recommendation
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">97% Match</span>
                    </div>
                    <div className="text-lg font-semibold text-slate-900 mb-1">IFZA Remote Setup</div>
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      Best fit for remote founders, consulting, e-commerce, and fast setup.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Remote Setup", "Banking Friendly", "Fast License", "Free Website"].map(
                        (b) => (
                          <span
                            key={b}
                            className="text-[10px] font-medium px-2 py-1 rounded-md bg-violet-50 text-violet-700 ring-1 ring-violet-100"
                          >
                            {b}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Banking readiness */}
                <div className="rounded-2xl bg-white ring-1 ring-slate-100 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-slate-700" />
                      <span className="text-sm font-semibold text-slate-900">Banking Readiness</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">High</span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: "Compliance preparation", v: 92 },
                      { label: "Source of funds", v: 84 },
                      { label: "Activity match", v: 90 },
                      { label: "Document readiness", v: 78 },
                    ].map((row) => (
                      <div key={row.label}>
                        <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                          <span>{row.label}</span>
                          <span className="font-semibold">{Math.round((bankScore / 86) * row.v)}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700"
                            style={{ width: `${(bankScore / 86) * row.v}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-3 italic">
                    Bank approval remains subject to bank review.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {/* Live feed */}
              <div className="rounded-2xl bg-white ring-1 ring-slate-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-violet-600" />
                    <span className="text-sm font-semibold text-slate-900">Live Activity</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <ul className="space-y-2.5 max-h-44 overflow-hidden">
                  {orderedFeed.slice(0, 4).map((f, i) => (
                    <li
                      key={`${f.text}-${feedIdx}-${i}`}
                      className="flex items-start gap-3 animate-fade-in"
                    >
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full ${
                          f.tone === "emerald"
                            ? "bg-emerald-500"
                            : f.tone === "amber"
                            ? "bg-amber-500"
                            : f.tone === "sky"
                            ? "bg-sky-500"
                            : "bg-violet-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="text-xs text-slate-800">{f.text}</div>
                        <div className="text-[10px] text-slate-400">{f.t}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              <div className="rounded-2xl bg-white ring-1 ring-slate-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-slate-700" />
                    <span className="text-sm font-semibold text-slate-900">Documents</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-600">8/10</span>
                </div>
                <ul className="space-y-2">
                  {DOCS.map((d) => (
                    <li
                      key={d.name}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-700">{d.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full ring-1 text-[10px] font-medium ${toneClasses(
                          d.tone
                        )}`}
                      >
                        {d.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultant + website */}
              <div className="space-y-6">
                <div className="rounded-2xl bg-white ring-1 ring-slate-100 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-slate-700" />
                    <span className="text-sm font-semibold text-slate-900">Assigned Consultant</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-semibold text-sm">
                      SB
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">Soft Bridge Consultant</div>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Online · Reviewing setup
                      </div>
                    </div>
                    <button className="p-2 rounded-lg bg-violet-50 hover:bg-violet-100 transition">
                      <MessageSquare className="w-4 h-4 text-violet-600" />
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 ring-1 ring-violet-100 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-violet-600" />
                    <span className="text-sm font-semibold text-slate-900">Free Website Included</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    Every company setup client receives a professional business website.
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-violet-700 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Website workspace prepared
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile floating card grid */}
          <div className="xl:hidden mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FLOAT_CARDS.map((c) => {
              const Icon = c.icon;
              return <FloatCard key={c.title} icon={Icon} title={c.title} sub={c.sub} />;
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-violet-900 text-white shadow-[0_30px_80px_-20px_rgba(124,58,237,0.5)]">
            <Building2 className="w-8 h-8 text-violet-300" />
            <div className="text-2xl md:text-3xl font-semibold max-w-xl">
              Ready to launch your UAE business with a real operating system?
            </div>
            <button
              type="button"
              onClick={() => setOnboarding(true)}
              className="mt-2 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-slate-900 font-semibold hover:bg-violet-50 transition-all"
            >
              Start Your Setup
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ai-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: ai-float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
    <OnboardingDialog open={onboarding} onOpenChange={setOnboarding} />
    </>
  );
}

function FloatCard({
  icon: Icon,
  title,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl ring-1 ring-slate-200/80 shadow-[0_10px_40px_-15px_rgba(91,33,182,0.3)] hover:shadow-[0_15px_50px_-15px_rgba(91,33,182,0.45)] transition-all min-w-[220px]">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-slate-900 truncate">{title}</div>
        <div className="text-[11px] text-slate-500 truncate">{sub}</div>
      </div>
    </div>
  );
}
