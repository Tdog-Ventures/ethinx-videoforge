import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Shield, 
  Activity, 
  Database,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", active: true },
  { icon: <Users className="w-5 h-5" />, label: "Executives", badge: 12 },
  { icon: <Activity className="w-5 h-5" />, label: "Analytics" },
  { icon: <Shield className="w-5 h-5" />, label: "Security" },
  { icon: <Database className="w-5 h-5" />, label: "Database" },
  { icon: <Settings className="w-5 h-5" />, label: "Settings" },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Signed out", description: "You have been logged out." });
    navigate("/");
  };

  return (
    <aside className={`bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground tracking-tight">
              ETHINX<span className="text-primary">.</span>
            </span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item, index) => (
          <Button
            key={item.label}
            variant={item.active ? "navActive" : "nav"}
            className={`w-full ${collapsed ? 'justify-center px-2' : ''} animate-slide-in-left opacity-0`}
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
          >
            {item.icon}
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Button>
        ))}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">AE</span>
            </div>
          <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`w-full text-destructive hover:text-destructive hover:bg-destructive/10 ${
            collapsed ? 'justify-center px-2' : ''
          }`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
}
