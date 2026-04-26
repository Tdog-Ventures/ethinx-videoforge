import { HelpCircle, ChevronDown, Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I access the AdEngine tool?",
    a: "Click 'AdEngine Tool' in the sidebar or the 'Open AdEngine' button on your dashboard. You get 25 video credits per month.",
  },
  {
    q: "Can I go back and review previous weeks?",
    a: "Yes! All content remains accessible. Navigate to 'Curriculum' in the sidebar to revisit any week.",
  },
  {
    q: "What if I miss a live Q&A call?",
    a: "All live calls are recorded and posted within 24 hours. You'll find them in the week's content section.",
  },
];

export function SupportSection() {
  return (
    <section className="card-glow rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <HelpCircle className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground">Getting stuck?</h3>
          <p className="text-xs text-muted-foreground">We're here to help</p>
        </div>
      </div>

      <Accordion type="single" collapsible className="mb-5">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-border">
            <AccordionTrigger className="text-sm text-foreground hover:text-primary hover:no-underline py-3">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-3">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="neon" className="flex-1">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Support Call
        </Button>
        <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-secondary">
          <Mail className="h-4 w-4 mr-2" />
          hello@creatorosystem.com
        </Button>
      </div>
    </section>
  );
}
