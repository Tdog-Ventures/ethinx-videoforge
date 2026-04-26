import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";

const scrollToForm = () => {
  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
};

interface TierCardProps {
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  cta: string;
  recommended?: boolean;
  gold?: boolean;
}

const TierCard = ({ name, price, subtitle, features, cta, recommended, gold }: TierCardProps) => {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className={`fade-in-section relative flex flex-col rounded-lg border p-6 sm:p-8 transition-all duration-300 glow-green-hover ${
        recommended
          ? "border-primary/50 bg-primary/5 glow-green"
          : gold
          ? "border-gold/30 bg-card"
          : "border-border bg-card"
      }`}
    >
      {recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
            <Star className="h-3 w-3" /> RECOMMENDED
          </span>
        </div>
      )}
      <h3 className={`text-sm font-semibold uppercase tracking-wider ${gold ? "text-gold" : "text-muted-foreground"}`}>
        {name}
      </h3>
      <div className="mt-3">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Custom Pricing" && <span className="text-muted-foreground">/month</span>}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
          </li>
        ))}
      </ul>
      <Button
        variant={recommended ? "neon" : gold ? "ghost-green" : "outline"}
        size="lg"
        className="mt-8 w-full"
        onClick={scrollToForm}
      >
        {cta}
      </Button>
    </div>
  );
};

const PartnerTiersSection = () => (
  <section id="tiers" className="py-24">
    <div className="container mx-auto px-4">
      <h2 className="text-center text-3xl font-bold sm:text-4xl">Partner Tiers</h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
        Choose the plan that fits your agency's growth stage
      </p>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <TierCard
          name="Founding Partner"
          price="$200"
          subtitle="For agencies ready to move first"
          features={[
            "White-label dashboard",
            "Up to 50 client accounts",
            "Custom domain",
            "Priority support",
            "70% revenue share",
            "Founding partner pricing locked for life",
          ]}
          cta="Apply as Founding Partner"
          recommended
        />
        <TierCard
          name="Growth Partner"
          price="$350"
          subtitle="For scaling agencies"
          features={[
            "Everything in Founding",
            "Up to 200 client accounts",
            "API access",
            "Dedicated account manager",
            "Custom integrations",
            "Co-marketing opportunities",
          ]}
          cta="Apply as Growth Partner"
        />
        <TierCard
          name="Enterprise Partner"
          price="Custom Pricing"
          subtitle="For agencies with 200+ clients"
          features={[
            "Everything in Growth",
            "Unlimited client accounts",
            "Custom feature development",
            "SLA guarantee",
            "White-glove onboarding",
            "Revenue share negotiable",
          ]}
          cta="Contact Sales"
          gold
        />
      </div>
    </div>
  </section>
);

export default PartnerTiersSection;
