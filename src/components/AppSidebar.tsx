import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Satellite,
  Map,
  Bell,
  HandHeart,
  Users,
  BarChart3,
  Radio,
  ShieldAlert,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const operations = [
  { title: "Mission Control", url: "/", icon: LayoutDashboard },
  { title: "Satellite Assessment", url: "/assessment", icon: Satellite },
  { title: "Disaster Map", url: "/map", icon: Map },
  { title: "Live Alerts", url: "/alerts", icon: Bell },
];

const response = [
  { title: "Aid Requests", url: "/aid", icon: HandHeart },
  { title: "Volunteers", url: "/volunteers", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <ShieldAlert className="h-5 w-5 text-primary-foreground" />
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary" />
            </span>
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-display text-base font-bold tracking-tight">
                AEGIS<span className="text-primary">.</span>relief
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Mission Control
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {operations.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="group transition-colors hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-primary border-l-2 border-primary"
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

        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Response
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {response.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      className="group transition-colors hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-primary border-l-2 border-primary"
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

      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent/50 p-2.5">
            <Radio className="h-4 w-4 text-success animate-pulse" />
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-[10px] uppercase text-success">SAT-LINK ACTIVE</span>
              <span className="font-mono text-[10px] text-muted-foreground">7 satellites online</span>
            </div>
          </div>
        ) : (
          <Radio className="mx-auto h-4 w-4 text-success animate-pulse" />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
