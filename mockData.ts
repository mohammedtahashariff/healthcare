
import { Patient, Alert, Round } from '../types';

// Mock patient data
export const patients: Patient[] = [
  {
    id: '1',
    name: 'Rakshith Y B',
    age: 20,
    room: '101',
    bedNumber: 'A',
    admissionDate: '2025-04-05',
    diagnosis: 'Pneumonia',
    priority: 'high',
    vitals: {
      temperature: 38.5,
      heartRate: 95,
      bloodPressure: '140/90',
      respiratoryRate: 22,
      oxygenSaturation: 94,
      recordedAt: '2025-04-11T08:30:00Z'
    },
    medications: [
      {
        id: 'm1',
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'TID',
        route: 'Oral',
        startDate: '2025-04-05',
        lastAdministered: '2025-04-11T06:00:00Z',
        status: 'active'
      },
      {
        id: 'm2',
        name: 'Paracetamol',
        dosage: '1g',
        frequency: 'PRN',
        route: 'Oral',
        startDate: '2025-04-05',
        lastAdministered: '2025-04-10T22:00:00Z',
        status: 'active'
      }
    ],
    symptoms: [
      {
        id: 's1',
        description: 'Cough',
        severity: 3,
        recordedAt: '2025-04-11T08:00:00Z',
        notes: 'Productive with yellowish sputum'
      },
      {
        id: 's2',
        description: 'Chest pain',
        severity: 2,
        recordedAt: '2025-04-11T08:00:00Z',
        notes: 'Right-sided, worse on inspiration'
      }
    ]
  },
  {
    id: '2',
    name: 'Sangamesh Nag B Y',
    age: 21,
    room: '102',
    bedNumber: 'B',
    admissionDate: '2025-04-08',
    diagnosis: 'Congestive Heart Failure',
    priority: 'medium',
    vitals: {
      temperature: 37.1,
      heartRate: 88,
      bloodPressure: '160/95',
      respiratoryRate: 20,
      oxygenSaturation: 92,
      recordedAt: '2025-04-11T09:15:00Z'
    },
    medications: [
      {
        id: 'm3',
        name: 'Furosemide',
        dosage: '40mg',
        frequency: 'BID',
        route: 'Oral',
        startDate: '2025-04-08',
        lastAdministered: '2025-04-11T08:00:00Z',
        status: 'active'
      },
      {
        id: 'm4',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Daily',
        route: 'Oral',
        startDate: '2025-04-08',
        lastAdministered: '2025-04-11T08:00:00Z',
        status: 'active'
      }
    ],
    symptoms: [
      {
        id: 's3',
        description: 'Shortness of breath',
        severity: 2,
        recordedAt: '2025-04-11T09:00:00Z',
        notes: 'Improved since yesterday'
      },
      {
        id: 's4',
        description: 'Leg edema',
        severity: 2,
        recordedAt: '2025-04-11T09:00:00Z',
        notes: 'Bilateral, pitting'
      }
    ]
  },
  {
    id: '3',
    name: 'Chandrashekara V R',
    age: 19,
    room: '105',
    bedNumber: 'A',
    admissionDate: '2025-04-10',
    diagnosis: 'Acute Appendicitis (post-op)',
    priority: 'medium',
    vitals: {
      temperature: 37.8,
      heartRate: 82,
      bloodPressure: '122/78',
      respiratoryRate: 16,
      oxygenSaturation: 98,
      recordedAt: '2025-04-11T09:45:00Z'
    },
    medications: [
      {
        id: 'm5',
        name: 'Cefazolin',
        dosage: '1g',
        frequency: 'TID',
        route: 'IV',
        startDate: '2025-04-10',
        lastAdministered: '2025-04-11T06:00:00Z',
        status: 'active'
      },
      {
        id: 'm6',
        name: 'Tramadol',
        dosage: '50mg',
        frequency: 'Q6H PRN',
        route: 'Oral',
        startDate: '2025-04-10',
        lastAdministered: '2025-04-11T04:00:00Z',
        status: 'active'
      }
    ],
    symptoms: [
      {
        id: 's5',
        description: 'Incisional pain',
        severity: 4,
        recordedAt: '2025-04-11T09:30:00Z',
        notes: 'Worse on movement'
      },
      {
        id: 's6',
        description: 'Nausea',
        severity: 1,
        recordedAt: '2025-04-11T09:30:00Z',
        notes: 'Improved since last night'
      }
    ]
  },
  {
    id: '4',
    name: 'Rahul',
    age: 20,
    room: '108',
    bedNumber: 'C',
    admissionDate: '2025-04-07',
    diagnosis: 'Diabetic Ketoacidosis',
    priority: 'low',
    vitals: {
      temperature: 36.8,
      heartRate: 75,
      bloodPressure: '135/85',
      respiratoryRate: 18,
      oxygenSaturation: 97,
      recordedAt: '2025-04-11T10:15:00Z'
    },
    medications: [
      {
        id: 'm7',
        name: 'Regular Insulin',
        dosage: 'Per protocol',
        frequency: 'Continuous infusion',
        route: 'IV',
        startDate: '2025-04-07',
        status: 'discontinued'
      },
      {
        id: 'm8',
        name: 'Metformin',
        dosage: '1000mg',
        frequency: 'BID',
        route: 'Oral',
        startDate: '2025-04-09',
        lastAdministered: '2025-04-11T08:00:00Z',
        status: 'active'
      }
    ],
    symptoms: [
      {
        id: 's7',
        description: 'Fatigue',
        severity: 2,
        recordedAt: '2025-04-11T10:00:00Z',
        notes: 'Improving daily'
      }
    ]
  }
];

// Mock alert data
export const alerts: Alert[] = [
  {
    id: 'a1',
    patientId: '1',
    type: 'medication',
    severity: 'medium',
    message: 'Potential interaction between Amoxicillin and Paracetamol',
    timestamp: '2025-04-11T08:45:00Z',
    acknowledged: false
  },
  {
    id: 'a2',
    patientId: '2',
    type: 'vital',
    severity: 'high',
    message: 'Blood pressure elevated: 160/95',
    timestamp: '2025-04-11T09:20:00Z',
    acknowledged: false
  },
  {
    id: 'a3',
    patientId: '3',
    type: 'symptom',
    severity: 'medium',
    message: 'Pain severity increased from 3 to 4',
    timestamp: '2025-04-11T09:35:00Z',
    acknowledged: false
  }
];

// Mock rounds data
export const rounds: Round[] = [
  {
    id: 'r1',
    patientId: '1',
    date: '2025-04-11',
    completed: false,
    notes: 'Check response to antibiotics',
    tasks: [
      {
        id: 't1',
        description: 'Assess respiratory status',
        completed: false
      },
      {
        id: 't2',
        description: 'Review CBC results',
        completed: false
      }
    ]
  },
  {
    id: 'r2',
    patientId: '2',
    date: '2025-04-11',
    completed: false,
    notes: 'Monitor fluid status',
    tasks: [
      {
        id: 't3',
        description: 'Check weight',
        completed: true
      },
      {
        id: 't4',
        description: 'Assess edema',
        completed: false
      }
    ]
  },
  {
    id: 'r3',
    patientId: '3',
    date: '2025-04-11',
    completed: false,
    notes: 'Post-op day 1 assessment',
    tasks: [
      {
        id: 't5',
        description: 'Inspect surgical site',
        completed: false
      },
      {
        id: 't6',
        description: 'Assess pain level',
        completed: false
      }
    ]
  }
];
