import { Briefcase, IdCard, Landmark, Globe, ArrowUpRight } from "lucide-react";
import { WA_LINK } from "@/lib/site";

const SERVICES = [
  {
    icon: Briefcase,
    title: "Business Setup & Structuring",
    text: "Company formation, activity selection, jurisdiction guidance, licensing coordination, and setup planning.",
  },
  {
    icon: IdCard,
    title: "Residency & Relocation Support",
    text: "Visa process guidance, Emirates ID, medical coordination, and relocation support for business owners and teams.",
  },
  {
    icon: Landmark,
    title: "Banking, Tax & AML Compliance",
    text: "Banking preparation, source of funds support, tax registration guidance, AML/CFT readiness, and compliance documentation.",
  },
  {
    icon: Globe,
    title: "Web Development & Online Advertising",
    text: "Business websites, landing pages, digital presence, Google Ads, Meta Ads, and lead generation systems.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> Services
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.08]">
            Practical, Compliant &{" "}
            <span className="gradient-text">Growth-Focused</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            End-to-end services aligned to UAE regulations and built for sustainable business growth.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => (
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              key={s.title}
              className="group relative glass rounded-2xl p-7 md:p-8 hover:border-gold/40 transition reveal overflow-hidden"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none"
                   style={{ background: "radial-gradient(600px circle at 0% 0%, oklch(0.82 0.12 80 / 0.06), transparent 50%)" }} />
              <div className="flex items-start justify-between relative">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-gold" />
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">0{SERVICES.indexOf(s) + 1}</div>
              </div>
              <h3 className="mt-6 text-xl font-semibold relative">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed relative">{s.text}</p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-gold relative">
                Discuss this service
                <ArrowUpRight className="w-4 h-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
