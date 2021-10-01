import { Patient } from "./patient";

import { Doctor } from "./doctor";

export interface Complain {
  alreadyPrinted: boolean;
  cui: string;
  name: string;
}

export interface DiseaseDetail {
  alreadyPrinted: boolean;
  cui: string;
  name: string;
}

export interface InstructionsDetail {
  alreadyPrinted: boolean;
  cui: string;
  name: string;
}

export interface LabtestDetail {
  cui: string;
  name: string;
}

export interface DaywiseDosageData {
  friday: boolean;
  isFriday: boolean;
  isMonday: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  isThursday: boolean;
  isTuesday: boolean;
  isWednesday: boolean;
  monday: boolean;
  saturday: boolean;
  sunday: boolean;
  thursday: boolean;
  tuesday: boolean;
  wednesday: boolean;
}

export interface MedicineDaywiseData {
  all: boolean;
  friday?: boolean;
  isFriday: boolean;
  isMonday: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  isThursday: boolean;
  isTuesday: boolean;
  isWednesday: boolean;
  monday?: boolean;
  saturday?: boolean;
  sunday?: boolean;
  thursday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
}

export interface MedicineScheduledData {
  medicineFrequecy: string;
  medicineFrequecyType: string;
}

export interface ScheduledDosageData {
  medicineFrequecy: string;
  medicineFrequecyType: string;
}

export interface DosageData {
  alreadyConverted: boolean;
  daywiseDosageData: DaywiseDosageData;
  docId: string;
  doc_id?: string;
  doctor_id?: string;
  dosageType: string;
  dosagetext: string;
  duration: string;
  durationInstruction: string;
  frequency: string;
  intakeInstruction: string;
  intakeStatus: number;
  isAlreadyConverted: boolean;
  medicineAny: boolean;
  medicineDaywiseData: MedicineDaywiseData;
  medicineDosage: string;
  medicineDosageBedtime: string;
  medicineDosageBreakfast: string;
  medicineDosageDinner: string;
  medicineDosageLunch: string;
  medicineDosageType: string;
  medicineDuration: string;
  medicineDurationType: string;
  medicineEvening: boolean;
  medicineFrequecyCount: number;
  medicineFrequecyTotalCount: number;
  medicineId: string;
  medicineMorning: boolean;
  medicineNight: boolean;
  medicineNoon: boolean;
  medicineQty: string;
  medicineScheduleType: boolean;
  medicineScheduledData: MedicineScheduledData;
  newDocID?: any;
  regime: string;
  scheduledDosageData: ScheduledDosageData;
  sosStatus: number;
  stringifyDosage: string;
  timestamp?: any;
  type: string;
}

export interface MedicineDetail {
  activeStatus?: boolean;
  alreadyPrinted?: boolean;
  clinicalNote: string;
  doc_id: string;
  dosageData: DosageData[];
  medicineConstituent: string;
  medicineId: string;
  medicineName: string;
  medicineType: string;
  repeatStatus?: string;
  search_score: number;
  timestamp: number;
  translatedClinicalNote: string;
}

export interface Prescription {
  bodyLocation: string[];
  complains: Complain[];
  disease_details: DiseaseDetail[];
  doc_id: string;
  patient_id: string;
  doctr_id: string;
  document_id?: string;
  appointment_id: string;
  instructions_details: InstructionsDetail[];
  isSigned: boolean;
  labtest_details: LabtestDetail[];
  medicine_details: MedicineDetail[];
  translatedAdvice: string;
  timestamp: number;
  prescriptionTime: string;
}

export interface Vital {
  alreadyPrinted: boolean;
  name: string;
  statusChecked: boolean;
  unit: string;
  value: string;
}

export interface LabValue {
  alreadyPrinted?: boolean;
  cui?: string;
  labtimestamp?: number;
  statusChecked?: boolean;
  unit?: string;
  name: string;
  value: string;
}

// export interface LabtestDigital {
//     channels: string[];
//     doc_id: string;
//     doctor_id: string;
//     labtestData: LabtestData[];
//     labtest_id: string;
//     labtest_name: string;
//     patient_id: string;
//     timestamp: number;
//     type: string;
// }

export interface Treatment {
  doctor_id: string;
  uid_doc: string;
  doc_id: string;
  patient_id: string;
  channels: string[];
  treatmentName: string;
  treatmentSeating: string;
  treatmentDuration: number;
  treatmentDurationType: string;
  treatmentInterval: string;
  treatmentIntervalType: string;
  treatmentSeatingData: TreatmentSeating[];
  isSeatingcomplete: boolean;
  isOnline: boolean;
  timestamp: number;
  type: string;
  search_score: number;
  _id: string;
  _rev: string;
}
export interface TreatmentSeating {
  doc_id: string;
  seatingName: string;
  isComplete: boolean;
  treatmentNotes: string;
  treatmentInstruction: string;
  completedDate: number;
  timestamp: number;
}
