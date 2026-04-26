import { motion } from "framer-motion";
import { Shield, Clock, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScarcitySection = () => {
  const scrollToOrder = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-neon bg-card p-10 md:p-14 text-center glow-neon"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Don't Miss <span className="text-gradient-neon">Your Spot</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { icon: Users, label: "Only 5 spots available" },
              { icon: Zap, label: "2 spots remaining", highlight: true },
              { icon: Clock, label: "Next availability: April 15" },
              { icon: Shield, label: "98% client satisfaction" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.highlight ? "bg-urgency/15" : "bg-primary/10"}`}>
                  <item.icon className={`w-5 h-5 ${item.highlight ? "text-urgency" : "text-primary"}`} />
                </div>
                <span className={`text-sm font-semibold font-display ${item.highlight ? "text-urgency" : "text-foreground/80"}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <Button variant="neon" size="xl" onClick={scrollToOrder}>
            <Zap className="w-5 h-5" />
            Reserve My Spot Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ScarcitySection;
