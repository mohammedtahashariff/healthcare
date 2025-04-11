
// Patient types
export interface Patient {
  id: string;
  name: string;
  age: number;
  room?: string;
  bedNumber?: string;
  admissionDate: string;
  diagnosis: string;
  priority: 'low' | 'medium' | 'high';
  vitals?: Vitals;
  medications: Medication[];
  symptoms: Symptom[];
}

export interface Vitals {
  temperature?: number;
  heartRate?: number;
  bloodPressure?: string;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  recordedAt?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  lastAdministered?: string;
  status: 'active' | 'discontinued' | 'pending';
}

export interface Symptom {
  id: string;
  description: string;
  severity: number;
  recordedAt: string;
  notes?: string;
}

// Round types
export interface Round {
  id: string;
  patientId: string;
  date: string;
  completed: boolean;
  notes?: string;
  vitals?: Vitals;
  tasks: Task[];
}

export interface Task {
  id: string;
  description: string;
  completed: boolean;
}

// Alert types
export interface Alert {
  id: string;
  patientId: string;
  type: 'medication' | 'symptom' | 'vital';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}
