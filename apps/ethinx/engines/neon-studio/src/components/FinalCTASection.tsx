import AnimatedSection from "./AnimatedSection";

const FinalCTASection = () => (
  <section className="py-24 sm:py-32">
    <div className="container mx-auto px-4 sm:px-6 text-center">
      <AnimatedSection>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Stop Guessing. Start Scaling.
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
          Join 340+ businesses using ETHINX to automate their marketing.
        </p>
        <a
          href="https://creator-compass-dash.lovable.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-lg font-bold text-lg hover:bg-secondary transition-colors glow-green-strong"
        >
          Start Your Free Audit
        </a>
        <p className="text-sm text-muted-foreground mt-4">
          No credit card required. Results in 5 minutes.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default FinalCTASection;
