
import PageLayout from "@/components/layout/PageLayout";
import PatientCard from "@/components/dashboard/PatientCard";
import { patients } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Patients() {
  return (
    <PageLayout title="Patients">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">All Patients</h2>
        <Button className="bg-primary hover:bg-primary-dark">
          <Plus className="h-4 w-4 mr-2" /> Add Patient
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map(patient => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </PageLayout>
  );
}
