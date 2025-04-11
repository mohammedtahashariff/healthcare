
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { alerts, patients } from "@/data/mockData";
import { 
  Bell, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Pill, 
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Alerts() {
  const [alertsData, setAlertsData] = useState(alerts);
  
  // Get patient name for each alert
  const alertsWithPatients = alertsData.map(alert => {
    const patient = patients.find(p => p.id === alert.patientId);
    return { ...alert, patientName: patient?.name || 'Unknown Patient' };
  });
  
  // Filter alerts by acknowledged status
  const activeAlerts = alertsWithPatients.filter(a => !a.acknowledged);
  const acknowledgedAlerts = alertsWithPatients.filter(a => a.acknowledged);
  
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

  return (
    <PageLayout title="Alerts">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Bell className="mr-2 h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Patient Alerts</h2>
          {activeAlerts.length > 0 && (
            <Badge className="ml-2 bg-danger">{activeAlerts.length}</Badge>
          )}
        </div>
        <Button variant="outline" size="sm" className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">
            Active Alerts {activeAlerts.length > 0 && `(${activeAlerts.length})`}
          </TabsTrigger>
          <TabsTrigger value="acknowledged">
            Acknowledged {acknowledgedAlerts.length > 0 && `(${acknowledgedAlerts.length})`}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Alerts Requiring Attention</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {activeAlerts.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {activeAlerts.map((alert) => (
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
        </TabsContent>
        
        <TabsContent value="acknowledged">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Acknowledged Alerts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {acknowledgedAlerts.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {acknowledgedAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 hover:bg-gray-50 opacity-70">
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No acknowledged alerts</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
