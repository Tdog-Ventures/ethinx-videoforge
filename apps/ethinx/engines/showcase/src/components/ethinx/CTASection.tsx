import { ArrowRight, Zap, Layers, Rocket, Video, Handshake, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const paths = [
  {
    icon: Zap,
    title: 'Free Audit',
    desc: 'See where you stand in 5 minutes',
    cta: 'Take the Audit',
    href: 'https://creator-compass-dash.lovable.app',
  },
  {
    icon: Layers,
    title: 'Creator System',
    desc: 'Build your content engine for $297/mo',
    cta: 'Get Started',
    href: 'https://creator-blueprint-builder.lovable.app',
  },
  {
    icon: Rocket,
    title: 'Done For You',
    desc: 'We build everything for $997',
    cta: 'Claim Your Spot',
    href: 'https://premium-video-forge.lovable.app',
  },
  {
    icon: Video,
    title: 'AdEngine',
    desc: 'AI-powered video generation at scale',
    cta: 'Generate Videos',
    href: 'https://pro-clip-gen.lovable.app',
  },
  {
    icon: Handshake,
    title: 'Partner',
    desc: 'White-label our tools under your brand',
    cta: 'Become a Partner',
    href: 'https://brand-cascade.lovable.app',
  },
  {
    icon: GraduationCap,
    title: 'Creator Growth',
    desc: '8-week course to master content strategy',
    cta: 'Enroll Now',
    href: 'https://biz-creator-path.lovable.app',
  },
];

const CTASection = () => {
  return (
    <section id="pricing" className="px-4 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Your Success Story <span className="text-gradient-green">Starts Here</span>
          </h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paths.map((path, i) => (
            <ScrollReveal key={path.title} stagger={(i + 1) as 1 | 2 | 3}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="rounded-lg border border-border bg-card p-8 flex flex-col items-center text-center transition-colors glow-green-hover hover:border-primary/30 h-full"
              >
                <path.icon className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-1">{path.desc}</p>
                <a
                  href={path.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground font-semibold text-sm transition-all hover:scale-105 glow-green-hover"
                >
                  {path.cta} <ArrowRight size={16} />
                </a>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
