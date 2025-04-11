
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LucideIcon,
  Home,
  Users,
  Calendar,
  PanelLeft,
  PanelRight,
  Bell,
  Settings,
  PlusCircle,
  Pill
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { alerts } from "@/data/mockData";

// Navigation item type
type NavItem = {
  title: string;
  path: string;
  icon: LucideIcon;
  badge?: number;
};

// Navigation items
const navItems: NavItem[] = [
  { title: "Dashboard", path: "/", icon: Home },
  { title: "Patients", path: "/patients", icon: Users },
  { title: "Rounds", path: "/rounds", icon: Calendar },
  { title: "Medications", path: "/medications", icon: Pill },
  { title: "Alerts", path: "/alerts", icon: Bell, badge: alerts.filter(a => !a.acknowledged).length },
  { title: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Toggle sidebar collapse
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r border-gray-200 bg-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo and collapse button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center mr-2">
              <span className="text-white font-semibold text-lg">SC</span>
            </div>
            <span className="font-semibold text-lg text-gray-800">SmartCare</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {collapsed ? <PanelRight size={18} /> : <PanelLeft size={18} />}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary-light text-primary-dark"
                  : "text-gray-600 hover:bg-gray-100",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <item.icon size={20} className={cn(collapsed ? "mx-0" : "mr-3")} />
              {!collapsed && <span>{item.title}</span>}
              {!collapsed && item.badge && item.badge > 0 && (
                <Badge className="ml-auto bg-danger">{item.badge}</Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Add new patient button */}
      <div className={cn("p-4", collapsed ? "items-center flex justify-center" : "")}>
        <Button
          className={cn("bg-primary hover:bg-primary-dark", 
            collapsed ? "w-10 h-10 p-0" : "w-full")}
        >
          <PlusCircle size={18} className={collapsed ? "" : "mr-2"} />
          {!collapsed && <span>New Patient</span>}
        </Button>
      </div>
    </div>
  );
}
