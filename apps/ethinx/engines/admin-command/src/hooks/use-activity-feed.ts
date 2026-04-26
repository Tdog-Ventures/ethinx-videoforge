import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ActivityItem {
  id: string;
  type: "security" | "login" | "config" | "system" | "alert";
  message: string;
  timestamp: string;
  status: "success" | "warning" | "info";
}

interface SovereignLog {
  id: string;
  operator_action: string | null;
  created_at: string | null;
}

function classifyLog(log: SovereignLog): ActivityItem {
  const action = log.operator_action ?? "system_event";
  const lower = action.toLowerCase();

  let type: ActivityItem["type"] = "system";
  let status: ActivityItem["status"] = "info";

  if (lower.includes("security") || lower.includes("scan") || lower.includes("firewall")) {
    type = "security";
    status = "success";
  } else if (lower.includes("login") || lower.includes("auth") || lower.includes("access")) {
    type = "login";
    status = "info";
  } else if (lower.includes("config") || lower.includes("update") || lower.includes("deploy")) {
    type = "config";
    status = "success";
  } else if (lower.includes("alert") || lower.includes("error") || lower.includes("fail")) {
    type = "alert";
    status = "warning";
  }

  return {
    id: log.id,
    type,
    message: action,
    timestamp: formatRelativeTime(log.created_at),
    status,
  };
}

function formatRelativeTime(dateStr: string | null): string {
  if (!dateStr) return "—";
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

interface UseActivityFeedProps {
  logs?: SovereignLog[];
}

export function useActivityFeed({ logs }: UseActivityFeedProps = {}) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Derive from logs provided by parent (edge function data)
  useEffect(() => {
    if (logs) {
      setActivities(logs.map(classifyLog));
      setIsLoading(false);
    }
  }, [logs]);

  // Realtime subscription for new inserts
  useEffect(() => {
    const channel = supabase
      .channel("sovereign_logs_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sovereign_logs" },
        (payload) => {
          const newItem = classifyLog(payload.new as SovereignLog);
          setActivities((prev) => [newItem, ...prev.slice(0, 9)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { activities, isLoading };
}
