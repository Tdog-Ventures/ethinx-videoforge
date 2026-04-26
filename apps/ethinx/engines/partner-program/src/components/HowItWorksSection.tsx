import { FileText, Settings, Paintbrush, Rocket } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";

const steps = [
  { icon: <FileText className="h-6 w-6" />, title: "Apply", desc: "Complete our 2-minute partner application" },
  { icon: <Settings className="h-6 w-6" />, title: "Onboard", desc: "We set up your white-label instance in 48 hours" },
  { icon: <Paintbrush className="h-6 w-6" />, title: "Customize", desc: "Add your branding, set your pricing, connect your domain" },
  { icon: <Rocket className="h-6 w-6" />, title: "Sell", desc: "Start offering AI marketing services to your clients immediately" },
];

const HowItWorksSection = () => {
  const ref = useFadeIn();
  return (
    <section id="how-it-works" className="py-24">
      <div ref={ref} className="fade-in-section container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">How It Works</h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                {step.icon}
              </div>
              <div className="mt-1 text-xs font-bold text-primary">STEP {i + 1}</div>
              <h4 className="mt-2 text-lg font-semibold">{step.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
