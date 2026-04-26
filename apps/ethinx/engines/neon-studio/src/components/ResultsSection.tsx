import AnimatedSection from "./AnimatedSection";

const results = [
  { stat: "312%", label: "increase in conversions", company: "GlowUp Skincare", type: "E-Commerce" },
  { stat: "47", label: "qualified leads in 14 days", company: "TechFlow Solutions", type: "SaaS" },
  { stat: "$47K", label: "monthly revenue", company: "Urban Eats", type: "Local Business" },
];

const ResultsSection = () => (
  <section id="results" className="py-24 sm:py-32 bg-card/50">
    <div className="container mx-auto px-4 sm:px-6">
      <AnimatedSection className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Real Businesses. Real Results.
        </h2>
      </AnimatedSection>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {results.map((r, i) => (
          <AnimatedSection key={r.company} delay={i * 100}>
            <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/40 transition-all duration-300">
              <p className="text-4xl font-black text-gradient-green mb-2">{r.stat}</p>
              <p className="text-foreground font-medium mb-3">{r.label}</p>
              <p className="text-sm text-muted-foreground">{r.company} — {r.type}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
      <AnimatedSection className="text-center mt-10">
        <a
          href="https://ethinx-win-showcase.lovable.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold hover:underline"
        >
          See All Results →
        </a>
      </AnimatedSection>
    </div>
  </section>
);

export default ResultsSection;
