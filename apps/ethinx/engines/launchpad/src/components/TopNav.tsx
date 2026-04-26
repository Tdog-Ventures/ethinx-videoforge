import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogOut, Shield } from "lucide-react";

export function TopNav() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display text-xl font-bold tracking-tight text-primary">
            ETHINX<span className="text-muted-foreground"> Hub</span>
          </span>
          {isAdmin && (
            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              <Shield className="h-3 w-3" /> Admin
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {user && (
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user.email}
            </span>
          )}
          <ThemeToggle />
          {user && (
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-1 h-4 w-4" /> Sign Out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
