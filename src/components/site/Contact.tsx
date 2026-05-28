import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { SITE, WA_LINK } from "@/lib/site";
import { toast } from "sonner";

const ACTIVITIES = [
  "Company Formation",
  "Residency & Relocation",
  "Banking Preparation",
  "AML & Compliance",
  "Web Development",
  "Digital Advertising",
  "Other",
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", activity: ACTIVITIES[0], message: "" });

  const inputCls =
    "w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20 transition";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    const text =
      `Hello Soft Bridge,%0A%0AName: ${encodeURIComponent(form.name)}` +
      `%0AEmail: ${encodeURIComponent(form.email)}` +
      `%0AWhatsApp: ${encodeURIComponent(form.phone)}` +
      `%0AActivity: ${encodeURIComponent(form.activity)}` +
      `%0A%0A${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/${SITE.phoneRaw}?text=${text}`, "_blank");
    toast.success("Opening WhatsApp to send your inquiry…");
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-white/5 overflow-hidden">
      {/* animated lighting */}
      <div aria-hidden className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-amber-400/8 blur-3xl animate-drift-x" />
      <div aria-hidden className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> Contact
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
            Let's Start with a{" "}
            <span className="gradient-text">Clear Conversation</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            We take time to understand your goals before proposing any solution.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-5 gap-6">
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
                className="glass-card rounded-2xl p-5 flex items-start gap-4 hover-lift hover:border-gold/30 transition block"
              >
                <div className="w-11 h-11 rounded-xl glass flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-5 h-5 text-gold" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{c.label}</div>
                  <div className="mt-1 text-sm text-foreground truncate">{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* form */}
          <form onSubmit={onSubmit} className="lg:col-span-3 glass-strong rounded-3xl p-6 md:p-9 reveal relative overflow-hidden">
            <div aria-hidden className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="relative">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Full Name</label>
                  <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                  <input type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">WhatsApp</label>
                  <input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+971…" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Business Activity</label>
                  <select className={inputCls} value={form.activity} onChange={(e) => setForm({ ...form, activity: e.target.value })}>
                    {ACTIVITIES.map((s) => <option key={s} className="bg-background">{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="text-xs text-muted-foreground mb-1.5 block">Message</label>
                <textarea rows={5} className={inputCls} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us briefly about your business and what you'd like to achieve…" />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full gold-gradient px-6 py-3.5 text-sm font-semibold text-[oklch(0.15_0.02_260)] hover:opacity-95 transition shadow-[0_20px_60px_-15px_oklch(0.84_0.10_82/0.5)]"
                >
                  <Send className="w-4 h-4" /> Send Inquiry
                </button>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3.5 text-sm font-semibold text-foreground hover:border-gold/40 transition"
                >
                  <MessageCircle className="w-4 h-4 text-gold" /> WhatsApp Direct
                </a>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Your inquiry opens WhatsApp pre-filled — we typically respond the same business day.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
