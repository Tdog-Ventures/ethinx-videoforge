import { useState, useEffect, useRef } from "react";
import { Check, Star, ShieldCheck, X, Clock, Flame } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { EnrollmentDialog } from "@/components/EnrollmentDialog";

const creatorFeatures = [
  "8-week curriculum access",
  "AdEngine video generation",
  "Template library",
  "Community access",
  "Weekly group calls",
];

const doneForYouFeatures = [
  "Everything in Creator System",
  "5 custom video ads",
  "High-converting landing page",
  "Email welcome sequence",
  "20+ ad creatives",
  "30-day direct support",
];

const testimonials = [
  { name: "Sarah M.", role: "E-commerce Creator", initials: "SM", quote: "The AdEngine alone saved me $2,000/month on video production. ROI was immediate." },
  { name: "James T.", role: "Course Creator", initials: "JT", quote: "Went from 0 to 15K email subscribers in 8 weeks following the curriculum. Game changer." },
  { name: "Priya K.", role: "Agency Owner", initials: "PK", quote: "The Done For You package delivered everything promised — landing page, ads, emails — all converting on day one." },
];

const faqs = [
  { q: "What happens after I purchase?", a: "You'll receive immediate access to the dashboard with all curriculum materials, templates, and tools. For Done For You clients, we schedule your onboarding call within 24 hours." },
  { q: "Can I upgrade from Creator System to Done For You?", a: "Absolutely! You can upgrade anytime and we'll credit your existing payments toward the Done For You package." },
  { q: "Is there a money-back guarantee?", a: "Yes — we offer a 14-day satisfaction guarantee on the Creator System. If you're not happy, we'll refund you in full." },
  { q: "How long do I have access?", a: "Creator System members have access as long as their subscription is active. Done For You clients get lifetime access to all materials and deliverables." },
  { q: "Do I need any technical skills?", a: "Not at all. The curriculum is beginner-friendly, and the Done For You package handles all the technical work for you." },
];

const pricing = {
  monthly: { creator: 297, dfy: 997, creatorLabel: "/month", dfyLabel: " one-time" },
  annual: { creator: 237, dfy: 897, creatorLabel: "/month", dfyLabel: " one-time" },
};

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [enrollTier, setEnrollTier] = useState<"creator_system" | "done_for_you" | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const plan = isAnnual ? pricing.annual : pricing.monthly;
  const savings = pricing.monthly.creator - pricing.annual.creator;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (cardsRef.current) observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  // Countdown: resets daily at midnight
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 space-y-16">
        <ScrollReveal>
          {/* Urgency Banner */}
          {!bannerDismissed && (
            <div className="mb-8 rounded-xl border border-primary/30 bg-primary/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative">
              <button
                onClick={() => setBannerDismissed(true)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Flame className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Limited-Time Offer — 20% Off Annual Plans</p>
                  <p className="text-xs text-muted-foreground">Lock in today's price before it expires.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pr-4">
                <Clock className="h-4 w-4 text-primary" />
                <div className="flex gap-1 font-mono text-sm font-bold text-foreground">
                  <span className="bg-muted rounded px-2 py-1">{pad(timeLeft.hours)}</span>
                  <span className="py-1">:</span>
                  <span className="bg-muted rounded px-2 py-1">{pad(timeLeft.minutes)}</span>
                  <span className="py-1">:</span>
                  <span className="bg-muted rounded px-2 py-1">{pad(timeLeft.seconds)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-foreground mb-2">Choose Your Plan</h1>
            <p className="text-muted-foreground">Scale your content creation with the right level of support.</p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={cn("text-sm font-medium transition-colors", !isAnnual ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                "relative inline-flex h-7 w-12 items-center rounded-full transition-colors",
                isAnnual ? "bg-primary" : "bg-muted"
              )}
            >
              <span className={cn(
                "inline-block h-5 w-5 rounded-full bg-background shadow-sm transition-transform",
                isAnnual ? "translate-x-6" : "translate-x-1"
              )} />
            </button>
            <span className={cn("text-sm font-medium transition-colors", isAnnual ? "text-foreground" : "text-muted-foreground")}>Annual</span>
            {isAnnual && (
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                Save ${savings * 12}/yr
              </Badge>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 mb-10">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">Creator System</CardTitle>
                <CardDescription>Build your content engine</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-foreground">${plan.creator}</span>
                  <span className="text-base font-normal text-muted-foreground">{plan.creatorLabel}</span>
                  {isAnnual && (
                    <span className="ml-2 text-sm text-muted-foreground line-through">${pricing.monthly.creator}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-8 flex-1">
                  {creatorFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="lg" className="w-full" onClick={() => setEnrollTier("creator_system")}>
                    Get Started — ${plan.creator}
                </Button>
              </CardContent>
            </Card>

            <Card className="flex flex-col border-primary/50 shadow-[0_0_30px_hsl(var(--primary)/0.1)] relative animate-[pulse-border_2s_ease-in-out_infinite]">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">RECOMMENDED</Badge>
              <CardHeader>
                <CardTitle className="text-xl">Done For You</CardTitle>
                <CardDescription>We build everything for you</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-foreground">${plan.dfy}</span>
                  <span className="text-base font-normal text-muted-foreground">{plan.dfyLabel}</span>
                  {isAnnual && (
                    <span className="ml-2 text-sm text-muted-foreground line-through">${pricing.monthly.dfy}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-8 flex-1">
                  {doneForYouFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="neon" size="lg" className="w-full" onClick={() => setEnrollTier("done_for_you")}>
                    Claim Your Spot — ${plan.dfy}
                </Button>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>

        {/* Comparison Table */}
        <ScrollReveal delay={120}>
          <div className="card-glow rounded-xl p-6 overflow-x-auto">
            <h2 className="text-xl font-bold text-foreground mb-6 text-center">Feature Comparison</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Feature</th>
                  <th className="text-center py-3 px-2 text-foreground font-semibold">Creator System</th>
                  <th className="text-center py-3 px-2 text-foreground font-semibold">Done For You</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["8-week curriculum", true, true],
                  ["AdEngine video credits", true, true],
                  ["Email & ad templates", true, true],
                  ["Community & group calls", true, true],
                  ["5 custom video ads", false, true],
                  ["Custom landing page", false, true],
                  ["Email welcome sequence", false, true],
                  ["20+ ad creatives", false, true],
                  ["30-day direct support", false, true],
                ].map(([feature, creator, dfy], i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 px-2 text-foreground">{feature as string}</td>
                    <td className="py-3 px-2 text-center">
                      {creator ? <Check className="h-4 w-4 text-primary mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />}
                    </td>
                    <td className="py-3 px-2 text-center">
                      {dfy ? <Check className="h-4 w-4 text-primary mx-auto" /> : <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Trust Badge */}
        <ScrollReveal delay={130}>
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">14-Day Money-Back Guarantee</p>
              <p className="text-xs text-muted-foreground">Try risk-free — if you're not satisfied, get a full refund.</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonials */}
        <ScrollReveal delay={150}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">What Creators Are Saying</h2>
            <p className="text-sm text-muted-foreground">Real results from real members</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-5">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal delay={200}>
          <div className="card-glow rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 text-center">Frequently Asked Questions</h2>
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

        <ScrollReveal delay={250}>
          <p className="text-center text-sm text-muted-foreground pb-16">
            Not sure yet?{" "}
            <a href="https://creator-compass-dash.lovable.app" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Take our free 5-minute audit
            </a>
          </p>
        </ScrollReveal>
      </div>

      {/* Sticky CTA Bar */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm transition-all duration-300",
        showSticky ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}>
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-foreground">Ready to start?</p>
            <p className="text-xs text-muted-foreground">Choose a plan and launch today.</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-initial" onClick={() => setEnrollTier("creator_system")}>
                Creator — ${plan.creator}
            </Button>
            <Button variant="neon" size="sm" className="flex-1 sm:flex-initial" onClick={() => setEnrollTier("done_for_you")}>
                Done For You — ${plan.dfy}
            </Button>
          </div>
        </div>
      </div>

      <EnrollmentDialog
        open={enrollTier !== null}
        onOpenChange={(open) => !open && setEnrollTier(null)}
        tier={enrollTier ?? "creator_system"}
        tierLabel={enrollTier === "done_for_you" ? "Done For You" : "Creator System"}
        sourcePage="pricing"
      />
    </DashboardLayout>
  );
}
