import { Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    name: "Sarah Chen",
    niche: "Finance Creator",
    avatar: "SC",
    before: "$0/mo",
    after: "$4,200/mo",
    quote: "I went from posting randomly to a full content system. By week 6, I had my first $4K month.",
  },
  {
    name: "Marcus Williams",
    niche: "Fitness Creator",
    avatar: "MW",
    before: "$200/mo",
    after: "$6,800/mo",
    quote: "The email sequences alone paid for the course 10x over. This is the blueprint I was missing.",
  },
  {
    name: "Elena Rodriguez",
    niche: "Tech Creator",
    avatar: "ER",
    before: "$0/mo",
    after: "$3,100/mo",
    quote: "As a complete beginner, I was scared. By week 3, I had 2K followers and my first brand deal.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">Success stories</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">Real Creators. Real Results.</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.12}>
              <div className="gradient-border rounded-2xl bg-card p-6 space-y-4 h-full">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.niche}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-destructive line-through">{t.before}</span>
                  <span className="text-primary">→</span>
                  <span className="text-primary font-bold">{t.after}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
