import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-image.png";
import ThemeToggle from "./ThemeToggle";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--muted)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--muted)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Limited: Free audit for first 100 creators</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            >
              Your Creator{" "}
              <span className="text-primary text-glow">Operating System</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              From Zero to Full-Time Creator in 8 Weeks. No Experience Needed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="neon" size="lg" className="text-base px-8 py-6 animate-pulse-glow" asChild>
                <a href="https://creator-blueprint-builder.lovable.app" target="_blank" rel="noopener noreferrer">
                  Get Free Creator Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button variant="neon-outline" size="lg" className="text-base px-8 py-6" asChild>
                <a href="#solution">See How It Works</a>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="text-sm text-muted-foreground"
            >
              ✓ No credit card required &nbsp; ✓ 30-day money-back guarantee
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl" />
            <img
              src={heroImage}
              alt="Creator Operating System dashboard with automation workflows"
              className="relative rounded-2xl border border-border/50 w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
