import ScrollReveal from './ScrollReveal';

const results = [
  { tag: 'Coaching', metric: '+127 email subscribers/week', desc: 'Automated lead gen with CreatorOS', company: 'MindShift Academy' },
  { tag: 'Real Estate', metric: '23 listings sold in 60 days', desc: 'Video tours + Facebook ads', company: 'Premier Properties' },
  { tag: 'Fitness', metric: '$18K in course sales', desc: 'Launch campaign with email sequence', company: 'FitPro Online' },
  { tag: 'Agency', metric: '12 new retainer clients', desc: 'White-labeled ETHINX for client delivery', company: 'Apex Digital' },
  { tag: 'E-Commerce', metric: '$92K Black Friday revenue', desc: '30 video ads + retargeting sequence', company: 'NordicWear' },
  { tag: 'Consulting', metric: '5x qualified discovery calls', desc: 'LinkedIn video + landing page combo', company: 'Strategos Advisory' },
  { tag: 'Healthcare', metric: '+340% website traffic', desc: 'Content engine + local SEO', company: 'ClearView Dental' },
  { tag: 'Education', metric: '1,200 course enrollments', desc: 'Webinar funnel + ad suite', company: 'CodePath Academy' },
  { tag: 'Hospitality', metric: '89% occupancy rate', desc: 'Seasonal video campaigns', company: 'Coastal Retreats' },
];

const ResultsWallSection = () => {
  return (
    <section id="results" className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            The Results <span className="text-gradient-green">Keep Coming</span>
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((r, i) => (
            <ScrollReveal key={i} stagger={((i % 3) + 1) as 1 | 2 | 3}>
              <div className="rounded-lg border border-border bg-card p-6 transition-all glow-green-hover hover:border-primary/30 h-full">
                <span className="inline-block rounded-full bg-primary/10 border border-primary/30 px-3 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider mb-3">
                  {r.tag}
                </span>
                <div className="text-xl font-bold text-primary mb-2">{r.metric}</div>
                <p className="text-sm text-muted-foreground mb-3">{r.desc}</p>
                <p className="text-xs text-muted-foreground/70">{r.company}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsWallSection;
