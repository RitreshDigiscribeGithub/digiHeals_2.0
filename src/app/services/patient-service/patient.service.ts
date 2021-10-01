import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Appointment } from "src/app/models/appointment";
import { Patient } from "src/app/models/patient";
import { BaseHttpService } from "../base-http.service";
import { DoctorService } from "../doctor-service/doctor.service";
import { HttpConstants } from "../http-constants";

@Injectable({ providedIn: "root" })
export class PatientService {
  public selectedPatient: Subject<Patient> = new BehaviorSubject<Patient>(null);
  // public patientUpdated: Subject<Patient> = new BehaviorSubject<Patient>(null);
  public patientWaitingForCall: Subject<Appointment> = new BehaviorSubject<Appointment>(null);
  constructor(private doctorService: DoctorService, private httpService: BaseHttpService) {}
  get selectedPatient$() {
    return this.selectedPatient.asObservable().pipe(
      map((node) => {
        if (!node) {
          return this.getSelectedPatient();
        } else {
          return node;
        }
      })
    );
  }
  get patientWaitingForCall$() {
    return this.patientWaitingForCall.asObservable().pipe(filter((node) => !!node));
  }
  // get patientUpdated$() {
  //   return this.patientUpdated.asObservable().pipe(filter((node) => !!node));
  // }

  pushPatientWaitingForCall(appointment: Appointment) {
    this.patientWaitingForCall.next(appointment);
  }

  getSelectedPatientById(patientId: string): Promise<Patient> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService.makeAuthRequest<{ patient: Patient }>("GET", HttpConstants.patient.getPatientById + patientId).subscribe((response) => {
          if (response.data.patient) {
            resolve(response.data.patient);
          } else {
            reject("Something went wrong");
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  setSelectedPatient(data: Patient) {

    if(data) {
      localStorage.setItem(`selectedPatient`, JSON.stringify(data));
    }
    this.selectedPatient.next(data);
  }
  getSelectedPatient() {

    const selectedPatient = JSON.parse(localStorage.getItem(`selectedPatient`));
    if (!selectedPatient) {
      const patients = JSON.parse(localStorage.getItem("patients"));
      return  ( patients && patients.length ) ? patients[0] : null;
    }
    return selectedPatient;
  }

  async getSelectedPatientHitApi() {
    const patient: Patient = this.getSelectedPatient();
    const updatedPatient = await this.getSelectedPatientById(patient.patient_id);
    this.setSelectedPatient(updatedPatient);
    return updatedPatient;
  }

  ngOnDestroy(): void {
    // this.selectedPatient.unsubscribe();
    this.patientWaitingForCall.unsubscribe();
  }
  updatePatient(patient: Patient) {
    const patientsStr = localStorage.getItem("patients");
    const patients: Patient[] = JSON.parse(patientsStr);
    const index = patients.findIndex((x) => x.doc_id == patient.doc_id);
    patients[index] = patient;
    localStorage.setItem("patients", JSON.stringify(patients));
    this.setSelectedPatient(patient);
  }

}
