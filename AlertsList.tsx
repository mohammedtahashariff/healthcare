
import { alerts, patients } from "@/data/mockData";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Pill, 
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AlertsList() {
  const [alertsData, setAlertsData] = useState(alerts);
  
  // Get patient name for each alert
  const alertsWithPatients = alertsData.map(alert => {
    const patient = patients.find(p => p.id === alert.patientId);
    return { ...alert, patientName: patient?.name || 'Unknown Patient' };
  });

  // Acknowledge alert
  const acknowledgeAlert = (alertId: string) => {
    setAlertsData(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };
  
  // Get icon based on alert type
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return <Pill className="h-5 w-5" />;
      case 'symptom':
        return <FileText className="h-5 w-5" />;
      case 'vital':
        return <Activity className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };
  
  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-danger';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-gray-500';
    }
  };

  const unacknowledgedAlerts = alertsWithPatients.filter(a => !a.acknowledged);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Active Alerts</CardTitle>
          <Button variant="outline" size="sm" className="text-primary border-primary/30" asChild>
            <Link to="/alerts">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {unacknowledgedAlerts.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {unacknowledgedAlerts.map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`mr-3 ${getSeverityColor(alert.severity)}`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">
                        {alert.patientName}
                      </p>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(alert.timestamp).toLocaleString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: 'numeric',
                          month: 'short'
                        })}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="text-primary hover:text-primary-dark"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Acknowledge
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-2" />
            <p className="text-gray-500">All alerts acknowledged</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
