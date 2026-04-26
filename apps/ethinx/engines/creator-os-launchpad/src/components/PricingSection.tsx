import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import CountdownTimer from "./CountdownTimer";

const tiers = [
  {
    name: "Creator Audit",
    price: "$0",
    period: "Free",
    badge: "First 100 spots",
    highlight: true,
    features: ["Personalized audit of your creator business", "Custom roadmap", "No credit card required"],
    cta: "Get Free Creator Audit",
    href: "#hero",
  },
  {
    name: "Creator System",
    price: "$297",
    period: "one-time",
    features: ["Full 8-week curriculum", "Templates library", "Discord community", "Email sequences"],
    cta: "Enroll Now",
    href: "https://biz-creator-path.lovable.app",
  },
  {
    name: "Done-For-You Launch",
    price: "$997",
    period: "one-time",
    features: ["Everything in Creator System", "AdEngine tool access", "Weekly live calls", "Priority support"],
    cta: "Get Started",
    href: "https://pro-clip-gen.lovable.app",
  },
  {
    name: "High-Ticket 1-on-1",
    price: "$5,000+",
    period: "custom",
    features: ["Everything in DFY Launch", "Private 1-on-1 coaching", "Custom strategy sessions", "Direct Slack access"],
    cta: "Apply Now",
    href: "https://premium-video-forge.lovable.app",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">Pricing</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">
              Start Free. <span className="text-primary text-glow">Scale When Ready.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto overflow-visible">
          {tiers.map((tier, i) => (
            <ScrollReveal key={tier.name} delay={i * 0.1} className="overflow-visible">
              <div
                className={`rounded-2xl p-6 space-y-6 flex flex-col h-full overflow-visible ${
                  tier.highlight
                    ? "bg-primary/5 border-2 border-primary neon-glow relative pt-8"
                    : "gradient-border bg-card"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                    <span>{tier.badge}</span>
                    <span className="text-primary-foreground/60">·</span>
                    <CountdownTimer />
                  </div>
                )}
                <div>
                  <h3 className="font-display font-bold text-lg">{tier.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold font-display text-primary">{tier.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">/ {tier.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.highlight ? "neon" : "neon-outline"}
                  className="w-full"
                  asChild
                >
                  <a href={tier.href} target={tier.href.startsWith("http") ? "_blank" : undefined} rel={tier.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                    {tier.cta}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
