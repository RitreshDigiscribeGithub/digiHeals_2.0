export class Patient {
  type: string;
  patient_title: string;
  patient_marital_status: string;
  doc_id: string;
  patient_age: number;
  patient_age_day: number;
  patient_height_feet: number;
  patient_height_inch: number;
  patient_phone: string;
  patient_id: string;
  channels: string[];
  patient_email: string;
  patient_dob: string;
  patient_blood_type: string;
  patient_name: string;
  patient_last_name: string;
  patient_gender: string;
  patient_weight: string;
  patient_height: number;
  patient_address_line_1: string;
  patient_address_line_2: string;
  patient_city: string;
  patient_state: string;

  patient_pincode: number;
  isVerify: boolean;
  timestamp: number;
  created_date: string;
  patient_weight_kgs: number;
  patient_age_month: number;
  isOnline: boolean;
  patient_img_path: string;
  patient_img_local: string;
  patient_img_name: string;
  patientImgOffline: boolean;
  prescriptionlang: string;

  nameOfFamilyGP?: string;
  phoneNumberOfGP?: string;
  rxAllowedToSendToGP?: boolean;

  diabetes?: TimeDuration;
  highBloodPressure?: TimeDuration;
  cardioDisease?: TimeDuration;
  asthama?: TimeDuration;
  epilepsy?: TimeDuration;
  cancer?: TimeDuration;
  arthritis?: TimeDuration;
  otherDiseases?: string[] = [];

  pregnantWeek?: number; //default 0, not pregnant
  alcoholFrequency?: TimeDuration;
  smokingFrequency?: TimeDuration;
  knownAllergies?: string[] = [];

  static get default(): Patient {
    return {
      patient_title: "",
      channels: [],
      patient_marital_status: "",
      type: "patient",
      doc_id: "",
      patient_age: 0,
      patient_age_day: 0,
      patient_height_feet: 0,
      patient_height_inch: 0,
      patient_phone: "",
      patient_id: "",
      patient_email: "",
      patient_dob: "",
      patient_blood_type: "",
      patient_name: "",
      patient_last_name: "",
      patient_gender: "",
      patient_weight: "",
      patient_state:'',
      patient_height: 0,
      patient_address_line_1: "",
      patient_address_line_2: "",
      patient_city: "",
      patient_pincode: 0,
      isVerify: false,
      timestamp: Math.floor(new Date().getTime()),
      created_date: "",
      patient_weight_kgs: 0,
      patient_age_month: 0,
      isOnline: true,
      patient_img_path: "",
      patient_img_local: "",
      patient_img_name: "",
      patientImgOffline: false,
      prescriptionlang: "en",
    };
  }
}
export interface TimeDuration {
  value: number;
  unit: string;
}
