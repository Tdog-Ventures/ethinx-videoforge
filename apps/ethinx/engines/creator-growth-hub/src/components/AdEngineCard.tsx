import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdEngineCard() {
  return (
    <section className="card-glow rounded-xl p-6 neon-border">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Video className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Generate Your First Video</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              Create premium videos in 60 seconds with AdEngine
            </p>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              You've created: <span className="text-primary font-semibold">0 / 25</span> videos this month
            </p>
          </div>
        </div>
        <Button variant="neon" size="lg" className="shrink-0" asChild>
          <a href="https://pro-clip-gen.lovable.app" target="_blank" rel="noopener noreferrer">
            Open AdEngine
          </a>
        </Button>
      </div>
    </section>
  );
}
