
import { Card, CardContent } from "@/components/ui/card";
import { patients, rounds, alerts } from "@/data/mockData";
import { 
  Users, 
  CalendarClock, 
  Bell, 
  AlertTriangle,
  TrendingUp
} from "lucide-react";

export default function StatCards() {
  // Calculate stats
  const totalPatients = patients.length;
  const pendingRounds = rounds.filter(r => !r.completed).length;
  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged).length;
  const highPriorityPatients = patients.filter(p => p.priority === 'high').length;
  
  const stats = [
    {
      title: "Total Patients",
      value: totalPatients,
      icon: Users,
      color: "bg-primary-light text-primary-dark"
    },
    {
      title: "Pending Rounds",
      value: pendingRounds,
      icon: CalendarClock,
      color: "bg-warning/10 text-warning"
    },
    {
      title: "Active Alerts",
      value: unacknowledgedAlerts,
      icon: Bell,
      color: "bg-danger/10 text-danger"
    },
    {
      title: "High Priority",
      value: highPriorityPatients,
      icon: AlertTriangle,
      color: "bg-danger/10 text-danger"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
