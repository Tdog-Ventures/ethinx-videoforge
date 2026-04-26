import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const clientOptions = ["1-10", "11-50", "51-200", "200+"];
const budgetOptions = ["Under $5K", "$5-20K", "$20-50K", "$50K+"];
const tierOptions = ["Founding", "Growth", "Enterprise"];

const ApplicationFormSection = () => {
  const ref = useFadeIn();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    agencyName: "",
    yourName: "",
    email: "",
    website: "",
    clients: "",
    budget: "",
    why: "",
    tier: "Founding",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.agencyName.trim()) e.agencyName = "Required";
    if (!form.yourName.trim()) e.yourName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.website.trim()) e.website = "Required";
    if (!form.clients) e.clients = "Required";
    if (!form.budget) e.budget = "Required";
    if (!form.why.trim()) e.why = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Use type assertion for new table not yet in generated types
    const { error } = await (supabase.from("partner_applications" as any) as any).insert({
      agency_name: form.agencyName.trim(),
      contact_name: form.yourName.trim(),
      email: form.email.trim().toLowerCase(),
      website: form.website.trim(),
      current_clients: form.clients,
      monthly_budget: form.budget,
      why_partner: form.why.trim(),
      preferred_tier: form.tier,
    });
    
    setIsSubmitting(false);
    
    if (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Supabase error:", error);
      return;
    }
    
    // Send notification emails
    supabase.functions.invoke("send-partner-notification", {
      body: {
        type: "new_application",
        agency_name: form.agencyName.trim(),
        contact_name: form.yourName.trim(),
        email: form.email.trim().toLowerCase(),
        website: form.website.trim(),
        current_clients: form.clients,
        monthly_budget: form.budget,
        why_partner: form.why.trim(),
        preferred_tier: form.tier,
      },
    });
    
    setSubmitted(true);
    toast.success("Application submitted! Check your email for confirmation.");
  };

  const update = (key: string, val: string) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => { const n = { ...p }; delete n[key]; return n; });
  };

  const inputCls = "w-full rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors";
  const labelCls = "block text-sm font-medium mb-1.5";
  const errorCls = "text-xs text-destructive mt-1";

  if (submitted) {
    return (
      <section id="apply" className="py-24">
        <div className="container mx-auto max-w-lg px-4 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-primary" />
          <h2 className="mt-4 text-3xl font-bold">Application Received!</h2>
          <p className="mt-2 text-muted-foreground">We'll respond within 24 hours. Founding partner spots are limited.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="py-24">
      <div ref={ref} className="fade-in-section container mx-auto max-w-2xl px-4">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Apply to Become a Partner</h2>
        <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">
          Tell us about your agency. We review applications within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Agency Name</label>
              <input className={inputCls} placeholder="Acme Marketing" value={form.agencyName} onChange={(e) => update("agencyName", e.target.value)} />
              {errors.agencyName && <p className={errorCls}>{errors.agencyName}</p>}
            </div>
            <div>
              <label className={labelCls}>Your Name</label>
              <input className={inputCls} placeholder="Jane Smith" value={form.yourName} onChange={(e) => update("yourName", e.target.value)} />
              {errors.yourName && <p className={errorCls}>{errors.yourName}</p>}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Email</label>
              <input type="email" className={inputCls} placeholder="jane@agency.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
              {errors.email && <p className={errorCls}>{errors.email}</p>}
            </div>
            <div>
              <label className={labelCls}>Website URL</label>
              <input className={inputCls} placeholder="https://agency.com" value={form.website} onChange={(e) => update("website", e.target.value)} />
              {errors.website && <p className={errorCls}>{errors.website}</p>}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Number of Current Clients</label>
              <select className={inputCls} value={form.clients} onChange={(e) => update("clients", e.target.value)}>
                <option value="">Select…</option>
                {clientOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.clients && <p className={errorCls}>{errors.clients}</p>}
            </div>
            <div>
              <label className={labelCls}>Monthly Marketing Budget</label>
              <select className={inputCls} value={form.budget} onChange={(e) => update("budget", e.target.value)}>
                <option value="">Select…</option>
                {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.budget && <p className={errorCls}>{errors.budget}</p>}
            </div>
          </div>

          <div>
            <label className={labelCls}>Why do you want to partner with ETHINX?</label>
            <textarea className={`${inputCls} min-h-[100px] resize-none`} placeholder="Tell us about your goals…" value={form.why} onChange={(e) => update("why", e.target.value)} />
            {errors.why && <p className={errorCls}>{errors.why}</p>}
          </div>

          <div>
            <label className={labelCls}>Preferred Tier</label>
            <div className="flex flex-wrap gap-4 mt-1">
              {tierOptions.map((t) => (
                <label key={t} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="tier"
                    value={t}
                    checked={form.tier === t}
                    onChange={(e) => update("tier", e.target.value)}
                    className="accent-[hsl(153,100%,50%)]"
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          <Button variant="neon" size="xl" className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</>
            ) : (
              <><Send className="mr-2 h-5 w-5" /> Submit Application</>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            We'll respond within 24 hours. Founding partner spots are limited.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ApplicationFormSection;
