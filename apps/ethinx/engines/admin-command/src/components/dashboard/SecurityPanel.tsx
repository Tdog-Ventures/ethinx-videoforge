import { Shield, Lock, Wifi, Server, Key, CheckCircle2 } from "lucide-react";

interface SecurityLayer {
  name: string;
  status: "active" | "pending" | "inactive";
  icon: React.ReactNode;
  description: string;
}

const securityLayers: SecurityLayer[] = [
  {
    name: "JWT Authentication",
    status: "active",
    icon: <Key className="w-4 h-4" />,
    description: "Token-based access control"
  },
  {
    name: "Rate Limiting",
    status: "active",
    icon: <Shield className="w-4 h-4" />,
    description: "100 req/min per IP"
  },
  {
    name: "SSL/TLS Encryption",
    status: "active",
    icon: <Lock className="w-4 h-4" />,
    description: "256-bit AES encryption"
  },
  {
    name: "DDoS Protection",
    status: "active",
    icon: <Wifi className="w-4 h-4" />,
    description: "Cloudflare enterprise"
  },
  {
    name: "Database Encryption",
    status: "active",
    icon: <Server className="w-4 h-4" />,
    description: "At-rest encryption"
  }
];

export function SecurityPanel() {
  const activeCount = securityLayers.filter(l => l.status === "active").length;
  const totalCount = securityLayers.length;
  const percentage = Math.round((activeCount / totalCount) * 100);

  return (
    <div className="glass-card rounded-lg p-5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground">Security Status</h3>
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <svg className="w-10 h-10 -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="3"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="hsl(var(--success))"
                strokeWidth="3"
                strokeDasharray={`${percentage} 100`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-success">
              {percentage}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {securityLayers.map((layer, index) => (
          <div 
            key={layer.name}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50 animate-fade-in-up opacity-0"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            <div className={`p-2 rounded-lg ${
              layer.status === "active" 
                ? "bg-success/20 text-success" 
                : "bg-muted text-muted-foreground"
            }`}>
              {layer.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{layer.name}</p>
              <p className="text-xs text-muted-foreground">{layer.description}</p>
            </div>
            <CheckCircle2 className={`w-5 h-5 ${
              layer.status === "active" ? "text-success" : "text-muted-foreground"
            }`} />
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Protection</span>
          <span className="text-success font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-success status-live" />
            MAXIMUM
          </span>
        </div>
      </div>
    </div>
  );
}
