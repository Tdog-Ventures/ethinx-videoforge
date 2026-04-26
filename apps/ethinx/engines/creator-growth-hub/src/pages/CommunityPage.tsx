import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Users, Trophy, MessageSquare, ExternalLink, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const wins = [
  { name: "Sarah", text: "hit 50K followers using the Week 3 growth playbook!", time: "2 hours ago", likes: 48 },
  { name: "Marcus", text: "made $2,847 in his first week selling digital products!", time: "5 hours ago", likes: 92 },
  { name: "Elena", text: "landed her first brand deal worth $1,200!", time: "1 day ago", likes: 64 },
  { name: "James", text: "grew his email list from 0 to 2,000 subscribers!", time: "2 days ago", likes: 37 },
  { name: "Priya", text: "quit her 9-5 after hitting $5K/mo from her course!", time: "3 days ago", likes: 156 },
];

const channels = [
  { name: "#general", description: "Main community chat", members: 1247 },
  { name: "#wins", description: "Share your victories", members: 890 },
  { name: "#content-feedback", description: "Get feedback on your content", members: 654 },
  { name: "#accountability", description: "Find an accountability partner", members: 432 },
  { name: "#tech-help", description: "Technical questions & support", members: 389 },
];

const CommunityPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Community</h1>
              <p className="text-sm text-muted-foreground mt-1">Connect with 1,200+ creators on Discord</p>
            </div>
            <Button variant="neon" asChild>
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" /> Open Discord
              </a>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Users, label: "Members", value: "1,247" },
              { icon: MessageSquare, label: "Messages Today", value: "342" },
              { icon: TrendingUp, label: "Active Now", value: "89" },
            ].map((s, i) => (
              <div key={i} className="card-glow rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                    <p className="text-lg font-bold text-foreground">{s.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-glow rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Recent Wins</h3>
              </div>
              <div className="space-y-3">
                {wins.map((w, i) => (
                  <div key={i} className="rounded-lg bg-secondary p-3">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">{w.name}</span> {w.text}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-muted-foreground">{w.time}</span>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Heart className="h-3 w-3" /> {w.likes}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-glow rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h3 className="text-base font-bold text-foreground">Popular Channels</h3>
              </div>
              <div className="space-y-2">
                {channels.map((c, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-secondary p-3 hover:bg-secondary/80 transition-colors cursor-pointer">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.description}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{c.members}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </DashboardLayout>
  );
};

export default CommunityPage;
