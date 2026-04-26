import { motion } from "framer-motion";
import { CalendarCheck, Phone, Film, Rocket } from "lucide-react";

const steps = [
  { icon: CalendarCheck, title: "Book Your Spot", desc: "Secure your place" },
  { icon: Phone, title: "Discovery Call", desc: "30-min strategy session" },
  { icon: Film, title: "Videos Created", desc: "7-10 day turnaround" },
  { icon: Rocket, title: "Deploy & Celebrate", desc: "Launch & grow" },
];

const ProcessSection = () => (
  <section id="process" className="py-24 px-6 scroll-mt-20">
    <div className="container max-w-4xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-center mb-16"
      >
        How It <span className="text-gradient-neon">Works</span>
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-neon flex items-center justify-center mx-auto mb-5">
              <s.icon className="w-7 h-7 text-primary" />
            </div>
            <div className="text-xs text-primary font-display font-bold mb-2">STEP {i + 1}</div>
            <h3 className="font-display font-semibold text-lg mb-1">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
