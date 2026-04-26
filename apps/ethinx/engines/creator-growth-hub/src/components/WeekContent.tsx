import { Play, Download, CalendarDays, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const items = [
  {
    type: "Video",
    title: "Content Strategy Fundamentals",
    meta: "15 min",
    icon: Play,
  },
  {
    type: "Worksheet",
    title: "Audience Analysis Template",
    meta: "PDF Download",
    icon: Download,
  },
  {
    type: "Live Call",
    title: "Thursday 2PM EST — Q&A",
    meta: "Zoom",
    icon: CalendarDays,
  },
];

export function WeekContent() {
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <section>
      <h3 className="text-lg font-bold text-foreground mb-1">This Week's Content</h3>
      <p className="text-sm text-muted-foreground mb-4">Week 2 — Content Strategy</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <div key={i} className="card-glow rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {item.type}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.meta}</p>
            </div>
            <Button
              variant={completed.has(i) ? "secondary" : "neon"}
              size="sm"
              className="mt-4 w-full"
              onClick={() => toggle(i)}
            >
              {completed.has(i) ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Completed
                </>
              ) : (
                "Mark Complete"
              )}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
