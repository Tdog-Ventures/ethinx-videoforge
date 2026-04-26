import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email ?? null);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const displayName = userEmail?.split("@")[0] ?? "User";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border px-4 shrink-0">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center justify-between w-full">
              <h2 className="text-sm font-medium text-foreground">
                Welcome back, <span className="neon-text font-semibold">{displayName}</span>
              </h2>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign out">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
