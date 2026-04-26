import { Check } from "lucide-react";

const weeks = [
  { num: 1, title: "Foundation", completed: true },
  { num: 2, title: "Content Strategy", completed: false, current: true },
  { num: 3, title: "Audience Growth", completed: false },
  { num: 4, title: "Monetization", completed: false },
  { num: 5, title: "Ads & Funnels", completed: false },
  { num: 6, title: "Email Marketing", completed: false },
  { num: 7, title: "Scaling", completed: false },
  { num: 8, title: "Launch & Beyond", completed: false },
];

export function ProgressSection() {
  return (
    <section className="card-glow rounded-xl p-6">
      <h3 className="text-lg font-bold text-foreground mb-1">Your Progress</h3>
      <p className="text-sm text-muted-foreground mb-6">8-week curriculum roadmap</p>

      <div className="progress-bar-track h-2.5 mb-8">
        <div className="progress-bar-fill h-full" style={{ width: "18.75%" }} />
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {weeks.map((w) => (
          <div key={w.num} className="flex flex-col items-center gap-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                w.completed
                  ? "bg-primary text-primary-foreground"
                  : w.current
                  ? "border-2 border-primary text-primary neon-border"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {w.completed ? <Check className="h-4 w-4" /> : w.num}
            </div>
            <span
              className={`text-[10px] text-center leading-tight ${
                w.current ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              {w.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
