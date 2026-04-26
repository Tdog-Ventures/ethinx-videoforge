import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "Is this for beginners?",
    a: "Yes. No experience needed. We start from zero and walk you through every step of building your creator business.",
  },
  {
    q: "How long until I see results?",
    a: "Most creators see engagement growth in week 2, and income in week 4-6. Results vary, but our system is designed for fast wins.",
  },
  {
    q: "What if I fail?",
    a: "30-day money-back guarantee. Zero risk. If the system doesn't work for you, you get a full refund—no questions asked.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-28 bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">Got Questions?</h2>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <AccordionItem
                  value={`faq-${i}`}
                  className="gradient-border rounded-xl bg-card px-6 border-none"
                >
                  <AccordionTrigger className="text-left font-display font-semibold hover:no-underline hover:text-primary transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
