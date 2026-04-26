import { Star, Users, TrendingUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { icon: Users, value: "1,247", label: "creators went full-time using this system" },
  { icon: TrendingUp, value: "$2,847/mo", label: "avg. income in month 3" },
  { icon: Star, value: "4.9/5", label: "from 247 reviews" },
];

const SocialProof = () => {
  return (
    <section className="border-y border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-display text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
