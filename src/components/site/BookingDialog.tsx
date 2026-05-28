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
import { CheckCircle2, Loader2, MessageCircle, Video, Phone, MonitorPlay, Sparkles, CalendarDays, Clock, ArrowRight, ArrowLeft, CalendarPlus, ExternalLink } from "lucide-react";
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
      <DialogContent className="glass-strong border-white/10 max-w-3xl p-0 overflow-hidden">
        {/* Ambient gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-primary/25 blur-[120px]" />
          <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-accent/20 blur-[120px]" />
        </div>

        {done ? (
          <div className="p-10 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mb-5 animate-in zoom-in-50 duration-500">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl text-foreground">Your consultation has been scheduled.</h3>
            <p className="text-sm text-muted-foreground mt-2">A confirmation has been sent to <span className="text-foreground">{form.email}</span>.</p>

            <div className="mt-6 grid sm:grid-cols-3 gap-3 max-w-xl mx-auto">
              <div className="glass rounded-xl p-4 text-left">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Date</div>
                <div className="text-sm text-foreground mt-1">{date && format(date, "EEE, d MMM")}</div>
              </div>
              <div className="glass rounded-xl p-4 text-left">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Time</div>
                <div className="text-sm text-foreground mt-1">{time && formatSlot(time)} GST</div>
              </div>
              <div className="glass rounded-xl p-4 text-left">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Method</div>
                <div className="text-sm text-foreground mt-1">{methodLabel}</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              {date && time && (
                <Button asChild variant="outline" className="border-white/15">
                  <a href={buildCalendarUrl({ date, time, method: methodLabel, name: form.name })} target="_blank" rel="noreferrer">
                    <CalendarPlus className="w-4 h-4" /> Add to Calendar
                  </a>
                </Button>
              )}
              <Button asChild>
                <a href="/portal"><ExternalLink className="w-4 h-4" /> Open Client Portal</a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-primary/90 mb-2">
                  <Sparkles className="w-3 h-3" /> Premium scheduling
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-foreground leading-tight">Book a private consultation</h2>
                <p className="text-sm text-muted-foreground mt-1.5">A 30–45 minute session with a senior UAE setup advisor.</p>
              </div>
              {/* Stepper */}
              <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                <span className={cn("h-1.5 w-8 rounded-full transition-colors", step === 1 ? "bg-primary" : "bg-primary/40")} />
                <span className={cn("h-1.5 w-8 rounded-full transition-colors", step === 2 ? "bg-primary" : "bg-white/10")} />
              </div>
            </div>

            {step === 1 && (
              <div className="grid md:grid-cols-2 gap-6 animate-in fade-in-50 duration-300">
                {/* Calendar */}
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-2 px-2 pb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
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

                {/* Time slots */}
                <div className="glass rounded-2xl p-5 flex flex-col">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" /> Choose a time {date && <span className="normal-case tracking-normal text-foreground/70 ml-1">· {format(date, "EEE, d MMM")} (GST)</span>}
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
                              ? "bg-primary text-primary-foreground border-primary shadow-[0_0_24px_oklch(0.66_0.22_285_/_0.55)]"
                              : "bg-white/5 text-foreground border-white/10 hover:border-primary/50 hover:bg-primary/10",
                          )}
                        >
                          {formatSlot(s)}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-4">Times shown in Gulf Standard Time (GMT+4). We confirm final slot within one business hour.</p>
                </div>

                <div className="md:col-span-2 flex items-center justify-between pt-2">
                  <p className="text-xs text-muted-foreground">Step 1 of 2 — Schedule</p>
                  <Button onClick={() => setStep(2)} disabled={!canContinue}>
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={onSubmit} className="grid gap-6 animate-in fade-in-50 duration-300">
                {/* Method */}
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Meeting method</div>
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
                            "group relative rounded-xl p-3.5 text-left border transition-all duration-200",
                            active
                              ? "bg-primary/15 border-primary/60 shadow-[0_0_28px_oklch(0.66_0.22_285_/_0.35)]"
                              : "bg-white/5 border-white/10 hover:border-primary/40 hover:bg-white/10",
                          )}
                        >
                          <Icon className={cn("w-5 h-5 mb-2 transition-colors", active ? "text-primary" : "text-foreground/80 group-hover:text-primary")} />
                          <div className="text-sm font-medium text-foreground">{m.label}</div>
                          <div className="text-[11px] text-muted-foreground mt-0.5">{m.hint}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Details */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="name" label="Full name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field id="email" label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">WhatsApp number</Label>
                    <PhoneField floatingLabel={false} label="WhatsApp number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                  </div>
                  <Field id="nat" label="Nationality" value={form.nationality} onChange={(v) => setForm({ ...form, nationality: v })} />
                  <Field id="act" label="Business activity" placeholder="e.g. consultancy, trading…" value={form.activity} onChange={(v) => setForm({ ...form, activity: v })} />
                  <Field id="jur" label="Preferred jurisdiction" placeholder="Mainland / Free Zone / Offshore" value={form.jurisdiction} onChange={(v) => setForm({ ...form, jurisdiction: v })} />
                </div>

                {/* AI assist */}
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Our system will help match you with the most suitable UAE setup structure before your consultation.</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Select what matters most — your advisor will tailor the call.</p>
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
                                  ? "bg-primary/20 border-primary/60 text-foreground shadow-[0_0_16px_oklch(0.66_0.22_285_/_0.4)]"
                                  : "bg-white/5 border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/40",
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
                  <Label htmlFor="message" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Additional notes</Label>
                  <Textarea id="message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Timeline, residency need, banking goals…" className="mt-2 bg-white/5 border-white/10 focus-visible:ring-primary/60" />
                </div>

                {/* Summary + actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-white/5">
                  <div className="text-xs text-muted-foreground">
                    {date && time ? (
                      <>Scheduled for <span className="text-foreground">{format(date, "EEE, d MMM")} · {formatSlot(time)} GST</span> · {methodLabel}</>
                    ) : "Step 2 of 2"}
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="border-white/15" onClick={() => setStep(1)}>
                      <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button type="submit" disabled={loading}>
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
      <Label htmlFor={id} className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}{required && <span className="text-primary/80"> *</span>}</Label>
      <Input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-11 bg-white/5 border-white/10 focus-visible:ring-primary/60 focus-visible:border-primary/50 transition-colors"
      />
    </div>
  );
}
