
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatCards from "@/components/dashboard/StatCards";
import PatientCard from "@/components/dashboard/PatientCard";
import PatientRoundsList from "@/components/dashboard/PatientRoundsList";
import AlertsList from "@/components/dashboard/AlertsList";
import { patients } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AdverseEventDetector from "../components/adr/AdverseEventDetector";

const Index = () => {
  // For demo purposes, we'll use the first patient for the ADR detector
  const firstPatient = patients[0];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* ADR detector (invisible component) */}
            {firstPatient && <AdverseEventDetector patient={firstPatient} />}
            
            {/* Page header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <Button className="bg-primary hover:bg-primary-dark">
                <Plus className="h-4 w-4 mr-2" /> Add Patient
              </Button>
            </div>
            
            {/* Stat cards */}
            <div className="mb-8">
              <StatCards />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Patients section */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Active Patients</h2>
                  <Button variant="outline" size="sm" className="text-primary border-primary/30">
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patients.map(patient => (
                    <PatientCard key={patient.id} patient={patient} />
                  ))}
                </div>
              </div>
              
              {/* Sidebar content */}
              <div className="space-y-6">
                <PatientRoundsList />
                <AlertsList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
