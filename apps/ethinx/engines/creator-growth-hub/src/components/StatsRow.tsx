import { Calendar, TrendingUp, PlayCircle } from "lucide-react";

const stats = [
  {
    label: "Current Week",
    value: "Week 2 of 8",
    icon: Calendar,
    detail: "Started Mar 3",
  },
  {
    label: "Completion",
    value: "78%",
    icon: TrendingUp,
    detail: "Modules done",
  },
  {
    label: "Due Next",
    value: "Module 3 Video",
    icon: PlayCircle,
    detail: "Content Strategy",
  },
];

export function StatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`card-glow rounded-xl p-5 animate-slide-up animate-slide-up-delay-${i + 1}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{stat.detail}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
