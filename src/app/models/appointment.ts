import { Moment } from "moment";

export class Appointment {
  appointment_status: boolean;
  billing_id: string;
  channels: string[];
  clinic_id: string;
  clinic_timimg: string;
  doc_id: string;
  doctor_id: string;
  // doctor: Ref<Doctor>;
  // clinic: Ref<Clinic>;
  endDateTime: number;
  isCancelled: boolean;
  isCheckin: boolean;
  patient_id: string;
  patient_name: string;
  patient_phone: string;
  startDateTime: number;
  timestamp: number;
  type: string;
  appointmentReason: string;
  additionalNotes: string;
  isTelimedicineAppointment?: boolean;
  schedular_type: string;
  billing_pay_status: string;
  refDoctorName?: string;
  refDoctorMobile?: string;
  case_id?: string;
  diseasesData?: string[];
  symptomsData?: string[];
  triage_status?: boolean;
  wellness_type?: string;
  discount?: string;
  bill_amount?: Number;
  isBillPaid?: boolean;
  isOnline?: boolean;
  labtestURL?: string[];
  medication_effect?: string;
  side_effect?: string;
  //angular fields
  appointmentDateMoment?: Moment;
  appointmentDate?: string;
  appointmentTime?: string;
  bookingDate?: string;
  payment_id?: string;
  isPaymentCompleted?: boolean;
  order_id?: string;

  medicalHistoryRecord?: MedicalHistory;
  followUpRecord?: FollowUpRecord;
  isPatientOnline?: boolean


}
interface MedicalHistory {
  isFirstVisit: boolean;
  symptoms: string[];
  currentMedications: {
    name: string;
    dosage: string;
    timeDuration: TimeDuration;
  }[];
  videoUrl: string;
  audioUrl: string;
}
interface TimeDuration {
  value: number;
  unit: string;
}
interface FollowUpRecord {
  healthStatus: string; //( bad , ok , good , great)
  newComplaints: string[];
  sideEffects: string[];
  videoUrl: string;
  audioUrl: string;
}
