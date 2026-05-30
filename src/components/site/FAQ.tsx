import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQS = [
  { q: "Do I need a consultant in the UAE?", a: "You can technically attempt setup yourself, but the decisions around jurisdiction, licensing, residency, banking, and compliance are tightly interlinked. A wrong early choice is costly to unwind. A consultant ensures the structure fits your business model and operational reality." },
  { q: "How long does setup usually take?", a: "Most engagements move from discovery to license issuance in 1–3 weeks depending on jurisdiction and documentation. Residency, banking, and operational onboarding extend over the following weeks, all coordinated in parallel." },
  { q: "What happens after setup?", a: "We stay engaged. Renewals, compliance updates, banking changes, scaling decisions, and digital operations — all covered as part of an ongoing relationship rather than a one-off transaction." },
  { q: "Can you help with banking preparation?", a: "Yes. We prepare your business profile, KYC, source of funds, activity narrative, and supporting documentation — then introduce you to the banks best matched to your business model." },
  { q: "Do you support online businesses?", a: "Absolutely. A significant portion of our clients are e-commerce, SaaS, agencies, and digital service companies that need a compliant UAE base with strong digital infrastructure." },
  { q: "Do you provide ongoing support?", a: "Yes — operational consulting, compliance guidance, website and CRM management, advertising, and growth advisory. We treat clients as long-term partners." },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32 border-t border-white/5">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
            Questions, <span className="gradient-text">Answered Clearly</span>
          </h2>
        </div>

        <div className="mt-12 reveal">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass-card rounded-2xl px-5 border-0"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline hover:text-gold py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-sm">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
