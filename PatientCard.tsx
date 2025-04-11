import { Patient } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardList, 
  CalendarClock, 
  ChevronRight,
  AlertTriangle,
  Pill
} from "lucide-react";
import { cn } from "@/lib/utils";
import { alerts } from "@/data/mockData";

interface PatientCardProps {
  patient: Patient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  // Check for alerts related to this patient
  const patientAlerts = alerts.filter(alert => 
    alert.patientId === patient.id && !alert.acknowledged
  );
  
  const priorityColor = {
    high: "bg-danger/10 text-danger border-danger/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-success/10 text-success border-success/20"
  }[patient.priority];
  
  // Format admission date
  const admissionDate = new Date(patient.admissionDate).toLocaleDateString(
    undefined, { month: 'short', day: 'numeric' }
  );

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between bg-gray-50 py-2 px-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center mr-3">
            <span className="font-semibold text-primary">
              {patient.name.split(' ').map(name => name[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{patient.name}</h3>
            <p className="text-xs text-gray-500">
              {patient.age} y/o - Room {patient.room}{patient.bedNumber ? `-${patient.bedNumber}` : ''}
            </p>
          </div>
        </div>
        <Badge className={cn("text-xs font-normal", priorityColor)}>
          {patient.priority.charAt(0).toUpperCase() + patient.priority.slice(1)} Priority
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <ClipboardList className="mr-2 h-4 w-4" />
              <span>{patient.diagnosis}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <CalendarClock className="mr-1 h-4 w-4" />
              <span>Admitted {admissionDate}</span>
            </div>
          </div>
          
          {/* Latest vitals */}
          {patient.vitals && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="bg-gray-50 p-2 rounded text-center">
                <p className="text-xs text-gray-500">Temp</p>
                <p className={cn("font-medium", 
                  patient.vitals.temperature && patient.vitals.temperature > 38 ? "text-warning" : ""
                )}>
                  {patient.vitals.temperature}°C
                </p>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <p className="text-xs text-gray-500">BP</p>
                <p className="font-medium">{patient.vitals.bloodPressure}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <p className="text-xs text-gray-500">O₂</p>
                <p className={cn("font-medium", 
                  patient.vitals.oxygenSaturation && patient.vitals.oxygenSaturation < 95 ? "text-warning" : ""
                )}>
                  {patient.vitals.oxygenSaturation}%
                </p>
              </div>
            </div>
          )}
          
          {/* Alerts and medications counts */}
          <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
            {patientAlerts.length > 0 ? (
              <Badge variant="outline" className="bg-danger/10 text-danger border-danger/20 flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {patientAlerts.length} {patientAlerts.length === 1 ? 'Alert' : 'Alerts'}
              </Badge>
            ) : (
              <span></span>
            )}
            
            <Badge variant="outline" className="bg-primary-light text-primary-dark border-primary/20 flex items-center">
              <Pill className="h-3 w-3 mr-1" />
              {patient.medications.filter(m => m.status === 'active').length} Meds
            </Badge>
            
            <button className="text-primary flex items-center text-sm hover:text-primary-dark">
              View <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
