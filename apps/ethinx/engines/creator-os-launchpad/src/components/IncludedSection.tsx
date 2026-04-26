import { Video, Mail, MessageCircle, Phone, FileText, BookOpen, Wrench } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const items = [
  { icon: Video, text: "8-week curriculum (video + worksheets)" },
  { icon: Wrench, text: "AdEngine tool (premium videos, templates)" },
  { icon: Mail, text: "30 done-for-you email sequences" },
  { icon: MessageCircle, text: "Private Discord community" },
  { icon: Phone, text: "Weekly live group calls" },
  { icon: FileText, text: "Templates library" },
  { icon: BookOpen, text: "Access to case studies" },
];

const IncludedSection = () => {
  return (
    <section id="included" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">Everything you get</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">What's Included</h2>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.08} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="flex items-center gap-4 rounded-xl bg-card p-4 border border-border/50 h-full">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncludedSection;
