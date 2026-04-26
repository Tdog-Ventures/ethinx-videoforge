import { useEffect, useState } from "react";
import { Users, DollarSign, Shield, Clock, Server, Zap } from "lucide-react";
import { DashboardSidebar } from "./dashboard/DashboardSidebar";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { MetricCard } from "./dashboard/MetricCard";
import { ActivityFeed } from "./dashboard/ActivityFeed";
import { SecurityPanel } from "./dashboard/SecurityPanel";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { metrics, recentLogs } = useDashboardMetrics();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MetricCard
                  title="Total Orders"
                  value={metrics.totalOrders ?? "—"}
                  icon={<Users className="w-5 h-5" />}
                  isLive
                />
                <MetricCard
                  title="Total Revenue"
                  value={metrics.totalRevenue ?? "—"}
                  icon={<DollarSign className="w-5 h-5" />}
                />
                <MetricCard
                  title="Active Subscriptions"
                  value={metrics.activeSubscriptions ?? "—"}
                  icon={<Shield className="w-5 h-5" />}
                />
                <MetricCard
                  title="Active Projects"
                  value={metrics.activeProjects ?? "—"}
                  icon={<Server className="w-5 h-5" />}
                  isLive
                />
                <MetricCard
                  title="Online Workers"
                  value={metrics.recentWorkers ?? "—"}
                  icon={<Clock className="w-5 h-5" />}
                />
                <MetricCard
                  title="Avg Response Time"
                  value={metrics.avgResponseTime ?? "—"}
                  icon={<Zap className="w-5 h-5" />}
                />
              </div>
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityFeed logs={recentLogs} />
              <SecurityPanel />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
