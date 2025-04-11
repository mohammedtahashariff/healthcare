
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { alerts } from "@/data/mockData";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const unreadAlerts = alerts.filter(alert => !alert.acknowledged);
  
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">Smart Care Assistant</h1>
        
        {/* Search */}
        <div className="relative max-w-md w-full mx-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search patients, medications..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Alerts dropdown */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {unreadAlerts.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-danger h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadAlerts.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white">
              <DropdownMenuLabel>Alerts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {unreadAlerts.length > 0 ? (
                unreadAlerts.map((alert) => (
                  <DropdownMenuItem key={alert.id} className="flex flex-col items-start">
                    <div className="flex items-center gap-2 w-full">
                      <div className={`w-2 h-2 rounded-full ${
                        alert.severity === 'high' ? 'bg-danger' : 
                        alert.severity === 'medium' ? 'bg-warning' : 'bg-success'
                      }`}></div>
                      <span className="font-medium">{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert</span>
                      <span className="text-xs text-gray-500 ml-auto">
                        {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>No new alerts</DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-primary justify-center">
                View all alerts
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User avatar */}
          <Button variant="ghost" size="sm" className="ml-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-medium">DR</span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
