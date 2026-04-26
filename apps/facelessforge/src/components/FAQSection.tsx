import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Are payment plans available?",
    a: "Yes! We offer $199/month × 5 months as a flexible payment plan. Same great service, easier on your budget.",
  },
  {
    q: "How long does delivery take?",
    a: "All 5 videos are delivered within 7-10 business days after your discovery call.",
  },
  {
    q: "What's the money-back guarantee?",
    a: "We offer a full 30-day money-back guarantee. If you're not satisfied with the results, we'll refund 100% of your investment.",
  },
  {
    q: "Can I get a custom package?",
    a: "Absolutely. Check the 'Interested in custom volume pricing?' box in the order form and we'll create a tailored package for your needs.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 scroll-mt-20">
      <div className="container max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
        >
          Frequently Asked <span className="text-gradient-neon">Questions</span>
        </motion.h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-display font-semibold">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-40 pb-6 px-6" : "max-h-0"
                }`}
              >
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
