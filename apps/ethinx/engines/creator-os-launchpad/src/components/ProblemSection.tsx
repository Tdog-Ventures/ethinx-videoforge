import { EyeOff, Clock, XCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const problems = [
  { icon: EyeOff, text: "You create great content but no one sees it" },
  { icon: Clock, text: "You spend 20+ hours/week creating, not earning" },
  { icon: XCircle, text: "You're told to 'just be consistent' but no strategy" },
];

const ProblemSection = () => {
  return (
    <section id="problem" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">The real problem</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">
              You're Not Failing.{" "}
              <span className="text-primary text-glow">The System Is.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {problems.map((problem, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="gradient-border rounded-2xl bg-card p-8 text-center space-y-4 hover:bg-card/80 transition-colors h-full">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
                  <problem.icon className="h-7 w-7 text-destructive" />
                </div>
                <p className="text-lg font-medium leading-relaxed">{problem.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
