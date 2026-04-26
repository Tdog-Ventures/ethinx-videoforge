import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";

const cases = [
  {
    name: "Sarah M.",
    niche: "Fitness Coach",
    stat: "10K views in week 1",
    quote: "These videos completely transformed my online presence. The quality is unmatched.",
  },
  {
    name: "James L.",
    niche: "SaaS Founder",
    stat: "3 brand deals landed",
    quote: "Within a month I had sponsors reaching out. The ROI was instant.",
  },
  {
    name: "Maria K.",
    niche: "Real Estate Agent",
    stat: "$5K revenue month 1",
    quote: "My first listing video generated more leads than my entire last quarter.",
  },
];

const ResultsSection = () => (
  <section id="results" className="py-24 px-6 bg-secondary/30 scroll-mt-20">
    <div className="container max-w-5xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-center mb-16"
      >
        Client <span className="text-gradient-neon">Results</span>
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {cases.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="rounded-xl border border-border bg-card p-8"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="font-display font-bold text-primary text-sm">{c.stat}</span>
            </div>
            <p className="text-foreground/80 italic mb-5 text-sm leading-relaxed">"{c.quote}"</p>
            <div>
              <p className="font-display font-semibold text-sm">{c.name}</p>
              <p className="text-muted-foreground text-xs">{c.niche}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ResultsSection;
