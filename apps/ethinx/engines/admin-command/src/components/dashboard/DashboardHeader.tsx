import { Bell, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function DashboardHeader() {
  const { user, lastLogin } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="bg-card/50 backdrop-blur-xl border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Executive Dashboard
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-muted-foreground">
              {formatDate(currentTime)}
            </p>
            {user?.email && (
              <span className="text-xs text-primary font-medium px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                {user.email}
              </span>
            )}
            {lastLogin && (
              <span className="text-xs text-muted-foreground/60">
                Last login: {new Date(lastLogin).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Center section - Search */}
        <div className="hidden md:flex items-center max-w-md flex-1 mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search metrics, reports, users..."
              className="pl-10 bg-secondary/50 border-border/50"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Live clock */}
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-lg font-mono font-bold text-primary">
              {formatTime(currentTime)}
            </span>
            <span className="text-xs text-muted-foreground">UTC-5</span>
          </div>

          <div className="h-8 w-px bg-border hidden lg:block" />

          {/* Actions */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleRefresh}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            className="text-muted-foreground hover:text-foreground relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
          </Button>

          {/* Status indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30">
            <span className="w-2 h-2 rounded-full bg-success status-live" />
            <span className="text-xs font-medium text-success">System Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
