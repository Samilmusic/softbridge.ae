import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { listAllCases, updateStage } from "@/lib/case.functions";
import { STAGE_META, STAGE_LIST, type StageKey, type StageStatus } from "@/lib/case-stages";
import { LogOut, ShieldCheck, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({ component: AdminPage });

function AdminPage() {
  const fetchAll = useServerFn(listAllCases);
  const mutate = useServerFn(updateStage);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [cases, setCases] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [stages, setStages] = useState<any[]>([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchAll();
      setCases(res.cases);
    } catch (e: any) {
      if ((e.message ?? "").toLowerCase().includes("forbidden")) setForbidden(true);
      else toast.error(e.message ?? "Could not load cases");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const openCase = async (c: any) => {
    setSelected(c);
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

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,oklch(0.22_0.04_265),oklch(0.13_0.02_260))] text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg gold-gradient flex items-center justify-center"><span className="text-[12px] font-bold text-[oklch(0.15_0.02_260)]">SB</span></div>
            <div className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground">Admin</div>
          </Link>
          <button onClick={() => supabase.auth.signOut()} className="text-xs text-muted-foreground inline-flex items-center gap-1.5"><LogOut className="w-3.5 h-3.5" />Sign out</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-8 grid lg:grid-cols-[1fr_420px] gap-6">
        <div>
          <h1 className="font-display text-2xl mb-4">Cases</h1>
          {loading ? <Loader2 className="w-5 h-5 animate-spin text-gold" /> : (
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
          )}
        </div>

        <aside className="glass-strong rounded-2xl border border-white/8 p-5 h-fit lg:sticky lg:top-20">
          {selected ? (
            <>
              <div className="text-[10px] uppercase tracking-[0.22em] text-gold">Case</div>
              <h2 className="font-display text-xl mt-1">{selected.company_name}</h2>
              <p className="text-xs text-muted-foreground">{selected.progress_percentage}% · {selected.status}</p>

              <div className="mt-4 space-y-2 max-h-[60vh] overflow-auto custom-scroll pr-1">
                {STAGE_LIST.map((meta) => {
                  const s = stages.find((x) => x.stage_key === meta.key);
                  return <StageEditor key={meta.key} meta={meta} stage={s} onChange={change} />;
                })}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Select a case to manage its stages and send updates.</p>
          )}
        </aside>
      </main>
    </div>
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
