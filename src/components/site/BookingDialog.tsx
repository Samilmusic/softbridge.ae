import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useServerFn } from "@tanstack/react-start";
import { submitBooking } from "@/lib/booking.functions";
import { toast } from "sonner";
import { CheckCircle2, Loader2, MessageCircle, Video, Phone, MonitorPlay, Sparkles, CalendarDays, Clock, ArrowRight, ArrowLeft, CalendarPlus, ExternalLink, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { PhoneField } from "@/components/ui/phone-field";

type Method = "whatsapp" | "google_meet" | "zoom" | "phone";

const METHODS: { id: Method; label: string; hint: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "whatsapp", label: "WhatsApp Call", hint: "Quick & informal", icon: MessageCircle },
  { id: "google_meet", label: "Google Meet", hint: "Screen-share ready", icon: MonitorPlay },
  { id: "zoom", label: "Zoom", hint: "Video meeting", icon: Video },
  { id: "phone", label: "Phone Call", hint: "Direct dial", icon: Phone },
];

const SLOTS = ["10:00", "10:30", "11:00", "11:30", "12:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

const TAGS = ["Lowest Cost", "Fastest Setup", "Banking Friendly", "Residency Focused", "E-Commerce", "Consulting", "AI/Tech Business"];

const COUNTRIES = [
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "JO", name: "Jordan", flag: "🇯🇴" },
  { code: "LB", name: "Lebanon", flag: "🇱🇧" },
  { code: "IQ", name: "Iraq", flag: "🇮🇶" },
  { code: "IR", name: "Iran", flag: "🇮🇷" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼" },
  { code: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "BH", name: "Bahrain", flag: "🇧🇭" },
  { code: "OM", name: "Oman", flag: "🇴🇲" },
  { code: "YE", name: "Yemen", flag: "🇾🇪" },
  { code: "SY", name: "Syria", flag: "🇸🇾" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "NP", name: "Nepal", flag: "🇳🇵" },
  { code: "AF", name: "Afghanistan", flag: "🇦🇫" },
  { code: "KZ", name: "Kazakhstan", flag: "🇰🇿" },
  { code: "UZ", name: "Uzbekistan", flag: "🇺🇿" },
  { code: "AZ", name: "Azerbaijan", flag: "🇦🇿" },
  { code: "AM", name: "Armenia", flag: "🇦🇲" },
  { code: "GE", name: "Georgia", flag: "🇬🇪" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "RO", name: "Romania", flag: "🇷🇴" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "MA", name: "Morocco", flag: "🇲🇦" },
  { code: "TN", name: "Tunisia", flag: "🇹🇳" },
  { code: "DZ", name: "Algeria", flag: "🇩🇿" },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
];

function NationalitySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = React.useState<React.CSSProperties>({});

  const filtered = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const selected = COUNTRIES.find((c) => c.name === value);

  const handleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
    setOpen((v) => !v);
  };

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <Label className="text-[10px] uppercase tracking-[0.22em] text-violet-600 font-semibold mb-1.5 block">
        Nationality
      </Label>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpen}
        className={cn(
          "w-full h-12 mt-2 px-3 rounded-xl border bg-white text-left flex items-center gap-2 transition-all",
          "border-violet-200 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]",
          "hover:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-400/30 focus:border-violet-400",
          open && "border-violet-400 ring-4 ring-violet-400/30"
        )}
      >
        {selected ? (
          <>
            <span className="text-lg">{selected.flag}</span>
            <span className="flex-1 text-sm">{selected.name}</span>
          </>
        ) : (
          <span className="flex-1 text-sm text-slate-400">Select nationality…</span>
        )}
        <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          style={dropdownStyle}
          className="rounded-xl border border-violet-100 bg-white shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)] overflow-hidden"
        >
          <div className="p-2 border-b border-violet-50">
            <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-violet-50">
              <Search className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country…"
                className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-slate-400">No results</div>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    onChange(c.name);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors",
                    value === c.name
                      ? "bg-violet-50 text-violet-700 font-medium"
                      : "text-slate-700 hover:bg-violet-50/60"
                  )}
                >
                  <span className="text-base">{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const formatSlot = (s: string) => {
  const [h, m] = s.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${m.toString().padStart(2, "0")} ${period}`;
};

function buildCalendarUrl(opts: { date: Date; time: string; method: string; name: string }) {
  const [h, m] = opts.time.split(":").map(Number);
  const start = new Date(opts.date);
  start.setHours(h, m, 0, 0);
  const end = new Date(start.getTime() + 45 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Soft Bridge — UAE Setup Consultation",
    details: `Consultation with Soft Bridge FZE LLC via ${opts.method}. We'll reach out to confirm.`,
    location: opts.method,
    dates: `${fmt(start)}/${fmt(end)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function BookingDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const submit = useServerFn(submitBooking);
  const [step, setStep] = React.useState<1 | 2>(1);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const [date, setDate] = React.useState<Date | undefined>();
  const [time, setTime] = React.useState<string>("");
  const [method, setMethod] = React.useState<Method>("whatsapp");
  const [tags, setTags] = React.useState<string[]>([]);
  const [form, setForm] = React.useState({
    name: "", email: "", phone: "",
    nationality: "", activity: "", jurisdiction: "",
    message: "",
  });

  const reset = () => {
    setStep(1); setDone(false); setLoading(false);
    setDate(undefined); setTime(""); setMethod("whatsapp"); setTags([]);
    setForm({ name: "", email: "", phone: "", nationality: "", activity: "", jurisdiction: "", message: "" });
  };

  const handleClose = (v: boolean) => {
    onOpenChange(v);
    if (!v) setTimeout(reset, 200);
  };

  const canContinue = !!date && !!time;
  const methodLabel = METHODS.find((m) => m.id === method)?.label ?? "WhatsApp Call";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    setLoading(true);
    try {
      await submit({
        data: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          preferredDate: format(date, "EEE, d MMM yyyy"),
          preferredTime: `${formatSlot(time)} GST`,
          nationality: form.nationality,
          activity: form.activity,
          jurisdiction: form.jurisdiction,
          tags,
          method,
          message: form.message,
        },
      });
      setDone(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 60);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="bg-white/95 backdrop-blur-2xl border border-violet-100 max-w-3xl p-0 overflow-hidden shadow-[0_40px_120px_-30px_rgba(124,58,237,0.45)] rounded-3xl">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-violet-300/30 blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-fuchsia-300/25 blur-[120px]" />
        </div>

        {done ? (
          <div className="p-10 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-5 animate-in zoom-in-50 duration-500 shadow-lg shadow-violet-500/40">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display text-2xl text-slate-900">Your consultation has been scheduled.</h3>
            <p className="text-sm text-slate-600 mt-2">A confirmation has been sent to <span className="text-slate-900 font-medium">{form.email}</span>.</p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3 max-w-xl mx-auto">
              {[
                { label: "Date", value: date && format(date, "EEE, d MMM") },
                { label: "Time", value: time ? `${formatSlot(time)} GST` : "" },
                { label: "Method", value: methodLabel },
              ].map((it) => (
                <div key={it.label} className="rounded-xl bg-white ring-1 ring-violet-100 p-4 text-left shadow-sm">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-violet-600 font-semibold">{it.label}</div>
                  <div className="text-sm text-slate-900 mt-1">{it.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              {date && time && (
                <Button asChild variant="outline" className="border-violet-200 bg-white hover:bg-violet-50 text-slate-800">
                  <a href={buildCalendarUrl({ date, time, method: methodLabel, name: form.name })} target="_blank" rel="noreferrer">
                    <CalendarPlus className="w-4 h-4" /> Add to Calendar
                  </a>
                </Button>
              )}
              <Button asChild className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-95 text-white">
                <a href="/portal"><ExternalLink className="w-4 h-4" /> Open Client Portal</a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-8 sm:p-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 ring-1 ring-violet-200 text-[10px] uppercase tracking-[0.22em] text-violet-700 font-semibold mb-3">
                  <Sparkles className="w-3 h-3" /> Premium scheduling
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-slate-900 leading-tight">Book a private consultation</h2>
                <p className="text-sm text-slate-600 mt-1.5">A 30–45 minute session with a senior UAE setup advisor.</p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className={cn("h-1.5 w-8 rounded-full transition-colors", step === 1 ? "bg-gradient-to-r from-violet-500 to-fuchsia-500" : "bg-violet-200")} />
                <span className={cn("h-1.5 w-8 rounded-full transition-colors", step === 2 ? "bg-gradient-to-r from-violet-500 to-fuchsia-500" : "bg-violet-100")} />
              </div>
            </div>

            {step === 1 && (
              <div className="grid md:grid-cols-2 gap-6 animate-in fade-in-50 duration-300">
                <div className="rounded-2xl bg-white ring-1 ring-violet-100 shadow-[0_10px_30px_-15px_rgba(124,58,237,0.2)] p-4">
                  <div className="flex items-center gap-2 px-2 pb-2 text-[10px] uppercase tracking-[0.22em] text-violet-600 font-semibold">
                    <CalendarDays className="w-3.5 h-3.5" /> Pick a date
                  </div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => isBefore(d, today) || d > maxDate || d.getDay() === 0 || d.getDay() === 6}
                    initialFocus
                    className="p-2 pointer-events-auto"
                  />
                </div>

                <div className="rounded-2xl bg-white ring-1 ring-violet-100 shadow-[0_10px_30px_-15px_rgba(124,58,237,0.2)] p-5 flex flex-col">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-violet-600 font-semibold">
                    <Clock className="w-3.5 h-3.5" /> Choose a time {date && <span className="normal-case tracking-normal text-slate-500 ml-1">· {format(date, "EEE, d MMM")} (GST)</span>}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 flex-1 content-start">
                    {SLOTS.map((s) => {
                      const active = time === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          disabled={!date}
                          onClick={() => setTime(s)}
                          className={cn(
                            "h-10 rounded-full text-xs font-medium border transition-all duration-200",
                            "disabled:opacity-40 disabled:cursor-not-allowed",
                            active
                              ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-violet-500 shadow-[0_8px_24px_-6px_rgba(124,58,237,0.5)]"
                              : "bg-white text-slate-700 border-violet-100 hover:border-violet-300 hover:bg-violet-50",
                          )}
                        >
                          {formatSlot(s)}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-4">Times shown in Gulf Standard Time (GMT+4). We confirm final slot within one business hour.</p>
                </div>

                <div className="md:col-span-2 flex items-center justify-between pt-2">
                  <p className="text-xs text-slate-500">Step 1 of 2 — Schedule</p>
                  <Button onClick={() => setStep(2)} disabled={!canContinue} className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-95 text-white shadow-[0_10px_30px_-10px_rgba(124,58,237,0.5)]">
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={onSubmit} className="grid gap-6 animate-in fade-in-50 duration-300">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-violet-600 font-semibold mb-3">Meeting method</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {METHODS.map((m) => {
                      const Icon = m.icon;
                      const active = method === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setMethod(m.id)}
                          className={cn(
                            "group relative rounded-2xl p-4 text-left border transition-all duration-200",
                            active
                              ? "bg-gradient-to-br from-violet-50 to-fuchsia-50 border-violet-400 shadow-[0_15px_40px_-15px_rgba(124,58,237,0.4)] -translate-y-0.5"
                              : "bg-white border-violet-100 hover:border-violet-300 hover:shadow-[0_10px_30px_-15px_rgba(124,58,237,0.25)] hover:-translate-y-0.5",
                          )}
                        >
                          <Icon className={cn("w-5 h-5 mb-2 transition-colors", active ? "text-violet-600" : "text-slate-600 group-hover:text-violet-600")} />
                          <div className="text-sm font-medium text-slate-900">{m.label}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{m.hint}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="name" label="Full name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field id="email" label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  <div>
                    <Label className="text-[10px] uppercase tracking-[0.22em] text-violet-600 font-semibold mb-1.5 block">WhatsApp number</Label>
                    <PhoneField floatingLabel={false} label="WhatsApp number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                  </div>
                  <NationalitySelect value={form.nationality} onChange={(v) => setForm({ ...form, nationality: v })} />
                  <Field id="act" label="Business activity" placeholder="e.g. consultancy, trading…" value={form.activity} onChange={(v) => setForm({ ...form, activity: v })} />
                  <Field id="jur" label="Preferred jurisdiction" placeholder="Mainland / Free Zone / Offshore" value={form.jurisdiction} onChange={(v) => setForm({ ...form, jurisdiction: v })} />
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-violet-50/70 to-fuchsia-50/50 ring-1 ring-violet-100 p-5">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-md shadow-violet-500/30">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-800 font-medium">Our system will help match you with the most suitable UAE setup structure before your consultation.</p>
                      <p className="text-[11px] text-slate-500 mt-1">Select what matters most — your advisor will tailor the call.</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {TAGS.map((t) => {
                          const active = tags.includes(t);
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTags((prev) => (active ? prev.filter((x) => x !== t) : [...prev, t]))}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-xs border transition-all duration-200",
                                active
                                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 border-violet-500 text-white shadow-[0_6px_18px_-6px_rgba(124,58,237,0.5)]"
                                  : "bg-white border-violet-200 text-slate-700 hover:border-violet-400 hover:bg-violet-50",
                              )}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-[10px] uppercase tracking-[0.22em] text-violet-600 font-semibold">Additional notes</Label>
                  <Textarea
                    id="message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Timeline, residency need, banking goals…"
                    className="mt-2 bg-white border-violet-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-violet-400/30 focus-visible:border-violet-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-violet-100">
                  <div className="text-xs text-slate-500">
                    {date && time ? (
                      <>Scheduled for <span className="text-slate-900 font-medium">{format(date, "EEE, d MMM")} · {formatSlot(time)} GST</span> · {methodLabel}</>
                    ) : "Step 2 of 2"}
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="border-violet-200 bg-white hover:bg-violet-50 text-slate-800" onClick={() => setStep(1)}>
                      <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-95 text-white shadow-[0_10px_30px_-10px_rgba(124,58,237,0.5)]">
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Confirming…</> : <>Confirm booking <ArrowRight className="w-4 h-4" /></>}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ id, label, value, onChange, type = "text", required, placeholder }: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-[10px] uppercase tracking-[0.22em] text-violet-600 font-semibold">
        {label}{required && <span className="text-fuchsia-500"> *</span>}
      </Label>
      <Input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-12 bg-white border-violet-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-violet-400/30 focus-visible:ring-4 focus-visible:border-violet-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-all rounded-xl"
      />
    </div>
  );
}
