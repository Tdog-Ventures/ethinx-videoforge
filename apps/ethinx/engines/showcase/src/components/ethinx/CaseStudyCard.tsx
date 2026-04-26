import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface CaseStudyProps {
  tag: string;
  company: string;
  headline: string;
  challenge: string;
  solution: string;
  results: string[];
  quote: string;
  author: string;
}

const CaseStudyCard = ({ tag, company, headline, challenge, solution, results, quote, author }: CaseStudyProps) => {
  return (
    <ScrollReveal>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="rounded-lg border border-border bg-card p-6 md:p-10 transition-colors glow-green-hover hover:border-primary/30"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block rounded-full bg-primary/10 border border-primary/30 px-4 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
            {tag}
          </span>
          <span className="text-muted-foreground text-sm">{company}</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-6">{headline}</h3>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Challenge</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{challenge}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Solution</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{solution}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {results.map((result, i) => (
            <div key={i} className="rounded-lg bg-muted border border-border p-4 text-center">
              <div className="text-lg font-bold text-primary">{result}</div>
            </div>
          ))}
        </div>

        <blockquote className="border-l-2 border-primary pl-4 mb-6">
          <p className="text-muted-foreground italic text-sm">"{quote}"</p>
          <cite className="text-xs text-muted-foreground mt-2 block not-italic">— {author}</cite>
        </blockquote>

        <a href="https://creator-compass-dash.lovable.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
          Get Results Like This <ArrowRight size={16} />
        </a>
      </motion.div>
    </ScrollReveal>
  );
};

export default CaseStudyCard;
