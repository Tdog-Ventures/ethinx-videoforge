import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsRow } from "@/components/StatsRow";
import { ProgressSection } from "@/components/ProgressSection";
import { WeekContent } from "@/components/WeekContent";
import { AdEngineCard } from "@/components/AdEngineCard";
import { CommunityCard } from "@/components/CommunityCard";
import { EmailTemplates } from "@/components/EmailTemplates";
import { SupportSection } from "@/components/SupportSection";
import { DashboardFooter } from "@/components/DashboardFooter";
import { ScrollReveal } from "@/components/ScrollReveal";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <ScrollReveal>
          <StatsRow />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <ProgressSection />
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <WeekContent />
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <AdEngineCard />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CommunityCard />
            <SupportSection />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <EmailTemplates />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <DashboardFooter />
        </ScrollReveal>
      </div>
    </DashboardLayout>
  );
};

export default Index;
