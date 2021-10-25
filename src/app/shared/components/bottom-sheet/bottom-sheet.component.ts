import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { Patient } from '@interface/patient';
import { PatientService } from '@services/patient-service/patient.service';
import { Subscription } from 'rxjs';
import { DoctorService } from '@services/doctor-service/doctor.service';
import { LandingPageData } from '@interface/landingData';
import { Clinic } from '@interface/clinic';

@Component({
  selector: 'digi-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.less'],
})
export class BottomSheetComponent implements OnInit {
  @Input() isOpen:boolean;
  @Input() title: string;
  @Output() public toggle = new EventEmitter<boolean>();
  @Input() height: string;
  @Input() type: string;

  @Output() patientChanged = new EventEmitter<Patient>();
  patients:Patient[]= [];
  selectedPatient:Patient;
  doctorSub:Subscription;
  doctor:LandingPageData;

  constructor(private patientService:PatientService,private doctorService:DoctorService) {


  }

  ngOnInit(): void {


    console.log(this.type);

    this.doctorSub = this.doctorService.getDoctorData.subscribe(r => {
      this.doctor = r;
    })

    this.patients = JSON.parse(localStorage.getItem("patients"));
    this.selectedPatient = JSON.parse(localStorage.getItem(`selectedPatient`));
        

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.doctorSub) {
      this.doctorSub.unsubscribe();
    }
  }

  changePatient(patient: Patient) {
    
  if(this.selectedPatient.patient_id != patient.patient_id) {
     this.patientService.setSelectedPatient(patient);
     this.patientChanged.emit(patient); 
     this.selectedPatient = patient;
     this.toggle.emit(false)

  }

  }


  changeClinic(clinic:Clinic) {

    this.doctor.actualClinic = clinic;
        
    }



}
