import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SovereignLog {
  id: string;
  operator_action: string | null;
  created_at: string | null;
  job_id: string | null;
  raw_response: any;
}

interface DashboardData {
  totalRevenue: string | null;
  totalOrders: number | null;
  activeProjects: number | null;
  activeSubscriptions: number | null;
  recentWorkers: number | null;
  avgResponseTime: string | null;
  recentLogs: SovereignLog[];
}

export function useDashboardMetrics(pollInterval = 30000) {
  const [metrics, setMetrics] = useState<Omit<DashboardData, "recentLogs">>({
    totalRevenue: null,
    totalOrders: null,
    activeProjects: null,
    activeSubscriptions: null,
    recentWorkers: null,
    avgResponseTime: null,
  });
  const [recentLogs, setRecentLogs] = useState<SovereignLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMetrics = useCallback(async () => {
    const { data, error } = await supabase.functions.invoke("dashboard-metrics");

    if (error || !data) {
      console.error("dashboard-metrics error:", error);
      setIsLoading(false);
      return;
    }

    const d = data as DashboardData;
    setMetrics({
      totalRevenue: d.totalRevenue,
      totalOrders: d.totalOrders,
      activeProjects: d.activeProjects,
      activeSubscriptions: d.activeSubscriptions,
      recentWorkers: d.recentWorkers,
      avgResponseTime: d.avgResponseTime,
    });
    setRecentLogs(d.recentLogs ?? []);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, pollInterval);
    return () => clearInterval(interval);
  }, [fetchMetrics, pollInterval]);

  return { metrics, recentLogs, isLoading, refetch: fetchMetrics };
}
