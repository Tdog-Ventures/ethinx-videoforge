import { Users, Lightbulb, DollarSign, Rocket } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const modules = [
  { icon: Users, week: "Week 1-2", title: "Audience Foundation", desc: "Build your ideal audience from scratch with proven targeting strategies." },
  { icon: Lightbulb, week: "Week 3-4", title: "Content Strategy & Automation", desc: "Create systems that produce content on autopilot." },
  { icon: DollarSign, week: "Week 5-6", title: "Monetization Playbook", desc: "Turn your audience into a revenue-generating machine." },
  { icon: Rocket, week: "Week 7-8", title: "Scale Your Income", desc: "Multiply your income streams and go full-time." },
];

const SolutionSection = () => {
  return (
    <section id="solution" className="py-20 md:py-28 bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">The solution</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">
              The 8-Week Creator{" "}
              <span className="text-primary text-glow">Operating System</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {modules.map((mod, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="gradient-border rounded-2xl bg-card p-6 space-y-4 hover:scale-[1.02] transition-transform duration-300 h-full">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider">{mod.week}</div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <mod.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold font-display">{mod.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{mod.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
