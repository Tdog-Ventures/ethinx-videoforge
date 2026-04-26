import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Video, Sparkles, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const recentVideos = [
  { title: "Summer Product Launch Ad", date: "Not yet created", status: "draft" },
  { title: "Course Testimonial Reel", date: "Not yet created", status: "draft" },
];

const AdEnginePage = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <ScrollReveal>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AdEngine Tool</h1>
            <p className="text-sm text-muted-foreground mt-1">Create premium video ads in 60 seconds</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Video, label: "Videos Created", value: "0 / 25", sub: "This month" },
              { icon: Clock, label: "Avg. Creation Time", value: "58s", sub: "Per video" },
              { icon: BarChart3, label: "Total Views", value: "0", sub: "Across all videos" },
            ].map((stat, i) => (
              <div key={i} className="card-glow rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</span>
                </div>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="card-glow rounded-xl p-6 neon-border">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Create New Video</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Describe your product or service and AdEngine will generate a scroll-stopping video ad for you.
            </p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A 30-second ad for my online fitness coaching program targeting busy professionals..."
              className="w-full rounded-lg bg-secondary border border-border p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-28"
            />
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">Videos remaining: <span className="text-primary font-semibold">25</span></p>
              <Button variant="neon" disabled={!prompt.trim()}>
                <Video className="h-4 w-4 mr-2" /> Generate Video
              </Button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Recent Videos</h3>
            <div className="space-y-3">
              {recentVideos.map((v, i) => (
                <div key={i} className="card-glow rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-secondary">
                      <Video className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{v.title}</p>
                      <p className="text-xs text-muted-foreground">{v.date}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground bg-secondary px-2 py-1 rounded">
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Create your first video to get started! 🎬
            </p>
          </div>
        </ScrollReveal>
      </div>
    </DashboardLayout>
  );
};

export default AdEnginePage;
