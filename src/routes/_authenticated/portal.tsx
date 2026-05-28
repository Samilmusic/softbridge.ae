import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { ProgressTimeline, STAGES, type StageKey } from "@/components/portal/ProgressTimeline";
import { Building2, LogOut, MessageCircle, ShieldCheck, FileText, CreditCard, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WA_LINK } from "@/lib/site";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/portal")({ component: PortalPage });

interface ClientRow {
  id: string;
  company_name: string;
  stage: StageKey;
  progress_pct: number;
  assigned_consultant: string | null;
  notes: string | null;
}
interface ProfileRow { full_name: string | null; email: string; }

function PortalPage() {
  const { user } = useAuth();
  const [client, setClient] = useState<ClientRow | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [docs, setDocs] = useState<Array<{ id: string; doc_type: string; status: string }>>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: c }, { data: p }] = await Promise.all([
        supabase.from("clients").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("profiles").select("full_name,email").eq("id", user.id).maybeSingle(),
      ]);
      setClient(c as ClientRow | null);
      setProfile(p as ProfileRow | null);
      if (c) {
        const { data: d } = await supabase.from("document_requests").select("id,doc_type,status").eq("client_id", c.id);
        setDocs((d as Array<{ id: string; doc_type: string; status: string }>) ?? []);
      }
    })();
  }, [user]);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
  };

  const displayName = profile?.full_name || profile?.email || "Client";
  const stage = client?.stage ?? "consultation";
  const pct = client?.progress_pct ?? 5;
  const stageLabel = STAGES.find((s) => s.key === stage)?.label ?? "Consultation";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,oklch(0.22_0.04_265),oklch(0.13_0.02_260))] text-foreground">
      {/* Top bar */}
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-gold">Welcome back</div>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mt-1">{displayName}</h1>
            <p className="text-sm text-muted-foreground mt-1">Your UAE business infrastructure, live.</p>
          </div>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="glass-strong px-4 py-2.5 rounded-full text-sm inline-flex items-center gap-2 hover:border-gold/40 transition self-start"><MessageCircle className="w-4 h-4 text-gold" />Chat with consultant</a>
        </div>

        {/* Overview row */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 glass-strong rounded-3xl p-6 border border-white/8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Company</div>
                <div className="flex items-center gap-2 mt-1"><Building2 className="w-4 h-4 text-gold" /><span className="font-display text-lg">{client?.company_name ?? "Pending"}</span></div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Current stage</div>
                <div className="font-display text-lg text-gold mt-1">{stageLabel}</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-2"><span>Setup progress</span><span>{pct}%</span></div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full gold-gradient transition-all duration-700" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>
          <div className="glass-strong rounded-3xl p-6 border border-white/8">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Your consultant</div>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-[oklch(0.15_0.02_260)] font-bold">{(client?.assigned_consultant ?? "SB").slice(0,2).toUpperCase()}</div>
              <div>
                <div className="text-sm font-medium text-foreground">{client?.assigned_consultant ?? "Assignment pending"}</div>
                <div className="text-xs text-muted-foreground">Senior advisor · Soft Bridge</div>
              </div>
            </div>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="mt-4 w-full block text-center rounded-full bg-white/[0.04] border border-white/10 px-4 py-2 text-sm hover:border-gold/40 transition">Message on WhatsApp</a>
          </div>
        </div>

        {/* Timeline + docs */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 glass-strong rounded-3xl p-6 border border-white/8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-gold" />Setup timeline</h2>
              <span className="text-xs text-muted-foreground">{stageLabel}</span>
            </div>
            <ProgressTimeline current={stage} />
          </div>

          <div className="grid gap-4 content-start">
            <div className="glass-strong rounded-3xl p-6 border border-white/8">
              <h3 className="font-display text-base flex items-center gap-2"><FileText className="w-4 h-4 text-gold" />Documents</h3>
              {docs.length === 0 ? (
                <p className="text-xs text-muted-foreground mt-3">No document requests yet. Your consultant will request what's needed at the right stage.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {docs.map(d => (
                    <li key={d.id} className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                      <span>{d.doc_type}</span>
                      <span className={`text-[10px] uppercase tracking-wider ${d.status === "approved" ? "text-gold" : "text-muted-foreground"}`}>{d.status}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-[11px] text-muted-foreground mt-4">Secure upload arrives in the next release.</p>
            </div>

            <div className="glass-strong rounded-3xl p-6 border border-white/8 opacity-90">
              <h3 className="font-display text-base flex items-center gap-2"><CreditCard className="w-4 h-4 text-gold" />Invoices</h3>
              <p className="text-xs text-muted-foreground mt-3">Payment center activates with your first invoice.</p>
            </div>

            <div className="glass-strong rounded-3xl p-6 border border-gold/25 bg-gold/[0.03]">
              <h3 className="font-display text-base flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold" />Try the AI Advisor</h3>
              <p className="text-xs text-muted-foreground mt-2">Get an instant structural recommendation for additional entities.</p>
              <Link to="/advisor" className="mt-3 inline-flex items-center gap-1.5 text-sm text-gold">Open advisor <ExternalLink className="w-3 h-3" /></Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
