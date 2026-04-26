import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.img src={heroBg} alt="" style={{ y: bgY }} className="absolute inset-0 w-full h-[120%] object-cover" />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/75" />
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/8 blur-[120px]" />

      <div className="relative z-10 container max-w-4xl text-center px-6 py-20">
        {/* Urgency badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-urgency/40 bg-urgency/10 text-urgency text-sm font-semibold mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-urgency animate-pulse-neon" />
          Only 5 spots this month
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          We Create Your{" "}
          <span className="text-gradient-neon">5 Premium Videos</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xl md:text-2xl text-muted-foreground font-light mb-10 max-w-2xl mx-auto"
        >
          Expert-crafted. Platform-optimized. Results guaranteed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="neon" size="xl" asChild>
            <a href="#stripe-full">
              <Zap className="w-5 h-5" />
              Claim Your Spot
            </a>
          </Button>
          <Button variant="neon-outline" size="xl" asChild>
            <a href="#stripe-split">
              View Payment Plans
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
