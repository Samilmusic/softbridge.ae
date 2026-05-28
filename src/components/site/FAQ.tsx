import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Do I really need a consultant, or can I do this myself?",
    a: "You can technically attempt it yourself, but UAE setup involves jurisdiction selection, licensing, residency, banking, AML, and tax decisions that are tightly interlinked. A wrong early choice can be costly to undo. A consultant ensures the structure fits your actual business model and saves significant time and money.",
  },
  {
    q: "What's the biggest mistake new businesses make in the UAE?",
    a: "Choosing the wrong jurisdiction or activity to save short-term cost, then discovering it blocks banking, scaling, or the type of clients they want to serve. Strategy first, paperwork second — that's the rule we follow.",
  },
  {
    q: "How do you make sure my setup works long-term?",
    a: "We assess your model, growth plans, target market, and compliance needs before recommending a structure. The setup is designed for the next 3–5 years, not just to get a license issued today.",
  },
  {
    q: "Is your service only for company setup?",
    a: "No. We support businesses across the full lifecycle — formation, residency, banking, compliance, web development, digital advertising, and ongoing operational guidance.",
  },
  {
    q: "What happens after everything is set up?",
    a: "We remain available for ongoing support: compliance updates, renewals, scaling decisions, banking changes, and growth-related advisory. We treat clients as long-term partners.",
  },
  {
    q: "What makes you different from typical setup agents?",
    a: "We're not a transactional license shop. We focus on structured, compliant, sustainable setups and continue supporting clients well beyond the formation stage.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center reveal">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold mb-5">
            <span className="w-8 h-px bg-gold" /> FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.08]">
            Questions, <span className="gradient-text">Answered Clearly</span>
          </h2>
        </div>

        <div className="mt-12 reveal">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass rounded-xl px-5 border-0"
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
