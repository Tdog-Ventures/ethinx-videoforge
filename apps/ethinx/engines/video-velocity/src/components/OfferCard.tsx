import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "5 Custom Premium Videos (4K)",
  "All platforms optimized",
  "Landing page included",
  "5-email automated sequence",
  "Brand assets & thumbnails",
  "30-day async support",
];

const OfferCard = () => {
  const scrollToOrder = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 px-6">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl border border-neon bg-card p-10 md:p-14 glow-neon"
        >
          {/* Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-primary text-primary-foreground text-sm font-bold font-display rounded-full tracking-wide">
            MOST POPULAR
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 mt-4">
            5 Custom Premium Videos
          </h2>
          <p className="text-muted-foreground text-center text-lg mb-8">
            4K quality, all platforms
          </p>

          <ul className="space-y-4 mb-10">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground/90">{f}</span>
              </li>
            ))}
          </ul>

          <div className="text-center mb-8">
            <div className="text-5xl md:text-6xl font-bold font-display text-gradient-neon mb-2">
              $997
            </div>
            <p className="text-muted-foreground text-sm">
              one-time payment in AUD
            </p>
          </div>

          <Button variant="neon" size="xl" className="w-full" asChild>
            <a href="https://buy.stripe.com/8x2cN69Bs9bG3Ve2sf33W03" target="_blank" rel="noopener noreferrer">
              <Zap className="w-5 h-5" />
              Get Started — $997 AUD
            </a>
          </Button>

          <p className="text-center text-muted-foreground text-xs mt-4">
            One-time payment. Full delivery within 48 hours.
          </p>

          {/* Trust Signals */}
          <div className="mt-8 pt-6 border-t border-border/40 space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-primary font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              30-Day Money-Back Guarantee
            </div>
            <div className="flex items-center justify-center gap-4 text-muted-foreground text-xs">
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                Secure checkout via Stripe
              </span>
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                SSL encrypted
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferCard;
