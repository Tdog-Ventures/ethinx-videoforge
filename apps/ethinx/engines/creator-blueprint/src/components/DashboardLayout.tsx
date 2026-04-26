import { useState, type ReactNode } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Rocket,
  Mail,
  Users,
  HelpCircle,
  Bell,
  ExternalLink,
  Menu,
  LogOut,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/components/AuthProvider";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Curriculum", icon: BookOpen, path: "/curriculum" },
  { label: "AdEngine Tool", icon: Rocket, href: "https://pro-clip-gen.lovable.app" },
  { label: "Email Templates", icon: Mail, path: "/email-templates" },
  { label: "Community", icon: Users, path: "/community" },
  { label: "Support", icon: HelpCircle, path: "/support" },
];

interface DashboardLayoutProps {
  children: ReactNode;
  title: ReactNode;
  subtitle?: string;
}

export const DashboardLayout = ({ children, title, subtitle }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-sidebar-border">
          <button onClick={() => { navigate("/"); setSidebarOpen(false); }} className="text-left">
            <h1 className="font-display font-bold text-xl tracking-tight text-sidebar-foreground">
              <span className="text-sidebar-primary">Creator</span>OS
            </h1>
            <p className="text-xs text-sidebar-foreground/50 mt-1">Member Dashboard</p>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.path === location.pathname;
            const content = (
              <span
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-primary/10 text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
                {item.href && <ExternalLink className="h-3 w-3 ml-auto opacity-50" />}
              </span>
            );

            if (item.href) {
              return (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              );
            }

            return (
              <button
                key={item.label}
                className="w-full text-left"
                onClick={() => { if (item.path) navigate(item.path); setSidebarOpen(false); }}
              >
                {content}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <a
            href="https://pro-clip-gen.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-display font-bold hover:opacity-90 transition-opacity"
          >
            <Rocket className="h-4 w-4" />
            Open AdEngine
            <ExternalLink className="h-3 w-3 ml-auto" />
          </a>
          {user && (
            <button
              onClick={signOut}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
              <span className="ml-auto text-[10px] text-sidebar-foreground/40 truncate max-w-[120px]">
                {user.email}
              </span>
            </button>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 sm:px-8 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h2 className="font-display font-bold text-lg text-foreground">{title}</h2>
                {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-8 py-8 space-y-8 max-w-5xl">
          {children}
        </main>

        <footer className="border-t border-border px-4 sm:px-8 py-4">
          <p className="text-xs text-muted-foreground text-center">
            Part of the{" "}
            <a
              href="https://ethinx-win-showcase.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              ETHINX ecosystem
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};
