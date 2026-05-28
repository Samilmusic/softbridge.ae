import { useRef, useState } from "react";
import { FileText, Upload, Check, X, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { REQUIRED_DOCS } from "@/lib/case-stages";
import { toast } from "sonner";

interface DocRow {
  id: string;
  document_type: string;
  status: "pending" | "uploaded" | "approved" | "rejected";
  file_url: string | null;
  admin_note: string | null;
}

export function DocumentsPanel({ caseId, documents }: { caseId: string | null; documents: DocRow[] }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [target, setTarget] = useState<{ id?: string; type: string } | null>(null);
  const [uploading, setUploading] = useState(false);

  // Merge required + existing; existing wins on doc_type match
  const map = new Map<string, DocRow>();
  documents.forEach((d) => map.set(d.document_type, d));
  const merged = REQUIRED_DOCS.map((t) => map.get(t) ?? ({ id: "", document_type: t, status: "pending", file_url: null, admin_note: null } as DocRow));
  // Plus any extras requested by staff
  documents.filter((d) => !REQUIRED_DOCS.includes(d.document_type)).forEach((d) => merged.push(d));

  const onPick = (d: DocRow) => {
    if (!caseId) return;
    setTarget({ id: d.id || undefined, type: d.document_type });
    fileRef.current?.click();
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || !caseId || !target) return;
    setUploading(true);
    try {
      const path = `${caseId}/${Date.now()}-${f.name.replace(/[^\w.\-]/g, "_")}`;
      const { error: upErr } = await supabase.storage.from("client-documents").upload(path, f, { upsert: false });
      if (upErr) throw upErr;

      if (target.id) {
        const { error } = await supabase.from("documents")
          .update({ status: "uploaded", file_url: path, uploaded_at: new Date().toISOString() })
          .eq("id", target.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("documents").insert({
          case_id: caseId,
          document_type: target.type,
          status: "uploaded",
          file_url: path,
          uploaded_at: new Date().toISOString(),
        });
        if (error) throw error;
      }
      toast.success(`${target.type} uploaded`);
      // Crude: reload page section
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message ?? "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const statusChip = (s: DocRow["status"]) => {
    const map = {
      pending:  { c: "text-muted-foreground border-white/10 bg-white/[0.03]", i: <Clock className="w-3 h-3" />, t: "Pending" },
      uploaded: { c: "text-sky-300 border-sky-300/30 bg-sky-300/10",          i: <Upload className="w-3 h-3" />, t: "In review" },
      approved: { c: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10", i: <Check className="w-3 h-3" />, t: "Approved" },
      rejected: { c: "text-red-400 border-red-400/30 bg-red-400/10",          i: <X className="w-3 h-3" />, t: "Rejected" },
    }[s];
    return <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${map.c}`}>{map.i}{map.t}</span>;
  };

  return (
    <div className="space-y-2">
      <input ref={fileRef} type="file" hidden onChange={onFile} accept=".pdf,.png,.jpg,.jpeg,.webp,.heic,.doc,.docx" />
      {merged.map((d, i) => (
        <div key={d.id || `${d.document_type}-${i}`} className="flex items-center justify-between gap-3 border border-white/5 rounded-xl px-3 py-2.5 bg-white/[0.02]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/8 flex items-center justify-center text-gold"><FileText className="w-4 h-4" /></div>
            <div className="min-w-0">
              <div className="text-sm text-foreground truncate">{d.document_type}</div>
              {d.admin_note && <div className="text-[11px] text-muted-foreground truncate">{d.admin_note}</div>}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {statusChip(d.status)}
            {(d.status === "pending" || d.status === "rejected") && caseId && (
              <button onClick={() => onPick(d)} disabled={uploading} className="text-[11px] px-2.5 py-1 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition disabled:opacity-50">
                {uploading ? "…" : "Upload"}
              </button>
            )}
          </div>
        </div>
      ))}
      <p className="text-[11px] text-muted-foreground pt-1">Files are encrypted and only visible to your assigned consultant.</p>
    </div>
  );
}
