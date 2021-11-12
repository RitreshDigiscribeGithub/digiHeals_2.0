import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Patient } from '../../interface/patient';
import { BaseHttpService } from '../../services/base-http.service';
import { HttpConstants } from '../../services/http-constants';
import { MessageService } from '../../services/message.service';
import { PatientService } from '../../services/patient-service/patient.service';
import { DynamicTitleService } from '../../shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.less']
})
export class PrescriptionComponent implements OnInit {
  prescription = false;
  savedRxData:any =null;
  patientSub:Subscription;
  selectedPatient:Patient;
  isUploadingFiles:Boolean = false;
  constructor(private router_:Router,private msg:MessageService, private router:Router,private titleService:DynamicTitleService,private patientService:PatientService,private http:BaseHttpService) { 

    if(this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state &&  this.router.getCurrentNavigation().extras.state.rxData){
      this.savedRxData = this.router.getCurrentNavigation().extras.state.rxData;
    
    } else {
    this.router.navigate(['/records']);  
    }

  }

  ngOnInit(): void {
    this.titleService.setHeaderTitle('DigiHeals | Scan Docs');
    this.patientSub = this.patientService.selectedPatient$.subscribe(data => {
      this.selectedPatient = data;
    })

  }


  bookHealthService() {

    this.isUploadingFiles = true;
    const patient:any = this.selectedPatient;
    patient.patient_pincode =  this.selectedPatient.patient_pincode.toString();
    this.http.makePartnerRequest({method:'POST',url:HttpConstants.digiheals.shareRxToPartner,data:{patientDetail:patient,docId:this.savedRxData.doc_id,rxUrl:this.savedRxData.rxUrl}}).subscribe(r =>{

      this.isUploadingFiles = false;

        if(r.status === true) {
          this.msg.createMessage('success','Thanks You, you will receive a call shortly');
          this.router_.navigate(['/home']);
        } else {
          this.msg.createMessage('error','something went wrong please try again');
        }

      })


  }

}
