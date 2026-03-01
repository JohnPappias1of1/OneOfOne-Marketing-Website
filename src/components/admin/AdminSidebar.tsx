import { Users, CalendarDays, MessageSquare, Settings, LogOut, LayoutDashboard, UserPlus } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Leads", url: "/admin/leads", icon: Users },
  { title: "Appointments", url: "/admin/appointments", icon: CalendarDays },
  { title: "Chat Sessions", url: "/admin/chats", icon: MessageSquare },
  { title: "Team", url: "/admin/team", icon: UserPlus },
];

interface AdminSidebarProps {
  user: any;
  onSignOut: () => void;
}

export function AdminSidebar({ user, onSignOut }: AdminSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-primary font-display text-base font-bold mb-2">
              OneofOne CRM
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className="hover:bg-muted/50"
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2">
          {!collapsed && (
            <p className="text-xs text-muted-foreground mb-2 truncate">{user?.email}</p>
          )}
          <button
            onClick={onSignOut}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full p-2 rounded-md hover:bg-muted/50"
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && "Sign Out"}
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
