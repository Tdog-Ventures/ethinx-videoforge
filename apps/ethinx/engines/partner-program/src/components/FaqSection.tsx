import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFadeIn } from "@/hooks/useFadeIn";

const faqs = [
  {
    q: "Do my clients know about ETHINX?",
    a: "No. Everything is fully white-labeled. Your clients interact with your brand, your domain, your dashboard.",
  },
  {
    q: "What's the revenue split?",
    a: "You keep 70% of everything you charge your clients. ETHINX retains 30% as a platform fee, included in your monthly partner cost.",
  },
  {
    q: "How long does setup take?",
    a: "48 hours from approval to live white-label instance. Most partners are selling within a week.",
  },
  {
    q: "Do I need technical skills?",
    a: "No. We handle all technology, updates, and infrastructure. You focus on sales and client relationships.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly billing with no long-term contracts. Your client data is always exportable.",
  },
  {
    q: "What support do I get?",
    a: "All partners get email and chat support. Growth and Enterprise tiers include a dedicated account manager.",
  },
];

const FaqSection = () => {
  const ref = useFadeIn();
  return (
    <section id="faq" className="py-24">
      <div ref={ref} className="fade-in-section container mx-auto max-w-2xl px-4">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium hover:text-primary">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
