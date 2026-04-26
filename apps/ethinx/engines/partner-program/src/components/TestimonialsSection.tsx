import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useFadeIn } from "@/hooks/useFadeIn";

const testimonials = [
  {
    name: "Marcus Chen",
    role: "Founder, Apex Digital",
    quote:
      "We went from $0 to $18k/mo in recurring revenue within 90 days. ETHINX's white-label platform let us launch an AI product without writing a single line of code.",
    stars: 5,
    metric: "$18k/mo",
    metricLabel: "in 90 days",
  },
  {
    name: "Sarah Okonkwo",
    role: "CEO, BrightPath Agency",
    quote:
      "Our clients think we built the AI engine ourselves. The branding is seamless, and the content quality blows everything else out of the water.",
    stars: 5,
    metric: "47",
    metricLabel: "clients onboarded",
  },
  {
    name: "Jake Morrison",
    role: "Managing Director, ScaleUp Co.",
    quote:
      "The revenue calculator undersold it — we're actually earning MORE than projected. Best partnership decision we've ever made.",
    stars: 5,
    metric: "312%",
    metricLabel: "ROI in 6 months",
  },
];

const TestimonialsSection = () => {
  const ref = useFadeIn();

  return (
    <section className="py-24">
      <div ref={ref} className="fade-in-section container mx-auto px-4">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-primary">
          Partner Success Stories
        </p>
        <h2 className="mt-3 text-center text-3xl font-bold sm:text-4xl">
          Trusted by Ambitious Agencies
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          Real results from real partners who launched with ETHINX.
        </p>

        <div className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: testimonials.indexOf(t) * 0.15 }}
              whileHover={{ y: -6, boxShadow: "0 0 25px hsl(153 100% 50% / 0.15)" }}
              className="group relative flex flex-col rounded-lg border border-border bg-card p-6"
            >
              {/* Quote icon */}
              <Quote className="mb-4 h-8 w-8 text-primary/30" />

              {/* Stars */}
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                "{t.quote}"
              </blockquote>

              {/* Metric badge */}
              <div className="mt-6 inline-flex w-fit items-baseline gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
                <span className="text-lg font-bold text-primary">
                  {t.metric}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t.metricLabel}
                </span>
              </div>

              {/* Author */}
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
