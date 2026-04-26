import AnimatedSection from "./AnimatedSection";
import CountUp from "./CountUp";

const stats = [
  { prefix: "", end: 1200, suffix: "+", decimals: 0, label: "Videos Generated" },
  { prefix: "", end: 340, suffix: "+", decimals: 0, label: "Businesses Served" },
  { prefix: "", end: 4.2, suffix: "x", decimals: 1, label: "Average ROAS" },
  { prefix: "$", end: 2.1, suffix: "M+", decimals: 1, label: "Revenue Generated" },
];

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
    <div className="absolute inset-0 hero-gradient" />
    <div className="container mx-auto px-4 sm:px-6 relative z-10 py-20">
      <AnimatedSection className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.1] mb-6">
          Your Entire Marketing Engine.{" "}
          <span className="text-gradient-green">Built By AI.</span>{" "}
          Deployed In Minutes.
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          ETHINX gives creators, businesses, and agencies the AI-powered tools to generate content,
          automate marketing, and scale revenue — without hiring a team.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="https://creator-compass-dash.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-secondary transition-colors glow-green"
          >
            Start Free Audit
          </a>
          <a
            href="https://ethinx-win-showcase.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border text-foreground px-8 py-3.5 rounded-lg font-semibold text-lg hover:border-primary hover:text-primary transition-colors"
          >
            See Results
          </a>
        </div>
      </AnimatedSection>
      <AnimatedSection delay={300}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="text-center py-4 px-3 rounded-lg bg-card border border-border">
              <p className="text-sm sm:text-base font-semibold text-foreground">
                <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroSection;
