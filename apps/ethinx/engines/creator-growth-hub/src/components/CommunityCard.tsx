import { Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const wins = [
  { name: "Sarah", text: "hit 50K followers!" },
  { name: "Marcus", text: "made $2,847 in week 4" },
];

export function CommunityCard() {
  return (
    <section className="card-glow rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground">Join 1,200+ Creators in Discord</h3>
          <p className="text-xs text-muted-foreground">Connect, collaborate, celebrate</p>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        {wins.map((w, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg bg-secondary p-3">
            <Trophy className="h-4 w-4 text-primary shrink-0" />
            <p className="text-sm text-foreground">
              <span className="font-semibold">{w.name}</span> {w.text}
            </p>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10">
        Go to Community
      </Button>
    </section>
  );
}
