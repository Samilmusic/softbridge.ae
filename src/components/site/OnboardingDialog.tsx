import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import {
  startOnboarding, verifyOnboardingOtp, resendOnboardingOtp, completeOnboarding,
} from "@/lib/onboarding.functions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneField } from "@/components/ui/phone-field";
import {
  ArrowRight, ArrowLeft, Loader2, CheckCircle2, Mail, Sparkles, Shield, Minus, Plus,
  MessageCircle, LayoutDashboard, CalendarDays,
} from "lucide-react";
import { WA_LINK } from "@/lib/site";
import { BookingDialog } from "./BookingDialog";

type Step = 1 | 2 | 3 | 4 | 5;

const NATIONALITIES = [
  "Indian", "Pakistani", "Bangladeshi", "Filipino", "Egyptian", "Jordanian",
  "Lebanese", "Syrian", "Iraqi", "Saudi", "Emirati", "Omani", "Kuwaiti",
  "British", "American", "Canadian", "Australian", "South African",
  "French", "German", "Italian", "Spanish", "Russian", "Ukrainian",
  "Turkish", "Iranian", "Chinese", "Japanese", "Korean", "Singaporean",
  "Nigerian", "Kenyan", "Other",
];

const JURISDICTIONS = [
  "Dubai Mainland", "IFZA (Dubai)", "DMCC (Dubai)", "Meydan Free Zone",
  "RAKEZ (Ras Al Khaimah)", "SHAMS (Sharjah)", "Ajman Free Zone",
  "Abu Dhabi Mainland", "ADGM (Abu Dhabi)", "Not sure — recommend for me",
];

const GOALS = [
  "Lowest Cost",
  "Fast Setup",
  "Banking Friendliness",
  "International Credibility",
  "Visa Flexibility",
  "Long-Term Support",
  "Complete A-to-Z Support",
];

const STEP_LABELS = ["Profile", "Verify", "Business", "Goals", "Ready"];

export function OnboardingDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const [step, setStep] = React.useState<Step>(1);
  const [loading, setLoading] = React.useState(false);
  const [booking, setBooking] = React.useState(false);

  // Step 1
  const [s1, setS1] = React.useState({ fullName: "", email: "", whatsapp: "", nationality: "" });
  // Step 2
  const [code, setCode] = React.useState("");
  const [resendAt, setResendAt] = React.useState<number>(0);
  const [now, setNow] = React.useState(Date.now());
  // Step 3
  const [s3, setS3] = React.useState({
    businessActivity: "",
    preferredJurisdiction: "",
    numberOfVisas: 1,
    residencyRequired: "" as "" | "yes" | "no" | "later",
    bankAccountRequired: "" as "" | "yes" | "no" | "not_sure",
    taxRegistrationRequired: "" as "" | "yes" | "no",
    websiteRequired: false,
    officeRequirement: "" as "" | "flexi_desk" | "ejari" | "physical_office" | "not_sure",
  });
  // Step 4
  const [goals, setGoals] = React.useState<string[]>([]);

  const startFn = useServerFn(startOnboarding);
  const verifyFn = useServerFn(verifyOnboardingOtp);
  const resendFn = useServerFn(resendOnboardingOtp);
  const completeFn = useServerFn(completeOnboarding);

  React.useEffect(() => {
    if (step !== 2) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [step]);

  const resetAll = () => {
    setStep(1); setCode(""); setResendAt(0);
    setS1({ fullName: "", email: "", whatsapp: "", nationality: "" });
    setS3({
      businessActivity: "", preferredJurisdiction: "", numberOfVisas: 1,
      residencyRequired: "", bankAccountRequired: "", taxRegistrationRequired: "",
      websiteRequired: false, officeRequirement: "",
    });
    setGoals([]);
  };

  // ---- handlers ----
  const submitStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await startFn({ data: s1 });
      setResendAt(Date.now() + 60_000);
      setStep(2);
      toast.success("Verification code sent to your email.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not start onboarding");
    } finally { setLoading(false); }
  };

  const submitStep2 = async () => {
    if (code.length !== 4) return;
    setLoading(true);
    try {
      const res = await verifyFn({ data: { email: s1.email, code } });
      if (res.tokenHash) {
        const { error } = await supabase.auth.verifyOtp({ token_hash: res.tokenHash, type: "magiclink" });
        if (error) throw new Error(error.message);
      }
      toast.success("Email verified.");
      setStep(3);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Verification failed");
    } finally { setLoading(false); }
  };

  const resendCode = async () => {
    if (Date.now() < resendAt) return;
    setLoading(true);
    try {
      await resendFn({ data: { email: s1.email } });
      setResendAt(Date.now() + 60_000);
      toast.success("New code sent.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Resend failed");
    } finally { setLoading(false); }
  };

  const submitStep4 = async () => {
    setLoading(true);
    try {
      await completeFn({
        data: {
          businessActivity: s3.businessActivity,
          preferredJurisdiction: s3.preferredJurisdiction,
          numberOfVisas: s3.numberOfVisas,
          residencyRequired: s3.residencyRequired || undefined,
          bankAccountRequired: s3.bankAccountRequired || undefined,
          taxRegistrationRequired: s3.taxRegistrationRequired || undefined,
          websiteRequired: s3.websiteRequired,
          officeRequirement: s3.officeRequirement || undefined,
          setupGoals: goals,
        },
      });
      setStep(5);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your details");
    } finally { setLoading(false); }
  };

  const toggleGoal = (g: string) => {
    setGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : prev.length >= 2 ? prev : [...prev, g],
    );
  };

  const step1Valid = s1.fullName && /.+@.+\..+/.test(s1.email) && s1.whatsapp.length >= 4 && s1.nationality;
  const resendIn = Math.max(0, Math.ceil((resendAt - now) / 1000));
  const waLinkWithName = `${WA_LINK}%0A%0AName: ${encodeURIComponent(s1.fullName)}`;

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setTimeout(resetAll, 250); }}>
        <DialogContent className="glass-strong border-border max-w-2xl p-0 overflow-hidden gap-0">
          {/* Header / progress */}
          <div className="relative px-6 pt-6 pb-4 border-b border-border/60">
            <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-[var(--halo-1)] blur-3xl pointer-events-none" />
            <div className="relative flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Soft Bridge · Client Onboarding
            </div>
            <div className="relative mt-4 flex items-center gap-2">
              {STEP_LABELS.map((label, i) => {
                const n = (i + 1) as Step;
                const active = step === n;
                const done = step > n;
                return (
                  <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
                    <div className={`flex items-center gap-2 ${active ? "text-foreground" : done ? "text-gold" : "text-muted-foreground"}`}>
                      <div className={`w-6 h-6 rounded-full grid place-items-center text-[11px] font-semibold border transition ${
                        active ? "bg-gold/15 border-gold/50 text-gold shadow-[0_0_24px_oklch(0.84_0.10_82/0.35)]"
                        : done ? "bg-gold/10 border-gold/40" : "border-border"
                      }`}>{done ? "✓" : n}</div>
                      <span className="hidden sm:inline text-[11px] uppercase tracking-[0.18em]">{label}</span>
                    </div>
                    {i < STEP_LABELS.length - 1 && (
                      <div className={`h-px flex-1 ${done ? "bg-gold/40" : "bg-border"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Body */}
          <div className="relative px-6 py-6 max-h-[70vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.form
                  key="s1"
                  onSubmit={submitStep1}
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-display text-2xl text-foreground">Let's start with you.</h3>
                    <p className="text-sm text-muted-foreground mt-1">A few quick details so we can secure your client workspace.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Full name">
                      <Input value={s1.fullName} onChange={(e) => setS1({ ...s1, fullName: e.target.value })} placeholder="Your full name" required />
                    </Field>
                    <Field label="Email address">
                      <Input type="email" value={s1.email} onChange={(e) => setS1({ ...s1, email: e.target.value })} placeholder="you@example.com" required />
                    </Field>
                    <Field label="WhatsApp number">
                      <PhoneField floatingLabel={false} label="WhatsApp number" value={s1.whatsapp} onChange={(v) => setS1({ ...s1, whatsapp: v })} />
                    </Field>
                    <Field label="Nationality">
                      <Select value={s1.nationality} onValueChange={(v) => setS1({ ...s1, nationality: v })}>
                        <SelectTrigger><SelectValue placeholder="Select nationality" /></SelectTrigger>
                        <SelectContent className="max-h-72">
                          {NATIONALITIES.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-1">
                    <Shield className="w-3.5 h-3.5 text-gold" /> Your details are encrypted and only used to create your private workspace.
                  </div>
                  <FooterRow>
                    <span />
                    <Button type="submit" disabled={!step1Valid || loading} className="rounded-full gold-gradient text-[oklch(0.15_0.02_260)] font-semibold">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4 ml-1" /></>}
                    </Button>
                  </FooterRow>
                </motion.form>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5 text-center"
                >
                  <div className="mx-auto w-12 h-12 rounded-full glass-strong grid place-items-center"><Mail className="w-5 h-5 text-gold" /></div>
                  <div>
                    <h3 className="font-display text-2xl text-foreground">Verify your email</h3>
                    <p className="text-sm text-muted-foreground mt-1">We sent a 4-digit code to <span className="text-foreground">{s1.email}</span>.</p>
                  </div>
                  <div className="flex justify-center">
                    <InputOTP maxLength={4} value={code} onChange={setCode}>
                      <InputOTPGroup>
                        {[0,1,2,3].map((i) => (
                          <InputOTPSlot key={i} index={i} className="w-11 h-12 text-lg bg-background/40 border-border" />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-[12px] text-muted-foreground">
                    <button type="button" onClick={resendCode} disabled={resendIn > 0 || loading} className="hover:text-foreground transition disabled:opacity-50">
                      {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
                    </button>
                    <span className="opacity-30">·</span>
                    <button type="button" onClick={() => { setStep(1); setCode(""); }} className="hover:text-foreground transition">Change email</button>
                  </div>
                  <FooterRow>
                    <Button variant="ghost" onClick={() => setStep(1)} className="rounded-full"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
                    <Button onClick={submitStep2} disabled={code.length !== 4 || loading} className="rounded-full gold-gradient text-[oklch(0.15_0.02_260)] font-semibold">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Verify <ArrowRight className="w-4 h-4 ml-1" /></>}
                    </Button>
                  </FooterRow>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-display text-2xl text-foreground">Tell us about your business.</h3>
                    <p className="text-sm text-muted-foreground mt-1">We'll use this to recommend the right jurisdiction and structure.</p>
                  </div>

                  <Field label="Business activity">
                    <Textarea rows={2} value={s3.businessActivity} onChange={(e) => setS3({ ...s3, businessActivity: e.target.value })}
                      placeholder="e.g. e-commerce, consulting, IT services, trading…" />
                  </Field>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Preferred jurisdiction">
                      <Select value={s3.preferredJurisdiction} onValueChange={(v) => setS3({ ...s3, preferredJurisdiction: v })}>
                        <SelectTrigger><SelectValue placeholder="Select or not sure" /></SelectTrigger>
                        <SelectContent className="max-h-72">
                          {JURISDICTIONS.map((j) => <SelectItem key={j} value={j}>{j}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field label="Number of visas">
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => setS3({ ...s3, numberOfVisas: Math.max(0, s3.numberOfVisas - 1) })}
                          className="w-9 h-9 rounded-full glass-strong grid place-items-center hover:border-gold/40 transition"><Minus className="w-3.5 h-3.5" /></button>
                        <div className="flex-1 text-center font-display text-lg">{s3.numberOfVisas}</div>
                        <button type="button" onClick={() => setS3({ ...s3, numberOfVisas: Math.min(20, s3.numberOfVisas + 1) })}
                          className="w-9 h-9 rounded-full glass-strong grid place-items-center hover:border-gold/40 transition"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </Field>
                  </div>

                  <Segmented label="UAE residency visa" value={s3.residencyRequired}
                    options={[{ v: "yes", l: "Yes" }, { v: "no", l: "No" }, { v: "later", l: "Later" }]}
                    onChange={(v) => setS3({ ...s3, residencyRequired: v as "yes" | "no" | "later" })} />

                  <Segmented label="Business bank account" value={s3.bankAccountRequired}
                    options={[{ v: "yes", l: "Yes" }, { v: "no", l: "No" }, { v: "not_sure", l: "Not sure" }]}
                    onChange={(v) => setS3({ ...s3, bankAccountRequired: v as "yes" | "no" | "not_sure" })} />

                  <Segmented label="Tax registration" value={s3.taxRegistrationRequired}
                    options={[{ v: "yes", l: "Yes" }, { v: "no", l: "No" }]}
                    onChange={(v) => setS3({ ...s3, taxRegistrationRequired: v as "yes" | "no" })} />

                  <Segmented label="Website / digital services" value={s3.websiteRequired ? "yes" : "no"}
                    options={[{ v: "yes", l: "Yes" }, { v: "no", l: "No" }]}
                    onChange={(v) => setS3({ ...s3, websiteRequired: v === "yes" })} />

                  <Segmented label="Office requirement" value={s3.officeRequirement}
                    options={[
                      { v: "flexi_desk", l: "Flexi Desk" },
                      { v: "ejari", l: "Ejari" },
                      { v: "physical_office", l: "Physical Office" },
                      { v: "not_sure", l: "Not Sure" },
                    ]}
                    onChange={(v) => setS3({ ...s3, officeRequirement: v as "flexi_desk" | "ejari" | "physical_office" | "not_sure" })} />

                  <FooterRow>
                    <Button variant="ghost" onClick={() => setStep(2)} className="rounded-full"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
                    <Button onClick={() => setStep(4)} className="rounded-full gold-gradient text-[oklch(0.15_0.02_260)] font-semibold">
                      Continue <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </FooterRow>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="s4"
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="font-display text-2xl text-foreground">What matters most to you?</h3>
                    <p className="text-sm text-muted-foreground mt-1">Pick up to two — we'll prioritise these in your setup plan.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {GOALS.map((g) => {
                      const active = goals.includes(g);
                      return (
                        <button key={g} type="button" onClick={() => toggleGoal(g)}
                          className={`px-4 py-2 rounded-full text-[13px] border transition ${
                            active ? "bg-gold/15 border-gold/50 text-foreground shadow-[0_0_24px_oklch(0.84_0.10_82/0.25)]"
                                  : "glass-strong text-muted-foreground hover:border-gold/30 hover:text-foreground"
                          }`}>
                          {g}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{goals.length}/2 selected</p>
                  <FooterRow>
                    <Button variant="ghost" onClick={() => setStep(3)} className="rounded-full"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
                    <Button onClick={submitStep4} disabled={loading} className="rounded-full gold-gradient text-[oklch(0.15_0.02_260)] font-semibold">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Finish setup <ArrowRight className="w-4 h-4 ml-1" /></>}
                    </Button>
                  </FooterRow>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="s5"
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-4 space-y-5"
                >
                  <div className="mx-auto w-16 h-16 rounded-full gold-gradient grid place-items-center shadow-[0_20px_60px_-15px_oklch(0.84_0.10_82/0.6)]">
                    <CheckCircle2 className="w-8 h-8 text-[oklch(0.15_0.02_260)]" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-foreground">Your Soft Bridge Client Portal Is Ready</h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                      We've created your secure client profile and prepared your UAE business setup workspace.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center pt-2">
                    <Button onClick={() => { onOpenChange(false); navigate({ to: "/portal" }); }}
                      className="rounded-full gold-gradient text-[oklch(0.15_0.02_260)] font-semibold">
                      <LayoutDashboard className="w-4 h-4 mr-1" /> Go to My Dashboard
                    </Button>
                    <Button variant="secondary" onClick={() => setBooking(true)} className="rounded-full">
                      <CalendarDays className="w-4 h-4 mr-1" /> Book Consultation
                    </Button>
                    <a href={waLinkWithName} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full glass-strong px-4 py-2 text-sm font-medium hover:border-gold/40 transition">
                      <MessageCircle className="w-4 h-4 text-gold" /> Continue on WhatsApp
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
      <BookingDialog open={booking} onOpenChange={setBooking} />
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function FooterRow({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between pt-2">{children}</div>;
}

function Segmented({
  label, value, options, onChange,
}: {
  label: string; value: string;
  options: { v: string; l: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.v;
          return (
            <button key={o.v} type="button" onClick={() => onChange(o.v)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] border transition ${
                active ? "bg-gold/15 border-gold/50 text-foreground"
                      : "glass-strong text-muted-foreground hover:border-gold/30 hover:text-foreground"
              }`}>
              {o.l}
            </button>
          );
        })}
      </div>
    </div>
  );
}
