import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HelpCircle, Calendar, Mail, MessageCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How do I access the AdEngine tool?", a: "Click 'AdEngine Tool' in the sidebar or the 'Open AdEngine' button on your dashboard. You get 25 video credits per month included with your membership." },
  { q: "Can I go back and review previous weeks?", a: "Yes! All content remains accessible forever. Navigate to 'Curriculum' in the sidebar to revisit any week's materials." },
  { q: "What if I miss a live Q&A call?", a: "All live calls are recorded and posted within 24 hours. You'll find replays in the week's content section." },
  { q: "How do I use the email templates?", a: "Go to 'Email Templates' in the sidebar, browse or search for the template you need, and click 'Copy Template' to copy it to your clipboard." },
  { q: "Can I cancel my membership?", a: "Yes, you can cancel anytime from your account settings. You'll retain access until the end of your billing period." },
  { q: "How do I join the Discord community?", a: "Click 'Community' in the sidebar, then click 'Open Discord'. You'll be redirected to our private Discord server." },
  { q: "What's included in the AdEngine credits?", a: "Each month you get 25 video credits. Each credit generates one premium video ad. Unused credits don't roll over." },
  { q: "How long do I have access to the course?", a: "You have lifetime access to all course materials, including future updates and bonus content." },
];

const resources = [
  { icon: BookOpen, title: "Knowledge Base", description: "Browse 50+ help articles", action: "Browse Articles" },
  { icon: MessageCircle, title: "Live Chat", description: "Mon-Fri, 9AM-5PM EST", action: "Start Chat" },
  { icon: Calendar, title: "1-on-1 Call", description: "30-min strategy session", action: "Book Call" },
  { icon: Mail, title: "Email Support", description: "hello@creatorosystem.com", action: "Send Email" },
];

const SupportPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <ScrollReveal>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Support</h1>
            <p className="text-sm text-muted-foreground mt-1">We're here to help you succeed</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((r, i) => (
              <div key={i} className="card-glow rounded-xl p-5 text-center">
                <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <r.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-sm font-semibold text-foreground">{r.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 mb-4">{r.description}</p>
                <Button variant="outline" size="sm" className="w-full border-border text-foreground hover:bg-secondary">
                  {r.action}
                </Button>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="card-glow rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h3 className="text-base font-bold text-foreground">Frequently Asked Questions</h3>
            </div>
            <Accordion type="single" collapsible>
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
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="card-glow rounded-xl p-6 neon-border text-center">
            <h3 className="text-lg font-bold text-foreground mb-2">Still need help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Schedule a free 30-minute support call with our team.
            </p>
            <Button variant="neon" size="lg">
              <Calendar className="h-4 w-4 mr-2" /> Schedule Support Call
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </DashboardLayout>
  );
};

export default SupportPage;
