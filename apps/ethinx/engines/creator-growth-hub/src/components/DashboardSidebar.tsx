import {
  LayoutDashboard,
  BookOpen,
  Video,
  Mail,
  Users,
  HelpCircle,
  Zap,
  CreditCard,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Curriculum", url: "/curriculum", icon: BookOpen },
  { title: "AdEngine Tool", url: "/adengine", icon: Video },
  { title: "Email Templates", url: "/templates", icon: Mail },
  { title: "Community", url: "/community", icon: Users },
  { title: "Support", url: "/support", icon: HelpCircle },
  { title: "Pricing", url: "/pricing", icon: CreditCard },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-sm font-bold text-foreground tracking-tight">
                CreatorOS
              </h1>
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                Dashboard
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && (
          <div className="rounded-lg bg-secondary p-3">
            <p className="text-xs text-muted-foreground">
              Week 2 of 8
            </p>
            <div className="mt-2 progress-bar-track h-1.5">
              <div className="progress-bar-fill h-full" style={{ width: "25%" }} />
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
