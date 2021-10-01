export class ClinicTiming {
  channels: string[];
  clinicId: string;
  clinicName: string;
  doc_id: string;
  doctorId: string;
  endtime: string;
  friStatus: boolean;
  monStatus: boolean;
  satStatus: boolean;
  starttime: string;
  sunStatus: boolean;
  thuStatus: boolean;
  timestamp: number;
  tueStatus: boolean;
  type: string;
  wedStatus: boolean;
  isVirtualClinic: boolean;
  disableDays?:number[]
}
export interface ClinicTime {
  clinicId: string;
  clinicTimingId: string;
  days: string;
  timings: string;
  isVirtualClinic: boolean;
  disableDays?:number[]
}
