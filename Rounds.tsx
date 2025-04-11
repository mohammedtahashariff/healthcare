
import PageLayout from "@/components/layout/PageLayout";
import { rounds, patients } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Rounds() {
  // Get patient name for each round
  const roundsWithPatients = rounds.map(round => {
    const patient = patients.find(p => p.id === round.patientId);
    return { ...round, patientName: patient?.name || 'Unknown Patient' };
  });

  // Group rounds by date
  const groupedRounds = roundsWithPatients.reduce((acc, round) => {
    const date = new Date(round.date).toLocaleDateString();
    
    if (!acc[date]) {
      acc[date] = [];
    }
    
    acc[date].push(round);
    return acc;
  }, {} as Record<string, typeof roundsWithPatients>);

  return (
    <PageLayout title="Patient Rounds">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Scheduled Rounds</h2>
        </div>
        <Button className="bg-primary hover:bg-primary-dark">
          <Plus className="h-4 w-4 mr-2" /> Schedule Round
        </Button>
      </div>
      
      <div className="space-y-6">
        {Object.entries(groupedRounds).map(([date, dateRounds]) => (
          <div key={date}>
            <h3 className="text-md font-medium text-gray-700 mb-3">{date}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dateRounds.map((round) => (
                <Card key={round.id} className={round.completed ? "border-success/20" : ""}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex justify-between items-center">
                      <span>{round.patientName}</span>
                      {round.completed ? (
                        <span className="text-success flex items-center text-sm">
                          <CheckCircle2 className="h-4 w-4 mr-1" /> Completed
                        </span>
                      ) : (
                        <span className="text-warning flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-1" /> Pending
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        Tasks: {round.tasks.filter(t => t.completed).length}/{round.tasks.length} completed
                      </p>
                      {!round.completed && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full mt-2 text-primary border-primary/30"
                        >
                          Start Round
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
