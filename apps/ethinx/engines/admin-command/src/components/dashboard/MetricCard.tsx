import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
  suffix?: string;
  isLive?: boolean;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon, 
  trend = "neutral",
  suffix = "",
  isLive = false 
}: MetricCardProps) {
  return (
    <div className="glass-card rounded-lg p-5 glow-border group hover:bg-card/90 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        {isLive && (
          <span className="flex items-center gap-1.5 text-xs text-success">
            <span className="w-2 h-2 rounded-full bg-success status-live" />
            LIVE
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-end gap-2">
          <span className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            {value}
          </span>
          {suffix && (
            <span className="text-lg text-muted-foreground mb-1">{suffix}</span>
          )}
        </div>
        
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${
            trend === "up" ? "text-success" : 
            trend === "down" ? "text-destructive" : 
            "text-muted-foreground"
          }`}>
            {trend === "up" && <TrendingUp className="w-4 h-4" />}
            {trend === "down" && <TrendingDown className="w-4 h-4" />}
            <span>{change > 0 ? "+" : ""}{change}%</span>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
}
