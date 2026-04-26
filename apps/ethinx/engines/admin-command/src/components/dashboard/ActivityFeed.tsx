import { Shield, AlertTriangle, CheckCircle, LogIn, Settings, Database, Loader2 } from "lucide-react";
import { useActivityFeed } from "@/hooks/use-activity-feed";
import type { ActivityItem } from "@/hooks/use-activity-feed";

const getIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "security":
      return <Shield className="w-4 h-4" />;
    case "login":
      return <LogIn className="w-4 h-4" />;
    case "config":
      return <Settings className="w-4 h-4" />;
    case "system":
      return <Database className="w-4 h-4" />;
    case "alert":
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return <CheckCircle className="w-4 h-4" />;
  }
};

const getStatusColor = (status: ActivityItem["status"]) => {
  switch (status) {
    case "success":
      return "bg-success/20 text-success border-success/30";
    case "warning":
      return "bg-warning/20 text-warning border-warning/30";
    case "info":
      return "bg-primary/20 text-primary border-primary/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

interface ActivityFeedProps {
  logs?: { id: string; operator_action: string | null; created_at: string | null }[];
}

export function ActivityFeed({ logs }: ActivityFeedProps) {
  const { activities, isLoading } = useActivityFeed({ logs });

  return (
    <div className="glass-card rounded-lg p-5 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground">Recent Activity</h3>
        <span className="text-xs text-muted-foreground">Live · sovereign_logs</span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
        </div>
      ) : activities.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-12">No recent activity</p>
      ) : (
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {activities.map((item, index) => (
            <div
              key={item.id}
              className="flex gap-3 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
            >
              <div className={`shrink-0 p-2 rounded-lg border ${getStatusColor(item.status)}`}>
                {getIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">{item.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
