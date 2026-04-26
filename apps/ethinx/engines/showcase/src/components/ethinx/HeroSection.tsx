import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import heroBg from '@/assets/hero-bg.jpg';
import ScrollReveal from './ScrollReveal';
import { supabase } from '@/integrations/supabase/client';

const fallbackStats = [
  { value: '1,200+', label: 'Videos Generated' },
  { value: '340+', label: 'Businesses Served' },
  { value: '4.2x', label: 'Average ROAS' },
  { value: '$2.1M+', label: 'Revenue Generated' },
];

const formatStat = (key: string, raw: string): string => {
  const n = parseFloat(raw);
  switch (key) {
    case 'videos_generated': return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')},${String(Math.round(n) % 1000).padStart(3, '0')}+` : `${Math.round(n)}+`;
    case 'businesses_served': return `${Math.round(n)}+`;
    case 'average_roas': return `${n}x`;
    case 'revenue_generated': return `$${(n / 1_000_000).toFixed(1)}M+`;
    default: return raw;
  }
};

const statKeyToLabel: Record<string, string> = {
  videos_generated: 'Videos Generated',
  businesses_served: 'Businesses Served',
  average_roas: 'Average ROAS',
  revenue_generated: 'Revenue Generated',
};

const HeroSection = () => {
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    supabase
      .from('site_stats')
      .select('stat_key, stat_value')
      .then(({ data, error }) => {
        if (error || !data?.length) return;
        const ordered = ['videos_generated', 'businesses_served', 'average_roas', 'revenue_generated'];
        const mapped = ordered
          .map((key) => {
            const row = data.find((r) => r.stat_key === key);
            if (!row) return null;
            return { value: formatStat(key, row.stat_value), label: statKeyToLabel[key] || key };
          })
          .filter(Boolean) as { value: string; label: string }[];
        if (mapped.length) setStats(mapped);
      });
  }, []);

  return (
    <section className="relative px-4 pt-32 pb-20 overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      <div className="relative max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            Real Businesses. Real Results.{' '}
            <span className="text-gradient-green">Built With ETHINX.</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal stagger={1}>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-10">
            See how founders, marketers, and agencies are using AI-powered tools to generate content, drive leads, and scale revenue.
          </p>
        </ScrollReveal>
        <ScrollReveal stagger={2}>
          <a
            href="https://creator-compass-dash.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-primary-foreground font-semibold text-lg transition-all glow-green-hover hover:scale-105"
          >
            Start Your Free Audit <ArrowRight size={20} />
          </a>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} stagger={i + 3 > 8 ? 8 : i + 3}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
