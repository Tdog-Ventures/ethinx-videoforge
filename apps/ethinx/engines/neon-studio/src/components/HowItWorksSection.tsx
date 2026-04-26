import { ClipboardCheck, GitBranch, Zap, TrendingUp } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const steps = [
  { icon: ClipboardCheck, title: "Audit", desc: "Take the free 5-minute content audit to see where you stand" },
  { icon: GitBranch, title: "Choose Your Path", desc: "Pick the tier that matches your speed: DIY, guided, or done-for-you" },
  { icon: Zap, title: "Generate", desc: "AI creates your videos, ads, emails, and content in seconds" },
  { icon: TrendingUp, title: "Scale", desc: "Launch, automate, and grow with tools that compound over time" },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24 sm:py-32 bg-card/50">
    <div className="container mx-auto px-4 sm:px-6">
      <AnimatedSection className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          From Zero to Scaling in 4 Steps
        </h2>
      </AnimatedSection>
      <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-border">
          <div className="absolute inset-0 bg-primary/50 animate-pulse-green" />
        </div>
        {steps.map((s, i) => (
          <AnimatedSection key={s.title} delay={i * 150} className="text-center relative">
            <div className="relative z-10 w-14 h-14 mx-auto mb-4 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center">
              <s.icon className="text-primary" size={22} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
