import ScrollReveal from './ScrollReveal';
import CaseStudyCard from './CaseStudyCard';

const caseStudies = [
  {
    tag: 'E-Commerce',
    company: 'GlowUp Skincare',
    headline: 'From $0 to $47K/Month Using AI-Generated Video Ads',
    challenge: 'No video content. $2K/month ad budget. Competing against brands spending 10x more.',
    solution: 'Used AdEngine to generate 30 video ad variants in 60 seconds. A/B tested across Facebook and Instagram.',
    results: ['312% increase in conversions', '$47K monthly revenue', '4.7x ROAS'],
    quote: 'We went from guessing to scaling in under a week.',
    author: 'Sarah Chen, Founder',
  },
  {
    tag: 'SaaS',
    company: 'TechFlow Solutions',
    headline: '47 Qualified Enterprise Leads in 14 Days',
    challenge: 'Long sales cycles. Generic marketing content. No dedicated content team.',
    solution: 'Deployed Creator Growth Engine for lead magnets + AdEngine for LinkedIn video campaigns.',
    results: ['47 qualified leads in 14 days', '68% reduction in cost per lead', '$340K pipeline generated'],
    quote: 'This replaced a $15K/month agency for us.',
    author: 'Marcus Webb, CEO',
  },
  {
    tag: 'Local Business',
    company: 'Urban Eats Restaurant Group',
    headline: 'Filled 200+ Reservations From a Single Video Campaign',
    challenge: '3 locations. No social media presence. Relying entirely on foot traffic and word of mouth.',
    solution: 'Created location-specific video ads + Google Ads landing pages using ETHINX DFY service.',
    results: ['200+ reservations in first month', '15,000 local video views', '3.8x return on ad spend'],
    quote: "We had zero online presence. Now we're booked out weekends.",
    author: 'Lisa Park, Marketing Director',
  },
];

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="px-4 py-20">
      <div className="max-w-5xl mx-auto space-y-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured <span className="text-gradient-green">Case Studies</span>
          </h2>
        </ScrollReveal>
        {caseStudies.map((cs) => (
          <CaseStudyCard key={cs.company} {...cs} />
        ))}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
