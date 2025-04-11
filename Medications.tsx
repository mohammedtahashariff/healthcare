
import PageLayout from "@/components/layout/PageLayout";
import { patients } from "@/data/mockData";
import { Plus, Search, Check, X, Clock, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function Medications() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get all medications from all patients
  const allMedications = patients.flatMap(patient => 
    patient.medications.map(med => ({
      ...med,
      patientName: patient.name,
      patientId: patient.id
    }))
  );
  
  // Filter medications based on search term
  const filteredMedications = searchTerm
    ? allMedications.filter(med => 
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allMedications;
  
  // Group medications by status
  const activeMeds = filteredMedications.filter(med => med.status === 'active');
  const pendingMeds = filteredMedications.filter(med => med.status === 'pending');
  const discontinuedMeds = filteredMedications.filter(med => med.status === 'discontinued');
  
  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-success/10 text-success border-success/20"><Check className="h-3 w-3 mr-1" /> Active</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning border-warning/20"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'discontinued':
        return <Badge className="bg-danger/10 text-danger border-danger/20"><X className="h-3 w-3 mr-1" /> Discontinued</Badge>;
      default:
        return null;
    }
  };

  return (
    <PageLayout title="Medications">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search medications or patients..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="bg-primary hover:bg-primary-dark">
          <Plus className="h-4 w-4 mr-2" /> Add Medication
        </Button>
      </div>
      
      {/* Active Medications */}
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Pill className="mr-2 h-5 w-5 text-primary" />
        Active Medications ({activeMeds.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {activeMeds.map((med) => (
          <Card key={med.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-base font-medium">{med.name}</CardTitle>
                {getStatusBadge(med.status)}
              </div>
              <p className="text-sm text-gray-500">{med.patientName}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-gray-500">Dosage:</span>
                <span>{med.dosage}</span>
                <span className="text-gray-500">Frequency:</span>
                <span>{med.frequency}</span>
                <span className="text-gray-500">Route:</span>
                <span>{med.route}</span>
                {med.lastAdministered && (
                  <>
                    <span className="text-gray-500">Last Given:</span>
                    <span>{new Date(med.lastAdministered).toLocaleString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: 'numeric',
                      month: 'short'
                    })}</span>
                  </>
                )}
              </div>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" className="text-primary border-primary/30">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Pending Medications */}
      {pendingMeds.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Pending Medications ({pendingMeds.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Similar card structure for pending meds */}
          </div>
        </div>
      )}
      
      {/* Discontinued Medications */}
      {discontinuedMeds.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Discontinued Medications ({discontinuedMeds.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Similar card structure for discontinued meds */}
          </div>
        </div>
      )}
    </PageLayout>
  );
}
