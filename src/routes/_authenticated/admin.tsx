import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { listAllCases, updateStage } from "@/lib/case.functions";
import { getAdminOverview } from "@/lib/admin.functions";
import { STAGE_META, STAGE_LIST, type StageKey, type StageStatus } from "@/lib/case-stages";
import { LogOut, ShieldCheck, Loader2, Briefcase, CalendarClock, FileText, ClipboardList, Activity, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({ component: AdminPage });

type Tab = "overview" | "cases" | "consultations" | "quotes" | "onboarding";

function AdminPage() {
  const fetchAll = useServerFn(listAllCases);
  const fetchOverview = useServerFn(getAdminOverview);
  const mutate = useServerFn(updateStage);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [overview, setOverview] = useState<any | null>(null);
  const [cases, setCases] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [stages, setStages] = useState<any[]>([]);

  const load = async () => {
    setLoading(true);
    try {
      const [ov, all] = await Promise.all([fetchOverview(), fetchAll()]);
      setOverview(ov);
      setCases(all.cases);
    } catch (e: any) {
      if ((e.message ?? "").toLowerCase().includes("forbidden")) setForbidden(true);
      else toast.error(e.message ?? "Could not load admin data");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const openCase = async (c: any) => {
    setSelected(c);
    setTab("cases");
    const { data } = await supabase.from("case_stages").select("*").eq("case_id", c.id).order("position");
    setStages(data ?? []);
  };

  const change = async (stageKey: string, status: StageStatus, publicNote: string) => {
    if (!selected) return;
    try {
      await mutate({ data: { caseId: selected.id, stageKey, status, publicNote, sendEmail: true } });
      toast.success("Stage updated & client emailed");
      const { data } = await supabase.from("case_stages").select("*").eq("case_id", selected.id).order("position");
      setStages(data ?? []);
      load();
    } catch (e: any) { toast.error(e.message ?? "Update failed"); }
  };

  if (forbidden) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-foreground p-6 text-center">
        <ShieldCheck className="w-10 h-10 text-gold mb-3" />
        <h1 className="font-display text-2xl">Admin access required</h1>
        <p className="text-sm text-muted-foreground mt-2">Your account does not have admin or consultant privileges.</p>
        <Link to="/portal" className="mt-4 text-gold text-sm">Back to portal</Link>
      </div>
    );
  }

  const s = overview?.stats;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,oklch(0.98_0.015_290),oklch(0.96_0.02_285))] dark:bg-[radial-gradient(circle_at_top_right,oklch(0.22_0.04_265),oklch(0.13_0.02_260))] text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <Logo size={32} />
            <div className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground">Admin</div>
          </Link>
          <button onClick={() => supabase.auth.signOut()} className="text-xs text-muted-foreground inline-flex items-center gap-1.5"><LogOut className="w-3.5 h-3.5" />Sign out</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-gold" /></div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <StatCard icon={Briefcase} label="Active cases" value={s?.activeCases ?? 0} sub={`${s?.totalCases ?? 0} total`} />
              <StatCard icon={CalendarClock} label="Pending consultations" value={s?.pendingConsultations ?? 0} sub={`${s?.totalConsultations ?? 0} total`} />
              <StatCard icon={FileText} label="Quote requests" value={s?.totalQuoteRequests ?? 0} sub="all time" />
              <StatCard icon={ClipboardList} label="Onboarding" value={s?.totalOnboarding ?? 0} sub="submissions" />
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-5">
              {([
                ["overview","Overview"],
                ["cases","Cases"],
                ["consultations","Consultations"],
                ["quotes","Quote requests"],
                ["onboarding","Onboarding"],
              ] as [Tab,string][]).map(([k,label]) => (
                <button key={k} onClick={() => setTab(k)} className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider border transition ${tab===k?"bg-gold/15 border-gold/40 text-gold":"border-white/10 text-muted-foreground hover:text-foreground"}`}>{label}</button>
              ))}
            </div>

            {tab === "overview" && <OverviewPanel overview={overview} onOpenCase={openCase} />}
            {tab === "consultations" && <ConsultationsTable rows={overview?.consultations ?? []} />}
            {tab === "quotes" && <QuotesTable rows={overview?.quotes ?? []} />}
            {tab === "onboarding" && <OnboardingTable rows={overview?.onboarding ?? []} />}
            {tab === "cases" && (
              <div className="grid lg:grid-cols-[1fr_420px] gap-6">
                <div className="glass-strong rounded-2xl border border-white/8 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-white/[0.03] text-[10px] uppercase tracking-wider text-muted-foreground">
                      <tr><th className="text-left p-3">Company</th><th className="text-left p-3">Stage</th><th className="text-left p-3">Progress</th><th className="text-left p-3">Status</th></tr>
                    </thead>
                    <tbody>
                      {cases.map((c) => (
                        <tr key={c.id} onClick={() => openCase(c)} className={`border-t border-white/5 cursor-pointer hover:bg-white/[0.03] ${selected?.id === c.id ? "bg-gold/5" : ""}`}>
                          <td className="p-3">{c.company_name}</td>
                          <td className="p-3 text-muted-foreground">{STAGE_META[c.current_stage as StageKey]?.label}</td>
                          <td className="p-3">{c.progress_percentage}%</td>
                          <td className="p-3 text-xs uppercase tracking-wider text-gold">{c.status}</td>
                        </tr>
                      ))}
                      {cases.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted-foreground text-sm">No cases yet.</td></tr>}
                    </tbody>
                  </table>
                </div>

                <aside className="glass-strong rounded-2xl border border-white/8 p-5 h-fit lg:sticky lg:top-20">
                  {selected ? (
                    <>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-gold">Case</div>
                      <h2 className="font-display text-xl mt-1">{selected.company_name}</h2>
                      <p className="text-xs text-muted-foreground">{selected.progress_percentage}% · {selected.status}</p>
                      <div className="mt-4 space-y-2 max-h-[60vh] overflow-auto custom-scroll pr-1">
                        {STAGE_LIST.map((meta) => {
                          const st = stages.find((x) => x.stage_key === meta.key);
                          return <StageEditor key={meta.key} meta={meta} stage={st} onChange={change} />;
                        })}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Select a case to manage its stages and send updates.</p>
                  )}
                </aside>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub }: { icon: any; label: string; value: number | string; sub?: string }) {
  return (
    <div className="glass-strong rounded-2xl border border-white/8 p-4">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
        <Icon className="w-4 h-4 text-gold" />
      </div>
      <div className="font-display text-3xl mt-2">{value}</div>
      {sub && <div className="text-[11px] text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  );
}

function OverviewPanel({ overview, onOpenCase }: { overview: any; onOpenCase: (c: any) => void }) {
  const recentCases = (overview?.cases ?? []).slice(0, 5);
  const recentConsults = (overview?.consultations ?? []).slice(0, 5);
  const activity = overview?.activity ?? [];
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <Panel title="Recent cases">
        {recentCases.length === 0 ? <Empty>No cases yet.</Empty> : (
          <ul className="divide-y divide-white/5">
            {recentCases.map((c: any) => (
              <li key={c.id} onClick={() => onOpenCase(c)} className="py-2.5 flex items-center justify-between cursor-pointer hover:bg-white/[0.03] px-2 rounded-lg">
                <div>
                  <div className="text-sm">{c.company_name}</div>
                  <div className="text-[11px] text-muted-foreground">{STAGE_META[c.current_stage as StageKey]?.label}</div>
                </div>
                <div className="text-xs text-gold">{c.progress_percentage}%</div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Panel title="Recent consultations">
        {recentConsults.length === 0 ? <Empty>No consultation requests yet.</Empty> : (
          <ul className="divide-y divide-white/5">
            {recentConsults.map((c: any) => (
              <li key={c.id} className="py-2.5 px-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">{c.name}</div>
                  <div className="text-[10px] uppercase tracking-wider text-gold">{c.status}</div>
                </div>
                <div className="text-[11px] text-muted-foreground flex items-center gap-3 mt-0.5">
                  <span className="inline-flex items-center gap-1"><Mail className="w-3 h-3" />{c.email}</span>
                  {c.phone && <span className="inline-flex items-center gap-1"><Phone className="w-3 h-3" />{c.phone}</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Panel title="Latest activity" className="lg:col-span-2">
        {activity.length === 0 ? <Empty>No activity yet.</Empty> : (
          <ul className="space-y-2">
            {activity.map((a: any) => (
              <li key={a.id} className="flex items-start gap-3 text-sm">
                <Activity className="w-3.5 h-3.5 text-gold mt-1 shrink-0" />
                <div className="flex-1">
                  <div className="text-foreground">{a.action_title}</div>
                  {a.action_description && <div className="text-[12px] text-muted-foreground">{a.action_description}</div>}
                </div>
                <div className="text-[11px] text-muted-foreground">{new Date(a.created_at).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

function Panel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`glass-strong rounded-2xl border border-white/8 p-5 ${className}`}>
      <h3 className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">{title}</h3>
      {children}
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-muted-foreground py-4 text-center">{children}</div>;
}

function ConsultationsTable({ rows }: { rows: any[] }) {
  if (rows.length === 0) return <Panel title="Consultations"><Empty>No consultation requests yet.</Empty></Panel>;
  return (
    <Panel title="Consultation requests">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left p-2">Name</th><th className="text-left p-2">Email</th><th className="text-left p-2">Phone</th><th className="text-left p-2">Method</th><th className="text-left p-2">Status</th><th className="text-left p-2">When</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-white/5">
                <td className="p-2">{r.name}</td>
                <td className="p-2"><a className="text-gold" href={`mailto:${r.email}`}>{r.email}</a></td>
                <td className="p-2">{r.phone || "—"}</td>
                <td className="p-2 text-muted-foreground">{r.method}</td>
                <td className="p-2 text-xs uppercase tracking-wider text-gold">{r.status}</td>
                <td className="p-2 text-[11px] text-muted-foreground">{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function QuotesTable({ rows }: { rows: any[] }) {
  if (rows.length === 0) return <Panel title="Quote requests"><Empty>No quote requests yet.</Empty></Panel>;
  return (
    <Panel title="Quote requests">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left p-2">Name</th><th className="text-left p-2">Email</th><th className="text-left p-2">Jurisdiction</th><th className="text-left p-2">Activity</th><th className="text-left p-2">Visas</th><th className="text-left p-2">When</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-white/5">
                <td className="p-2">{r.full_name}</td>
                <td className="p-2"><a className="text-gold" href={`mailto:${r.email}`}>{r.email}</a></td>
                <td className="p-2 text-muted-foreground">{r.preferred_jurisdiction || "—"}</td>
                <td className="p-2 text-muted-foreground">{r.business_activity || "—"}</td>
                <td className="p-2">{r.number_of_visas ?? 0}</td>
                <td className="p-2 text-[11px] text-muted-foreground">{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function OnboardingTable({ rows }: { rows: any[] }) {
  if (rows.length === 0) return <Panel title="Onboarding submissions"><Empty>No onboarding submissions yet.</Empty></Panel>;
  return (
    <Panel title="Onboarding submissions">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left p-2">Name</th><th className="text-left p-2">Email</th><th className="text-left p-2">Jurisdiction</th><th className="text-left p-2">Activity</th><th className="text-left p-2">Status</th><th className="text-left p-2">When</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-white/5">
                <td className="p-2">{r.full_name}</td>
                <td className="p-2"><a className="text-gold" href={`mailto:${r.email}`}>{r.email}</a></td>
                <td className="p-2 text-muted-foreground">{r.preferred_jurisdiction || "—"}</td>
                <td className="p-2 text-muted-foreground">{r.business_activity || "—"}</td>
                <td className="p-2 text-xs uppercase tracking-wider text-gold">{r.status}</td>
                <td className="p-2 text-[11px] text-muted-foreground">{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function StageEditor({ meta, stage, onChange }: { meta: typeof STAGE_LIST[number]; stage: any; onChange: (key: string, status: StageStatus, note: string) => void | Promise<void> }) {
  const [status, setStatus] = useState<StageStatus>((stage?.status as StageStatus) ?? "not_started");
  const [note, setNote] = useState<string>(stage?.public_note ?? "");

  useEffect(() => {
    setStatus((stage?.status as StageStatus) ?? "not_started");
    setNote(stage?.public_note ?? "");
  }, [stage]);

  return (
    <div className="border border-white/8 rounded-xl p-3 bg-white/[0.02]">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm">{meta.label}</div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <select value={status} onChange={(e) => setStatus(e.target.value as StageStatus)} className="bg-white/[0.04] border border-white/10 rounded-lg px-2 py-1.5 text-xs">
          {(["not_started","in_progress","waiting_client","under_review","completed","issue"] as StageStatus[]).map((s) => <option key={s} value={s} className="bg-[#141a2b]">{s}</option>)}
        </select>
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Public note for client" className="bg-white/[0.04] border border-white/10 rounded-lg px-2 py-1.5 text-xs" />
      </div>
      <button onClick={() => onChange(meta.key, status, note)} className="mt-2 text-[11px] gold-gradient text-[oklch(0.15_0.02_260)] px-3 py-1 rounded-full font-semibold">Save &amp; email client</button>
    </div>
  );
}
