import { Clinic } from './clinic';
import { Doctor } from './doctor';
import { ClinicTiming } from './clinic-timing';
import { TelemedicineSetup } from './telemedicine-setup';
import { AccountDetails } from './account-details';
import { Appointment } from './appointment';
import { DoctorCMS } from './doctor-cms';
import { Partner } from './partner';

export interface LandingPageData {
  doctor: Doctor;
  virtualClinic: Clinic;
  doctorCMS: DoctorCMS;
  actualClinic: Clinic;
  clinics: Clinic[];
  clinicTimings: ClinicTiming[];
  telemedicineSetup: TelemedicineSetup;
  accountDetailsRes: AccountDetails[];
  appointment: Appointment;
  partners?: Partner;
}

export interface BusinessHour {
  day: string;
  timings: { startTime: string; endTime: string }[];
  timingsStr: string[];
  // isWorking: boolean;
}
