import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { getMyCase } from "@/lib/case.functions";
import { CaseTimeline } from "@/components/portal/CaseTimeline";
import { DocumentsPanel } from "@/components/portal/DocumentsPanel";
import { STAGE_META, type StageKey, type StageStatus } from "@/lib/case-stages";
import { Building2, LogOut, MessageCircle, ShieldCheck, FileText, CreditCard, Sparkles, ExternalLink, AlertTriangle, Activity, LifeBuoy } from "lucide-react";
import { PortalAdvisorCard } from "@/components/advisor/PortalAdvisorCard";
import { Button } from "@/components/ui/button";
import { WA_LINK, SITE } from "@/lib/site";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/portal")({
  component: PortalPage,
  errorComponent: PortalErrorFallback,
});

function PortalErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,oklch(0.22_0.04_265),oklch(0.13_0.02_260))] flex items-center justify-center px-4">
      <div className="glass-strong rounded-3xl p-8 max-w-md text-center border border-white/8">
        <AlertTriangle className="w-8 h-8 text-amber-300 mx-auto mb-3" />
        <h1 className="font-display text-xl text-foreground">We couldn't prepare your portal</h1>
        <p className="text-sm text-muted-foreground mt-2">{error?.message || "Please try again or contact support."}</p>
        <div className="mt-5 flex justify-center gap-2">
          <Button onClick={reset} className="rounded-full gold-gradient text-[oklch(0.15_0.02_260)] font-semibold">Try again</Button>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full border border-white/15 text-sm">Contact support</a>
        </div>
      </div>
    </div>
  );
}

function PortalPage() {
  const { user } = useAuth();
  const fetchCase = useServerFn(getMyCase);
  const [state, setState] = useState<any>(null);
  const [profile, setProfile] = useState<{ full_name: string | null; email: string } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          supabase.from("profiles").select("full_name,email").eq("id", user.id).maybeSingle(),
          fetchCase(),
        ]);
        if (cancelled) return;
        setProfile((pRes.data as any) ?? { full_name: null, email: user.email ?? "" });
        setState(cRes);
      } catch (e: any) {
        console.error("portal load failed", e);
        if (!cancelled) setLoadError(e?.message || "We could not prepare your portal. Please try again or contact support.");
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, [user, fetchCase]);

  const signOut = async () => { await supabase.auth.signOut(); toast.success("Signed out"); };

  const displayName = profile?.full_name || profile?.email || "Client";
  const cas = state?.case;
  const stages = state?.stages ?? [];
  const docs = state?.documents ?? [];
  const activity = state?.activity ?? [];
  const quotes = state?.quotes ?? [];

  const stage = (cas?.current_stage ?? "consultation") as StageKey;
  const pct = cas?.progress_percentage ?? 0;
  const meta = STAGE_META[stage] ?? STAGE_META.consultation;

  const waiting = stages.filter((s: any) => s.status === "waiting_client");
  const nextStage = stages.find((s: any) => s.status !== "completed");
  const isLifetime = stage === "lifetime_support" && pct >= 95;

  const ringR = 56;
  const ringC = 2 * Math.PI * ringR;
  const ringOffset = ringC - (pct / 100) * ringC;

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_right,oklch(0.22_0.04_265),oklch(0.13_0.02_260))]">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Loading your portal…</div>
      </div>
    );
  }

  if (loadError || !cas) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,oklch(0.22_0.04_265),oklch(0.13_0.02_260))] text-foreground">
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/50 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg gold-gradient flex items-center justify-center"><span className="text-[12px] font-bold text-[oklch(0.15_0.02_260)]">SB</span></div>
              <div className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground">Client Portal</div>
            </Link>
            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-xs text-muted-foreground">{profile?.email}</span>
              <Button variant="outline" size="sm" onClick={signOut} className="border-white/15"><LogOut className="w-3.5 h-3.5 mr-1.5" />Sign out</Button>
            </div>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-5 py-16">
          <div className="text-center">
            <div className="text-[11px] uppercase tracking-[0.22em] text-gold">Welcome, {displayName}</div>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mt-2">Your Soft Bridge portal is ready.</h1>
            <p className="text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
              {loadError ?? "Choose how you'd like to start — complete onboarding, request a quote, or speak with a consultant."}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-10">
            <Link to="/quote" className="glass-strong rounded-2xl p-5 border border-white/8 hover:border-gold/40 transition">
              <div className="flex items-center gap-3"><Sparkles className="w-5 h-5 text-gold" /><div className="font-medium">Complete onboarding</div></div>
              <p className="text-xs text-muted-foreground mt-1.5">Tell us about your business so we can prepare your setup plan.</p>
            </Link>
            <Link to="/quote" className="glass-strong rounded-2xl p-5 border border-white/8 hover:border-gold/40 transition">
              <div className="flex items-center gap-3"><CreditCard className="w-5 h-5 text-gold" /><div className="font-medium">Request a quotation</div></div>
              <p className="text-xs text-muted-foreground mt-1.5">Get an instant cost & timeline estimate.</p>
            </Link>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="glass-strong rounded-2xl p-5 border border-white/8 hover:border-gold/40 transition">
              <div className="flex items-center gap-3"><MessageCircle className="w-5 h-5 text-gold" /><div className="font-medium">Book a consultation</div></div>
              <p className="text-xs text-muted-foreground mt-1.5">Talk to a senior advisor on WhatsApp.</p>
            </a>
            <div className="glass-strong rounded-2xl p-5 border border-white/8 opacity-80">
              <div className="flex items-center gap-3"><FileText className="w-5 h-5 text-gold" /><div className="font-medium">Upload documents later</div></div>
              <p className="text-xs text-muted-foreground mt-1.5">We'll request what we need as your case progresses.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,oklch(0.22_0.04_265),oklch(0.13_0.02_260))] text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg gold-gradient flex items-center justify-center"><span className="text-[12px] font-bold text-[oklch(0.15_0.02_260)]">SB</span></div>
            <div className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground">Client Portal</div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-xs text-muted-foreground">{profile?.email}</span>
            <Button variant="outline" size="sm" onClick={signOut} className="border-white/15"><LogOut className="w-3.5 h-3.5 mr-1.5" />Sign out</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-10">
        {/* Headline */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-gold">Your UAE Business Setup Progress</div>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mt-1">{displayName}</h1>
            <p className="text-sm text-muted-foreground mt-1">{cas?.company_name ?? "Setup pending"} · {cas?.jurisdiction ?? "Jurisdiction TBD"}</p>
          </div>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="glass-strong px-4 py-2.5 rounded-full text-sm inline-flex items-center gap-2 hover:border-gold/40 transition self-start"><MessageCircle className="w-4 h-4 text-gold" />Chat with consultant</a>
        </div>

        {/* AI Advisor */}
        <div className="mb-6"><PortalAdvisorCard /></div>

        {/* Overview row */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 glass-strong rounded-3xl p-6 border border-white/8 flex items-center gap-6 flex-wrap">
            <div className="relative w-[140px] h-[140px] shrink-0">
              <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
                <circle cx="70" cy="70" r={ringR} stroke="rgba(255,255,255,0.06)" strokeWidth="10" fill="none" />
                <circle cx="70" cy="70" r={ringR} stroke="url(#g)" strokeWidth="10" strokeLinecap="round" strokeDasharray={ringC} strokeDashoffset={ringOffset} fill="none" className="transition-all duration-700" />
                <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e6c47a" /><stop offset="100%" stopColor="#caa14a" /></linearGradient></defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-display text-3xl text-foreground">{pct}%</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">complete</div>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Current stage</div>
              <div className="font-display text-2xl text-gold mt-1">{meta.label}</div>
              <p className="text-sm text-muted-foreground mt-1">{meta.description}</p>
              {nextStage && nextStage.stage_key !== stage && (
                <div className="mt-3 text-xs text-muted-foreground">
                  Next: <span className="text-foreground">{STAGE_META[nextStage.stage_key as StageKey]?.label}</span>
                </div>
              )}
            </div>
          </div>
          <div className="glass-strong rounded-3xl p-6 border border-white/8">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Your consultant</div>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-[oklch(0.15_0.02_260)] font-bold">{(cas?.assigned_consultant ?? "SB").slice(0,2).toUpperCase()}</div>
              <div>
                <div className="text-sm font-medium text-foreground">{cas?.assigned_consultant ?? "Assignment pending"}</div>
                <div className="text-xs text-muted-foreground">Senior advisor · Soft Bridge</div>
              </div>
            </div>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="mt-4 w-full block text-center rounded-full bg-white/[0.04] border border-white/10 px-4 py-2 text-sm hover:border-gold/40 transition">Message on WhatsApp</a>
          </div>
        </div>

        {/* Waiting-on-you banner */}
        {waiting.length > 0 && (
          <div className="mb-6 glass-strong rounded-2xl border border-amber-300/30 bg-amber-300/[0.04] p-5">
            <div className="flex items-center gap-2 text-amber-300 text-sm font-medium"><AlertTriangle className="w-4 h-4" /> Action needed from you</div>
            <ul className="mt-2 text-sm text-foreground/90 grid gap-1">
              {waiting.map((s: any) => (
                <li key={s.id}>• <span className="font-medium">{STAGE_META[s.stage_key as StageKey]?.label}:</span> {s.client_action_required ?? s.public_note ?? "Please review your portal."}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Lifetime support card */}
        {isLifetime && (
          <div className="mb-6 glass-strong rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.04] p-5 flex items-center gap-4 flex-wrap">
            <div className="w-10 h-10 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300"><LifeBuoy className="w-5 h-5" /></div>
            <div className="flex-1 min-w-[200px]">
              <div className="font-display text-lg text-foreground">Lifetime Support Active</div>
              <p className="text-xs text-muted-foreground">Your business is live. We remain your ongoing infrastructure partner.</p>
            </div>
            <div className="flex gap-2">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-2 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-200">WhatsApp</a>
              <a href={`mailto:${SITE.email}`} className="text-xs px-3 py-2 rounded-full bg-white/[0.04] border border-white/10">Email</a>
            </div>
          </div>
        )}

        {/* Timeline + side cards */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 glass-strong rounded-3xl p-6 border border-white/8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-gold" />Setup timeline</h2>
              <span className="text-xs text-muted-foreground">{meta.label}</span>
            </div>
            <CaseTimeline stages={stages} />
          </div>

          <div className="grid gap-4 content-start">
            <div className="glass-strong rounded-3xl p-6 border border-white/8">
              <h3 className="font-display text-base flex items-center gap-2 mb-3"><FileText className="w-4 h-4 text-gold" />Documents</h3>
              <DocumentsPanel caseId={cas?.id ?? null} documents={docs} />
            </div>

            <div className="glass-strong rounded-3xl p-6 border border-white/8">
              <h3 className="font-display text-base flex items-center gap-2 mb-3"><Activity className="w-4 h-4 text-gold" />Activity</h3>
              {activity.length === 0 ? (
                <p className="text-xs text-muted-foreground">No activity yet.</p>
              ) : (
                <ol className="space-y-2.5 max-h-[280px] overflow-auto custom-scroll pr-2">
                  {activity.map((a: any) => (
                    <li key={a.id} className="text-xs border-l border-gold/30 pl-3">
                      <div className="text-foreground">{STAGE_META[a.action_title as StageKey]?.label ?? a.action_title}</div>
                      <div className="text-muted-foreground">{new Date(a.created_at).toLocaleString()} · {a.status}</div>
                      {a.action_description && <div className="text-muted-foreground/80 mt-0.5">{a.action_description}</div>}
                    </li>
                  ))}
                </ol>
              )}
            </div>

            <div className="glass-strong rounded-3xl p-6 border border-white/8">
              <h3 className="font-display text-base flex items-center gap-2 mb-3"><CreditCard className="w-4 h-4 text-gold" />Quotes &amp; invoices</h3>
              {quotes.length === 0 ? (
                <p className="text-xs text-muted-foreground">No quotes yet. <Link to="/quote" className="text-gold">Generate one →</Link></p>
              ) : (
                <ul className="space-y-2">
                  {quotes.map((q: any) => (
                    <li key={q.id} className="text-xs flex items-center justify-between border-b border-white/5 pb-2">
                      <div>
                        <div className="text-foreground">{q.quote_number}</div>
                        <div className="text-muted-foreground">{q.selected_jurisdiction} · AED {q.total_estimated_cost_min?.toLocaleString()}–{q.total_estimated_cost_max?.toLocaleString()}</div>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-gold">{q.status}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="glass-strong rounded-3xl p-6 border border-gold/25 bg-gold/[0.03]">
              <h3 className="font-display text-base flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold" />Try the AI Advisor</h3>
              <p className="text-xs text-muted-foreground mt-2">Get an instant structural recommendation for additional entities.</p>
              <Link to="/advisor" className="mt-3 inline-flex items-center gap-1.5 text-sm text-gold">Open advisor <ExternalLink className="w-3 h-3" /></Link>
            </div>
          </div>
        </div>
        <footer className="mt-12 pt-6 border-t border-white/5 text-[11px] text-muted-foreground/70 leading-relaxed text-center">
          <div>{SITE.name} · Registration No: <span className="tabular-nums">{SITE.registrationNumber}</span></div>
          <div>{SITE.address} · <a href={`mailto:${SITE.email}`} className="hover:text-foreground/80">{SITE.email}</a></div>
        </footer>
      </main>
    </div>
  );
}
