import { LandingPageData } from "./landingData";
import { Patient } from "./patient";

export interface Doctor {
  api_token?: string;
  billing_status?: boolean;
  channels: string[];
  created_date: string;
  disclaimer?: string;
  
  doc_email: string;
  doc_first_name: string;
  doc_last_name: string;
  doc_mobile: string;
  doctor_education: string;
  doc_speciality: string;
  
  
  doc_isVerify: boolean;
  doc_license_id: string;
  doc_state_medical_council: string;
  expiresIn?: string;
  gst_no?: string;
  isCustomHeader?: boolean;
  isDisclaimer?: boolean;
  isGST?: boolean;
  isReceptionist: boolean;
  medicineBorder?: boolean;
  templateNumber?: string;
  timestamp: number;
  treatmentBorder?: boolean;
  type: string;
  uid: string;
  fontSize?: number;
  topMargin?: number;
  bottomMargin?: number;
  leftMargin?: number;
  rightMargin?: number;
  headerImgUrl?: string;
  footerImgUrl?: string;
  profile_pic?: string;
  groupId?:string;
  timeSlotTiming?: number;
  workflow: {
    isComplaintsdisplay: boolean;
    isDiagnosisdisplay: boolean;
    isExamdisplay: boolean;
    isFindingdisplay: boolean;
    isIntsdisplay: boolean;
    isLabtestdisplay: boolean;
    isLabvaluedisplay: boolean;
    isMedicinedisplay: boolean;
    isTreatmentdisplay: boolean;
    isVitalsdisplay: boolean;
  };

  username?: string;
  aboutUs?: string;
  specializations?: string[];
  services?: string[];
  educations?: DoctorEducation[];
  workExperiences?: DoctorWorkExperience[];
}

export interface DoctorWorkExperience {
  designation: string;
  company: string;
  startDate: string;
  endDate: string;
}
export interface DoctorEducation {
  institution: string;
  specialization: string;
  startDate: string;
  endDate: string;
}


export interface LoginInterface {
  token: string;
  patients: Patient[];
  doctorData?:LandingPageData[]
}
