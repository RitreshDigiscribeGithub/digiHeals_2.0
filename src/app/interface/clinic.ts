import { ClinicTime, ClinicTiming } from "./clinic-timing";
import { BusinessHour } from "./landingData";

export class Clinic {
  channels: string[];
  doc_clinic_name: string;
  doc_clinic_phone: string;
  doc_id: string;
  doctor_id: string;
  lat: string;
  long: string;
  reception_mobile: string;
  reception_name: string;

  address_line_1: string;
  address_line_2: string;
  state: string;
  city: string;
  pincode: string;

  timestamp: number;
  type: string;
  uid: string;
  isVirtualClinic: boolean;

  //in angular onlu
  clinicTimings: ClinicTime[];
  timings: ClinicTiming[];
  businessHours: BusinessHour[];
  isTodayWorking: boolean;
  todayWorkingTime: string;
  address: string;
}
