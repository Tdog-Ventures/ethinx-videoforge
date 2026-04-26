import { useCountUp } from "@/hooks/useFadeIn";
import { Users, Zap, DollarSign, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, label: "Partners Onboarded", value: 312, suffix: "+" },
  { icon: Zap, label: "Campaigns Generated", value: 48500, suffix: "+" },
  { icon: DollarSign, label: "Revenue Earned", value: 2.4, suffix: "M+", prefix: "$", decimals: 1 },
  { icon: TrendingUp, label: "Avg. Partner ROI", value: 340, suffix: "%" },
];

const StatCard = ({ icon: Icon, label, value, suffix = "", prefix = "", decimals = 0 }: {
  icon: typeof Users; label: string; value: number; suffix?: string; prefix?: string; decimals?: number;
}) => {
  const { ref, value: count } = useCountUp(decimals ? value * 10 : value, 1800);

  const display = decimals
    ? `${prefix}${(count / 10).toFixed(decimals)}${suffix}`
    : `${prefix}${count.toLocaleString()}${suffix}`;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{display}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

const StatsSection = () => (
  <section className="border-y border-border bg-muted/20 py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 gap-10 sm:gap-12 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
