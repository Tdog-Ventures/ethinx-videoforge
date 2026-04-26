import { motion } from "framer-motion";
import { Phone, Video, Layout, Mail, Palette, MessageCircle } from "lucide-react";

const items = [
  { icon: Phone, title: "Discovery Call (30 min)", desc: "Tell us your story" },
  { icon: Video, title: "5 Custom Videos (4K)", desc: "Expert-crafted" },
  { icon: Layout, title: "Landing Page", desc: "Pre-built template" },
  { icon: Mail, title: "Email Sequence (5 emails)", desc: "Automated follow-up" },
  { icon: Palette, title: "Brand Assets", desc: "Thumbnails & graphics" },
  { icon: MessageCircle, title: "30-Day Support", desc: "24h async Discord response" },
];

const WhatsIncluded = () => (
  <section id="included" className="py-24 px-6 scroll-mt-20">
    <div className="container max-w-5xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-center mb-16"
      >
        What's <span className="text-gradient-neon">Included</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-xl border border-border bg-card p-8 hover:border-neon transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-1">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhatsIncluded;
