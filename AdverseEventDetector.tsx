
import { Patient, Medication, Symptom } from "@/types";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

// Simple rules for ADR detection
const DRUG_INTERACTIONS = [
  { drugs: ['amoxicillin', 'paracetamol'], severity: 'medium', description: 'Potential interaction affecting drug metabolism' },
  { drugs: ['furosemide', 'lisinopril'], severity: 'high', description: 'May cause excessive blood pressure reduction' },
  { drugs: ['tramadol', 'cefazolin'], severity: 'low', description: 'Monitor for enhanced sedative effects' },
];

const DRUG_SYMPTOM_REACTIONS = [
  { drug: 'amoxicillin', symptom: 'rash', severity: 'high', description: 'Possible allergic reaction' },
  { drug: 'tramadol', symptom: 'nausea', severity: 'medium', description: 'Common side effect' },
  { drug: 'furosemide', symptom: 'dizziness', severity: 'medium', description: 'May indicate excessive fluid loss' },
];

interface AdverseEventDetectorProps {
  patient: Patient;
}

export default function AdverseEventDetector({ patient }: AdverseEventDetectorProps) {
  const [detectedEvents, setDetectedEvents] = useState<{
    severity: string;
    description: string;
  }[]>([]);

  useEffect(() => {
    // This effect runs whenever the patient data changes
    const activeMedications = patient.medications.filter(med => med.status === 'active');
    
    // Check for potential drug interactions
    checkDrugInteractions(activeMedications);
    
    // Check for known drug-symptom reactions
    checkDrugSymptomReactions(activeMedications, patient.symptoms);
    
  }, [patient]);

  const checkDrugInteractions = (medications: Medication[]) => {
    const events = [];
    const medNames = medications.map(med => med.name.toLowerCase());
    
    for (const interaction of DRUG_INTERACTIONS) {
      // Check if all drugs in the interaction are present in the patient's medications
      const hasInteraction = interaction.drugs.every(drug => 
        medNames.some(med => med.includes(drug))
      );
      
      if (hasInteraction) {
        events.push({
          severity: interaction.severity,
          description: interaction.description,
        });
        
        // Show toast for detected interaction
        toast.warning(
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div>
              <p className="font-medium">Potential Drug Interaction</p>
              <p className="text-sm">{interaction.description}</p>
            </div>
          </div>
        );
      }
    }
    
    return events;
  };
  
  const checkDrugSymptomReactions = (medications: Medication[], symptoms: Symptom[]) => {
    const events = [];
    
    for (const med of medications) {
      const medName = med.name.toLowerCase();
      
      for (const symptom of symptoms) {
        const symptomDesc = symptom.description.toLowerCase();
        
        // Check for known drug-symptom reactions
        for (const reaction of DRUG_SYMPTOM_REACTIONS) {
          if (medName.includes(reaction.drug) && symptomDesc.includes(reaction.symptom)) {
            events.push({
              severity: reaction.severity,
              description: `${med.name} may cause ${symptom.description}: ${reaction.description}`,
            });
            
            // Show toast for detected reaction
            toast.warning(
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <div>
                  <p className="font-medium">Potential Adverse Drug Reaction</p>
                  <p className="text-sm">{reaction.description}</p>
                </div>
              </div>
            );
          }
        }
      }
    }
    
    return events;
  };
  
  // This component doesn't render anything visible
  return null;
}
