import ScrollReveal from './ScrollReveal';

const partners = [
  'GlowUp', 'TechFlow', 'Urban Eats', 'MindShift', 'Premier', 'FitPro',
  'Apex', 'NordicWear', 'Strategos', 'ClearView', 'CodePath', 'Coastal',
];

const PartnerLogosSection = () => {
  return (
    <section id="partners" className="py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Trusted By <span className="text-gradient-green">Growing Businesses</span> Everywhere
          </h2>
        </ScrollReveal>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap">
          {[...partners, ...partners].map((name, i) => (
            <div
              key={i}
              className="mx-8 flex-shrink-0 text-2xl font-bold text-muted-foreground/30 hover:text-primary transition-colors duration-300 select-none"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogosSection;
