import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, TrendingUp, Crown, X } from "lucide-react";
import { useFadeIn, useAnimatedProgress, useCountUp } from "@/hooks/useFadeIn";
import { AnimatePresence, motion } from "framer-motion";

const scrollToForm = () => {
  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
};

const DEMO_VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0";

const DemoModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative w-full max-w-4xl"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-muted/50 text-foreground transition-colors hover:bg-muted"
        aria-label="Close video"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border shadow-2xl">
        <iframe
          src={DEMO_VIDEO_URL}
          title="ETHINX Platform Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </motion.div>
  </motion.div>
);

const HeroSection = () => {
  const ref = useFadeIn();
  const { ref: progressRef, width: progressWidth } = useAnimatedProgress(62, 1500);
  const { ref: counterRef, value: spotsCount } = useCountUp(31, 1500);
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />

        <div ref={ref} className="fade-in-section container relative mx-auto px-4 py-20 text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            White-Label Our AI Marketing Engine.{" "}
            <span className="text-gradient-green">Sell It As Your Own.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Give your agency AI-powered video generation, ad creation, and campaign automation — branded as YOUR product. Zero development. Infinite margin.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="neon" size="xl" onClick={scrollToForm}>
              Apply for Partnership <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
            <Button variant="ghost-green" size="xl" onClick={() => setShowDemo(true)}>
              <Play className="mr-1 h-5 w-5" /> Watch Demo
            </Button>
          </div>

          {/* Progress bar */}
          <div className="mx-auto mt-14 max-w-md" ref={progressRef}>
            <p className="mb-3 text-sm text-muted-foreground">
              Currently onboarding <span className="font-semibold text-foreground">50 founding partners</span>
            </p>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${progressWidth}%`, transition: "none" }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground" ref={counterRef}>{spotsCount} of 50 spots filled</p>
          </div>

          {/* Tier badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Shield className="h-3.5 w-3.5" /> Founding Partner
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/20 bg-muted px-4 py-1.5 text-sm font-medium text-foreground">
              <TrendingUp className="h-3.5 w-3.5" /> Growth Partner
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
              <Crown className="h-3.5 w-3.5" /> Enterprise Partner
            </span>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}
      </AnimatePresence>
    </>
  );
};

export default HeroSection;
