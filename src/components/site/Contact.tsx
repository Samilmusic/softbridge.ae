import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Sparkles, Loader2, Check } from "lucide-react";
import { SITE, WA_LINK } from "@/lib/site";
import { toast } from "sonner";
import { PhoneField } from "@/components/ui/phone-field";

const ACTIVITIES = [
  "Company Formation",
  "Residency & Relocation",
  "Banking Preparation",
  "AML & Compliance",
  "Web Development",
  "Digital Advertising",
  "Other",
];

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  rows?: number;
};

function FloatField({ id, label, value, onChange, type = "text", textarea, rows = 6 }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const base =
    "peer w-full rounded-2xl bg-white/70 backdrop-blur-md border border-violet-200/70 px-5 pt-6 pb-2.5 text-[15px] text-slate-900 placeholder-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(91,33,182,0.04)] focus:outline-none focus:border-violet-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(167,139,250,0.18),0_10px_30px_-12px_rgba(124,58,237,0.25)] hover:border-violet-300 transition-all duration-300";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={label}
          className={`${base} resize-y min-h-[140px]`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={label}
          className={base}
        />
      )}
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-5 transition-all duration-200 ${
          active
            ? "top-2 text-[11px] font-medium text-violet-600 tracking-wide uppercase"
            : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
        } ${textarea && active ? "top-2 translate-y-0" : ""} ${
          textarea && !active ? "top-5 -translate-y-0" : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", activity: ACTIVITIES[0], message: "" });
  const [activityFocused, setActivityFocused] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    setStatus("sending");
    const text =
      `Hello Soft Bridge,%0A%0AName: ${encodeURIComponent(form.name)}` +
      `%0AEmail: ${encodeURIComponent(form.email)}` +
      `%0AWhatsApp: ${encodeURIComponent(form.phone)}` +
      `%0AActivity: ${encodeURIComponent(form.activity)}` +
      `%0A%0A${encodeURIComponent(form.message)}`;
    // Small delay so the loading state is visible before WhatsApp opens
    await new Promise((r) => setTimeout(r, 500));
    window.open(`https://wa.me/${SITE.phoneRaw}?text=${text}`, "_blank");
    setStatus("sent");
    toast.success("Opening WhatsApp — we'll respond within 1 business day.");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient lighting */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-violet-50/50 to-white" />
        <div className="absolute top-0 left-1/3 w-[700px] h-[700px] rounded-full bg-violet-300/20 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-fuchsia-300/15 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 ring-1 ring-violet-200 backdrop-blur-sm text-xs font-medium text-violet-700 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI Consultation Intake
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] text-slate-900">
            Let's Start with a{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
              Clear Conversation
            </span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            We take time to understand your goals before proposing any solution.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-5 gap-8">
          {/* contact panel */}
          <div className="lg:col-span-2 space-y-4 reveal">
            {[
              { icon: MapPin, label: "Office", value: SITE.address },
              { icon: Phone, label: "Phone / WhatsApp", value: SITE.phone, href: WA_LINK },
              { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
              { icon: Clock, label: "Working Hours", value: "Mon–Fri, 9:00am–7:00pm" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href?.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group block rounded-2xl bg-white/80 backdrop-blur-xl ring-1 ring-violet-100/80 p-5 shadow-[0_10px_40px_-20px_rgba(124,58,237,0.25)] hover:ring-violet-300 hover:shadow-[0_20px_50px_-20px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
                    <c.icon className="w-5 h-5 text-white" />
                    <span className="absolute inset-0 rounded-xl bg-violet-400/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-violet-600">
                      {c.label}
                    </div>
                    <div className="mt-1.5 text-sm text-slate-800 font-medium leading-relaxed">
                      {c.value}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 relative rounded-[2rem] bg-white/80 backdrop-blur-2xl ring-1 ring-violet-100/80 shadow-[0_30px_100px_-30px_rgba(124,58,237,0.35)] p-7 md:p-10 reveal overflow-hidden"
          >
            <div aria-hidden className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-violet-300/30 blur-3xl" />
            <div aria-hidden className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-fuchsia-300/20 blur-3xl" />

            <div className="relative space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <FloatField id="name" label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <FloatField id="email" label="Email Address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                <PhoneField label="WhatsApp Number" defaultCountry="ae" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />

                {/* Select with floating label */}
                <div className="relative">
                  <select
                    id="activity"
                    value={form.activity}
                    onFocus={() => setActivityFocused(true)}
                    onBlur={() => setActivityFocused(false)}
                    onChange={(e) => setForm({ ...form, activity: e.target.value })}
                    className="peer w-full rounded-2xl bg-white/70 backdrop-blur-md border border-violet-200/70 px-5 pt-6 pb-2.5 text-[15px] text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(91,33,182,0.04)] focus:outline-none focus:border-violet-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(167,139,250,0.18),0_10px_30px_-12px_rgba(124,58,237,0.25)] hover:border-violet-300 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {ACTIVITIES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <label
                    htmlFor="activity"
                    className={`pointer-events-none absolute left-5 top-2 text-[11px] font-medium text-violet-600 tracking-wide uppercase transition-all ${
                      activityFocused ? "text-violet-700" : ""
                    }`}
                  >
                    Business Activity
                  </label>
                  <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-violet-500">
                    ▾
                  </span>
                </div>
              </div>

              <FloatField id="message" label="Tell us about your business and goals…" textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} />

              <div className="pt-2 flex flex-wrap gap-3 items-center">
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  aria-busy={status === "sending"}
                  className="group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_15px_40px_-12px_rgba(124,58,237,0.6)] hover:shadow-[0_20px_50px_-10px_rgba(124,58,237,0.8)] hover:-translate-y-0.5 transition-all overflow-hidden disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {status === "sending" ? (
                    <Loader2 className="relative w-4 h-4 animate-spin" />
                  ) : status === "sent" ? (
                    <Check className="relative w-4 h-4" />
                  ) : (
                    <Send className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  )}
                  <span className="relative">
                    {status === "sending" ? "Sending…" : status === "sent" ? "Inquiry sent" : "Send Inquiry"}
                  </span>
                </button>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-slate-900 bg-white/80 backdrop-blur-md ring-1 ring-violet-200 hover:ring-violet-400 hover:bg-white hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-violet-600 group-hover:scale-110 group-hover:rotate-[-8deg] transition-transform" />
                  WhatsApp Direct
                </a>
              </div>
              <p className="text-xs text-slate-500">
                Your inquiry opens WhatsApp pre-filled — we typically respond the same business day.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
