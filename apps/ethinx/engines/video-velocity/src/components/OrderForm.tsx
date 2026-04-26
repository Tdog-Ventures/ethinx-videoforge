import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const niches = [
  "Fitness / Health",
  "Real Estate",
  "SaaS / Tech",
  "E-commerce",
  "Coaching / Consulting",
  "Finance / Crypto",
  "Education",
  "Other",
];

const themes = ["Educational", "Inspirational", "Urgency", "Authority", "Entertaining"];

const OrderForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    niche: "",
    story: "",
    themes: [] as string[],
    customPricing: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const toggleTheme = (t: string) => {
    setForm((prev) => ({
      ...prev,
      themes: prev.themes.includes(t)
        ? prev.themes.filter((x) => x !== t)
        : [...prev.themes, t],
    }));
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.niche) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("dfy_orders").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      business_name: form.story.trim() || null,
      business_type: form.niche,
      payment_plan: form.customPricing ? "custom" : "standard",
    });
    setSubmitting(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
      return;
    }
    // Send notification emails
    supabase.functions.invoke("send-dfy-order-notification", {
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        business_name: form.story.trim() || null,
        business_type: form.niche,
        payment_plan: form.customPricing ? "custom" : "standard",
      },
    }).catch((err) => console.error("Email notification failed:", err));

    toast.success("Order submitted! Check your email for confirmation.");
    setForm({ name: "", email: "", phone: "", niche: "", story: "", themes: [], customPricing: false });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow font-body text-sm";

  return (
    <section id="order-form" className="py-24 px-6 bg-secondary/30">
      <div className="container max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
        >
          Reserve Your <span className="text-gradient-neon">Spot</span>
        </motion.h2>
        <p className="text-center text-muted-foreground mb-12">
          Fill in the details below and we'll get started within 48 hours.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-8 md:p-12 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold font-display mb-2">Name *</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold font-display mb-2">Email *</label>
            <input
              type="email"
              className={inputClass}
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold font-display mb-2">
              Phone <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <input
              type="text"
              className={inputClass}
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          {/* Niche */}
          <div>
            <label className="block text-sm font-semibold font-display mb-2">Niche *</label>
            <select
              className={inputClass}
              value={form.niche}
              onChange={(e) => setForm({ ...form, niche: e.target.value })}
            >
              <option value="">Select your niche</option>
              {niches.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Brand Story */}
          <div>
            <label className="block text-sm font-semibold font-display mb-2">Brand Story</label>
            <textarea
              rows={4}
              className={inputClass}
              placeholder="Tell us about your brand, audience, and goals..."
              value={form.story}
              onChange={(e) => setForm({ ...form, story: e.target.value })}
            />
          </div>

          {/* Video Themes */}
          <div>
            <label className="block text-sm font-semibold font-display mb-3">Video Theme Preference</label>
            <div className="flex flex-wrap gap-2">
              {themes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTheme(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    form.themes.includes(t)
                      ? "border-neon bg-primary/15 text-primary"
                      : "border-border bg-secondary text-muted-foreground hover:border-muted-foreground/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Custom pricing */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.customPricing}
              onChange={(e) => setForm({ ...form, customPricing: e.target.checked })}
              className="w-4 h-4 rounded border-border accent-primary"
            />
            <span className="text-sm text-foreground/80">Interested in custom volume pricing?</span>
          </label>

          {/* Payment buttons */}
          <div className="space-y-3 mt-2">
            <Button
              variant="neon"
              size="xl"
              type="button"
              className="w-full"
              disabled={submitting}
              onClick={handleSubmit}
            >
              <Zap className="w-5 h-5" />
              {submitting ? "Reserving..." : "Reserve My Spot ($997)"}
            </Button>
            <a href="https://buy.stripe.com/PLACEHOLDER_SPLIT" target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="neon-outline" size="xl" type="button" className="w-full">
                <CreditCard className="w-5 h-5" />
                Payment Plan — $199/mo × 5
              </Button>
            </a>
          </div>

          <p className="text-center text-muted-foreground text-xs">
            30-day money-back guarantee · Secure Stripe checkout
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default OrderForm;
