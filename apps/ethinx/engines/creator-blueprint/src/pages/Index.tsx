import {
  Play,
  FileText,
  Video,
  ChevronRight,
  CheckCircle2,
  Rocket,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const WEEKS = [
  { num: 1, label: "Foundation", done: true },
  { num: 2, label: "Content Strategy", done: false, current: true },
  { num: 3, label: "Audience Growth", done: false },
  { num: 4, label: "Monetization", done: false },
  { num: 5, label: "Ads & Funnels", done: false },
  { num: 6, label: "Email Marketing", done: false },
  { num: 7, label: "Scaling", done: false },
  { num: 8, label: "Launch & Beyond", done: false },
];

const CONTENT_CARDS = [
  { icon: Play, title: "Video Lesson", subtitle: "Content Pillars Deep Dive", meta: "15 min", color: "bg-primary/10 text-primary" },
  { icon: FileText, title: "Worksheet", subtitle: "Content Calendar Template", meta: "PDF Download", color: "bg-blue-500/10 text-blue-500" },
  { icon: Video, title: "Live Call", subtitle: "Q&A with Coach", meta: "Thursday 2PM EST", color: "bg-amber-500/10 text-amber-500" },
];

const Index = () => (
  <DashboardLayout
    title={<>Welcome back, <span className="text-primary">Alex</span></>}
    subtitle="Week 2 of 8 · Content Strategy"
  >
    {/* Stats bar */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { label: "Current Week", value: "Week 2 of 8", sub: "Content Strategy" },
        { label: "Completion", value: "78%", sub: "6 of 8 modules started" },
        { label: "Due Next", value: "Module 3 Video", sub: "Audience Growth" },
      ].map((stat) => (
        <div key={stat.label} className="bg-card rounded-xl border border-border p-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
          <p className="font-display font-bold text-xl text-foreground mt-1">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
        </div>
      ))}
    </div>

    {/* Progress tracker */}
    <section>
      <h3 className="font-display font-semibold text-base text-foreground mb-4">8-Week Progress</h3>
      <div className="bg-card rounded-xl border border-border p-5 overflow-x-auto">
        <div className="flex items-center gap-0 min-w-[640px]">
          {WEEKS.map((week, i) => (
            <div key={week.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                    week.done
                      ? "bg-primary border-primary text-primary-foreground"
                      : week.current
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted-foreground bg-muted"
                  }`}
                >
                  {week.done ? <CheckCircle2 className="h-4 w-4" /> : week.num}
                </div>
                <span className={`text-[10px] mt-1.5 text-center leading-tight max-w-[72px] ${week.done || week.current ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {week.label}
                </span>
              </div>
              {i < WEEKS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 ${week.done ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* This Week's Content */}
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-base text-foreground">This Week's Content</h3>
        <span className="text-xs text-muted-foreground">Week 2 · Content Strategy</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {CONTENT_CARDS.map((card) => (
          <div key={card.title} className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-colors cursor-pointer group">
            <div className={`h-10 w-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="h-5 w-5" />
            </div>
            <h4 className="font-display font-semibold text-sm text-foreground">{card.title}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{card.subtitle}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{card.meta}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* AdEngine CTA */}
    <section className="bg-card rounded-xl border border-border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-1">
        <h3 className="font-display font-semibold text-base text-foreground">Ready to launch your ads?</h3>
        <p className="text-sm text-muted-foreground mt-1">Use AdEngine to create high-converting video ads with AI. Included in your membership.</p>
      </div>
      <a href="https://pro-clip-gen.lovable.app" target="_blank" rel="noopener noreferrer">
        <Button variant="neon" size="lg">
          <Rocket className="mr-2 h-4 w-4" />
          Open AdEngine
        </Button>
      </a>
    </section>
  </DashboardLayout>
);

export default Index;
