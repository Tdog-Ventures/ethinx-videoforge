import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Mail, Copy, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const allTemplates = [
  { title: "Welcome email for your audience", category: "Onboarding", description: "Warm intro email that sets expectations and builds excitement." },
  { title: "Product launch sequence (Email 1)", category: "Launch", description: "Build anticipation for your upcoming product release." },
  { title: "Product launch sequence (Email 2)", category: "Launch", description: "Reveal the offer and drive early-bird conversions." },
  { title: "Product launch sequence (Email 3)", category: "Launch", description: "Last chance urgency and social proof closer." },
  { title: "Sales follow-up sequence", category: "Sales", description: "Nurture leads who showed interest but didn't buy." },
  { title: "Abandoned cart recovery", category: "Sales", description: "Bring back visitors who left without purchasing." },
  { title: "Weekly newsletter template", category: "Engagement", description: "Consistent value-driven content for your list." },
  { title: "Re-engagement campaign", category: "Engagement", description: "Win back inactive subscribers with a compelling offer." },
  { title: "Testimonial request email", category: "Social Proof", description: "Ask happy customers for reviews and testimonials." },
  { title: "Affiliate partnership outreach", category: "Partnerships", description: "Pitch potential affiliates to promote your product." },
  { title: "Webinar invitation sequence", category: "Events", description: "Drive registrations for your live training event." },
  { title: "Post-purchase thank you", category: "Onboarding", description: "Delight new customers and reduce refund rates." },
  { title: "Course completion congratulations", category: "Onboarding", description: "Celebrate student wins and upsell next steps." },
  { title: "Flash sale announcement", category: "Sales", description: "Time-limited offer that creates urgency." },
  { title: "Survey & feedback request", category: "Engagement", description: "Collect insights to improve your offerings." },
  { title: "Referral program invite", category: "Growth", description: "Turn customers into advocates with incentives." },
  { title: "Content upgrade delivery", category: "Lead Magnet", description: "Deliver your freebie and start the nurture sequence." },
  { title: "Black Friday / Holiday campaign", category: "Sales", description: "Seasonal promotion template with proven structure." },
  { title: "Milestone celebration", category: "Engagement", description: "Celebrate subscriber milestones to boost loyalty." },
  { title: "Cold outreach for collaborations", category: "Partnerships", description: "Reach out to potential collaborators professionally." },
  { title: "Event follow-up sequence", category: "Events", description: "Nurture attendees after your live event." },
  { title: "Upsell / cross-sell email", category: "Sales", description: "Recommend complementary products to existing buyers." },
  { title: "Waitlist announcement", category: "Launch", description: "Build hype before your product is ready." },
  { title: "Case study spotlight", category: "Social Proof", description: "Share a student/client success story." },
  { title: "Annual review & thank you", category: "Engagement", description: "Year-end recap celebrating community wins." },
  { title: "New feature announcement", category: "Launch", description: "Introduce new features to your user base." },
  { title: "Community welcome sequence", category: "Onboarding", description: "Onboard new community members step by step." },
  { title: "Pricing change notification", category: "Sales", description: "Announce price increases to drive action." },
  { title: "VIP / early access invite", category: "Growth", description: "Reward loyal subscribers with exclusive access." },
  { title: "Win-back discount offer", category: "Sales", description: "Re-engage churned customers with a special deal." },
];

const categories = ["All", ...Array.from(new Set(allTemplates.map((t) => t.category)))];

const EmailTemplatesPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = allTemplates.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Email Templates</h1>
              <p className="text-sm text-muted-foreground mt-1">30 ready-to-use templates for every situation</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="pl-9 pr-4 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-64"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((t, i) => (
              <div key={i} className="card-glow rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {t.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">{t.title}</h4>
                  <p className="text-xs text-muted-foreground">{t.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full border-border text-foreground hover:bg-secondary"
                  onClick={() => toast.success(`"${t.title}" copied to clipboard!`)}
                >
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy Template
                </Button>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-12">No templates found matching your search.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmailTemplatesPage;
