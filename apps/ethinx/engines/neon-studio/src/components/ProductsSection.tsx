import { Video, TrendingUp, ClipboardCheck, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const products = [
  {
    icon: Video,
    title: "VideoForge",
    subtitle: "AI Video Generation",
    desc: "30 professional marketing videos in 60 seconds. Script, voiceover, motion graphics — all automated.",
    cta: "Try VideoForge →",
    href: "https://pro-clip-gen.lovable.app",
    badge: null,
  },
  {
    icon: TrendingUp,
    title: "Creator Growth Engine",
    subtitle: "8-Week Creator System",
    desc: "The complete curriculum to go from zero to full-time creator. Strategy, content, monetisation — all mapped out.",
    cta: "Explore the System →",
    href: "https://biz-creator-path.lovable.app",
    badge: null,
  },
  {
    icon: ClipboardCheck,
    title: "CreatorOS Audit",
    subtitle: "Free Content Audit",
    desc: "Score your content strategy in 5 minutes. Get personalised recommendations and a growth roadmap — completely free.",
    cta: "Take the Audit →",
    href: "https://creator-compass-dash.lovable.app",
    badge: "FREE",
  },
  {
    icon: Rocket,
    title: "Done For You",
    subtitle: "DFY Marketing Package",
    desc: "We build your entire marketing engine — videos, landing pages, emails, ads — delivered in 48 hours. $997 one-time.",
    cta: "Get Started →",
    href: "https://premium-video-forge.lovable.app",
    badge: "POPULAR",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      type: "spring" as const,
      stiffness: 80,
      damping: 16,
    },
  }),
};

const ProductsSection = () => (
  <section id="products" className="py-24 sm:py-32">
    <div className="container mx-auto px-4 sm:px-6">
      <AnimatedSection className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          One Ecosystem. Every Tool You Need.
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          From free audit to full-service delivery — choose your path.
        </p>
      </AnimatedSection>
      <motion.div
        className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {products.map((p, i) => (
          <motion.div key={p.title} custom={i} variants={cardVariants}>
            <div className="group relative bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-all duration-300 hover:scale-[1.03] hover:glow-green-strong hover:-translate-y-1 h-full flex flex-col">
              <div className="h-1 w-full bg-primary/60 rounded-t-lg absolute top-0 left-0 right-0" />
              <div className="flex items-start justify-between mb-4 mt-2">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <p.icon className="text-primary" size={24} />
                </div>
                {p.badge && (
                  <span className="bg-primary/15 text-primary text-xs font-bold px-3 py-1 rounded-full">
                    {p.badge}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{p.title}</h3>
              <p className="text-sm text-primary font-medium mb-3">{p.subtitle}</p>
              <p className="text-muted-foreground text-sm flex-1">{p.desc}</p>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-primary font-semibold text-sm hover:underline"
              >
                {p.cta}
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProductsSection;
