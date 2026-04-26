import { Check } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const tiers = [
  {
    name: "Starter",
    price: "FREE",
    features: ["Free content audit", "Personalised growth score", "3 AI recommendations"],
    cta: "Start Free",
    href: "https://creator-compass-dash.lovable.app",
    highlighted: false,
  },
  {
    name: "Creator System",
    price: "$297/mo",
    features: [
      "Everything in Starter",
      "8-week curriculum access",
      "VideoForge video generation",
      "Template library",
      "Community + weekly calls",
    ],
    cta: "Join the System",
    href: "https://creator-blueprint-builder.lovable.app",
    highlighted: true,
  },
  {
    name: "Done For You",
    price: "$997",
    priceNote: "one-time",
    features: [
      "Everything in Creator System",
      "30 custom marketing videos",
      "High-converting landing page",
      "Email welcome sequence",
      "Ad creative suite",
      "30-day support",
    ],
    cta: "Claim Your Spot",
    href: "https://premium-video-forge.lovable.app",
    highlighted: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      type: "spring" as const,
      stiffness: 80,
      damping: 16,
    },
  }),
};

const PricingSection = () => (
  <section id="pricing" className="py-24 sm:py-32">
    <div className="container mx-auto px-4 sm:px-6">
      <AnimatedSection className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Simple Pricing. Massive Value.
        </h2>
      </AnimatedSection>
      <motion.div
        className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {tiers.map((t, i) => (
          <motion.div key={t.name} custom={i} variants={cardVariants}>
            <div
              className={`relative bg-card border rounded-lg p-6 flex flex-col h-full ${
                t.highlighted
                  ? "border-primary glow-green-strong"
                  : "border-border hover:border-primary/30"
              } transition-all duration-300`}
            >
              {t.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  RECOMMENDED
                </span>
              )}
              <h3 className="text-xl font-bold text-foreground mb-2">{t.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-black text-foreground">{t.price}</span>
                {t.priceNote && (
                  <span className="text-sm text-muted-foreground ml-1">/{t.priceNote}</span>
                )}
              </div>
              <ul className="space-y-3 flex-1 mb-6">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="text-primary mt-0.5 shrink-0" size={16} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                  t.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-secondary"
                    : "border border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {t.cta}
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <AnimatedSection className="text-center mt-10">
        <a
          href="https://brand-cascade.lovable.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors text-sm"
        >
          Running an agency? Check out our Partner Program →
        </a>
      </AnimatedSection>
    </div>
  </section>
);

export default PricingSection;
