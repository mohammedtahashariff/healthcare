
import { useState } from "react";
import { rounds, patients } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Circle, Clock, MoreVertical } from "lucide-react";

export default function PatientRoundsList() {
  const [roundsData, setRoundsData] = useState(rounds);
  
  // Find patient data for each round
  const roundsWithPatients = roundsData.map(round => {
    const patient = patients.find(p => p.id === round.patientId);
    return { ...round, patient };
  });

  // Toggle task completion
  const toggleTaskComplete = (roundId: string, taskId: string) => {
    setRoundsData(prev => 
      prev.map(round => {
        if (round.id === roundId) {
          const updatedTasks = round.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          
          // Check if all tasks are completed to mark the round as completed
          const allTasksCompleted = updatedTasks.every(task => task.completed);
          
          return {
            ...round,
            tasks: updatedTasks,
            completed: allTasksCompleted
          };
        }
        return round;
      })
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Today's Rounds</CardTitle>
          <Button variant="outline" size="sm" className="text-primary border-primary/30">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {roundsWithPatients.map((round) => (
            <div 
              key={round.id}
              className="border-b border-gray-100 last:border-0 p-4 transition-colors hover:bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  {round.completed ? (
                    <CheckCircle className="h-5 w-5 text-success mr-2" />
                  ) : (
                    <Clock className="h-5 w-5 text-warning mr-2" />
                  )}
                  <span className="font-medium">
                    {round.patient?.name}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      Room {round.patient?.room}{round.patient?.bedNumber ? `-${round.patient?.bedNumber}` : ''}
                    </span>
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              
              {round.notes && (
                <p className="text-sm text-gray-600 mb-2">{round.notes}</p>
              )}
              
              {/* Tasks */}
              <div className="space-y-1 mt-2">
                {round.tasks.map((task) => (
                  <div key={task.id} className="flex items-center">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskComplete(round.id, task.id)}
                      className="mr-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label
                      htmlFor={`task-${task.id}`}
                      className={`text-sm ${
                        task.completed ? "line-through text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {task.description}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
