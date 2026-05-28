import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { SITE, WA_LINK } from "@/lib/site";
import { toast } from "sonner";

const SERVICES = [
  "Business Setup & Structuring",
  "Residency & Relocation Support",
  "Banking, Tax & AML Compliance",
  "Web Development & Online Advertising",
  "Other",
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: SERVICES[0], message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    setSubmitting(true);
    const text = `Hello Soft Bridge,%0A%0AName: ${encodeURIComponent(form.name)}%0AEmail: ${encodeURIComponent(form.email)}%0APhone: ${encodeURIComponent(form.phone)}%0AService: ${encodeURIComponent(form.service)}%0A%0A${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/${SITE.phoneRaw}?text=${text}`, "_blank");
    toast.success("Opening WhatsApp to send your message…");
    setSubmitting(false);
  };

  const inputCls =
    "w-full rounded-lg bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20 transition";

  return (
    <section id="contact" className="relative py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> Contact
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.08]">
            Let's Start with a{" "}
            <span className="gradient-text">Clear Conversation</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            We take time to understand your goals before proposing any solution.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-5 gap-6">
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
                className="glass rounded-2xl p-5 flex items-start gap-4 hover:border-gold/30 transition block"
              >
                <div className="w-11 h-11 rounded-xl glass flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-5 h-5 text-gold" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{c.label}</div>
                  <div className="mt-1 text-sm text-foreground truncate">{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 glass-strong rounded-2xl p-6 md:p-8 reveal"
          >
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
                <label className="text-xs text-muted-foreground mb-1.5 block">Phone / WhatsApp</label>
                <input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+971…" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Service Interested In</label>
                <select className={inputCls} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                  {SERVICES.map((s) => <option key={s} className="bg-background">{s}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs text-muted-foreground mb-1.5 block">Message</label>
              <textarea rows={5} className={inputCls} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us briefly about your business and what you're looking to achieve…" />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex items-center gap-2 rounded-full gold-gradient px-6 py-3.5 text-sm font-semibold text-[oklch(0.18_0.025_260)] hover:opacity-90 transition shadow-xl shadow-amber-500/10 disabled:opacity-60"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
            <p className="mt-3 text-xs text-muted-foreground">Your message will open WhatsApp pre-filled — we typically respond the same business day.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
