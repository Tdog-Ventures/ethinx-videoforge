import AnimatedSection from "./AnimatedSection";

const points = ["Your Brand, Our Tech", "70/30 Revenue Split", "Zero Development"];

const PartnersSection = () => (
  <section id="partners" className="py-24 sm:py-32">
    <div className="container mx-auto px-4 sm:px-6">
      <AnimatedSection>
        <div className="max-w-4xl mx-auto bg-card border border-primary/30 rounded-lg p-8 sm:p-12 text-center glow-green">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            White-Label ETHINX For Your Agency
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            License our AI marketing engine under your brand. Set your prices. Keep 70%.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {points.map((p) => (
              <div key={p} className="bg-muted/50 rounded-lg py-3 px-4">
                <p className="font-semibold text-foreground text-sm">{p}</p>
              </div>
            ))}
          </div>
          <a
            href="https://brand-cascade.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-secondary transition-colors"
          >
            Learn About Partnerships →
          </a>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default PartnersSection;
